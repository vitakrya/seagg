import React from 'react';

export default class Avatar extends React.Component {
  render() {
    return (
      <div>
        Giter {new Date().toString()}
        {this.props.children}
      </div>
    );
  }
}