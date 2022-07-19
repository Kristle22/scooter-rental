import { useRef } from 'react';
import { useContext, useState } from 'react';
import rand from '../../../Functions/randNumbers';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateData, koltColors, color, setColor, showMessage } =
    useContext(BackContext);
  console.log('koltColors_create', koltColors);
  const [regCode, setRegCode] = useState('KO' + rand(100000, 999999));

  // const [color, setColor] = useState('0');
  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const showImage = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setImage(photo))
      .catch((_) => {
        showMessage({ text: 'failo pasirinkimas atsauktas!', type: 'danger' });
      });
  };

  const [isBusy, setIsBusy] = useState(1);
  const [lastUsed, setLastUsed] = useState('');
  const [totalRide, setTotalRide] = useState('');

  const [divColor, setDivColor] = useState();
  console.log('DIV COLOR', divColor);
  const changeColor = (e) => {
    setColor(e.target.value);
    const targetColor = koltColors.filter(
      (c) => c.id === Number(e.target.value)
    )[0].title;
    setDivColor(targetColor);
  };

  const handleCreate = () => {
    const data = {
      regCode,
      isBusy,
      lastUsed,
      totalRide,
      color: parseInt(color),
      photo: image,
    };
    setCreateData(data);
    setRegCode('');
    setIsBusy(1);
    setColor('0');
    setDivColor();
    setLastUsed('');
    setTotalRide('');
    setImage(null);
    fileInput.current.value = null;
  };
  console.log('color', color);
  return (
    <>
      <div className='form-container'>
        <div className='img'></div>
        <div className='form create'>
          <h3>Enter scooter details</h3>
          <form>
            <select className='isAvailable' value={isBusy}>
              <option value='1'>Available</option>
              <option value='0'>Busy</option>
            </select>
            <br />
            <select value={color} onChange={changeColor}>
              <option defaultValue='0'>Choose color</option>
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
            <div
              style={{
                backgroundColor: divColor,
                borderRadius: '20px',
                width: '20px',
                height: '20px',
              }}
            ></div>
            <label htmlFor='lu'>Last Used:</label>
            <input
              id='lu'
              type='datetime-local'
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
              placeholder='... km.'
            />
            <div>
              <label>Photo</label>
              <input ref={fileInput} type='file' onChange={showImage} />
              <small style={{ fontSize: '12px', float: 'left' }}>
                Upload Photo.
              </small>
            </div>
            {image ? (
              <div
                style={{
                  width: '90%',
                }}
              >
                <img
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                  src={image}
                  alt='scooter'
                />
              </div>
            ) : null}
            <div className='btns add'>
              <button type='button' className='put' onClick={handleCreate}>
                <svg className='put'>
                  <use href='#Add' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
