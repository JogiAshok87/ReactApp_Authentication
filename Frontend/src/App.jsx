import React,{Suspense,lazy} from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const Home  = lazy(()=>import('./Pages/Home'))
const Login = lazy(()=>import('./Pages/Login'))
const Register = lazy(()=>import('./Pages/Register'))

const App = () => {
  return (
   <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/register" element={<Register />}/>
      
    </Routes>
    </Suspense>
   </Router>
  )
}

export default App