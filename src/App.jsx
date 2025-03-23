import { MapPin, Mail, Linkedin, NotebookText, Github, ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function App() {
	return (
		<>
			<div className="main">
				<div className="col left-col">
					<Links />
					<Experiences />
					<Achieve />
				</div>
				<div className="col right-col">
					<AboutMe />
					<Projects />
					<Blogs />
				</div>
			</div>
		</>
	);
}

function Links() {
	return (
		<div>
			<ul>
				<li>
					<a href="mailo:hridaykh@gmail.com" className="link"> <Mail size={"1em"} /> hridaykh@gmail.com </a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/hridaykhanna" className="link"> <Linkedin size={"1em"} /> LinkedIn </a>
				</li>
				<li>
					<a href="https://github.com/hridaykh/" className="link"> <Github size={"1em"} /> GitHub </a>
				</li>
				<li>
					<a href="#" className="link"> <NotebookText size={"1em"} /> Blogs </a>
				</li>
				<li>
					<a href="#" className="link"> <MapPin size={"1em"} /> India </a>
				</li>
			</ul>
		</div>
	);
}

function AboutMe() {
	return (<div>

		<h1 style={{ textDecoration: "none", color: "var(--prm)" }}> About Me </h1>
		<h6 style={{ textDecoration: "none", color: "var(--scd)" }}> Aspiring Software Engineer | UGEE Aspirant | Open to Internships </h6>
		<hr />

		<p className="text">
			This portfolio highlights my journey in software development, focusing on coding best practices, algorithms, and system design. My work emphasizes problem-solving, hands-on learning, and building efficient solutions from concept to implementation. I'm eager to apply my skills through internships and collaborations. Let's innovate together!
		</p>

	</div>);

}

function Experiences() {
	const [isOpen, setIsOpen] = useState(true);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{/* Dropdown Header */}
			<h1
				style={{ textDecoration: "none", color: "var(--prm)", cursor: "pointer" }}
				onClick={toggleDropdown}
			>
				{isOpen ? (
					<>
						<ChevronDown size="1em" style={{ paddingTop: "0.3em" }} />Experience
					</>
				) : (
					<>
						<ChevronRight size="1em" style={{ paddingTop: "0.3em" }} />Experience
					</>
				)}

			</h1>

			{/* Dropdown Content */}
			{isOpen && (
				<>
					<hr />
					<div>
						<div style={{ marginBottom: "1.5em" }}>
							<h4 style={{ color: "var(--prm)" }}>Software Developer Intern</h4>
							<h6 style={{ color: "var(--scd)" }}>
								Tech Company XYZ | May 2023 - Aug 2023
							</h6>
							<p className="text">
								- Developed and optimized React components for a real-time
								dashboard.
								<br />
								- Collaborated with the backend team to integrate RESTful APIs.
								<br />
								- Implemented unit tests, improving code reliability and coverage
								by 30%.
							</p>
						</div>
						<div style={{ marginBottom: "1.5em" }}>
							<h4 style={{ color: "var(--prm)" }}>Freelance Web Developer</h4>
							<h6 style={{ color: "var(--scd)" }}>
								Self-Employed | Jan 2023 - Apr 2023
							</h6>
							<p className="text">
								- Designed and deployed responsive websites for small businesses.
								<br />
								- Integrated payment gateways and third-party services.
								<br />
								- Ensured cross-browser compatibility and improved site
								performance.
							</p>
						</div>
						<div>
							<h4 style={{ color: "var(--prm)" }}>Open Source Contributor</h4>
							<h6 style={{ color: "var(--scd)" }}>
								Various Projects | 2022 - Present
							</h6>
							<p className="text">
								- Contributed to open-source projects, focusing on frontend and
								documentation.
								<br />
								- Reviewed and improved existing code for better readability.
								<br />
								- Helped onboard new contributors by creating clear,
								beginner-friendly guides.
							</p>
						</div>
					</div></>
			)}
		</div>
	);
}

function Projects() {
	const [isOpen, setIsOpen] = useState(true);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{/* Dropdown Header */}
			<h1
				style={{ textDecoration: "none", color: "var(--prm)", cursor: "pointer" }}
				onClick={toggleDropdown}
			>
				{isOpen ? (
					<>
						<ChevronDown size="1em" style={{ paddingTop: "0.3em" }} />Projects
					</>
				) : (
					<>
						<ChevronRight size="1em" style={{ paddingTop: "0.3em" }} />Projects
					</>
				)}
			</h1>

			{/* Dropdown Content */}
			{isOpen && (
				<>
					<hr />
					<div>
						{/* Project 1 */}
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Project 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Project Title 1 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}> A brief one-line description of the project. </h6>
								<br />
								<a href="#" className="link" style={{ fontSize: "1em" }}> <Github size={"0.8em"} /> GitHub Link Here </a>
							</div>
						</div>

						{/* Project 2 */}
						<hr style={{ width: "90%", borderTop: "1px dashed var(--acc)" }} />
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Project 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Project Title 2 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}> A brief one-line description of the project. </h6>
								<br />
								<a href="#" className="link" style={{ fontSize: "1em" }}> <Github size={"0.8em"} /> GitHub Link Here </a>
							</div>
						</div>

						{/* Project 3 */}
						<hr style={{ width: "90%", borderTop: "1px dashed var(--acc)" }} />
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Project 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Project Title 3 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}> A brief one-line description of the project. </h6>
								<br />
								<a href="#" className="link" style={{ fontSize: "1em" }}> <Github size={"0.8em"} /> GitHub Link Here </a>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function Achieve() {
	return (<><div>
		<Awards />
		<Certifications />
	</div></>);
}

