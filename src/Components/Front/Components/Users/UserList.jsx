import User from './User';
import { useContext } from 'react';
import FrontContext from '../../FrontContext';

function UserList() {
  const { users } = useContext(FrontContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Users:</h2>
      </div>
      <div className='flex-card' style={{ padding: '20px' }}>
        <div
          className='flex-row'
          style={{
            marginLeft: '15px',
            justifyContent: 'space-around',
            width: '77%',
          }}
        >
          <h4>Pick-up Date</h4>
          <h4>Return Date</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Comment</h4>
        </div>
        {users && users.map((u) => <User key={u.id} user={u} />)}
      </div>
    </>
  );
}

export default UserList;
