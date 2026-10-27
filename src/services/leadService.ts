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
  errors?: Record<string, string>;
}

// Handler de conexión con endpoint PHP 8.3 autenticado
export const submitLead = async (
  lead: EventLead,
  renderedAt: number = Math.floor(Date.now() / 1000)
): Promise<SubmitResponse> => {
  const validation = validateLead(lead);
  if (!validation.isValid) {
    return {
      success: false,
      message: 'Hay errores en el formulario que deben corregirse.',
      isBackendConnected: false,
      errors: validation.errors,
    };
  }

  try {
    const payload = {
      ...lead,
      website_check_trap: '', // Honeypot antispam vacío
      form_rendered_at: renderedAt,
    };

    const response = await fetch('./api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => null);

    if (response.ok && json && json.success) {
      return {
        success: true,
        message: json.message || 'Solicitud recibida correctamente.',
        isBackendConnected: true,
      };
    }

    // Errores controlados devueltos por el servidor (ej: 503 SMTP pendiente o 422 validación)
    return {
      success: false,
      message:
        json?.message ||
        `El servicio de correo devolvió un estado no disponible (${response.status}). Puedes contactarnos directamente en grafitcafe@grafitcafe.com.`,
      isBackendConnected: false,
      errors: json?.errors,
    };
  } catch (err) {
    // Si la llamada fetch falla (ejemplo: Vite en localhost donde no hay servidor PHP activo)
    console.info('[LeadService] Entorno local sin backend PHP activo:', err);
    return {
      success: false,
      message:
        'Aviso de entorno de desarrollo: En este servidor local de pruebas no se encuentra activo el intérprete PHP 8.3. En el servidor Plesk de producción, esta solicitud se procesará mediante envío seguro SMTP.',
      isBackendConnected: false,
    };
  }
};
