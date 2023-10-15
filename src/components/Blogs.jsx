import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from './Spinner';
import "./Blogs.css";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
    // consume 
    const {loading, posts} = useContext(AppContext);

    return (
        <div className="w-11/12 max-w-[670px] h-screen py-8 flex flex-col gap-y-7 mt-[110px] mb-[100px] justify-center items-center">
            {
                loading ? 
                
                (<Spinner/>) : 
                
                (
                    posts.length === 0 ? 
                    (<div>
                        <p>No Post Found</p>
                    </div>) : 
                    (posts.map( (post) => (                                 // Hum har 1 single post ke liye 1 card bna rhe h 
                        <BlogDetails key={post.id} post={post}/>
                    ) ))          
                )
            }
        </div>
    );
}

export default Blogs;
