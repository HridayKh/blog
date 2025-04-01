import { useState } from "react";
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
	return (
		<div>
			<h2>Dashboard</h2>
			<p>Select an action above.</p>
		</div>
	);
}
