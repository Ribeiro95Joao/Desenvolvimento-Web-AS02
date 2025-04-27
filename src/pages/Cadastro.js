// src/pages/Cadastro.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    nascimento: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Criação do usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const user = userCredential.user;

      // Salva dados adicionais no Firestore, usando o UID como identificador
      await setDoc(doc(db, "users", user.uid), {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        nascimento: formData.nascimento,
        uid: user.uid,
        email: formData.email
      });

      navigate("/principal");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            value={formData.senha}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            onChange={handleChange}
            value={formData.nome}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="sobrenome"
            type="text"
            placeholder="Sobrenome"
            onChange={handleChange}
            value={formData.sobrenome}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="nascimento"
            type="date"
            placeholder="Data de Nascimento"
            onChange={handleChange}
            value={formData.nascimento}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
