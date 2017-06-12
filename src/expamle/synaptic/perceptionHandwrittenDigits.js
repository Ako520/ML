import React from 'react'
import mnist from 'mnist'
import synaptic from "synaptic"

class App extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
    }
  }

  startTrain = () => {
    console.log(1)
    // const set = mnist.set(700, 20)
    // const trainingSet = set.training
    // const testSet = set.test
    //
    // const Layer = synaptic.Layer
    // const Network = synaptic.Network
    // const Trainer = synaptic.Trainer
    //
    // const inputLayer = new Layer(784)
    // const hiddenLayer = new Layer(100)
    // const outputLayer = new Layer(10)
    //
    // inputLayer.project(hiddenLayer)
    // hiddenLayer.project(outputLayer)
    //
    // const myNetwork = new Network({
    //     input: inputLayer,
    //     hidden: [hiddenLayer],
    //     output: outputLayer
    // })
    //
    // const trainer = new Trainer(myNetwork)
    // trainer.train(trainingSet, {
    //     rate: .2,
    //     iterations: 20,
    //     error: .1,
    //     shuffle: true,
    //     log: 1,
    //     cost: Trainer.cost.CROSS_ENTROPY
    // })

  }

  render () {
    return(
        <div>
          <div onClick={this.startTrain}>开始培养</div>
          <div onClick={this.checkResult}>验证成果</div>
        </div>
    )
  }
}

export default App
