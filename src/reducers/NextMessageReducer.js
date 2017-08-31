/*
  Reducers are functions that return the value of the 
  state slice they are concerned with handling.

  They take the current state value as an argument 

*/

export default (state = '', action) => { // If state is undefined,
                                           // make it null when the app starts.
  switch (action.type) {
    case 'MESSAGE_CHANGED':
      return action.payload;
    default:
      return state;
  }
    
};