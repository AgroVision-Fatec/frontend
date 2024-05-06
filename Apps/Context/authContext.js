import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const[userLoggedToken, setUserLoggedToken] = useState(null);

  
    const login = async(email, password) => {
        try{
            const response = await api.post('/auth/login', { 
                "email": email,
                "password": password
              });

            const { accessToken } = response.data;
            await AsyncStorage.setItem('Token', accessToken);
            setUserLoggedToken(accessToken)

        } catch(error) {
            console.log('erro ao fazer login')
            
        }
    }
 

    const logout = async () => {
        await AsyncStorage.removeItem('Token');
        setUserLoggedToken(null);
      };


  
    return (
      <AuthContext.Provider value={{ login, logout, userLoggedToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);