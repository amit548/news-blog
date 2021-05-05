import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import amber from '@material-ui/core/colors/amber';
// import orange from '@material-ui/core/colors/orange';
import { pink, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: red, //amber,
    secondary: pink, //orange,
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
