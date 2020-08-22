import {Dimensions} from 'react-native';

const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').width,
  GRID_SIZE: Math.floor(Dimensions.get('screen').width / 15),
  CELL_SIZE: 15,
};

export default Constants;
