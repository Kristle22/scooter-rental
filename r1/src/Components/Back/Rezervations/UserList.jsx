import User from './User';
import { useContext } from 'react';
import BackContext from '../BackContext';
import Search from '../Kolts/Search';

function UserList() {
  const { users } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Users:</h2>
      </div>
      <Search />
      <div className='flex-card'>
        <div className='flex-row user'>
          <h4>Kolt Reg. Code</h4>
          <h4>Pick-up Date</h4>
          <h4>Return Date</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Comment</h4>
          <h4>Distance (km.)</h4>
        </div>
        {users && users.map((u) => u.archive === 0 ? <User key={u.id} user={u} /> : null)}
      </div>
    </>
  );
}

export default UserList;
