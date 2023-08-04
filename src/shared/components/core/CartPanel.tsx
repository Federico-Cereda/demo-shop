import { useNavigate } from "react-router-dom"
import { selectCartList, selectCartTotalCost, useCart, useCartPanel } from "../../../services/cart"

export function CartPanel() {
    const navigate = useNavigate()
    const cartItems = useCart(selectCartList)
    const cartTotal = useCart(selectCartTotalCost)
    const closePanel = useCartPanel(state => state.closePanel)

    function goToCartHandler() {
        closePanel();
        navigate('/cart')
    }

    return(
        <div className="fixed bg-slate-800 right-4 top-24 p-3 shadow-2xl w-96">
            <ul>
                {
                    cartItems.map(item => {
                        return (
                            <li key={item.product.id} className="flex justify-between items-center border-b border-slate-600 pb-3">
                                <div>{item.product.name}</div>
                                <div className="flex gap-3">
                                    <div>({item.qty} x € {item.product.cost})</div>
                                    <div>€ {item.qty * item.product.cost}</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="flex justify-end text-xl font-bold my-3">
                <span>Total: €</span>
                <span>{cartTotal}</span>
            </div>

            <div className="flex justify-center">
                <button onClick={goToCartHandler} className="btn primary">Go to cart</button>
            </div>
        </div>
    )
}
