import { useContext } from 'react';
import Kolt from './Kolt';
import FrontContext from '../FrontContext';
import SortBtns from './SortBtns';
// import Feedback from './Feedback';

function KoltList() {
  const { kolts } = useContext(FrontContext);

  return (
    <>
      <div className='heading'>
        <h2 style={{ fontFamily: 'cursive', fontSize: '30px' }}>
          Manage your trip online:
        </h2>
      </div>
      <div className='flex-card front'>
        <div className='flex-row'>
          {/* <h4>Reg. Code</h4>
          <h4>Ready to use</h4> */}
          <SortBtns />
        </div>
        {kolts.map((klt) => (
          <Kolt key={klt.id} kolt={klt} />
        ))}
      </div>
    </>
  );
}

export default KoltList;
