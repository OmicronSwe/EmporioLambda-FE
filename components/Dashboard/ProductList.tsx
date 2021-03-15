import React from "react";
import { Table, Button } from "react-bootstrap";

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
        <Table>
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
                <td>
                  <Button variant="warning">Modify</Button>
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProductList;
