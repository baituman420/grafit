// Servicio desacoplado para la gestión e integración de solicitudes de contacto y eventos.
// En esta fase de maquetación no se simula un envío falso al servidor ni se inventa una API de backend.
// Prepara la interfaz para la futura conexión con el endpoint definitivo (PHP / Node / webhook).

export interface EventLead {
  nombre: string;
  email: string;
  telefono?: string;
  motivo: 'evento' | 'consulta' | 'otro';
  tipoEvento?: 'particular' | 'empresa' | 'cuadrilla' | 'otro';
  fechaAproximada?: string;
  asistentesAproximados?: string;
  mensaje: string;
  consentimiento: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateLead = (lead: EventLead): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!lead.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio.';
  }

  if (!lead.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.email = 'El formato del correo electrónico no es válido.';
  }

  if (lead.motivo === 'evento') {
    if (!lead.tipoEvento) {
      errors.tipoEvento = 'Selecciona el tipo de evento.';
    }
    if (!lead.asistentesAproximados?.trim()) {
      errors.asistentesAproximados = 'Indica el número aproximado de asistentes.';
    }
  }

  if (!lead.mensaje.trim()) {
    errors.mensaje = 'Por favor, describe brevemente tu idea o consulta.';
  }

  if (!lead.consentimiento) {
    errors.consentimiento = 'Debes aceptar la política de privacidad.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export interface SubmitResponse {
  success: boolean;
  message: string;
  isBackendConnected: boolean;
}

// Handler preparado para integración futura con endpoint REST
export const submitLead = async (lead: EventLead): Promise<SubmitResponse> => {
  const validation = validateLead(lead);
  if (!validation.isValid) {
    return {
      success: false,
      message: 'Hay errores en el formulario que deben corregirse.',
      isBackendConnected: false,
    };
  }

  // Comportamiento honesto de desarrollo/demo: no simular respuesta de servidor falsa.
  // Registra en consola el payload para verificación técnica.
  console.info('[LeadService] Datos validados listos para procesar:', lead);

  return {
    success: true,
    message: 'Formulario validado correctamente en cliente. El servicio de envío real se activará al conectar el servidor de correo definitivo.',
    isBackendConnected: false,
  };
};
