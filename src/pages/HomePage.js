import React from 'react';
import MainPagePhoto from '../photo/mainpage/mainpagephoto.jpeg';
const HomePage = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Добро пожаловать в систему автоматизации ЖКХ</h2>
                    <p>
                        Наше приложение предназначено для упрощения управления коммунальными услугами. Вы можете легко
                        отслеживать счета, оплачивать их и управлять своими услугами в одном месте.
                    </p>
                </div>
                <div>
                    <img src={MainPagePhoto} alt="Utility" className="w-80 rounded-lg shadow-md "  loading="lazy"/>
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-2">Для чего нужно приложение</h3>
                <p>
                    Приложение помогает вам управлять вашими коммунальными услугами. Вы можете просматривать счета,
                    оплачивать их онлайн и получать уведомления о новых счетах и изменениях в услугах.
                </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Как пользоваться приложением</h3>
                <p>
                    Пользоваться приложением очень просто. Зарегистрируйтесь, добавьте свои коммунальные услуги, и вы сможете
                    начать управление ими. Если у вас возникнут вопросы, наша служба поддержки всегда готова помочь.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
