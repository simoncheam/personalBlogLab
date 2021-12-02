import * as express from 'express';

import config from '../../config';

//new updates to mailgun
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    key: config.mailgun.apiKey,
    public_key: config.mailgun.pubKey
});


const router = express.Router();

router.post('/', async (req, res) => {

    const newEmail = req.body;
    
    try {
        console.log(config.mailgun.toEmail);
        console.log('post request - contact route try block - BEFORE RESULT');

        const result = await mg.messages.create(config.mailgun.domain, {

            to: config.mailgun.toEmail, // this is set to my email for testing; needs to be changed to contact's email later
            from: newEmail.from,
            subject: newEmail.subject,
            text: newEmail.message,
            
            //testing - need to figure out how to add variables later:

                //recipientName: recipient_name, //trying to set/test contact name for email personalization
                //contactName: newEmail.contactName, //trying to set/test contact name for email personalization
                //vars: vars.recipient_name //trying to set/test contact name for email personalization

            
        });

        //trying to create list - doesn't work yet! (TBD)

                // mailgun.post('/lists', {"address": `list_name@${config.mailgun.domain}`, "description": "test_list_description"}, function (error, body) {
                //     console.log(body);
                //   });

                // var list = mailgun.lists(`mylist@${config.mailgun.domain}`);

                // list.members().create(result, function (error, data) {
                //     console.log('List creation:');
                //     console.log(data);
                //   });

        
        
        console.log('this is the result:');
        console.log(result);

        res.status(201).json({ message: 'email yay!' }); 
    } catch (error) {


        console.log(error);
        res.status(500).json({ message: 'oh shit' })
    }
});

export default router;