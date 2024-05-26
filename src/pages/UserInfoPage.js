import React, {useEffect, useState} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import api from "../utils/api";
import {useNavigate, useParams} from "react-router-dom";
const UserInfoPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [identityNumberKZT, setIdentityNumberKZT] = useState('');
    const [birthDate, setBirthDate] = useState({
        startDate: null
    });
    const handleValueChange = (birthDate) => {
        console.log("newValue:", birthDate.startDate);
        setBirthDate(birthDate);
    }
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [microDistricts, setMicroDistricts] = useState([]);
    const [selectedMicroDistrict, setSelectedMicroDistrict] = useState('');
    const [streets, setStreets] = useState([]);
    const [selectedStreets, setSelectedStreets] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');

    useEffect(() => {
        fetchCountries();
    }, []);
    const fetchCountries = async () => {
        try {
            const response = await api.get('/api/countries');
            setCountries(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка стран:', error);
        }
    };
    const fetchRegions = async (selectedCountryId) => {
        try {
            const response = await api.get(`/api/region/${selectedCountryId}`);
            setRegions(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка областей:', error);
        }
    };
    const fetchCities = async (selectedRegionId) => {
        try {
            const response = await api.get(`/api/cities/${selectedRegionId}`);
            setCities(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка городов:', error);
        }
    };
    const fetchDistricts = async (selectedCityId) => {
        try {
            const response = await api.get(`/api/district/${selectedCityId}`);
            setDistricts(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка районов:', error);
        }
    };
    const fetchMicroDistricts = async (selectedDistrictId) => {
        try {
            const response = await api.get(`/api/microDistrict/${selectedDistrictId}`);
            setMicroDistricts(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка районов:', error);
        }
    };
    const fetchStreets = async (selectedDistrictId) => {
        try {
            const response = await api.get(`/api/streets/${selectedDistrictId}`);
            setStreets(response.data);
            console.log(setSelectedStreets)
        } catch (error) {
            console.error('Ошибка при получении списка улиц:', error);
        }
    }
    const handleChangeCountries = (event) => {
        const selectedCountryId = event.target.value;
        setSelectedCountry(selectedCountryId);
        fetchRegions(selectedCountryId);
    };
    const handleChangeRegions = (event) => {
        const selectedRegionId = event.target.value;
        setSelectedRegion(selectedRegionId);
        fetchCities(selectedRegionId);
    };
    const handleChangeCities = (event) => {
        const selectedCityId = event.target.value;
        setSelectedCity(selectedCityId);
        fetchDistricts(selectedCityId);
    };
    const handleChangeDistricts = (event) => {
        const selectedDistrictId = event.target.value
        setSelectedDistrict(selectedDistrictId);
        fetchMicroDistricts(selectedDistrictId);
        fetchStreets(selectedDistrictId);
    };
    const handleChangeStreets = (event) => {
        setSelectedStreets(event.target.value);
    }
    const handleChangeMicroDistricts = (event) => {
        setSelectedMicroDistrict(event.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInfo = {
            userId: parseInt(userId, 10), // ensure userId is a number
            surname: surname,
            name: name,
            birthDate: birthDate.startDate,
            phoneNumber: phoneNumber,
            identityNumberKZT: identityNumberKZT
        };

        const addressOfHouse = {
            userId: parseInt(userId, 10), // ensure userId is a number
            microDistrictsId: parseInt(selectedMicroDistrict, 10),
            streetsId: parseInt(selectedStreets, 10),
            houseNumber: houseNumber,
            apartmentNumber: apartmentNumber
        };

        try {
            await api.post('/api/userinfo', userInfo);
            await api.post('/api/addressOfHouses', addressOfHouse);
            alert('Данные успешно сохранены, пожалуйста авторизуйтесь!');
            navigate('/auth');
        } catch (error) {
            console.error('Error submitting data:', error.Message);
            console.log(userInfo)
            console.log(addressOfHouse)
        }
    };

    return (
        <div className="container mx-auto px-52 py-4">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-sans font-semibold leading-7 text-gray-900">Заполните персональные данные.</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">*Постоянный адрес</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Фамилия
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="surname"
                                        id="surname"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Имя
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="given-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <Datepicker
                                    startWeekOn={'mon'}
                                    i18n={'ru'}
                                    useRange={false}
                                    asSingle={true}
                                    value={birthDate}
                                    onChange={handleValueChange}
                                />
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                    Номер телефона
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                        </svg>
                                    </div>
                                    <input type="tel"
                                           name="phoneNumber"
                                           id="phoneNumber"
                                           value={phoneNumber}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           autoComplete="tel"
                                           aria-describedby="helper-text-explanation"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+7(000)-000-00-00" required />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="IIN" className="block text-sm font-medium leading-6 text-gray-900">
                                    Индивидуальный идентификационный номер удостоверения
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                                    <input type="text"
                                           name="identityNumberKZT"
                                           id="identityNumberKZT"
                                           value={identityNumberKZT}
                                           onChange={(e) => setIdentityNumberKZT(e.target.value)}
                                           autoComplete="identity-number"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{12}" required />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium leading-8 text-gray-900">
                                    Страна
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="country"
                                        name="country"
                                        value={selectedCountry}
                                        onChange={handleChangeCountries}
                                        autoComplete="country-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите страну</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>
                                                {country.countriesName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="region" className="block text-sm font-medium leading-8 text-gray-900">
                                    Область
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="region"
                                        name="region"
                                        value={selectedRegion}
                                        onChange={handleChangeRegions}
                                        autoComplete="region-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите область</option>
                                        {regions.map((region) => (
                                            <option key={region.id} value={region.id}>
                                                {region.regionsName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="city" className="block text-sm font-medium leading-8 text-gray-900">
                                    Город
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="city"
                                        name="city"
                                        value={selectedCity}
                                        onChange={handleChangeCities}
                                        autoComplete="city-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите город</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.citiesName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="district" className="block text-sm font-medium leading-8 text-gray-900">
                                    Район
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="district"
                                        name="district"
                                        value={selectedDistrict}
                                        onChange={handleChangeDistricts}
                                        autoComplete="district-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите район</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.districtsName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label htmlFor="microDistrict" className="block text-sm font-medium leading-8 text-gray-900">
                                    Микрорайон
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="microDistrict"
                                        name="microDistrict"
                                        value={selectedMicroDistrict}
                                        onChange={handleChangeMicroDistricts}
                                        autoComplete="microDistrict-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите микрорайон</option>
                                        {microDistricts.map((microDistrict) => (
                                            <option key={microDistrict.id} value={microDistrict.id}>
                                                {microDistrict.microDistrictsName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="street" className="block text-sm font-medium leading-8 text-gray-900">
                                    Улица
                                </label>
                                <div className="mb-4">
                                    <select
                                        id="street"
                                        name="street"
                                        value={selectedStreets}
                                        onChange={handleChangeStreets}
                                        autoComplete="street-name"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Выберите улицу</option>
                                        {streets.map((street) => (
                                            <option key={street.id} value={street.id}>
                                                {street.streetsName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Номер дома
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="houseNumber"
                                        id="houseNumber"
                                        value={houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                        autoComplete="house-number"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Номер квартиры
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="apartmentNumber"
                                        id="apartmentNumber"
                                        value={apartmentNumber}
                                        onChange={(e) => setApartmentNumber(e.target.value)}
                                        autoComplete="apartment-number"
                                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserInfoPage;