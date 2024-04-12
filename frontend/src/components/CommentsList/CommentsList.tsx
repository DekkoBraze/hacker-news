import './CommentsList.css'
import { IComment } from '../../Interfaces'
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
            <List>
            {props.comments.map(comment => {
                return (
                    <Box key={comment.pk}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText 
                            className='listItem' 
                            primary={comment.text} 
                            secondary={comment.author + ' | ' + comment.time_create}/>
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