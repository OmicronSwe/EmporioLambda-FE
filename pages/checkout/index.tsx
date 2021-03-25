import React from "react";
import Layout from "../../components/layout";

import PayButton from "../../components/Checkout/PayButton";

class Checkout extends React.Component<{},{loaded:boolean}>{
  constructor(props) {
    super(props);
    this.state = {loaded:false};
  }

  componentDidMount(){
    this.setState({loaded:true})
  }

  render() {
    if (this.state.loaded) {
    return (
      <>
        <Layout title="Checkout page">
        <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
          <PayButton/>
        </Layout>
      </>
    );
    }else{
        return (<div>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
        </div>)
    }
  }
}

export default Checkout;
