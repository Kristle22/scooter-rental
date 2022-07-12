// import Message from '../Message';
import Nav from '../Nav';
import Create from './Create';
import List from './List';
import UserList from './UserList';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <Create />
        <List />
        <UserList />
      </div>
    </>
  );
}

export default Crud;
