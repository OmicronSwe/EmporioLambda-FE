import React from "react";
import { Button } from "react-bootstrap";

class RemoveProductButton extends React.Component<{ toRemove : string, auth }>{
    constructor(props){
        super(props);
    }

    async removeAll(){
        if (this.props.auth) {
            //authenticated -> internal API to call external API to delete the cart
            const res = await fetch("../api/deleteCart", {
              body: this.props.auth,
              mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            })
            await res.json()
          } else {
            //not authenticated -> empty the localStorage
            localStorage.removeItem('cart')
          }
    }

    async removeOnClick(id : string)
    {
        //if the id is not null then there's a product to remove
        if(id)
        {
            if(this.props.auth)
            {
            
            }else
            {
                let jsonCart : string
                jsonCart = localStorage.getItem('cart')
                let jsonObj : JSON = JSON.parse(jsonCart)
                delete jsonObj[id][0]
                jsonCart = JSON.stringify(jsonObj);

                localStorage.setItem('cart', jsonCart);
            }
        }
        //if the id is null then there is no product to remove so the cart gets cleared
        else 
        {
            this.removeAll()
        }
    }

    render(){
        let buttonText : string
        buttonText = this.props.toRemove ? "Remove" : "RemoveAll"     
        return(
            <Button variant="primary" onClick={() => this.removeOnClick(this.props.toRemove)}>{buttonText}</Button> 
        )
    }
}

export default RemoveProductButton