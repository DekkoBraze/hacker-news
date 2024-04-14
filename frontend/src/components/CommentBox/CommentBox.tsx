import { useState } from "react";
import './CommentBox.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ICommentBoxProps {
    newsItemPk?: number;
    commentPk?: number;
    fetchNewsItem: () => void;
}

export default function CommentBox(props: ICommentBoxProps) {
    const [commentText, setCommentText] = useState('')
    const [commentAuthor, setCommentAuthor] = useState('')
    const commentBoxType: () => string = () => {
      if (props.newsItemPk) {
        return 'commentToNewsItem'
      } else {
        return 'commentToComment'
      }
    }

    function handleCommentAuthor(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentAuthor(e.target.value)
    }

    function handleCommentText(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentText(e.target.value)
    }

    function handleSendingComment() {
      if (commentAuthor !== '' && commentText !== '') {
        if (props.commentPk) {
          var commentToCommentJsonData = {
            author: commentAuthor,
            text: commentText,
            commentPk: props.commentPk,
          }
          fetch('/api/post_comment_to_comment/', {
            method: 'POST',
            body: JSON.stringify(commentToCommentJsonData),
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message === 'OK') {
                setCommentAuthor('')
                setCommentText('')
                props.fetchNewsItem()
              } else {
                  console.log(data.message)
              }})
            .catch((error) => {
              console.log(error)
            })
        } else {
          var commentToNewsItemJsonData = {
            author: commentAuthor,
            text: commentText,
            newsItemPk: props.newsItemPk,
          }
          fetch('/api/post_comment_to_news_item/', {
            method: 'POST',
            body: JSON.stringify(commentToNewsItemJsonData),
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message === 'OK') {
                setCommentAuthor('')
                setCommentText('')
                props.fetchNewsItem()
              } else {
                  console.log(data.message)
              }})
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }

  return (
    <Box className={commentBoxType()} >
            <Stack padding={3} spacing={2}>
                <Typography variant="h4" gutterBottom color='black'>
                    Оставить комментарий
                </Typography>
                <TextField 
                    id="outlined-basic" 
                    label="Никнейм" 
                    variant="outlined" 
                    sx={{width: '25%'}} inputProps={{ maxLength: 32 }}
                    value={commentAuthor}
                    onChange={handleCommentAuthor}/>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Текст комментария"
                    multiline
                    maxRows={4}
                    inputProps={{ maxLength: 255 }}
                    value={commentText}
                    onChange={handleCommentText}
                />
                <Box sx={{display: 'flex', justifyContent:'flex-end'}}>
                    <Button variant="outlined" sx={{width: '25%'}} onClick={handleSendingComment}>Отправить</Button>
                </Box>
            </Stack>
    </Box>
  );
}