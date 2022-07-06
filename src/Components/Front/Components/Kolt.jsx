import { useContext } from 'react';
import FrontContext from '../FrontContext';
// import { useState } from 'react';
import BookCreate from './BookCreate';

function Kolt({ kolt }) {
  const { setBookModal } = useContext(FrontContext);

  // const [user, setUser] = useState(null);

  const handleModal = () => {
    setBookModal({
      kolId: kolt.id,
      koltColor: kolt.color,
      koltCode: kolt.regCode,
    });
  };
  return (
    <>
      <div
        className='flex-row color'
        style={{
          diplay: 'flex',
          width: '80%',
          justifyContent: 'space-between',
        }}
      >
        <h4>COLT Image</h4>
        <h4>COLT Color</h4>
        <h4>COLT's Count</h4>
        <h4>BUSY</h4>
        <h4>AVAILABLE</h4>
      </div>
      <div
        className='flex-row color'
        style={{
          width: '80%',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        {kolt.img ? (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={require(`../../../img/${kolt.color}.png`)}
            alt='scooter_image'
          />
        ) : (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={require('../../../img/Envy-Colt2.png')}
            alt='scooter'
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className='colors'
            style={{
              backgroundColor: kolt.color,
              color: kolt.color === 'white' ? 'black' : 'white',
              boxShadow: `2px 3px 20px ${kolt.color ? kolt.color : '#999'} `,
            }}
          >
            {kolt.color ? kolt.color : 'random'}
          </div>
        </div>
        <p
          style={{
            color: '#99bbd7d1',
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}
        >
          {kolt.kolts_count}
        </p>
        <p
          style={{
            color: '#ea766c',
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}
        >
          {kolt.busy}
        </p>
        <p
          style={{
            color: '#85c086',
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}
        >
          {kolt.ready}
        </p>
      </div>
      <div className='flex-container group'>
        <ol>
          <h2>Reg. Code</h2>
          {kolt.regCodes &&
            kolt.regCodes.split(',').map((code, i) => <li key={i}>{code}</li>)}
        </ol>
        <ul>
          <h2>Last used</h2>
          {kolt.lastUses
            ? kolt.lastUses.split(',').map((last, j) => (
                <li key={j}>
                  {new Date(last).toUTCString().slice(4, -7)}
                  {/* {new Date(last).toLocaleTimeString()} */}
                </li>
              ))
            : null}
        </ul>
        <ul>
          <h2>Total Ride</h2>
          {kolt.totalRides &&
            kolt.totalRides
              .split(',')
              .map((total, k) => <li key={k}>{total}_km.</li>)}
        </ul>
        <ul style={{ width: '25%' }}>
          <h2>Ready to use</h2>
          {kolt.statuses &&
            kolt.statuses.split(',').map((stat, l) =>
              Number(stat) === 1 ? (
                <div
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <li key={l} className='isAvailable'>
                    Available
                  </li>
                  <div className='btns book'>
                    <button
                      type='button'
                      className='edt book'
                      onClick={handleModal}
                    >
                      BOOK NOW!
                    </button>
                  </div>
                </div>
              ) : (
                <li className='isBusy'>Busy</li>
              )
            )}
        </ul>
        <ul></ul>
      </div>

      <BookCreate />
    </>
  );
}

export default Kolt;
