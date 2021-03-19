import React from "react";
import { Table, Button } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

class ProductList extends React.Component<{ products : Product[]; removeProduct }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, removeProduct } = this.props;
    return (
      <>
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
            {products ? (
              products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src="Emporio_Lambda.png" className="img-thumbnail" alt="Product" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  {"category" in item ? <td>Category_test</td> : <td />}
                  {"price" in item ? <td>{item.price}</td> : <td />}
                  <td>
                    <Button variant="warning">Modify</Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        removeProduct(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No category found</p>
            )}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProductList;
