import React, { useMemo, useState } from 'react'
import { Stack, Box, HStack, Button, Text,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Textarea, 
    Grid,
    Card,
    CardHeader, CardBody, CardFooter, Badge } from '@chakra-ui/react'
import { Formik,Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Note, Tag } from './App'

type SimplifiedNote = {
  tags: Tag[];
  title:string;
  id:string
}

type NoteListProps = {
  availableTags : Tag[]
  notes:SimplifiedNote[]
}

const NoteList = (props: NoteListProps) => {
  const {availableTags, notes} = props;


  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle ] = useState<string>("")


  const filteredNotes = useMemo(()=> {

    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })

  }, [title, selectedTags, notes])

  return (
    <>
    <Box>
     <HStack justifyContent="space-between">
        <Text>Notes</Text>
        <HStack>
        <Link to="/new">
            <Button background="teal.500">Create</Button>
        </Link>
        <Button>Edit Tags</Button>
        </HStack>
     </HStack>
     <Stack display="grid">
     <Formik
          initialValues={{ title: "",  tags: [] }}
          onSubmit={(values, action) => {
            setTitle(values.title)
            action.setSubmitting(false)
          }}
        >
          {(props) => (
            <Form>
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={5} >
              <Field   name="title" >
                {({ field, form }: any) => (
                  <FormControl 
                    
                  >
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder="hola" />
                  </FormControl>
                )}
              </Field>
              
              <Field name="tags" style={{marginTop:"0px !important"}}>
                {({ field, form }: any) => (
                  <FormControl
                    style={{marginTop:"0px !important"}}
                    isRequired
                    isInvalid={form.errors.tags && form.touched.tags}
                    
                  >
                    <FormLabel>Tags</FormLabel>
                    <ReactSelect  
                      value={selectedTags.map((tag)=> {
                      return {
                        label:tag.label,
                        value:tag.id
                      }
                    })}
                      options={availableTags.map(tag => {
                        return {
                          label: tag.label,
                          value: tag.id}
                      })}
                      onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                          return {
                            label:tag.label,
                            id:tag.value
                          }
                        })
                      )}}
                      isMulti
                      placeholder='Tags'/> 
                  </FormControl>
                )}
              </Field>
              </Stack>
            </Form>
          )}
        </Formik>
        <Grid templateColumns='repeat(5, 1fr)' gap={6} >
            {filteredNotes.map(note => (
              <Stack key={note.id}>
                <NoteCard id={note.id} title={note.title} tags={note.tags}/>
              </Stack>
            ))}
        </Grid>
     </Stack>
    </Box>
    </>
  )
}

const NoteCard = ({id, title, tags}:SimplifiedNote) => {
  return (
    <Card 
      as={Link} 
      to={`/${id}`}
      maxW='sm'
      variant="elevated"
      >
      <CardBody>
        <Stack gap={2} alignItems="center" justifyContent="center" height="100%">
          <Text> {title}</Text>
          {tags.length > 0 ? (
            <HStack gap={1} display="flex-wrap" justifyContent="center">
              {tags.map(tag => (
                <Badge key={tag.id} ml='1' colorScheme='green' variant='solid'>
                  <Text fontStyle="text-truncate">{tag.label}</Text>
                  </Badge>
              ))}
            </HStack>
          ) : ""}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default NoteList;