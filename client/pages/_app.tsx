import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';
import PostContextProvider from '../context/PostContext';
import theme from '../src/theme';
import store from '../store';

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
      <Provider store={store}>
        <PostContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PostContextProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
