import './CommentsList.css'
import { IComment } from '../../Interfaces'
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IProps {
    comments: IComment[];
}

export default function CommentsList(props: IProps) {    

    return (
        <Box className='commentsList'>
            <Typography variant="h4" gutterBottom color='black' margin={3}>
                    Комментарии ({props.comments.length})
            </Typography>
            <Divider sx={{backgroundColor: "gray"}}/>
            <Stack>
            {props.comments.map(comment => {
                return (
                    <Box key={comment.pk} margin={1}>
                        <Typography variant="h6" gutterBottom color='black'>
                            {comment.text}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom color='gray'>
                            {comment.author + ' | ' + new Date(comment.time_create).toLocaleDateString('en-GB')}
                        </Typography>
                        <Box sx={{marginBottom: 1}}>
                        <Link to='/' style={{textDecoration: 'none'}}>Раскрыть ветку</Link>
                        <Link to='/' style={{marginLeft: 10, textDecoration: 'none'}}>Ответить</Link>
                        </Box>
                    <Divider sx={{backgroundColor: "gray"}}/>
                    </Box>
                )
            })}
            </Stack>
        </Box>
    );
}