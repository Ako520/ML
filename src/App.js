import React from 'react';

// import ConvNetLinearRegression from "./expamle/ConvNet/linear-regression"
// import Synaptic from "./expamle/synaptic/expamle.js"
import SynapticLinearRegression from "./expamle/synaptic/LinearRegression.js"
// import Xor from "./expamle/synaptic/Xor.js"
// import PerceptionHandwrittenDigits from "./expamle/synaptic/perceptionHandwrittenDigits.js"
import Dsr from "./expamle/synaptic/Dsr.js"

class App extends React.Component {

  render () {
    return(
        <div>
          {/* <h1>Welcome to wang of honour, ako</h1> */}
          {/* <ConvNetLinearRegression /> */}
          {/* <Xor /> */}
          <SynapticLinearRegression />
          {/* <PerceptionHandwrittenDigits /> */}
          {/* <Synaptic /> */}
          {/* <Dsr /> */}
        </div>
    )
  }
}

export default App;
