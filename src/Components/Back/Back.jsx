import { useEffect, useState, useReducer } from 'react';
import koltsReducer from './koltsReducer';
import BackContext from './BackContext';
import Nav from './Nav';
import ColorsCrud from './Colors/Crud';
import KoltsCrud from './Kolts/Crud';
import axios from 'axios';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');

  const [kolts, dispachKolts] = useReducer(koltsReducer, []);

  const [message, setMessage] = useState(null);

  const [koltColors, setKoltColors] = useState(null);
  const [createKoltColors, setCreateKoltColors] = useState(null);
  const [deleteKoltColors, setDeleteKoltColors] = useState(null);

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
      console.log('Message', res.data.msg);
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

  // /////////////KOLT COLOR//////////////
  // READ
  useEffect(() => {
    axios.get('http://localhost:3004/spalvos').then((res) => {
      setKoltColors(res.data);
    });
  }, [lastUpdate]);
  console.log('kolt Colors', koltColors);

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

  // DELETE
  useEffect(() => {
    if (null === deleteKoltColors) return;
    axios
      .delete('http://localhost:3004/spalvos/' + deleteKoltColors.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteKoltColors]);

  return (
    <BackContext.Provider
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
        setCreateKoltColors,
        setDeleteKoltColors,
      }}
    >
      {show === 'admin' ? (
        <>
          <div className='container'>
            <Nav />
            <h2>BACK_OFFICE</h2>
          </div>
        </>
      ) : show === 'colors' ? (
        <ColorsCrud />
      ) : show === 'kolts' ? (
        <KoltsCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
