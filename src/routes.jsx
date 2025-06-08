import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/dogs' element={<Layout />}>
        <Route index={true} element={<Home />} />
      </Route>
    </>
  )
);

export default router;
