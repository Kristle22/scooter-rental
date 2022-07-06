import { useContext } from 'react';
import FrontContext from '../../FrontContext';

function BookNow({ user }) {
  const { setBookModal } = useContext(FrontContext);

  const handleModal = () => {
    setBookModal(user);
  };
  // console.log('kolt', kolt);
  return (
    <div className='ready_btns'>
      {/* <p className='isAvailable'>Available</p> */}
      <div className='btns book'>
        <button type='button' className='edt book' onClick={handleModal}>
          BOOK IT!
        </button>
      </div>
    </div>
  );
}

export default BookNow;
