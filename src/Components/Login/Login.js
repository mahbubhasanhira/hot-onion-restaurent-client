import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../hot-onion-restaurent-resources/logo2.png";
import CreateAccount from "./CreateAccount";
import EmailAndPassword from "./EmailAndPassword";
import FacebookOrGoogle from "./FacebookOrGoogle";
import ForgotPassword from "./ForgotPassword";
import "./Login.css";
import {
    createUserWithEmailAndPassword,
    handleFbSignIn,
    handleGoogleSignIn,
    handlePasswordReset,
    initializedLogInFramework,
    signInWithEmailAndPassword
} from "./LoginManager";

const Login = () => {
	initializedLogInFramework();
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const [newUser, setNewUser] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		photoURL: "",
		error: "",
		isSignIn: false,
		success: false,
	});

	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: "/dashboard/myOrder" } };

	const googleSignIn = () => {
		handleGoogleSignIn().then((res) => {
			handleResponse(res, true);
		});
	};

	const fbSignIn = () => {
		handleFbSignIn().then((res) => {
			handleResponse(res, true);
		});
	};

	const signOut = () => {
		localStorage.removeItem(`userInfo`);
		localStorage.removeItem(`token`);
		setLoggedInUser({ isSignIn: false });
	};

	const onSubmit = (data) => {
		if (data) {
			const inputData = { ...user };
			inputData.name = data.name;
			inputData.email = data.email;
			inputData.password = data.password;
			setUser(inputData);
			if (newUser && inputData.email && inputData.password) {
				createUserWithEmailAndPassword(
					inputData.name,
					inputData.email,
					inputData.password
				).then((res) => {
					handleResponse(res, true);
				});
			}
			if (!newUser && inputData.email && inputData.password) {
				signInWithEmailAndPassword(inputData.email, inputData.password).then(
					(res) => {
						handleResponse(res, true);
					}
				);
			}

			if (forgotPassword && data.email) {
				handlePasswordReset(data.email)
					.then((res) => {
						alert("A link is sent to your email for reset password");
					})
					.catch((error) => console.log(error));
			}
		}
	};

	const handleResponse = (res, redirect) => {
		if (res.isSignIn) {
			setUser(res);
			localStorage.setItem(`userInfo`, JSON.stringify(res));
			setLoggedInUser(res);
			if (redirect) {
				history.replace(from);
			}
		} else if (res.error) {
			alert(res.error);
		}
	};

	return (
		<div className="container">
			<div className="login_container">
				<Link to="/">
					<img className="signInLogo" src={logo} alt="Home" />
				</Link>
				{loggedInUser.isSignIn ? (
					<div className="account_container mt-5">
						<Link className="signIn_btn" onClick={signOut} to="">
							Sign Out
						</Link>
					</div>
				) : (
					<>
						{newUser ? (
							<CreateAccount
								onSubmit={onSubmit}
								setNewUser={setNewUser}
								newUser={newUser}
							/>
						) : (
							<>
								{forgotPassword ? (
									<ForgotPassword
										onSubmit={onSubmit}
										setForgotPassword={setForgotPassword}
										forgotPassword={forgotPassword}
									/>
								) : (
									<EmailAndPassword
										onSubmit={onSubmit}
										setForgotPassword={setForgotPassword}
										forgotPassword={forgotPassword}
										setNewUser={setNewUser}
										newUser={newUser}
									/>
								)}
							</>
						)}
						<FacebookOrGoogle fbSignIn={fbSignIn} googleSignIn={googleSignIn} />
					</>
				)}
			</div>
		</div>
	);
};

export default Login;
