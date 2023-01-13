import React from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag } from './App'

type NewNoteProps = {
  onSubmit: (data:NoteData) => void;
  onAddTag:(tag:Tag) => void;
  availableTags: Tag[];
}

const NewNote = (props: NewNoteProps) => {

  const {onSubmit, onAddTag, availableTags} = props;
  return (
    <>
    <div>NewNote</div>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote