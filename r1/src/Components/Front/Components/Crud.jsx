// import Nav from '../Nav';
// import ColorList from './ColorList';
import KoltList from './KoltList';
import Message from '../Message';

function Crud() {
  return (
    <>
      <div className='container'>
        {/* <ColorList /> */}
        <KoltList />
        {/* <UserList /> */}
        <Message />
      </div>
    </>
  );
}

export default Crud;
