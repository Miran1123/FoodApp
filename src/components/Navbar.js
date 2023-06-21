import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../screens/Cart';


//import ShoppingCartIcon from "react-bootstrap/ShoppingCart";
import { useCart } from './ContextReducer';


export default function NavBar(props) {


  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }
    const items = useCart();
  return (
    <div>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
  <div className="container-fluid">
   <Link className="navbar-brand fs-2 fst-italic" to="/">FoodApp</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav me-auto mb-2">
       <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
       {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
      </div>
      {(!localStorage.getItem("token")) ?
      <div className='d-flex'>
      <Link className="nav-link bt bg-white text-primary mx-1" to="/login">Login</Link>
       <Link className="nav-link bt bg-white text-primary mx-1" to="/signup">Sign Up</Link>
      </div>
      :
      <div>

           <div className="btn bg-white text-primary mx-2 " onClick={()=>setCartView(true)}>
           Cart
           <Badge pill bg='danger'  >{items.length}
            </Badge>
            </div>
            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}

           <button onClick={handleLogout}  className="btn bg-white text-danger" >Logout</button></div> 
      }
    </div>
  </div>
</nav>
</div>
    </div>
  )
}
