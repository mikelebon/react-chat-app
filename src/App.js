import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import styled from 'styled-components';

import reducers from './reducers';
import fbconfig from './fb.conf';

import ChatRoom from './components/ChatRoom';

class App extends Component {

  componentWillMount() {    
    // Run this before we mount the App component
    // so that all the firebase settings are
    // initialized right away.
    firebase.initializeApp(fbconfig);
  }

  render() {
    return (
      <Provider store={createStore(reducers)} >  
        <AppContainer>
          <ChatRoom /> 
        </AppContainer>
      </Provider>
    );
  }
}

const AppContainer = styled.div`
  margin: 20px;
`;

export default App;
