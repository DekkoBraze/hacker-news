import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
        <div>
            {newsItem.title}
        </div>
    );
}