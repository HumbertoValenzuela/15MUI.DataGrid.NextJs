import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
// Fechas
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import Format from 'date-fns/format';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import esLocale from 'date-fns/locale/es';
// Mui 
import { Button, Dialog, DialogContent, Grid, InputAdornment, styled, Typography, useMediaQuery, useTheme } from '@mui/material';

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

  // useMediaQuery
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Para modal y grilla
  const { dialogOpen, setDialogOpen, rowgrilla, setRowgrilla } = props;
  // Array para select
  const platformOptions = ['Android', 'iOS', 'Web'];
  let featuresOptions = ['Photo-Video', 'GPS', 'File Transfer', 'Users Authentication', 'Push Notifications'];
  let websiteOptions = ['Basic', 'Interactive', 'E-Commerce'];

  const defaultValues = {
    id: 0,
    nombre: '',
    fechaValue: new Date(),
    service: 'Website',
    features: [],
    complexity: '',
    sistema: [],
    users: '',
    total: 0,
    search: 'true'
  }

  const [formulariostate, setformulariostate] = useState(defaultValues);
  const [isPending, setIsPending] = useState(false);
  const [fechaValor, setfechaValor] = useState(new Date());

  const handleChangeFecha = (e) => {
    setfechaValor(e);
    setformulariostate({ ...formulariostate, fechaValue: e });
  }

  const handleFormularioChange = (e) => {
    setformulariostate({ ...formulariostate, [e.target.name]: e.target.value });

  }

  // console.log('fechaValor', fechaValor);



  const onSubmitFormulario = async() => {

    setIsPending(true);
    // console.log('formulariostate', formulariostate);
    const respuesta = await fetch('https://nodemysql2storeprocedure-query.herokuapp.com/api/clientes/crearcliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulariostate)
    });
    const json = await respuesta.json();
    // console.log('json', json);
    setIsPending(false);

    // console.log(json[0][0].id);
    // let idRow = rowgrilla.length + 1;
    // console.log(rowgrilla.length)
    setRowgrilla([...rowgrilla, {
      id: json[0][0].id,
      nombre: formulariostate.nombre,
      fechaValue: format(formulariostate.fechaValue, 'dd/MM/yyyy'),
      service: formulariostate.service,
      features: formulariostate.features.join(', '),
      complexity: formulariostate.service === 'Website' ? 'N/A' : formulariostate.complexity,
      sistema: formulariostate.service === 'Website' ? 'N/A' : formulariostate.sistema.join(', '),
      users: formulariostate.service === 'Website' ? 'N/A' : formulariostate.users,
      total: formulariostate.total,
      // new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(formulariostate.total)
      // Number(formulariostate.total)
      search: 'true'
    }]);
    // console.log(rowgrilla);
    // new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(formulariostate.total)

    setDialogOpen(false);
    // console.log('formularioState ', formulariostate);
    reset();    
  }

  const reset = () => {
    setformulariostate(defaultValues);    
  }

  useEffect(() => {
    setformulariostate({ ...formulariostate, features: [] });
  }, [formulariostate.service]);


  // const disableButtonvalidacion = () => {}

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        fullScreen={matchesSM}
        maxWidth='md'
        style={{ marginTop: matchesSM ? '4em' : '6em' }}
      >
        <Grid container  >
          <Grid item>
            <Typography variant={matchesSM ? 'h6' : 'h4'} gutterBottom>
              Add a new Project
            </Typography>
          </Grid>
        </Grid>

        <DialogContent >
          {/* <form onSubmit={onSubmitFormulario}> */}
          <Grid
            container
            justifyContent='space-around'
            direction={matchesMD ? 'column' : 'row'}
            alignItems={matchesMD ? 'center' : undefined}
          >

            <Grid item>

              <Grid item container direction='column' sm>
                <Grid item>
                  <TextField
                    style={{ width: matchesSM ? 200 : undefined }}
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

                <Grid item style={{ marginTop: matchesSM ? '1em' : 0 }}>
                  <FormControl variant="filled" sx={{ width: 205 }}>
                    <InputLabel id="sistemainputlabel">Multiple Sistema</InputLabel>
                    <Select
                      MenuProps={{ style: { zindex: 1302 } }}
                      multiple
                      style={{ width: matchesSM ? 200 : undefined }}
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

              <Grid item container direction='column' sm style={{ marginTop: matchesSM ? '1em' : 0 }}>
                <Grid item >

                  <MobileDatePicker
                    label="Date"
                    value={fechaValor}
                    onChange={handleChangeFecha}
                    renderInput={(params) => <TextField style={{ width: matchesSM ? 200 : undefined }} {...params} />}
                  />
                  <Grid item>
                    <Typography
                      variant='body2'
                      color='error'>
                      error
                    </Typography>
                  </Grid>


                </Grid>

                <Grid item container style={{ marginTop: '1em' }} justifyContent={matchesSM ? undefined : 'center'} >
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

              <Grid item container direction='column' sm style={{ marginTop: matchesSM ? '1em' : 0 }}>
                <Grid item>
                  {/* <FormTextField
                      name={"total"}
                      label="Total"
                    /> */}
                  <TextField
                    style={{ width: matchesSM ? 200 : undefined }}
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

                <Grid item container style={{ marginTop: '1em' }} justifyContent={matchesSM ? undefined : 'flex-end'}>
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

                <Grid item style={{ marginTop: matchesSM ? '1em' : 0 }}>
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

            <Grid container justifyContent='center' style={{ marginTop: matchesSM ? '1em' : 0 }}>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={onSubmitFormulario}
                  disabled={
                    isPending === true,
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
                <Button variant='contained' color='secondary' onClick={() => {setDialogOpen(false); reset();}}>Cancel</Button>
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

