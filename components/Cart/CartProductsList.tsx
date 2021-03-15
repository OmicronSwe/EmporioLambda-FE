import React from 'react'
import {observer} from 'mobx-react'

@observer
class CartProductList extends React.Component<{products: any[]}, {}> {
    render() {
        return (
            <table className="product-list">
                <caption> Shopping Cart </caption>
                <thead>
                <tr>
                <th>Name</th>
                <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.products.map(product => (
                        <tr key={product.id}>
                        <td>{product.image}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
}

export default CartProductList