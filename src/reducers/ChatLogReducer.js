/*
  Reducers are functions that return the value of the 
  state slice they are concerned with handling.

  They take the current state value as an argument 

*/

export default (state = [], action) => {  // If state is undefined,
                                          // make it and empty array when the app starts.
  switch (action.type) {
    case 'POPULATE_CHAT_LOG':
      return action.payload;
    default:
      return state;
  }

};