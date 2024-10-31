import  { useEffect, useState } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/userFlashMessage'

import styles from './AddPet.module.css'
import PetForm from '../../form/PetForm';
import { useParams } from 'react-router-dom'


const EditPet = () => {
    const [pet,setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {setFlashMessage} = useFlashMessage();

    useEffect(()=> {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${(token)}`
            }
        }).then((response)=> {
            setPet(response.data.pet) 
        })
    },[token,id])

    async function updatePet(pet) {
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
          .patch(`pets/${pet._id}`, formData, {
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
      }
  return (
    <section>
        <div className={styles.addpet_header}>
            <h1>Editando o Pet: {pet.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema </p>
        </div>

        {pet.name && (<PetForm petData={pet} handleSubmit={updatePet} btnText={'Atualizar'} /> )}
    </section>
  )
}

export default EditPet