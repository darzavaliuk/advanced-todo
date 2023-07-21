import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import {Button, CardActions, CardContent} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Tag from './Tag/Tag'
import {useEffect, useState} from 'react'
import NoteForm from '../../NoteForm/NoteForm'
import notesStore from '../../../../store/notes'
import '../../../note.css'
import {Close} from "@mui/icons-material";

type Props = {
    key: string
    id: string
    title: string
    description: string
    tags: string[]
}

const Note = ({id, title, description, tags}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [myDescription, setMyDescription] = useState('')
    const [myTitle, setMyTitle] = useState('')

    useEffect(() => {
        const newTitle = title.split(' ').map(word => {
            if (word.startsWith('#')) {
                console.log(word)
                return `<span>${word}</span>`
            }
            return word
        }).join(' ')
        setMyTitle(newTitle)
    }, [title])

    useEffect(() => {
        const newDescription = description.split(' ').map(word => {
            if (word.startsWith('#')) {
                console.log(word)
                return `<span>${word}</span>`
            }
            return word
        }).join(' ')
        setMyDescription(newDescription)
    }, [description])

    return (

        <Card style={{
            backgroundColor: "#f0ecfc",
            borderRadius: "30px"
        }}>
            <CardContent>
                <div style={{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
                    <Typography gutterBottom variant="h5" component="div"
                                style={{fontSize: "30px", color: "#2b003d", maxWidth: "90%", wordBreak: "break-all"}}>
                        <div className="title" dangerouslySetInnerHTML={{__html: myTitle}}/>
                    </Typography>
                    <IconButton
                        color="error"
                        title="Delete"
                        style={{marginBottom: "auto"}}
                        onClick={() => {
                            notesStore.deleteNote(id)
                        }}
                    >
                        <Close/>
                    </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary" style={{wordBreak: "break-all"}}>
                    <div className="descript" dangerouslySetInnerHTML={{__html: myDescription}}/>
                </Typography>
                {tags.map((tag) => (
                    <Tag key={tag} tag={tag}/>
                ))}
            </CardContent>
            <CardActions>
                <Button
                    color="secondary"
                    style={{width: "100%"}}
                    title="Edit"
                    onClick={() => {
                        setEditMode(!editMode)
                    }}
                >
                    Edit
                </Button>

            </CardActions>
            {editMode && <NoteForm closeForm={() => setEditMode(false)} id={id}/>}
        </Card>
    )
}

export default Note
