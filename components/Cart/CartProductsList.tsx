import { max } from "cypress/types/lodash";
import React from "react";
import { Button, Table } from 'react-bootstrap'
import ProductInCart from '../../src/objects/ProductInCart'

class CartProductList extends React.Component<
  { auth; products: ProductInCart[]; removeOnClick; changeProductQuantity},{disabled:boolean}
  > {
  constructor(props) {
    super(props);
    const disabled = false
    this.state = {disabled};
  }



  render() {
    const {disabled} = this.state
    const { products } = this.props
    if (products.length > 0)
      return (
          <Table className="product-list">
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
                <tr key={product.id} style={{border: "1px solid black"}}>
                    <td style={{border: "1px solid black"}}>{product.imageUrl ? <img src={product.imageUrl} width="100" height="100"/> : ""} </td>
                    <td style={{border: "1px solid black"}}>{product.name}</td>
                    <td style={{border: "1px solid black"}}>{product.description}</td>                 
                    <td id={`${product.id  }price`} style={{border: "1px solid black"}}>€{product.price}</td>
                    <td style={{border: "1px solid black"}}>{!disabled ? //Da sistemare problema update con frecce 
                    <input id={product.id+"quantity"} type="number" value={product.quantity} min="1" 
                    onChange={(event)=>{this.setState({disabled:true});this.props.changeProductQuantity(product.id, event); this.setState({disabled:false});}}/> : 
                    <input id={product.id+"quantity"} type="number" value={product.quantity} min="1" 
                    onChange={(event)=>this.props.changeProductQuantity(product.id, event)} disabled/>}</td>
                    <td><Button variant="primary" onClick={() => this.props.removeOnClick(product.id)}>Remove</Button></td>
                </tr>
              ))}
              </tbody>
          </Table>
      );
    else return <h2>Your cart is empty</h2>;
  }
}

export default CartProductList;
