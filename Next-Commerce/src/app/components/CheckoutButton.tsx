'usse client';
import { formatPrice } from "@/lib/utils";
import { userCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
    totalPrice: number;
}

export default function CheckoutButton({totalPrice}: CheckoutButtonProps) {
const {user} = useUser();
const cartStore = userCartStore();
const router = useRouter();
const handleCheckout = () => {
    if(!user){
        cartStore.toggleCart();
        router.push(`/sign-in?redirectUrl='/'`);
        return ;
    }
    cartStore.setCheckout("checkout")
}
  return (
    <div>
      <p className="text-teal-600 text-sm font-bold">
        Total: {formatPrice(totalPrice)}
      </p>
      <button
        onClick={handleCheckout}
        className="w-full rounded-md bg-teal-600 text-white py-2"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
