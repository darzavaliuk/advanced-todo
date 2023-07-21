import {ChangeEvent, useEffect, useState} from 'react'
import {
    Button,
    FormControl,
    FormHelperText,
    TextField,
} from '@mui/material'
import {v4 as uuidv4} from 'uuid'
import Tag from '../Notes/Note/Tag/Tag'
import "../notes.css"
import notesStore, {Note} from '../../../store/notes'
import tagsStore from "../../../store/tags";
import {observer} from 'mobx-react-lite'

type Props = {
    closeForm: () => void
    id?: string
}

const NoteForm = observer(({closeForm, id = ''}: Props) => {
    let [inputError, setInputError] = useState(false)
    const note = notesStore.notes.find((note) => note.id === id)
    const [title, setTitle] = useState(note?.title || '')
    const [description, setDescription] = useState(note?.description || '')
    const [tags, setTags] = useState(note?.tags || ([] as string[]))
    const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        let newTags: string[] = []
        const descriptionArray = description.split(/[^#\wА-Яа-я]+/g)
        descriptionArray.forEach((item) => {
            if (item[0] === '#' && item.length > 1) {
                newTags.push(item)
            }
        })
        const titleArray = title.split(/[^#\wА-Яа-я]+/g)
        titleArray.forEach((item) => {
            if (item[0] === '#' && item.length > 1) {
                newTags.push(item)
            }
        })
        newTags = newTags.filter((element, index) => {
            return newTags.indexOf(element) === index
        })
        setTags(newTags)
    }, [description, title])


    const updateNoteToNotes = () => {
        if (title.length > 0 && note) {
            const updatedNote: Note = {
                id: note.id,
                title: title,
                description: description,
                tags: tags,
            }
            tagsStore.addTag(tags)
            notesStore.updateNote(updatedNote)
            closeForm()
        } else {
            setInputError(true)
        }
    }

    const addNoteToNotes = () => {
        if (title.length > 0) {
            const newNote: Note = {
                id: uuidv4(),
                title: title,
                description: description,
                tags: tags,
            }
            tagsStore.addTag(tags)
            notesStore.addNote(newNote)
            closeForm()
        } else {
            setInputError(true)
        }
    }

    return (
        <form action="">
            <div style={{marginLeft: "auto", marginRight: "auto", width: "95%",}}>
                <FormControl error={inputError} variant="standard" fullWidth={true}>
                    <TextField
                        size="small"
                        label="Title"
                        defaultValue={title}
                        fullWidth={true}
                        multiline
                        color="secondary"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setInputError(false)
                            setTitle(e.target.value)
                        }}
                    />
                    {inputError && (
                        <FormHelperText id="component-error-text">
                            Заголовок не может быть пустым
                        </FormHelperText>
                    )}
                </FormControl>
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto", width: "95%", marginTop: "5px"}}>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    fullWidth={true}
                    rows={4}
                    color="secondary"
                    style={{marginLeft: "auto", marginRight: "auto", marginBottom: "5px", marginTop: "5px"}}
                    defaultValue={description}
                    onChange={onDescriptionChange}
                />
            </div>
            {
                tags.map((tag) => (
                    <Tag key={tag} tag={tag}/>
                ))
            }
            <div>
                {note ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{width: "100%", marginTop: "5px"}}
                        onClick={() => {
                            updateNoteToNotes()
                        }}
                    >
                        Ok
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{width: "100%", marginBottom: "10px", marginTop: "5px"}}

                        onClick={() => {
                            addNoteToNotes()
                        }}
                    >
                        Add
                    </Button>
                )}
            </div>
        </form>
    )
})

export default NoteForm
