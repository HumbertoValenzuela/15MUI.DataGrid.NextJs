// 1. Section 15 Intro
// Tendrá un buscador que filtra con un onChange.
// Filtros por checkbox
// DataGrid. suma, order by, 

// 2. Project 2 Setup
// bioler play, ir a SSR de MUI
// https://mui.com/guides/server-rendering/
// al final de la página, clic en Netxjs - 
// ver el github - instalar usando el GitBash (con el cmd no funcionará)
// https://github.com/mui-org/material-ui/tree/HEAD/examples/nextjs
// curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs
// para descargar las dependencias del proyecto: npm install

// Link en nextjs usando MUI es diferente.
// MUI configuro por nosotros.

// 6. Using Tables. instalar para usar las grillas
// npm install @mui/x-data-grid

// 10. Using DatePicker
// npm install @date-io/date-fns
// npm i --save date-fns
// npm install @mui/lab
// views={['day', 'month', 'year']} muestra siempre el mes, el año y el día
// myDate?.toUTCString()

// 11. Using DatePicker Continued
// al usar useState para el DatePicker, no se puede usar el DatePicker de MUI, porque no tiene el name. DataPicker solo manda el resultado.
// https://react-hook-form.com/get-started
// npm install --save react-hook-form
// Al usar esta herramienta es posible tener un form con muchos campos sin problemas. Además disminuye los renderizados

           {/*  */}

                              
                              // <MenuItem value='hola'>holaa</MenuItem>
                              // <MenuItem value='2'>Twenty</MenuItem>
                              // <MenuItem value='23'>Thirty</MenuItem>
// 19 Filtering Table By Search 
// index.js: en textfield agregar un value y onchange. crear un usestate.
// Agregar campo al arreglo grilla al final colocar true.
// ModalDatePicker: En el boton Add Project agregar true
// rowgrilla.map( row => Object.values(row)) devuelve los values, no devuelve los nombres
// rowgrilla.map( row => Object.values(row)).map(option => console.log(option)) //Devuelve cada registro como array de valores
// const obtenerValuesrowData = rowgrilla.map(row => Object.values(row).filter(option => option !== true && option !== false)) //Devuelve cada registro como array de valores pero los true y false no los muestra
// obtenerValuesrowData.map( row => row.map(option => console.log(option))); // Ingresa a cada registro y muestra cada valor. no existe el array
// const matches = obtenerValuesrowData.map( row => row.map(option => option.toLowerCase().includes(search.toLowerCase()))); // recorre los valores obtenerValuesrowData en cada fila el contenido lo transforma a minusculas y includes search en minusculas

// método find: retorna un objeto si encuentra el valor, si no encuentra retorna undefined
/*const resultado = rowgrilla.find(row => row.nombre === event.target.value);
if (resultado == undefined) {
  console.log('No existe');
} else {
  console.log('Existe: ', resultado )
}*/

// método filter: retorna un array de objetos que cumpla la condición.  
/*const resultado = rowgrilla.filter(helado => helado.nombre === event.target.value);
if (resultado.length == 0 ) {
  console.log('no hay resultados')
} else {
  console.log('resultado ', resultado)
}
*/

// método findIndex: retorna el índice del objeto que cumpla la condición. Si no lo encuentra retorna -1

/*const resultado = rowgrilla.findIndex(helado => helado.nombre === event.target.value);
if (resultado >= 0 ) {
  console.log('Resultado: ', resultado);
} else {
  console.log('resultado ', resultado)
}*/

// Método some: retorna true si al menos un objeto cumple la condición. Si no lo encuentra retorna false. Si existe mas de uno la condición retorna true
/*const resultado = rowgrilla.some(helado => helado.nombre === event.target.value);
if (resultado) {
  console.log('existe: ', resultado);
} else {
  console.log('no existe:  ', resultado)
}*/

// indexOf: retorna el índice del objeto que cumpla la condición. Si no lo encuentra retorna -1

// iterar un objeto
/*const personaObj = {
  nombre: 'Juan',
  apellido: 'Perez',
  edad: 30
}

personaObj[Symbol.iterator] = function* () {
  const values = Object.values(personaObj);
  for (const value of values) {
    yield value;
  }     
}
*/

// Object.keys(): retorna un array de string con los nombres de las propiedades del objeto.
// console.log(Object.keys(personaObj)); // nombre, apellido, edad

// Object.values(): retorna un array de valores de las propiedades del objeto.
// console.log(Object.values(personaObj)); // "Juan", "Perez", 30
// Uso de Object.values():
// Se tiene un objeto de salarios y se quiere sumar todos los salarios.
// const salarios = {
//   juan: 1000,
//   pablo: 2000,
//   jose: 3000
// }
/*console.log(
  Object.values(salarios).reduce((total, actual) => { return total + actual}, 0)
)*/

// Object.entries(): retorna un array de arrays con los nombres y valores de las propiedades del objeto.
// console.log(Object.entries(personaObj)); // [ [ 'nombre', 'Juan' ], [ 'apellido', 'Perez' ], [ 'edad', 30 ] ]
// console.log(myArray[0]) // [ 'nombre', 'Juan' ]
// console.log(myArray[0][0]) // nombre

// const persona2 = [
//    [ 'nombre', 'Juan' ],
//    [ 'apellido', 'Perez' ], 
//    [ 'edad', 30 ] 
// ]
// Object.fromEntries(): recibe un array de arrays y retorna un objeto. Es lo inverso a Object.entries()
//console.log(  Object.fromEntries(persona2) ); // { nombre: 'Juan', apellido: 'Perez', edad: 30 }

// Object.assign(): Recibe dos parametros (puede ser un objeto p un array) estos son la fuente y el destino, es decir, lo que se va a copiar.
// la copia es por valor en el primer nivel de objetos, y por referencia los sgte niveles, es decir, direccion es por referencia.
// const salarios = {
//   juan: 1000,
//   pablo: 2000,
//   jose: 3000
//   direccion: {
//     calle: 'Av. Siempreviva',
// }}

// con inputProps se podrá acceder a los valores nativos del objeto, es decir, input
// <TextField
// inputProps={{ maxLength: 20 }}


// 30. Filtering Total By Range Continued

