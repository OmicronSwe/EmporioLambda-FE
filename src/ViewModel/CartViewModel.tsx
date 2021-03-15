class CartViewModel {
    store : any

    constructor(productStore) {
        this.store = productStore
    }

    getProducts() {
        return this.store.getProducts()
    }

    addProduct(product) {
        this.store.addProduct(product)
    }

    removeProduct(product) {
        this.store.removeProduct(product)
    }
}

export default CartViewModel