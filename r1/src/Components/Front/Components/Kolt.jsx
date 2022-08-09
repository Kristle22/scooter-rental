import { useContext, useState } from 'react';
import FrontContext from '../FrontContext';
import BookCreate from './BookCreate';
import DistanceRecord from './DistanceRecord';

function Kolt({ kolt }) {
  const {
    setBookModal,
    setDistanceModal,
    setCreateComment,
    setCreateRates,
    users,
  } = useContext(FrontContext);

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('5');

  const handleModal = () => {
    setBookModal({
      id: kolt.id,
      koltColor: kolt.koltColor,
      regCode: kolt.regCode,
      isBusy: kolt.isBusy,
    });
  };

  const handleDistance = () => {
    const userId = users.filter((u) => u.kolt_id === kolt.id)[0].id;

    const returnPrimary = users.filter((u) => u.kolt_id === kolt.id)[0]
      .return_date;
    setDistanceModal({
      userId: userId,
      returnDate: returnPrimary,
      id: kolt.id,
      koltColor: kolt.koltColor,
      regCode: kolt.regCode,
      isBusy: kolt.isBusy,
    });
  };

  const handleComment = () => {
    setCreateComment({
      comment,
      id: kolt.id,
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
          {kolt.isBusy === 1 ? <h4>AVAILABLE</h4> : <p>FINISH your TRIP?</p>}
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
          {kolt.koltImg ? (
            <img
              style={{
                width: '16%',
                maxHeight: '120px',
                objectFit: 'contain',
                borderRadius: '5px',
              }}
              src={kolt.koltImg}
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
                backgroundColor: kolt.koltColor,
                color: kolt.koltColor === 'white' ? 'black' : 'white',
                boxShadow: `2px 3px 20px ${kolt.koltColor ? kolt.koltColor : '#999'
                  } `,
              }}
            >
              {kolt.koltColor ? kolt.koltColor : 'random'}
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
                onClick={handleDistance}
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
      <DistanceRecord />
    </>
  );
}

export default Kolt;
