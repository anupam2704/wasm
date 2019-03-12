import React, {Component} from 'react';
//import { Stage, Sprite } from '@inlet/react-pixi';
import Img from '../images/img.jpg';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   //dataPoints.
let xVal = dps.length + 1;
let yVal = 15;
let updateInterval = 1000;
class Graph extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            show: false,            
        }     
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {        
        setInterval(this.updateChart, updateInterval);
    }    

    componentDidUpdate(prev_props) {        
        
    }

    updateChart() {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}

    render () { 
        const options = {
			title :{
				text: "Transaction Graph"
            },
            width: 600,                        
			data: [{
                cursor: "pointer",
				type: "line",
				dataPoints : dps
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>			
		</div>
		);  
    }
}
  
export default Graph;