import { useContext } from 'react';
import BackContext from '../BackContext';

function SortBtns() {
  const { selectDate, selectRide, sort } = useContext(BackContext);

  return (
    <>
      <select
        className='sorting'
        defaultValue='last_used'
        value={selectDate}
        onChange={sort}
      >
        <option value='last_used'>Last Used</option>
        <option value='sort_date_asc'>sort 0 - 9</option>
        <option value='sort_date_desc'>sort 9-0</option>
        <option value='default'>default</option>
      </select>
      <select className='sorting' value={selectRide} onChange={sort}>
        <option defaultValue='total_ride'>Total Ride</option>
        <option value='sort_km_asc'>sort 0 - 9</option>
        <option value='sort_km_desc'>sort 9-0</option>
        <option value='default'>default</option>
      </select>
    </>
  );
}

export default SortBtns;
