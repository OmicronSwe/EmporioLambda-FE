import React from "react";

class ProductList extends React.Component<{ products }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;
    return (
      <table id="productsTable">
        <caption> Products list </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((items) => (
            <tr key={items.id}>
              <td>{items.name}</td>
              <td>{items.description}</td>
              {/* <td>
                <button onClick={() => this.props.addToCart(items.id)}>Add to Cart</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductList;
