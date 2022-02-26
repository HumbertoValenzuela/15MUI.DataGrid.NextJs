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
import AddIcon from '@mui/icons-material/Add';
import { TextField, Paper, IconButton, Button, Chip, useMediaQuery } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// Array datagrid arraySwitch
import { columns, rows } from '../array/arrayDataGrid';

// Data Grid
import { DataGrid } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import ModalDatePicker from './ModalDatePicker';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/system';


const StaticDataGrid = () => {

  // useMediaQuery
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [stateswitch, setStateswitch] = useState({
    websites: false,
    iOS: false,
    android: false,
    customsoftware: false,
  });
  // Abrir Ventana Modal
  const [dialogOpen, setDialogOpen] = useState(false);
  // Llenar la Grilla
  const [rowgrilla, setRowgrilla] = useState(rows);
  // TextField Buscar
  const [search, setSearch] = useState('');
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
  // ----------------------------------------------------

  const { open, vertical, horizontal, message, backgroundColor } = snackbarstate;

  const handleChangeSwitch = (event) => {
    setStateswitch({ ...stateswitch, [event.target.name]: event.target.checked });
  }


  useEffect(() => {
    const handleChangeSwitchFilter = () => {
      // setRowgrilla(rowgrilla);
      // const nestedVectorsDeep= JSON.parse(JSON.stringify(rows));
      const websiteFilter = rows.filter(row => stateswitch.websites ? row.service === 'Website' : null);
      const iOSFilter = rows.filter(row => stateswitch.iOS ? row.sistema.includes('iOS') : null);
      const androidFilter = rows.filter(row => stateswitch.android ? row.sistema.includes('Android') : null);
      const customsoftwareFilter = rows.filter(row => stateswitch.customsoftware ? row.service.includes('Custom Software') : null);

      if (!stateswitch.websites && !stateswitch.iOS && !stateswitch.android && !stateswitch.customsoftware) {
        return setRowgrilla(rows);
      } else {
        // let newRows = websiteFilter.concat(iOSFilter);
        let newRows = websiteFilter.concat(iOSFilter.filter(item => websiteFilter.indexOf(item) < 0));
        let newRows2 = newRows.concat(androidFilter.filter(item => newRows.indexOf(item) < 0));
        let newRows3 = newRows2.concat(customsoftwareFilter.filter(item => newRows2.indexOf(item) < 0));

        // console.log(newRows3);
        return setRowgrilla(newRows3);
      }
    }

    handleChangeSwitchFilter()
  }, [stateswitch.websites, stateswitch.iOS, stateswitch.android, stateswitch.customsoftware])


  const handleChangeFilterGrilla = (event) => {
    setSearch(event.target.value);

    const matches = rows.filter(row => {
      if (row.search === true) {
        return row.nombre.includes(event.target.value)
      }
    })

    setRowgrilla(matches)
  }

  const handleDeleteRows = () => {

    const selectedRows = rowgrilla.filter(row => selectionModel.includes(row.id));
    selectedRows.map(row => (row.search = false));
    const grilla = rowgrilla.filter(row => row.search !== false);
    setRowgrilla(grilla);

    setsnackbarstateState({ open: true, vertical: 'top', horizontal: 'center', message: 'Search en false', backgroundColor: '#FF3232' });

    setUndo(selectedRows);
    setSelectionModel([]);
  }

  const handleOnUndo = () => {
    setsnackbarstateState({ ...snackbarstate, open: false });
    const newRows = [...rowgrilla];
    const redo = [...undo];
    redo.map(row => (row.search = true));
    newRows.unshift(...redo);
    setRowgrilla(newRows);

  }

  return (
    <>
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
      <Grid item>
        <TextField
          size='small'
          inputProps={{ maxLength: 20 }}
          placeholder='Search project for name or create a new entry'
          value={search}
          onChange={handleChangeFilterGrilla}
          InputProps={{
            endAdornment:
              <InputAdornment
                position="end"
                style={{ cursor: 'pointer' }}
                onClick={() => setDialogOpen(true)}
              >
                <Tooltip title="Add" arrow>

                  <AddIcon
                    color='primary'
                    style={{ fontSize: 30 }}
                  />
                </Tooltip>
              </InputAdornment>,
          }}
          style={{ marginLeft: matchesSM ? '0.1em' : '1em', width: matchesSM ? '100%' : '35em' }}
        />
      </Grid>

      <Grid item>
        <FormGroup row>
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            justifyContent={matchesSM ? 'center' : undefined}
            style={matchesSM ? { marginLeft: '1.5em' } : {}}
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Switch size='small' name='websites' color='primary'
                    checked={stateswitch.websites}
                    onChange={(e) => { handleChangeSwitch(e); }}
                  />
                }
                label='Websites'
                // Se va todo a la der. Para comenzar desde la izq FormGroup row
                labelPlacement={matchesSM ? 'end' : 'start'}
              >
              </FormControlLabel>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch size='small' name='iOS' color='primary'
                    checked={stateswitch.iOS}
                    onChange={(e) => { handleChangeSwitch(e); }}
                  />
                }
                label='iOS App'
                labelPlacement={matchesSM ? 'end' : 'start'}
              >
              </FormControlLabel>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch size='small' name='android' color='primary'
                    checked={stateswitch.android}
                    onChange={(e) => { handleChangeSwitch(e); }}
                  />
                }
                label='Android App'
                labelPlacement={matchesSM ? 'end' : 'start'}
              >
              </FormControlLabel>
            </Grid>
            <Grid item>
              <FormControlLabel

                control={
                  <Switch size='small' name='customsoftware' color='primary'
                    checked={stateswitch.customsoftware}
                    onChange={(e) => { handleChangeSwitch(e); }}
                  />
                }
                label='CustomSoftware'
                // Se va todo a la der. Para comenzar desde la izq FormGroup row
                labelPlacement={matchesSM ? 'end' : 'start'}
              >
              </FormControlLabel>
            </Grid>
          </Grid>




        </FormGroup>


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
            // onClick={handleClose}         
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
          style={{ display: 'flex', height: '100%', width: matchesSM ? '100%' : '90%' }}
        >

          <div
            style={{ flexGrow: 1 }}
          >
            <DataGrid
              rows={rowgrilla}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              isRowSelectable={(params) => params.row.total > '$199'}
              rowHeight={26}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}

            />
          </div>
        </Grid>

      </Grid>

      <ModalDatePicker
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        rowgrilla={rowgrilla}
        setRowgrilla={setRowgrilla}
      />
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
    </>

  );
}

export default StaticDataGrid