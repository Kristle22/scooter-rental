import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Search() {
  const { setSearch } = useContext(BackContext);

  const [s, setS] = useState('');

  const searching = (e) => {
    setS(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        className='search'
        plaseholder='searching...'
        style={{ width: '210px' }}
      >
        <input
          type='text'
          placeholder='Search by Reg. Code...'
          value={s}
          onChange={searching}
        />
      </div>
    </>
  );
}

export default Search;
