import React, { createContext, useState, useContext } from 'react';
import api from '../Services/Axios';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [idUser, setIdUser] = useState(null)
    const [role, setRole] = useState(null)

  
    const getUserByEmail = async (email) => {
        try {
          const response = await api.get(`/users/email/${email}`); 
          return response.data;
        } catch (error) {
          console.error('Erro ao obter informações do usuário:', error);
          throw error;
        }
      };
 

  
    return (
      <AuthContext.Provider value={{ getUserByEmail, idUser, setIdUser ,role, setRole}}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);