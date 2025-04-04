import { useState, useEffect } from "react";
import { CreateBlog, CreateTag, CreateImage } from "./Create.jsx";
import { UpdateBlog, UpdateTag, UpdateImage } from "./Update.jsx";

export default function Main() {
	const [activeComponent, setActiveComponent] = useState("Dash");

	return (
		<div className="m-5">
			<div>
				<button className="me-2" onClick={() => setActiveComponent("CreateBlog")}>Create Blog</button>
				<button className="me-2" onClick={() => setActiveComponent("CreateTag")}>Create Tag</button>
				<button className="me-2" onClick={() => setActiveComponent("CreateImage")}>Create Image</button>
				<button className="me-2" onClick={() => setActiveComponent("UpdateBlog")}>Update Blog</button>
				<button className="me-2" onClick={() => setActiveComponent("UpdateTag")}>Update Tag</button>
				<button className="me-2" onClick={() => setActiveComponent("UpdateImage")}>Update Image</button>
				<button className="me-2" onClick={() => setActiveComponent("Dash")}>Clear</button>
			</div>

			<div className="mt-4">
				{activeComponent === "CreateBlog" && <CreateBlog />}
				{activeComponent === "CreateTag" && <CreateTag />}
				{activeComponent === "CreateImage" && <CreateImage />}
				{activeComponent === "UpdateBlog" && <UpdateBlog />}
				{activeComponent === "UpdateTag" && <UpdateTag />}
				{activeComponent === "UpdateImage" && <UpdateImage />}
				{activeComponent === "Dash" && <Dash />}
			</div>
		</div>
	);
}

function Dash() {
	const [pass, setPass] = useState("");
	const [isPasswordSet, setIsPasswordSet] = useState("Input Password");

	useEffect(() => {
		const storedPassword = sessionStorage.getItem("password");
		if (storedPassword) {
			setIsPasswordSet("Password OK");
		}
	}, []);

	const handleSetPassword = () => {
		sessionStorage.setItem("password", pass);
		setIsPasswordSet("Password is updated!");

		setTimeout(() => {
			setIsPasswordSet("Password OK");
		}, 3000);
	};

	return (
		<div>
			<input
				type="password"
				name="pass"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
			/>
			<button onClick={handleSetPassword}>Set Password</button>
			<p>{isPasswordSet}</p>
		</div>
	);
}
