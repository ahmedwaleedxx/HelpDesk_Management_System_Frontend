import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';

const GetArticleByID = () => {
    const [article, setArticle] = useState(null);
    const [comment, setComment] = useState(null);
    //const [isLoading, setIsLoading] = useState(true);

    const parms = useParams();
    const articleID = parms.id;

        const DeleteArticle = async (articleID) => {
        try {
            const response = await fetch(`https://supsys.azurewebsites.net/api/article/deleteArticle/${articleID}`,
                {
                    method: 'DELETE'
                }
            );
            //const responseData = await response.json();
            if (!response.ok) {
                throw new Error(response.message);
            }
            setArticle(response.article);
            //setIsLoading(false);
        } catch (err) {
            console.log(err);

        }
    };
    useEffect(() => {

        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://supsys.azurewebsites.net/api/article/getArticle/${articleID}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setArticle(responseData.article);
                //setIsLoading(false);
            } catch (err) {
                console.log(err);

            }
        };

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
       



        fetchArticles();
        fetchComments();
    }, [articleID]);

    // if (isLoading) {
    //     return <h1>Please wait while loading Articles...</h1>;
    //     }
    if (!article) {
        return <h1>Article not found</h1>;
    }



    return (
        <div className='flex gap-4 flex-row'>

            <div>
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h1>
                <p class="font-normal text-gray-700 dark:text-gray-400">{article.content}</p>
                <div className="flex flex-wrap gap-2">
                    <div>
                        <Button className='mb-3' href={'/addComment/' + article._id}>
                            Add Comment On article
                        </Button>



                        <Button onSubmit={DeleteArticle(article._id)}>
                            Delete Article
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex gap-4'>
            <div>
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Comments</h1>
                <div className="flex gap-2">
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
        </div>
        
    );

};


export default GetArticleByID;