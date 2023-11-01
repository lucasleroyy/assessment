import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Post from "../components/Post";
import Pagination from "../components/Pagination";

const Home = () => {
    // all the categories for the posts
    const [categories, setCategories] = useState([]);

    // the categories selected by the user
    const [selectedCategories, setSelectedCategories] = useState([]);

    // all the posts from the api
    const [posts, setPosts] = useState([]);

    // posts that are displayed (selected by the select categories)
    const [displayedPosts, setDisplayedPosts] = useState([]);

    // index of the current page
    const [currentPage, setCurrentPage] = useState(1);

    // nb of record to be displayed by page
    const recordsPerPage = 8;

    // fetch the posts from the api
    useEffect(() => {
        fetchPosts();
    }, []);

    // update the categories availables in all the posts
    useEffect(() => {
        if (posts.length > 0) {
            updateCategories();
        }
    }, [posts]);

    // filter the posts based on the categories selected
    useEffect(() => {
        filterPosts();
    }, [selectedCategories]);

    // fetch the data from the api and put it in the state
    const fetchPosts = () => {
        try {
            axios.get('/api/posts').then((response) => {
                setPosts(response.data.posts);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // search all the categories availables in the posts by searching through all the posts and store them
    const updateCategories = () => {

        // store the categories, doesn't store the duplicated data
        const allCategories = new Set();

        // go through all the posts
        for (const post of posts) {

            // add the category name in the set
            for (const category of post.categories) {
                allCategories.add(category.name);
            }
        }

        // create an object category object with label and value for the select 
        const categoryOptions = Array.from(allCategories).map((category) => ({
            label: category,
            value: category,
        }));

        // put the found categories in a state
        setCategories(categoryOptions);
    };

    // filter the posts to be displayed based on the selected categories
    const filterPosts = () => {

        // if no category is selected
        if (selectedCategories.length === 0) {

            // reset the displayed posts array to all the posts
            setDisplayedPosts(posts);
        } else {

            // return true if at least one of the categories of the post (post.categories) is in the selected categories array
            const filteredPosts = posts.filter((post) => {
                return post.categories.some((category) =>
                    selectedCategories.some(
                        (selectedCategory) => selectedCategory.value === category.name
                    )
                );
            });

            // store the posts to be displayed in an array
            setDisplayedPosts(filteredPosts);
        }

        // navigate to the first page of the pagination
        setCurrentPage(1);
    };

    // indexes of the first and last post on the current page
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;

    // posts displayed on the current page
    let currentPosts;
    if(displayedPosts.length > 0){
        currentPosts = displayedPosts.slice(indexOfFirstPost, indexOfLastPost);
    }
    else {
        currentPosts = posts?.slice(indexOfFirstPost, indexOfFirstPost);
    }

    // number total of pages in the pagination
    const totalPages = Math.ceil(displayedPosts.length / recordsPerPage);

    // change the page index (reset the currentPosts based on the new index of the page)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        
        <div className="home">
            <h2>All Posts</h2>
            <Select
                className="select"
                value={selectedCategories}
                onChange={setSelectedCategories}
                options={categories}
                isMulti={true}
                isSearchable={true}
            />
            <div className="posts">
                {currentPosts.map((post) => (
                    <ul key={post.id}>
                        <Post post={post} />
                    </ul>
                ))}
            </div>
            <footer className="footer">
                <div className="pagination">
                    <Pagination
                        nbPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange}
                    />
                </div>
            </footer>
        </div>
        
    );
}

export default Home;
