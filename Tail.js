import React, {Component} from 'react';
import {View} from 'react-native';
import Constants from './Constants';
import Colors from './colors';

class Tail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tailList = this.props.elements.map((el, index) => {
      return (
        <View
          key={index}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: this.props.size,
            height: this.props.size,
            backgroundColor: Colors.BLUE_MUNSELL,
            position: 'absolute',
            left: el[0] * this.props.size,
            top: el[1] * this.props.size,
            borderRadius: 5,
          }}
        />
      );
    });

    return (
      <View
        style={{
          width: Constants.GRID_SIZE * this.props.size,
          height: Constants.GRID_SIZE * this.props.size,
        }}>
        {tailList}
      </View>
    );
  }
}

export default Tail;
