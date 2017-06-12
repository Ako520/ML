//Simple game engine
//Author: Andrej Karpathy
//License: BSD
//This function does all the boring canvas stuff. To use it, just create functions:
//update()          gets called every frame
//draw()            gets called every frame
//myinit()          gets called once in beginning
//mouseClick(x, y)  gets called on mouse click
//keyUp(keycode)    gets called when key is released
//keyDown(keycode)  gets called when key is pushed
import convnetjs from 'convnetjs'
import $ from 'jquery'

var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var avloss = 0.0;
var g_iFPS = 10; // 帧数，每秒刷新次数
var g_strFinalLineStrokeStype = 'rgb(0,0,255)'; // 最终生成的线性图形颜色
var g_iNumOfData = 0; // 默认数据个数

$("#num_data").val (g_iNumOfData);

// 测试数据

function randomFallout(point, floatScope) {
  return Math.random() * floatScope + point
}

var g_strTestData = []
for (var i = 0; i < 30; i++) {
  g_strTestData[i] = `${randomFallout(i - 15, 1)} : ${randomFallout((i - 15) * 30, 3)}`
}

var g_iXScale = 1; // X刻度
var g_iYScale = 100;       // Y刻度
var g_iDataPointSize = 3;     // 数据点大小

var N, data, labels;
var ss = 15.0; // scale for drawing

var layer_defs, net, trainer;

// create neural net
var t = ''
var lix=2; // layer id of layer we'd like to draw outputs of
function reload() {
  layer_defs = [];
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:1});
  // layer_defs.push({type:'softmax', num_classes:10});
  // layer_defs.push({type:'fc', num_neurons:30, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:30, activation:'sigmoid'});
  layer_defs.push({type:'regression', num_neurons:1});

  net = new convnetjs.Net();
  net.makeLayers(layer_defs);

  trainer = new convnetjs.SGDTrainer(net, {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});

  // refresh buttons
  t = '';
  for(var i=1;i<net.layers.length-1;i++) { // ignore input and regression layers (first and last)
    var butid = "button" + i;
    t += "<input id=\""+butid+"\" value=\"" + net.layers[i].layer_type +"\" type=\"submit\" onclick=\"updateLix("+i+")\" style=\"width:80px; height: 30px; margin:5px;\";>";
  }
  $("#layer_ixes").html(t);
  $("#button"+lix).css('background-color', '#FFA');
}

function draw2d(){
  ctx.strokeStyle = g_strFinalLineStrokeStype;      // 设置样式颜色
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle = "black";

  var netx = new convnetjs.Vol(1,1,1);

  // draw decisions in the grid
  var density= 5.0;
  var draw_neuron_outputs = $("#layer_outs").is(':checked');

  // draw final decision
  var neurons = [];
  ctx.beginPath();
  for(var x=0.0; x<=WIDTH; x+= density) {

    netx.w[0] = (x-WIDTH/2)/ss;
    var a = net.forward(netx);
    var y = a.w[0];

    if(draw_neuron_outputs) {
      neurons.push(net.layers[lix].out_act.w); // back these up
    }

    if(x===0) ctx.moveTo(x, -y*ss+HEIGHT/2);
    else ctx.lineTo(x, -y*ss+HEIGHT/2);
  }
  ctx.stroke();

  // draw individual neurons on first layer
  if(draw_neuron_outputs) {
    var NL = neurons.length;
    ctx.strokeStyle = 'rgb(250,50,50)';
    for(var k=0;k<NL;k++) {
      ctx.beginPath();
      var n = 0;
      for(var x=0.0; x<=WIDTH; x+= density) {
        if(x===0) ctx.moveTo(x, -neurons[n][k]*ss+HEIGHT/2);
        else ctx.lineTo(x, -neurons[n][k]*ss+HEIGHT/2);
        n++;
      }
      ctx.stroke();
    }
  }

  // draw axes
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(50,50,50)';
  ctx.lineWidth = 1;
  ctx.moveTo(0, HEIGHT/2);
  ctx.lineTo(WIDTH, HEIGHT/2);
  ctx.moveTo(WIDTH/2, 0);
  ctx.lineTo(WIDTH/2, HEIGHT);
  ctx.stroke();

  // draw datapoints. Draw support vectors larger
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.lineWidth = 1;
  for(var i=0;i<N;i++) {
    drawCircle(data[i]*ss+WIDTH/2, -labels[i]*ss+HEIGHT/2, 5.0);
  }

  ctx.fillStyle = "blue";
  ctx.font = "bold 16px Arial";
  ctx.fillText("average loss: " + avloss, 20, 20);
}

function drawCircle(x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

export function NPGinit(FPS){
  //takes frames per secont to run at

  canvas = document.getElementById('NPGcanvas');
  ctx = canvas.getContext('2d');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  setInterval(NPGtick, 1000/FPS);

  myinit();
}

function NPGtick() {
    update();
    draw2d();
}

function updateLix(newlix) {
    $("#button"+lix).css('background-color', ''); // erase highlight
    lix = newlix;
    $("#button"+lix).css('background-color', '#FFA');
  }

// in script
function regen_data() {
  // N = parseInt($("#num_data").val());
  // data = [];
  // labels = [];
  N=0;
  data = [];
  labels = [];

  var strPairDataRegExp = /(?![{,]\s*)-?\d+(\.\d*)?:\s*-?\d+(\.\d*)?(?=[,}])/g;
  // var tAryTrainPair = g_strTrainData.match (strPairDataRegExp); // 训练数据
  // var tAryTrainPair = g_strTestData.match (strPairDataRegExp); // 测试数据
  var tAryTrainPair = g_strTestData // 测试数据

  // console.log(tAryTrainPair)
  // console.log (tAryTrainPair); // OK
  for (var iPair in tAryTrainPair){
         // console.log (iPair, tAryTrainPair[iPair]);
         var strPair = tAryTrainPair[iPair];
         var strAryPairs = strPair.split(/\s*:\s*/);
         // console.log (strAryPairs);
         var strX = strAryPairs[0];
         var strY = strAryPairs[1];
         // console.log ("X=", strX, "-> Y=", strY);
         var x = strX;
         var y = strY;
         // var x = Math.random()*10-5;
         // var y = x*Math.sin(x);
         // data.push([(x-WIDTH/2)/ss]);
         // labels.push([-(y-HEIGHT/2)/ss]);
         x = (x+WIDTH/2)/g_iXScale;
         y = (y+HEIGHT/2)/g_iYScale;
         console.log ("(", strX, ") x=", x, " -> (", strY, ") y=", y);
         data.push([x]);
         labels.push([y]);
         N = N+1;
  }
  console.log ("N=",N);
  console.log ("data=", data);
  console.log ("labels=", labels);
}

function myinit(){
  regen_data();
  $("#layerdef").val(t);
  reload();
}

function update(){
  // forward prop the data

  var netx = new convnetjs.Vol(1,1,1);

  for(var iters=0;iters<50;iters++) {
    for(var ix=0;ix<N;ix++) {
      netx.w = data[ix];
      var stats = trainer.train(netx, labels[ix]);
      avloss += stats.loss;
    }
  }
  avloss /= N*iters;
}
