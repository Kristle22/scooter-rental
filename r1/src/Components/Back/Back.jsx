import { useEffect, useState, useReducer } from 'react';
import koltsReducer from './koltsReducer';
import BackContext from './BackContext';
import Nav from './Nav';
import ColorsCrud from './Colors/Crud';
import KoltsCrud from './Kolts/Crud';
import RezervationsCrud from './Rezervations/Crud';
import CommentsCrud from './Comments/Crud';
import FancyComCrud from './FancyCom/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createData, setCreateData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');
  const [filterColor, setFilterColor] = useState(0);
  const [search, setSearch] = useState('');

  const [kolts, dispachKolts] = useReducer(koltsReducer, []);

  const [message, setMessage] = useState(null);

  const [koltColors, setKoltColors] = useState(null);
  const [createKoltColors, setCreateKoltColors] = useState(null);
  const [deleteKoltColors, setDeleteKoltColors] = useState(null);

  const [users, setUsers] = useState(null);

  const [color, setColor] = useState(null);

  const [deletePhoto, setDeletePhoto] = useState(null);

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
    let query;
    if (filterColor === 0 && !search) {
      query = '';
    } else if (filterColor) {
      query = '?color-id=' + filterColor;
    } else if (search) {
      query = '?s=' + search;
    }

    axios
      .get('http://localhost:3003/paspirtukai' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'kolts_list',
          payload: res.data,
        };
        dispachKolts(action);
      });
  }, [lastUpdate, filterColor, search]);

  // console.log('kolts', kolts);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/paspirtukai', createData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        console.log('Message', res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete(
        'http://localhost:3003/paspirtukai/' + deleteData.id,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Delete Photo
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete('http://localhost:3003/nuotrauka/' + deletePhoto.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deletePhoto]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    console.log(editData);
    axios
      .put(
        'http://localhost:3003/paspirtukai/' + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // /////////////KOLT COLOR/////////////
  // READ
  useEffect(() => {
    axios.get('http://localhost:3003/spalvos', authConfig()).then((res) => {
      setKoltColors(res.data);
    });
  }, [lastUpdate]);

  // CREATE
  useEffect(() => {
    if (null === createKoltColors) return;
    axios
      .post('http://localhost:3003/spalvos', createKoltColors, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createKoltColors]);

  // DELETE
  useEffect(() => {
    if (null === deleteKoltColors) return;
    axios
      .delete(
        'http://localhost:3003/spalvos/' + deleteKoltColors.id,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteKoltColors]);

  // DELETE COMMENT
  const handleDeleteComment = (id) => {
    axios
      .delete('http://localhost:3003/komentarai/' + id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  };

  // Read FRONT rental info
  useEffect(() => {
    let query;
    if (!search) {
      query = '';
    } else {
      query = '?s=' + search;
    }
    axios
      .get('http://localhost:3003/rezervacijos' + query, authConfig())
      .then((res) => {
        console.log('USERS', res.data);
        setUsers(res.data);
      });
  }, [lastUpdate, search]);

  return (
    <BackContext.Provider
      value={{
        kolts,
        setCreateData,
        color,
        setColor,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        selectDate,
        selectRide,
        sort,
        filterColor,
        setFilterColor,
        setSearch,
        message,
        koltColors,
        setCreateKoltColors,
        setDeleteKoltColors,
        handleDeleteComment,
        users,
        setDeletePhoto,
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
      ) : show === 'rezervations' ? (
        <RezervationsCrud />
      ) : show === 'comments' ? (
        <CommentsCrud />
      ) : show === 'fancy-com' ? (
        <FancyComCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
