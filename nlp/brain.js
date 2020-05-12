const async = require("async");
const { NlpManager } = require("node-nlp");
const manager = new NlpManager();
const helper = require("../helper/helper");

const fallback = require("../model/fallback");
const conversation = require("../conversation");

const ltmMatrix = require('../ltmMatrix/controllers/ltm.controller')

const _ = require("lodash");
const product = require("../product");
class reader {
  /**
   * BELOW FUNCTION ARE HELPER FUNCTION FOR NLP & FLOW
   */
  static async reading(message, convo, updateSlot = true) {
    return new Promise((resolve, reject) => {
      manager.load("./nlp/model.json");
      manager.process(message).then(async result => {
        helper.logInfo("RESULT", JSON.stringify(result));
        ltmMatrix.saveNlp(result, convo)
        var intents = [];
        var entities = [];
        for (var _intent of result.classifications) {
          if (_intent.value > 0) {
            intents.push(_intent);
          }
				}
				if(updateSlot){
					this.updateSlot(result.entities, result.sourceEntities, convo)
				}
				entities = result.entities.map(_entity => {
          helper.logInfo("_entity:", _entity);
					return _entity
				})
        helper.logInfo(JSON.stringify({ intents, entities }));
        resolve({ intents, entities, intent: result.intent, sourceEntities: result.sourceEntities });
      });
    });
  }

  static async doReading(text, convo, doRepeat = null, bot = null) {
    await this.reading(text, convo).then(async ({ intents, entities }) => {
      // helper.logInfo('INTENTS : ',intents)
      if (intents.find(_intent => _intent.label === "order")) {
        await this.transactionDialog(convo);
      } else if (intents.find(_intent => _intent.label === "payment")) {
        await this.transactionDialog(convo);
      } else if (intents.find(_intent => _intent.label === "reject")) {
        let varsKeys = Object.keys(convo.vars);
        let findSlot = _.find(varsKeys, key => {
          if (/^slot_/g.test(key)) {
            return key;
          } else {
            return undefined;
          }
        });
        if (findSlot) {
          convo.gotoThread("cancel");
        } else {
          convo.gotoThread("cancelWithoutOrder");
        }
      } else {
        if (doRepeat != null || doRepeat == true) {
          await convo.repeat();
        } else {
          if (bot) {
            fallback
              .create({
                user: bot._config.activity.from.id,
                message: text,
                transcript: null
              })
              .catch(err => [
                helper.logInfo(
                  "failed create fallback for",
                  JSON.stringify(convo.source_message)
                )
              ]);
          }
          if (convo.vars.consumer) {
            await convo.gotoThread("default_registered");
          } else {
            await convo.gotoThread("default");
          }
        }
      }
    });
  }

  static async updateInsertLtm(convo) {
    ltm
      .findOne({
        user: convo.source_message.user
      })
      .lean()
      .then(async result => {
        if (result) {
          let findDataIndex = _.findIndex(result.data, v => {
            return v.key == convo.vars.ltm.key;
          });
          if (findDataIndex != -1) {
            result.data[findDataIndex].value =
              convo.vars["ltm_" + convo.vars.ltm.key].value;
          } else {
            result.data.push({
              key: convo.vars.ltm.key,
              name: convo.vars["ltm_" + convo.vars.ltm.key].name,
              value: convo.vars["ltm_" + convo.vars.ltm.key].value,
              dateAdded: new Date(),
              dateUpdated: Date.now
            });
          }
          await ltm
            .updateOne({ user: convo.source_message.user }, result)
            .then(async updated => {
              if (convo.vars.ltm.continueThread) {
              } else {
                await this.transactionDialog(convo);
                convo.setVar("ltm", undefined);
              }
            })
            .catch(err => {
              helper.logInfo("failed update ltm:", err);
            });
        } else {
          helper.logInfo(convo.vars.ltm);
          await ltm
            .create({
              user: convo.source_message.user,
              data: [
                {
                  key: convo.vars.ltm.key,
                  name: convo.vars["ltm_" + convo.vars.ltm.key].name,
                  value: convo.vars["ltm_" + convo.vars.ltm.key].value,
                  dateAdded: new Date(),
                  dateUpdated: new Date()
                }
              ]
            })
            .then(() => {
              this.transactionDialog(convo);
              convo.setVar("ltm", undefined);
            })
            .catch(err => {
              helper.logInfo("failed create ltm:", err);
            });
        }
      });
  }

