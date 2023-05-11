//import { comment } from "postcss";
import React from "react";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { Card } from 'flowbite-react';
const GetArticleComments = () => {
    
    const [comment, setComment] = useState(null);
    //const [isLoading, setIsLoading] = useState(true);
    const parms = useParams();
    const articleID = parms.id;
    useEffect(() => {
            const fetchComments = async () => {
                try {
                    const response = await fetch(`https://supsys.azurewebsites.net/api/article/getArticleComments/${articleID}`);
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message);
                    }
                    setComment(responseData.comments);
                    //setIsLoading(false);
                } catch (err) {
                    console.log(err);
    
                }
            };
            fetchComments();
    }, [articleID]);
    // if (isLoading) {
    //     return <h1>Please wait while loading Articles...</h1>;
    //     }
    if (!comment) {
        return <h1>Article not found</h1>;
    }
    return (
        <div className='flex gap-4'>
            <div>
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Comments</h1>
                <div className="flex flex-wrap gap-2">
                    {comment.map((comm) => (
                        <Card key={comment._id} className="w-full max-w-sm">
                            <div className="flex flex-col">
                                <div className="flex-1">
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <p className="mt-2 text-base text-gray-500">
                                                {comm.Comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );


};
export default GetArticleComments;