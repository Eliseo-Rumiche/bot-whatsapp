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
    try{
        const phone = '51' + req.body.phone + '@c.us'
        const message = await req.body.message
        bot.sendMessage(phone, message);
        console.log(`[+${phone}] => ${message}`)
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
    res.json(data)

})



app.post('/message/media', upload.single('file'), async (req, res) => {
    let data = null
    
    const file = req.file
    try{
        const phone = '51' + req.body.phone + '@c.us'
        const media = messageMedia.fromFilePath(file.path);
        media.filename = file.originalname
        media.mimetype = file.mimetype

        bot.sendMessage(phone, media);
        console.log(`[+${phone}] => ${file.originalname}`)

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
    res.json(data)

})


app.listen(app.get('port'), async() => {
    
    console.log('INICIANDO BOT ESPERE .....')
    bot = await getClient()
    
});