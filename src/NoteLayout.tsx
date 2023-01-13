import React from 'react'
import { Note } from './App'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

type NoteLayoutProp = {
    notes: Note[]
}

const NoteLayout = ({notes}:NoteLayoutProp) => {
    const {id} = useParams()

    const note = notes.find(n => n.id === id)

    if(note == null) return <Navigate to="/" replace/>

  return (
    <Outlet context={note}/>  
  )
}

export function useNote() {
    return useOutletContext<Note>() 
}

export default NoteLayout;