import { useContext, useState } from 'react';
import ColorContext from './ColorContext';

function CreateColors() {
  const { setCreateData } = useContext(ColorContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateData(data);
    setTitle('');
  };
  return (
    <>
      <div className='form-container'>
        <div className='form'>
          <h3>Insert COLT's Color</h3>
          <form>
            <label>Title</label>
            <input
              className='color'
              type='text'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder='new scooters color here...'
            />
            <button type='button' className='put' onClick={handleCreate}>
              New COLOR
            </button>
          </form>
        </div>
        <div className='img2'></div>
      </div>
    </>
  );
}

export default CreateColors;
