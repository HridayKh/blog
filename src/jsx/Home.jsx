export default function Home() {
	return (
		<div>
			<Nav />
			<h1 className="text-primary">Home Page</h1>
			<p>Welcome to the Home page!</p>
		</div>
	);
}

function Nav() {
	return (<>
		<nav class="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
			<div class="container-fluid">

				<a class="navbar-brand text-accent" href="/">Hriday's Blogs</a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<a class="nav-link text-light btn btn-light" href="#">Services</a>
						</li>
					</ul>
				</div>

			</div>
		</nav>
	</>);
}