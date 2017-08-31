import { combineReducers } from 'redux';

import ChatLogReducer from './ChatLogReducer';
import NextMessageReducer from './NextMessageReducer';

export default combineReducers({
  chatLog: ChatLogReducer,         // The chat log being displayed in the app.
  nextMessage: NextMessageReducer   // Message currently being typed by user.
});
