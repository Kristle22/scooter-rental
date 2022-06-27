import { useContext, useState } from 'react';
import rand from '../Functions/randNumbers';
import KoltContext from './KoltContext';

function Create() {
  const { setCreateData, koltColors } = useContext(KoltContext);
  console.log('koltColors', koltColors);
  const [regCode, setRegCode] = useState('KO' + rand(100000, 999999));

  const [color, setColor] = useState('0');

  const [isBusy, setIsBusy] = useState(1);
  const [lastUsed, setLastUsed] = useState('');
  const [totalRide, setTotalRide] = useState('');

  const handleCreate = () => {
    const data = { regCode, isBusy, color, lastUsed, totalRide };
    setCreateData(data);
    setRegCode('');
    setIsBusy(1);
    setColor('0');
    setLastUsed('');
    setTotalRide('');
  };
  console.log(color);

  return (
    <>
      <div className='form-container'>
        <div className='img'></div>
        <div className='form'>
          <h3>Enter scooter details</h3>
          <form>
            <select className='isAvailable' value={isBusy}>
              <option value='1'>Available</option>
              <option value='0'>Busy</option>
            </select>
            <br />
            <select
              value={color.value}
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
            <label>Last Used:</label>
            <input
              type='date'
              onChange={(e) => setLastUsed(e.target.value)}
              value={lastUsed}
            />
            <label>Total Ride(km):</label>
            <input
              className='ride'
              type='text'
              onChange={(e) => {
                setTotalRide(e.target.value);
              }}
              value={totalRide}
              placeholder='here...'
            />
            <button type='button' className='put' onClick={handleCreate}>
              New COLT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
