import React, {useState} from 'react';
import api from "../utils/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isTenantActive, setIsTenantActive] = useState(true);
    const navigate = useNavigate();
    const handleTenantClick = () => {
        setIsTenantActive(true);
    };

    const handleWorkerClick = () => {
        setIsTenantActive(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {
                userName: username,
                email,
                password,
                userRoleName: isTenantActive ? 'client' : 'worker',
            });
            //const userId = response.data.userId;
            // Показываем уведомление об успешной регистрации
            toast.success(response.data.message, {
                autoClose: 2000, // Уведомление исчезнет через 2 секунды
            });
            // Очищаем поля ввода после успешной регистрации
            setUsername('');
            setEmail('');
            setPassword('');
            navigate(`/userinfo/${response.data.userId}`)
        } catch (error) {
            console.error(error); // Выводим ошибку в консоль
            if (error.response && error.response.data && error.response.data.Message) {
                setError(error.response.data.Message);
            } else {
                setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Имя пользователя
                    </label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Электронная почта
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
                <div>
                    <div className="flex justify-center space-x-4">
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none transition-colors ${
                                isTenantActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={handleTenantClick}
                        >
                            Жилец квартиры
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none transition-colors ${
                                !isTenantActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={handleWorkerClick}
                        >
                            Работник
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50"
                >
                    Зарегистрироваться
                </button>
            </form>

        </div>
    );
};

export default RegisterPage;