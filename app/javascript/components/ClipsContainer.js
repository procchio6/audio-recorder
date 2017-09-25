import React, { Component } from 'react';

import Clip from './Clip'
import ClipsAdapter from '../adapters/ClipsAdapter';
import Recorder from './Recorder';

class ClipsContainer extends Component {

  state = {
    clips: []
  }

  componentDidMount() {
    ClipsAdapter.getClips().then( clips => {
      this.setState({clips: clips})
    })
  }

  handleDelete(clipId) {
    ClipsAdapter.deleteClip(clipId).then( resp => {
      let indexToDelete = this.state.clips.findIndex( clip => clip.id === clipId)
      this.setState({
        clips: this.state.clips.slice(0, indexToDelete).concat(this.state.clips.slice(indexToDelete+1))
      })
    })
  }

  handleClipSave = (clip) => {
    let clips = this.state.clips.slice()
    clips.unshift(clip)
    this.setState({ clips })
  }

  render() {
    let Clips = this.state.clips.map( clip => (
      <Clip
        key={clip.id}
        id={clip.id}
        title={clip.title}
        audio={clip.audio_file.url}
        onDelete={this.handleDelete.bind(this)}
      />
    ))

    return (
      <div>
        <Recorder onSave={this.handleClipSave}/>
        <div className='clips-list'>
          <h1>Clips</h1>
          {
            Clips.length > 0 ? Clips : <p>There are no audio clips to display!</p>
          }
        </div>
      </div>
    );
  }
}

export default ClipsContainer;
