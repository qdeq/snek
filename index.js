import React, {Component} from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

import {name as appName} from './app.json';
import Constants from './Constants';
import {GameLoop} from './Gameloop';

import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import {randomBetween} from './utils';

export default class Snake extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
    };
  }

  onEvent = (e) => {
    if (e.type === 'game-over') {
      Alert.alert('Game over!');
      this.setState({
        running: false,
      });
    }
  };

  reset = () => {
    this.engine.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        renderer: <Head />,
        xspeed: 1,
        yspeed: 0,
        nextMove: 1,
        updateFrequency: 10,
      },
      food: {
        position: [
          randomBetween(0, Constants.GRID_SIZE - 1),
          randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: {size: Constants.CELL_SIZE, elements: [], renderer: <Tail />},
    });

    this.setState({
      running: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.engine = ref;
          }}
          style={[
            styles.gameEngineStyle,
            {width: this.boardSize, height: this.boardSize},
          ]}
          entities={{
            head: {
              position: [0, 0],
              size: Constants.CELL_SIZE,
              renderer: <Head />,
              xspeed: 1,
              yspeed: 0,
              nextMove: 1,
              updateFrequency: 10,
            },
            food: {
              position: [
                randomBetween(0, Constants.GRID_SIZE - 1),
                randomBetween(0, Constants.GRID_SIZE - 1),
              ],
              size: Constants.CELL_SIZE,
              renderer: <Food />,
            },
            tail: {size: Constants.CELL_SIZE, elements: [], renderer: <Tail />},
          }}
          onEvent={this.onEvent}
          systems={[GameLoop]}
          running={this.state.running}
        />

        <Button title="New Game" onPress={this.reset} />

        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-up'});
              }}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-left'});
              }}>
              <View style={styles.control} />
            </TouchableOpacity>
            <View style={[styles.control, {backgroundColor: null}]} />
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-right'});
              }}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-down'});
              }}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameEngineStyle: {
    flex: null,
    backgroundColor: '#FFFFFF',
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

AppRegistry.registerComponent(appName, () => Snake);
