import  { useEffect, useState } from 'react'
import { json } from 'react-router-dom';



// export const useLocalStorage<T> = (key:string, initialValue: T | (()=>T)) => {

// }

export function useLocalStorage<T> (key:string, initialValue: T | (()=>T)) {
  const [value, setValue] = useState<T>(()=> {
    const jsonValue = localStorage.getItem(key)
    if(jsonValue == null) {
      if(typeof initialValue  === "function") {
        return ( initialValue as ()=> T)()
      } else {
        return initialValue;
      }
    } else {
      if(jsonValue === "undefined") {
        console.log("entro aqui")
        return []
      }
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])
  

  return [value, setValue] as [T, typeof setValue]
}