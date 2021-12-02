import * as express from 'express';
import Stripe from 'stripe';
import config from '../../config' // connects to config folder with secret key

// connect stripe with our secret key
const stripe = new Stripe(config.stripe.secret, { apiVersion: '2020-08-27' });

const router = express.Router();

router.post('/', async (req, res) => {

    try {
        // await the promise to resolve to charge someone's card

        const paymentFulfilled = await stripe.paymentIntents.create({

            //specify currency
            currency: 'usd',
            amount: req.body.amount * 100,
            confirm: true,
            // the paymentMethod we created in our REact component
            payment_method: req.body.paymentMethod.id
        });

        res.json(paymentFulfilled);
        console.log('IT WORKS!');


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server, error, check the logs' });
    }
});

export default router;