import {
  SEARCHHISTORY,
  CLEARALL
} from '../Constants';

const initialState = {
  searches: [],
};

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCHHISTORY:
      state = {
        ...state,
        searches: action.payload,
      };
      break;
    case CLEARALL:
      state = {
        ...state,
        searches: [],
      };
      break;

    default:
      break;
  }
  return state;
}
