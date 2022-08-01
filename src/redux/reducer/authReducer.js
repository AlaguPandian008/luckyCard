import {CARD_PAIRS_VALUE} from '../../constant/data';

const INITIAL_STATE = {
  cardPair: CARD_PAIRS_VALUE,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case '@auth/SET_DATA':
      return {
        ...state,
        cardPair: action.payload.data,
      };
    case '@auth/SET_FLIP_DATA':
      var tempList = state.cardPair;
      tempList[action.payload.index].isFlipped = action.payload.data;
      return {
        ...state,
        cardPair: tempList,
      };
    case '@auth/SET_CORRECT_DATA':
      var tempList = state.cardPair;
      tempList[action.payload.index1].isCorrect = action.payload.data;
      tempList[action.payload.index2].isCorrect = action.payload.data;
      return {
        ...state,
        cardPair: tempList,
      };
    default:
      return state;
  }
};
