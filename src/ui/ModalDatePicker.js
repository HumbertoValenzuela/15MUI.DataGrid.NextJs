import React, { useState,useEffect } from 'react';

import TextField from '@mui/material/TextField';
// Fechas
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import Format from 'date-fns/format';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import esLocale from 'date-fns/locale/es';
// Mui 
import { Button, Dialog, DialogContent, Grid, InputAdornment, styled, Typography } from '@mui/material';

// Radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// select
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';
// import { FormTextField } from './InputForm';

// css
// import styles from './formcontrollabel.module.css';
const Estiloradiogroup = styled(FormControlLabel)({
  fontWeight: 100,

});

const ModalDatePicker = (props) => {

  // Para modal y grilla
  const { dialogOpen, setDialogOpen, rowgrilla, setRowgrilla } = props;
  // Array para select
  const platformOptions = ['Android', 'iOS', 'Web'];
  let featuresOptions = ['Photo-Video', 'GPS', 'File Transfer', 'Users Authentication', 'Push Notifications'];
  let websiteOptions = ['Basic', 'Interactive', 'E-Commerce'];

  const defaultValues = {
    nombre: '',
    fechaValue: new Date(),
    total: '',
    service: 'Website',
    users: '',
    complexity: '',
    sistema: [],
    features: []
  }

  const [formulariostate, setformulariostate] = React.useState(defaultValues);
  const [fechaValor, setfechaValor] = useState(new Date());

  const handleChangeFecha = (e) => {
    setfechaValor(e);
    setformulariostate({ ...formulariostate, fechaValue: e });
  }

  const handleFormularioChange = (e) => {
    setformulariostate({ ...formulariostate, [e.target.name]: e.target.value });

  }

  // console.log('fechaValor', fechaValor);



  const onSubmitFormulario = () => {

    let idRow = rowgrilla.length + 1;

    setRowgrilla([...rowgrilla, {
      id: idRow,
      nombre: formulariostate.nombre,
      fechaValue: format(formulariostate.fechaValue, 'dd/MM/yyyy'),
      service: formulariostate.service,
      features: formulariostate.features.join(', '),
      complexity: formulariostate.service === 'Website' ? 'N/A' : formulariostate.complexity,
      sistema: formulariostate.service === 'Website' ? 'N/A' : formulariostate.sistema.join(', '),
      users: formulariostate.service === 'Website' ? 'N/A' : formulariostate.users,
      total: `$${formulariostate.total}`,
    }]);
    // console.log(rowgrilla);

    setDialogOpen(false);
    console.log('formularioState ', formulariostate);
    reset();
  }

  const reset = () => {
    setformulariostate(defaultValues);
  }

  useEffect(() => {
    setformulariostate({ ...formulariostate, features: []  });
  }, [formulariostate.service]);
  

  // const disableButtonvalidacion = () => {}

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth='md'
        style={{ marginTop: '6em' }}
      >
        <Grid container style={{ backgroundColor: '#dfdddd' }} >
          <Grid item>
            <Typography variant='h2' gutterBottom>
              Add a new Project
            </Typography>
          </Grid>
        </Grid>

        <DialogContent style={{ backgroundColor: '#dfdddd' }}>
          {/* <form onSubmit={onSubmitFormulario}> */}
          <Grid container justifyContent='space-around' >

            <Grid item>

              <Grid item container direction='column' sm>
                <Grid item>
                  <TextField
                    variant="filled"
                    name='nombre'
                    label='Name'
                    value={formulariostate.nombre}
                    onChange={handleFormularioChange}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

                <Grid item container style={{ marginTop: '1em' }}>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Service</FormLabel>

                      <RadioGroup
                        aria-label="service"
                        name="service"
                        defaultValue="Website"
                        value={formulariostate.service}
                        onChange={handleFormularioChange}
                      >
                        <Estiloradiogroup
                          label="Website"
                          value="Website"
                          control={<Radio />}
                        />
                        <Estiloradiogroup
                          value="Mobile App"
                          control={<Radio />}
                          label="Mobile App"
                        />
                        <Estiloradiogroup
                          value="Custom Software"
                          control={<Radio />}
                          label="Custom Software"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

                <Grid item>
                  <FormControl variant="filled" sx={{ width: 205 }}>
                    <InputLabel id="sistemainputlabel">Multiple Sistema</InputLabel>
                    <Select
                      MenuProps={{ style: { zindex: 1302 } }}
                      multiple
                      name='sistema'
                      onChange={handleFormularioChange}
                      value={formulariostate.sistema}
                      disabled={formulariostate.service === 'Website'}
                    >
                      {
                        platformOptions.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item alignSelf='flex-start'>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

              </Grid>
            </Grid>

            <Grid item>

              <Grid item container direction='column' sm >
                <Grid item >

                  <DatePicker
                    label="Basic example"
                    value={fechaValor}
                    onChange={handleChangeFecha}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Grid item>
                    <Typography
                      variant='body2'
                      color='error'>
                      error
                    </Typography>
                  </Grid>


                </Grid>

                <Grid item container style={{ marginTop: '1em' }} justifyContent='center' >
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Complexity</FormLabel>

                      <RadioGroup
                        aria-label="complexity"
                        name="complexity"
                        value={formulariostate.complexity}
                        onChange={handleFormularioChange}

                      >
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          label="Low"
                          value="Low"
                          control={<Radio />}
                        />
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          value="Medium"
                          control={<Radio />}
                          label="Medium"
                        />
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          value="Hight"
                          control={<Radio />}
                          label="Hight"
                        />
                      </RadioGroup>


                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item alignSelf='center'>

                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

              </Grid>

            </Grid>

            <Grid item>

              <Grid item container direction='column' sm>
                <Grid item>
                  {/* <FormTextField
                      name={"total"}
                      label="Total"
                    /> */}
                  <TextField
                    type='number'
                    variant="filled"
                    name='total'
                    label='Total'
                    value={formulariostate.total}
                    onChange={handleFormularioChange}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

                <Grid item container style={{ marginTop: '1em' }} justifyContent='flex-end'>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Users</FormLabel>

                      <RadioGroup
                        aria-label="users"
                        name="users"
                        value={formulariostate.users}
                        onChange={handleFormularioChange}
                      >
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          label="0-10"
                          value="0-10"
                          control={<Radio />}
                        />
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          value="10-100"
                          control={<Radio />}
                          label="10-100"
                        />
                        <Estiloradiogroup
                          disabled={formulariostate.service === 'Website'}
                          value="100-1000"
                          control={<Radio />}
                          label="100-1000"
                        />
                      </RadioGroup>


                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item alignSelf='flex-end'>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

                <Grid item>
                  <FormControl variant="filled" sx={{ width: 205 }}>
                    <InputLabel id="featuresinputlabel">Multiple Features</InputLabel>
                    <Select
                      MenuProps={{ style: { zindex: 1302 } }}
                      value={formulariostate.features}
                      onChange={handleFormularioChange}
                      name='features'
                      multiple
                    >
                      {
                        formulariostate.service === 'Website'
                          ? featuresOptions = websiteOptions
                          : null
                      }
                      {
                        featuresOptions.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item alignSelf='flex-end'>
                  <Typography
                    variant='body2'
                    color='error'>
                    error
                  </Typography>
                </Grid>

              </Grid>
            </Grid>

            <Grid container justifyContent='center'>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={onSubmitFormulario}
                  disabled={
                    formulariostate.service === 'Website'
                      ?
                      formulariostate.nombre.length === 0 ||
                      formulariostate.total.length === 0 ||
                      formulariostate.features.length === 0 ||
                      formulariostate.features.length > 1 
                      :
                      formulariostate.nombre.length === 0 ||
                      formulariostate.total.length === 0 ||
                      formulariostate.features.length === 0 ||
                      formulariostate.users.length === 0 ||
                      formulariostate.complexity.length === 0 ||
                      formulariostate.sistema.length === 0 ||
                      formulariostate.service.length === 0
                  }
                >Add Project +</Button>
              </Grid>
              <Grid style={{ margin: '1em' }}></Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={() => setDialogOpen(false)}>Cancel</Button>
              </Grid>
            </Grid>
          </Grid>

          {/* </form> */}
        </DialogContent>
      </Dialog >
    </LocalizationProvider>

  )
};

export default ModalDatePicker;

