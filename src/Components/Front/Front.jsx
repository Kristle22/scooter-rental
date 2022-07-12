import { useEffect, useState, useReducer } from 'react';
import koltsReducer from './koltsReducer';
import FrontContext from './FrontContext';
// import Nav from './Nav';
import Crud from './Components/Crud';
import axios from 'axios';

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [kolts, dispachKolts] = useReducer(koltsReducer, []);
  const [koltColors, setKoltColors] = useState(null);

  // const [users, setUsers] = useState(null);
  const [editData, setEditData] = useState(null);

  const [bookCreate, setBookCreate] = useState(null);
  const [bookModal, setBookModal] = useState(null);
  const [distanceModal, setDistanceModal] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');

  const [message, setMessage] = useState(null);

  const [createComment, setCreateComment] = useState(null);

  const [createRates, setCreateRates] = useState(null);

  const [createDistance, setCreateDistance] = useState(null);

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

  // Read FRONT colors
  useEffect(() => {
    axios.get('http://localhost:3004/front/spalvos').then((res) => {
      setKoltColors(res.data);
    });
  }, [lastUpdate]);

  // Read FRONT kolts
  useEffect(() => {
    axios.get('http://localhost:3004/front/paspirtukai').then((res) => {
      const action = {
        type: 'kolts_list',
        payload: res.data,
      };
      dispachKolts(action);
    });
  }, [lastUpdate]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    console.log('EDITDATA', editData);
    axios
      .put('http://localhost:3004/paspirtukai/' + editData.id, editData)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // Read FRONT rental info
  // useEffect(() => {
  //   axios.get('http://localhost:3004/front/rezervacijos').then((res) => {
  //     console.log('USERS', res.data);
  //     setUsers(res.data);
  //   });
  // }, [lastUpdate]);

  // CREATE rental Info
  useEffect(() => {
    if (null === bookCreate) return;
    console.log('BOOKCREATE', bookCreate);
    axios
      .post('http://localhost:3004/front/rezervacijos', bookCreate)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [bookCreate]);

  // CREATE Comments
  useEffect(() => {
    if (null === createComment) return;
    axios
      .post('http://localhost:3004/front/komentarai', createComment)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('CREATE comment', res.data);
        setLastUpdate(Date.now());
      });
  }, [createComment]);

  // CREATE RATING
  useEffect(() => {
    if (null === createRates) return;
    axios
      .put(
        'http://localhost:3004/front/reitingai/' + createRates.id,
        createRates
      )
      .then((res) => {
        console.log('RATE', res.data);
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createRates]);

  // CREATE DISTANCE
  useEffect(() => {
    if (null === createDistance) return;
    axios
      .put(
        'http://localhost:3004/front/atstumas/' + createDistance.id,
        createDistance
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createDistance]);

  return (
    <FrontContext.Provider
      value={{
        kolts,
        koltColors,
        setBookCreate,
        bookModal,
        setBookModal,
        setCreateDistance,
        distanceModal,
        setDistanceModal,
        setEditData,
        selectDate,
        selectRide,
        sort,
        message,
        // users,
        setCreateComment,
        setCreateRates,
      }}
    >
      <Crud />
    </FrontContext.Provider>
  );
}

export default Front;
