import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import BottomToTopBtn from "./Components/Common/BottomToTopBtn/BottomToTopBtn";
import Header from "./Components/Common/Header/Header";
import AddFood from "./Components/Dashboard/Admin/AddFood/AddFood/AddFood";
import MakeAdmin from "./Components/Dashboard/Admin/MakeAdmin/MakeAdmin/MakeAdmin";
import OrderList from "./Components/Dashboard/Admin/OrderList/OrderList/OrderList";
import CheckOut from "./Components/Dashboard/Customer/Checkout/CheckOut/CheckOut";
import MyOrder from "./Components/Dashboard/Customer/MyOrder/MyOrder/MyOrder";
import Review from "./Components/Dashboard/Customer/Review/Review/Review";
import FoodDetail from "./Components/FoodDetail/FoodDetail/FoodDetail";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
	const [loggedInUser, setLoggedInUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);
	const [allFood, setAllFood] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [orderListSort, setOrderListSort] = useState([]);
	const [sortStatusForOrderList, setSortStatusForOrderList] = useState("All");
	const [myOrderLists, setMyOrderLists] = useState([]);
	const [myOrderSort, setMyOrderSort] = useState([]);
	const [sortStatusForMyOrder, setSortStatusForMyOrder] = useState("All");

	useEffect(() => {
		const newLoggedInUser = JSON.parse(localStorage.getItem("userInfo"));
		if (newLoggedInUser) {
			if (newLoggedInUser.email) {
				fetch(
					`https://hot-onion-101.herokuapp.com/isAdmin?email=${newLoggedInUser.email}`
				)
					.then((res) => res.json())
					.then((data) => {
						if (data) {
							setIsAdmin(data);
						}
					});
			}
			setLoggedInUser(newLoggedInUser);
		}
		const newCart = JSON.parse(localStorage.getItem("cart"));
		if (newCart) {
			setCart(newCart);
		}
	}, [loggedInUser.email]);

	useEffect(() => {
		const newSortStatusOrder = localStorage.getItem("orderListSortStatus");
		const newSortStatusMyOrder = localStorage.getItem("myOrderListSortStatus");
		if (newSortStatusOrder) {
			setSortStatusForOrderList(newSortStatusOrder);
		}
		if (newSortStatusMyOrder) {
			setSortStatusForMyOrder(newSortStatusMyOrder);
		}
	}, []);

	const handleSetStateForSort = (
		defaultStateValue,
		stateName,
		statusOfSort,
		filterStateValue
	) => {
		if (filterStateValue.length > 0) {
			stateName(filterStateValue);
		}
		if (filterStateValue.length === 0 && statusOfSort === "All") {
			stateName(defaultStateValue);
		}
	};

	const handleSortList = (
		defaultArr,
		stateName,
		newSortStatus,
		stateForSet
	) => {
		if (defaultArr.length) {
			const filterProduct = defaultArr.filter(
				(my_order) => my_order.status === newSortStatus
			);
			if (stateForSet.myOrder) {
				handleSetStateForSort(
					defaultArr,
					stateName,
					newSortStatus,
					filterProduct
				);
			}

			if (stateForSet.orderList) {
				handleSetStateForSort(
					defaultArr,
					stateName,
					newSortStatus,
					filterProduct
				);
			}
		}
	};

	return (
		<UserContext.Provider
			value={{
				loggedInUser,
				setLoggedInUser,
				isAdmin,
				cart,
				setCart,
				allFood,
				setAllFood,
				orderList,
				setOrderList,
				myOrderLists,
				setMyOrderLists,
				myOrderSort,
				setMyOrderSort,
				orderListSort,
				setOrderListSort,
				handleSortList,
				sortStatusForMyOrder,
				setSortStatusForMyOrder,
				sortStatusForOrderList,
				setSortStatusForOrderList,
			}}
		>
			<main className="App">
				<BottomToTopBtn />
				<Router>
					<Header />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>

						{/*loggedInUser and also Admin can access this route */}
						<PrivateRoute path="/dashboard/checkout">
							{cart.length > 0 ? <CheckOut /> : <Notfound />}
						</PrivateRoute>
						<PrivateRoute path="/dashboard/myOrder">
							<MyOrder />
						</PrivateRoute>
						<PrivateRoute path="/dashboard/review">
							<Review />
						</PrivateRoute>

						{/* Only Admin can access this route */}
						<PrivateRoute path="/admin/orderList">
							{isAdmin ? <OrderList /> : <Notfound />}
						</PrivateRoute>
						<PrivateRoute path="/admin/addFood">
							{isAdmin ? <AddFood /> : <Notfound />}
						</PrivateRoute>
						<PrivateRoute path="/admin/makeAdmin">
							{isAdmin ? <MakeAdmin /> : <Notfound />}
						</PrivateRoute>

						<Route path="/:category/:foodId">
							<FoodDetail />
						</Route>
						<Route path="*">
							<Notfound />
						</Route>
					</Switch>
				</Router>
			</main>
		</UserContext.Provider>
	);
}

export default App;
