import { createTheme } from '@mui/material/styles';

const PaneTheme = createTheme({
  typography: {
    fontFamily: ['Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'].join(','),
    
    h2: {
        fontSize: '32pt',
    },

    h3: {
        fontSize: '16pt',
    },

    body1: {
        fontSize: '12pt',
        fontStyle: 'italic',
    }
    
},
});

export default PaneTheme;
