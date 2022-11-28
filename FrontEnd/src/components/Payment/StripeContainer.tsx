import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentContainer"

const PUBLIC_KEY = "pk_test_51M8g42SJ4rqEyR8xhou2hmKLqeqQiCt7SnyESpWBUbi2uPq9ffubRGpATMFYCCf6tUvor6BzxemAmUiUNaVHz15N00BhcKGmHI";

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<div>
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
		</div>
	)
}