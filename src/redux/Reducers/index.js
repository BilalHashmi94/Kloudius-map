import {combineReducers} from 'redux';
import SearchReducer from './SearchReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const RootReducer = combineReducers({
  SearchReducer: persistReducer(persistConfig, SearchReducer),
});

export default RootReducer;
