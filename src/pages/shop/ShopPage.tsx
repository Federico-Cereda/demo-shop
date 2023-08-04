import { useEffect, useState } from "react"
import { Product } from "../../model/product";
import { pb } from "../../pocketbase";
import { useCartPanel } from "../../services/cart/useCartPanel";
import { useCart } from "../../services/cart/useCart";
import { getPBImgPath } from "../../shared/db/img.utils";

export function ShopPage() {
    const[products, setProducts] = useState<Product[]>([])
    const openPanel = useCartPanel(state => state.openPanel);
    const addToCart = useCart(state => state.addToCart)

    useEffect(() => {
        console.log('init')
        pb.collection('products').getList<Product>()
        .then(res => {
            console.log(res)
            setProducts(res.items)
        })
    }, [])

    return (
        <div>
            <h1 className="title">SHOP</h1>

            <div 
            className="flex justify-around" 
            data-testid="productList"
            >
            {
                products.map(p => {
                    return <div key={p.id}>
                        <img src={getPBImgPath('products', p)} className="w-24 rounded-xl" />
                        {p.name} - € {p.cost}
                        <br/>
                        <button 
                        onClick={() => {
                            openPanel();
                            addToCart(p);
                        }} 
                        className="btn accent">add</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}
