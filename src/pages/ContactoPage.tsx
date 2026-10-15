import React, { useState, useEffect } from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { validateLead, submitLead, EventLead, SubmitResponse } from '../services/leadService';
import { MapPin, Phone, Mail, Clock, Send, AlertTriangle, CheckCircle2, MessageSquare, Info } from 'lucide-react';

interface ContactoPageProps {
  onNavigate?: (path: string) => void;
  initialMotivo?: 'evento' | 'consulta' | 'otro';
}

export const ContactoPage: React.FC<ContactoPageProps> = ({ onNavigate, initialMotivo = 'evento' }) => {
  const [formData, setFormData] = useState<EventLead>({
    nombre: '',
    email: '',
    telefono: '',
    motivo: initialMotivo,
    tipoEvento: 'particular',
    fechaAproximada: '',
    asistentesAproximados: '',
    mensaje: '',
    consentimiento: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

  // Detect query param if navigated with ?motivo=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const motivoParam = params.get('motivo');
    if (motivoParam === 'evento' || motivoParam === 'consulta' || motivoParam === 'otro') {
      setFormData((prev) => ({ ...prev, motivo: motivoParam }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const validation = validateLead(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitLead(formData);
      setSubmitResult(response);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* HEADER PAGE */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest mb-3 rot-neg-1">
          // COMUNICACIÓN DIRECTA & SOLICITUD DE EVENTOS
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          CONTACTO & RESERVA DE EVENTOS
        </h1>
        <p className="font-sans text-neutral-800 text-base sm:text-lg max-w-3xl mt-2">
          ¿Planeas una comida de grupo, un cumpleaños o un encuentro corporativo en Indautxu?
          Escríbenos o llámanos directamente. Te orientamos sobre disponibilidad y adaptamos el espacio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FORMULARIO (7 COLS) */}
        <div className="lg:col-span-7 bg-[#fbf8f1] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
          <div className="absolute -top-3 right-4 bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-0.5 border-2 border-black rot-pos-1">
            FORMULARIO OFICIAL
          </div>

          {/* AVISO DE ESTADO TÉCNICO HONESTO */}
          <div className="mb-6 p-3 bg-amber-50 border-2 border-amber-800 text-amber-950 font-mono-code text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Fase de maquetación:</span> El formulario realiza validación completa de datos en el navegador. La conexión al servidor de correo se activará en la integración final.
            </div>
          </div>

          {submitResult && (
            <div
              className={`mb-6 p-4 border-3 border-black font-mono-code text-sm ${
                submitResult.success
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-900'
                  : 'bg-red-100 text-red-950 border-red-900'
              }`}
            >
              <div className="flex items-start gap-2">
                {submitResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{submitResult.success ? 'Solicitud Validada' : 'Error'}</p>
                  <p className="text-xs mt-1">{submitResult.message}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* MOTIVO SELECTOR */}
            <div>
              <label className="block font-mono-code text-xs font-bold uppercase tracking-wider text-black mb-2">
                ¿Cuál es el motivo principal de tu contacto? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: 'evento', label: 'Organizar un Evento' },
                  { value: 'consulta', label: 'Consulta General' },
                  { value: 'otro', label: 'Otra Cuestión' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        motivo: item.value as 'evento' | 'consulta' | 'otro',
                      }))
                    }
                    className={`py-2 px-3 border-2 border-black font-mono-code text-xs font-bold uppercase transition-colors ${
                      formData.motivo === item.value
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CAMPOS ESPECÍFICOS DE EVENTOS */}
            {formData.motivo === 'evento' && (
              <div className="p-4 bg-neutral-100 border-2 border-black space-y-4">
                <div className="font-anton text-sm uppercase tracking-wider text-black flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#b91c1c] inline-block"></span>
                  Detalles orientativos del evento
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="tipoEvento"
                      className="block font-mono-code text-xs font-bold uppercase text-neutral-800 mb-1"
                    >
                      Tipo de Evento *
                    </label>
                    <select
                      id="tipoEvento"
                      name="tipoEvento"
                      value={formData.tipoEvento}
                      onChange={handleChange}
                      className="w-full bg-white border-2 border-black p-2 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
                    >
                      <option value="particular">Celebración / Cumpleaños</option>
                      <option value="cuadrilla">Comida / Cena de Cuadrilla</option>
                      <option value="empresa">Encuentro de Empresa / Afterwork</option>
                      <option value="otro">Otro formato</option>
                    </select>
                    {errors.tipoEvento && (
                      <p className="text-red-600 font-mono-code text-xs mt-1">{errors.tipoEvento}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="asistentesAproximados"
                      className="block font-mono-code text-xs font-bold uppercase text-neutral-800 mb-1"
                    >
                      Asistentes aproximados *
                    </label>
                    <input
                      id="asistentesAproximados"
                      name="asistentesAproximados"
                      type="text"
                      placeholder="Ej: 15-20 personas"
                      value={formData.asistentesAproximados}
                      onChange={handleChange}
                      className="w-full bg-white border-2 border-black p-2 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
                    />
                    {errors.asistentesAproximados && (
                      <p className="text-red-600 font-mono-code text-xs mt-1">
                        {errors.asistentesAproximados}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fechaAproximada"
                    className="block font-mono-code text-xs font-bold uppercase text-neutral-800 mb-1"
                  >
                    Fecha aproximada o mes previsto
                  </label>
                  <input
                    id="fechaAproximada"
                    name="fechaAproximada"
                    type="text"
                    placeholder="Ej: Sábado a mediados de noviembre / Noche"
                    value={formData.fechaAproximada}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-black p-2 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
                  />
                </div>
              </div>
            )}

            {/* DATOS DE CONTACTO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block font-mono-code text-xs font-bold uppercase text-black mb-1"
                >
                  Nombre o Nombre de Grupo *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre o colectivo"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black p-2.5 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
                />
                {errors.nombre && (
                  <p className="text-red-600 font-mono-code text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono-code text-xs font-bold uppercase text-black mb-1"
                >
                  Correo Electrónico *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black p-2.5 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
                />
                {errors.email && (
                  <p className="text-red-600 font-mono-code text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block font-mono-code text-xs font-bold uppercase text-black mb-1"
              >
                Teléfono de Contacto (recomendado para coordinar disponibilidad)
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+34 600 000 000"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-white border-2 border-black p-2.5 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block font-mono-code text-xs font-bold uppercase text-black mb-1"
              >
                Mensaje o Detalles de la propuesta *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Cuéntanos qué formato tienes en mente (comida sentada, picoteo informal, necesidad de pantalla o música de fondo...)"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full bg-white border-2 border-black p-2.5 font-mono-code text-xs focus:ring-2 focus:ring-[#b91c1c] outline-none"
              ></textarea>
              {errors.mensaje && (
                <p className="text-red-600 font-mono-code text-xs mt-1">{errors.mensaje}</p>
              )}
            </div>

            {/* CHECKBOX PRIVACIDAD */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="consentimiento"
                  checked={formData.consentimiento}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-[#b91c1c] border-2 border-black focus:ring-0 rounded-none cursor-pointer"
                />
                <span className="font-mono-code text-xs text-neutral-800">
                  Acepto que Grafit Rock Café utilice estos datos exclusivamente para responder a mi solicitud o reserva de evento. *
                </span>
              </label>
              {errors.consentimiento && (
                <p className="text-red-600 font-mono-code text-xs mt-1">{errors.consentimiento}</p>
              )}
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? 'VALIDANDO DATOS...' : 'ENVIAR SOLICITUD DE EVENTO'}</span>
            </button>
          </form>
        </div>

        {/* SIDEBAR DE CONTACTO DIRECTO (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* TARJETA VISITA RÁPIDA */}
          <div className="bg-[#f4eedd] border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs px-2.5 py-0.5 border border-black uppercase">
              CONTACTO INMEDIATO
            </div>
            <h2 className="font-anton text-2xl uppercase tracking-wider text-black">
              ¿PREFIERES CONSULTAR DIRECTAMENTE?
            </h2>
            <p className="font-sans text-sm text-neutral-800">
              Si tu fecha está muy próxima o quieres resolver dudas al instante sobre el salón, puedes llamarnos o escribirnos por WhatsApp.
            </p>

            <div className="pt-2 space-y-3 font-mono-code text-xs">
              <a
                href={`tel:${GRAFIT_DATA.info.phone}`}
                className="flex items-center gap-3 p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b91c1c] shrink-0" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">Teléfono Local</span>
                  <span className="font-bold text-sm">{GRAFIT_DATA.info.phone}</span>
                </div>
              </a>

              <a
                href={GRAFIT_DATA.info.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white border-2 border-black hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">WhatsApp Directo</span>
                  <span className="font-bold text-sm">Escribir por WhatsApp</span>
                </div>
              </a>

              <a
                href={`mailto:${GRAFIT_DATA.info.email}`}
                className="flex items-center gap-3 p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#b91c1c] shrink-0" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">Correo Electrónico</span>
                  <span className="font-bold text-sm">{GRAFIT_DATA.info.email}</span>
                </div>
              </a>
            </div>
          </div>

          {/* UBICACIÓN Y HORARIOS */}
          <div className="bg-[#f4eedd] border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="font-anton text-lg uppercase tracking-wider text-black flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#b91c1c]" />
              DÓNDE ESTAMOS
            </div>
            <div className="font-mono-code text-xs text-neutral-800 space-y-1">
              <p className="font-bold text-black text-sm">{GRAFIT_DATA.info.address}</p>
              <p>{GRAFIT_DATA.info.neighborhood} • {GRAFIT_DATA.info.city}</p>
              <p className="text-neutral-600 pt-1">
                A 3 minutos de la boca de metro de Indautxu. Zona céntrica con excelente conexión de transporte público.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black/20">
              <div className="font-anton text-sm uppercase tracking-wider text-black flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#d97706]" />
                HORARIO DEL ESPACIO
              </div>
              <ul className="space-y-1 font-mono-code text-xs text-neutral-800">
                {GRAFIT_DATA.info.hours.map((h, i) => (
                  <li key={i} className="flex justify-between border-b border-black/10 pb-1">
                    <span className="font-bold">{h.days}:</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 p-2 bg-black text-white font-mono-code text-[11px]">
                {GRAFIT_DATA.info.kitchenHours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
