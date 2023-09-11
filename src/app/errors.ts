export const ValidateErrors = (code:string) =>{
    switch (code) {
        case '700':
            return 'Error en inicio sesion'

        case '701':
            return 'Error no tiene sesion activa'
        default:
            return  'Error Desconocido'
    }
}