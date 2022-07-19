import { useEffect, useState, useReducer } from 'react';
import koltsReducer from './koltsReducer';
import FrontContext from './FrontContext';
// import Nav from './Nav';
import Crud from './Components/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [kolts, dispachKolts] = useReducer(koltsReducer, []);
  const [koltsMap, setKoltsMap] = useState(null);

  const [koltColors, setKoltColors] = useState(null);

  const [editData, setEditData] = useState(null);

  const [bookCreate, setBookCreate] = useState(null);
  const [bookModal, setBookModal] = useState(null);
  const [createDistance, setCreateDistance] = useState(null);
  const [distanceModal, setDistanceModal] = useState(null);

  const [selectDate, setselectDate] = useState('Last Used');
  const [selectRide, setselectRide] = useState('Total Ride');

  const [message, setMessage] = useState(null);

  const [createComment, setCreateComment] = useState(null);
  const [createRates, setCreateRates] = useState(null);

  const [color, setColor] = useState('0');

  const [users, setUsers] = useState(null);

  const [filterColor, setFilterColor] = useState(0);
  const [search, setSearch] = useState('');

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
    axios
      .get('http://localhost:3003/front/spalvos', authConfig())
      .then((res) => {
        setKoltColors(res.data);
      });
  }, [lastUpdate]);

  // Read FRONT kolts
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
      .get('http://localhost:3003/front/paspirtukai' + query, authConfig())
      .then((res) => {
        const koltsMap = new Map();
        res.data.forEach((klt) => {
          let comment;
          if (null === klt.com) {
            comment = null;
          } else {
            comment = { id: klt.com_id, com: klt.com };
          }
          if (koltsMap.has(klt.id)) {
            const kolt = koltsMap.get(klt.id);
            if (comment) {
              kolt.com.push(comment);
            }
          } else {
            koltsMap.set(klt.id, { ...klt });
            const kolt = koltsMap.get(klt.id);
            kolt.com = [];
            delete kolt.com_id;
            if (comment) {
              kolt.com.push(comment);
            }
          }
        });
        setKoltsMap(
          [...koltsMap].map((klt) => klt[1]).map((k, i) => ({ ...k, row: i }))
        );
        console.log('KOLTS MAP', koltsMap);

        const action = {
          type: 'kolts_list',
          payload: res.data,
        };
        dispachKolts(action);
      });
  }, [lastUpdate, filterColor, search]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    console.log('EDIT DATA', editData);
    axios
      .put(
        'http://localhost:/paspirtukai/' + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // Read FRONT rental info
  useEffect(() => {
    axios
      .get('http://localhost:3003/rezervacijos', authConfig())
      .then((res) => {
        console.log('USERS', res.data);
        setUsers(res.data);
      });
  }, [lastUpdate]);

  // CREATE rental Info
  useEffect(() => {
    if (null === bookCreate) return;
    console.log('BOOKCREATE', bookCreate);
    axios
      .post(
        'http://localhost:3003/front/rezervacijos',
        bookCreate,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [bookCreate]);

  // CREATE Comments
  useEffect(() => {
    if (null === createComment) return;
    axios
      .post(
        'http://localhost:3003/front/komentarai',
        createComment,
        authConfig()
      )
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
        'http://localhost:3003/front/reitingai/' + createRates.id,
        createRates,
        authConfig()
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
        'http://localhost:3003/front/atstumas/' + createDistance.userId,
        createDistance,
        authConfig()
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
        koltsMap,
        koltColors,
        color,
        setColor,
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
        setCreateComment,
        setCreateRates,
        users,
        showMessage,
        setFilterColor,
        setSearch,
      }}
    >
      <Crud />
    </FrontContext.Provider>
  );
}

export default Front;
