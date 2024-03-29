import { Navigate, useParams } from 'react-router-dom';
import '../css/App.css';
import Messages from './Messages.jsx';
import Sender from './Sender.jsx';
import {useSelector, useDispatch} from 'react-redux';
import { addMessageWithReply, initMessagesTrackingThunk } from '../store/messages/actions';
import { getMessageList } from '../store/messages/selectors';
import { getChatList } from '../store/chatList/selectors';
import { getUserName } from '../store/profile/selectors';
import { Suspense, useEffect } from 'react';

const Chat = () => {
  const { chatID } = useParams();
  const messageList = useSelector(getMessageList);
  const dispatch = useDispatch();
  const chats = useSelector(getChatList);
  const userName = useSelector(getUserName);
  const chatAuthor = chats.find((el)=> {
    if (el.id === chatID) {
      return true;
    }
    return false
  })?.name;
  

  const handleMessage = (message) => {
    if (message !== '') {
           dispatch(addMessageWithReply(chatID, message, userName, chatAuthor));
           }
  }
  useEffect(()=> 
    dispatch(initMessagesTrackingThunk()),[])
  
if (!messageList[chatID]) {
  return <Navigate to= '/chats'/>
}

  return (
    <div className="container-right">
      <Messages 
            messages = {messageList[chatID]} chatAuthor = {chatAuthor}/>
    <Sender handleMessage = {handleMessage}></Sender>
    </div>
  );
}

export default Chat;
