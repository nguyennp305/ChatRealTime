// quản lý mọi trang của nextjs
import { auth, db } from '../config/firebase';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '@/Components/Loading';
import { useEffect } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggerInUser, loading, _error] = useAuthState(auth);

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        // hàm setDoc trong firebase: ghi lại 1 document trong firebase
        await setDoc(
        doc(db, 'users', loggerInUser?.email as string),
        {
          email: loggerInUser?.email,
          lastSeen: serverTimestamp(),
          photoURL: loggerInUser?.photoURL,
        },
        // merge=true: xem email nếu đăng nhập lần 2 sẽ merge lại với nhau, chỉ update lastSeen
        {merge: true} // update cái thay đổi.
        )
      } catch (error) {
        console.log('Error setting user ingo in db', error);
    }
  }
  if (loggerInUser) {
    setUserInDb();
  }
  }, [loggerInUser])

  if (loading) return <Loading />

  // khi mở app sẽ ra luôn login
  if (!loggerInUser) {
    return <Login />;
  }
  return <Component {...pageProps} />
}

export default MyApp
