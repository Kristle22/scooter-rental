import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './crud.css';
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Front />} />
        <Route path='/admin' element={<Back show='admin' />} />
        <Route path='admin/colors' element={<Back show='colors' />} />
        <Route path='/admin/kolts' element={<Back show='kolts' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
