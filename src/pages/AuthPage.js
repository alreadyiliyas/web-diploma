import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../utils/api";
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                email,
                password,
            });
            const decodedToken = jwt.decode(response.data.accessToken);

            if (decodedToken) {
                Cookies.set('UserGuid', decodedToken.UserGuid, { expires: 7 });
                Cookies.set('UserRole', decodedToken.UserRole, { expires: 7 });

                // Перенаправление на страницу в зависимости от роли пользователя
                switch (decodedToken.UserRole) {
                    case 'client':
                        navigate(`/client/${decodedToken.UserGuid}`);
                        break;
                    case 'worker':
                        navigate('/worker');
                        break;
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'moderator':
                        navigate('/moderator');
                        break;
                    default:
                        navigate('/');
                }
            }

            Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
        } catch (error) {
            setError('Ошибка авторизации. Пожалуйста, проверьте введенные данные.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Вход</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}

export default AuthPage;
