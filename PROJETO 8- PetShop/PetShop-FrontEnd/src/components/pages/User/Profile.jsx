import React, { useEffect, useState } from "react";
import formStyles from "../../../components/form/Form.module.css";
import styles from './Profile.module.css'

import Input from "./../../form/input";
import api from "../../../utils/api";
import useFlashMessage from './../../../hooks/userFlashMessage';
import RoundedImage from "../../layout/RoundedImage";


const Profile = () => {
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem("token") || "");
    const {setFlashMessage} = useFlashMessage();
    const [preview, setPreview] = useState();


    useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

    console.log('user', user)

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let msgType = 'success';

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

  }
  return (
    <section>
     <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImage src={preview ? URL.createObjectURL(preview) : user.image} alt={user.name} />
        )}
     </div>
      <form className={formStyles.form_container} onSubmit={handleSubmit}>
      <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};

export default Profile;
