import { useContext, useState } from 'react';
import ColorContext from './ColorContext';

function CreateColors() {
  const { setCreateData } = useContext(ColorContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateData(data);
    setTitle('');
  };
  return <></>;
}

export default CreateColors;
