import React from 'react';
import { message } from "antd"
import synaptic from "synaptic"


class App extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
      checkResult: "",
      expectResult: "",
      firstInput: "",
      secondInput: "",
    }
  }
  startTrain = () => {
    let Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

    let myNetwork = new Architect.Perceptron(2, 2, 1)
    let trainer = new Trainer(myNetwork)

    let trainingSet = [
      {
        input: [0,0],
        output: [0]
      },
      {
        input: [0,1],
        output: [1]
      },
      {
        input: [1,0],
        output: [1]
      },
      {
        input: [1,1],
        output: [0]
      },
    ]

    trainer.train(trainingSet, {
    	rate: 0.1,
    	iterations: 20000,
    	error: .005,
    	shuffle: true,
    	log: 100,
    	cost: Trainer.cost.CROSS_ENTROPY
    })
    this.successedNetwork = myNetwork

    localStorage.setItem('Xor', JSON.stringify(myNetwork.toJSON()));    // save it
  }

  successedNetwork = () => {
    message.error("not finished yet, please wait")
    return ""
  }

  getLastNetword = () => {
    if (!localStorage.Xor) {
      message.error("没有已完成的network")
    } else {
      message.success("获取成功")
      this.successedNetwork = synaptic.Network.fromJSON(JSON.parse(localStorage.Xor))
    }
  }

  checkNetword = () => {
    const { firstInput, secondInput } = this.state
    this.setState({
      checkResult: this.successedNetwork.activate([firstInput, secondInput])
    })
  }

  render () {
    const { checkResult } = this.state
    return(
        <div>
          <button onClick={this.startTrain}>开始培养</button>
          <button onClick={this.checkNetword}>检查成果</button>
          <button onClick={this.getLastNetword}>获取上次成果</button>
          <br />
          <br />
          <lable>第一个参数</lable><input onChange={(e) => this.setState({firstInput: e.target.value})} alt="" />
          <lable>第二个参数</lable><input onChange={(e) => this.setState({secondInput: e.target.value})} alt="" />
          <h3>预测结果：{checkResult}</h3>
          {/* <h3>期望结果：{}</h3> */}
        </div>
    )
  }
}

export default App;
