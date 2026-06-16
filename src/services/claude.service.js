const Anthropic = require('@anthropic-ai/sdk');
const prompts = require('../prompts/user.prompts');

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const analizarCambioUsuario = async (nombreAntiguo, datosNuevos) => {
    try {
        // 2. Usas el prompt dinámico pasándole los datos reales
        const promptFinal = prompts.MODIFICACION_USUARIO(nombreAntiguo, datosNuevos);

        const respuesta = await anthropic.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: 500,
            system: prompts.SISTEMA_ANALISIS,
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

module.exports = { analizarCambioUsuario };