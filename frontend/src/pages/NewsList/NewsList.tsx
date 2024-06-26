import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './NewsList.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NewsList() {    
    
    // Интерфейс новости в списке на главной странице
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
        // Обновляем данные каждую минуту
        setInterval(fetchNewsList, 60000);
    }, []);

    function fetchNewsList() {
        fetch('/api/get_news_list/')
        .then(response => response.json())
        .then(data => {
            setNews(data)
        })
        .catch(error => console.error(error));
    }

    return (
        <Box>
            <Button 
                variant="outlined" 
                sx={{margin: 1}}
                onClick={() => fetchNewsList()}>
                    Обновить
            </Button>
            <Divider sx={{backgroundColor: "gray", marginBottom: -1}}/>
            <List>
            {news.map(newsItem => {
                return (
                    <Box key={newsItem.pk}>
                    <ListItem disablePadding>
                        <ListItemButton LinkComponent={props => <Link {...props} to={"/item/" + newsItem.pk}/>} href={"/item/" + newsItem.pk} >
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
