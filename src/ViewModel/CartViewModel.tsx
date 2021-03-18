import Product from '../../components/Cart/product'
import CartModel from '../Model/CartModel'

class CartViewModel {
    model : CartModel

    constructor(cartModel : CartModel) {
        this.model = cartModel
    }

    getProducts() {
        return this.model.getProducts()
    }

    /*addProductToCart(product) {
        this.store.addProduct(product)
    }*/

    removeProductFromCart(product : Product) {
        this.model.removeProductFromCart(product)
    }
}

export default CartViewModel