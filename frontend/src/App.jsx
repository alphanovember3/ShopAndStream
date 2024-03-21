import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

// Components and Pages
import Header from './components/global/Header';
import HomePage from './Pages/HomePage';
import ProductDetails from './Pages/ProductDetails';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import Cart from './Pages/Cart';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentFailure from './Pages/PaymentFailure';

import ProtectedRoutes from './components/global/ProtectedRoutes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OttMoviePage from './Pages/OttMoviePage';
import MovieDetailPage from './Pages/MovieDetailPage';

// Scrolltop compoenent 
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])
  return null;
}

function App() {

  

  return (
    <div className='App'>
    <ScrollToTop />
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route 
          path='/profile' 
          element={
            <ProtectedRoutes>
              <UserProfile /> 
            </ProtectedRoutes>
          }
        />

        <Route 
          path='/cart' 
          element={
            <ProtectedRoutes>
              <Cart /> 
            </ProtectedRoutes>
          }
        />

        <Route path='/product/:id' element={<ProductDetails />} />

        <Route path='/success' element={<PaymentSuccess /> } />
        <Route path='/failure' element={<PaymentFailure /> } />

        <Route path='/ott' element={
          <ProtectedRoutes>
            <OttMoviePage />
          </ProtectedRoutes>
        }/>

        <Route path='/ott/:id' element={
          <ProtectedRoutes>
            <MovieDetailPage />
          </ProtectedRoutes>
          }/>
      </Routes>
    </div>
  )
}

export default App
