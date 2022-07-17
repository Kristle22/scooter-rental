import { useContext } from 'react';
import BackContext from '../BackContext';

function Kolt({ kolt }) {
  const { handleDeleteComment } = useContext(BackContext);

  return (
    <>
      <div className='comment'>
        <div className='flex-row'>
          <span
            style={{
              backgroundColor: kolt.koltColor ? kolt.koltColor : null,
              padding: '3px 10px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              position: 'absolute',
              marginLeft: '-5px',
              marginTop: '-5px',
            }}
          ></span>
          <div
            style={{
              width: '16%',
              color: kolt.koltColor === 'white' ? 'black' : 'white',
            }}
          >
            {kolt.img ? (
              <img
                style={{ width: '100%', borderRadius: '5px' }}
                src={require(`../../../img/${kolt.koltColor}.png`)}
                alt='scoter_image'
              />
            ) : (
              <img
                style={{ width: '100%', borderRadius: '5px' }}
                src={require('../../../img/Envy-Colt2.png')}
                alt='scooters'
              />
            )}
          </div>
          <h2
            style={{ margin: '20px', fontFamily: 'cursive', fontSize: '30px' }}
          >
            {kolt.regCode}
          </h2>
        </div>
        <h2 style={{ flexDirection: 'row' }}>Comments({kolt.com_count})</h2>
        <ul>
          {kolt.coms &&
            kolt.coms
              .slice(0, -5)
              .split('-^-^-,')
              .map((c, i) => (
                <li key={i}>
                  {c}
                  <button
                    type='button'
                    className='dlt'
                    onClick={() =>
                      handleDeleteComment(kolt.coms_id.split(',')[i])
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

export default Kolt;
