import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RoundedImage from '../../layout/RoundedImage';
import useFlashMessage from '../../../hooks/userFlashMessage';
import api from '../../../utils/api'
import styles from './Dashboard.module.css'




const MyPets = () => {
    const [pets,setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token')|| '');
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
      api.defaults.headers.Authorization = `Bearer ${(token)}`
    }, [token])

    useEffect(() => {
      api
        .get('/pets/mypets', {
          headers: {
            Authorization: `Bearer ${(token)}`,
          },
        })
        .then((response) => {
          setPets(response.data.pets)
        })
    }, [token])
    
    const removePet = async (id) => {
      let msgType = 'success'
      const data  = await api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${(token)}`,
        },
      }).then((response)=> {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      })
      .catch((err)=>{
        msgType = 'error'
        return err.response.data
      })
      setFlashMessage(data.message, msgType)
    }
    async function concludeAdoption(id) {
      let msgType = 'success'
    
      const data = await api
        .patch(`/pets/conclude/${id}`, {
          headers: {
            Authorization: `Bearer ${(token)}`,
          },
        })
        .then((response) => {
          const updatedPets = pets.map((pet) => {
            if (pet._id === id) {
              return { ...pet, available: false }; 
            }
            return pet;
          });
          setPets(updatedPets);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          msgType = 'error';
          return err.response.data;
        });
    
      setFlashMessage(data.message, msgType);
    }
    
    return (
      <section>
        <div className={styles.petslist_header}>
          <h1>Meus Pets Cadastrados</h1>
          <Link to="/pet/add">Cadastrar Pet</Link>
        </div>
        <div className={styles.petslist_container}>
          {pets.length > 0 &&
            pets.map((pet) => (
              <div key={pet._id} className={styles.petlist_row}>
                <RoundedImage
                  src={`${pet.images[0]}`}
                  alt={pet.name}
                  width="px75"
                />
                <span className="bold">{pet.name}</span>
                <div className={styles.actions}>
                  {pet.available ? (
                    <>
                      {pet.adopter && (
                        <button
                          className={styles.conclude_btn}
                          onClick={() => {
                            concludeAdoption(pet._id)
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}
  
                      <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                      <button
                        onClick={() => {
                          removePet(pet._id)
                        }}
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <p>Pet já adotado</p>
                  )}
                </div>
              </div>
            ))}
          {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
        </div>
      </section>
    )
}

export default MyPets