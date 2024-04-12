import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
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

    useEffect(() => {
        fetchNewsItem()
    }, [newsItemPk]);

    function fetchNewsItem() {
        fetch('/api/get_news_item/' + newsItemPk)
        .then(response => response.json())
        .then(data => {
            var correctItemNewsData = {
                ...data.itemNewsData,
                time_create: new Date(data.time_create),
                time_update: new Date(data.time_update)
            }
            setNewsItem(correctItemNewsData)
            setComments(data.comments)
        })
        .catch(error => console.error(error));
    }
    
    return (
        <Box>
            <Box className='articleWindow'>
            <Box margin='50px'>
                <Typography className="articleText" variant="h3" gutterBottom>
                    {newsItem.title}
                </Typography >
                <Box display="flex" marginTop={-2} color="gray">
                    <Typography variant="subtitle1" gutterBottom>
                        Автор: {newsItem.author}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom marginLeft={5}>
                        Дата публикации: {newsItem.time_create?.toLocaleDateString('en-GB')}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom marginLeft={5}>
                        Рейтинг: {newsItem.rating}
                    </Typography>
                </Box>
                <Divider className='divider'/>
                <Typography className="articleText" variant="body1" gutterBottom>
                    {newsItem.text}
                </Typography>
            </Box>
            </Box>
            <CommentBox newsItemPk={newsItemPk!} fetchNewsItem={fetchNewsItem} />
            <CommentsList comments={comments}/>
        </Box>
    );
}