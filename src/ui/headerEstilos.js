import {    
  styled, 
  // alpha 
} from '@mui/system';
import { AppBar } from "@mui/material";

export const TamanaDeLogo = styled('svg')(({ theme }) => ({
  height: "6em",  
  [theme.breakpoints.down("md")]: {
    height: "5em",
  } ,
  [theme.breakpoints.down("sm")]: {
    height: "4em",
  },
  [theme.breakpoints.down("xs")]: {
    height: "3em",
  }    
}) );

export const AppBarPosicion = styled(AppBar)(({ theme }) => ({  
  zIndex: theme.zIndex.modal + 1
}) );



