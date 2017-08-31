/*
  ACTIONS are simply objects that instruct REDUCERS 
  on how to modify a specific part of the application's STATE.

  This file contains what are called "ACTION CREATORS".
  Their role is to take parameters from within a component
  and return a correctly formatted ACTION object that is ready for
  our REDUCERS to consume.

  The typical ACTION object is formatted as follow:

  {
    type: 'MY_ACTION_TYPE',  // <= This is MANDATORY. You must include the action type.
    payload: [anything]      // <= The payload can be anything you want.
  }

*/ 


export const nextMessageValueChange = (nextMessageValue) => {
  return {
    type: 'MESSAGE_CHANGED',
    payload: nextMessageValue
  };
};

export const chatLogPopulate = (newChatLogArray) => {
  return {
    type: 'POPULATE_CHAT_LOG',
    payload: newChatLogArray
  };
};