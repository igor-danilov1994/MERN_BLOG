import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts } from "../redux/features/post/postSlice";
import {PopularPost, PostItem} from "../components";

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts, isLoading } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='max-w-[900px] mx-auto pt-10'>
            <div className="flex justify-center gap-8">
                {!!posts?.length && (
                    <div className="flex flex-col gap-10 basis-4/5 text-white ">
                        Все посты:
                        {posts.map((post, idx) => {
                            return (
                                <PostItem key={idx} post={post} />
                            )
                        })}
                    </div>
                )}
                {!!popularPosts?.length && (
                    <div className="basis-1/5">
                        <div className="text-xs uppercase text-white">
                            Популярные посты:
                            {popularPosts.map((post, idx) => {
                                return (
                                    <PopularPost key={idx} post={post} />
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
