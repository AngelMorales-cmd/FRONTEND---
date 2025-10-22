import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    document_number: "",
    name: "",
    paternal_lastname: "", 
    maternal_lastname: "",
    email: "",
    phone: "", 
    user_name: "",
    password: "",
    last_session: new Date().toISOString().split('T')[0],
    account_statement: true,
    document_type_id: 1,
    country_id: 179
  });

  // 🔥 REMOVER clearAuthState de aquí
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('🔄 Intentando registrar usuario...');
      await register(userData);
      alert('✅ Usuario registrado exitosamente!');
      
      // 🔥 SOLUCIÓN DEFINITIVA: Navegar directamente SIN limpiar estado manualmente
      // El AuthContext ya debe encargarse de limpiar el estado
      navigate('/login', { 
        replace: true,
        state: { registeredEmail: userData.email }
      });
      
    } catch (error) {
      console.error('💥 Error completo:', error);
      
      // Mostrar errores específicos al usuario
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        alert(`❌ Errores de validación:\n\n${errorMessages.join('\n')}`);
      } else {
        alert(`❌ Error: ${error.response?.data?.message || 'Error al registrar usuario'}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Usa datos únicos que no existan en el sistema
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.name}
                onChange={handleChange}
                placeholder="Ej: Juan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="paternal_lastname" className="block text-sm font-medium text-gray-700">Apellido Paterno *</label>
                <input
                  id="paternal_lastname"
                  name="paternal_lastname"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.paternal_lastname}
                  onChange={handleChange}
                  placeholder="Ej: Perez"
                />
              </div>
              <div>
                <label htmlFor="maternal_lastname" className="block text-sm font-medium text-gray-700">Apellido Materno *</label>
                <input
                  id="maternal_lastname"
                  name="maternal_lastname"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.maternal_lastname}
                  onChange={handleChange}
                  placeholder="Ej: Garcia"
                />
              </div>
            </div>

            <div>
              <label htmlFor="document_number" className="block text-sm font-medium text-gray-700">Número de Documento *</label>
              <input
                id="document_number"
                name="document_number"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.document_number}
                onChange={handleChange}
                placeholder="Ej: 87654321"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.email}
                onChange={handleChange}
                placeholder="Ej: usuario@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Nombre de Usuario *</label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.user_name}
                onChange={handleChange}
                placeholder="Ej: juanperez2024"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono *</label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Ej: 987654321"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña *</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;