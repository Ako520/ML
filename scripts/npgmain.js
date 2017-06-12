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

var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var FPS;
var avloss = 0.0;
var g_iFPS = 10; // 帧数，每秒刷新次数
var g_strFinalLineStrokeStype = 'rgb(0,0,255)'; // 最终生成的线性图形颜色
var g_iNumOfData = 0; // 默认数据个数

// 设置默认数据个数

$("#num_data").val (g_iNumOfData);

var g_strTrainData = "{2.2222222222222223: 82.856570985265137, 10.0: 73.323734274324707, 3.8383838383838382: 48.42048382272278, 6.0606060606060606: -91.843067328414762, 7.5757575757575752: -7.0049472358285945, 1.1111111111111112: -27.016808881525407, 8.1818181818181817: 47.855300422626144, 4.9494949494949498: -57.387594917054599, 7.2727272727272725: -27.094984146487068, 3.2323232323232323: 83.153985440338104, 5.1515151515151514: -59.230666694410495, 3.3333333333333335: 95.738155786378925, 8.8888888888888893: 93.917748312356437, 9.8989898989898997: 75.138422155320868, 1.7171717171717171: 41.625183411079554, 8.0808080808080813: 53.61070637502462, 7.0707070707070709: -42.354956135013325, 2.1212121212121211: 80.537255264564436, 0.50505050505050508: -79.643642434937533, 5.7575757575757578: -89.945131080160451, 0.90909090909090906: -35.750902420076415, 0.80808080808080807: -48.324517737301186, 4.6464646464646462: -20.655949584814977, 7.6767676767676765: 4.6527635530825551, 8.3838383838383841: 69.296387465097382, 3.9393939393939394: 42.533908803457955, 9.2929292929292924: 95.491737676727112, 5.0505050505050502: -48.981320607209312, 1.0101010101010102: -33.36678706913824, 6.5656565656565657: -77.531050660203988, 2.6262626262626263: 90.466652441508742, 2.8282828282828283: 99.095833874242572, 5.4545454545454541: -82.946258844414174, 9.5959595959595951: 93.452407012663315, 6.666666666666667: -85.814187522894485, 6.9696969696969697: -53.110162239549162, 4.141414141414141: 34.13601396225642, 1.9191919191919191: 60.194930213117189, 1.4141414141414141: 5.5346981176519181}";
// 测试数据
var g_strTestData = "{0.0: -86.609461618348107, 7.1717171717171713: -47.934224568590956, 8.6868686868686869: 99.849778591657454, 1.3131313131313131: 7.4284942444152593, 5.8585858585858581: -104.96162072415464, 7.3737373737373737: -26.500907827212174, 4.545454545454545: -6.4498657280359621, 4.3434343434343434: 3.8057483292390066, 1.5151515151515151: 18.710723671833492, 6.2626262626262621: -89.37603808977596, 4.7474747474747474: -34.904745211607427, 0.20202020202020202: -91.549560272364744, 1.2121212121212122: 2.29767121458167, 3.131313131313131: 88.621453943076816, 7.7777777777777777: 21.174944729062073, 2.9292929292929291: 92.730225745686951, 1.8181818181818181: 50.746899369502998, 8.5858585858585865: 77.102637670158572, 6.4646464646464645: -80.859552632451283, 7.9797979797979792: 46.435351064378537, 8.9898989898989896: 89.26608438049513, 5.3535353535353538: -82.76191218305847, 9.3939393939393945: 100.12591049979527, 6.8686868686868685: -73.51302042466429, 2.0202020202020203: 68.277587106818146, 0.40404040404040403: -75.107540311454173, 5.5555555555555554: -84.226320901141861, 9.7979797979797976: 82.989655460652244, 3.5353535353535355: 72.069381955775086, 8.4848484848484844: 86.757431619715959, 4.0404040404040407: 39.942768168455757, 9.0909090909090899: 95.768857247255639, 3.6363636363636362: 74.923930895666885, 4.4444444444444446: -6.2334505645547438, 5.9595959595959593: -109.70247459850057, 3.7373737373737375: 54.502692040540367, 2.3232323232323231: 83.33044457082886, 6.1616161616161618: -97.842699826337025, 7.4747474747474749: -13.35778635092765, 8.282828282828282: 72.779266776044707, 5.6565656565656566: -91.051049721511632, 0.60606060606060608: -58.225846533233351, 3.0303030303030303: 91.509975793793046, 6.3636363636363633: -87.127818846800849, 2.4242424242424243: 100.01149394990702, 7.8787878787878789: 35.653656599618458, 3.4343434343434343: 92.320848390741375, 2.5252525252525251: 89.666137313643475, 8.7878787878787872: 96.166293379212007, 9.6969696969696972: 79.24922432837505, 0.30303030303030304: -80.83413241463083, 5.2525252525252526: -72.974020049085368, 9.191919191919192: 106.36838868063683, 6.7676767676767673: -64.180953396677992, 2.7272727272727271: 92.748141198108627, 4.2424242424242422: 18.049819749050428, 0.10101010101010101: -88.749671764803466, 9.4949494949494948: 84.426639229039779, 1.6161616161616161: 36.801965084008557, 0.70707070707070707: -62.607970763118267, 4.8484848484848486: -47.865153212212974}";
var g_iXScale = 1; // X刻度
var g_iYScale = 30;       // Y刻度
var g_iDataPointSize = 2;     // 数据点大小


