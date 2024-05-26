import React from 'react';

const services = [
    { id: 1, name: 'Электричество', description: 'Управление счетами за электричество и потреблением.' },
    { id: 2, name: 'Вода', description: 'Управление счетами за воду и потреблением.' },
    { id: 3, name: 'Интернет', description: 'Управление счетами за интернет и услугами.' },
];

const ServicesPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Управление услугами</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className="text-gray-700">{service.description}</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Управлять</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesPage;
