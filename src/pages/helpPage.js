import React, { useEffect, useState} from 'react';
//import { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { Button } from 'flowbite-react';



const HelpPage = () => {

    const [article, setArticle] = useState(null);



    useEffect(() => {
        
        const fetchArticles = async () => {
           try{
            const response = await fetch(`https://supsys.azurewebsites.net/api/article/getArticles`);
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
            setArticle(responseData.articles);
            //setIsLoading(false);
        } catch (err) {
            console.log(err);

        }
    };
    fetchArticles();

}, []);

    return (
        <div className='flex gap-4'>
            
            {article.map((articles) => (
                <Card href={'help/article/' + articles._id }>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {articles.title}
                  
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {articles.content}
                </p>
                
              </Card>
                

        ))}
                      <div>
        <Button href={'/help/createArticle'} className="flex flex-col items-center justify-center w-full p-6 space-y-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
        Create Article
        </Button>
        </div>      
        </div>

    );


};



export default HelpPage;
