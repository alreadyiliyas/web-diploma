import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import './ClientPage.css';
import api from "../utils/api"; // Импортируйте ваш CSS-файл

const services = [
    { id: 1, name: 'Электричество', description: 'Управление счетами за электричество и потреблением.' },
    { id: 2, name: 'Вода', description: 'Управление счетами за воду и потреблением.' },
    { id: 3, name: 'Интернет', description: 'Управление счетами за интернет и услугами.' },
    { id: 4, name: 'Подъезд', description: 'Проблемы с подъездом.' },
    { id: 5, name: 'Другое', description: 'Описать проблему.' },
];

Modal.setAppElement('#root');

const ClientPage = () => {
    const { UserGuid } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const openModal = (service) => {
        setSelectedService(service);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedService(null);
        setDescription('');
        setFiles([]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Title', selectedService.name);
        formData.append('Description', description);
        formData.append('UserGuid', UserGuid);

        files.forEach(file => {
            formData.append('Files', file);
        });

        try {
            console.log(UserGuid)
            await api.post('/api/application/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Заявка успешно отправлена');
            closeModal();
        } catch (error) {
            console.error('Ошибка при отправке заявки:', error);
            alert('Ошибка при отправке заявки');
        }
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold text-center pb-7">Оставить заявку на рассмотрение по:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
                    {services.map(service => (
                        <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                            <p className="text-gray-700">{service.description}</p>
                            <button
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                onClick={() => openModal(service)}
                            >
                                Оставить заявку
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedService && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Оставить заявку"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Заявка: {selectedService.name}</h3>
                        {selectedService.name === 'Другое' && (
                            <div className="mb-4">
                                <label htmlFor="custom-title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Название
                                </label>
                                <input
                                    type="text"
                                    id="custom-title"
                                    value={selectedService.name}
                                    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Описание
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div {...getRootProps()} className="mb-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
                            <input {...getInputProps()} />
                            <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
                        </div>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                        <button
                            type="submit"
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                        >
                            Отправить заявку
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mt-4 ml-4 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            Отменить
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default ClientPage;
