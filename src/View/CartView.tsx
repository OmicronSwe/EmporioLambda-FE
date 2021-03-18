import React from 'react'
import CartProductList from '../../components/Cart/CartProductsList'
import Product from '../../components/Cart/product'

class CartView extends React.Component<{products : Product[]},{}> { 
    render() {
        const {
            products,
        } = this.props

        return (
            <CartProductList
                products={products}
            />
        )
    }
}

export default CartView