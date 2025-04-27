// src/pages/Principal.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("Documento não encontrado!");
          }
        })
        .catch((error) => console.error("Erro ao obter os dados:", error));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!userData)
    return (
      <div className="container">
        <p>Carregando dados...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>Página Principal</h1>
      <p>
        <strong>Nome:</strong> {userData.nome}
      </p>
      <p>
        <strong>Sobrenome:</strong> {userData.sobrenome}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {userData.nascimento}
      </p>
    </div>
  );
}

export default Principal;
