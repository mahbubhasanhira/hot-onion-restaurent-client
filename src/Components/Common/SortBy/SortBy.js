import React from "react";
import "./SortBy.css";

const SortBy = ({
	sortStatus,
	setSortStatus,
	orderListComponent,
	myOrderListComponent,
}) => {
	const handleSortStatus = (e) => {
		setSortStatus(e.target.value);
		if (orderListComponent) {
			localStorage.setItem(`orderListSortStatus`, e.target.value);
		}
		if (myOrderListComponent) {
			localStorage.setItem(`myOrderListSortStatus`, e.target.value);
		}
	};

	let customColor = "status_contain sort_contain";
	if (sortStatus === "Pending") {
		customColor = "pending status_contain sort_contain";
	} else if (sortStatus === "Done") {
		customColor = "done status_contain sort_contain";
	} else if (sortStatus === "On going") {
		customColor = "on_going status_contain sort_contain";
	} else if (sortStatus === "All") {
		customColor = "all status_contain sort_contain";
	}

	return (
		<div className="status_Container sort_container">
			<h6 className="mt-2">Sort By:</h6>
			<select
				style={{ marginRight: "0px" }}
				className={customColor}
				id="select124"
				onChange={handleSortStatus}
			>
				<option value={sortStatus} id="selected" defaultValue="selected">
					{sortStatus}
				</option>
				<option className="All" value="All">
					All
				</option>
				<option className="Pending" value="Pending">
					Pending
				</option>
				<option className="ongoing" value="On going">
					On Going
				</option>
				<option className="Done" value="Done">
					Done
				</option>
			</select>
		</div>
	);
};

export default SortBy;
