import { Link, NavLink } from 'react-router-dom';
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
          Colts' status
        </NavLink>
        <NavLink
          to='/admin/kolts'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          COLTS
        </NavLink>
        <NavLink
          to='/admin/rezervations'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Rezervations
        </NavLink>
        <NavLink
          to='/admin/comments'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Comments
        </NavLink>
        <NavLink
          to='/admin/fancy-com'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Fancy Com
        </NavLink>
        <Link
          to='/logout'
          style={{ width: '14%', textDecoration: 'underline' }}
        >
          Logout
        </Link>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
