import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import './NewsItem.css'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
    const [commentText, setCommentText] = useState('')
    const [commentAuthor, setCommentAuthor] = useState('')
    
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

    function handleCommentAuthor(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentAuthor(e.target.value)
    }

    function handleCommentText(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentText(e.target.value)
    }

    function handleSendingComment() {
        var itemJsonData = {
          author: commentAuthor,
          text: commentText,
          newsItemPk: newsItemPk,
        }
        fetch('/api/post_comment/', {
          method: 'POST',
          body: JSON.stringify(itemJsonData),
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message !== 'OK') {
              console.log(data.message)
            }})
          .catch((error) => {
            console.log(error)
          })
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
            <Box className='commentBox' >
            <Stack padding={3} spacing={2}>
                <Typography variant="h4" gutterBottom color='black'>
                    Оставить комментарий
                </Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Никнейм" 
                    variant="outlined" 
                    sx={{width: '25%'}} inputProps={{ maxLength: 32 }} 
                    onChange={handleCommentAuthor}/>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Текст комментария"
                    multiline
                    maxRows={4}
                    inputProps={{ maxLength: 255 }}
                    onChange={handleCommentText}
                />
                <Box sx={{display: 'flex', justifyContent:'flex-end'}}>
                    <Button variant="outlined" sx={{width: '25%'}} onClick={handleSendingComment}>Отправить</Button>
                </Box>
            </Stack>
            </Box>
            <Box className='commentsList'>
            </Box>
        </Box>
    );
}