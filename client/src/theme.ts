import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: pink,
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
