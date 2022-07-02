import Color from './Color';
import { useContext } from 'react';
import BackContext from '../BackContext';

function ColorList() {
  const { koltColors } = useContext(BackContext);
  return (
    <>
      <div className='heading' style={{ margin: '30px 0 0 0' }}>
        <h2>Color List of current scooters</h2>
      </div>
      <div className='flex-card'>
        <div
          className='flex-row color'
          style={{
            diplay: 'flex',
            width: '85%',
            justifyContent: 'space-between',
          }}
        >
          <h4>COLT Image</h4>
          <h4>COLT Color</h4>
          <h4>COLT's Count</h4>
          <h4>BUSY</h4>
          <h4> READY to use</h4>
        </div>
        {koltColors
          ? koltColors.map((clr) => <Color key={clr.id} color={clr} />)
          : null}
      </div>
    </>
  );
}

export default ColorList;
