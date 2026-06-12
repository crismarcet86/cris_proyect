const Anthropic = require('@anthropic-ai/sdk');

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

module.exports = {
  generarRespuestaConClaude
};