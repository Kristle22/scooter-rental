import { useContext, useState } from 'react';
import FrontContext from '../FrontContext';
import BookCreate from './BookCreate';

function Kolt({ kolt }) {
  const { setBookModal, setCreateComment, setCreateRates } =
    useContext(FrontContext);

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('5');

  const handleModal = () => {
    setBookModal({
      koltId: kolt.id,
      koltColor: kolt.color,
      koltCode: kolt.regCode,
      koltIsBusy: kolt.isBusy,
    });
  };

  const handleBookChange = () => {};

  const handleComment = () => {
    setCreateComment({
      comment,
      koltId: kolt.id,
    });
    setComment('');
  };
  const rateNow = (e) => {
    setRate(e.target.value);
    setCreateRates({ rate: parseInt(e.target.value), id: kolt.id });
  };

  return (
    <>
      <div className='comment'>
        <div
          className='flex-row color'
          style={{
            diplay: 'flex',
            width: '98%',
            justifyContent: 'space-between',
          }}
        >
          <h4>COLT Reg. Code</h4>
          <h4>COLT Image</h4>
          <h4>COLT Color</h4>
          {kolt.isBusy === 1 ? (
            <h4>AVAILABLE</h4>
          ) : (
            <p>FINISH the TRIP and ENTER the DISTANCE</p>
          )}
        </div>
        <div
          className='flex-row color'
          style={{
            width: '95%',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            margin: '15px 0 0 5px',
          }}
        >
          <p
            style={{
              color: '#99bbd7d1',
              fontSize: '30px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
              alignSelf: 'center',
              border: 'none',
            }}
          >
            {kolt.regCode}
          </p>
          {kolt.img ? (
            <img
              style={{ width: '16%', borderRadius: '5px' }}
              src={require(`../../../img/${kolt.color}.png`)}
              alt='scooter_image'
            />
          ) : (
            <img
              style={{ width: '16%', borderRadius: '5px' }}
              src={require('../../../img/Envy-Colt2.png')}
              alt='scooter'
            />
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className='colors'
              style={{
                width: '70px',
                height: '70px',
                lineHeight: '70px',
                backgroundColor: kolt.color,
                color: kolt.color === 'white' ? 'black' : 'white',
                boxShadow: `2px 3px 20px ${kolt.color ? kolt.color : '#999'} `,
              }}
            >
              {kolt.color ? kolt.color : 'random'}
            </div>
          </div>
          {kolt.isBusy === 1 ? (
            <div className='btns book'>
              <button
                style={{ paddingTop: '15px' }}
                type='button'
                className='edt book'
                onClick={handleModal}
              >
                BOOK IT!
              </button>
            </div>
          ) : (
            <div className='btns book'>
              <button
                type='button'
                className='dlt book'
                onClick={handleBookChange}
              >
                <svg>
                  <use href='#book-edt' />
                </svg>
              </button>
            </div>
          )}
        </div>
        <h2
          style={{
            flexDirection: 'row',
            margin: '20px',
            fontFamily: 'cursive',
          }}
        >
          Comments ({kolt.com_count})
        </h2>
        <h2 style={{ marginBottom: '20px' }}>
          {kolt.com_count ? null : (
            <div className='comment'>
              No feedback yet. Be the first to comment on this scooter!
            </div>
          )}
        </h2>
        {kolt.isBusy === 1 ? (
          <div
            style={{
              fontSize: '16px',
              textAlign: 'left',
              fontStyle: 'italic',
              paddingLeft: '20px',
            }}
          >
            Last Used: {new Date(kolt.lastUsed).toLocaleString()}
          </div>
        ) : (
          <p className='isBusy' style={{ width: '150px', padding: '5px' }}>
            BUSY NOW!
          </p>
        )}
        <ul>
          {kolt.coms &&
            kolt.coms
              .slice(0, -5)
              .split('-^-^-,')
              .map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <div className='feedback'>
          <form className='com'>
            <label>Leave a Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write your comment here...'
            ></textarea>
            <button className='put' onClick={handleComment}>
              <svg className='put'>
                <use href='#post' />
              </svg>
            </button>
          </form>
          <form>
            <div className='rateIt'>
              <img src={require('../../../img/rate-us.png')} alt='rate us' />
              <select value={rate} onChange={rateNow}>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={10 - i}>
                    {10 - i} *
                  </option>
                ))}
              </select>
            </div>
            <h1>
              <b>
                <svg>
                  <use href='#rating' />
                </svg>
              </b>
              {kolt.rate_sum ? (kolt.rate_sum / kolt.rates).toFixed(2) : '0.00'}
            </h1>
          </form>
        </div>
      </div>
      <BookCreate />
    </>
  );
}

export default Kolt;
