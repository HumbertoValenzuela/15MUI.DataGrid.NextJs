import {    
  styled, 
  // alpha 
} from '@mui/system';
import { AppBar } from "@mui/material";

export const TamanaDeLogo = styled('svg')(({ theme }) => ({
  height: "7em",  
  [theme.breakpoints.down("md")]: {
    height: "6em",
  } ,
  [theme.breakpoints.down("sm")]: {
    height: "5em",
  },
  [theme.breakpoints.down("xs")]: {
    height: "4em",
  }    
}) );

export const AppBarPosicion = styled(AppBar)(({ theme }) => ({  
  zIndex: theme.zIndex.modal + 1
}) );



