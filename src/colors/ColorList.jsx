import Color from './Color';
import { useContext } from 'react';
import ColorContext from './ColorContext';

function ColorList() {
  const { koltColors } = useContext(ColorContext);
  return <></>;
}

export default ColorList;
