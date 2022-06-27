import getId from "./getId";
// import rand from './randNumbers';
// import getRandomFloat from './randomFloat';
// import randomDate from './randomDate';
const key = 'kolt'

export function create(obj) {
  let data = localStorage.getItem(key);
  if (null === data) {
    data = JSON.stringify([]);
  }
  data = JSON.parse(data);
  obj.id = getId(key + '_id');
  data.push(obj);
  data = JSON.stringify(data);
  localStorage.setItem(key, data);
}

export function read() {
  let data = localStorage.getItem(key);
  if (null === data) {
    data = JSON.stringify([]);
  }
  data = JSON.parse(data);
  return data;
}

export function remove({ id }) {
  let data = localStorage.getItem(key);
  if (null === data) {
    JSON.stringify([]);
  }
  data = JSON.parse(data);
  data = data.filter(obj => obj.id !== id)
  data = JSON.stringify(data);
  localStorage.setItem(key, data);
}

export function edit(obj) {
  let data = localStorage.getItem(key);
  if (null === data) {
    data = JSON.stringify([]);
  }
  data = JSON.parse(data);
  data = data.map(oldObject => oldObject.id !== obj.id ? oldObject : obj);
  data = JSON.stringify(data);
  localStorage.setItem(key, data);
}