function Awards() {
	return (
		<>
			<h1 style={{ textDecoration: "none", color: "var(--prm)" }}> Awards </h1>

			<hr />
			<div>
				<Award
					title="2nd Place - ICSO"
					organization="Science Olympiad Foundation"
					year="2024"
					description={[
						"Secured 2nd place in the International Computer Science Olympiad.",
						"Demonstrated excellent analytical and problem-solving skills in computer science.",
					]}
				/>
				<Award
					title="1st Place - Python Coding Competition"
					organization="Spring Dales"
					year="2024"
					description={[
						"Won 1st place in an inter-school coding competition.",
						"Built 2 python applications to demonstrate advanced python skills.",
					]}
				/>
				<Award
					title="3rd Place - Intercity python Competition"
					organization="DCM Group of Schools"
					year="2024"
					description={[
						"Achieved 3rd place in a challenging intercity competition involving teamwork and innovation.",
						"Built 2 interactive python applications to solve problems.",
					]}
				/>
			</div>
		</>
	);
}

function Certifications() {
	return (
		<>
			<h1 style={{ textDecoration: "none", color: "var(--prm)" }}> Certifications </h1>

			<hr />
			<div>
				<Award
					title="Example Certification"
					organization="lorem ipsm doto sit amet"
					year="20xx"
					description={[
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						"Nullam dignissim velit eu nulla feugiat, in gravida nunc faucibus.",
					]}
				/>
			</div>
		</>
	);
}

function Award({ title, organization, year, description }) {
	return (
		<div style={{ marginBottom: "1.5em" }}>
			<h4 style={{ color: "var(--prm)" }}>{title}</h4>
			<h6 style={{ color: "var(--scd)" }}>
				{organization} | {year}
			</h6>
			<p className="text">
				{description.map((item, index) => (
					<>
						{item}
						<br />
					</>
				))}
			</p>
		</div>
	);
}

function Blogs() {
	const [isOpen, setIsOpen] = useState(true);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{/* Dropdown Header */}
			<h1
				style={{ textDecoration: "none", color: "var(--prm)", cursor: "pointer" }}
				onClick={toggleDropdown}
			>
				{isOpen ? (
					<>
						<ChevronDown size="1em" style={{ paddingTop: "0.3em" }} />Blogs
					</>
				) : (
					<>
						<ChevronRight size="1em" style={{ paddingTop: "0.3em" }} />Blogs
					</>
				)}
			</h1>

			{/* Dropdown Content */}
			{isOpen && (
				<>
					<hr />
					<div>
						{/* Blog 1 */}
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Blog 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Blog 1 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}> A Subtitle Of The Blog. </h6>
								<p className="text" style={{ fontSize: "0.65em" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim velit eu nulla feugiat, in gravida nunc faucibus. Donec eu fringilla lectus, non vulputate diam
									<a href="#" className="link">...Read More </a></p>
							</div>
						</div>

						{/* Blog 2 */}
						<hr style={{ width: "90%", borderTop: "1px dashed var(--acc)" }} />
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Blog 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Blog 2 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}> A Subtitle Of The Blog. </h6>
								<p className="text" style={{ fontSize: "0.65em" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim velit eu nulla feugiat, in gravida nunc faucibus. Donec eu fringilla lectus, non vulputate diam
									<a href="#" className="link">...Read More </a></p>
							</div>
						</div>

						{/* Blog 3 */}
						<hr style={{ width: "90%", borderTop: "1px dashed var(--acc)" }} />
						<div style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
							<img
								src="https://avatars.githubusercontent.com/u/93050582?v=4" // Replace with your project image URL
								alt="Blog 1"
								style={{
									width: "4.5em",
									height: "5em",
									borderRadius: "0.25em",
									objectFit: "cover",
								}}
							/>
							<div>
								<h3 style={{ textDecoration: "none", color: "var(--prm)" }}> Blog 3 </h3>
								<h6 style={{ textDecoration: "none", color: "var(--scd)", marginBottom: "0.5em" }}>
									A Subtitle Of The Blog. </h6>
								<p className="text" style={{ fontSize: "0.65em" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim velit eu nulla feugiat, in gravida nunc faucibus. Donec eu fringilla lectus, non vulputate diam
									<a href="#" className="link">...Read More </a></p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
