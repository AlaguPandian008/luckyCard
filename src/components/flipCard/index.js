import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import {View, TouchableOpacity, Animated, Text} from 'react-native';
import styles from './styles';
const FlipCard = React.forwardRef((props, ref) => {
  const [isFront, setIsFront] = useState(true);
  const [flipRotation, setFlipRotation] = useState(0);

  const flipAnimation = useRef(new Animated.Value(0)).current;

  flipAnimation.addListener(({value}) => setFlipRotation(value));

  //Forward ref for reset card
  useImperativeHandle(ref, () => ({
    unFlip: () => {
      if (flipRotation != 0) {
        props?.onFliped(props.index, flipRotation ? true : false);
        setIsFront(flipRotation ? true : false);
        !!flipRotation ? flipToCard(0, 300) : flipToCard(180, 300);
      }
    },
  }));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate(styles.flipAnimationStyl),
      },
    ],
  };

  const flipToCard = (toValue, duration) => {
    Animated.timing(flipAnimation, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={() => {
        if (flipRotation == 0) {
          props?.onFliped(props.index, flipRotation ? true : false);
          setIsFront(flipRotation ? true : false);
          !!flipRotation ? flipToCard(0, 300) : flipToCard(180, 300);
        }
      }}>
      <Animated.View style={[styles.animateViewContainer, flipToFrontStyle]}>
        <View>
          {!!isFront && !props.item.isCorrect ? (
            <View style={styles.subContainer}>
              <Text style={styles.quesMarkTxt}>?</Text>
            </View>
          ) : (
            <Text style={styles.itemTxt}>{props.item.number}</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

export default FlipCard;
