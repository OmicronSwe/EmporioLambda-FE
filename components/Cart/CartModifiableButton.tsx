import React from "react";
import { Button } from "react-bootstrap";

class CartModifiableButton extends React.Component<{active : boolean; onClickFunction}>{

    constructor(props){
        super(props);
    }

    render()
    {
        const {active} = this.props
        if(active)
        {
            return (<Button variant="primary" onClick={() => {this.props.onClickFunction()}}>Save Changes</Button>)
        }
        else
        {
            return (<Button variant="primary" onClick={()=>{this.props.onClickFunction()}}>Allow Change</Button>)
        }
    }
}

export default CartModifiableButton