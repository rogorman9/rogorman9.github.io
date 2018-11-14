import React, { Component } from 'react';
import './App.css';
import Upload from './components/Upload/upload';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Upload />
      </div>
    );
  }
}

export default App;
