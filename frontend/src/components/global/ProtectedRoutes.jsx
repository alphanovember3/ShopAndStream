import React, { Children } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate , useLocation } from 'react-router-dom';


function ProtectedRoutes({children}) {

  const { userInfo } = useSelector((state) => state.auth);
  let location = useLocation();

  if(!userInfo){
    return <Navigate to='/login' state={{ from : location}} replace/>
  }

  return children;
}

export default ProtectedRoutes
