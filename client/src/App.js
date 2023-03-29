import { useEffect } from "react";
import { Layout } from "./components";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";

import {
  AddPostPage,
  EditPostPage,
  LoginPage,
  MainPage,
  PostPage,
  PostsPage,
  RegistrationPage
} from "./pages";
import { getMe } from "./redux/features/auth/authSlice";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='posts' element={<PostsPage />} />
          <Route path=':id' element={<PostPage />} />
          <Route path=':id/edit' element={<EditPostPage />} />
          <Route path='new' element={<AddPostPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='registration' element={<RegistrationPage />} />
        </Routes>
        <ToastContainer position='bottom-right' />
      </Layout>
    </div>
  );
}

export default App;
