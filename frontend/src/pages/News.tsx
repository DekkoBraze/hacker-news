import { useEffect, useState } from "react";

export default function News() {    
    interface INewsItem {
        id: number;
        title: string;
        author: string;
        rating: number;
        time_create: Date;
        time_update: Date;
      }

    const [news, setNews] = useState<INewsItem[]>([]);

    useEffect(() => {
        fetch('/api/get_news/')
        .then(response => response.json())
        .then(data => {
            setNews(data)
        })
        .catch(error => console.error(error));
    }, []);
      

    return (
        <div className="main">
            {news.map(newsItem => {
                return <h2 className="newsItem">{newsItem.title}</h2>
            })}
        </div>
    );
}
