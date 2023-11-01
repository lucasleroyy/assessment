import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {

    const navigate = useNavigate();

    // navigate to a detail page for the selected post
    const handlePostClick = () => {
        navigate('/details', { state: { post } });
    }

    // data of the post in parameters
    const { title, author, summary } = post;

    return (
        <div className="post" onClick={handlePostClick}>
            <div className="card">
                <div className="post-body">
                    <h5 className="post-title">{title}</h5>
                    <div className="author-info">
                        <img src={author.avatar} alt="author" />
                        <h6 className="author-name">{author.name}</h6>
                    </div>
                    <p className="summary">{summary}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
