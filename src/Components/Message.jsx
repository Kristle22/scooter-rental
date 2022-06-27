import { useContext } from 'react';
import KoltContext from './KoltContext';

function Message() {
  const { message } = useContext(KoltContext);
  if (null === message) return null;
  return (
    <div className='show-message'>
      <div className={'alert alert-' + message.type}>{message.text}</div>
    </div>
  );
}

export default Message;
