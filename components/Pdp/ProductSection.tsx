import React from "react";
import { Table } from "react-bootstrap";

class ProductSection extends React.Component<{ product }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product } = this.props;
    const item = product.result;
    return (
      <>
        <h1>Product Section</h1>
        <Table>
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src="Emporio_Lambda.png" className="img-thumbnail" alt="Product" />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              {"category" in item ? <td>Category_test</td> : <td />}
              {"price" in item ? <td>{item.price}</td> : <td />}
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProductSection;
