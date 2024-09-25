import axios from "../axios-config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import useSearch from "../Hooks/useSearch";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa"; 
import { toast } from "react-toastify";


const Home = () => {
  const [memories, setMemories] = useState([]);
  const { searchQuery } = useSearch(); 
  useEffect(() => {
    const getMemories = async () => {
      const res = await axios.get("/memories");
      setMemories(res.data);
    };

    getMemories();
  }, []);

  const filteredMemories = memories.filter((memory) =>
    memory.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = async (memory) => {
    try {
      const updatedMemory = { ...memory, favorite: !memory.favorite };
      await axios.patch(`/memories/favorite/${memory._id}`, updatedMemory);

      setMemories(
        memories.map((m) =>
          m._id === memory._id ? { ...m, favorite: !m.favorite } : m
        )
      );

      toast.success(memory.favorite ? "Removido dos favoritos" : "Adicionado aos favoritos");
    } catch (error) {
      console.error("Erro ao favoritar memória:", error);
    }
  };

  const deleteMemory = async (memory) => {
    try {
      await axios.delete(`/memories/${memory._id}`);
      setMemories(memories.filter((m) => m._id !== memory._id));
      toast.success("Memória excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir memória:", error);
    }
  };

  const sortedMemories = filteredMemories.sort((a, b) => {
    if (b.favorite === a.favorite) {
      return a.title.localeCompare(b.title); 
    }
    return b.favorite ? 1 : -1; 
  });
  

  return (
    <div className="home">
      <h2>Confira as últimas Memórias</h2>

      <div className="memories-container">
        {sortedMemories.length > 0 ? (
          sortedMemories.map((memory) => (
            <div className="memory" key={memory._id}>
              <div className="image-container">
                <img
                  src={`${axios.defaults.baseURL}${memory.src}`}
                  alt={memory.title}
                />
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(memory)}
                >
                  {memory.favorite ? <FaStar /> : <FaRegStar />}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteMemory(memory)}
                >
                <FaTrash />
                </button>
              </div>
              <p>{memory.title}</p>
              <Link className="btn" to={`/memories/${memory._id}`}>
                Comentar
              </Link>
            </div>
          ))
        ) : (
          <p>Nenhuma memória encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
