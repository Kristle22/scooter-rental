import { useContext } from 'react';
import FrontContext from '../FrontContext';

function Filter() {
  const { setFilterColor, koltColors, color, setColor } =
    useContext(FrontContext);

  // const [selectColor, setSelectColor] = useState(0);

  const filtering = (e) => {
    setColor(e.target.value);
    setFilterColor(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={color}
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
