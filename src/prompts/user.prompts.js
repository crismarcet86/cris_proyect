/**
 * Almacén centralizado de Prompts para Claude AI
 */
module.exports = {
    // Prompt estático (no cambia)
    BIENVENIDA_SISTEMA: "Eres un asistente de soporte técnico amigable. Saluda al usuario de forma ejecutiva.",

    // Prompt dinámico (una función que recibe datos del usuario y genera el texto)
    MODIFICACION_USUARIO: (nombreAntiguo, datosNuevos) => {
        return `El usuario anteriormente se llamaba "${nombreAntiguo}". 
Los nuevos datos que se quieren actualizar son: ${JSON.stringify(datosNuevos)}.
Por favor, analiza si el cambio de nombre parece legítimo o si es un cambio drástico que requiera una alerta de seguridad. Responde solo con un análisis breve.`;
    },

    // Puedes seguir agregando más prompts aquí abajo...
    REPORTE_MENSUAL: (mes) => `Genera un resumen ejecutivo para el mes de ${mes}.`
};