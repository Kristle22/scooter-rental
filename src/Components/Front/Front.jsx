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

  const [users, setUsers] = useState(null);

  const [bookCreate, setBookCreate] = useState(null);
  const [bookModal, setBookModal] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');

  const [message, setMessage] = useState(null);

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
      console.log('resData', res.data);
    });
  }, [lastUpdate]);
  console.log('FRONT Colors', koltColors);

  // Read FRONT kolts
  useEffect(() => {
    axios.get('http://localhost:3004/front/paspirtukai').then((res) => {
      console.log(res.data);
      const action = {
        type: 'kolts_list',
        payload: res.data,
      };
      dispachKolts(action);
    });
  }, [lastUpdate]);

  console.log('kolts', kolts);

  // Read FRONT rental info
  useEffect(() => {
    axios.get('http://localhost:3004/front/rezervacijos').then((res) => {
      console.log('USERS', res.data);
      setUsers(res.data);
    });
  }, [lastUpdate]);

  // CREATE rental Info
  useEffect(() => {
    if (null === bookCreate) return;
    axios
      .post('http://localhost:3004/front/rezervacijos', bookCreate)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('CREATE data', res.data);
        setLastUpdate(Date.now());
      });
  }, [bookCreate]);

  return (
    <FrontContext.Provider
      value={{
        kolts,
        koltColors,
        setBookCreate,
        bookModal,
        setBookModal,
        // setEditData,
        selectDate,
        selectRide,
        sort,
        message,
        users,
      }}
    >
      <Crud />
    </FrontContext.Provider>
  );
}

export default Front;
