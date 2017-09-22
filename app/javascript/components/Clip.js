import React, { Component } from 'react';

class Clip extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <audio src={this.props.audio} controls></audio>
        <button onClick={(e) => this.props.onDelete(this.props.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default Clip;
