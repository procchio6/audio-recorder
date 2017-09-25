import React, { Component } from 'react';

import ClipsAdapter from '../adapters/ClipsAdapter';

class Recorder extends Component {

  state = {
    recording: false,
    audioClip: null,
    title: ''
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({
      audio: true
    })
    .then( stream => {
      this.onGetUserMedia(stream)
    })
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
    this.setState({audioClip : new Blob(this.chunks)})
    this.chunks = []
  }

  handleSave = () => {
    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('audio_file', this.state.audioClip)
    ClipsAdapter.createClip(formData).then( (clip) => {
      this.props.onSave(clip)
      this.setState({
        audioClip: null,
        title: ''
      })
    })
  }

  startRecording = () => {
    this.setState({ recording: true })
    this.mediaRecorder.start()
  }

  stopRecording = () => {
    this.setState({ recording: false })
    this.mediaRecorder.stop()
  }

  render() {
    return (
      <div className='recorder'>
        {
          this.state.recording ?
          <button className='btn-stop' onClick={this.stopRecording}></button>
          :
          <button className='btn-record' onClick={this.startRecording}></button>
        }
        {
          (this.state.audioClip && !this.state.recording) &&
          <div className='recorder-save'>
            <input
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})}
              placeholder='Title'
            />
            <button onClick={this.handleSave}>Save</button>
          </div>
        }

      </div>
    );
  }
}

export default Recorder;
