import React, { Component } from 'react';

import Clip from './Clip'
import ClipsAdapter from '../adapters/ClipsAdapter';

class ClipsList extends Component {

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
        <h1>Clips</h1>
        {Clips}
      </div>
    );
  }
}

export default ClipsList;
