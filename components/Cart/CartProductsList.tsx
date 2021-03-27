import React from "react";
import { Button } from 'react-bootstrap'
import ProductInCart from '../../src/objects/ProductInCart'

class CartProductList extends React.Component<
  { auth; products: ProductInCart[]; removeOnClick; modifiable : boolean }
  > {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeProductQuantity = (id : string, event) => {
      this.props.products.forEach((product)=>{
        if(product.id === id)
        {
          product.quantity = event.target.value;
        }
      })
  }

  getModifiableInput = (modifiable : boolean, quantity : number, id : string) => {
    return modifiable ? 
    <input id={id+"quantity"} type="number" defaultValue={quantity} min="1" onChange={(event)=>{this.changeProductQuantity(id, event)}}/> :
    <input id={id+"quantity"} type="number" defaultValue={quantity} min="1" onChange={(event)=>{this.changeProductQuantity(id, event)}} disabled/>
  }

  getModifiableButton = (modifiable : boolean, id : string) => {
    return modifiable ?
    <Button variant="primary" onClick={() => this.props.removeOnClick(id)}>Remove</Button> :
    <Button variant="primary" onClick={() => this.props.removeOnClick(id)} disabled>Remove</Button>
  }

  render() {
    const { products, modifiable } = this.props
    if (products.length > 0)
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
                products.map(product => (
                <tr key={product.id}>
                    <td>{product.image}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td id={`${product.id  }price`}>{product.price}</td>
                    <td>{this.getModifiableInput(modifiable, product.quantity, product.id)}</td>
                    <td>{this.getModifiableButton(modifiable, product.id)}</td>
                </tr>
              ))}
              </tbody>
          </table>
      );
    else return <h2>Your cart is empty</h2>;
  }
}

export default CartProductList;
