import StatusBtns from './StatusBtns';

function User({ user }) {

  console.log('USER', user);
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
        <StatusBtns row={user} />
      </div>
    </>
  );
}

export default User;
