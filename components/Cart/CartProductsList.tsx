import React from 'react'
import ProductInCart from '../../src/objects/ProductInCart'
import { Button } from 'react-bootstrap'

class CartProductList extends React.Component<{ auth, products: ProductInCart[], removeOnClick }, { products: ProductInCart[] }> {
    constructor(props){
        super(props)
        this.state = { products : this.props.products }
    }
    
    render() {
        if(this.state.products)
        return (
            <table className="product-list">
                <caption> Shopping Cart </caption>
                <thead>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.products.map(product => (
                        
                        <tr key={product.id}>
                        <td>{product.image}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td id={product.id + "price"}>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td><Button variant="primary" onClick={() => this.props.removeOnClick(product.id)}>Remove</Button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
        else return (
        <h2>Your cart is empty</h2>
        )
    }
}

export default CartProductList