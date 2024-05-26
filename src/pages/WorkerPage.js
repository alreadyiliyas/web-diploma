import React, { useState, useEffect } from 'react';
import api from "../utils/api";
import { getCookie } from '../utils/cookies';
import Modal from '../components/ModalApplications';
import Cookies from "js-cookie";

const WorkerPage = () => {
    const [userInfo, setUserInfo] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const userGuid = Cookies.get('UserGuid'); // Предполагаем, что GUID пользователя хранится в куках
    const UserRoleName = Cookies.get('UserRole'); // Предполагаем, что роль пользователя также хранится в куках

    useEffect(() => {
        fetchApplications();
        fetchUserInfo();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('api/application/getall');
            setApplications(response.data);
            console.log(response.data);
        } catch (err) {
            setError('Ошибка при получении данных');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const responseUserInfo = await api.get(`api/userinfo/${userGuid}`);
            console.log(responseUserInfo.data);
            setUserInfo(responseUserInfo.data);

        } catch (err) {
            setError('Ошибка при получении информации о человеке');
        } finally {
            setLoading(false);
        }
    };

    const fetchMyApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`api/application/getByUserGuid`, {
                params: { userGuid, UserRoleName }
            });
            setApplications(response.data);
            console.log(response.data);
        } catch (err) {
            setError('Ошибка при получении данных');
        } finally {
            setLoading(false);
        }
    };

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    const handleTakeJob = async (applicationId) => {
        const employeeGuid = getCookie('UserGuid');
        try {
            await api.post('api/application/takejob', {
                applicationId,
                statusesId: 4,
                clientId: selectedApplication.clientId,
                employeeGuid
            });
            closeModal();
            fetchApplications();
        } catch (err) {
            console.error('Ошибка при взятии заявки в работу', err);
        }
    };
//First
    const handleCompleteJob = async (applicationId) => {
        const employeeGuid = getCookie('UserGuid');
        try {
            await api.post('api/application/takejob', {
                applicationId,
                statusesId: 5, // Предполагаем, что статус 5 означает завершенную заявку
                employeeGuid
            });
            closeModal();
            fetchApplications();
        } catch (err) {
            console.error('Ошибка при завершении заявки', err);
        }
    };

    return (
        <div className="flex p-4 bg-gray-100 min-h-screen">
            <div className="w-4/5 pr-4">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Активные заявки</h1>
                <button
                    onClick={fetchApplications}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
                >
                    Получить все открытые заявки
                </button>
                <button
                    onClick={fetchMyApplications}
                    className="bg-blue-500 text-white py-2 ml-2 px-4 rounded hover:bg-blue-700 mb-4"
                >
                    Получить мои взятые заявки
                </button>
                {loading && <p>Загрузка...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <ul>
                    {applications.map((app, index) => (
                        <li
                            key={index}
                            className="border-b py-2 bg-white p-2 mb-2 rounded shadow cursor-pointer"
                            onClick={() => handleApplicationClick(app)}
                        >
                            {app.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-1/5 bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Информация о себе</h2>
                {userInfo ? (
                    <>
                        <p><strong>Имя:</strong> {userInfo.name}</p>
                        <p><strong>Фамилия:</strong> {userInfo.surname}</p>
                        <p><strong>Дата рождения:</strong> {new Date(userInfo.birthDate).toLocaleDateString()}</p>
                        <p><strong>Телефон:</strong> {userInfo.phoneNumber}</p>
                        <p><strong>ИИН:</strong> {userInfo.identityNumberKZT}</p>
                    </>
                ) : (
                    <p>Загрузка информации...</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                application={selectedApplication}
                onTakeJob={handleTakeJob}
                onCompleteJob={handleCompleteJob}
            />
        </div>
    );
};

export default WorkerPage;
