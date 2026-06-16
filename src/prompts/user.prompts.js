module.exports = {
    SISTEMA_ANALISIS: "Eres un asistente de seguridad. Analiza cambios en perfiles de usuario y detecta modificaciones sospechosas. Responde solo con un análisis breve.",

    MODIFICACION_USUARIO: (nombreAntiguo, datosNuevos) => {
        const sanitize = (val, max) => String(val ?? '').replace(/"""/g, '').replace(/\n/g, ' ').slice(0, max);
        const nombre = sanitize(datosNuevos.nombre, 100);
        const apellido = sanitize(datosNuevos.apellido, 100);
        const email = sanitize(datosNuevos.email, 200);
        const anterior = sanitize(nombreAntiguo, 100);
        return `Analiza el siguiente cambio de perfil de usuario.
Nombre anterior: """${anterior}"""
Nuevo nombre: """${nombre}"""
Nuevo apellido: """${apellido}"""
Nuevo email: """${email}"""
¿El cambio parece legítimo o requiere una alerta de seguridad? Responde solo con un análisis breve.`;
    },
};