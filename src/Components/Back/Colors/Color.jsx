import { useContext } from 'react';
import BackContext from '../BackContext';

function Color({ color }) {
  const { setDeleteKoltColors } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteKoltColors(color);
  };
  return (
    <>
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
        <p style={{ color: '#99bbd7d1', fontSize: '25px' }}>
          {color.kolts_count}
        </p>
        <p style={{ color: '#ea766c', fontSize: '25px' }}>{color.busy}</p>
        <p style={{ color: '#85c086', fontSize: '25px' }}>{color.ready}</p>
      </div>
      {color.busy === 0 || color.busy === null ? (
        <div
          className='btns'
          style={{ width: '12%', alignItems: 'end', paddingRight: '10px' }}
        >
          <button type='button' className='dlt' onClick={handleDelete}>
            <svg>
              <use href='#Delete' />
            </svg>
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Color;
