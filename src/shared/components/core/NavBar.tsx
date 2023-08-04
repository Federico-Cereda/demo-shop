import { NavLink, useNavigate } from "react-router-dom";
import { CartPanel } from "./CartPanel";
import { selectCartIsEmpty, selectCartTotalCost, selectCartTotalItems, useCart, useCartPanel } from "../../../services/cart";
import { useAuth } from "../../../services/auth/useAuth";
import { IfLogged } from "../../auth/IfLogged";

    export function NavBar() {
        const navigate =useNavigate()
        const isEmpty =useCart(selectCartIsEmpty)
        const totalItems = useCart(selectCartTotalItems)
        const totalCost = useCart(selectCartTotalCost)
        const isOpen = useCartPanel(state => state.isOpen)
        const toggle = useCartPanel(state => state.toggle)
        const logout = useAuth(state => state.logout)

        return (
            <div className="fixed z-10 top-0 left-0 right-0 shadow-2xl">
            <div className="flex items-center justify-between h-20 bg-slate-900 text-white p-3 shadow-2xl">

                <NavLink to="shop">FB SHOP</NavLink>

                    {/* Cart Button Badge */}
                    <div>
                        {
                            !isEmpty &&
                            <button 
                            onClick={toggle} 
                            className="btn accent lg">
                            {totalItems} products (€ {totalCost})
                            </button>
                        }      
                    </div>

            </div>

            {isOpen && <CartPanel />}

            {/* Login / CMS / Logout buttons */}
            <div className="fixed bottom-2 right-2 text-white p-5">
                <IfLogged>
                    <NavLink to="cms" className="btn accent lg">cms</NavLink>
                </IfLogged>

                <IfLogged 
                else={<NavLink to="login" className="btn accent lg">login</NavLink>}
                >
                    <button className="btn primary lg" onClick={() => {
                        logout();
                        navigate('/login');
                    }}>logout</button>
                </IfLogged>
            </div>
            </div>
        )
    }
