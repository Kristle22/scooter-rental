import { useState, useEffect, useContext } from 'react';
import FrontContext from '../FrontContext';

function BookCreate({ kolt }) {
  const {
    bookModal,
    setBookModal,
    setBookCreate,
    setEditData,
    koltColors,
    setColor,
    color,
    showMessage,
  } = useContext(FrontContext);

  const [pickUpDate, setPickUpDate] = useState(0);
  const [returnDate, setReturnDate] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (null === bookModal) {
      return;
    }
    setColor(
      koltColors.filter((c) => bookModal.koltColor === c.title)[0]?.id ?? null
    );
    setPickUpDate('');
    setReturnDate('');
    setName('');
    setEmail('');
    setComments('');
  }, [bookModal, setColor, koltColors]);

  // console.log('DATA', bookModal);

  const handleReserve = () => {
    if (pickUpDate === 0 || name === '' || email === '') {
      showMessage({
        text: 'Prasau uzpildykite privalomus laukelius',
        type: 'info',
      });
      return;
    }
    const data = {
      id: bookModal.id,
      regCode: bookModal.regCode,
      koltColor: bookModal.koltColor,
      color,
      isBusy: 0,
      pickUpDate,
      returnDate,
      name,
      email,
      comments,
    };
    // console.log('FRONT COLOR', color);
    setEditData(data);
    setBookCreate(data);
    setBookModal(null);
  };
  if (null === bookModal) {
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
              onClick={() => setBookModal(null)}
            >
              &times;
            </button>
            <form className='reg'>
              <div className='regInfo'>
                <span className='lastUsed reg'>
                  Registration Code: {bookModal.regCode}
                </span>
                <h4
                  className='isAvailable reg'
                  style={{ width: 'fit-content' }}
                >
                  {bookModal.koltColor ? bookModal.koltColor : 'random color'}
                </h4>
              </div>
              <label>PICK UP*:</label>
              <input
                type='datetime-local'
                value={pickUpDate}
                onChange={(e) => setPickUpDate(e.target.value)}
              />
              <label>RETURN:</label>
              <input
                type='datetime-local'
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              <label>NAME*:</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name here...'
              />
              <label>E-MAIL*:</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email...'
              />
              <label>COMMENTS</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder='Write your comment here...'
              ></textarea>
              <div className='btns reg'>
                <i style={{ fontSize: '16px' }}>*required fields</i>
                <button
                  type='button'
                  className='close reg'
                  onClick={() => setBookModal(null)}
                >
                  EXIT
                </button>
                <button
                  type='button'
                  className='put reg'
                  onClick={handleReserve}
                >
                  BOOK NOW!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCreate;
