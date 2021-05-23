import dynamic from 'next/dynamic';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import axios from 'axios';
import purple from '@material-ui/core/colors/purple';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Layout from '../components/Layout';
import AuthContextProvider from '../context/AuthContext';
import UserContextProvider from '../context/UserContext';
import theme from '../src/theme';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const NextNprogress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const publicKey =
      'BOybMHcCo3XS9K3BfcfNP_5JBf2DszIrs9_DbHOgq2ORwKftWqwqMcJeGsal32h125do-pCC2HH28UgOv9pCEm4';

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          // if (!navigator.serviceWorker.controller) {
          const register = await navigator.serviceWorker.register('sw.js', {
            scope: '/',
          });

          const sub = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
          });

          await axios.post('/api/post/subscribe', sub, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // }
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.error('Permission not granted for Notification');
          }
        } catch (_) {}
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <UserContextProvider>
          <Layout>
            <NextNprogress
              color={purple[500]}
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
            />
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
