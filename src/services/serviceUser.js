const API_URL = 'http://localhost:5000/api/user/';

export const saveUserToDatabase = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al interactuar con el backend:', error.message);
      throw error;
    }
  };


  export const getUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error fetching usuarios');
      return await res.json();
    } catch (error) {
      console.error('Error in fetchUsuarios:', error);
      throw error; 
    }
  };
  
  