import { NavLink } from "react-router-dom";
import { selectCartIsEmpty, selectCartList, selectCartTotalCost, useCart } from "../../services/cart"
import { getPBImgPath } from "../../shared/db/img.utils"

export function CartPage() {
    const list = useCart(selectCartList);
    const cartTotal = useCart(selectCartTotalCost);
    const cartIsEmpty = useCart(selectCartIsEmpty);
    const removeFromCart = useCart(state => state.removeFromCart);
    const increaseQty = useCart(state => state.increaseQty);
    const decreaseQty = useCart(state => state.decreaseQty);
    
    return (
        <div>
            <h1 className="title">CART</h1>

            <ul>
                {
                    list.map(item => 
                        <li 
                        key={item.product.id} 
                        className="flex flex-col sm:flex-row justify-between items-center rounded-2xl my-3 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <img src={getPBImgPath('products', item.product)} className="w-24 rounded-xl" />
                                <div className="font-bold">{item.product.name}</div>
                            </div>

                            <div className="flex items-center">
                                <button className="btn primary" onClick={() => decreaseQty(item.product.id)}>-</button>
                                <div className="font-bold">€ {item.product.cost} x {item.qty}</div>
                                <button className="btn primary" onClick={() => increaseQty(item.product.id)}>+</button>

                                <button onClick={() => removeFromCart(item.product.id)}>delete</button>
                            </div>

                            <div className="font-bold">€ {item.product.cost * item.qty}</div>

                        </li>
                    )
                }
            </ul>

            <hr/>

            {
                cartIsEmpty ?

                <div>
                    No Products in cart
                </div> :

                <div>
                    <h1>Total: {cartTotal}</h1>
                    <NavLink to="/checkout" className="btn primary">Checkout</NavLink>
                </div>
            }
        </div>
    )
}
