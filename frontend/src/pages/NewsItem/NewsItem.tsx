import { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom'
import Link from '@mui/material/Link';
import './NewsItem.css'
import { IComment, INewsItem } from '../../Interfaces'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommentBox from '../../components/CommentBox/CommentBox'
import CommentsList from '../../components/CommentsList/CommentsList'


export default function NewsItem() {          
    const { newsItemPk } = useParams<string>()
    const [newsItem, setNewsItem] = useState<INewsItem>({});
    const [comments, setComments] = useState<IComment[]>([]);

    const fetchNewsItem = useCallback(() => {
        fetch('/api/get_news_item/' + newsItemPk)
        .then(response => response.json())
        .then(data => {
            var correctItemNewsData = {
                ...data.itemNewsData,
                time_create: new Date(data.itemNewsData.time_create),
                time_update: new Date(data.itemNewsData.time_update)
            }
            setNewsItem(correctItemNewsData)
            setComments(data.comments)
        })
        .catch(error => console.error(error));
    }, [newsItemPk])

    useEffect(() => {
        fetchNewsItem()
    }, [fetchNewsItem]);
    
    return (
        <Box>
            <Box className='articleWindow'>
            <Box margin='4vmin'>
                <Typography className="articleTitle" sx={{fontSize: '4vh'}} variant="h3" gutterBottom>
                    {newsItem.title}
                </Typography >
                <Box className='subtitleBox'>
                    <Typography sx={{fontSize: '2vh'}} variant="subtitle1" gutterBottom>
                        Автор: {newsItem.author} 
                    </Typography>
                    <Typography sx={{fontSize: '2vh', marginLeft: '1vw'}} variant="subtitle1" gutterBottom>
                        Дата публикации: {newsItem.time_create?.toLocaleDateString('en-GB')} 
                    </Typography>
                    <Typography sx={{fontSize: '2vh', marginLeft: '1vw'}} variant="subtitle1" gutterBottom>
                        Рейтинг: {newsItem.rating}
                    </Typography>
                </Box>
                <Divider className='divider' sx={{marginBottom: 1}}/>
                <Link sx={{fontSize: '2vh', wordWrap: 'break-word'}} href={newsItem.news_link}>{newsItem.news_link}</Link>
            </Box>
            </Box>
            <CommentsList newsItemPk={newsItem.pk!} comments={comments} fetchNewsItem={fetchNewsItem} />
            <CommentBox newsItemPk={newsItem.pk!} fetchNewsItem={fetchNewsItem} />
        </Box>
    );
}
