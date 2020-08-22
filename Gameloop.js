import Constants from './Constants';
import {randomBetween} from './utils';

const GameLoop = (entities, {touches, events, dispatch}) => {
  let head = entities.head;
  let food = entities.food;
  let tail = entities.tail;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === 'move-up' && head.yspeed !== 1) {
        head.yspeed = -1;
        head.xspeed = 0;
      } else if (events[i].type === 'move-down' && head.yspeed !== -1) {
        head.yspeed = 1;
        head.xspeed = 0;
      } else if (events[i].type === 'move-left' && head.xspeed !== 1) {
        head.yspeed = 0;
        head.xspeed = -1;
      } else if (events[i].type === 'move-right' && head.xspeed !== -1) {
        head.yspeed = 0;
        head.xspeed = 1;
      }
    }
  }

  head.nextMove -= 1;
  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;

    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
      // game over
      dispatch({
        type: 'game-over',
      });
    } else {
      tail.elements = [[head.position[0], head.position[1]]]
        .concat(tail.elements)
        .slice(0, -1);

      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;

      // if hit the tail
      for (let i = 0; i < tail.elements.length; i++) {
        if (
          head.position[0] === tail.elements[i][0] &&
          head.position[1] === tail.elements[i][1]
        ) {
          dispatch({
            type: 'game-over',
          });
        }
      }

      // eating food
      // todo grow tail

      if (
        head.position[0] === food.position[0] &&
        head.position[1] === food.position[1]
      ) {
        tail.elements = [[food.position[0], food.position[1]]].concat(
          tail.elements,
        );
        dispatch({
          type: 'eat',
        });
        food.position[0] = randomBetween(0, Constants.GRID_SIZE - 1);
        food.position[1] = randomBetween(0, Constants.GRID_SIZE - 1);
      }
    }
  }

  // console.log('tick');
  return entities;
};

export {GameLoop};
