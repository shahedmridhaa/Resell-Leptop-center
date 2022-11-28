import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authcontext } from '../../../Authprovider/Authprovider'
import useAdmin from '../../../Hook/useAdmin'
import Loading from '../../Loading/Loading'

const Header = () => {

  const {user, userlogout} = useContext(authcontext)
  const [isRole] =  useAdmin(user?.email)
 



  const handleLogout =() =>{
        userlogout()
  }


  const menuItem = (
    <>
      <li>
        <Link className='rounded-lg hover:text-green-700' to="/">Home</Link>
      </li>
      <li>
      <Link className='rounded-lg hover:text-green-700' to="/dashbord">Dashbord</Link>
      </li>

      <li>
        <Link className='rounded-lg hover:text-green-700' to="/blog">Blog</Link>
      </li>
     

    </>
  )

  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItem}
            </ul>
          </div>

          <Link to='/' className="font-bold text-xl">
            LEPTOP CENTER
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItem}</ul>
        </div>
        <div className="navbar-end">
         {
          user?.email? 
          <>
          <Link to="/login" onClick={handleLogout} className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-none">Logout</Link>
          </>
          :
          <>
          <Link to="/login" className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-none">Login</Link>
          </>
         } 


          <label htmlFor="my-drawer-2" tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>


        </div>
      </div>
    </div>
  )
}

export default Header
