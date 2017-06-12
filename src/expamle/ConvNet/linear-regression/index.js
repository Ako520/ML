import React, {PropTypes} from 'react';
import './style.scss'
import convnetjs from 'convnetjs'

import { NPGinit } from "../../../scripts/npg2.js"

//全局变量


export default class extends React.Component {
  componentDidMount() {
    NPGinit(1)
    var layer_defs = [];
    // minimal network: a simple binary SVM classifer in 2-dimensional space
    layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
    layer_defs.push({type:'svm', num_classes:2});
     
    // create a net
    var net = new convnetjs.Net();
    net.makeLayers(layer_defs);
     
    // create a 1x1x2 volume of input activations:
    var x = new convnetjs.Vol(1,1,2);
    x.w[0] = 0.5; // w is the field holding the actual data
    x.w[1] = -1.3;
    // a shortcut for the above is var x = new convnetjs.Vol([0.5, -1.3]);
     
    var scores = net.forward(x); // pass forward through network
    // scores is now a Vol() of output activations
    console.log('score for class 0 is assigned:'  + scores.w[0]);
  }

  render() {
    return (
      <div id="wrap">
        <textarea id="layerdef" style={{width:"100%", height:"250"}}></textarea>
        <input id="buttontp" type="submit" value="change network" onclick="reload();" style={{width: "300", height: "50"}} />
        <div style={{float: "right"}}>
          Number of points to generate:  <input type="text" name="num_points" id="num_data" value="20" />
          <input type="submit" value="regenerate data" style={{height:"50px"}} onclick="regen_data();" />
        </div>
        <input type="checkbox" name="draw_layer_outputs" id="layer_outs" />
        Also draw outputs of a layer (click layer button below) in red.
        <br /><div id="layer_ixes"></div>
        <canvas id="NPGcanvas" width="800" height="500">Browser not supported for Canvas. Get a real browser.</canvas>
      </div>
    )
  }
}
