import { useState, useEffect, useContext } from 'react';
import FrontContext from '../FrontContext';

function DistanceRecord({ kolt }) {
  const { distanceModal, setDistanceModal, setCreateDistance } =
    useContext(FrontContext);

  const [distance, setDistance] = useState(0);
  // console.log(distanceModal);
  useEffect(() => {
    if (null === distanceModal) {
      return;
    }
    setDistance('');
  }, [distanceModal]);

  const handleRecord = () => {
    const data = {
      distance: Number(distance),
    };
    console.log('DATA', distanceModal);
    setCreateDistance(data);
    setDistanceModal(null);
  };
  if (null === distanceModal) {
    return null;
  }

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont reg'>
          <div className='modal reg'>
            <button
              type='button'
              className='close-x reg'
              onClick={() => setDistanceModal(null)}
            >
              &times;
            </button>
            <form className='reg'>
              <div className='regInfo'>
                <span className='lastUsed reg'>
                  Registration Code: {distanceModal.koltCode}
                </span>
                <h4
                  className='isAvailable reg'
                  style={{ width: 'fit-content' }}
                >
                  {distanceModal.koltColor
                    ? distanceModal.koltColor
                    : 'random color'}
                </h4>
              </div>
              <label>DISTANCE:</label>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <input
                  style={{ display: 'block', width: '20%', height: '40px' }}
                  type='text'
                  placeholder='... km.'
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
                <p
                  style={{
                    width: '50%',
                    fontFamily: 'cursive',
                    textAlign: 'center',
                  }}
                >
                  Hope enjoyed your trip! Thank's for choosing us!
                </p>
              </div>
              <div style={{ justifyContent: 'start' }} className='btns reg'>
                <button
                  type='button'
                  className='close reg'
                  onClick={() => setDistanceModal(null)}
                >
                  EXIT
                </button>
                <button
                  type='button'
                  className='put reg'
                  onClick={handleRecord}
                >
                  SEND!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DistanceRecord;
