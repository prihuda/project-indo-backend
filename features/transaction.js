const async = require("async");
const helper = require("../helper/helper");
const config = require("../constant").config;
const _ = require("lodash");
const fs = require("fs");
const uuid = require("uuid");
const moment = require("moment");
const axios = require("axios");

module.exports = function(controller) {
    controller.plugins.cms.before("indomaret", "default", async(convo, bot) => {
        convo.gotoThread('default')
    })

	controller.plugins.cms.onChange( "indomaret", "_answ_menu_utama", async (response, convo, bot) => {
            console.log('=================')
            console.log('=================')
            switch(response) {
                case '1': 
                    await convo.gotoThread('indomaret_home')
                    break
                case '2': 
                    await convo.gotoThread('klik_indomaret')
                    break
                case '3': 
                    await convo.gotoThread('point_coffee')
                    break
                case '4': 
                    await convo.gotoThread('i_saku')
                    break
                case '5': 
                    await convo.gotoThread('my_point')
                    break
                default:
                    await convo.repeat()
            }
        }
    );

    controller.plugins.cms.onChange("indomaret", "answer_menu_indomaret", async (response, convo, bot) => {
        console.log('=================')
        console.log('=================')
        switch(response) {
            case '1': 
                await convo.gotoThread('list_promosi')
                break
            case '2': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "Untuk mencari produk yang diinginkan atau toko yang menjual produk tersebut, silahkan gunakan https://www.klikindomaret.com/ atau download aplikasi *Klik Indomaret* di GooglePlay dan Appstore.\n\nUntuk mencari produk *Yummy Choice* atau toko yang menjual, silahkan klik  https://indomaret.co.id/yummychoice",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('indomaret_home')
                })
                .catch(err => {
                    console.log(err)
                })
                break
            case '3': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "Untuk meninggalkan pesan dan saran kepada kami silahkan SMS ke nomor 0811 1500 280, atau klik link berikut:\nhttps://indomaret.co.id/utama/hubungi-kami.html\nJika Anda perlu bantuan customer service Indomaret, silahkan hubungi 1500-280.",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('indomaret_home')
                })
                .catch(err => {
                    console.log(err)
                })
                break
            case '0': 
                await convo.gotoThread('default')
                break
            default:
                await convo.repeat()
        }
    }
);

