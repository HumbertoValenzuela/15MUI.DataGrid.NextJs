
import { styled} from '@mui/system';

export const FooterUI = styled('footer')( ({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
  // la parte azul queda pequeña
  // height: '5rem',
  // Footer zIndex sobre Drawer
  zIndex: theme.zIndex.drawer + 1,
  // No funciona el zIndex, porque debe ir explicitamente el position: 'relative' 
  position: 'relative',
}));

export const ImgAdornment = styled('img') ( ({ theme }) => ({
  width: '15em',
  // Cambiar en que parte de la imagen está anclada a la pantalla
  verticalAlign: 'bottom',  
  [theme.breakpoints.down('md')]: {
    width: '8em',
  },
  [theme.breakpoints.down('xs')]: {
    width: '6em',
  },
  
}));


  
