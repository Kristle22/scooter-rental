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
      <div
        className='flex-card'
        style={{
          diplay: 'flex',
          width: '90%',
          paddingRight: '20px',
          justifyContent: 'space-between',
        }}
      >
        <div className='flex-row color' style={{ width: '90%' }}>
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
