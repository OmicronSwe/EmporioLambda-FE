import Router from "next/router";
import React, { useState } from "react";

import { Table, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import StoredProduct from "../../src/types/StoredProduct";

interface ProductListProps {
  products: StoredProduct[];
  removeProduct;
  isProductDeleted: boolean | null;
  productDeletedId: string;
}

const ProductList = ({
  products,
  removeProduct,
  isProductDeleted,
  productDeletedId,
}: ProductListProps) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div className="mt-4">
        <Table id="productList">
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
              products.map((item) => {
                if (item.id === productDeletedId) {
                  return (
                    <>
                      {isProductDeleted !== null && isProductDeleted === true && (
                        <tr>
                          <td colSpan={8}>
                            <Alert
                              variant="success"
                              show={show}
                              onClose={() => setShow(false)}
                              dismissible
                            >
                              <Alert.Heading className="text-center">
                                Product deleted successfully!
                              </Alert.Heading>
                            </Alert>
                          </td>
                        </tr>
                      )}
                      {isProductDeleted !== null && isProductDeleted === false && (
                        <tr>
                          <td colSpan={8}>
                            <Alert
                              variant="danger"
                              show={show}
                              onClose={() => setShow(false)}
                              dismissible
                            >
                              <Alert.Heading className="text-center">
                                A Server Error occured deleting the product, please refresh the page
                                and retry
                              </Alert.Heading>
                            </Alert>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                }
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.imageUrl ? item.imageUrl : ""}
                        className="img-thumbnail"
                        alt={item.name}
                        width={100}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    {"category" in item ? <td>{item.category}</td> : <td />}
                    {"price" in item ? <td>{`${item.price}€`}</td> : <td />}
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => Router.push(`/dashboard/modify/${item.id}`)}
                      >
                        Modify
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeProduct(item.id);
                          setShow(true);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No product found</p>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
