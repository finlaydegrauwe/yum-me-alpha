import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

export const PrivateRoute = () => {
  const { user } = useAuth() // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/login" />;
}

// export function PrivateRoute({ component: Component, ...rest }) {
//   const { user } = useAuth()
 
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return user ? <Component {...props} /> : <Navigate to="/login" />
//       }}
//     ></Route>
//   )
// }