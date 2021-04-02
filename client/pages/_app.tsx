import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { AuthContext } from '../context/auth';
import theme from '../src/theme';

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:4000/api/me', {
          withCredentials: true,
        });
        setUser(result.data);
      } catch (error) {
        console.error(error.response);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ user, setUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
