import React, {Component} from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
  Text,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

import {name as appName} from './app.json';
import Constants from './Constants';
import {GameLoop} from './Gameloop';

import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import {randomBetween} from './utils';
import Colors from './colors';

export default class Snake extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: false,
      score: 0,
    };
    this.setStatusBarStyle();
  }

  setStatusBarStyle = () => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  };

  onEvent = (e) => {
    if (e.type === 'game-over') {
      Alert.alert(`Game over! , Your score: ${this.state.score}`);
      this.setState({
        running: false,
        score: 0,
      });
    }
    if (e.type === 'eat') {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
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

  // handleStartStop = () => {
  //   if (!this.state.running) {
  //     this.setState({
  //       running: true,
  //     });
  //   }
  // };

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
        <View style={styles.infoSection}>
          <Button
            title="Go Game!"
            onPress={this.reset}
            color={Colors.ANDROID_GREEN}
          />
          {/* <Button
            title="Start"
            onPress={this.handleStartStop}
            color={Colors.ANDROID_GREEN}
          /> */}
          <Text style={{fontSize: 20, color: Colors.ANDROID_GREEN}}>
            Score: {this.state.score}
          </Text>
        </View>

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
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  gameEngineStyle: {
    flex: null,
    backgroundColor: Colors.SPACE_CADET,
  },
  infoSection: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controls: {
    width: 180,
    height: 180,
    backgroundColor: Colors.BLUE_MUNSELL,
    borderRadius: 90,
  },
  controlRow: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#29335C',
  },
});

AppRegistry.registerComponent(appName, () => Snake);
