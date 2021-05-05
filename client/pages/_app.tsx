import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect } from 'react';

import Layout from '../components/Layout';
import AuthContextProvider from '../context/AuthContext';
import PostContextProvider from '../context/PostContext';
import UserContextProvider from '../context/UserContext';
import theme from '../src/theme';

axios.defaults.baseURL = 'http://localhost:4000';

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
