import { useState, useEffect, useContext } from 'react';
import FrontContext from '../FrontContext';

function DistanceRecord({ kolt }) {
  const {
    distanceModal,
    setDistanceModal,
    setCreateDistance,
    setEditData,
    color,
    setColor,
    koltColors,
  } = useContext(FrontContext);

  const [returnDate, setReturnDate] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (null === distanceModal) {
      return;
    }
    setColor(
      koltColors.filter((c) => distanceModal.koltColor === c.title)[0]?.id ??
        null
    );
    setDistance('');
    setReturnDate('');
  }, [distanceModal, color, setColor, koltColors]);

  // console.log('DATA', distanceModal);
  const handleRecord = () => {
    const data = {
      userId: distanceModal.userId,
      id: distanceModal.id,
      regCode: distanceModal.regCode,
      koltColor: distanceModal.koltColor,
      isBusy: 1,
      color,
      distance: Number(distance),
      returnDate: returnDate ? returnDate : distanceModal.returnDate,
    };
    setEditData(data);
    console.log(data);
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
          <div className='modal reg distance'>
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
                  Registration Code: {distanceModal.regCode}
                </span>
                <h4
                  className='isAvailable reg'
                  style={{ width: 'fit-content' }}
                >
                  {distanceModal.koltColor ? distanceModal.koltColor : 'random'}
                </h4>
              </div>
              <div style={{ margin: '20px 0', width: '75%' }}>
                <label>RETURN:</label>
                <span className='lastUsed reg'>
                  Primary date:{' '}
                  {new Date(distanceModal.returnDate).toLocaleString()}
                </span>
                <input
                  type='datetime-local'
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label>DISTANCE:</label>
                <input
                  style={{ display: 'block', width: '30%', height: '30px' }}
                  type='text'
                  placeholder='... km.'
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <p
                style={{
                  width: '50%',
                  fontFamily: 'cursive',
                  textAlign: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '45%',
                }}
              >
                Hope enjoyed your trip! Thank's for choosing us!
              </p>
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
