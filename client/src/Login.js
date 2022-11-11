import React from "react";
import { useState } from "react";
// import Login from './Login';
// import Adminpage from './Adminpage';
import "./App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage() {
	const baseRoute =
		"https://sanikainamdar-crispy-spork-jwj6qwjqw7p2j56-3001.preview.app.github.dev";
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [loginStatus, setLoginStatus] = useState("");

	const adminlogin = () => {
		Axios.post(baseRoute + "/adminlogin", {
			username: username,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				//console.log(response.data[0].adminName);
				setLoginStatus(response.data[0].adminName);
				navigate("/Adminpage");
			}
		});
	};

	const ownerlogin = () => {
		Axios.post(baseRoute + "/ownerlogin", {
			username: username,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				//console.log(response.data[0].adminName);
				setLoginStatus(response.data[0].ownerName);
				navigate("/Ownerpage");
			}
		});
	};
	return (
		<div className="row Loginpage ">
			<h1>{loginStatus}</h1>
			<div className="col-lg-6 login1">
				<div className="pageheading">
					<p id="heading">Housing Society</p>
					<p id="heading">Management Portal</p>
				</div>
			</div>
			<div className="col-lg-6 login ">
				<h1 className="login_heading">Login</h1>
				<label className="login_label">Username</label>
				<input
					className="login_input"
					type="text"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<label className="login_label">Password</label>
				<input
					className="login_input"
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<button className="login_button1" onClick={adminlogin}>
					Society Admin
				</button>
				<button className="login_button2" onClick={ownerlogin}>
					Flat Owner
				</button>
			</div>
		</div>
	);
}

export default LoginPage;
