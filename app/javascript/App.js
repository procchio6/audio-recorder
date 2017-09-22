import React, { Component } from 'react';

import Clip from './components/Clip';
import ClipsList from './components/ClipsList';
import Recorder from './components/Recorder';

class App extends Component {

  render() {
    console.log(process.env.ROOT_URL);
    return (
      <div>
        <Recorder />
        <ClipsList />
      </div>
    );
  }
}

export default App;