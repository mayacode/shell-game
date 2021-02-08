import { BALL_COLOR } from '../../constants/constants';

export function Ball() {
  const style = {
    display: 'inline-block',
    backgroundColor: BALL_COLOR,
    width: '30px',
    height: '30px',
    position: 'absolute',
    zIndex: -10,
    left: '9px',
    bottom: '-9px',
    borderRadius: '15px',
  };
  return (
    <span style={style} />
  )
}

Ball.displayName = 'Ball';

export default Ball;
