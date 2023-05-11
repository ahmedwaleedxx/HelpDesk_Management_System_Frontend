import React from "react";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

const AddArticleComment = () => {

    const [comment, setComment] = useState("");
    
    const parms = useParams();
    const articleID = parms.id;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://supsys.azurewebsites.net/api/article/addComment/${articleID}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",

                        },
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkzMWNmNmFlY2ZhMjg1YWRiMjdmYmEiLCJ1c2VyVHlwZSI6InN1cHBvcnRhZ2VudCIsImVtYWlsIjoic3VwcG9ydGFnZW50MUBzdXBwb3J0YWdlbnRzLmNvbSIsImlhdCI6MTY3MDc2Mzk0NCwiZXhwIjoxNjcwNzY3NTQ0fQ.Tu7_Y3a2fmeM5iyrvmld3au9kNIVAslM8KWgaTaMJTk",
                        body: JSON.stringify({
                            comment: comment,
                        }),
                    }
                );
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setComment(responseData.comment);
                //setIsLoading(false);
            } catch (err) {
                console.log(err);

            }


        };
        fetchArticles();

    }, [articleID, comment]);


    return (
        <div>
            <h1>Add Comment</h1>
            <form>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        type="text"
                        id="comment"
                        name="comment"  
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
    };

export default AddArticleComment;