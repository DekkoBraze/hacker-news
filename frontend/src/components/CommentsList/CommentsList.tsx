import { useState } from "react";
import './CommentsList.css'
import { IComment } from '../../Interfaces'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CommentBox from '../../components/CommentBox/CommentBox'

interface IProps {
    newsItemPk: number;
    comments: IComment[];
    fetchNewsItem: () => void;
}

export default function CommentsList(props: IProps) {    
    const [answeringOnCommentPk, setAnsweringOnCommentPk] = useState<number>(0);
    const [lookingCommentThreadPk, setLookingCommentThreadPk] = useState<number>(0);

    function handleAnswerComment(pk: number) {
        if (answeringOnCommentPk === pk) {
            setAnsweringOnCommentPk(0)
        } else {
            setAnsweringOnCommentPk(pk)
        }
    }

    function handleCommentThread(pk: number) {
        if (lookingCommentThreadPk === pk) {
            setLookingCommentThreadPk(0)
        } else {
            setLookingCommentThreadPk(pk)
        }
    }

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
                            <Button variant="outlined" onClick={() => handleCommentThread(comment.pk)}>Раскрыть ветку</Button>
                            <Button variant="outlined" sx={{marginLeft: 1}} onClick={() => handleAnswerComment(comment.pk)}>Ответить</Button>
                        </Box>
                        {comment.pk === answeringOnCommentPk && (
                            <CommentBox newsItemPk={props.newsItemPk} commentPk={comment.pk} fetchNewsItem={props.fetchNewsItem}/>
                        )}
                        {comment.pk === lookingCommentThreadPk && (
                            <CommentsList newsItemPk={props.newsItemPk} comments={comment.children_comments} fetchNewsItem={props.fetchNewsItem}/>
                        )}
                    <Divider sx={{backgroundColor: "gray"}}/>
                    </Box>
                )
            })}
            </Stack>
        </Box>
    );
}