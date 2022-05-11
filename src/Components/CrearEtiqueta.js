import axios from "axios";
import '../config';


var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenClient');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

class GenerarEtiqueta {
    generarEtiqueta(datosEtiqueta) {
        try {
            console.log('datos de etiqueta: ', datosEtiqueta);
            axios.post(baseUrl + '/parcelservice/api/create-label/', datosEtiqueta, { headers })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    // HTTP_307_TEMPORARY_REDIRECT
                    // HTTP_500_INTERNAL_SERVER_ERROR
                    console.log('err: ', error.response.data);
                });

        } catch (error) {
            console.log('Error: ', error)
        }
    };
}

const CrearEtiqueta = new GenerarEtiqueta();
export default CrearEtiqueta