import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { createPost } from "../redux/features/post/postSlice";
import {useNavigate} from "react-router-dom";

export const AddPostPage = () => {
    const [postTitle, setPostTitle] = useState('')
    const [postText, setPostText] = useState('')
    const [postFile, setPostFile] = useState(null)
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    const onSubmit = () => {
        try {
            const data = new FormData()

            data.append('title', postTitle)
            data.append('text', postText)
            if (postFile) data.append('image', postFile)

            dispatch(createPost(data))
            toast('Пост отправлен')
            onCanceled()
            navigate('/')
        } catch (error){
            toast('Ошибка добавления поста')
        }
    }

    const onCanceled = () => {
        setPostTitle('')
        setPostText('')
        setPostFile(null)
    }

    return (
        <form className='w-1/3 mx-auto py-10' onSubmit={e => e.preventDefault()}>
            <label
                className="text-gray300 py-2 bg-gray-600 text-xs mt-2 flex justify-center items-center border-2 border-dotted cursor-pointer"
            >
                Прикрепить изображение
                <input type="file" className="hidden" onChange={e => setPostFile(e.target.files[0])}/>
            </label>
            <div className="flex object-cover py-2">
                {postFile && (
                    <img className='w-1/4 rounded-b 'src={URL.createObjectURL(postFile)} alt='image' />
                )}
            </div>

            <label className="text-sx text-white opacity-70">
                Заголовок поста:
                <input
                    type="text"
                    placeholder='Заголовок'
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                />
            </label>

            <label className="text-sx text-white opacity-70">
                Текст поста:
                <textarea
                    placeholder='Текст поста'
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                    value={postText}
                    onChange={e => setPostText(e.target.value)}
                />
            </label>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button onClick={onSubmit} className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                    Добавить пост
                </button>
                <button onClick={onCanceled} className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                    Отменить
                </button>
            </div>
        </form>
    );
};
