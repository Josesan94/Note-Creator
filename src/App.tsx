
import React, { useMemo } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom' 
import {Container} from '@chakra-ui/react'
import NewNote from './NewNote';
import NoteList from './NoteList';
import { useLocalStorage } from './useLocalStorage';
import {v4 as uuidV4} from 'uuid'
import NoteLayout from './NoteLayout';
import Note from './Note';
import EditNote from './EditNote';


export type Note = {
  id:string;
} & NoteData

export type NoteData = {
  title:string;
  markdown:string;
  tags: Tag[]
}

export type Tag = {
  id:string;
  label:string
}

export type RawNote = {
  id:string;
} & RawNoteData

export type RawNoteData = {
  title:string;
  markdown:string;
  tagIds: string[]
  
}


function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      return {...note, tags:tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = ({tags,...data}:NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map((tag)=> tag.id)}]
    })
  }

  const onUpdateNote = (id:string, {tags, ...data}:NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note =>  {
        if(note.id === id) {
          return {...note, ...data, tagIds: tags.map((tag)=> tag.id)}
        } else {
          return note
        }
      } )
    })
  }


  const addTag = (tag:Tag) => {
    setTags(prev => [...prev, tag])
  } 

  return (

  <Container marginY={5} padding={10}   maxW="2xl"  >
    <Routes >
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags}/>}/> 
      <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
        <Route index element={<Note/>} />
        <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>
    </Routes>
  </Container>  

  )
}

export default App
