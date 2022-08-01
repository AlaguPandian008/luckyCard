import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constant/colors';
import {dimen} from '../../constant/dimen';

const styles = StyleSheet.create({
  animateViewContainer: {
    backgroundColor: colors.white,
    height: dimen.dimenHeight20,
    width: dimen.dimenWidth28,
    margin: dimen.dimenWidth0_1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimen.dimenWidth0_1,
  },
  subContainer: {
    backgroundColor: colors.lightBlue,
    height: dimen.dimenHeight19,
    width: dimen.dimenWidth26,
    borderRadius: dimen.dimenWidth0_1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quesMarkTxt: {color: colors.white, fontSize: dimen.dimenHeight0_5},
  itemTxt: {
    color: colors.black,
    transform: [{scaleX: -1}],
    fontSize: dimen.dimenHeight0_2,
  },
  flipAnimationStyl: {
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  },
});

export default styles;
