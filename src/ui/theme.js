import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

const theme = createTheme({
  palette: {
    common: {
      arcBlue: arcBlue,
      arcOrange: arcOrange,
    },
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: `${arcOrange}`
    },
    action: {
      selected: `${arcOrange}`,
    }
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontFamily: 'Raleway',
      fontSize: '2.2rem',
      color: arcBlue,
      lineHeight: 1.5,
    },
    h2: {
      fontWeight: 700,
      fontFamily: 'Raleway',
      fontSize: '2.2rem',
      color: arcBlue,
      lineHeight: 1.5,
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: '#fff',
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: arcBlue,
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.5rem',
      color: arcBlue,
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
      fontFamily: 'Raleway',
      color: arcBlue,
    },
    subtitle1: {
      fontFamily: 'Raleway',
      fontSize: '1.25rem',
      color: arcGrey,
      fontWeight: 300,
    },
    subtitle2: {
      fontFamily: 'Raleway',
      fontSize: '1.25rem',
      color: 'white',
      fontWeight: 300,
    },
    body1: {
      fontFamily: 'Raleway',
      fontSize: '1rem',
      color: arcGrey,
      fontWeight: 300,
    },
    caption: {
      fontFamily: 'Raleway',
      fontSize: '1rem',
      color: arcGrey,
      fontWeight: 300,
    }

  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // textTransform: 'uppercase',
          color: arcBlue,
          fontSize: '1rem'
        },
        // shrink: {
        //   transform: 'translate(0, 1.5px) scale(0.75)',
        //   color: arcBlue,
        //   fontSize: '1rem',
        // },
        // outlined: {          
        //     borderBottom: `1px solid ${arcOrange}`,          
        // }

      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       // color: arcOrange,
    //       // borderColor: arcOrange,
    //       border: '1px solid #ced4da'       
    //     },    
    //   }
    // }
    // MuiFormControlLabel-label
    // el guion es la clase que debe especificar dentro de la clase general
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: arcBlue,
          fontWeight: 700,
        }
      }
    },
    MuiDataGrid: {  
      styleOverrides: {
        root: {
          color: arcBlue,          
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          border: `1px solid ${arcBlue}`,          
        },
        columnHeaderTitle: {
          fontSize: '1rem',
          fontWeight: 300,
          color: '#fffff0',            
        },
        columnHeaders: { 
          backgroundColor: arcBlue,
        },
        row: {
           
        }, 
        footerContainer: {       
          color: '#fffff0',
          backgroundColor: arcBlue,
        },
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#fffff0',          
        }
      }
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          // textTransform: 'uppercase',
          backgroundColor: '#fff999',
        },
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: arcBlue,
          fontWeight: 100,
        },
        root: {
          marginRight: 0,
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          // backgroundColor: '#fff999', 
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.MuiSelect-icon": {
            fill: arcOrange
          }
        }
      }
    }
  },

  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

});

export default theme;