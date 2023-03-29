import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";

export const PostItem = ({ post }) => {
    const { username, title, text, views, comments, createdAt, imgUrl } = post

    return (
        <div className='flex flex-col basis-1/4 flex-grow'>
            <div className=" flex h-80 rounded-sm">
                {imgUrl && (
                    <img
                        className='object-cover w-full'
                        src={`http://localhost:8080/${imgUrl}`}
                        alt="img"
                    />
                )}
            </div>

            <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-white opacity-50">{username}</div>
                <div className="text-xs text-white opacity-50">
                    <Moment date={createdAt} format='D.MM.YYYY' />
                </div>
            </div>
                <div className="text-white text-xl">{title}</div>
                <p className="text-white opacity-60 text-xs pt-4">{text}</p>

                <div className="flex items-center gap-3">
                    <button className='flex justify-center items-center gap-2 tex-xs text-white opacity-50'>
                        <AiFillEye />
                        <span>{views}</span>
                    </button>
                    <button className='flex justify-center items-center gap-2 tex-xs text-white opacity-50'>
                        <AiOutlineMessage />
                        <span>{comments?.length ?? 0}</span>
                    </button>
                </div>
        </div>
    );
};