controller.plugins.cms.onChange(
    "indomaret",
    "_answ_tawar_aju",
    async (response, convo, bot) => {
        console.log('=================')
        console.log('=================')
        switch(response) {
            case 'a': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "Untuk kriteria lokasi yang kami cari, klik link berikut:\n https://indomaret.co.id/mitra/penawaran-properti-dan-lokasi/cari-lokasi.html\n\nUntuk mengajukan penawaran lokasi untuk disewakan, klik link berikut: https://indomaret.co.id/mitra/penawaran-properti-dan-lokasi/formulir-penawaran-lokasi.html",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('tawar_aju')
                })
                .catch(err => {
                    console.log(err)
                })
                break

            case 'b': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "Untuk informasi syarat pemasok, klik link berikut: \nhttps://indomaret.co.id/mitra/info-pemasok/syarat-pemasok.html\n\nUntuk mendaftar menjadi pemasok, klik link berikut: https://indomaret.co.id/mitra/info-pemasok/formulir-penawaran-produk-online.html",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('tawar_aju')
                })
                .catch(err => {
                    console.log(err)
                })
                break
            case 'c': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "Untuk informasi sewa teras, klik link berikut: \nhttps://indomaret.co.id/mitra/sewa-teras/informasi-sewa-teras.html\n\nUntuk mendaftar menjadi penyewa teras, klik link berikut:\nhttps://indomaret.co.id/mitra/sewa-teras/pendaftaran-sewa-teras.html",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('tawar_aju')
                })
                .catch(err => {
                    console.log(err)
                })
                break
            case 'd': 
                await api({
                    url: config.whatsappApi + "whatsapp/sendText",
                    method: "post",
                    data: {
                        to: "+" + convo.step.options.channel,
                        message: "● Bagaimana cara jika ingin bekerjasama di Payment Point Indomaret\n\nUntuk penawaran kerjasama, dapat mengirimkan proposal pengajuan kerjasama ke alamat email berikut ini : arbet@indomaret.co.id; daru@indomaret.co.id; sendy@indomaret.co.id. \n\n● Untuk mengetahui daftar biller Payment point yang bisa dilayani di Indomaret\n\nUntuk mengetahui daftar biller Payment Point Indomaret, dapat klik link berikut : https://indomaret.co.id/utama/layanan/payment-point.html\n\n● Untuk mengetahui cara melakukan transaksi payment point di Indomaret\n 1) Konsumen cukup informasikan kepada kasir Indomaret nama biller payment point yang akan dilakukan pembayaran oleh konsumen.\n2) Sebutkan nomor tagihan / kode pembayaran kepada kasir Indomaret\n3) Lakukan pembayaran sesuai nominal tagihan transaksi yang tampil pada layar POS Kasir Indomaret.\n4) Kasir akan memproses transaksi dan struk transaksi akan tercetak.\n5) Simpan struk transaksi sebagai bukti pembayaran yang sah.\n\n● Syarat & ketentuan layanan Payment Point di Indomaret\n1)	Pastikan dana untuk melakukan pembayaran cukup.\n2) Pembayaran tidak dapat menggunakan kartu kredit, i – voucher, dan Voucher belanja elektronik Indomaret.\n3) Transaksi pembayaran yang sudah berhasil dilakukan tidak dapat dibatalkan.\n4) Penyelesaian apabila terjadi kendala dalam transaksi, maka akan diselesaikan maksimal 2x24 jam.\n5) Indomaret hanya sebagai channel pembayaran saja, untuk kendala transaksi dapat menghubungi biller/merchant terkait.",
                        token: config.token
                    }
                }).then(response => {
                    convo.gotoThread('tawar_aju')
                })
                .catch(err => {
                    console.log(err)
                })
                break
            case 'e': 
                await convo.gotoThread('tawar_aju_ticketing')
                // await convo.gotoThread('tawar_aju')

                // await api({
                //     url: config.whatsappApi + "whatsapp/sendText",
                //     method: "post",
                //     data: {
                //         to: "+" + convo.step.options.channel,
                //         message: "Promosi berlaku selama periode yang tertera. https://indomaret.co.id/utama/promosi/promo-bank.html",
                //         token: config.token
                //     }
                // }).then(response => {
                //     convo.gotoThread('list_promosi')
                // })
                // .catch(err => {
                //     console.log(err)
                // })
                break

                case 'e': 
                    await convo.gotoThread('tawar_aju_tartun')
                    // await convo.gotoThread('tawar_aju')
                    // await api({
                    //     url: config.whatsappApi + "whatsapp/sendText",
                    //     method: "post",
                    //     data: {
                    //         to: "+" + convo.step.options.channel,
                    //         message: "Promosi berlaku selama periode yang tertera. https://indomaret.co.id/utama/promosi/promo-bank.html",
                    //         token: config.token
                    //     }
                    // }).then(response => {
                    //     convo.gotoThread('list_promosi')
                    // })
                    // .catch(err => {
                    //     console.log(err)
                    // })
                    break

            case '99': 
                await convo.gotoThread('tawar_aju')
                break

            case '0': 
                await convo.gotoThread('default')
                break
            default:
                await convo.repeat()
        }
    }
);

    controller.plugins.cms.onChange(
		"indomaret",
		"answer_menu_indomaret_promosi",
		async (response, convo, bot) => {
            console.log('=================')
            console.log('=================')
            switch(response) {
                case 'a': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Katalog Super Hemat berlaku Nasional (kecuali Indomaret Point) Harga diluar Jawa & Bali selisih +Rp 1.000.",
                            token: config.token,
                            document: 'https://indomaret.co.id/pdf/sh.pdf'
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case 'b': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Harga Heboh berlaku Nasional (kecuali Indomaret Point).",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/heboh.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                case 'c': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Harga HTH berlaku Nasional (kecuali Indomaret Point).",
                            token: config.token,
                            document: 'https://indomaret.co.id/pdf/hth.pdf'
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                case 'd': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Harga Product of The Week berlaku Nasional (kecuali Indomaret Point). Harga diluar Jawa & Bali selisih +Rp 1.000.",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/ptw.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                case 'e': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Promosi berlaku selama periode yang tertera.",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/promobank.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case 'f': 
                    await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Promosi berlaku selama periode yang tertera.",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/promobank.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('list_promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case '99': 
                    await convo.gotoThread('indomaret_home')
                    break

                case '0': 
                    await convo.gotoThread('default')
                    break
                default:
                    await convo.repeat()
            }
        }
    );

    controller.plugins.cms.onChange(
		"indomaret",
		"_answ_mypoint",
		async (response, convo, bot) => {
            switch(response) {
                case '1': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "MyPoin adalah program loyalti yang memberikan berbagai keuntungan seperti penukaran POIN terhadap pembelanjaan, pengumpulan STAMP yang dapat ditukarkan dengan produk pilihan, dan kesempatan untuk menikmati penawaran harga khusus. Semakin sering anda berbelanja dengan MyPoin, semakin banyak POIN dan STAMP yang Anda kumpulkan.\n\nKetentuan pengumpulan POIN:\nSetiap pembelanjaan produk di merchant Indomaret, Klikindomaret dan Indogrosir (kecuali produk tertentu) akan mendapatkan POIN. Khusus Indomaret (termasuk klikindomaret), Anda dapat mengumpulkan POIN dengan max. pembelanjaan Rp. 5,000,000 setiap bulannya. \n\nKetentuan pengumpulan STAMP: \n•  Setiap pembelian produk yang memiliki STAMP = 1 STAMP.\n•  Informasi mengenai jumlah STAMP yang dimiliki, masa berlaku, serta penukaran produk dapat dilihat di aplikasi MyPoin.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('my_point')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '2': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Saat ini MyPoin dapat digunakan di Indomaret, KlikIndomaret, dan Indogrosir",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('my_point')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '3': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Anda cukup men-download aplikasi *MyPoin* di AppStore dan PlayStore lalu pilih menu Registrasi dan ikuti langkah selanjutnya. Anda akan mendapatkan nomor kartu virtual setelah sukses terdaftar menjadi member MyPoin.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('my_point')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '4': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Untuk meninggalkan pesan dan saran kepada kami, silahkan email ke info@mypoin.id. Jika Anda perlu bantuan customer service, silahkan hubungi 1500-280.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('my_point')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case '0': 
                    convo.gotoThread('default')
                    break
                    
                default:
                    await convo.repeat()
                    break
            }
        }
    );

    controller.plugins.cms.onChange(
		"indomaret",
		"_answ_isaku",
		async (response, convo, bot) => {
            switch(response) {
                case '1': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "i.saku adalah uang eletronik server based dari PT Inti Dunia Sukses yang bisa didownload di playstore atau apps store.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('i_saku')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '2': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Pembayaran lebih mudah, banyak promosi & tersedia lebih dari 1.000 fitur pembayaran tagihan bulanan.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('i_saku')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '3': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: " A. *Cara daftar layanan standar service* - Download aplikasi i.saku lalu masuk ke menu daftar pada tampilan login. \n B. *Cara daftar layanan full service* - Lakukan registrasi standar service terlebih dahulu, lalu masuk ke menu profile & klik tombol.\n C. *Perbedaan layanan standar service & full service* – Pengguna standar service tidak bisa melakukan transaksi transfer & tarik tunai saldo i.saku, tidak seperti pengguna i.saku full service. \n D. *Apakah saya bisa memiliki lebih dari 1 akun i.saku?* 1 nomor HP hanya bisa memiliki 1 akun i.saku.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('i_saku')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '4': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "A. *Top Up Saldo* \n • Lewat Toko Retail - Saat ini top up bisa dilakukan di toko yang bekerjasama seperti Indomaret & Indogrosir. \n• Lewat Bank - Top Up lewat Bank bisa menggunakan ATM, Internet banking, SMS Banking & Mobile Banking. Langkah Top up bisa dilihat langsung di aplikasi isaku. \n\n B. *Purchase* – Untuk membayar menggunakan i.saku di Toko Indomaret, Anda harus meminta token terlebih dahulu dari menu “Belanja”, lalu tunjukkan kode token atau barcode ke kasir. \n\n C. *Cashout* - Penarikan saldo bisa dilakukan di toko Indomaret, Indogrosir & ATM CIMB Niaga. Pilih menu Tarik Tunai di aplikasi i.saku, lalu pilih lokasi penarikan tunai dan ikuti langkah selanjutnya. \n\n D. *Transfer* – Transfer saldo ke sesama pengguna i.saku, penerima saldo i.saku tidak harus pengguna i.saku full service. \n\n E. *Pembelian Pulsa* – Pilih menu Pulsa, masukkan no HP anda kemudian pilih Pulsa atau Data, lalu pilih Nominal yang dikehendaki. \n\n E. *Pembayaran Tagihan* – Pilih menu pembayaran yang dikehendaki atau cari di menu pencarian, lalu masukkan ID pelanggan atau kode bayar anda. \n\n F. *Pembayaran Belanja Online* – Belanja di e-commerce yang Anda inginkan, lalu pilih pembayaran melalui Indomaret, disitu Anda akan mendapatkan kode bayar. Pilih menu Belanja Online, lalu pilih e-commerce dimana Anda bertransaksi. Masukkan kode bayar yang Anda dapatkan di e-commerce. \n\n G. *Top Up e-money* \n\n H. *Masuk ke menu e-money*, jika hp Anda memiliki fitur NFC maka tempel kartu agar aplikasi dapat membaca nomor kartu e-money Anda. Jika sudah terbaca lanjutkan dengan pilih nominal top up. Lakukan update saldo setelah top up sukses. \n\n I. Jika Anda tidak memiliki fitur NFC, maka Anda bisa mengetik nomor kartu e-money Anda di kolom yang disediakan. Jika top up sudah berhasil, Anda dapat melakukan update saldo melalui mesin EDC & ATM \n\n J. *Pembelian vouchers & streaming* – Pilih menu voucher & streaming, lalu pilih nominal voucher yang diinginkan. Kode voucher dapat dilihat di struk transaksi pada mutasi virtual. \n\n K. *Pembelian tiket kereta api* – masuk menu tiket kereta api, pilih destinasi & tanggal keberangkatan. Jika ada, Anda bisa memilih kereta yang diinginkan. Lanjutkan transaksi sampai berhasil, kemudian tukarkan kode booking yang ada pada bawah struk untuk mencetak ulang tiket fisik di stasiun keberangkatan.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('i_saku')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                    case '5': 
                    await api({
                            url: config.whatsappApi + "whatsapp/sendText",
                            method: "post",
                            data: {
                                to: "+" + convo.step.options.channel,
                                message: "Cek promosi & ketentuannya di https://www.i-saku.com/Promotion",
                                token: config.token
                            }
                        }).then(response => {
                            convo.gotoThread('i_saku')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break

                    case '6': 
                    await api({
                            url: config.whatsappApi + "whatsapp/sendText",
                            method: "post",
                            data: {
                                to: "+" + convo.step.options.channel,
                                message: "Komplain terkait transaksi i.saku- Apabila terdapat keluhan sehubungan dengan penggunaan i.saku atau promosi harap hubungi call center i.saku di 1500 280 (Senin – Jumat, di jam kerja) atau sms ke 08111500280 atau isi form pada https://www.i-saku.com/Contact.",
                                token: config.token
                            }
                        }).then(response => {
                            convo.gotoThread('i_saku')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break

                case '0': 
                    convo.gotoThread('default')
                    break
                    
                default:
                    await convo.repeat()
                    break
            }
        }
    );

    controller.plugins.cms.onChange(
		"indomaret",
		"_answ_pointcoffee",
		async (response, convo, bot) => {
            switch(response) {
                case '1': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Menu Point Coffee",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/pointcoffeemenu.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('point_coffee')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '2': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendDocument",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            caption: "Promo Point Coffee",
                            token: config.token,
                            document: "https://indomaret.co.id/pdf/pointcoffeepromo.pdf"
                        }
                    }).then(response => {
                        convo.gotoThread('point_coffee')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '3': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Untuk lokasi Point Coffee terdekat Anda bisa langsung cek di website kami https://Pointcoffee.id atau Google Map dengan menuliskan Point Coffee.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('point_coffee')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '4': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Terima kasih atas feedback-nya. Pertanyaan atau keluhan Anda dapat langsung kontak Call Center (1500-280) atau kontak Instagram kami di @Pointcoffeeid.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('point_coffee')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case '0': 
                    convo.gotoThread('default')
                    break
                    
                default:
                    await convo.repeat()
                    break
            }
        }
    );

    controller.plugins.cms.onChange(
		"indomaret",
		"_answ_klikindomaret",
		async (response, convo, bot) => {
            switch(response) {
                case '1': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "a). *Pesanan Transaksi Retail* \nUntuk Status Pesanan pada Pesanan Transaksi Retail, bisa Anda cek di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n b). *Pesanan Transaksi Virtual* \n Untuk Status Pesanan pada Pesanan Transaksi Virtual, bisa Anda cek di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n c). *Pesanan Transaksi Travel* \nUntuk Status Pesanan pada Pesanan Transaksi Travel, bisa Anda cek di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\nd). *Pesanan Transaksi Entertainment* \nUntuk Status Pesanan pada Pesanan Transaksi Entertainment, bisa Anda cek di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('klik_indomaret')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '2': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "a). *Pesanan Transaksi Retail* \nUntuk Status Refund Pesanan Transaksi Retail Anda, bisa di cek pada menu Pengembalian Dana di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\nb).*Pesanan Transaksi Virtual* \nUntuk Status Refund Pesanan Transaksi Virtual Anda, bisa di cek pada menu Pengembalian Dana di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n c).	*Pesanan Transaksi Travel* \nUntuk Status Refund Pesanan Transaksi Travel Anda, bisa di cek pada menu Pengembalian Dana di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n d).	*Pesanan Transaksi Entertainment* \nUntuk Status Refund Pesanan Transaksi Retail Anda, bisa di cek pada menu Pengembalian Dana di klikindomaret.com/order/status. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('klik_indomaret')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '3': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "Untuk ketentuan retur dapat Anda lihat di klikindomaret.com/bantuan/pengembalian. Jika ada yang hendak ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('klik_indomaret')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '4': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendText",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            message: "a). *Voucher Belanja Klik Indomaret Tidak Dapat Digunakan* \nUntuk Voucher Belanja Klik Indomaret yang tidak dapat digunakan, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n b). *Voucher Belanja Klik Indomaret Belum Dapat* \nUntuk Voucher Belanja Klik Indomaret yang belum Anda dapatkan, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n c). *Kupon Tidak Dapat Digunakan* \nUntuk Kupon yang tidak dapat digunakan, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n d). *Kupon Belum Dapat* \nUntuk Kupon Klik Indomaret yang belum Anda dapatkan, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com.",
                            token: config.token
                        }
                    }).then(response => {
                        convo.gotoThread('klik_indomaret')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                    case '5': 
                    await api({
                            url: config.whatsappApi + "whatsapp/sendText",
                            method: "post",
                            data: {
                                to: "+" + convo.step.options.channel,
                                message: "a). *Cara Registrasi Member* \nUntuk cara registrasi member, bisa dilakukan melalui Website atau Aplikasi Klik Indomaret dengan pilih menu Daftar. Cukup isi No Hp yang ingin di daftarkan, kemudian Anda akan menerima kode OTP (One Time Password) untuk verifikasi. Jika proses verifikasi sudah berhasil Anda bisa langsung melakukan transaksi di Klik Indomaret. Selamat berbelanja sobat. \n\nb). *Kendala Tidak Mendapatkan OTP Registrasi* \nUntuk cara registrasi member, bisa dilakukan melalui Website atau Aplikasi Klik Indomaret dengan pilih menu Daftar. Cukup isi No Hp yang ingin di daftarkan, kemudian Anda akan menerima kode OTP (One Time Password) untuk verifikasi. Jika proses verifikasi sudah berhasil Anda bisa langsung melakukan transaksi di Klik Indomaret. Selamat berbelanja sobat. \n\n c). *Cara Ganti No HP di Akun Klik Indomaret* \nUntuk Cara Ganti No HP di Akun Klik Indomaret, Anda bisa melakukan perubahan di menu Informasi Akun lalu pilih menu Ubah Nomor Ponsel. Pastikan No HP yang Anda input aktif karena akan mengirimkan kode OTP (One Time Password) untuk verifikasi kembali. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n d). *Cara Ganti Email di Akun Klik Indomaret* \nUntuk alamat email yang sudah didaftarkan tidak dapat diubah atau diganti. Mohon dipastikan saat melakukan registrasi member melalui email yang Anda masukan dalam kondisi aktif. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com. \n\n e). *Lupa Password/Kata Sandi*\n Jika Anda mengalami Lupa Password, silahkan Anda pilih menu 'Lupa Kata Sandi' yang ada di halaman Login Klik Indomaret. Kode OTP dan Link Reset Password akan dikirimkan melalui Email atau SMS. Kode OTP dan Link Reset Password dapat Anda gunakan untuk mengganti password lama menjadi password baru. Jika ada yang ingin ditanyakan kembali, Anda bisa menyampaikannya melalui layanan pelanggan kami di 1500280 atau customercare@klikindomaret.com.",
                                token: config.token
                            }
                        }).then(response => {
                            convo.gotoThread('klik_indomaret')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break

                case '0': 
                    convo.gotoThread('default')
                    break
                    
                default:
                    await convo.repeat()
                    break
            }
        }
    );

	controller.plugins.cms.onChange(
		"indomaret",
		"_answ_promosi",
		async (response, convo, bot) => {
            switch(response) {
                case '1': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendImage",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            image: "https://res.cloudinary.com/damcorp/image/upload/v1574752228/promoindo.jpg",
                            token: config.token,
                            caption: 'Promotion 1'
                        }
                    }).then(response => {
                        convo.gotoThread('promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '2': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendImage",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            image: "https://res.cloudinary.com/damcorp/image/upload/v1574752228/promoindo.jpg",
                            token: config.token,
                            caption: 'Promotion 2'
                        }
                    }).then(response => {
                        convo.gotoThread('promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '3': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendImage",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            image: "https://res.cloudinary.com/damcorp/image/upload/v1574752228/promoindo.jpg",
                            token: config.token,
                            caption: 'Promotion 3'
                        }
                    }).then(response => {
                        convo.gotoThread('promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '4': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendImage",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            image: "https://res.cloudinary.com/damcorp/image/upload/v1574752228/promoindo.jpg",
                            token: config.token,
                            caption: 'Promotion 4'
                        }
                    }).then(response => {
                        convo.gotoThread('promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break
                
                case '5': 
                await api({
                        url: config.whatsappApi + "whatsapp/sendImage",
                        method: "post",
                        data: {
                            to: "+" + convo.step.options.channel,
                            image: "https://res.cloudinary.com/damcorp/image/upload/v1574752228/promoindo.jpg",
                            token: config.token,
                            caption: 'Promotion 5'
                        }
                    }).then(response => {
                        convo.gotoThread('promosi')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    break

                case '0': 
                    convo.gotoThread('default')
                    break
                    
                default:
                    await convo.repeat()
                    break
            }
        }
    );

    function api(payload){
        return new Promise((resolve, reject) => {
            let session = uuid()
            console.log(moment().toString(), `session=${session},`, `Request Out [${payload.url}] with data:`, payload.params || payload.data)
            axios(payload)
            .then(response => {
                console.log(moment().utcOffset(7).toString(), `session=${session}`, `Get Response From [${payload.url}]:`, response.data)
                resolve(response)
            })
            .catch(err => {
                console.error(moment().utcOffset(7).toString(), `session=${session}`, `Get Error Response From [${payload.url}]:`, err)
                reject(err)
            })
        })
    }
};