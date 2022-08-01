import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constant/colors';
import {dimen} from '../../constant/dimen';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: colors.mildTranparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: dimen.dimenWidth88,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: dimen.dimenHeight0_1,
  },
  restartTxt: {fontSize: dimen.dimenHeight0_2, color: colors.darkBlue},
  stepText: color => ({fontSize: dimen.dimenHeight0_3, color}),
  flatListContainerStyle: {marginTop: dimen.dimenHeight0_1},
});

export default styles;
