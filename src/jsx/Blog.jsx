import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Blog() {
	const { id } = useParams();
	const navigate = useNavigate();

	const blog = {
		title: `Blog Post ${id}`,
		subtitle: "A detailed explanation of something interesting",
		content: `## This is Blog ${id} \n\n - It supports **Markdown** \n - Even *italic* and \`inline code\` \n\n \`\`\`java\nSystem.out.println("Hello, World!");\n\`\`\``,
		img: {
			NAME: "Sample Image",
			ALT: "An example image",
			URL: "https://placehold.co/300x200/505050/FFF",
		},
	};

	const [mdxContent] = useState(blog.content);

	return (
		<div className="container mt-4">
			<button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/")}>
				← Home
			</button>
			<div className="card bg-dark text-light p-4">
				<h1 className="text-primary text-center">{blog.title}</h1>
				<h5 className="text-secondary text-center">{blog.subtitle}</h5>
				<div className="text-center mb-3">
					<img
						src={blog.img.URL}
						alt={blog.img.ALT}
						className="img-fluid rounded"
						style={{ minWidth: "300px", minHeight: "200px", maxWidth: "100%", height: "auto" }}
					/>
					<span className="d-block mt-2 text-accent">{blog.img.NAME}</span>
				</div>
				<hr />
				<div className="text-light">
					<ReactMarkdown
						components={{
							code({ inline, className, children }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div">
										{String(children).trim()}
									</SyntaxHighlighter>
								) : (
									<code className="bg-black px-1 rounded text-white pt-1 px-2">{children}</code>
								);
							},
						}}
					>
						{mdxContent}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
