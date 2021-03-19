import React from "react";
import { Button } from "react-bootstrap";

class RemoveProductButton extends React.Component<{ auth, removeOnClick }>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button variant="primary" onClick={() => this.props.removeOnClick}>Remove</Button> 
        )
    }
}

export default RemoveProductButton