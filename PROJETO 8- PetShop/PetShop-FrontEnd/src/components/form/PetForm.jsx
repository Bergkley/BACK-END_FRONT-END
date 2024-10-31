import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./input";
import Select from "./Select";
import RoundedImage from "../layout/RoundedImage";

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo"];
  const animais = ["Cachorro", "Gato", "Pássaro", "Peixe", "Coelho", "Hamster", "Tartaruga", "Porquinho-da-índia", "Furão", "Lagarto", "Cobra"];


  const onFileChange = (e) => {
    setPet({ ...pet, images: [...e.target.files] });
    setPreview(Array.from(e.target.files))
  };

  const handleChange = (e) => {
    setPet({...pet, [e.target.name]: e.target.value})
  };

  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    })
  }
  function handleAnimal(e) {
    setPet({
      ...pet,
      animal: e.target.options[e.target.selectedIndex].text,
    })
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet);
  }


  return (
    <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <RoundedImage
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <RoundedImage
                src={`${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Select
        name="animal"
        text="Qual é seu Pet"
        options={animais}
        handleOnChange={handleAnimal}
        value={pet.animal || ""}
      />
      <Input
        text="Raça do Pet"
        type="text"
        name="breed"
        placeholder="Digite a raça"
        handleOnChange={handleChange}
        value={pet.breed || ""}
      />
      <Input
        text="Descrição do Pet"
        type="text"
        name="description"
        placeholder="Digite sobre o pet"
        handleOnChange={handleChange}
        value={pet.description || ""}
      />
      
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ""}
        handleOnChange={handleChange}
      />
      <Select
        name="color"
        text="Selecione a categoria"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
};

export default PetForm;
