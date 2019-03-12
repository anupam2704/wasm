import React, {Component} from 'react';
//import { Stage, Sprite } from '@inlet/react-pixi';
import Img from '../images/img.jpg'
class Graph extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            show: false,            
        }     
        this.data = '';
    }

    componentDidMount() {        

    }    

    componentDidUpdate(prev_props) {        
        
    }

    render () { 
        return false;
        //  return (
        //     <Stage>
        //         <Sprite image={Img} x={100} y={100} />
        //     </Stage>
        //  )      
    }
}
  
export default Graph;