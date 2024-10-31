import React, { useState } from 'react'
import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import useFlashMessage from '../../../hooks/userFlashMessage'
import PetForm from '../../form/PetForm'



const AddPet = () => {
    const [token] = useState(localStorage.getItem('token')|| '')
    const {setFlashMessage} = useFlashMessage();
    const history = useHistory();
    async function registerPet(pet) {
        let msgType = 'success'
    
        const formData = new FormData()
    
        const petFormData = await Object.keys(pet).forEach((key) => {
          if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
              formData.append(`images`, pet[key][i])
            }
          } else {
            formData.append(key, pet[key])
          }
        })
    
        formData.append('pet', petFormData)
    
        const data = await api
          .post(`pets/create`, formData, {
            headers: {
              Authorization: `Bearer ${(token)}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            return response.data
          })
          .catch((err) => {
            msgType = 'error'
            return err.response.data
          })
    
        setFlashMessage(data.message, msgType)
        history.push('/pet/mypets')
      }
    return (
        <section className={styles.addpet_header}>
          <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
          </div>
          <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
        </section>
      )
}

export default AddPet