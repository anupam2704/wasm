import React, {Component} from 'react';
import Graph from '../graph/graph';

class Form extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            curr_func: null
        }
        this.input1 = React.createRef();     
        this.input2 = React.createRef();     
        this.input3 = React.createRef();     
        this.input4 = React.createRef();     
        this.input5 = React.createRef();     
        this.input6 = React.createRef();     
        this.input7 = React.createRef();     
        this.input8 = React.createRef();     
        
    }

    componentDidMount() {        
        
    }    

    componentDidUpdate(prev_props) {        
        
    }

    valueGenerator() {
        let str = '';
        if(this.input1.current.value && this.input1.current.value !== '') {
            str = str + `${this.input1.current.value}=${this.input2.current.value}&`
        }
        if(this.input3.current.value && this.input3.current.value !== '') {
            str = str + `${this.input3.current.value}=${this.input4.current.value}&`
        }
        if(this.input5.current.value && this.input5.current.value !== '') {
            str = str + `${this.input5.current.value}=${this.input6.current.value}&`
        }
        if(this.input7.current.value && this.input7.current.value !== '') {
            str = str + `${this.input7.current.value}=${this.input8.current.value}&`
        }
        return str;
    }

    handleSend = (event) => {
        event.preventDefault()        
        let values = this.valueGenerator();
        if(values === '') {
            return;
        }
        let json_to_send = `{ 
            "tag": "contract"
            "payload": {
                "func_name": ${this.state.curr_func},
                "func_params" : ${values}
            }
        }`
        this.setState({ sending: true })
        setTimeout(() => {
            this.setState({sending: false, curr_func: null});
            this.input1.current.value = '';
            this.input2.current.value = '';
            this.input3.current.value = '';
            this.input4.current.value = '';
            this.input5.current.value = '';            
            this.input6.current.value = '';
            this.input7.current.value = '';
            this.input8.current.value = '';
        }, 2000)

    }

    handleRadioInput = (event) => {
        this.setState({ curr_func:  event.target.value })
    }
    
    renderJSONContent() {
        if(this.state.curr_func) {
            let data_string = `
            { 
                "tag": "contract"
                "payload": {
                    "func_name": ${this.state.curr_func}
                }
            }
            `
            return (
                <div style={{marginTop: 20, backgroundColor: 'lavender'}}>
                    {data_string}
                </div>
            )
        }
        return false;
    }
    renderPrametersBox() {
        if(this.props.user_func.length) {
            return (
                <div>
                    <h3>Specify Parameters</h3>
                    <div style={{marginBottom: 20}}>
                        <input type="text" style={{marginRight: 40, outline: 'none'}} ref={this.input1}/>
                        <input type="text" ref={this.input2}/>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input type="text" style={{marginRight: 40, outline: 'none'}} ref={this.input3}/>
                        <input type="text" ref={this.input4}/>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input type="text" style={{marginRight: 40, outline: 'none'}} ref={this.input5}/>
                        <input type="text" ref={this.input6}/>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input type="text" style={{marginRight: 40, outline: 'none'}} ref={this.input7}/>
                        <input type="text" ref={this.input8}/>
                    </div>
                    <div>
                        <button onClick={this.handleSend}>Send</button>
                    </div>   
                </div>
            )
        }
    }
    renderFunctions() {
        const { user_func } = this.props;
        //let user_func = ['contract 1', 'contract2']
        if(user_func.length) {
            return user_func.map((func, i) => {                
                return (
                    <div style={{ overflow: 'hidden'}} key={i}>
                        <label style={{ float: 'left'}}> {func}
                            <input type="radio" name='func_group' style={{ float: 'left'}} onClick={this.handleRadioInput} value={func}/>                        
                        </label>
                    </div>
                )
            })
        }
        return false;
            
    }

    render () { 
        const { user_func } = this.props;
        if(!user_func.length || user_func.length === 0) {
            return false;
        }
        return (
            <div>
                <form>
                    {<h4> Available Functions </h4>}
                    {this.renderFunctions()}
                    <div>
                        {this.renderPrametersBox()}
                        {this.state.sending && 
                            <div style={{maginTop: 40}}>
                                Sending..
                            </div>
                        }  
                        {this.renderJSONContent()}                   
                    </div>
                </form>
                <div style={{maginTop:  40}}>
                        <Graph/>
                </div>
            </div>
        )   
    }
}

export default Form;