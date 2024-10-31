import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePets, setVisiblePets] = useState(6);
  const [filter, setFilter] = useState('todos'); 

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (animalType) => {
    setFilter(animalType);
    setVisiblePets(6); 
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || pet.animal === filter;
    return matchesSearch && matchesFilter;
  });

  const loadMorePets = () => {
    setVisiblePets((prev) => prev + 6);
  };

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Encontre seu Amigo Ideal</h1>
        <p>Veja os detalhes de cada pet e conheça o tutor deles.</p>
        <div className={styles.search_container}>
          <input
            type="text"
            placeholder="Buscar por nome/raça do pet"
            className={styles.search_input}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.filter_buttons}>
          <button 
            onClick={() => handleFilterChange('todos')} 
            className={`${styles.filter_button} ${filter === 'todos' ? styles.active_filter : ''}`}
          >
            Todos
          </button>
          <button 
            onClick={() => handleFilterChange('Cachorro')} 
            className={`${styles.filter_button} ${filter === 'Cachorro' ? styles.active_filter : ''}`}
          >
            Cachorro
          </button>
          <button 
            onClick={() => handleFilterChange('Gato')} 
            className={`${styles.filter_button} ${filter === 'Gato' ? styles.active_filter : ''}`}
          >
            Gato
          </button>
        </div>
      </div>

      <div className={styles.pet_container}>
        {filteredPets.slice(0, visiblePets).map((pet) => (
          <div className={styles.pet_card} key={pet._id}>
            <div
              style={{ backgroundImage: `url(${pet.images[0]})` }}
              className={styles.pet_card_image}
            ></div>
            <h3>{pet.name}</h3>
            <h3>{pet.breed}</h3>
            <p><span className="bold">Peso:</span> {pet.weight}kg</p>
            {pet.available ? (
              <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
            ) : (
              <p className={styles.adopted_text}>Adotado!</p>
            )}
          </div>
        ))}

        {filteredPets.length === 0 && (
          <p>Não há pets disponíveis para adoção no momento!</p>
        )}
      </div>

      {visiblePets < filteredPets.length && (
        <button onClick={loadMorePets} className={styles.load_more_btn}>
          Carregar mais
        </button>
      )}
    </section>
  );
}

export default Home;
