import React,{useState} from 'react'
import {Link,Navigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
const Register = () => {
      
  const [auth, setAuth] = useState(false);
  const [data,setData] = useState({
    name:"",
    email:"",
    password :"",
    confirmPassword:""
  });
  const [error, setError] = useState(null);

  const changeHandler = e =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)

    
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', data); 
      localStorage.setItem('token', response.data.token); 
      toast.success("User registered successfully", {
              position: "top-right",
              style: { width: "500px",display:"flex",gap:"10px",marginRight:"20px" }
            });
      setTimeout(()=>setAuth(true),5000)
    
    } catch (err) {
      
      setError(err.response?.data || 'Server Error');
    }
  };

  if (auth) {
    return(<Navigate to="/login" />) 
  }
  
  
  return (
    <div> <ToastContainer />
    <div className="register-form">
       
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          
          onChange={changeHandler}
          placeholder="Enter your name"
          required
        />
      </div>
      
      {/* Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name='email'
          onChange={changeHandler}
          placeholder="Enter your email"
          required
        />
      </div>
      
    
      {/* Password */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          name='password'
          onChange={changeHandler}
          placeholder="Enter your password"
          required
        />
      </div>
      
      {/* Confirm Password */}
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
    
          name='confirmPassword'
          onChange={changeHandler}
          placeholder="Confirm your password"
          required
        />
      </div>
      
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Register Button */}
      <button type="submit">Register</button>
    </form>

   
    <p>
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
  </div>
  </div>
  )
}

export default Register