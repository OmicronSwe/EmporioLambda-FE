import Router from "next/router"
import React from "react";
import { Table, Button } from "react-bootstrap";
import { Product } from "../../src/objects/Product";

// TODO: modificare la visualizzazione dei prodotti da tabellare a Cards (?)

class ProductList extends React.Component<{ products: Product[]; removeProduct }> {
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
                  {"category" in item ? <td>{item.category}</td> : <td />}
                  {"price" in item ? <td>{item.price}</td> : <td />}
                  <td>
                    <Button 
                    variant="warning"
                    onClick={() => Router.push('/dashboard/modify/'+item.id)}
                    >
                      Modify
                    </Button>
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
              <p>No product found</p>
            )}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProductList;
