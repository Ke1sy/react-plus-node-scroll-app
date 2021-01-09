import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'light',
        primary: {
            main: '#7e57c2'
        },
        secondary: {
            main: '#ec407a',
        },
        success: {
            main: '#00B294',
        },
        background: '#f5f5f5',
        error: {
            main: '#E81123'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        contrastText: '#fff',
        text: {
            primary: '#333',
        },
    }
});


