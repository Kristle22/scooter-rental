import Color from './Color';
import { useContext } from 'react';
import FrontContext from '../FrontContext';

function ColorList() {
  const { koltColors } = useContext(FrontContext);
  return (
    <>
      <div className='heading' style={{ margin: '30px 0 0 0' }}>
        <h2 style={{ fontSize: '30px' }}>Manage your trip online!</h2>
      </div>
      <div className='flex-card'>
        {/* <div
          className='flex-row color fixed'
          style={{
            diplay: 'flex',
            width: '80%',
            justifyContent: 'space-between',
          }}
        >
          <h4>COLT Image</h4>
          <h4>COLT Color</h4>
          <h4>COLT's Count</h4>
          <h4>BUSY</h4>
          <h4>AVAILABLE</h4>
        </div> */}
        {koltColors
          ? koltColors.map((clr) => <Color key={clr.id} color={clr} />)
          : null}
      </div>
    </>
  );
}

export default ColorList;
