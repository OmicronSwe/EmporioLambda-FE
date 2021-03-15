import { GetServerSideProps } from "next"
import { getlambdaResponse } from "../api/lib/lambdas"
import { getSession } from "next-auth/client"
import { observable, action } from 'mobx'
import React from 'react'

class CartModel extends React.Component<{ response; auth }, { items: string }> {
    @observable products : any[] = []

    constructor(props){
        super(props)
        if(!this.props.auth)
        { 
            this.products = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).ids : []
        }else
        {
            this.props.response.products_id != null ? this.props.response.products_id : []
        }
    }

    @action addProductToCart(product) {
        this.products.push({ product })
}

    @action removeProduct(product) {
        this.products = this.products.filter(obj => obj !== product);
    }

    getProducts() {
        return this.products
    }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req }) //get session data
    if (session) {
      const resp = await (await getlambdaResponse("cart/" + session.user.email)).props.response //external API call to get cart's product ids
  
      if (resp.message == "Element not found") {
        //if no cart is found, return empty response
        return { props: { response: [], auth: session.user.email } }
      }
      return { props: { response: resp, auth: session.user.email } }
    } else {
      return { props: { response: [], auth: null } } //if not authenticated, return empty response and null email
    }
  }

export default CartModel