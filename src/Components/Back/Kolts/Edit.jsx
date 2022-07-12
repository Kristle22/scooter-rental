import { useState, useEffect, useContext } from 'react';
import BackContext from '../BackContext';

function Edit() {
  const { modalData, setModalData, setEditData, koltColors } =
    useContext(BackContext);

  const [isBusy, setIsBusy] = useState(1);
  const [lastUsed, setLastUsed] = useState('');
  const [totalRide, setTotalRide] = useState('');

  const [chbox, setChbox] = useState(false);
  const [color, setColor] = useState('0');
  const [divColor, setDivColor] = useState();

  const changeColor = (e) => {
    setColor(e.target.value);
    const targetColor = koltColors.filter(
      (c) => c.id === Number(e.target.value)
    )[0].title;
    setDivColor(targetColor);
    console.log('divColor', divColor);
  };

  const cbClick = () => {
    setChbox(!chbox);
    setIsBusy(chbox ? (modalData.isBusy = 1) : (modalData.isBusy = 0));
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setIsBusy(modalData.isBusy);
    // setColor(modalData.koltColor);
    setColor(
      koltColors.filter((c) => modalData.koltColor === c.title)[0]?.id ?? 0
    );
    setDivColor(modalData.koltColor);
    setLastUsed(modalData.lastUsed);
    setTotalRide(modalData.totalRide);
    setTotalRide('');
  }, [modalData, koltColors]);
  console.log('modalData', modalData);

  const handleEdit = () => {
    const data = {
      id: modalData.id,
      regCode: modalData.regCode,
      isBusy,
      lastUsed,
      totalRide: Number(modalData.totalRide) + Number(totalRide),
      color,
    };
    setEditData(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  console.log('koltColors', koltColors);
  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <h2>Rezervation info:</h2>
              <div className='user-info'>
                <p>
                  <b>pick-up:</b>{' '}
                  <i>
                    {modalData.startDate &&
                      new Date(modalData.startDate).toLocaleString()}
                  </i>
                </p>
                <p>
                  <b>return:</b>{' '}
                  <i>
                    {modalData.finishDate &&
                      new Date(modalData.finishDate).toLocaleString()}
                  </i>
                </p>
                <p>
                  <b>name:</b> <i>{modalData.userName}</i>
                </p>
                <p>
                  <b>email:</b> <i>{modalData.userEmail}</i>
                </p>
              </div>
              <i
                style={{
                  fontSize: '12px',
                  color: '#fff',
                  display: 'flex',
                  marginLeft: '10px',
                }}
              >
                comment:
              </i>
              <div className='user-com'>{modalData.userCom}</div>
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
                    ? require(`../../../img/${modalData.koltColor}.png`)
                    : require('../../../img/kick-scooter.png')
                }
                alt='scooter'
              />
            </div>
            <div className='right-side form'>
              <form>
                <h4>
                  Registration Code:{' '}
                  <span className='lastUsed'>{modalData.regCode}</span>
                </h4>
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
                <select value={color} onChange={changeColor}>
                  <option value='0'>Choose color</option>
                  {koltColors
                    ? koltColors.map((c) => (
                        <>
                          <option
                            key={c.id}
                            value={c.id}
                            style={{
                              backgroundColor: c.title,
                            }}
                          >
                            {c.title}
                          </option>
                        </>
                      ))
                    : null}
                </select>
                <div
                  style={{
                    backgroundColor: divColor,
                    borderRadius: '20px',
                    width: '20px',
                    height: '20px',
                  }}
                ></div>
                <h4>
                  Last Used:{' '}
                  <span className='lastUsed'>{modalData.lastUsed}</span>
                </h4>
                <label htmlFor='lU'>Enter the date:</label>
                <input
                  id='lU'
                  type='datetime-local'
                  value={lastUsed}
                  onChange={(e) => setLastUsed(e.target.value)}
                />
                <h4>
                  Total Ride:{' '}
                  <span className='lastUsed'>
                    {Number(modalData.totalRide).toFixed(2)} km.
                  </span>
                </h4>
                <label>Enter today's distance (km.):</label>
                <input
                  className='ride'
                  type='text'
                  value={totalRide}
                  onChange={(e) => setTotalRide(e.target.value)}
                  placeholder='... km.'
                />
                <div className='btns-modal'>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setModalData(null)}
                  >
                    <svg className='edt'>
                      <use href='#Exit' />
                    </svg>
                  </button>
                  <button type='button' className='put' onClick={handleEdit}>
                    <svg className='put'>
                      <use href='#Save' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
