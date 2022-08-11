import { useContext } from 'react';
import Kolt from './Kolt';
import FrontContext from '../FrontContext';
// import SortBtns from './SortBtns';
import Filter from './Filter';
import Search from './Search';

function KoltList() {
  const { kolts, users } = useContext(FrontContext);
  console.log(users);
  return (
    <>
      <div>
        <div className='heading'>
          <h2 style={{ fontFamily: 'cursive', fontSize: '30px' }}>
            Manage your trip online:
          </h2>
        </div>
        <div className='flex-card front'>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'end',
            }}
          >
            <h2
              style={{
                width: '230px',
                fontFamily: 'cursive',
              }}
            >
              Find your Colt to insert the distance traveled:
            </h2>
            <Search />
            <Filter />
          </div>
          <div className='flex-row'>{/* <SortBtns /> */}</div>
          {kolts.map((klt) => klt.isBusy === 1 || klt.status === 1 ?
            <Kolt key={klt.id} kolt={klt} /> : null
          )}
        </div>
      </div>
    </>
  );
}

export default KoltList;
