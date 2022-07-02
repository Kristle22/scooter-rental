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
          width: '85%',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        {color.imgPath ? (
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
        <p>{color.kolts_count}</p>
        <p style={{ color: '#ea766c' }}>{color.busy}</p>
        <p style={{ color: '#85c086' }}>{color.ready}</p>
      </div>
      {color.busy === 0 || color.busy === null ? (
        <div className='btns' style={{ width: '12%', alignItems: 'end' }}>
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
