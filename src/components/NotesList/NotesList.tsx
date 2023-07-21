import {Button, IconButton} from "@mui/material";
import React, {useState} from "react";
import Notes from "./Notes/Notes";
import NoteForm from "./NoteForm/NoteForm";
import Add from '@mui/icons-material/Add';

const NotesList = () => {
    const [isFromCreate, setIsFromCreate] = useState(false)
    
    return (
        <div className="App">
            <div className="Add-note">
                <IconButton color="secondary" size="large" title="Add">
                    <Button variant="text" color="secondary" startIcon={<Add/>} className="btn-add"
                            onClick={() => {
                                setIsFromCreate(!isFromCreate)
                            }}
                    >Create</Button>
                </IconButton>
            </div>
            {isFromCreate && (
                <NoteForm
                    closeForm={() => {
                        setIsFromCreate(false)
                    }}
                />
            )}
            <Notes/>
        </div>
    )
}

export default NotesList