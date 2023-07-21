import React from 'react'
import Note from './Note/Note'
import {Autocomplete, Box, Button, Grid, IconButton, Input, TextField} from '@mui/material'
import notesStore from '../../../store/notes'
import {observer} from 'mobx-react-lite'
import tagsStore from "../../../store/tags";


const Notes = observer(() => {
    const options = [
        ...tagsStore.tags
    ];

    function filterTags(reason: string, details: any) {
        if (reason === "selectOption") {
            // @ts-ignore
            notesStore.addTagToFilter(details.option)
        } else if (reason === "removeOption") {
            // @ts-ignore
            notesStore.removeTagFromFilter(details.option)
        }
    }

    return (
        <div>
            <Autocomplete
                multiple
                disableClearable={true}
                color="secondary"
                id="tags-outlined"
                size="medium"
                options={options}
                value={notesStore.tagFilter}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                style={{borderRadius: "30px"}}
                onChange={(event, value, reason, details) => filterTags(reason, details)}
                renderInput={(params) => (
                    <TextField
                        color="secondary"
                        {...params}
                        label="#tags"
                        placeholder="tags"
                        style={{borderRadius: "30px"}}
                    />

                )}
            />
            <Box sx={{flexGrow: 1}} mt={2}>
                <Grid container spacing={4}>
                    {notesStore.notes
                        .filter((note) => {
                            let flag = true
                            notesStore.tagFilter.forEach((tag) => {
                                if (!note.tags.includes(tag)) {
                                    flag = false
                                    return
                                }
                            })
                            return flag
                        })
                        .map((note) => (
                            <Grid item xs={12} md={6}>
                                <Note
                                    key={note.id}
                                    id={note.id}
                                    title={note.title}
                                    description={note.description}
                                    tags={note.tags}
                                />
                            </Grid>
                        ))}


                </Grid>
            </Box>
        </div>
    )
})

export default Notes
