import { useState, useEffect, useContext } from 'react';
import KoltContext from './KoltContext';

function Edit() {
  const { modalData, setModalData, setEditData, koltColors } =
    useContext(KoltContext);

  const [isBusy, setIsBusy] = useState(1);
  const [lastUsed, setLastUsed] = useState('');
  const [totalRide, setTotalRide] = useState('');

  const [chbox, setChbox] = useState(false);
  const [color, setColor] = useState('0');

  const cbClick = () => {
    setChbox(!chbox);
    setIsBusy(chbox ? (modalData.isBusy = 1) : (modalData.isBusy = 0));
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setIsBusy(modalData.isBusy);
    // setColor(modalData.color);
    setColor(koltColors.filter((c) => modalData.color === c.title)[0]?.id ?? 0);
    setLastUsed(modalData.lastUsed);
    setTotalRide(modalData.totalRide);
    setTotalRide('');
  }, [modalData]);
  console.log('modalData', modalData);

  const handleEdit = () => {
    const data = {
      isBusy,
      color,
      lastUsed,
      totalRide: Number(modalData.totalRide) + Number(totalRide),
      id: modalData.id,
      regCode: modalData.regCode,
    };
    setEditData(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  console.log('koltColors', koltColors);
  console.log('color', color);
  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <h2>Info</h2>
              <h3>
                Color:{' '}
                <span>
                  {koltColors.map((c) => (color === c.id ? c.title : ''))}
                </span>
              </h3>
              <h3>
                User: <span></span>
              </h3>
              <h4>Plan and manage your trip online</h4>
              <button
                type='button'
                className='close-x'
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
              <img
                className='scooter'
                src={
                  modalData.img
                    ? require(`../img/${modalData.color}.png`)
                    : require('../img/kick-scooter.png')
                }
                alt='scooter'
              />
            </div>
            <div className='right-side form'>
              <form>
                <h4>
                  Registration Code:{' '}
                  <span className='old'>{modalData.regCode}</span>
                </h4>
                <fieldset>
                  <legend>
                    <h4>Change availability</h4>
                  </legend>
                  {isBusy === 1 ? (
                    <div className='field'>
                      <h4 className='isAvailable'>Available</h4>
                      <input
                        type='checkbox'
                        value={chbox}
                        checked={false}
                        onChange={cbClick}
                      />
                      <label>Busy</label>
                    </div>
                  ) : (
                    <div className='field'>
                      <h4 className='isBusy'>Busy</h4>
                      <input
                        type='checkbox'
                        value={chbox}
                        checked={true}
                        onChange={cbClick}
                      />
                      <label>Busy</label>
                    </div>
                  )}
                </fieldset>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value='0'>Choose color</option>
                  {koltColors
                    ? koltColors.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                          style={{
                            backgroundColor: c.title,
                          }}
                        >
                          {c.title}
                        </option>
                      ))
                    : null}
                </select>
                {koltColors
                  ? koltColors.map((c) =>
                      c.id === color ? (
                        <div
                          key={c.id}
                          style={{
                            backgroundColor: c.title,
                            borderRadius: '20px',
                            width: '20px',
                            height: '20px',
                          }}
                        ></div>
                      ) : null
                    )
                  : null}
                <h4>
                  Last Used: <span className='old'>{modalData.lastUsed}</span>
                </h4>
                <label>Enter the date:</label>
                <input
                  type='date'
                  value={lastUsed}
                  onChange={(e) => setLastUsed(e.target.value)}
                />
                <h4>
                  Total Ride:{' '}
                  <span className='old'>
                    {Number(modalData.totalRide).toFixed(2)} km.
                  </span>
                </h4>
                <label>Enter today's distance (km.):</label>
                <input
                  className='ride'
                  type='text'
                  value={totalRide}
                  onChange={(e) => setTotalRide(e.target.value)}
                />
                <button
                  type='button'
                  className='close'
                  onClick={() => setModalData(null)}
                >
                  Close
                </button>
                <button type='button' className='put' onClick={handleEdit}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
