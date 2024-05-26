import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaServicestack } from 'react-icons/fa';
import {BsFillPersonPlusFill} from "react-icons/bs";
import {MdPersonOutline} from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">ЖКХ Автоматизация</h1>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white flex items-center space-x-1">
                        <FaHome />
                        <span>Главная</span>
                    </Link>
                    <Link to="/services" className="text-white flex items-center space-x-1">
                        <FaServicestack />
                        <span>Услуги</span>
                    </Link>
                    <Link to="/auth" className="text-white flex items-center space-x-1">
                        <MdPersonOutline />
                        <span>Вход</span>
                    </Link>
                    <Link to="/register" className="text-white flex items-center space-x-1">
                        <BsFillPersonPlusFill />
                        <span>Регистрация</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