var N, data, labels;
var ss = 30.0; // scale for drawing

var layer_defs, net, trainer;

// create neural net
var t = "layer_defs = [];\n\
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:1});\n\
layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});\n\
layer_defs.push({type:'fc', num_neurons:20, activation:'sigmoid'});\n\
layer_defs.push({type:'regression', num_neurons:1});\n\
\n\
net = new convnetjs.Net();\n\
net.makeLayers(layer_defs);\n\
\n\
trainer = new convnetjs.SGDTrainer(net, {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});\n\
";
var lix=2; // layer id of layer we'd like to draw outputs of
function reload() {

  layer_defs = [];
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:1});
  layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  layer_defs.push({type:'fc', num_neurons:20, activation:'sigmoid'});
  layer_defs.push({type:'regression', num_neurons:1});

  net = new convnetjs.Net();
  net.makeLayers(layer_defs);

  trainer = new convnetjs.SGDTrainer(net, {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});

  // eval($("#layerdef").val());
  // refresh buttons
  var t = '';
  for(var i=1;i<net.layers.length-1;i++) { // ignore input and regression layers (first and last)
    var butid = "button" + i;
    t += "<input id=\""+butid+"\" value=\"" + net.layers[i].layer_type +"\" type=\"submit\" onclick=\"updateLix("+i+")\" style=\"width:80px; height: 30px; margin:5px;\";>";
  }
  $("#layer_ixes").html(t);
  $("#button"+lix).css('background-color', '#FFA');
}

function drawBubble(x, y, w, h, radius)
{
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.lineWidth="2";
  ctx.moveTo(x+radius, y);
  ctx.lineTo(x+radius/2, y-10);
  ctx.lineTo(x+radius * 2, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}

function drawRect(x, y, w, h){
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawCircle(x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

//uniform distribution integer
function randi(s, e) {
  return Math.floor(Math.random()*(e-s) + s);
}

//uniform distribution
function randf(s, e) {
  return Math.random()*(e-s) + s;
}

//normal distribution random number
function randn(mean, variance) {
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);
  var X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  X = mean + Math.sqrt(variance) * X;
  return X;
}

function eventClick(e) {

  //get position of cursor relative to top left of canvas
  var x;
  var y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  //call user-defined callback
  mouseClick(x, y, e.shiftKey, e.ctrlKey);
}

//event codes can be found here:
//http://www.aspdotnetfaq.com/Faq/What-is-the-list-of-KeyCodes-for-JavaScript-KeyDown-KeyPress-and-KeyUp-events.aspx
function eventKeyUp(e) {
  var keycode = ('which' in e) ? e.which : e.keyCode;
  keyUp(keycode);
}

function eventKeyDown(e) {
  var keycode = ('which' in e) ? e.which : e.keyCode;
  keyDown(keycode);
}

function NPGinit(FPS){
  //takes frames per secont to run at

  canvas = document.getElementById('NPGcanvas');
  ctx = canvas.getContext('2d');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  canvas.addEventListener('click', eventClick, false);

  //canvas element cannot get focus by default. Requires to either set
  //tabindex to 1 so that it's focusable, or we need to attach listeners
  //to the document. Here we do the latter
  document.addEventListener('keyup', eventKeyUp, true);
  document.addEventListener('keydown', eventKeyDown, true);

  setInterval(NPGtick, 1000/FPS);

  myinit();
}

function NPGtick() {
    update();
    draw();
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

  // for(var i=0;i<N;i++) {
  //   var x = Math.random()*10-5;
  //   var y = x*Math.sin(x);
  //   data.push([x]);
  //   labels.push([y]);
  // }

  var strPairDataRegExp = /(?![{,]\s*)-?\d+(\.\d*)?:\s*-?\d+(\.\d*)?(?=[,}])/g;
  // var tAryTrainPair = g_strTrainData.match (strPairDataRegExp); // 训练数据
  var tAryTrainPair = g_strTestData.match (strPairDataRegExp); // 测试数据
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

function draw(){
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

function mouseClick(x, y, shiftPressed){

  // add datapoint at location of click
  data.push([(x-WIDTH/2)/ss]);
  labels.push([-(y-HEIGHT/2)/ss]);
  N += 1;

}

function keyDown(key){
}

function keyUp(key) {

}

$(function() {

});
