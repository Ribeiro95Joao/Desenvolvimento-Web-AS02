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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (loading) return;
    setLoading(true);

    try {
      // Tenta criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      const user = userCredential.user;

      // Salva dados adicionais no Firestore, utilizando o UID como identificador
      await setDoc(doc(db, "users", user.uid), {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        nascimento: formData.nascimento,
        uid: user.uid,
        email: formData.email
      });

      // Define a mensagem de sucesso e aguarda alguns segundos para redirecionar
      setSuccess("Usuário cadastrado com sucesso!");
      // Aguarda 2 segundos para que o usuário veja a mensagem
      setTimeout(() => {
        navigate("/principal");
      }, 2000);

    } catch (err) {
      // Trata erros específicos
      if (err.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso. Faça login ou use outro e-mail.");
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro</h1>
      {error && <p className="error">{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>
          {success}
        </p>
      )}
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
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
