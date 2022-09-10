const qrcode = require("qrcode-terminal");

module.exports={
    name: 'qr',
    execute: async(client, qr)=>{
        console.log(qrcode.generate(qr, {small: true}))
    }
}