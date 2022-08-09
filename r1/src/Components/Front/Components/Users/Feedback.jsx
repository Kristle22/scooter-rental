import { useContext } from 'react';
import FrontContext from '../../FrontContext';

function Feedback({ kolt }) {
  const { setFbModal } = useContext(FrontContext);
  const handleModal = () => {
    setFbModal(kolt);
  };
  return (
    <div className='busy_btns'>
      <p className='isBusy'>Busy</p>
      <div className='btns book'>
        <button type='button' className='edt book com' onClick={handleModal}>
          FEED-BACK!
        </button>
      </div>
    </div>
  );
}

export default Feedback;
