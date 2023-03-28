import { useEffect, useState } from "react";
import {Link, redirect, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {checkIsAuth, registrationUser} from "../redux/features/auth/authSlice";

export const RegistrationPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if (status) toast(status)
        if (isAuth)  navigation('/login')
    }, [status, isAuth])


    const onSubmit = () => {
        dispatch(registrationUser({ username, password }))
    }

    return (
        <form onSubmit={e => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
            <h1 className='text-white text-lg text-center'>Регистрация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border px-8 py-2 text-xs outline-none'
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label className='text-xs text-gray-400'>
                Password:
                <input
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border px-8 py-2 text-xs outline-none'
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <div className="flex gap-8 justify-center  mt-4">
                <Link to='/login' className='flex justify-center items-center text-sx text-white'>Войти</Link>
                <button onClick={onSubmit} type='submit' className="flex justify-center items-center text-sx bg-gray-600 text-white rounded-sm py-2 px-4">
                    Зарегестрироваться
                </button>
            </div>
        </form>
    );
};
