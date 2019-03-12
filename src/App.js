import React, { Component } from 'react';
import './app.css';
import { filter, map } from 'lodash';
import Form from './components/form/form';
import Graph from './components/graph/graph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      func: [],
    }
    this.uploadRef = React.createRef();
    this.changeFile = this.changeFile.bind(this);
    this.handleFileSelector = this.handleFileSelector.bind(this);
  }

  changeFile() {
    this.uploadRef.current.value = null;
  }

  async handleFileSelector(event){
    const files = event.target.files;
    const file_reader = new FileReader();   
    const current_file = files[0];  
    
    const reader = new FileReader();
    const bytes = await new Promise((resolve, reject) => {
      reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Failed to parse contract file."))
      }
  
      reader.onload = () => {          
          resolve(reader.result);          
      }

      reader.readAsArrayBuffer(current_file);
    });
    
    const contract = await WebAssembly.instantiate(bytes, {
      env: {
          _payload_len: () => 0, 
          _payload: () => 0, 
          _provide_result: () => 0, 
          _send_transaction: () => 0,
          _log: Math.log,
      }
    });
    
    let exportedFunctions = filter(Object.keys(contract.instance.exports), (exp) => {      
      return exp.startsWith("_contract_")
    });

    exportedFunctions = map(exportedFunctions, (exp) => {      
      return exp.substr(contract.length)
    });    
    
    if(exportedFunctions.length > 0) {
      this.setState({ func: exportedFunctions })
    }
    
  }

  renderView() {
    return (
      <div>
          <Form
            user_func={this.state.func}/>
        </div>
    )
  }

  render() {
    return (
      <div style={{marginLeft: 40}}>
        <h2>Choose a file (wasm)</h2>
        <div>        
          <input type="file" ref={this.uploadRef} accept=".docx,.wasm" id="profile-upload" multiple={false} onChange={this.handleFileSelector} onClick={this.changeFile}/>
        </div>
        {this.renderView()}
        <div>
        </div>
        <Graph/>
      </div>
    );
  }
}

export default App;
