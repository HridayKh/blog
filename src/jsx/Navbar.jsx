import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // List of tags (customize as needed)
  const tags = ["Tech", "JavaScript", "React", "Backend", "AI"];

  // Get selected tags from URL
  const selectedTags = searchParams.get("tags")?.split(",") || [];

  // Toggle tag selection
  const handleTagClick = (tag) => {
    let updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // Remove if already selected
      : [...selectedTags, tag]; // Add new tag

    setSearchParams({ tags: updatedTags.join(",") });
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand text-accent" href="/">Hriday's Blogs</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-light btn btn-light" href="#">Services</a>
            </li>
          </ul>

          {/* Tag Filter Section */}
          <div className="ms-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`btn btn-sm me-2 ${selectedTags.includes(tag) ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
