import React from 'react'
import CartController from '../../src/ViewController/CartViewController'
import CartViewModel from '../../src/ViewModel/CartViewModel'
import { GetServerSideProps } from "next"
import CartModel from '../../src/Model/CartModel'
import { getSession } from "next-auth/client"
//import { getlambdaResponse } from "../api/lib/lambdas"

class CartProvider extends React.Component<{ response; auth }, { items: string }> {
    viewModel

    constructor(props) {
        super(props)
        const cartModel = new CartModel(props)
        this.viewModel = new CartViewModel(cartModel)
    }


    render() {
        return (
            <CartController viewModel={this.viewModel}/>
        )
    }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    /*const session = await getSession({ req }) //get session data
    if (session) {
      const resp = await (await getlambdaResponse("cart/" + session.user.email)).props.response //external API call to get cart's product ids
  
      if (resp.message == "Element not found") {
        //if no cart is found, return empty response
        return { props: { response: [], auth: session.user.email } }
      }
      return { props: { response: resp, auth: session.user.email } }
    } else {
      return { props: { response: [], auth: null } } //if not authenticated, return empty response and null email
    }*/
    return null
  }


export default CartProvider