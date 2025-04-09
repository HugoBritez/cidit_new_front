import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../auth/types/auth.type";
import { API_URL } from "../../../shared/constants/api_url";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto p-2 w-full  bg-white rounded-md shadow-xs">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="bg-white  w-full rounded-lg shadow overflow-hidden border-2 border-gray-200">
          <table className="w-full divide-y divide-gray-200 border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-left text-md font-bold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-2 text-left text-md font-bold text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-2 text-left text-md font-bold text-gray-500 uppercase tracking-wider">
                  Email 
                </th>
                <th className="px-6 py-2 text-left text-md font-bold text-gray-500 uppercase tracking-wider">
                  Nombre Completo
                </th>
                <th className="px-6 py-2 text-left text-md font-bold text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-2 text-center text-md font-bold text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-md font-medium text-gray-900">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-2   whitespace-nowrap">
                    <div className="text-md text-gray-900">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-md text-gray-900">
                      {user.firstname} {user.lastname}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-md leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 text-center border border-gray-200">
                    <button className= " bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                      Editar
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
