import React from 'react';
import synaptic from "synaptic"
import dataSet from '../../data/linearRegression/dataSet.js'

class App extends React.Component {
  constructor(props){
  	super(props);
  }


  startTrain = () => {
    let canvas = this.refs.canvas
    let ctx = canvas.getContext('2d')
    let WIDTH = 800
    let HEIGHT = 500
    let FPS = 10

    let avloss = 0.0
    let strFinalLineStrokeStype = 'rgb(0,0,255)' // 最终生成的线性图形颜色
    let NumOfData = 0; // 默认数据个数

    let pointColor = "rgb(0, 0, 0)"
    let hColor = "rgb(125, 90, 230)"  //hypothesis color

    let ss = 10.0
    let m = dataSet.length
    let xScale = 20
    let yScale = 20
    let θ0 = 0
    let θ1 = 0
    let rate = 0.01
    let trainTime = 0
    // let h = θ0 + θ1 * x

    canvas.height = HEIGHT
    canvas.width = WIDTH



    this.go = setInterval(
      () => {
        update()
        draw()
      },
      1000 / FPS
    )

    const update = () => {
      trainTime++
      gradientDescent()  //梯度下降
    }

    const gradientDescent = () => {
      let sum0 = 0
      let sum1 = 0
      let J = 0
      for (let i = 0; i < m; i++) {
        let x = dataSet[i][0]  // 取数据第一个点的x
        let y = dataSet[i][1]  // 取数据第一个点的y
        J += (θ0 + θ1 * x - y) * (θ0 + θ1 * x - y)
        sum0 += θ0 + θ1 * x - y
        sum1 += (θ0 + θ1 * x - y) * x
      }

      if (J < 0.01) {
        clearInterval(this.go)
      }
      console.log("第" + trainTime + "次培养")
      console.log("J", J)
      console.log("sum0", sum0, "sum1", sum1)
      console.log("m", m, "rate", rate)
      θ0 = θ0 - rate / m * sum0
      θ1 = θ1 - rate / m * sum1
      console.log("θ0", θ0, "θ1", θ1)
    }

    const draw = () => {
      ctx.strokeStyle = strFinalLineStrokeStype // 目标直线的颜色
      ctx.clearRect(0,0,WIDTH,HEIGHT)
      ctx.fillStyle = "black"   // 球的填充样式

      let x0 = 300
      let x1 = -300
      let point0 = [x0 * xScale + WIDTH / 2, -(θ0 + θ1 * x0) * yScale + HEIGHT / 2]
      let point1 = [x1 * xScale + WIDTH / 2, -(θ0 + θ1 * x1) * yScale + HEIGHT / 2]

      drawH(point0, point1)
      drawAxes()
      drawDataPoint()
    }

    //画hypothesis
    const drawH = (point0, point1) => {
      ctx.beginPath()
      ctx.strokeStyle = hColor
      ctx.lineWidth = 1
      ctx.moveTo(point0[0], point0[1])
      ctx.lineTo(point1[0], point1[1])
      ctx.stroke()
    }

    // 画坐标系
    const drawAxes = () => {
      ctx.beginPath()
      ctx.strokeStyle = 'rgb(50,50,50)'
      ctx.lineWidth = 1
      ctx.moveTo(0, HEIGHT/2)
      ctx.lineTo(WIDTH, HEIGHT/2)
      ctx.moveTo(WIDTH/2, 0)
      ctx.lineTo(WIDTH/2, HEIGHT)
      ctx.stroke()
    }

    // 画数据点
    const drawDataPoint = () => {
      ctx.strokeStyle = pointColor;
      for(let i=0; i < m; i++) {
        drawCircle(dataSet[i][0] * xScale + WIDTH/2, -dataSet[i][1] * yScale + HEIGHT/2, 5.0);
      }

      ctx.fillStyle = "blue";
      ctx.font = "bold 16px Arial";
      ctx.fillText("average loss: " + avloss, 20, 20);
    }

    // 画圆
    const drawCircle = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }

  componentDidMount() {
    this.startTrain()
  }

  render () {
    return(
        <div>
          <button onClick={this.startTrain}>开始培养</button>
          <canvas ref='canvas' id="canvas">Browser not supported for Canvas. Get a real browser.</canvas>
        </div>
    )
  }
}

export default App;
