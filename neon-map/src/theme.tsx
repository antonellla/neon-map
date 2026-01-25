import { createTheme } from '@mui/material/styles';

const PaneTheme = createTheme({
  typography: {
    fontFamily: ['Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'].join(','),
    
    h2: {
        fontSize: '32pt',
        color: '#474747'
    },

    h3: {
        fontSize: '16pt',
        fontStyle: 'italic',
        color: '#666666'
    },

    body1: {
        fontSize: '12pt',
        fontStyle: 'italic',
        color: '#333333'
    }
    
},
});

export default PaneTheme;
