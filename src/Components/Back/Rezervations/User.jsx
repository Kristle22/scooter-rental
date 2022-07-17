import { useContext } from 'react';
import BackContext from '../BackContext';
function User({ user }) {
  const { setModalRezervation, setDeleteRezervation } = useContext(BackContext);

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
        className='flex-row user'
        style={{
          flexWrap: 'nowrap',
        }}
      >
        <p>{user.kolt_code}</p>
        <p>
          {JSON.stringify(new Date(user.pick_up_date))
            .slice(1, -6)
            .replace('T', ' ')}
          {/* {new Date(user.pick_up_date).toISOString().slice(0, 10)}{' '} */}
          {/* {new Date(user.pick_up_date).toLocaleTimeString()} */}
        </p>
        <p>
          {JSON.stringify(new Date(user.return_date))
            .slice(1, -6)
            .replace('T', ' ')}
          {/* {new Date(user.return_date).toISOString().slice(0, 10)}{' '} */}
          {/* {new Date(user.return_date).toLocaleTimeString()} */}
        </p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.com}</p>
        <p
          style={{
            border: '2px solid #fff',
            alignSelf: 'start',
            borderRadius: '5px',
          }}
        >
          {user.distance.toFixed(2)}
        </p>
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
              style={{ fontSize: '14px', width: '65px', height: '65px' }}
            >
              REM-OVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
