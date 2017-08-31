import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { nextMessageValueChange, chatLogPopulate } from '../actions';

class ChatRoom extends Component {

  componentDidMount() {
    const { onChatLogUpdate } = this.props;
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const updatedChatLog = snapshot.val();
      if (updatedChatLog != null) {
        onChatLogUpdate(updatedChatLog);
      }
    });
  }

  submitMessage(event) {

    const { onMessageChange } = this.props;

    event.preventDefault();  // prevent the submitting of the form to trigger a page reload.

    if (this.props.nextMessage !== '') {

      // Compose the newMessage object
      const newMessage = {
        id: this.props.chatLog.length,
        text: this.props.nextMessage,
        timestamp: Date.now()
      };

      // Push the new message to the FB realtime database
      firebase.database().ref('messages/' + newMessage.id).set(newMessage);

      // Clear the input message field
      onMessageChange('');

    }

  }


  render() {

    const { onMessageChange, nextMessage } = this.props;

    console.log('nextMessage prop: ', this.props.nextMessage);

    const currentMessages = this.props.chatLog.map((message) => {
      let messageTimestamp = { hour: '--', minutes: '--', seconds: '--' };
      if (typeof(message.timestamp) === 'number') {
        const foo = new Date(message.timestamp);
        messageTimestamp = {
          hour: foo.getHours(),
          minutes: foo.getMinutes(),
          seconds: foo.getSeconds()
        }
      }
      return (
        <li key={message.id} >
          <ChatMessage>
            {messageTimestamp.hour}:{messageTimestamp.minutes}:{messageTimestamp.seconds} -> {message.text}
          </ChatMessage>
        </li>
      );
    })

    return (
      <ChatContainer>
        <ChatLog>
          {currentMessages}
        </ChatLog>
        <FormContainer>
          <Form onSubmit={this.submitMessage.bind(this)} > 
            <MessageInput
              value={nextMessage}
              rows='1'
              placeholder='Yolo!'
              onChange={event => onMessageChange(event.target.value)}
            />
            <SendButton disabled={ nextMessage === '' ? true : false } onClick={this.submitMessage.bind(this)}>
              <Icon>send</Icon>
            </SendButton> 
          </Form>
        </FormContainer>
      </ChatContainer>
    );

  }

}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Avenir Next';
`;

const ChatLog = styled.ul`
  display: block;
  padding: 0;
  list-style: none;
  color: gray;
`;

const ChatMessage = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const FormContainer = styled.div`
  width: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const MessageInput = styled.textarea`
  flex: 1;
  resize: none;
  padding: 10px 15px;
  margin-right: 10px;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  :focus {
    outline: none;
  }
  ::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SendButton = styled.button`
  height: 40px;
  width: 50px;
  border: none;
  border-radius: 20px;
  background-color: rgba(0, 122, 194, 0.6);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  :focus {
    outline: none;
  }
  :disabled, :disabled:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  :hover {
    background-color: rgba(0, 122, 194, 0.8);
    transition: all 0.2s ease-in-out;
  }
`;

const Icon = styled.i`
  position: relative;
  left: 2px;
  top: -0.5px;
  transform: rotate(-45deg);
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 22px;  /* Preferred icon size */
  color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
`;


/***********************************
  REACT-REDUX related code below
************************************/
const mapStateToProps = (state, ownProps) => {
  return { 
    chatLog: state.chatLog,
    nextMessage: state.nextMessage
  }
};

const mapDispatchToProps = {
  onMessageChange: nextMessageValueChange,
  onChatLogUpdate: chatLogPopulate
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);