import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function CreateColors() {
  const { setCreateKoltColors } = useContext(BackContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateKoltColors(data);
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
              <svg className='put'>
                <use href='#Add' />
              </svg>
            </button>
          </form>
        </div>
        <div className='img2'></div>
      </div>
    </>
  );
}

export default CreateColors;
