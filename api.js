const express = require('express');
const app = express();
const { getClient, messageMedia} = require('./bot.js');
let bot;



app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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

    try{
        const media = await messageMedia.fromUrl(urlMedia);
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
    console.log(`[+${phone}] => ${urlMedia}`)
    res.json(data)

})



app.listen(app.get('port'), async() => {
    
    console.log('INICIANDO BOT ESPERE .....')
    bot = await getClient()
    
});