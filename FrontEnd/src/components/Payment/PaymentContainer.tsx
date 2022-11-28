import React, { useState } from 'react';
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./PaymentStyle.css"


// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "#fce883" },
// 			"::placeholder": { color: "#87bbfd" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// }


const PaymentFunc=()=>{

    const [success,setSuccess] = useState(false);
    const stripe:any = useStripe();
    const elements:any = useElements()

    const handleSubmit=async(e:any)=>{
        e.preventDefault()
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })
    

    if(!error)
    {
        try{
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment",{
                amount:1000,
                id
            })

            if(response.data.success)
            {
                console.log("Successfull payment !")
                setSuccess(true)
            }
        }
        catch(error)
        {
            console.log("Error ",error);
        }
    }
    else{
        console.log(error.message)
    }
    }
    return (
        <div>
             {!success ? <form onSubmit={handleSubmit}>
                 <fieldset className='FormGroup'> 
                     <div className="FormRow">
                     <CardElement className="form-control" />
                     </div>
                 </fieldset>
                 <button className="pay">Pay</button>
             </form>
             :
                 <div className='msg'>
                     <h2>Congratulations ! You are a premium Member now.</h2>
                 </div>
             }
        </div>
    )
}

export default PaymentFunc;