import React from 'react';

import synaptic from "synaptic"


class App extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
      checkResult: "",
      expectResult: "",
      firstInput: "",
      secondInput: "",
      data: {
        error: null,
        iterations: 0,
        rate: 0,
      },
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

    this.resultFunc = myNetwork
  }

  resultFunc = () => {
  }

  checkNetword = () => {
    const { firstInput, secondInput } = this.state
    this.setState({
      checkResult: this.resultFunc.activate([firstInput, secondInput])
    })
  }

  componentDidMount() {
    let Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

    //pice1

    // let Neuron = synaptic.Neuron
    // let A0 = new Neuron();
    // let B0 = new Neuron();
    // A0.project(B0);
    //
    // console.log(A0.activate(0.5)) // 0.5
    // console.log(B0.activate()) // 0.3244554645
    //
    // //  propagate
    // let A1 = new Neuron();
    // let B1 = new Neuron();
    // A1.project(B1);
    //
    // let learningRate = .3;
    //
    // for(let i = 0; i < 20000; i++)
    // {
    // 	// when A activates 1
    // 	A1.activate(1);
    //
    // 	// train B to activate 0
    // 	B1.activate();
    // 	B1.propagate(learningRate, 0);
    // }
    //
    // console.log(B1)
    // let a = {}
    // a.B1 = B1
    // localStorage.setItem('myCat', JSON.stringify(a));    // test it
    // console.log(A1.activate(1));
    // console.log(B1.activate()); // 0.006540565760853365

    // pice 2
    let myNetwork = new Architect.Perceptron(2,2,1)
    let trainer = new Trainer(myNetwork)

    let trainingSet = [
      {
        input: [0, 0],
        output: [0]
      },
      {
        input: [0, 1],
        output: [1]
      },
      {
        input: [1, 0],
        output: [1]
      },
      {
        input: [1, 1],
        output: [0]
      }
    ]
    trainer.trainAsync(trainingSet, {
      rate: 1,
      iterations: 20000,
      error: 0.005,
      cost: Trainer.cost.CROSS_ENTROPY,
      schedule: {
        every: 100,
        do: (data) => {
          this.setState({
            data
          })
        	if (data.iterations === 20000)
          		return true; // abort/stop training
      	}
      }
    }).then(
      res => {
        console.log(res)
        console.log(myNetwork.activate([0,0]))
      })
  }

  render () {
    return(
        <div>
          {/* <button onClick={this.startTrain}>开始培养</button>
          <button onClick={this.checkNetword}>检查成果</button>
          <br />
          <br />
          <lable>第一个参数</lable><input onChange={(e) => this.setState({firstInput: e.target.value})} alt="" />
          <lable>第二个参数</lable><input onChange={(e) => this.setState({secondInput: e.target.value})} alt="" />
          <h3>预测结果：{checkResult}</h3>
          {/* <h3>期望结果：{}</h3> */}
          <h3>{this.state.data.error}</h3>
          <h3>{this.state.data.iterations}</h3>
          <h3>{this.state.data.rate}</h3>
        </div>
    )
  }
}

export default App;
