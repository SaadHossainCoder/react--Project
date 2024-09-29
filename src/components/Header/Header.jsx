// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function header() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authStatus = useSelector((state) => state.auth.status)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },              
    ]
  
  return (
<header className='py-3 bg-gray-500 shadow'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link to='/'>
              <Logo width='70px'   />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default header
