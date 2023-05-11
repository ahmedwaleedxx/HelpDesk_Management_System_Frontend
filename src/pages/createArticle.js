import React from 'react';
import { useEffect} from 'react';
import { useState } from 'react';




const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

useEffect(() => {

    const fetchArticles = async () => {
        try {
            const response = await fetch(`https://supsys.azurewebsites.net/api/article/postArticle`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        content: content
                    })
                }
            );
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData);
        } catch (err) {
            console.log(err);
        }
    };
    fetchArticles();
}, [title, content]);

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    }   

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(title, content);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={titleChangeHandler} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" rows="5" onChange={contentChangeHandler} />
                </div>
                <div className="flex flex-col">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );


};

export default CreateArticle;