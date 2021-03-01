import React from 'react';

interface Props {
    buttonFunction:string;
}

export class RTCButton extends React.Component<Props> {


    render() {
        return (
          <div>
              <button> {this.props.buttonFunction} </button>
          </div>
        );
      }

}