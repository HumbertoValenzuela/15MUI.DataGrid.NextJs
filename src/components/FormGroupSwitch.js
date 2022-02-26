import React, { useState, useEffect, memo, useCallback } from 'react'
import useMatchesMedia from '../hook/useMatchesMedia';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Grid } from '@mui/material';


const FormGroupSwitch = memo(({rows, setRowgrilla }) => {
  const { breakpointsMatches: matchesSM } = useMatchesMedia('sm');
  const [stateswitch, setStateswitch] = useState({
    websites: false,
    iOS: false,
    android: false,
    customsoftware: false,
  });

  const handleChangeSwitch = useCallback((event) => {
    setStateswitch({ ...stateswitch, [event.target.name]: event.target.checked });
  },[setStateswitch, stateswitch]);

  useEffect(() => {
    const handleChangeSwitchFilter = () => {      
      // const nestedVectorsDeep= JSON.parse(JSON.stringify(rows)); //DeepClone
      if (!stateswitch.websites && !stateswitch.iOS && !stateswitch.android && !stateswitch.customsoftware) {
        return setRowgrilla(rows);
      } else {
        const websiteFilter = rows.filter(row => stateswitch.websites ? row.service === 'Website' : null);
        const iOSFilter = rows.filter(row => stateswitch.iOS ? row.sistema.includes('iOS') : null);
        const androidFilter = rows.filter(row => stateswitch.android ? row.sistema.includes('Android') : null);
        const customsoftwareFilter = rows.filter(row => stateswitch.customsoftware ? row.service.includes('Custom Software') : null);
        // let newRows = websiteFilter.concat(iOSFilter);
        let newRows = websiteFilter.concat(iOSFilter.filter(item => websiteFilter.indexOf(item) < 0));
        let newRows2 = newRows.concat(androidFilter.filter(item => newRows.indexOf(item) < 0));
        let newRows3 = newRows2.concat(customsoftwareFilter.filter(item => newRows2.indexOf(item) < 0));
        // console.log(newRows3);
        return setRowgrilla(newRows3);
      }
    }

    if (rows === null) {
      return
    } else {
      handleChangeSwitchFilter()
    }
  }, [stateswitch.websites, stateswitch.iOS, stateswitch.android, stateswitch.customsoftware, rows])


  return (
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
  )
});

export default FormGroupSwitch