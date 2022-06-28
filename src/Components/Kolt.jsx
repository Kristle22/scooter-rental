import { useContext } from 'react';
import KoltContext from './KoltContext';

function Kolt({ kolt }) {
  const { setDeleteData, setModalData } = useContext(KoltContext);
  const handleDelete = () => {
    setDeleteData(kolt);
  };
  const handleModal = () => {
    setModalData(kolt);
  };
  console.log(kolt.img);
  return (
    <>
      <div className='flex-row'>
        <div
          style={{
            width: '16%',
            color: kolt.color === 'White' ? 'black' : 'white',
          }}
        >
          <span
            style={{
              backgroundColor: kolt.color ? kolt.color : 'black',
              padding: '3px 10px',
              borderRadius: '5px',
            }}
          >
            {kolt.color ? kolt.color : 'Random'}
          </span>
          {kolt.img ? (
            <img
              style={{ width: '100%', borderRadius: '5px' }}
              src={kolt.img}
              alt='scoter_image'
            />
          ) : (
            <img
              style={{ width: '100%', borderRadius: '5px' }}
              src='./img/Envy-Colt2.png'
              alt='scooters'
            />
          )}
        </div>
        <p>{kolt.regCode}</p>
        {kolt.isBusy === 1 ? (
          <p className='isAvailable'>available</p>
        ) : (
          <p className='isBusy'>busy</p>
        )}
        <p>{kolt.lastUsed}</p>
        <p>{Number(kolt.totalRide).toFixed(2)} km.</p>
        <div className='btns'>
          <button type='button' className='edt' onClick={handleModal}>
            Edit
          </button>
          <button type='button' className='dlt' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Kolt;
