const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

exports.getClient = () =>{
    const client = new Client({
        authStrategy: new LocalAuth({
        }),
        puppeteer: {
            args: ['--no-sandbox']
        },
    })

    client.initialize();
    client.on("qr", qr => {
        qrcode.generate(qr, { small: true });
        console.log(`⚡ Escanea el  QR   ⚡'`);
        console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    })


    client.on("ready", () => {
        console.log('\n=============[ BOT ACTIVADO ]=============')
        console.log(`[ + LOGS + ]\n`);
    })

    return client
}

exports.messageMedia = MessageMedia



