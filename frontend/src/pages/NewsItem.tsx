import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

    const { newsItemPk } = useParams()
    const [newsItem, setNewsItem] = useState<INewsItem>({});
    
    useEffect(() => {
        fetch('/api/get_news_item/' + newsItemPk)
        .then(response => response.json())
        .then(data => {
            setNewsItem(data)
        })
        .catch(error => console.error(error));
    }, []);
      

    return (
        <Box sx={{width: '80%', margin: '0 auto', backgroundColor: 'darkslategray', borderRadius: '15px'}}>
            <Box margin='50px'>
                <Typography variant="h3" gutterBottom>
                    {newsItem.title}
                </Typography >
                <Box display="flex" marginTop={-2} color="gray">
                    <Typography variant="subtitle1" gutterBottom>
                        Автор: {newsItem.author}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom marginLeft={5}>
                        Рейтинг: {newsItem.rating}
                    </Typography>
                </Box>
                <Divider sx={{backgroundColor: "white"}}/>
                <Typography variant="body1" gutterBottom>
                    {newsItem.text}
                </Typography>
            </Box>
        </Box>
    );
}