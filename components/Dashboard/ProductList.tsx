import React from "react"

class ProductList extends React.Component<{products}> {
  render() {
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
          {this.props.products.map((items) => (
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
    )
  }
}

export default ProductList