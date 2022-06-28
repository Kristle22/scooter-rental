import { useContext } from 'react';
import ColorContext from './ColorContext';

function Color({ color }) {
  const { setDeleteData } = useContext(ColorContext);

  const handleDelete = () => {
    setDeleteData(color);
  };
  console.log(color);
  return (
    <>
      <div
        className='flex-row'
        style={{ justifyContent: 'flex-start', flexWrap: 'nowrap' }}
      >
        {color.img ? (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src={color.imgPath}
            alt='scoter_image'
          />
        ) : (
          <img
            style={{ width: '16%', borderRadius: '5px' }}
            src='./img/Envy-Colt2.png'
            alt='scooter'
          />
        )}
        <p>{color.title}</p>
        <p>{color.kolts_count}</p>
        <p>{color.busy}</p>
        {color.busy === 0 || color.busy === null ? (
          <button type='button' className='dlt' onClick={handleDelete}>
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default Color;
