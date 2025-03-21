import React, { useState, useEffect } from "react";

const Projects = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
            .then((response) => response.json())
            .then((data) => setRepos(data));
    }, []);

    return (
        <div className="container" id="projects">
            <h2>My Projects</h2>
            {repos.length > 0 ? (
                repos.map((repo) => (
                    <div className="card" key={repo.id}>
                        <h3>{repo.name}</h3>
                        <p>{repo.description}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </div>
                ))
            ) : (
                <p>Loading projects...</p>
            )}
        </div>
    );
};

export default Projects;
