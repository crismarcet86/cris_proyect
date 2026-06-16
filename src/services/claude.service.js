const Anthropic = require('@anthropic-ai/sdk');
// 1. Importas tu almacén de prompts
const prompts = require('../prompts/user.prompts');

// Inicializamos el cliente de Anthropic usando la variable de entorno
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const generarRespuestaConClaude = async (promptUsuario) => {
  try {
    const respuesta = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // O la versión que prefieras usar
      max_tokens: 1024,
      messages: [
        { role: 'user', content: promptUsuario }
      ],
    });

    return respuesta.content[0].text;
  } catch (error) {
    console.error('❌ Error al comunicarse con Claude:', error);
    throw error;
  }
};

const analizarCambioUsuario = async (nombreAntiguo, datosNuevos) => {
    try {
        // 2. Usas el prompt dinámico pasándole los datos reales
        const promptFinal = prompts.MODIFICACION_USUARIO(nombreAntiguo, datosNuevos);

        const respuesta = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            // Puedes usar un prompt estático para el sistema si quieres darle un rol fijo
            system: prompts.BIENVENIDA_SISTEMA, 
            messages: [
                { role: 'user', content: promptFinal }
            ],
        });

        return respuesta.content[0].text;
    } catch (error) {
        console.error('Error en el servicio de Claude:', error);
        throw error;
    }
};

module.exports = {
  generarRespuestaConClaude,
  analizarCambioUsuario
};