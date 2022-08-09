import { useContext } from 'react';
import FrontContext from '../FrontContext';

// import BookGroup from './BookGroup';

function Color({ color }) {
  const { a } = useContext(FrontContext);

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
        {color.photo ? (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={require(`../../../img/${color.title}.png`)}
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
              backgroundColor: color.title,
              color: color.title === 'white' ? 'black' : 'white',
              boxShadow: `2px 3px 20px ${color.title} `,
            }}
          >
            {color.title}
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
          {color.kolts_count}
        </p>
        <p
          style={{
            color: '#ea766c',
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}
        >
          {color.busy}
        </p>
        <p
          style={{
            color: '#85c086',
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}
        >
          {color.ready}
        </p>
      </div>
      {/* <BookGroup color={color} /> */}
    </>
  );
}

export default Color;
