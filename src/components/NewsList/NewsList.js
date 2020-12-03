
import { useState, useEffect } from "react";
import { getLatestNews, searchNewsByKeyword } from "./../../services/news"
import './NewsList.css';

const NewsList = (() => {
    const [news, setNews] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        async function getNews() {
            try {
                setLoader(true);
                setError(false);
                let result = await getLatestNews();
                setNews(result.data);
                setLoader(false);
                // console.log(result);
            } catch (e) {
                setLoader(false);
                setError(true);
                // console.log();
            }
        }
        getNews();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            setError(false);
            let result = await searchNewsByKeyword(keyword);
            setNews(result.data);
            setLoader(false);
            // console.log(result);
        } catch (e) {
            setLoader(false);
            setError(false);
            // console.log(e);
        }

        // alert('A name was submitted: ' + keyword);
    }

    return (
        <div className="NewsList" data-test="component-news-list">
            <form onSubmit={handleSubmit}>
                <label>
                    Keyword:
                        <input required type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </label>
                <input type="submit" disabled={loader} value={"Submit"} />
            </form>

            {news ? <p><strong>Total Results:</strong> <span data-test="total-results"> {news.totalResults} </span>  </p> : ''}

            {loader ? <p>Loading ...</p> : ""}

            {error ? <p className="error"> Something went wrong. Pleasae try again later.</p> : ''}

            {news ? news.articles.map((item) => {
                return (
                    <div className="NewsItem" key={`${item.source.id}-div`}>
                        <h4> <a rel="noreferrer" target="_blank" href={`${item.url}`}>{item.title}</a></h4>
                        <p>{item.description}</p>
                        {item.author ? <p><strong>Author: </strong> {item.author} </p> : ''}
                        {item.publishedAt ? <p><strong>Published On: </strong> {(new Date(item.publishedAt)).toString()} </p> : ''}
                        {item.urlToImage ? <p> <img width="70%" alt={item.author} src={item.urlToImage}></img> </p> : ''}
                    </div>
                )
            }) : null}
        </div>
    )
});

export default NewsList;
