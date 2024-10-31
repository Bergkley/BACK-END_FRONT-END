import React, { useEffect, useState } from 'react'
import styles from "./Message.module.css";
import bus from "../../utils/bus";


const Message = () => {
    const [visibility, setVisibility] = useState(false)
    const [type,setType] = useState("")
    const [message,setMessage] = useState("")

    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setType(type)
            setMessage(message)
            setTimeout(() => {
                setVisibility(false)
            }, 3000)
        })
        
    },[])

     
  return (
   visibility && (
    <div className={`${styles.message} ${styles[type]}`}>{message}</div>
   )
  )
}

export default Message