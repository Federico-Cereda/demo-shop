import { useState } from "react";
import { selectCartList, selectCartTotalCost, useCart } from "../../services/cart"
import { OrderForm } from "../../model/order-form";
import { useNavigate } from "react-router-dom";
import { pb } from "../../pocketbase";

export function Checkout() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name:'', email:'' })
    const totalCartCost = useCart(selectCartTotalCost);
    const cartItems = useCart(selectCartList);
    const clearCart = useCart(state => state.clearCart);
    
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setUser(s => ({...s, [name]: value}) )
    }

    function sendOrderHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const order: OrderForm = {
            user,
            order: cartItems,
            status: 'pending',
            total: totalCartCost
        }

        pb.collection('orders').create<OrderForm>(order)
        .then(() => {
            clearCart()
            navigate('/shop')
        })
    }

    return (
        <div className="max-w-sm mx-auto">
            <h1 className="title">CHECKOUT</h1>

            <div className="text-xl my-3 border-b">€ {totalCartCost}</div>

            <form className="flex flex-col gap-3"onSubmit={sendOrderHandler}>
                Your name:
                <input type="text" placeholder="Your name" name="name" value={user.name} onChange={changeHandler} />

                Your email:
                <input type="email" placeholder="Your email" name="email" value={user.email} onChange={changeHandler} />

                <button className="btn primary" type="submit">
                    CONFIRM ORDER
                </button>
            </form>
        </div>
    )
}
