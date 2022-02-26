import React, { useState } from 'react';
import ModalDatePicker from '../ui/ModalDatePicker';

const ModalCrearCliente = ({rowgrilla, setRowgrilla, setDialogOpen, dialogOpen}) => {

  return (
    <ModalDatePicker
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      rowgrilla={rowgrilla}
      setRowgrilla={setRowgrilla}

    />
  )
}

export default ModalCrearCliente