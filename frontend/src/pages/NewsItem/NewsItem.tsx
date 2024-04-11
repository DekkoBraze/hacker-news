import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import './NewsItem.css'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommentBox from '../../components/CommentBox/CommentBox'

export default function NewsItem() {    

    interface INewsItem {
        pk?: number;
        title?: string;
        text?: string;
        author?: string;
        rating?: number;
        time_create?: Date;
        time_update?: Date;
      }
      
    const { newsItemPk } = useParams<string>()
    const [newsItem, setNewsItem] = useState<INewsItem>({});
    
    
    useEffect(() => {
        fetch('/api/get_news_item/' + newsItemPk)
        .then(response => response.json())
        .then(data => {
            var correctData = {
                ...data,
                time_create: new Date(data.time_create),
                time_update: new Date(data.time_update)
            }
            setNewsItem(correctData)
        })
        .catch(error => console.error(error));
    }, [newsItemPk]);

    
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
            <CommentBox newsItemPk={newsItemPk!} />
            <Box className='commentsList'>
            </Box>
        </Box>
    );
}