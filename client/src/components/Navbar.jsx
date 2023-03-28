import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, checkIsAuth} from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const navbarItems = [
    {
        title: 'Главаня',
        route: '/'
    },
    {
        title: 'Мои посты',
        route: 'posts'
    },
    {
        title: 'Добавит пост',
        route: 'new'
    },
]

const activeStyles = {
    color: 'white'
}

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const handleSubmit = () => {
        dispatch(logout())
        navigation('/login')
        toast('Вы вышли из системы')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-sx text-write rounded-sm'>
                E
            </span>
            {isAuth && (
                <ul className="flex gap-8">
                    {navbarItems.map((item) => {
                        return (
                            <li key={item.title}>
                                <NavLink
                                    to={item.route}
                                    className='text-xs text-gray-400 hover:text-white'
                                    style={({ isActive }) => isActive ? activeStyles : undefined }
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                {isAuth ? (
                    <button onClick={handleSubmit}>Выйти</button>
                    ) : (
                        <Link to='/login'>Войти</Link>
                    )
                }
            </div>
        </div>
    );
};
