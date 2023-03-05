require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { json } = require('express');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(json());
app.use(cors());

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {

    // console.log(req.body);
    // res.send({ status: 'success' });

    try {



        if (!req.body || !Array.isArray(req.body) || !req.body.length)
            return res.status(500).send({ success: 'fail' });

        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map(item => ({
                price_data: {
                    currency: 'rub',
                    product_data: {
                        name: item.name,
                        images: [item.product],
                    },
                    unit_amount: item.quantity * item.price * 100,
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        //console.log(session);

        res.send(session);
    } catch (e) {
        res.status(500).send({ success: 'fail', message: e.message || e });
    }
});

app.listen(4242, () => console.log('Running on port 4242'));