import React from "react";

class ProductList extends React.Component<{ products }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;
    const items = products.products.result;
    return (
      <>
        <h1>Product Section</h1>
        <table id="productsTable">
          <caption> Products list </caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                {"category" in item ? <td>Category_test</td> : <td />}
                {"price" in item ? <td>{item.price}</td> : <td />}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ProductList;
