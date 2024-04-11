import { useState } from "react";
import './CommentBox.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ICommentBoxProps {
    newsItemPk: string
}

export default function CommentBox(props: ICommentBoxProps) {
    const [commentText, setCommentText] = useState('')
    const [commentAuthor, setCommentAuthor] = useState('')

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
          newsItemPk: props.newsItemPk,
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
            if (data.message === 'OK') {
              setCommentAuthor('')
              setCommentText('')
            } else {
                console.log(data.message)
            }})
          .catch((error) => {
            console.log(error)
          })
      }


  return (
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