  static async transactionDialog(convo) {
    let currentconvo = _.find(conversation, v => {
      return v.intent == "transaction";
    });
    let consumer = convo.vars.consumer
    helper.logInfo("v-intent : ", currentconvo);
    let destThread = null;
    helper.logInfo("===== separator =====");
    async.eachLimit(
      currentconvo.priority,
      1,
      (parameter, cb) => {
        if (!convo.vars[parameter.vars] && destThread == null) {
          destThread = parameter.thread;
          helper.logInfo("parameter", parameter);
          cb();
        } else {
          if (convo.vars[parameter.vars] && parameter.needLtm) {
            helper.logInfo("Find one...");
            ltm
              .findOne({
                user: convo.source_message.user
              })
              .lean()
              .then(result => {
                helper.logInfo(
                  "result findone",
                  result,
                  parameter.vars,
                  convo.vars[parameter.vars]
                );
                if (result) {
                  let findEntity = _.find(result.data, v => {
                    return v.key == parameter.vars.replace("slot_", "");
                  });
                  helper.logInfo(findEntity);
                  if (!findEntity) {
                    convo.setVar("ltm", {
                      after: parameter.ltm.nextThread,
                      key: parameter.ltm.key,
                      continueThread: parameter.ltm.continueThread
                    });
                    cb(parameter.ltm.thread);
                  } else {
                    convo.setVar(
                      "address",
                      `alamat ${findEntity.name} (https://maps.google.com/?ll=${findEntity.value})`
                    );
                    cb();
                  }
                } else {
                  convo.setVar("ltm", {
                    after: parameter.ltm.nextThread,
                    key: parameter.ltm.key
                  });
                  helper.logInfo(
                    destThread,
                    `LTM thread: ${parameter.ltm.thread}`,
                    convo.vars.ltm
                  );
                  cb(parameter.ltm.thread);
                }
              })
              .catch(err => {
                helper.logInfo("err reading ltm", err);
                cb();
              });
          } else {
            cb();
          }
        }
      },
      async thread => {
        if (thread) destThread = thread;
        destThread = destThread == null ? currentconvo.finalStep : destThread;
        if(destThread == "final"){
          if(_.size(consumer.selectedAHS) == 0){
            destThread = "fb_noagent_location"
          } else{
            // count price
            let product = convo.vars._selectedSKU
            convo.setVar('sub_total', 'Rp' + (product.price * convo.vars.slot_number).toLocaleString('id') )
          }
        }
        helper.logInfo("goto thread:", destThread, "with vars", JSON.stringify(convo.vars))
        await convo.gotoThread(destThread);
      }
    );
	}
	
