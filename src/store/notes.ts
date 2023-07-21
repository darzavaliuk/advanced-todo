import {makeAutoObservable} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

export type Note = {
    id: string
    title: string
    description: string
    tags: string[]
}

class Notes {
    notes: Note[] = []
    tagFilter: string[] = []
    tags: string[] = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
        makePersistable(this, {
            name: 'NotesStore',
            properties: ['notes'],
            storage: window.localStorage,
        })
    }

    addNote(newNote: Note) {
        this.notes.unshift(newNote)
    }

    deleteNote(id: string) {
        this.notes = this.notes.filter((note) => note.id !== id)
    }

    updateNote(updatedNote: Note) {
        this.notes.forEach((note, index) => {
            if (note.id === updatedNote.id) {
                this.notes[index] = updatedNote
            }
        })
    }

    addTagToFilter(tag: string) {
        this.tagFilter.push(tag)
        this.tagFilter = this.tagFilter.filter(
            (element, index) => this.tagFilter.indexOf(element) === index,
        )
    }

    removeTagFromFilter(removedTag: string) {
        this.tagFilter = this.tagFilter.filter((tag) => tag !== removedTag)
    }

}

const notes = new Notes()
export default notes
