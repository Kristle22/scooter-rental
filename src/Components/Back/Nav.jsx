import { NavLink } from 'react-router-dom';
import Message from './Message';

function Nav() {
  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/admin/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Admin
        </NavLink>
        <NavLink
          to='/admin/colors'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Colt features
        </NavLink>
        <NavLink
          to='/admin/kolts'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          COLTS
        </NavLink>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
