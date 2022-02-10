// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// // Fechas
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// // import Format from 'date-fns/format';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import esLocale from 'date-fns/locale/es';
// // Mui 
// import { Button, Dialog, DialogContent, Grid, InputAdornment, styled, Typography } from '@mui/material';
// import { Controller, useForm, useFormState } from "react-hook-form";
// // Radio
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// // select
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { format } from 'date-fns';
// import { FormTextField } from './InputForm';

// // css
// // import styles from './formcontrollabel.module.css';
// const Estiloradiogroup = styled(FormControlLabel)({
//   fontWeight: 100,

// });

// const ModalDatePicker = (props) => {

//   // Para modal y grilla
//   const { dialogOpen, setDialogOpen, rowgrilla, setRowgrilla } = props;
//   // Array para select
//   const platformOptions = ['Android', 'iOS', 'Web'];
//   const featuresOptions = ['Photo-Video', 'GPS', 'File Transfer', 'Users Authentication', 'Push Notifications'];

//   const defaultValues = {
//     nombre: '',
//     fechaValue: new Date(),
//     total: '',
//     service: '',
//     users: '',
//     complexity: '',
//     sistema: [],
//     features: [],
//   }

//   // React Hook Form
//   // const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm({
//   //   // mode: 'onTouched',

//   // });

//   const methods = useForm({ defaultValues: defaultValues });
//   const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = methods;



//   const onSubmit = (values) => {
//     console.log(values);
//     // let idRow = rowgrilla.length + 1;

//     // setRowgrilla([...rowgrilla, {
//     //   id: idRow,
//     //   nombre: values.nombre,
//     //   fechaValue: format(values.fechaValue, 'dd/MM/yyyy'),
//     //   total: values.total,
//     //   service: values.service,
//     //   users: values.users,
//     //   complexity: values.complexity,
//     //   sistema: values.sistema.join(', '),
//     //   features: values.features.join(', '),
//     // }]);
//     // console.log(rowgrilla);
//     // reset();
//   }

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
//         <Dialog
//           open={dialogOpen}
//           onClose={() => setDialogOpen(false)}
//           fullWidth
//           maxWidth='md'
//         >
//           <Grid container >
//             <Grid item>
//               <Typography variant='h2' gutterBottom>
//                 Add a new Project
//               </Typography>
//             </Grid>
//           </Grid>

//           <DialogContent>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid container justifyContent='space-around' >

//                 <Grid item>

//                   <Grid item container direction='column' sm>
//                     <Grid item>
//                       <Controller
//                         render={({ field }) => (
//                           <TextField
//                             {...field}
//                             variant="filled"
//                             label='Name'
//                             {...register("nombre", {
//                               required: {
//                                 value: true,
//                                 message: "Name is required"
//                               },
//                               minLength: {
//                                 value: 3,
//                                 message: "Name must be at least 3 characters"
//                               },
//                               maxLength: {
//                                 value: 20,
//                                 message: "Name must be at most 20 characters"
//                               },
//                               pattern: {
//                                 value: /^[a-zA-Z]+$/,
//                                 message: "Name must be letters only"
//                               }
//                             })
//                             }
//                           />)}
//                         name='nombre'
//                         control={control}
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item>
//                       {errors.nombre &&
//                         <Typography
//                           variant='body2'
//                           color='error'>
//                           {errors.nombre.message}
//                         </Typography>}
//                     </Grid>

//                     <Grid item container style={{ marginTop: '3em' }}>
//                       <Grid item>
//                         <FormControl component="fieldset">
//                           <FormLabel component="legend">Service</FormLabel>
//                           <Controller
//                             name="service"
//                             control={control}
//                             rules={{ required: true }}
//                             render={({ field }) => (
//                               <RadioGroup
//                                 {...field}
//                                 aria-label="service"
//                                 value={field.service}
//                                 onChange={e => field.onChange(e)}
//                               >
//                                 <Estiloradiogroup
//                                   label="Website"
//                                   value="Website"
//                                   control={<Radio />}
//                                 />
//                                 <Estiloradiogroup
//                                   value="Mobile App"
//                                   control={<Radio />}
//                                   label="Mobile App"
//                                 />
//                                 <Estiloradiogroup
//                                   value="Custom Software"
//                                   control={<Radio />}
//                                   label="Custom Software"
//                                 />
//                               </RadioGroup>

//                             )} />
//                         </FormControl>
//                       </Grid>
//                     </Grid>

//                     <Grid item>
//                       {errors.service &&
//                         <Typography
//                           variant='body2'
//                           color='error'>
//                           {errors.service.message}
//                         </Typography>}
//                     </Grid>

//                     <Grid item>
//                       <FormControl variant="filled" fullWidth>
//                         <InputLabel id="demo-simple-select-label">Sistema</InputLabel>
//                         <Controller
//                           render={({ field }) => (
//                             <Select
//                               value={field.value}
//                               onChange={e => field.onChange(e)}
//                               multiple
//                               MenuProps={{ style: { zindex: 1302 } }}
//                             >
//                               {
//                                 platformOptions.map(option => (
//                                   <MenuItem key={option} value={option}>
//                                     {option}
//                                   </MenuItem>
//                                 ))
//                               }
//                             </Select>
//                           )}
//                           name='sistema'
//                           control={control}
//                         />

