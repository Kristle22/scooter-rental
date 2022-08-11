import { useContext } from 'react';
import BackContext from '../BackContext';

function Com({ row }) {
  const { handleDeleteComment, koltColors } = useContext(BackContext);

  const koltColor = koltColors.filter(col => col.id === row.color_id)[0].title;

  return (
    <>
      <div className='comment'>
        <div className='flex-row'>
          <div
            style={{
              position: 'relative',
              width: '16%',
              color: row.koltColor === 'white' ? 'black' : 'white',
            }}
          >
            <span
              style={{
                backgroundColor: koltColor ? koltColor : null,
                padding: '3px 10px',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                position: 'absolute',
                marginLeft: '-5px',
                marginTop: '-5px',
              }}
            ></span>
            <img
              style={{
                width: '100%',
                maxHeight: '120px',
                objectFit: 'contain',
                borderRadius: '5px',
              }}
              src={
                row.photo
                  ? row.photo
                  : require('../../../img/Envy-Colt2.png')
              }
              alt='scoter_image'
            />
          </div>
          <h2
            style={{ margin: '20px', fontFamily: 'cursive', fontSize: '30px' }}
          >
            {row.regCode}
          </h2>
        </div>
        <h2 style={{ flexDirection: 'row' }}>Comments({row.com_count})</h2>
        <ul>
          {row.coms &&
            row.coms
              .slice(0, -5)
              .split('-^-^-,')
              .map((c, i) => (
                <li key={i}>
                  {c}
                  <button
                    type='button'
                    className='dlt'
                    onClick={() =>
                      handleDeleteComment(row.coms_id.split(',')[i])
                    }
                  >
                    <svg>
                      <use href='#Delete' />
                    </svg>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}

export default Com;