	static async updateSlot(entities, sourceEntities, convo){
		for (var _entity of entities) {
			switch (_entity.entity) {
				case "brand":
					convo.setVar("slot_brand", _entity.option);
					convo.setVar(
						"_list_product",
						product.find(v => v.brand == _entity.option)
					);
					convo.setVar(
						"str_list_product",
						convo.vars._list_product.list.map(v => `*${v.name}* (Rp${v.price.toLocaleString('id')})`).join("\n")
					);
					if (convo.vars.slot_type) {
						let findProduct = product.find(
							v => v.brand == _entity.option
						);
						if (findProduct) {
							let selectedSKU = findProduct.list.find(
								v => v.unit == convo.vars.slot_type
							);
							if (selectedSKU) {
                convo.setVar("_selectedSKU", selectedSKU)
								convo.setVar("slot_product", selectedSKU.name);
								convo.setVar("slot_number_unit", selectedSKU.unit);
							} else {
								convo.setVar("slot_type", undefined);
							}
						} else {
							convo.setVar("slot_type", undefined);
						}
					}
					break;
				case "product":
					convo.setVar("slot_product", _entity.option);
					break;
				case "type":
					helper.logInfo("current brand", convo.vars.slot_brand);
					if (convo.vars.slot_brand) {
						let findProduct = product.find(
							v => v.brand == convo.vars.slot_brand
						);
						if (findProduct) {
							let regex = new RegExp(_entity.option, "ig");
							let selectedSKU = findProduct.list.find(v => {
                regex.lastIndex = 0;
								return regex.test(v.alias)
              });
							let filterSKU = findProduct.list.filter(v => {
                regex.lastIndex = 0;
								return regex.test(v.alias)
              });
              console.log(filterSKU, selectedSKU)
							if (selectedSKU && filterSKU.length == 1) {
                convo.setVar("_selectedSKU", selectedSKU)
								convo.setVar("slot_type", _entity.option);
								convo.setVar("slot_product", selectedSKU.name);
								convo.setVar("slot_number_unit", selectedSKU.unit);
							} else {
                // more than 1
                if(filterSKU.length > 1){
                  helper.log("filtersku", filterSKU);
                  convo.setVar(
                    "str_list_product",
                    filterSKU.map(v => `*${v.name}* (Rp${v.price.toLocaleString('id')})`).join("\n")
                  );
                } else {
                  
                }
							}
						}
					} else {
						convo.setVar("slot_type", _entity.option);
					}
					break;
				case "dimension":
					let value = _entity.resolution.value,
						unit = _entity.resolution.unit;
					// console.log(unit.toLowerCase(), unit, unit.toLowerCase() == "mililiter")
					if (unit.toLowerCase() == "milliliter") {
						let findProduct = product.find(
							v => v.brand == convo.vars.slot_brand
						);
						if (findProduct) {
							let selectedSKU = findProduct.list.find(
								v => v.size == value && v.size_unit == unit.toLowerCase()
							);
							let filterSKU = findProduct.list.filter(
								v => v.size == value && v.size_unit == unit.toLowerCase()
							);
							if (selectedSKU && filterSKU.length == 1) {
								convo.setVar(
									"slot_type",
									selectedSKU.size + " " + selectedSKU.size_unit
								);
                convo.setVar("slot_product", selectedSKU.name);
                convo.setVar("_selectedSKU", selectedSKU)
							} else {
								convo.setVar(
									"str_list_product",
									filterSKU.map(v => `*${v.name}* (Rp${v.price.toLocaleString('id')})`).join("\n")
								);
							}
						}
					}
					break;
				case "number":
					if (typeof _entity.resolution === "undefined") {
						convo.setVar("slot_number", _entity.option);
					} else {
						convo.setVar("slot_number", _entity.resolution.strValue);
					}
					break;
				case "number_rgx":
					var sourceEntity = sourceEntities.find(
						v => v.text == _entity.sourceText
					);
					if (sourceEntity) {
						let value = sourceEntity.resolution.value,
							unit = sourceEntity.resolution.unit;
						// console.log(unit.toLowerCase(), unit, unit.toLowerCase() == "mililiter")
						if (unit.toLowerCase() == "milliliter") {
							let findProduct = product.find(
								v => v.brand == convo.vars.slot_brand
							);
							if (findProduct) {
								let selectedSKU = findProduct.list.find(
									v =>
										v.size == value && v.size_unit == unit.toLowerCase()
								);
								let filterSKU = findProduct.list.filter(
									v =>
										v.size == value && v.size_unit == unit.toLowerCase()
								);
								if (selectedSKU && filterSKU.length == 1) {
									convo.setVar(
										"slot_type",
										selectedSKU.size + " " + selectedSKU.size_unit
									);
									convo.setVar("slot_product", selectedSKU.name);
                  convo.setVar("slot_number_unit", selectedSKU.unit);
                  convo.setVar("_selectedSKU", selectedSKU)
								} else {
									convo.setVar(
										"str_list_product",
										filterSKU.map(v => `*${v.name}* (Rp${v.price.toLocaleString('id')})`).join("\n")
									);
								}
							}
						}
					} else {
						convo.setVar(
							"slot_number",
							_entity.sourceText.replace(/\D/g, "")
						);
					}
					break;
				case "unit":
					convo.setVar("slot_number_unit", _entity.option);
					break;
				case "payment":
					convo.setVar("slot_payment", _entity.option);
					break;
				// case "address":
				// 	convo.setVar('slot_address', _entity.option)
				// 	break
				default:
					break;
			}
		}
	}
}

module.exports = reader;
