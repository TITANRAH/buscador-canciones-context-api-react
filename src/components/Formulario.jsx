import {useState} from "react";
import useLetras from "../hooks/useLetras";

function Formulario() {

    const {setAlerta, busquedaLetra} = useLetras()

    // state local sin necesidad de ponerlo en un provider
    // instanciamos el estdo de un objeto luego toca asociarlo a cada uno de los inputs
    const [busqueda, setBusqueda ] = useState({

        artista: '',
        cancion: ''
    })

    const handleSubmit = (e) => {

        e.preventDefault()

        if(Object.values(busqueda).includes('')){

            setAlerta('Coloca nombre de artista y canción')
            return
        }

        busquedaLetra(busqueda)

        setAlerta('')

    }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend> Busca por Artista y Canción</legend>

        <div className="form-grid">
          <div>
            <label htmlFor="">Artista</label>   
            {/* busqueda.artista es la variable de estado que alser un objeto puedo accceder asi a sus propiedads y asociarlas a los inputs */}
            <input type="text" 
                   name="artista" 
                   placeholder="Nombre Artista" 
                   value={busqueda.artista} 
                //  le pasamos primero la copia de lo que haya en busqueday luego el el e.target.value asi no elimina el state prveio
                // le pasamos luego el e.target.name como propiedadad y e.target.value como su valor quiere decir.. artista : juan perez
                // esto funciona cuando esta mapeado el name con la parte iquierda del objeto en este caso busqueda. 
                   onChange={ e => setBusqueda({...busqueda, [e.target.name]: e.target.value})}/>
          </div>

          <div>
            <label htmlFor="">Canción</label>
            <input type="text" 
                   name="cancion" 
                   value={busqueda.cancion}
                   placeholder="Nombre Canción" 
                //    aca lo mismo que arriba propiedad e.target.name cancion: valor e.target.value
                   onChange={ e => setBusqueda({...busqueda, [e.target.name]: e.target.value})} />
          </div>
          <input type="submit" value='buscar' />
        </div>

        

      
      </form>
    </div>
  );
}

export default Formulario;
