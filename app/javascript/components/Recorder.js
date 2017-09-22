import React, { Component } from 'react';

import ClipsAdapter from '../adapters/ClipsAdapter';

class Recorder extends Component {

  state = {
    recording: false,
    audioClip: null,
    title: ''
  }

  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    navigator.getUserMedia(
      {audio: true},
      this.onGetUserMedia.bind(this),
      function (error) {
        console.log(error)
      }
    )
  }

  onGetUserMedia(stream) {
    this.mediaRecorder = new MediaRecorder(stream)

    this.chunks = []
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data)
    }

    this.mediaRecorder.onstop = this.handleStopRecording
  }

  handleStopRecording = (e) => {
    this.setState({audioClip : new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' })})
    this.chunks = []
  }

  handleSave = () => {
    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('audio_file', this.state.audioClip)
    ClipsAdapter.createClip(formData)
    this.setState({audioClip: null})
  }

  startRecording = () => {
    this.setState({ recording: true })
    this.mediaRecorder.start();
  }

  stopRecording = () => {
    this.setState({ recording: false })
    this.mediaRecorder.stop();
  }

  render() {
    return (
      <div>
        {
          this.state.recording ?
          <button onClick={this.stopRecording}>Stop</button>
          :
          <button onClick={this.startRecording}>Record</button>
        }
        {
          (this.state.audioClip && !this.state.recording) &&
          <div>
            <button onClick={this.handleSave}>Save</button>
            <input
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})}
              placeholder='Title'
            />
          </div>
        }

      </div>
    );
  }
}

export default Recorder;
