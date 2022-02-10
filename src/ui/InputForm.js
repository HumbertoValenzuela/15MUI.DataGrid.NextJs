import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";


export const FormTextField = ({ name, label, control }) => {


  return (
    <>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}        
          fullWidth
          label={label} 
          
        />        
      )}
      rules={{ required: true }}  
    />
    <Grid item>
      <Typography>
        {/* {control.value && control.message} */}



      </Typography>
    </Grid>
    </>
  );
};


