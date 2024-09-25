import { useContext } from "react"
import { SearchContext } from "../context/SearchContext"

const useSearch = () => {
    const context = useContext(SearchContext)

    if(!context){
        throw new Error("Não possuir contexto")
    }

  return context
}

export default useSearch