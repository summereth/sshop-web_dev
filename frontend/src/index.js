import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Add index={true} to avoid showing multiple screens */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
