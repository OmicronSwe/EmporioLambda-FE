import React from 'react'
import CartView from '../View/CartView'

class CartController extends React.Component<{viewModel}, {}> {
    render() {
        const { viewModel } = this.props

        return (
            <CartView
                products={viewModel.getProducts()}
            />
        )
    }
}

export default CartController