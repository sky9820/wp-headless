import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 6;
    
    useEffect(()=>{
        let url = `${process.env.REACT_APP_API_ROOT}/posts?per_page=${perPage}&page=${currentPage}`;
        axios.get(url).then((res)=>{
            const {data, headers} = res;
            console.log('Headers', headers['x-wp-totalpages']);
            console.log('Headers', headers['x-wp-total']);
            setTotalPages(Number(headers['x-wp-totalpages']));
            setPosts(data);
        });
    },[currentPage]);
    
    // GET POSTS by Category ID=20
    // const wpdata = fetch(`${process.env.REACT_APP_API_ROOT}/posts?categories=20`);
    // const jsonresp = wpdata
    // console.log(jsonresp);
    
    return(
        <>
            <h1>Blog Posts</h1>
            <div className='w-4/5 py-10 m-auto flex justify-evenly align-middle flex-wrap gap-10'>
            {
                Object.keys(posts).length ? posts.map((post)=>{
                    return (
                        <div key={post.id} className='p-4 w-[480px] shadow-xl rounded-md flex gap-5 flex-col'>
                            {/* Check if post.featured_src exists */}
                            {post.featured_src && (
                            <div>
                                <img src={post.featured_src} alt={post.title.rendered} />
                            </div>
                            )}
                            <Link to={`/posts/${post.id}`}>
                                <h2 className='text-lg font-bold'>{post.title.rendered} </h2>
                                <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></p>
                            </Link>
                        </div>
                    ) 
                }) : 'Loading...'
            }
            </div>

            {/*Pagination*/}
            <div className='w-3/12 py-10 m-auto flex justify-evenly items-center align-middle flex-wrap gap-5'>
                <button className='btn-primary p-2 pr-4 pl-4 bg-blue-400 rounded-md hover: shadow-sm ' 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage-1)} 
                    >Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button className='btn-primary p-2 pr-4 pl-4 bg-blue-400 rounded-md hover: shadow-sm ' 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage+1)} 
                >Next</button>
            </div>
        </>
    )
}

export default Posts;