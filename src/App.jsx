import { useEffect, useState, useReducer } from 'react';
import './crud.css';
import KoltContext from './Components/KoltContext';
import ColorContext from './colors/ColorContext';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import koltsReducer from './Components/koltsReducer';
import Statistic from './Components/Statistic';
import axios from 'axios';
import Message from './Components/Message';

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');
  console.log('selectDate', selectDate);

  const [kolts, dispachKolts] = useReducer(koltsReducer, []);

  const [message, setMessage] = useState(null);

  const [koltColors, setKoltColors] = useState(null);
  const [createKoltColors, setCreateKoltColors] = useState(null);
  const [deleteKoltColors, setDeleteKoltKolors] = useState(null);

  const sort = (e) => {
    const sortOrder = e.target.value;
    setselectRide(sortOrder);
    setselectDate(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachKolts(action);
  };

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };
  // /////////////KOLTS//////////////
  // Read
  useEffect(() => {
    axios.get('http://localhost:3004/paspirtukai').then((res) => {
      const action = {
        type: 'kolts_list',
        payload: res.data,
      };
      dispachKolts(action);
    });
  }, [lastUpdate]);

  console.log('kolts', kolts);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3004/paspirtukai', createData).then((res) => {
      showMessage(res.data.msg);
      setLastUpdate(Date.now());
    });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3004/paspirtukai/' + deleteData.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3004/paspirtukai/' + editData.id, editData)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // /////////////KOLT COLOR//////////////READ
  useEffect(() => {
    axios.get('http://localhost:3004/spalvos').then((res) => {
      setKoltColors(res.data);
    });
  }, [lastUpdate]);

  // CREATE
  useEffect(() => {
    if (null === createKoltColors) return;
    axios
      .post('http://localhost:3004/spalvos', createKoltColors)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createKoltColors]);

  return (
    <KoltContext.Provider
      value={{
        kolts,
        setCreateData,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        selectDate,
        selectRide,
        sort,
        message,
        koltColors,
      }}
    >
      <ColorContext.Provider
        value={{
          koltColors,
          setCreateKoltColors: setCreateData,
          setDeleteKoltKolors: setDeleteData,
        }}
      >
        <div className='container'>
          <Create />
          <Statistic />
          <List />
        </div>
        <Edit />
        <Message />
      </ColorContext.Provider>
    </KoltContext.Provider>
  );
}

export default App;
