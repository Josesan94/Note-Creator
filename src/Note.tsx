import React from 'react'
import { useNote } from './NoteLayout'
import { Badge, Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type NoteProps = {
  onDelete: (id:string) => void;
} 

const Note = ({onDelete}:NoteProps) => {

  

    const note = useNote()

  return (
    <>
      <Box>
        <HStack justifyContent="space-between" alignItems="center">
          <Stack>
          <Text fontSize='5xl'>{note.title}</Text>
          {note.tags.length > 0 ? (
            <HStack gap={1} display="flex-wrap" justifyContent="center">
              {note.tags.map(tag => (
                <Badge key={tag.id} ml='1' colorScheme='green' variant='solid'>
                  <Text fontStyle="text-truncate">{tag.label}</Text>
                  </Badge>
              ))}
            </HStack>
          ) : ""}
        <ReactMarkdown>
          {note.markdown}
        </ReactMarkdown>
        </Stack>
        <HStack>
        <Link to={`/${note.id}/edit`}>
            <Button background="teal.500">Edit</Button>
        </Link>
        <Button colorScheme='red' variant='outline' onClick={() => onDelete(note.id)}>Delete</Button>
        <Link to="/">
        <Button colorScheme='teal' variant='link'>
          Back
        </Button>
        </Link>
        </HStack>
        </HStack>
      </Box>
    </>
  )
}

export default Note;