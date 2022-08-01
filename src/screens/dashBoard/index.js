import React, {Component, useRef, useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import CustomSafeArea from '../../components/customSafeArea';
import FlipCard from '../../components/flipCard';
import {CARD_PAIRS_VALUE} from '../../constant/data';
import * as DataAction from '../../redux/actions/authActions';
import {colors} from '../../constant/colors';

const NUM_OF_COLUMN = 3;
const RANDOM_MIN = 1;
const RANDOM_MAX = 1000;
function Dashboard(props) {
  //For show count of steps
  const [onClick, setOnClick] = useState(0);

  //For process settimeout during flip
  const [flippingTimer, setFlippingTimer] = useState(false);

  //For maintaining 1st card index
  const [cardOneIndex, setCardOneIndex] = useState(null);

  //For maintaining 2nd card index
  const [cardTwoIndex, setCardTwoIndex] = useState(null);

  //Ref for timer
  let timerRef = React.useRef(null);

  //Forward ref for FlipCard Component
  const flipCardRef = React.useRef([]);

  useEffect(() => {
    //maintains state of card one and card two and function accordingly
    //check whether both the cards are same and on different index
    if (
      cardOneIndex != null &&
      cardTwoIndex != null &&
      cardTwoIndex != cardOneIndex
    ) {
      if (
        props.data.cardPair[cardTwoIndex].number ==
        props.data.cardPair[cardOneIndex].number
      ) {
        props.actions.setCorrectData(true, cardTwoIndex, cardOneIndex);
        setCardTwoIndex(null);
        setCardOneIndex(null);
      }
      //Flip All incorrect try
      else {
        unFlipAll(false);
      }
    }
  }, [cardTwoIndex, cardOneIndex]);

  useEffect(() => {
    randmizeData();

    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef?.current);
      }
    };
  }, []);

  const unFlipAll = isRestart => {
    //Restart UnFliping on all the cards
    if (isRestart) {
      var tempList = props?.data?.cardPair;
      tempList.map((value, index) => {
        if (value.isFlipped || value.isCorrect) {
          flipCardRef.current[index].unFlip();
        }
      });
      setCardOneIndex(null);
      setCardTwoIndex(null);
      setOnClick(0);
      randmizeData();
    } else {
      //UnFliping on all the cards if they are incorrect

      if (!flippingTimer) {
        setFlippingTimer(true);

        timerRef.current = setTimeout(() => {
          var tempList = props?.data?.cardPair;
          tempList.map((value, index) => {
            if (value.isFlipped && !value.isCorrect) {
              flipCardRef.current[index].unFlip();
            }
          });
          setFlippingTimer(false);
          setCardOneIndex(null);
          setCardTwoIndex(null);
        }, 1000);
      }
    }
  };

  //maintain state of index on cardOneIndex and cardTwoIndex
  const checkIfConsecutiveAreTrue = (index, isFront) => {
    if (!isFront) {
      if (cardOneIndex == null) {
        setCardOneIndex(index);
      } else if (cardTwoIndex == null && cardOneIndex != null) {
        setCardTwoIndex(index);
      } else {
        setCardOneIndex(index);
        setCardTwoIndex(null);
      }
    }
  };
  //randomly generate and fix the numbers on the array of object
  const randmizeData = () => {
    var tempNumbers = CARD_PAIRS_VALUE;
    var rand = Math.floor(Math.random() * RANDOM_MAX) + RANDOM_MIN;

    tempNumbers.map((value, index) => {
      if (index % 2 == 0) {
        rand = Math.floor(Math.random() * RANDOM_MAX) + RANDOM_MIN;
      }
      value.number = rand;
      value.isFlipped = false;
      value.isCorrect = false;
      setCardOneIndex(null);
      setCardTwoIndex(null);
    });
    props.actions.setData(tempNumbers.sort(() => Math.random() - 0.5));
  };

  const restart = () => {
    unFlipAll(true);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.restartTxt} onPress={() => restart()}>
          Restart
        </Text>
        <Text>
          <Text style={styles.stepText(colors.white)}>STEPS: </Text>
          <Text style={styles.stepText(colors.lightBlue)}>{onClick}</Text>
        </Text>
      </View>
    );
  };

  //start flip actions
  const itemFliped = (index, isFront) => {
    setOnClick(onClick + 1);
    props.actions.setFlipData(!isFront, index);
    checkIfConsecutiveAreTrue(index, isFront);
  };

  return (
    <CustomSafeArea
      style={styles.topView}
      backgroundColor={colors.mildTranparent}>
      <FlatList
        data={props?.data?.cardPair}
        numColumns={NUM_OF_COLUMN}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.flatListContainerStyle}
        keyExtractor={(item, index) => `${'_' + index}`}
        renderItem={({item, index}) => (
          <FlipCard
            disabled={cardOneIndex != null && cardTwoIndex != null}
            ref={el => (flipCardRef.current[index] = el)}
            index={index}
            item={item}
            onFliped={itemFliped}
          />
        )}
      />
    </CustomSafeArea>
  );
}

const mapStateToProps = state => ({
  data: state.authReducer,
});

const Actions = {
  ...DataAction,
};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Actions, dispatch)};
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
