// new Intl.NumberFormat("es-CL", {style: "currency", currency: "CLP"}).format(20000000)
export const rows = [
  { id: 1, nombre: 'Frozen yoghurt', fechaValue: '08/01/2020', service: 'A', features: 'A', complexity: 'A', sistema: 'A', users: 'A', total: '$100', search: false },
  { id: 2, nombre: 'Ice cream sandwich', fechaValue: '08/01/2020', service: 'B', features: 'B', complexity: 'B', sistema: 'B', users: 'B', total: '$100', search: true },
  { id: 3, nombre: 'Eclair', fechaValue: '08/01/2020', service: 'Website', features: 'Basic, Interactive', complexity: 'N/A', sistema: 'N/A', users: 'N/A', total: '$100', search: true },
  { id: 4, nombre: 'Cupcake', fechaValue: '08/01/2020', service: 'Website', features: 'Basic, Interactive', complexity: 'N/A', sistema: 'iOS', users: 'N/A', total: '$300', search: true },
  { id: 5, nombre: 'Gingerbread', fechaValue: '08/01/2020', service: 'Website', features: 'Basic, Interactive', complexity: 'N/A', sistema: 'N/A', users: 'N/A', total: '$300', search: true },
  { id: 6, nombre: 'Jelly bean', fechaValue: '08/01/2020', service: 'Website', features: 'Basic, Interactive', complexity: 'N/A', sistema: 'N/A', users: 'N/A', total: '$300', search: true },
  { id: 7, nombre: 'Lollipop', fechaValue: '08/01/2020', service: 'Website', features: 'Basic, Interactive', complexity: 'N/A', sistema: 'N/A', users: 'N/A', total: '$400', search: true },
  { id: 8, nombre: 'Honeycomb', fechaValue: '08/01/2020', service: 'Custom Software', features: 'H', complexity: 'H', sistema: 'iOS', users: 'H', total: '$400', search: true },
  { id: 9, nombre: 'Eclair', fechaValue: '08/01/2020', service: 'Custom Software', features: 'I', complexity: 'I', sistema: 'iOS', users: 'I', total: '$400', search: true },
  { id: 10, nombre: 'Cupcake', fechaValue: '08/01/2020', service: 'Custom Software', features: 'J', complexity: 'J', sistema: 'iOS', users: 'J', total: '$100', search: true },
  { id: 11, nombre: 'Gingerbread', fechaValue: '08/01/2020', service: 'Custom Software', features: 'K', complexity: 'K', sistema: 'iOS', users: 'K', total: '$15700', search: true },
  { id: 12, nombre: 'Jelly bean', fechaValue: '08/01/2020', service: 'Custom Software', features: 'L', complexity: 'L', sistema: 'Android, iOS', users: 'L', total: '$15700', search: true },
  { id: 13, nombre: 'Lollipop', fechaValue: '08/01/2020', service: 'Custom Software', features: 'M', complexity: 'M', sistema: 'Android, iOS', users: 'M', total: '$15700', search: true },


];

function validateEmail(nombre) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(nombre).toLowerCase());
}

export const columns = [
  {
    field: 'nombre',
    headerName: 'Name',
    description: 'Nombre',
    editable: true,
    preProcessEditCellProps: (params) => {
      const hasError = params.props.value.length === 0;
      return { ...params.props, error: hasError };
    },
  },
  { field: 'fechaValue', headerName: 'Date', description: 'Date', editable: true },
  { field: 'service', headerName: 'Service', description: 'Service', editable: true },
  { field: 'features', headerName: 'Features', description: 'Features' },
  { field: 'complexity', headerName: 'Complexity', description: 'Complexity', editable: true },
  { field: 'sistema', headerName: 'Sistema', description: 'Sistema' },
  { field: 'users', headerName: 'Users', description: 'Users' },
  { field: 'total', headerName: 'Total', description: 'Total', editable: true },
  { field: 'search', headerName: 'search', description: 'search' },
];