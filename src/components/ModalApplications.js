import React from 'react';

const Modal = ({ isOpen, onClose, application, onTakeJob, onCompleteJob }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-50 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">{application.title}</h2>
                <p><strong>Описание:</strong> {application.description}</p>
                <p><strong>Дата создания:</strong> {new Date(application.createdAt).toLocaleString()}</p>
                {application.imagePaths.map((imagePath, index) => (
                    <img key={index} src={imagePath} alt={`Image ${index}`} className="mt-4" />
                ))}
                {application.statusesId === 4 ? (
                    <button
                        onClick={() => onCompleteJob(application.id)}
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Завершить заявку
                    </button>
                ) : application.statusesId === 5 ? (
                    <p className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded">
                        Заявка завершена
                    </p>
                ) : (
                    <button
                        onClick={() => onTakeJob(application.id)}
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Взять в работу
                    </button>
                )}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 ml-2 rounded hover:bg-red-700">
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;
