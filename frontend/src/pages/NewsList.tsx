import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

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
        fetch('/api/get_news_list/')
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
                    <Box key={newsItem.pk}>
                    <ListItem disablePadding>
                        <ListItemButton href={"/item/" + newsItem.pk}>
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
