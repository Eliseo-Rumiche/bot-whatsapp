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
        const phone = await req.body.phone
        const chaId = `51${phone}@c.us`
        const message = await req.body.message

        bot.sendMessage(chaId, message);
        console.log(`[+ ${phone} ] => messagetxt `)
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
        const phone = await req.body.phone
        const chaId = `51${phone}@c.us`
        const media = messageMedia.fromFilePath(file.path);
        media.filename = file.originalname
        media.mimetype = file.mimetype

        bot.sendMessage(chaId, media);
        console.log(`[+ ${phone} ] => ${file.originalname}`)

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


app.listen(app.get('port'), () => {
    
    console.log('INICIANDO BOT ESPERE .....')
    bot = getClient()
    
});
