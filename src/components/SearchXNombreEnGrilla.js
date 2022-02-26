import React, { memo, useEffect, useState } from 'react'

import { InputAdornment, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ModalCrearCliente from './ModalCrearCliente';
import useMatchesMedia from '../hook/useMatchesMedia';

const SearchXNombreEnGrilla = memo(({ rows, setRowgrilla, rowgrilla }) => {
  // TextField Buscar
  const [search, setSearch] = useState('');
  const { breakpointsMatches: matchesSM } = useMatchesMedia('sm');
  // Abrir Ventana Modal
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {

    const handleChangeFilterGrillaPorPalabra = () => {
      if (search === '') {
        setRowgrilla(rows);
      } else {
        const nuevoArray = rows.filter(row => {
          if (row.search === "true") {
            return row.nombre.toLowerCase().includes(search.toLowerCase());
          }
        });
        setRowgrilla(nuevoArray);
      }
    }

    if (rows === null) {
      return
    } else {
      handleChangeFilterGrillaPorPalabra()
    }

  }, [search]);

  return (
    <>
      <TextField
        size='small'
        inputProps={{ maxLength: 20 }}
        placeholder='Search project for name or create a new entry'
        value={search}
        onChange={(e) => { setSearch(e.target.value); }}
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
      <ModalCrearCliente
        rowgrilla={rowgrilla}
        setRowgrilla={setRowgrilla}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  )
})

export default SearchXNombreEnGrilla;