//                       </FormControl>
//                     </Grid>
//                   </Grid>

//                 </Grid>

//                 <Grid item>

//                   <Grid item container direction='column' sm >
//                     <Grid item >
//                       <Controller
//                         name='fechaValue'
//                         control={control}
//                         render={({ field }) => (
//                           <DatePicker
//                             {...field}
//                             inputFormat="dd/MM/yyyy"
//                             value={field.value}
//                             onChange={(e) => field.onChange(e)}
//                             renderInput={(params) => <TextField {...params} />}
//                           />)
//                         }
//                       />
//                     </Grid>

//                     <Grid item container style={{ marginTop: '3em' }} justifyContent='center' >
//                       <Grid item>
//                         <FormControl component="fieldset">
//                           <FormLabel component="legend">Complexity</FormLabel>
//                           <Controller
//                             name="complexity"
//                             control={control}
//                             render={({ field }) => (
//                               <RadioGroup
//                                 {...field}
//                                 aria-label="complexity"
//                                 value={field.complexity}
//                                 onChange={e => field.onChange(e)}
//                                 {...register("complexity", {
//                                   required: {
//                                     value: true,
//                                     message: "Service is required"
//                                   }
//                                 })
//                                 }
//                               >
//                                 <Estiloradiogroup
//                                   label="Low"
//                                   value="Low"
//                                   control={<Radio />}
//                                 />
//                                 <Estiloradiogroup
//                                   value="Medium"
//                                   control={<Radio />}
//                                   label="Medium"
//                                 />
//                                 <Estiloradiogroup
//                                   value="Hight"
//                                   control={<Radio />}
//                                   label="Hight"
//                                 />
//                               </RadioGroup>

//                             )} />
//                         </FormControl>
//                       </Grid>
//                     </Grid>

//                     <Grid item alignSelf='center'>
//                       {errors.complexity &&
//                         <Typography
//                           variant='body2'
//                           color='error'>
//                           {errors.complexity.message}
//                         </Typography>}
//                     </Grid>

//                   </Grid>

//                 </Grid>

//                 <Grid item>

//                   <Grid item container direction='column' sm>
//                     <Grid item>
//                       <FormTextField
//                         name={"total"}
//                         control={control}
//                         label="Total"   
               
//                       />
//                       {/* <Controller
//                         name='total'
//                         control={control}
//                         render={({ field }) => (
//                           <TextField
//                             // {...field}
//                             variant="filled"
//                             label='Total'
//                             InputProps={{
//                               startAdornment: <InputAdornment position='start'>$  </InputAdornment>
//                             }}
//                           />
//                         )}
//                       /> */}
//                     </Grid>

//                     <Grid item container style={{ marginTop: '3em' }} justifyContent='flex-end'>
//                       <Grid item>
//                         <FormControl component="fieldset">
//                           <FormLabel component="legend">Users</FormLabel>
//                           <Controller
//                             name="users"
//                             control={control}
//                             render={({ field }) => (
//                               <RadioGroup
//                                 {...field}
//                                 aria-label="users"
//                                 value={field.users}
//                                 onChange={e => field.onChange(e)}
//                               >
//                                 <Estiloradiogroup
//                                   label="0-10"
//                                   value="0-10"
//                                   control={<Radio />}
//                                 />
//                                 <Estiloradiogroup
//                                   value="10-100"
//                                   control={<Radio />}
//                                   label="10-100"
//                                 />
//                                 <Estiloradiogroup
//                                   value="100-1000"
//                                   control={<Radio />}
//                                   label="100-1000"
//                                 />
//                               </RadioGroup>

//                             )} />
//                         </FormControl>
//                       </Grid>
//                     </Grid>

//                     <Grid item>
//                       <FormControl variant="filled" sx={{ width: 205 }}>
//                         <InputLabel id="demo-simple-select-label">Features</InputLabel>
//                         <Controller
//                           render={({ field }) => (
//                             <Select

//                               value={field.value}
//                               onChange={e => field.onChange(e)}
//                               multiple
//                               MenuProps={{ style: { zindex: 1302 } }}
//                             >
//                               {
//                                 featuresOptions.map(option => (
//                                   <MenuItem key={option} value={option}>
//                                     {option}
//                                   </MenuItem>
//                                 ))
//                               }
//                             </Select>
//                           )}
//                           name='features'
//                           control={control}
//                         />

//                       </FormControl>
//                     </Grid>

//                   </Grid>
//                 </Grid>

//                 <Grid container justifyContent='center'>
//                   <Grid item>
//                     <Button
//                       variant='contained'
//                       color='primary'
//                       type='submit'
//                     // disabled={!useFormState.isValid}
//                     >Add Project +</Button>
//                     <Button variant='contained' color='secondary' onClick={() => setDialogOpen(false)}>Cancel</Button>
//                   </Grid>
//                 </Grid>

//               </Grid>
//             </form>
//           </DialogContent>

//         </Dialog>
//       </LocalizationProvider>
//     </>
//   )
// };

// export default ModalDatePicker;

