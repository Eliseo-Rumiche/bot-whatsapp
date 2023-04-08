const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
const { getClient, messageMedia} = require('./bot.js');
const bodyParser = require('body-parser');
const generateUUID = require('./utils.js')
let bot;



app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/message', async (req, res) => {
    let data = null
    const phone = '51' + req.body.phone + '@c.us'
    const message =await req.body.message
    try{
        bot.sendMessage(phone, message);
        data = { 
            success : true
        }
    }
    catch (err) {
        data = {
            success : false,
            error : err
        }
    }
    console.log(`[+${phone}] => ${message}`)
    res.json(data)

})



app.post('/message/media', async (req, res) => {
    let data = null
    const phone = '51' + req.body.phone + '@c.us'
    const urlMedia = await req.body.urlMedia
    const response = await axios.get(urlMedia, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const nameFile = 'file' + generateUUID() +'.pdf'
    fs.writeFileSync(nameFile, buffer);

    try{
        const media = messageMedia.fromFilePath('./'+nameFile);
        bot.sendMessage(phone, media);
        data = { 
            success : true
        }
    }
    catch (err) {
        data = {
            success : false,
            error : err
        }
    }
    fs.unlinkSync(nameFile);
    console.log(`[+${phone}] => ${urlMedia}`)
    res.json(data)

})


app.listen(app.get('port'), async() => {
    
    console.log('INICIANDO BOT ESPERE .....')
    bot = await getClient()
    
});