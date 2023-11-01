import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation();
    const { post } = location.state;

    if (!post) {
        return <div>Le post n'est pas disponible.</div>;
    }

    const { title, author, summary, categories, id, publishDate } = post;

    return (
        <div className="details">
            <h2>{title}</h2>
            <div className="details-author">
                <img src={author.avatar} alt="avatar" />
                <h6 className="auth-name">By {author.name}</h6>
            </div>
            <h4>{summary}</h4>
            <h6 className="element-title">Categories :</h6>
            {categories?.map((c) => (
                <p key={c.id}>{c.name} (ID: {c.id})</p>
            ))}
            <div className="details-secundary">
                <h6 className="element-title">More Details :</h6>
                <p>ID: {id}</p>
                <p>Publication Date: {publishDate}</p>
            </div>
        </div>
    );
}

export default Details;
