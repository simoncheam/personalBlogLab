import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, BlogTagsJoined, Tags } from '../client_types';
import Skeleton from 'react-loading-skeleton'

// CardElement is a combined imput of a user's CC number, exp date, and CVC
// you can choose to import each piece individually to customize your form
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { APIService } from '../services/APIService';



const Donate = (props: DonateProps) => {

    // hook into our connected client-end stripe context provider
    // which we'll use to tokenize a person's card
    const stripe = useStripe();
    let navigate = useNavigate();



    // hook into the individual element or elements they give us for CC info
    const elements = useElements();

    const [amount, setAmount] = React.useState('');
    const [name, setName] = React.useState('');
    const [userEmail, setuserEmail] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipcode, setZipcode] = React.useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // if our hooks failed to consume a provider's context
        // we should prob not un any of this function

        if (!stripe || !elements) return;

        // get the card's sensitive information safely from the stripe context
        const cardElement = elements.getElement(CardElement);

        // use the cardElement data to create a payment method with their card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,  // card info comes from cardElement
            billing_details: {
                address: {
                    city: city,
                    country: "US",
                    line1: address1,
                    line2: address2,
                    postal_code: zipcode,
                    state: state
                },
                email: userEmail,
                name: name,
                phone: "+15555555555"
            }

        });
        if (error) {
            console.log('error: ', error)
        } else {
            console.log('paymentMethod', paymentMethod);
        }

        // Actions: Check out the createPaymentMethod (shows input options)


        if (error) {
            console.log('[error]', error);

        } else {
            // POST the create payment method to out own endpoint
            //const res = await 
        //@ts-ignore
            
            APIService('/api/donate', 'POST', {
                amount,
                paymentMethod

            })
            .then(data=>{
                
               // const successfulPayment = await res.json();
                
                console.log(data);
                alert('Thank you so much!🙏😊') 
                navigate(`/`)
            } )
            .catch(e=> console.log(e))
            
        }

    }


    return (
        <>

            <main className="container">
                <h1 className="display-3 m-3 text-center">If you're enjoying the blog, your support is greatly appreciated... </h1>
                <p className="display-6 m-3 text-center">Your donation helps us keep the lights on. Thank you:)</p>

                <section className="row mt-5 justify-content-center">
                    <div className="col-md-6">



                        <div className="m-5 justify-content-center">

                            <form className="form-group p-3 border rounded-lg" >

                                <input className="form-control"
                                    placeholder="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />

                                <input className="form-control"
                                    value={amount}
                                    placeholder="donation amount"
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <input type="email" className="form-control" placeholder="Email"
                                    value={userEmail}
                                    onChange={e => setuserEmail(e.target.value)}
                                />

                                <input className="form-control"
                                    value={address1}
                                    placeholder="123 ABC Street"
                                    onChange={e => setAddress1(e.target.value)}
                                />
                                <input className="form-control"
                                    value={address2}
                                    placeholder="Apartment, studio, floor, tent"
                                    onChange={e => setAddress2(e.target.value)}
                                />
                                <input className="form-control"
                                    value={city}
                                    placeholder="city"
                                    onChange={e => setCity(e.target.value)}
                                />
                                <input className="form-control"
                                    value={state}
                                    placeholder="state"
                                    onChange={e => setState(e.target.value)}
                                />
                                <input className="form-control"
                                    value={zipcode}
                                    placeholder="zipcode"
                                    onChange={e => setZipcode(e.target.value)}
                                />





                                <CardElement className="form-control" />



                                <button onClick={handleSubmit} className="btn btn-success">Donate Now</button>
                            </form>


                        </div>

                    </div>
                </section>
            </main>
        </>


    )

}
interface DonateProps { }


export default Donate;