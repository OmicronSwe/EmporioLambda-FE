import React from 'react'
import ProductView from './ProductView'

class CartController extends React.Component {
    state = {
        productImage: '1.gif',
        productName: ''
    }

    setRandomProductImage = () => {
        const rand = Math.ceil(Math.random() * 10)
        this.setState({ productImage: `${rand}.gif` })
    }

    setProductName = (e) => {
        this.setState({ productName: e.target.value })
    }

    clearProductName() {
        this.setState({ productName: '' })
    }

    saveProduct = () => {
        this.props.viewModel.addProduct({
            image: this.state.productImage,
            name: this.state.productName
        })
    }

    addProduct = () => {
        this.saveProduct()
        this.clearProductName()
    }

    removeProduct = (product) => {
        this.props.viewModel.removeProduct(product)
    }

    render() {
        const { viewModel } = this.props

        return (
            <ProductView
                products={viewModel.getProducts()}
                productImage={this.state.productImage}
                addProduct={this.addProduct}
                removeProduct={this.removeProduct}
                productName={this.state.productName}
                shouldDisableSubmit={!this.state.productName}
            />
        )
    }
}

export default ProductController