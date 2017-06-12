export function draw2d(){
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
