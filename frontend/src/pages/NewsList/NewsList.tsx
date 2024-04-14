import { useEffect, useState } from "react";
import './NewsList.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NewsList() {    
    
    interface INewsItemPreview {
        pk: number;
        title: string;
        author: string;
        rating: number;
        time_create: Date;
      }

    const [news, setNews] = useState<INewsItemPreview[]>([]);

    useEffect(() => {
        fetchNewsList()
        setInterval(fetchNewsList, 60000);
    }, []);

    function fetchNewsList() {
        fetch('/api/get_news_list/')
        .then(response => response.json())
        .then(data => {
            setNews(data)
            console.log('update')
        })
        .catch(error => console.error(error));
    }

    return (
        <Box>
            <Button 
                variant="outlined" 
                sx={{marginBottom: 2, marginTop: 2}} 
                onClick={() => fetchNewsList()}>
                    Обновить
            </Button>
            <List>
            {news.map(newsItem => {
                return (
                    <Box key={newsItem.pk}>
                    <ListItem disablePadding>
                        <ListItemButton href={"/item/" + newsItem.pk}>
                            <ListItemText 
                            className='listItem' 
                            primary={newsItem.title} 
                            secondary={newsItem.author + ' | ' + newsItem.rating + ' | ' + new Date(newsItem.time_create).toLocaleDateString('en-GB')}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{backgroundColor: "gray"}}/>
                    </Box>
                )
            })}
            </List>
        </Box>
    );
}
