import { userCartStore } from "@/store";
import { useEffect, useState } from "react"

export default function Checkout() {
  const cartStore = userCartStore();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
  }, [cartStore, cartStore.cart, cartStore.paymentIntent]);
    return (
        <div></div>
    )
}