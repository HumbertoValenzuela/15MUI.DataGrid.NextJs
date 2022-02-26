// React
import * as React from 'react';
import { useState, useEffect } from 'react';
// Next
// import Link from '../src/ui/Link';
// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
// import AddIcon from '@mui/icons-material/Add';
import { TextField, Paper, IconButton, Button, Chip, useMediaQuery } from '@mui/material';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// Array datagrid arraySwitch
import { columns } from '../array/arrayDataGrid';
// Data Grid
import { DataGrid } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';
// import ModalDatePicker from './ModalDatePicker';
// import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/system';
import useFetch from '../hook/useFetch';
import SearchXNombreEnGrilla from '../components/SearchXNombreEnGrilla';
import useMatchesMedia from '../hook/useMatchesMedia';
import FormGroupSwitch from '../components/FormGroupSwitch';

const DynamicDataGrid = () => {

  // hook useFetch
  const { data: rows, isPending, erroresFetch } = useFetch('https://nodemysql2storeprocedure-query.herokuapp.com/api/clientes');
  const [rowgrilla, setRowgrilla] = useState(rows);
  const { breakpointsMatches: matchesMD } = useMatchesMedia('md');
  const { breakpointsMatches: matchesSM } = useMatchesMedia('sm');

  const [selectionModel, setSelectionModel] = React.useState([])
  const [snackbarstate, setsnackbarstateState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    backgroundColor: '',
  });
  const [undo, setUndo] = useState([]);
  // Menu item
  const [totalFilter, setTotalFilter] = useState(">");
  const [anchorElMenuItem, setanchorElMenuItem] = React.useState(null);
  const openMenuItem = Boolean(anchorElMenuItem);
  const [filterPrices, setfilterPrices] = useState('');

  const [editRowsModel, setEditRowsModel] = useState({});
  // const [editRowsModelClone, setEditRowsModelClone] = useState({});

  const handleEditRowsModelChange = React.useCallback(async (model) => {

    setEditRowsModel(model);
    if (Object.keys(editRowsModel).length === 0) {
      // console.log('Vacio {} ')
      return
    } else {
      // console.log(editRowsModel)
      // if (Object.keys(editRowsModel).length < 3) {
      //   return
      // } else {
        const extraerIdYValue = Object.entries(editRowsModel);
        if (extraerIdYValue.length === 0) {
          return
        } else {

          const obtenerId = extraerIdYValue[0][0];
          // console.log(obtenerId);

          const obtenerCampoArray = Object.keys(extraerIdYValue[0][1]);
          const obtenerCampo = obtenerCampoArray[0];
          // console.log(obtenerCampo);

          const obtenerValue = extraerIdYValue[0][1][`${obtenerCampo}`].value;
          // console.log(obtenerValue);

          try {
            const respuesta = await fetch('https://nodemysql2storeprocedure-query.herokuapp.com/api/clientes/editrowmodelcliente', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ obtenerId, obtenerCampo, obtenerValue})
            })
            const dato = await respuesta.json();
            // console.log(dato);
            return dato;

          } catch (error) {
            console.log()
          }
        }
      // }



    }
  }, [editRowsModel]);


  const filterListIconButton = (event) => {
    setanchorElMenuItem(event.currentTarget);
  };

  const handleCloseMenuItem = () => {
    setanchorElMenuItem(null);
  };

  useEffect(() => {
    const handleChangeTotal = () => {
      const totalTextFieldANumero = parseInt(filterPrices);

      const filtrandoPorMayorMenorIgual = row => {
        const totalanumero = parseInt(row.total.replace('$', ''))
        if (totalFilter === ">") {
          return totalanumero > totalTextFieldANumero ? row : null
        }
        if (totalFilter === "<") {
          return totalanumero < totalTextFieldANumero ? row : null
        }
        if (totalFilter === "=") {
          return totalanumero === totalTextFieldANumero ? row : null
        }
      }
      const otroarray = rows.filter(filtrandoPorMayorMenorIgual);
      setRowgrilla(otroarray);
    }

    if (filterPrices !== '') {
      handleChangeTotal()
    } else {
      setRowgrilla(rows)
    }
  }, [filterPrices, totalFilter])
  // // ----------------------------------------------------

  const { open, vertical, horizontal, message, backgroundColor } = snackbarstate;

  const handleDeleteRows = async () => {
    if (selectionModel.length === 0) {
      return
    } else {

      try {
        // allSettled
        const result = await Promise.allSettled(selectionModel.map(async (id) => {
          const respuesta = await fetch('https://nodemysql2storeprocedure-query.herokuapp.com/api/clientes/updatecliente', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          })
          const dato = await respuesta.json();
          // console.log(dato);
          return dato;
        }
        ));
        // console.log(result[0].value[1].serverStatus);

        if (result[0].value[1].serverStatus === 2) {
          const selectedRows = rowgrilla.filter(row => selectionModel.includes(row.id));
          selectedRows.map(row => (row.search = false));
          const grilla = rowgrilla.filter(row => row.search !== false);
          setRowgrilla(grilla);

          setsnackbarstateState({ open: true, vertical: 'top', horizontal: 'center', message: 'Eliminado', backgroundColor: '#FF3232' });

          setUndo(selectedRows);
          setSelectionModel([]);
        } else {
          setsnackbarstateState({ open: true, vertical: 'top', horizontal: 'center', message: 'No se pudo eliminar', backgroundColor: '#FF3232' });
        }

      } catch (error) {
        console.log(error)
      }
    }
  }




  const handleOnUndo = async () => {
    setsnackbarstateState({ ...snackbarstate, open: false });
    const newRows = [...rowgrilla];
    // console.log(undo);

    const arraySoloIdATrue = undo.map(row => row.id)
    // console.log(mm);
    try {
      // allSettled

      const result = await Promise.allSettled(arraySoloIdATrue.map(async (id) => {
        const respuesta = await fetch('https://nodemysql2storeprocedure-query.herokuapp.com/api/clientes/undoupdatecliente', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        const dato = await respuesta.json();
        // console.log(dato);
        return dato;
      }
      ));
      const redo = [...undo];
      redo.map(row => (row.search = true));
      newRows.unshift(...redo);
      setRowgrilla(newRows);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Grid
      container
      direction='column'
      alignItems={matchesSM ? 'center' : undefined}
    >
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        onClose={(evento, reason) => {
          if (reason === 'clickaway') {
            setsnackbarstateState({ ...snackbarstate, open: false })
            const newRows = [...rowgrilla];
            const ids = [...undo.map(row => row.id)];
            setRowgrilla(newRows.filter(row => !ids.includes(row.id)));
          }
        }
        }
        message={message}
        key={vertical + horizontal}
        ContentProps={{ style: { backgroundColor: backgroundColor } }}
        action={
          <>
            <Button style={{ color: "#ffffff" }} onClick={handleOnUndo}>Undo</Button>
          </>
        }
      />

      <Grid item style={{ marginTop: '2em', marginLeft: matchesSM ? '0.05em' : '1em' }}>
        <Box sx={{ mt: 10 }}>
          <Typography variant={matchesSM ? 'h6' : 'h4'}>
            Next.js example whit MUI DataGrid and MySql
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <SearchXNombreEnGrilla
          setRowgrilla={setRowgrilla}
          rowgrilla={rowgrilla}
          rows={rows}
        />
      </Grid>

      <Grid item>
        <FormGroupSwitch
          rows={rows}
          setRowgrilla={setRowgrilla}
        />
      </Grid>

      <Grid item container justifyContent='flex-end' style={{ marginTop: '1em' }}>
        <Grid item>
          {
            selectionModel.length > 0 &&
            <IconButton
              aria-label="delete"
              onClick={handleDeleteRows}
            >
              <DeleteIcon
                style={{ fontSize: 30 }}
              />
            </IconButton>
          }
        </Grid>
        <Grid item>

          <FilterListIcon color='secondary' style={{ fontSize: 35, cursor: 'pointer' }} onClick={filterListIconButton} />
          <Menu
            anchorEl={anchorElMenuItem}
            open={openMenuItem}
            onClose={handleCloseMenuItem}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <MenuItem>
              <TextField
                value={filterPrices}
                onChange={(e) => { setfilterPrices(e.target.value); }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment
                    position="end"
                    style={{ pointer: 'click', fontSize: '1.8em' }}
                    onClick={() => {
                      setTotalFilter(totalFilter === '>'
                        ? '<'
                        : totalFilter === '<'
                          ? '='
                          : '>')
                    }}
                  >
                    <span>{totalFilter}</span>
                  </InputAdornment>
                }}
              />
            </MenuItem>

          </Menu>
        </Grid>
      </Grid>

      <Grid item container style={{ height: matchesSM ? 500 : 300 }} justifyContent='center' >
        <Grid item
          style={{ display: 'flex', height: '100%', width: matchesSM ? '100%' : '80%' }}
        >

          <div
            style={{ flexGrow: 1 }}
          >
            {
              erroresFetch && <Typography variant='h6' color='secondary'>{erroresFetch}</Typography>
            }
            {
              isPending &&

              <Skeleton
                sx={{ bgcolor: 'grey.900' }}
                variant="rectangular"
                width={600}
                height={200}
              />
            }
            {
              rowgrilla &&
              <DataGrid
                headerHeight={45}
                rows={rowgrilla}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                isRowSelectable={(params) => params.row.total > '$199'}
                rowHeight={27}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                hideFooterSelectedRowCount={false}
                rowsPerPageOptions={[100, 50, 25]}
                editRowsModel={editRowsModel}
                onEditRowsModelChange={handleEditRowsModelChange}

              />
            }
          </div>
        </Grid>

      </Grid>


      <Grid container justifyContent='flex-end' style={{ marginTop: '1em', marginBottom: '1em' }}>
        <Grid item>
          {
            filterPrices !== ''
              ? (<Chip
                color="primary"
                onDelete={() => { setfilterPrices('') }}
                label={
                  totalFilter === '>'
                    ? `Less than $${filterPrices}`
                    : totalFilter === '<'
                      ? `More than $${filterPrices}`
                      : `Equal to $${filterPrices}`

                } />)
              : null
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DynamicDataGrid