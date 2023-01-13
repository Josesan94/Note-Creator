import React,{useRef, useState} from 'react'
import { Formik,Form, Field } from 'formik'
import {
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Select,
    Textarea
  } from '@chakra-ui/react'
import CreatableReactSelect from 'react-select/creatable'
import { Link, useNavigate } from 'react-router-dom'
import { NoteData, Tag } from './App'
import {v4 as uuidV4} from 'uuid'

type NoteFormProps = {
  onSubmit: (data:NoteData) => void;
  onAddTag:(tag:Tag) => void;
  availableTags: Tag[];
} & Partial <NoteData>



const NoteForm = ({onSubmit,onAddTag, availableTags, title= "", markdown = "", tags = []}:NoteFormProps) => {

  const titleRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLInputElement>(null)
  console.log(title)


  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  

  const navigate = useNavigate()

  const validateTitle = (value:any) => {
    let error
    if (!value) {
      error = 'title is required'
    } 
    return error
  }

  const validateTags = (value:string) => {
    let error
    if (value === " ") {
      error = 'tags are required'
    }
    return error
  }

  const handleSubmit = (values:any) => {
    onSubmit({
      title: values.title,
      markdown: values.markdown,
      tags: selectedTags
    })

    //vuelvo al lugar donde estaba
    navigate("..")
  }




  return (
    <>
      <Stack marginY={5} >
        <Formik
          initialValues={{ title: title, markdown:markdown,  tags: [] }}
          onSubmit={(values, action) => {
            handleSubmit(values)
            action.setSubmitting(false)
          }}
        >
          {(props) => (
            
            <Form>
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={5} >
              <Field   name="title" validate={validateTitle}>
                {({ field, form }: any) => (
                  
                  <FormControl      
                    isRequired
                    isInvalid={form.errors.title && form.touched.title}
                    ref={titleRef}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder="hola"  />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
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
                    <CreatableReactSelect 
                      onCreateOption={label => {
                        const newTag = {id:uuidV4(), label}
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                      }}
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
                      isMulti placeholder='Tags'/> 
                      <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </Stack>
              <Field name="markdown" >
                {({ field, form }: any) => (
                  <FormControl
                    defaultValue={markdown}
                    isRequired
                    isInvalid={form.errors.markdown && form.touched.markdown}
                    ref={textareaRef}
                  >
                    <FormLabel>Body</FormLabel>
                    <Textarea {...field} placeholder="Body" size='sm' />
                      <FormErrorMessage>{form.errors.markdown}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Save
              </Button>
              <Link to="..">
              <Button
                mt={4}
                mx={4}
                colorScheme="teal"
              >
                Cancel
              </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
}

export default NoteForm