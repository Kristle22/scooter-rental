import { useContext } from 'react';
import Kolt from './Kolt';
import BackContext from '../BackContext';
import SortBtns from './SortBtns';

function List() {
  const { kolts } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>ADMIN COLT SCOOTER RENTAL</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row' style={{ width: '88%' }}>
          <h4>Colt Image</h4>
          <h4>Reg. Code</h4>
          <h4>Ready to use</h4>
          <SortBtns />
          <option value=''></option>
        </div>
        {kolts ? kolts.map((klt) => <Kolt key={klt.id} kolt={klt} />) : null}
      </div>
    </>
  );
}

export default List;
