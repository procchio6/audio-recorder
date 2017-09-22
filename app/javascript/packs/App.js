import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/clips')
  }

  render() {
    return (
      <div>This is the app.</div>
    );
  }
}

export default App;
