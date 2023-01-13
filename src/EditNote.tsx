import React from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag } from './App'
import { Text } from '@chakra-ui/react'
import { useNote } from './NoteLayout'

type EditNoteProps = {
  onSubmit: (id:string, data:NoteData) => void;
  onAddTag:(tag:Tag) => void;
  availableTags: Tag[];
}

const EditNote = (props: EditNoteProps) => {

  const note = useNote()

  const {onSubmit, onAddTag, availableTags} = props;
  return (
    <>
    <Text fontSize="2xl">Edit Note</Text>
    <NoteForm onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default EditNote