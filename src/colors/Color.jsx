import { useContext } from 'react';
import ColorContext from './ColorContext';

function Color({ color }) {
  const { setDeleteData } = useContext(ColorContext);

  const handleDelete = () => {
    setDeleteData(color);
  };
  console.log('color', color.imgPath);
  return (
    <>
      <div
        className='flex-row'
        style={{
          width: '80%',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        {color.imgPath ? (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={require(`../img/${color.title}.png`)}
            alt='scooter_image'
          />
        ) : (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={require('../img/Envy-Colt2.png')}
            alt='scooter'
          />
        )}
        <div
          style={{
            backgroundColor: color.title,
            color: color.title === 'white' ? 'black' : 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            lineHeight: '50px',
          }}
        >
          {color.title}
        </div>
        <p>{color.kolts_count}</p>
        <p>{color.busy}</p>
      </div>
      {color.busy === 0 || color.busy === null ? (
        <button
          type='button'
          className='dlt'
          onClick={handleDelete}
          style={{ maxHeight: '40px', padding: '10px 20px' }}
        >
          Delete
        </button>
      ) : (
        ''
      )}
    </>
  );
}

export default Color;
