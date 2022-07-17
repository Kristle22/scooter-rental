import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Filter() {
  const { setFilterColor, koltColors } = useContext(BackContext);

  const [selectColor, setSelectColor] = useState(0);

  const filtering = (e) => {
    setSelectColor(e.target.value);
    setFilterColor(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={selectColor}
        onChange={filtering}
        style={{ width: '160px' }}
      >
        <option value='random_colors'>Filter by Color</option>
        {koltColors &&
          koltColors.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
      </select>
    </>
  );
}

export default Filter;
