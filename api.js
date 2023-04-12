const express = require('express');
const app = express();
const { getClient, messageMedia} = require('./bot.js');
const multer = require('multer');
const upload = multer({ dest: 'files/' });
const bodyParser = require('body-parser');
const fs = require('fs')

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



app.post('/message/media', upload.single('file'), async (req, res) => {
    let data = null
    
    try{
        const phone = '51' + req.body.phone + '@c.us'
        const file = req.file
        const media = messageMedia.fromFilePath(file.path);
        media.filename = file.originalname
        media.mimetype = file.mimetype

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
    fs.unlinkSync(file.path);
    console.log(`[+${phone}] => ${file.originalname}`)
    res.json(data)

})


app.listen(app.get('port'), async() => {
    
    console.log('INICIANDO BOT ESPERE .....')
    bot = await getClient()
    
});