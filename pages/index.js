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
import { TextField, Paper } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// Array datagrid arraySwitch
import arraySwitch from '../src/array/arraySwitch';
import { columns, rows } from '../src/array/arrayDataGrid';
// Data Grid
import { DataGrid } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import ModalDatePicker from '../src/ui/ModalDatePicker';

export default function Index() {

  const [stateswitch, setStateswitch] = useState(arraySwitch);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [rowgrilla, setRowgrilla] = useState(rows);

  const handleChangeUpdateCheckedSwitch = (idSwitch) => {
    const newArraySwitch = stateswitch.map(switchitem => {
      if (switchitem.id === idSwitch) {
        return {
          ...switchitem,
          checked: !switchitem.checked
        }
      }
      return switchitem;
    });
    setStateswitch(newArraySwitch);
  }  

  // useEffect(() => {
  //   console.log(rowgrilla);
  // }, [rowgrilla]);
  

  return (
    
      <Grid container direction='column' style={{ backgroundColor: '#dfdddd'}}>

        <Grid item style={{ marginTop: '2em', marginLeft: '1em' }}>
          <Box sx={{ mt: 15 }}>
            <Typography variant="h1">
              Next.js example whit MUI DataGrid
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <TextField
            placeholder='Search project details or create a new entry'
            InputProps={{
              endAdornment:
                <InputAdornment
                  position="end"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon
                    color='primary'
                    style={{ fontSize: 30 }}
                  />
                </InputAdornment>,
            }}
            style={{ marginLeft: '1em', width: '35em' }}
          />
        </Grid>

        <Grid item>
          <FormGroup row>
            {
              stateswitch.map(switchItem => (
                <FormControlLabel
                  key={switchItem.id}

                  control={<Switch
                    name={switchItem.name}
                    color={switchItem.color}
                    checked={switchItem.websites}
                    onChange={() => handleChangeUpdateCheckedSwitch(switchItem.id)}
                  />
                  }
                  label={switchItem.label}
                  // Se va todo a la der. Para comenzar desde la izq FormGroup row
                  labelPlacement='start'
                />
              ))
            }
          </FormGroup>
        </Grid>

        <Grid item container justifyContent='flex-end' style={{ marginTop: '2em' }}>
          <Grid item>
            <FilterListIcon color='secondary' style={{ fontSize: 50 }} />
          </Grid>
        </Grid>

        <div style={{ height: 400, width: '100%' }} >
          <div
            style={{ display: 'flex', height: '100%' }}
          >
            <div
              style={{ flexGrow: 1 }}
            >
              <DataGrid
                rows={rowgrilla}
                columns={columns}
              />
            </div>
          </div>

        </div>

        <ModalDatePicker        
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          rowgrilla={rowgrilla}
          setRowgrilla={setRowgrilla}            
        />
      </Grid>
  
  );
}
