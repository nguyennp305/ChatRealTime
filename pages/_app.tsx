// quản lý mọi trang của nextjs
import { auth } from '../config/firebase';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '@/Components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggerInUser, loading, _error] = useAuthState(auth);

  if (loading) return <Loading />

  // khi mở app sẽ ra luôn login
  if (!loggerInUser) {
    return <Login />;
  }
  return <Component {...pageProps} />
}

export default MyApp
