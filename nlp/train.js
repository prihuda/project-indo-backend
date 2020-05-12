const { NlpManager } = require('node-nlp')
const fs = require('fs')

module.exports = {
  addEntity: async function(name,entity,sinonims) {
    const data = fs.readFileSync('model.json', 'utf8')
    const manager = new NlpManager({ languages: ['id'], nlu: { log: true } })
    manager.import(data)
    manager.addNamedEntityText(name, entity, ['id'], sinonims)
    await manager.train()
    manager.save("./nlp/model.json")
    return "train finish"
  }
}

async function train() {
  // const data = fs.readFileSync('./nlp/model.json', 'utf8')
  const manager = new NlpManager({ languages: ['id'], nlu: { log: true } })
  // if(data) manager.import(data)
  manager.addRegexEntity("number_rgx", "id", /((?:[a-zA-Z]+[0-9]|[0-9]+[a-zA-Z])[a-zA-Z0-9]*)/g);
  // manager.addRegexEntity("number_regex", "id", /(?:(\d))*/g);
  manager.addNamedEntityText('type', 'galon', ['id'], ['Galon','galun','glon','gln','glun','galom','glm','galm'])
  manager.addNamedEntityText('type', 'reffil', ['id'], ['Reffil','refil','repil','isi ulang','isi ulg','repill','refill'])
  manager.addNamedEntityText('type', 'dengan galon', ['id'], ['Dengan galon','dgn galon','dengan galom','dgn galun','dgn glon','degn galon','dengan glon'])
  manager.addNamedEntityText('payment', 'cash', ['id'], ['Cash','cesh','cassh','CASH','tunai','kontan'])
  manager.addNamedEntityText('payment', 'gopay', ['id'], ['Gopay','GOPAY','Gopey','gopey'])
  manager.addNamedEntityText('brand', 'aqua', ['id'], ['Aqua','akua'])
  manager.addNamedEntityText('brand', 'vit', ['id'], ['Vit','pit','viit'])
  manager.addNamedEntityText('address', 'alamat', ['id'], ["alamat","lamat","aamat","almat","alaat","alamt","alama","zlamat","xlamat","slamat","wlamat","qlamat","akamat","apamat","aoamat","alamat","alzmat","alxmat","alsmat","alwmat","alqmat","alakat","alajat","alanat","alamzt","alamxt","alamst","alamwt","alamqt","alamar","alamaf","alamag","alamah","alamay","alama6","alama5","laamat","aalmat","almaat","alaamt","alamta"])
  /**
   * AQUA
   */
  manager.addNamedEntityText('type', 'botol', ['id'], ["botol","otol","btol","bool","botl","boto","notol","hotol","gotol","votol","bitol","bktol","bltol","bptol","b0tol","b9tol","borol","bofol","bogol","bohol","boyol","bo6ol","bo5ol","botil","botkl","botll","botpl","bot0l","bot9l","botok","botop","botoo","botol","obtol","btool","bootl","botlo"])
  /**
   * MIZONE
   */
  manager.addNamedEntityText('brand', 'mizone', ['id'], ["mizone", "izone", "mzone", "mione", "mizne", "mizoe", "mizon", "kizone", "jizone", "nizone",  "muzone", "mjzone", "mkzone", "mlzone", "mozone", "m9zone", "m8zone", "mixone", "misone", "miaone", "mizine", "mizkne", "mizlne", "mizpne", "miz0ne", "miz9ne", "mizome", "mizoje", "mizohe", "mizobe", "mizonw", "mizons", "mizond", "mizonf", "mizonr", "mizon4", "mizon3", "imzone", "mzione", "miozne", "miznoe", "mizoen"])
  
  manager.addNamedEntityText('type', 'activ', ['id'], ['activ', "ctiv","ativ","aciv","actv","acti","zctiv","xctiv","sctiv","wctiv","qctiv","avtiv","aftiv","adtiv","axtiv","acriv","acfiv","acgiv","achiv","acyiv","ac6iv","ac5iv","actuv","actjv","actkv","actlv","actov","act9v","act8v","actib","actig","actif","actic","cativ","atciv","acitv","actvi"])

  manager.addNamedEntityText('type', 'mood_up', ['id'], ["mood","ood","mod","moo","kood","jood","nood","miod","mkod","mlod","mpod","m0od","m9od","moid","mokd","mold","mopd","mo0d","mo9d","moos","moox","mooc","moof","moor","mooe","omod","mood","modo"])

  manager.addNamedEntityText('type', 'break_free', ['id'], ["break","reak","beak","brak","brek","brea","nreak","hreak","greak","vreak","beeak","bdeak","bfeak","bgeak","bteak","b5eak","b4eak","brwak","brsak","brdak","brfak","brrak","br4ak","br3ak","brezk","brexk","bresk","brewk","breqk","breaj","bream","breal","breao","breai","rbeak","berak","braek","breka"])

  manager.addNamedEntityText('type', 'move_on', ['id'], ["move on","ove on","mve on","moe on","mov on","kove on","jove on","nove on","mive on","mkve on","mlve on","mpve on","m0ve on","m9ve on","mobe on","moge on","mofe on","moce on","movw on","movs on","movd on","movf on","movr on","mov4 on","mov3 on","omve on","mvoe on","moev on"])
  /**
   * LEVITE
   */
  manager.addNamedEntityText('brand', 'levite', ['id'], ['levite', "evitate", "lvitate", "leitate", "levtate", "leviate", "levitte", "levitae", "levitat", "kevitate", "pevitate", "oevitate", "levitate", "lwvitate", "lsvitate", "ldvitate", "lfvitate", "lrvitate", "l4vitate", "l3vitate", "lebitate", "legitate", "lefitate", "lecitate", "levutate", "levjtate", "levktate", "levltate", "levotate", "lev9tate", "lev8tate", "levirate", "levifate", "levigate", "levihate", "leviyate", "levi6ate", "levi5ate", "levitzte", "levitxte", "levitste", "levitwte", "levitqte", "levitare", "levitafe", "levitage", "levitahe", "levitaye", "levita6e", "levita5e", "levitatw", "levitats", "levitatd", "levitatf", "levitatr", "levitat4", "levitat3", "elvitate", "lveitate", "leivtate", "levtiate", "leviatte", "levittae", "levitaet"])

  manager.addNamedEntityText('type', 'leci_citrus_mint', ['id'], ["leci", "citrus", "eci","lci","lei","lec","keci","peci","oeci","leci","lwci","lsci","ldci","lfci","lrci","l4ci","l3ci","levi","lefi","ledi","lexi","lecu","lecj","leck","lecl","leco","lec9","lec8","elci","lcei","leic","itrus","ctrus","cirus","citus","citrs","citru","vitrus","fitrus","ditrus","xitrus","cutrus","cjtrus","cktrus","cltrus","cotrus","c9trus","c8trus","cirrus","cifrus","cigrus","cihrus","ciyrus","ci6rus","ci5rus","citeus","citdus","citfus"," citgus","cittus","cit5us","cit4us","citrys","citrhs","citrjs","citrks","citris","citr8s","citr7s","citrua","citruz","citrux","citrud","citrue","citruw","ictrus","ctirus","cirtus","citurs","citrsu"])

  manager.addNamedEntityText('type', 'timun_mint', ['id'], ["timun","imun","tmun","tiun","timn","timu","rimun","fimun","gimun","himun","yimun","6imun","5imun","tumun","tjmun","tkmun","tlmun","tomun","t9mun","t8mun","tikun","tijun","tinun","timyn","timhn","timjn","timkn","timin","tim8n","tim7n","timum","timuj","timuh","timub","itmun","tmiun","tiumn","timnu"])

  manager.addNamedEntityText('type', 'berry_jeruk_nipis', ['id'], ["berry", "jeruk", "nipis", "erry","brry","bery","berr","nerry","herry","gerry","verry","bwrry","bsrry","bdrry","bfrry","brrry","b4rry","b3rry","beery","bedry","befry","begry","betry","be5ry","be4ry","berey","berdy","berfy","bergy","berty","ber5y","ber4y","berrt","berrg","berrh","berrj","berru","berr7","berr6","ebrry","brery","berry","beryr","eruk","jruk","jeuk","jerk","jeru","heruk","neruk","meruk","keruk","ieruk","ueruk","jwruk","jsruk","jdruk","jfruk","jrruk","j4ruk","j3ruk","jeeuk","jeduk","jefuk","jeguk","jetuk","je5uk","je4uk","jeryk","jerhk","jerjk","jerkk","jerik","jer8k","jer7k","jeruj","jerum","jerul","jeruo","jerui","ejruk","jreuk","jeurk","jerku","ipis","npis","niis","nips","nipi","mipis","jipis","hipis","bipis","nupis","njpis","nkpis","nlpis","nopis","n9pis","n8pis","niois","nilis","ni-is","ni0is","nipus","nipjs","nipks","nipls","nipos","nip9s","nip8s","nipia","nipiz","nipix","nipid","nipie","nipiw","inpis","npiis","niips","nipsi"])

  /**
   * END
   */
  manager.addNamedEntityText('unit', 'dus', ['id'], ["dus","sus","xus","cus","fus","rus","eus","dys","dhs","djs","dks","dis","d8s","d7s","dua","duz","dux","dud","due","duw","uds","dsu"])

  // manager.addNamedEntityText('type', 'mint', ["id"], ["mint","int","mnt","mit","min","kint","jint","nint","munt","mjnt","mknt","mlnt","mont","m9nt","m8nt","mimt","mijt","miht","mibt","minr","minf","ming","minh","miny","min6","min5","imnt","mnit","mitn"])
  
  manager.addNamedEntityText('number', '1', ['id'], ['satu','stu','satuh','siji'])
  manager.addNamedEntityText('number', '2', ['id'], ['dua','dwa','kaleh','loro'])
  manager.addNamedEntityText('number', '3', ['id'], ['tiga','tga','tigo','telu'])
  manager.addNamedEntityText('number', '4', ['id'], ['empat','empt','papat','sekawan'])
  manager.addNamedEntityText('number', '5', ['id'], ['lima','limo','lma','gangsal'])
  manager.addNamedEntityText('number', '6', ['id'], ['enam','nam'])

  manager.addNamedEntityText("positive", "yes", ["id"], [
      "y","ya","yaa","yaaa","iya","iyaa","iyaaa","yoi","yoii","yoiii","you","youi","yo","yoo","yooo","yi","toi","goi","hoi","joi","uoi","7oi","6oi","yii","yki","yli","ypi","y0i","y9i","yoj","yok","yol","yo9","yo8","oyi","yio","anjut","lnjut","lajut","lanut","lanjt","lanju","kanjut","panjut","oanjut","lanjut","lznjut","lxnjut","lsnjut","lwnjut","lqnjut","lamjut","lajjut","lahjut","labjut","lanhut","lannut","lanmut","lankut","laniut","lanuut","lanjyt","lanjht","lanjjt","lanjkt","lanjit","lanj8t","lanj7t","lanjur","lanjuf","lanjug","lanjuh","lanjuy","lanju6","lanju5","alnjut","lnajut","lajnut","lanujt","lanjtu","ia","iy","uya","jya","kya","lya","oya","9ya","8ya","ita","iga","iha","ija","iua","i7a","i6a","iyz","iyx","iys","iyw","iyq","yia","iay","yuhu","uhu","yhu","yuu","yuh","tuhu","guhu","huhu","juhu","uuhu","7uhu","6uhu","yyhu","yhhu","yjhu","ykhu","yihu","y8hu","y7hu","yugu","yubu","yunu","yuju","yuuu","yuyu","yuhy","yuhh","yuhj","yuhk","yuhi","yuh8","yuh7","uyhu","yhuu","yuuh","yes","es","ys","ye","tes","ges","hes","jes","ues","7es","6es","yws","yss","yds","yfs","yrs","y4s","y3s","yea","yez","yex","yed","yee","yew","eys","yse","oke","oe","ok","ike","kke","lke","pke","0ke","9ke","oje","ome","ole","ooe","oie","okw","oks","okd","okf","okr","ok4","ok3","koe","oek","jdi","jadi","betul","etul","btul","beul","betl","betu","netul","hetul","getul","vetul","bwtul","bstul","bdtul","bftul","brtul","b4tul","b3tul","berul","beful","begul","behul","beyul","be6ul","be5ul","betyl","bethl","betjl","betkl","betil","bet8l","bet7l","betuk","betup","betuo","betul","ebtul","bteul","beutl","betlu","anjut","lnjut","lajut","lanut","lanjt","lanju","kanjut","panjut","oanjut","lanjut","lznjut","lxnjut","lsnjut","lwnjut","lqnjut","lamjut","lajjut","lahjut","labjut","lanhut","lannut","lanmut","lankut","laniut","lanuut","lanjyt","lanjht","lanjjt","lanjkt","lanjit","lanj8t","lanj7t","lanjur","lanjuf","lanjug","lanjuh","lanjuy","lanju6","lanju5","alnjut","lnajut","lajnut","lanujt","lanjtu","setuju","etuju","stuju","seuju","setju","setuu","setuj","aetuju","zetuju","xetuju","detuju","eetuju","wetuju","swtuju","sstuju","sdtuju","sftuju","srtuju","s4tuju","s3tuju","seruju","sefuju","seguju","sehuju","seyuju","se6uju","se5uju","setyju","sethju","setjju","setkju","setiju","set8ju","set7ju","setuhu","setunu","setumu","setuku","setuiu","setuuu","setujy","setujh","setujj","setujk","setuji","setuj8","setuj7","estuju","steuju","seutju","setjuu","setuuj"
    ]
  );

  manager.addNamedEntityText("negative", "no", ["id"], ["tidak","ndak","gak","ga","idak","tdak","tiak","tidk","tida","ridak","fidak","gidak","hidak","yidak","6idak","5idak","tudak","tjdak","tkdak","tldak","todak","t9dak","t8dak","tisak","tixak","ticak","tifak","tirak","tieak","tidzk","tidxk","tidsk","tidwk","tidqk","tidaj","tidam","tidal","tidao","tidai","itdak","tdiak","tiadk","tidka","dak","nak","ndk","nda","mdak","jdak","hdak","bdak","nsak","nxak","ncak","nfak","nrak","neak","ndzk","ndxk","ndsk","ndwk","ndqk","ndaj","ndam","ndal","ndao","ndai","dnak","nadk","ndka","gk","ga","fak","vak","bak","hak","yak","tak","gzk","gxk","gsk","gwk","gqk","gaj","gam","gal","gao","gai","agk","gka","fa","va","ba","ha","ta","gz","gx","gs","gq","ag","moh","koh","joh","noh","mih","mkh","mlh","mph","m0h","m9h","mog","mob","mon","moj","mou","moy","omh","mho","gah","oah","ogh","oga","igah","kgah","lgah","pgah","0gah","9gah","ofah","ovah","obah","ohah","oyah","otah","ogzh","ogxh","ogsh","ogwh","ogqh","ogag","ogab","ogan","ogaj","ogau","ogay","goah","oagh","ogha"])
  
  manager.assignDomain('id', 'greet.casual', 'greeting')
  manager.addDocument('id', 'hey', 'greet.casual')
  manager.addDocument('id', 'halo', 'greet.casual')
  manager.addDocument('id', 'oit', 'greet.casual')
  manager.addDocument('id', "hoi", 'greet.casual')
  manager.addDocument('id', 'bro', 'greet.casual')
  manager.addDocument('id', 'halu', 'greet.casual')
  manager.addDocument('id', 'hi', 'greet.casual')

  manager.assignDomain('id', 'greet.title', 'greeting')
  manager.addDocument('id', 'mas', 'greet.title')
  manager.addDocument('id', 'mba', 'greet.title')
  manager.addDocument('id', 'bu', 'greet.title')
  manager.addDocument('id', 'ibu', 'greet.title')
  manager.addDocument('id', 'pak', 'greet.title')
  manager.addDocument('id', 'gan', 'greet.title')

  manager.assignDomain('id', 'greet.time', 'greeting')
  manager.addDocument('id', 'pagi', 'greet.time')
  manager.addDocument('id', 'siang', 'greet.time')
  manager.addDocument('id', 'sore', 'greet.time')
  manager.addDocument('id', 'malam', 'greet.time')
  
  manager.assignDomain('id', 'reject', 'reversal')
  manager.addDocument('id', 'batal', 'reject')
  manager.addDocument('id', 'ga jadi', 'reject')
  manager.addDocument('id', 'cancel', 'reject')
  manager.addDocument('id', 'ga jdi', 'reject')
  manager.addDocument('id', 'g jdi', 'reject')
  manager.addDocument('id', 'tidak jadi', 'reject')
  manager.addDocument('id', 'tidak', 'reject')
  manager.addDocument('id', 'tdak jd', 'reject')
  manager.addDocument('id', 'casel', 'reject')
  manager.addDocument('id', 'censel', 'reject')
  manager.addDocument('id', 'btal', 'reject')
  manager.addDocument('id', 'btl saja', 'reject')
  manager.addDocument('id', 'hmm tidak jadi deh', 'reject')
  manager.addDocument('id', 'wah ndak jadi deh', 'reject')
  manager.addDocument('id', 'ndak jadi', 'reject')
  manager.addDocument('id', 'ndak jadi pesan', 'reject')
  manager.addDocument('id', 'hm ndak jadi deh', 'reject')
  manager.addDocument('id', 'hm batal deh', 'reject')
  manager.addDocument('id', 'gajadi', 'reject')
  manager.addDocument('id', 'gajdi', 'reject')
  manager.addDocument('id', 'gajadi deh', 'reject')
  manager.addDocument('id', '%negative%', 'reject')
  

  manager.assignDomain('id', 'order', 'transaction')
  manager.addDocument('id', 'mau pesan %product% %number%', 'order')
  manager.addDocument('id', 'waw ok kalo gtu pesan %brand% %product% %number%', 'order')
  manager.addDocument('id', 'pesan %product% %type% dong %number%', 'order')
  manager.addDocument('id', '%number% %product% %type%  pesan ya', 'order')
  manager.addDocument('id', 'pesan %product% %type% dong', 'order')
  manager.addDocument('id', 'beli %product% %type%  dong', 'order')
  manager.addDocument('id', 'order %product% %type%  dong', 'order')
  manager.addDocument('id', 'mau beli %product% dong', 'order')
  manager.addDocument('id', 'mau order %product% dong', 'order')
  manager.addDocument('id', 'beli %product%nya dong', 'order')
  manager.addDocument('id', 'beli %product%ne', 'order')
  manager.addDocument('id', 'pesan %product% %number% buah', 'order')
  manager.addDocument('id', 'beli %product%ne %number% buah', 'order')
  manager.addDocument('id', 'pesan %product%nya %number% buah', 'order')
  manager.addDocument('id', '%product%nya %number% buah', 'order')
  manager.addDocument('id', 'bro %product% %number% buah', 'order')
  manager.addDocument('id', 'mas %product% %number%', 'order')
  manager.addDocument('id', '%brand% %number% dong', 'order')
  manager.addDocument('id', 'pesan %brand% %number% dong', 'order')
  manager.addDocument('id', 'pesan %brand% %product% %number% anterin ke %address%', 'order')
  manager.addDocument('id', 'pesan %brand% %number% antar ke %address%', 'order')
  manager.addDocument('id', 'pesan %brand% %number% antarin ke %address%', 'order')
  manager.addDocument('id', 'pesan %brand% %number% anterin ke %address%', 'order')
  manager.addDocument('id', 'bro %brand% %number% antar ke %address%', 'order')
  manager.addDocument('id', 'beli %brand%', 'order')
  manager.addDocument('id', 'pesan %brand%', 'order')
  manager.addDocument('id', 'pesan dong', 'order')
  manager.addDocument('id', 'mau pesan', 'order')
  manager.addDocument('id', 'order dong', 'order')
  manager.addDocument('id', 'mau order', 'order')
  manager.addDocument('id', 'beli dong', 'order')
  manager.addDocument('id', 'mau beli dong', 'order')
  manager.addDocument('id', 'pesen', 'order')
  manager.addDocument('id', '%brand% aja', 'order')
  manager.addDocument('id', '%brand% dong', 'order')
  manager.addDocument('id', '%product% aja', 'order')
  manager.addDocument('id', '%product% saja', 'order')
  manager.addDocument('id', 'yang %product% saja', 'order')
  manager.addDocument('id', 'yang %brand% saja', 'order')
  manager.addDocument('id', 'yang %brand% %product% saja', 'order')
  manager.addDocument('id', 'mau yang %brand% %product% saja', 'order')
  manager.addDocument('id', 'pengen %brand% %product% saja', 'order')
  manager.addDocument('id', 'mo pesan %product% bisa gan ?', 'order')
  manager.addDocument('id', 'mo pesan %brand% bisa gan ?', 'order')
  manager.addDocument('id', 'pengen yang %type%', 'order')
  manager.addDocument('id', 'mau yang %type% dong', 'order')
  manager.addDocument('id', 'mo pesan %product% bisa ga bro ?', 'order')
  manager.addDocument('id', 'mo %product% bisa ga bro ?', 'order')
  manager.addDocument('id', 'mo %product% %brand% bisa ga bro ?', 'order')
  manager.addDocument('id', 'mo %product% %brand%', 'order')
  manager.addDocument('id', 'mo %product%', 'order')
  manager.addDocument('id', 'mo %brand%', 'order')
  manager.addDocument('id', 'maw %product%', 'order')
  manager.addDocument('id', 'mow %product%', 'order')
  manager.addDocument('id', 'psan %product%', 'order')
  manager.addDocument('id', 'maw %product%', 'order')
  manager.addDocument('id', '%product% %brand%', 'order')
  manager.addDocument('id', '%product%', 'order')
  manager.addDocument('id', 'pengen %product% %brand% bisa ga bro ?', 'order')
  manager.addDocument('id', 'pengen %product% %brand% bisa ga bro ?', 'order')
  manager.addDocument('id', 'pengen %product% %brand% %type% %payment%', 'order')
  manager.addDocument('id', 'pengen %product% %brand% %type%', 'order')
  manager.addDocument('id', '%product% %brand% %type% deh', 'order')
  manager.addDocument('id', 'pengen %product% %brand% %type% dong', 'order')
  manager.addDocument('id', '%number% deh', 'order')
  manager.addDocument('id', '%number% %product% %brand% %type% deh', 'order')
  manager.addDocument('id', '%brand% aja %type% deh', 'order')
  manager.addDocument('id', '%brand% %product% %type% saja %number% deh', 'order')
  manager.addDocument('id', 'eh ga jadi %brand% %brand% aja %number% %type%', 'order')
  manager.addDocument('id', 'wah sorry ga jadi %brand% %brand% aja %number% %type%', 'order')
  manager.addDocument('id', '%number% %number_rgx%', 'order')
  manager.addDocument('id', 'yg %product% %type% %number% %number_rgx%', 'order')
  manager.addDocument('id', '%positive%', 'order')
  manager.addDocument('id', 'pengen %brand% yang bikin %product% dong', 'order')
  manager.addDocument('id', 'lagi %product% neh pengen %brand%', 'order')
  manager.addDocument('id', 'ada obat anti %brand%', 'order')
  manager.addDocument('id', 'mau yang bikin %brand%', 'order')
  manager.addDocument('id', 'galau nih butuh %brand% yang bikin %product%', 'order')
  manager.addDocument('id', 'jago juga lu, ada %brand% yang bikin %product% ga', 'order')
  manager.addDocument('id', 'yang bikin %brand% boleh hehe', 'order')
  manager.assignDomain('id', 'payment', 'transaction')
  manager.addDocument('id', 'mau pesan %brand% %product% %number% bayar pake %payment%', 'payment')
  manager.addDocument('id', 'mau pesan %brand% %product% %payment%', 'payment')
  manager.addDocument('id', 'mau pesan %brand% %type% %number% bayar nya pakai %payment%', 'payment')
  manager.addDocument('id', 'pesan %brand% %product% %number% bayar pakai %payment%', 'payment')
  manager.addDocument('id', 'mau pesan %brand% %type% %number% anter ke %address% nanti bayar pakai %payment%', 'payment')   
  manager.addDocument('id', 'bayar pakai %payment%', 'payment')
  manager.addDocument('id', 'via %payment%', 'payment')
  
  manager.assignDomain('id', 'order', 'changeAddress')
  manager.addDocument('id', 'ganti %address%', 'changeAddress')

  await manager.train()
  manager.save("./nlp/model.json")
}

train();