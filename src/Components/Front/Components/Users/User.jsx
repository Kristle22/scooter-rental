import { useContext } from 'react';
import FrontContext from '../../FrontContext';
function User({ user }) {
  const { setModalRezervation, setDeleteRezervation } =
    useContext(FrontContext);

  const handleModal = () => {
    setModalRezervation(user);
  };
  const handleDelete = () => {
    setDeleteRezervation(user);
  };
  // console.log('USER', user);
  return (
    <>
      <div
        className='flex-row'
        style={{
          flexWrap: 'nowrap',
          justifyContent: 'space-around',
          width: '95%',
          paddingLeft: '20px',
        }}
      >
        <p>
          {new Date(user.pick_up_date).toISOString().slice(0, 10)}{' '}
          {new Date(user.pick_up_date).toLocaleTimeString()}
        </p>
        <p>
          {new Date(user.return_date).toISOString().slice(0, 10)}{' '}
          {new Date(user.return_date).toLocaleTimeString()}
        </p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.com}</p>
        <div className='btns book'>
          <div className='btns' style={{ flexDirection: 'column' }}>
            <button
              type='button'
              className='edt book'
              onClick={handleModal}
              style={{ fontSize: '12px', width: '65px', height: '65px' }}
            >
              MAKE CHAN-GES
            </button>
            <button
              type='button'
              className='dlt book'
              onClick={handleDelete}
              style={{ fontSize: '11px', width: '65px', height: '65px' }}
            >
              CANCEL YOUR ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
