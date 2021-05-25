import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../../../App";
import loading_spin from "../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif";
import Sidebar from "../../../../Common/Sidebar/Sidebar";
import SortBy from "../../../../Common/SortBy/SortBy";
import MyOrderCard from "../MyOrderCard/MyOrderCard";

const MyOrder = () => {
	const {
		loggedInUser,
		myOrderLists,
		setMyOrderLists,
		myOrderSort,
		setMyOrderSort,
		handleSortList,
		sortStatusForMyOrder,
		setSortStatusForMyOrder,
	} = useContext(UserContext);

	useEffect(() => {
		handleSortList(myOrderSort, setMyOrderLists, sortStatusForMyOrder, {
			myOrder: true,
		});
	}, [myOrderSort, sortStatusForMyOrder]);

	const handleLoadOrder = () => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		const token = localStorage.getItem("token");
		if (userInfo) {
			if (userInfo.email && token) {
				fetch(
					`https://hot-onion-101.herokuapp.com/my_orders?email=${userInfo.email}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							authorization: `Bearer ${token}`,
						},
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.length) {
							setMyOrderSort(data);
						}
					})
					.catch((error) => console.log(error));
			}
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token && !myOrderLists.length) {
			setTimeout(() => {
				handleLoadOrder();
			}, 4000);
		}
		if (token && !myOrderLists.length) {
			setTimeout(() => {
				handleLoadOrder();
			}, 2000);
		}
	}, [myOrderLists.length]);

	return (
		<section>
			<div className="row">
				<div className="col-md-2 for_mobile_responsive">
					<Sidebar />
				</div>
				<div className="col-md-10 dashboard_r_div_container">
					<div className="dashboard_right_container">
						<div className="mb-3 d-flex align-items-center justify-content-between">
							<h5 className="text-left">My Order</h5>
							<SortBy
								sortStatus={sortStatusForMyOrder}
								setSortStatus={setSortStatusForMyOrder}
								myOrderListComponent={true}
							/>
						</div>

						{myOrderLists.length > 0 ? (
							<div className="row right_inside_container">
								{myOrderLists.map((orderList, index) => (
									<MyOrderCard
										key={index}
										index={index}
										loggedInUser={loggedInUser}
										orderList={orderList}
									/>
								))}
							</div>
						) : (
							<div className="text-center mt-5 w-100">
								<img
									className="loading_spin"
									src={loading_spin}
									alt="loading"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyOrder;
