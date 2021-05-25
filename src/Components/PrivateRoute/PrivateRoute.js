import jwt_decode from "jwt-decode";
import React, { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const history = useHistory();
	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			return false;
		}
		const decodedToken = jwt_decode(token);
		// get current time
		const currentTime = new Date().getTime() / 1000;
		// compare the expiration time with the current time
		// will return false if expired and will return true if not expired

		if (decodedToken.exp < currentTime) {
			history.push("/login");
			setLoggedInUser({});
			localStorage.removeItem("token");
			localStorage.removeItem(`userInfo`);
		}

		return decodedToken.exp > currentTime;
	};

	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedInUser.email || isLoggedIn() ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
