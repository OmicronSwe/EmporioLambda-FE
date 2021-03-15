import React from 'react'
import CartProductList from '../../components/Cart/CartProductsList'

class CartView extends React.Component<{products : any[]},{}> { //, productImage : string, productName : string, addProduct : any, removeProduct : any}, {}> {
    render() {
        const {
            products,
            /*productImage,
            productName,
            addProduct,
            removeProduct*/
        } = this.props

        return (
            <CartProductList
                products={products}
            />
        )
    }
}

export default CartView