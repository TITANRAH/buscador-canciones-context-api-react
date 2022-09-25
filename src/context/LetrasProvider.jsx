import { useState, createContext } from "react";
import axios from "axios";

const LetrasContext = createContext();

function LetrasProvider({ children }) {
  const [alerta, setAlerta] = useState("");
  const [letra, setLetra] = useState("");
  const [cargando, setCargando] = useState(false);

  const busquedaLetra = async (busqueda) => {

    setCargando(true);
    try {
      const options = {
        method: "GET",
        url: `https://lyrics-plus.p.rapidapi.com/lyrics/${busqueda.cancion}/${busqueda.artista}`,
        headers: {
          "X-RapidAPI-Key": "54d83b33f7mshb9f0a4a5e1c54c6p1573fcjsn7bea380a7641",
          "X-RapidAPI-Host": "lyrics-plus.p.rapidapi.com",
        },
      };

      await axios.request(options).then((response) => {
         setLetra(response.data.lyrics)
         setAlerta('')

         if(response.data.lyrics === undefined || '' ){
            setAlerta('Canción no encontrada')
         }
        console.log("respuesta de api", response.data.lyrics);
      });

      //   const { artista, cancion } = busqueda;
      //   const url = `https://lyrics-plus.p.rapidapi.com/lyrics/${cancion}/${artista}`;
      //   const resultado = await axios(url)

      //   console.log(resultado);
    } catch (error) {
        setAlerta('Canción no encontrada')
        console.log(error);
    }
    setCargando(false)
  };

  return (
    <LetrasContext.Provider
      value={{
        alerta,
        setAlerta,
        busquedaLetra,
        letra,
        cargando
      }}
    >
      {children}
    </LetrasContext.Provider>
  );
}

export { LetrasProvider };

export default LetrasContext;
