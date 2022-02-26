import { useState, useEffect } from "react";

const useFetch = (url) => {
  // Llenar la Grilla
  const [data, setData] = useState(null);
  //Loading
  const [isPending, setIsPending] = useState(true);
  // Manejo de errores en la grilla fetch
  const [erroresFetch, setErroresFetch] = useState(null);

  useEffect(async() => {
    const abortController = new AbortController();

    // setTimeout(async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal});
        if (response.ok) { //console.log(response);
          const json = await response.json();
          setData(json);
          setIsPending(false);
        } else {
          throw new Error('Something went wrong ...');
        }
        // Quitar mensaje error
        setErroresFetch(null);
      } catch (error) {   
        if (error.name === 'AbortError') {
          // console.log('fetch abortado');
        } else {
          // Guardar los errores en el state
          setErroresFetch(error.message);
          // Si tiene errores, no mostrar el skeleton
          setIsPending(false);
        }
      }
    // }, 2000);

    return () => {
      // console.log('clean up')
      abortController.abort();
    }
  }, [url])

  return { data, isPending, erroresFetch, setData };
};

export default useFetch;