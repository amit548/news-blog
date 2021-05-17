import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Layout from '../components/Layout';
import AuthContextProvider from '../context/AuthContext';
import UserContextProvider from '../context/UserContext';
import theme from '../src/theme';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
