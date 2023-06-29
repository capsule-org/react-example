import { combineReducers } from 'redux';
import authReducer from './authReducer'; // If you have this file
import nftReducer from './nftReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nft: nftReducer,
});

export default rootReducer;