import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

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
        <Box>
            <List>
            {news.map(newsItem => {
                return (
                    <Box>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={newsItem.title} />
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
