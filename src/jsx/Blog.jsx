import { useParams } from "react-router-dom";

export default function Blog() {
	const { id } = useParams();

	return (
		<div>
			<h1>Home</h1>
			{id && <p>ID: {id}</p>}
		</div>
	);
}
