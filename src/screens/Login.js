import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  let navigate = useNavigate()
  const [credentials , setCredentials ] = useState({
    email : "",
    password : "",
  })

  const OnClickSubmit = async(e)=>{
      
      e.preventDefault(e)

      const response = await fetch("http://localhost:8000/api/loginuser", {
          method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  email: credentials.email, password: credentials.password })

      }) 

      const json = await response.json()
  console.log(json);
  if (json.success) {
    localStorage.setItem('userEmail', credentials.email)
    localStorage.setItem('token', json.authToken)
    navigate("/")
  }else{
    alert("Enter Valid Credentials")
  }
}

  const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <div>
      <div className='container'>
      
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style = {{"border-radius": "25px;"}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
    
                    <form className="mx-1 mx-md-4" onSubmit={OnClickSubmit}>
    
                      
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        </div>
                      </div>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" value={credentials.password}  name='password' onChange={onChange} />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>
    

    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="m-3 mx-1 btn btn-primary ">Login</button>
                        <Link to="/signup" className="m-3 mx-1 btn btn-danger">Register</Link>
                      </div>
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    </div>
  )
}
