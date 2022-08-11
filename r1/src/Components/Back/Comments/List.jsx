import { useContext } from 'react';
import Com from './Com';
import BackContext from '../BackContext';

function List() {
  const { comments } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>COMMENTS</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row' style={{ width: '100%' }}>
          <h4>Colt Image</h4>
          <h4>Reg. Code</h4>
          <option value=''></option>
        </div>
        {comments ? comments.map((com) => <Com key={com.id} row={com} />) : null}
      </div>
    </>
  );
}

export default List;
