import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../../../App";
import loading_spin from "../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif";
import Sidebar from "../../../../Common/Sidebar/Sidebar";
import SortBy from "../../../../Common/SortBy/SortBy";
import OrderListCard from "../OrderListCard/OrderListCard";
const OrderList = () => {
	const {
		isAdmin,
		orderList,
		setOrderList,
		orderListSort,
		setOrderListSort,
		handleSortList,
		sortStatusForOrderList,
		setSortStatusForOrderList,
	} = useContext(UserContext);

	useEffect(() => {
		handleSortList(orderListSort, setOrderList, sortStatusForOrderList, {
			orderList: true,
		});
	}, [orderListSort, sortStatusForOrderList]);

	const handleLoadOrderList = () => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		const token = localStorage.getItem("token");
		if (userInfo) {
			if (userInfo.email && token) {
				fetch(
					`https://hot-onion-101.herokuapp.com/order_list?admin_email=${userInfo.email}`,
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
						setOrderListSort(data);
					})
					.catch((error) => console.log(error));
			}
		}
	};

	useEffect(() => {
		if (isAdmin) {
			const token = localStorage.getItem("token");
			if (!token && !orderList.length) {
				setTimeout(() => {
					handleLoadOrderList();
				}, 3000);
			}
			if (token && !orderList.length) {
				handleLoadOrderList();
			}
		}
	}, [isAdmin, orderList.length]);

	return (
		<section>
			<div className="row">
				<div className="col-md-2 for_mobile_responsive">
					<Sidebar />
				</div>
				<div className="col-md-10 dashboard_r_div_container">
					<div className="dashboard_right_container">
						<div className="mb-3 d-flex align-items-center justify-content-between">
							<h5 className="text-left">Order List</h5>
							<SortBy
								sortStatus={sortStatusForOrderList}
								setSortStatus={setSortStatusForOrderList}
								orderListComponent={true}
							/>
						</div>
						{orderList.length > 0 ? (
							<div className="row right_inside_container">
								{orderList.map((order_list, index) => (
									<OrderListCard
										key={order_list._id}
										index={index}
										order_list={order_list}
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

export default OrderList;
