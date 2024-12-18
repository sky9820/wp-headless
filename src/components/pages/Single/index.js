import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = ()=>{
    const {id} = useParams();
    const [post, setPost] = useState({});
    useEffect(()=>{
        let url = `${process.env.REACT_APP_API_ROOT}/posts/${id}`;
        axios.get(url).then(res => {
            console.log('res', res);
            setPost(res.data);
        }).catch(err =>{
            console.log('Error:', err.message);
        });
    },[id]);

    return(
        <>
           {
            Object.keys(post).length ? (
                <div className="p-5">
                    {/* Check if post.featured_src exists */}
                    {post.featured_src && (
                        <div>
                            <img src={post.featured_src} alt={post.title.rendered} />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold">
                            {post.title.rendered}
                        </h1>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}}>
                        
                    </div>
                </div>
            ) : ('loading....')
           }
        </>
    )
}

export default Single