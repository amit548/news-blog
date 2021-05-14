import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Layout from '../components/Layout';
import AuthContextProvider from '../context/AuthContext';
import PostContextProvider from '../context/PostContext';
import UserContextProvider from '../context/UserContext';
import theme from '../src/theme';

const App = ({ Component, pageProps }) => {
  // const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-MT2EDLVTRR', page: '/' });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <UserContextProvider>
          <PostContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PostContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
