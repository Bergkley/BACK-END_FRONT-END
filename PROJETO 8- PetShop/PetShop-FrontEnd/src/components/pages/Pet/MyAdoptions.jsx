import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./MyAdoptions.module.css";
import RoundedImage from "../../layout/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await api.get("/pets/myadoptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(response.data.pets);
      } catch (err) {
        setError("Erro ao carregar os pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [token]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.container}>
      <h1>Minhas Adoções</h1>
      <div className={styles.cardsContainer}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.card}>
              <RoundedImage src={pet.images[0]} alt={pet.name} width="100%" />
              <h2 className={styles.petName}>{pet.name}</h2>
              <div className={styles.contacts}>
                <p>
                  <span className={styles.bold}>Email:</span> {pet.user.email}
                </p>
                <p>
                  <span className={styles.bold}>Ligue para:</span>{" "}
                  {pet.user.phone}
                </p>

                <p>
                  <span className={styles.bold}>Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p className={styles.adopted_text_process}> Adoção em processo</p>
                ) : (
                  <p className={styles.adopted_text_conclude}>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há pets adotados!</p>
        )}
      </div>
    </section>
  );
}


export default MyAdoptions;
