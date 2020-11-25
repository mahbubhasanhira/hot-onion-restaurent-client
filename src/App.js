import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Components/Common/Header/Header';
import Home from './Components/Home/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import FoodDetail from './Components/FoodDetail/FoodDetail/FoodDetail';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Review from './Components/Dashboard/Customer/Review/Review/Review';
import MyOrder from './Components/Dashboard/Customer/MyOrder/MyOrder/MyOrder';
import OrderList from './Components/Dashboard/Admin/OrderList/OrderList/OrderList';
import AddFood from './Components/Dashboard/Admin/AddFood/AddFood/AddFood';
import MakeAdmin from './Components/Dashboard/Admin/MakeAdmin/MakeAdmin/MakeAdmin';
import CheckOut from './Components/Dashboard/Customer/Checkout/CheckOut/CheckOut';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [allFood, setAllFood] = useState([])

useEffect(() =>{
  const newLoggedInUser = JSON.parse(sessionStorage.getItem('userInfo'));
        if(newLoggedInUser){
            if(newLoggedInUser.email){
              fetch(`https://hot-onion-101.herokuapp.com/isAdmin?email=${newLoggedInUser.email}`)
              .then(res => res.json())
              .then(data => {
                if(data){
                  setIsAdmin(data);
                };
              });
            };
            setLoggedInUser(newLoggedInUser);
        };
  const newCart = JSON.parse(sessionStorage.getItem('cart'));
        if(newCart){
            setCart(newCart);
        }
},[loggedInUser.email]);

  return (
     <UserContext.Provider value={{loggedInUser, setLoggedInUser, isAdmin, cart, setCart, allFood, setAllFood}}>
        <main className="App">
          <Router>
            <Header/>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route path='/login'>
                <Login/>
              </Route>

              {/*loggedInUser and also Admin can access this route */}
              <PrivateRoute path='/dashboard/checkout'>
                {cart.length > 0 ? <CheckOut/> : <Notfound/>}
              </PrivateRoute>
              <PrivateRoute path='/dashboard/myOrder'>
                <MyOrder/>
              </PrivateRoute>
              <PrivateRoute path='/dashboard/review'>
                <Review/>
              </PrivateRoute>

              {/* Only Admin can access this route */}
              <PrivateRoute path='/admin/orderList'>
              {isAdmin ? <OrderList/> : <Notfound/>}
              </PrivateRoute>
              <PrivateRoute path='/admin/addFood'>
                {isAdmin ? <AddFood/> : <Notfound/>}
              </PrivateRoute>
              <PrivateRoute path='/admin/makeAdmin'>
               {isAdmin ? <MakeAdmin/>: <Notfound/>}
              </PrivateRoute>

              <Route path='/:category/:foodId'>
                <FoodDetail/>
              </Route>
              <Route path="*">
                <Notfound/>
              </Route>
            </Switch>
          </Router>
      </main>
     </UserContext.Provider>
  );
}

export default App;
