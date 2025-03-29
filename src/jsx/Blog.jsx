import { useParams } from "react-router-dom";

export default function Blog() {
	const { id } = useParams();

	return (
		<>
			{id}
		</>
	);
}
