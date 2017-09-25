import React, { Component } from 'react';

import Clip from './components/Clip';
import ClipsContainer from './components/ClipsContainer';
import Recorder from './components/Recorder';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <ClipsContainer />
      </div>
    );
  }
}

export default App;
