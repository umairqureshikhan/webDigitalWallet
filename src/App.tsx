import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import VerifyPassword from './components/VerifyPassword';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from './redux/store';
import { BiX } from 'react-icons/bi';
import { setError } from './redux/wallet';

function App() {
  const dispatch = useDispatch();
  const passwordVerify = useSelector((state: RootState) => state.user.passwordVerify);
  const error = useSelector((state: RootState) => state.wallet.error);

  return (

    <BrowserRouter>
    <div>
      {
        !!error &&
        <div className='w-full h-[100vh] absolute top-0 flex justify-center items-start'>
          <div className='w-[50%] rounded-lg p-1 border border-danger bg-danger-light flex justify-between z-50'>
            <div className='w-[90%]'>
              <p className='text-danger text-center'>{error}</p>
            </div>
            <div className='w-[10%] flex justify-end items-center'>
              <BiX onClick={() => dispatch(setError(''))} className='cursor-pointer' />
            </div>
          </div>
        </div>
      }
      </div>
      {/* This animated-circle is used for background animations and its styling in app.css file */}
      <div className='animated-circle'></div>
      {
        passwordVerify ?
          <VerifyPassword />
          :
          null
      }
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
