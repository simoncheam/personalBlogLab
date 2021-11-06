import * as express from 'express';
//import Mailgun = require('mailgun.js'); //new update

//import Mailgun from 'mailgun.js'; //old shit - still need?
import * as FormData from 'form-data';
//import * as Mailgun from 'mailgun.js'; //doesn't work when enabled
import config from '../../config';

// new shit
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api', 
    key: config.mailgun.apiKey,
    public_key: config.mailgun.pubKey});


// old types: temp disable

// const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
//     username: 'api',
//     key: config.mailgun.apiKey
// });

// const mailgun = new Mailgun(FormData).client({
//         username: USERNAME,
//         key: config.mailgun.apiKey
//     });

const router = express.Router();

router.post('/', async (req,res)=>{

    const newEmail = req.body;
    console.log('post request - contact route before try block');

    try {
        console.log(config.mailgun.toEmail);
        console.log('post request - contact route try block - BEFORE RESULT');
        const result = await mg.messages.create(config.mailgun.domain, {
            to: config.mailgun.toEmail,
            subject: newEmail.subject,
            from: newEmail.from,
            text: newEmail.message
        });
        console.log('post request - inside try block - AFTER RESULT');

        console.log(result);

        res.status(201).json({message: 'email yay!'}); //{message: 'email yay!'}
    } catch (error) {
        console.log('INSIDE CATCH BLOCK');
        console.log(error);
        res.status(500).json({message: 'oh shit'})
    }
});

export default router;