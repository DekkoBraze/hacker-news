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
    newsItemPk?: number;
    comments: IComment[];
    fetchNewsItem: () => void;
}

export default function CommentsList(props: IProps) {    
    const [answeringOnCommentPk, setAnsweringOnCommentPk] = useState<number>(0);
    const [lookingCommentThreadPk, setLookingCommentThreadPk] = useState<number>(0);

    function commentsListType() {
        if (props.newsItemPk) {
          return 'commentToNewsItem'
        } else {
          return 'commentToComment'
        }
    }
    
    function commentsCount(comments: IComment[]): number {
        var c = 0
        comments.map((comment) => {
            c += 1
            if (comment.children_comments.length !== 0) {
                c += commentsCount(comment.children_comments)
            }
        })
        return c
    }

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
        <Box className={commentsListType()}>
            {commentsListType() === 'commentToNewsItem' && (
                <Box>
                    <Box display='inline-flex'>
                    <Typography variant="h4" gutterBottom color='black' marginLeft={3} marginTop={2} >
                        Комментарии ({commentsCount(props.comments)})
                    </Typography>
                        <Button 
                        variant="outlined" 
                        sx={{marginBottom: 2, marginTop: 2}} 
                        onClick={() => props.fetchNewsItem()}>
                            Обновить
                        </Button>
                    </Box>
                    <Divider sx={{backgroundColor: "gray"}}/>
                </Box>
            )}
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
                            <Button variant="outlined" onClick={() => handleAnswerComment(comment.pk)}>Ответить</Button>
                            {comment.children_comments.length !== 0 && (
                                <Button variant="outlined" sx={{marginLeft: 1}} onClick={() => handleCommentThread(comment.pk)}>Раскрыть ветку</Button>
                            )}
                        </Box>
                        {comment.pk === answeringOnCommentPk && (
                            <CommentBox commentPk={comment.pk} fetchNewsItem={props.fetchNewsItem}/>
                        )}
                        {comment.pk === lookingCommentThreadPk && (
                            <CommentsList comments={comment.children_comments} fetchNewsItem={props.fetchNewsItem}/>
                        )}
                    <Divider sx={{backgroundColor: "gray"}}/>
                    </Box>
                )
            })}
            </Stack>
        </Box>
    );
}