import BASE_URL from '../config';

export const saveUserToDatabase = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
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
      const res = await fetch(`${BASE_URL}/user`);
      if (!res.ok) throw new Error('Error fetching usuarios');
      return await res.json();
    } catch (error) {
      console.error('Error in fetchUsuarios:', error);
      throw error; 
    }
  };

  export const getUserByEmail = async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      if (!res.ok) throw new Error('Error fetching usuarios');
      return await res.json();
    } catch (error) {
      console.error('Error in fetchUsuarios:', error);
      throw error; 
    }
  };

  export const updateUserRole = async (userId, role) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el rol del usuario');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error.message);
      throw error;
    }
  };


  export const updateEstado = async (userId, suspendido) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}/suspender`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suspendido }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el estado de suspensión');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al interactuar con el backend:', error.message);
      throw error;
    }
  };


  export const eliminarUser = async (id) => {
    const res = await fetch(`${BASE_URL}/user/${id}`,
     { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting user');
  };
  
  
  
  
  