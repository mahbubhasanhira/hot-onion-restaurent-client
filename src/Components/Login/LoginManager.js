import * as firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "../../secretAPI";

export const initializedLogInFramework = () => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
};

const handleUserToken = () => {
	firebase
		.auth()
		.currentUser.getIdToken(/* forceRefresh */ true)
		.then((idToken) => {
			// Send token to your backend via HTTPS
			// ...
			localStorage.setItem(`token`, idToken);
		})
		.catch((error) => {
			// Handle error
		});
};

export const handleGoogleSignIn = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(googleProvider)
		.then((result) => {
			const { displayName, email, photoURL } = result.user;
			const signInUser = {
				isSignIn: true,
				name: displayName,
				email: email,
				photoURL: photoURL,
				success: true,
			};
			handleUserToken();
			return signInUser;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			newUserInfo.isSignIn = false;
			alert(error.message);
			return newUserInfo;
		});
};

export const handleFbSignIn = () => {
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(fbProvider)
		.then((res) => {
			const { displayName, email, photoURL } = res.user;
			const signInUser = {
				isSignIn: true,
				name: displayName,
				email: email,
				photoURL: photoURL,
				success: true,
			};
			handleUserToken();
			return signInUser;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			newUserInfo.isSignIn = false;
			return newUserInfo;
		});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((res) => {
			const { email, photoURL } = res.user;
			const signInUser = {
				isSignIn: true,
				name: name,
				email: email,
				photoURL: photoURL,
				success: true,
			};
			updateUser(name, photoURL);
			handleUserToken();
			return signInUser;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			newUserInfo.isSignIn = false;
			alert(error.message);
			return newUserInfo;
		});
};

export const signInWithEmailAndPassword = (email, password) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((res) => {
			const { displayName, email, photoURL } = res.user;
			const signInUser = {
				isSignIn: true,
				name: displayName,
				email: email,
				photoURL: photoURL,
				success: true,
			};
			handleUserToken();
			return signInUser;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			newUserInfo.isSignIn = false;
			alert(error.message);
			return newUserInfo;
		});
};

export const updateUser = (name, photoURL) => {
	const user = firebase.auth().currentUser;
	user
		.updateProfile({
			displayName: name,
			photoURL: photoURL,
		})
		.then((res) => {
			console.log("user successfully updated");
		})
		.catch((error) => alert(error.message));
};

export const handlePasswordReset = (email) => {
	return firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			// An error happened.
			console.log(error);
		});
};
