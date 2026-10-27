export interface NavLinkItem {
  label: string;
  path: string;
  isHome?: boolean;
  badge?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  badge?: string;
  image?: string;
  category: 'burger' | 'pintxo' | 'plato' | 'bebida';
  isPendingValidation?: boolean;
}

export interface ExperienceType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string;
  image: string;
  badge: string;
}

export interface SpaceFeature {
  id: string;
  title: string;
  description: string;
  status: 'confirmado' | 'pendiente_confirmacion';
}

export interface HistoricSnippet {
  id: string;
  context: string;
  title: string;
  quote: string;
  yearHint?: string;
  image?: string;
}

export interface InstagramPost {
  id: string;
  src: string;
  caption: string;
  tag: string;
  likes?: string;
  date: string;
  rotation?: string;
}

export const GRAFIT_DATA = {
  info: {
    name: 'Grafit Rock Café',
    subname: 'Indautxu — Bilbao',
    tagline: 'Espacio para eventos, grupos, gastronomía y cultura rock en Indautxu',
    address: 'Urrutia Kalea, 1',
    neighborhood: 'Indautxu',
    city: '48010 Bilbao, Bizkaia',
    phone: '', // Teléfono oficial en proceso de verificación por la gerencia
    email: 'grafitcafe@grafitcafe.com',
    hours: [
      { days: 'Lunes a Jueves', time: '08:00 – 23:00' },
      { days: 'Viernes', time: '08:00 – 02:00' },
      { days: 'Sábados', time: '09:00 – 02:30' },
      { days: 'Domingos', time: '10:00 – 23:00' },
    ],
    kitchenHours: 'Gastronomía y carta de barra y salón',
    socials: {
      facebook: 'https://www.facebook.com/grafitrockcafe',
      x: 'https://x.com/grafitcafe',
      email: 'mailto:grafitcafe@grafitcafe.com',
      linkedin: 'https://www.linkedin.com/in/grafitcafe',
      youtube: 'https://www.youtube.com/channel/UCBv2dtRS_xFM6jYE_xOxFNQ',
      instagram: 'https://www.instagram.com/grafitcafe',
      soundcloud: 'https://soundcloud.com/grafitcafe',
      whatsapp: ''
    }
  },

  navLinks: [
    { label: 'INICIO', path: '/', isHome: true },
    { label: 'EVENTOS', path: '/eventos', badge: 'Grupos' },
    { label: 'EL ESPACIO', path: '/espacio', badge: 'Salón' },
    { label: 'GASTRONOMÍA', path: '/carta', badge: 'Carta' },
    { label: 'CONTACTO', path: '/contacto' },
  ] as NavLinkItem[],

  hero: {
    titleTop: 'GRAFIT',
    titleBottom: 'ROCK CAFÉ',
    subtitle: 'EXPERIENCIAS, GRUPOS Y CELEBRACIONES EN INDAUTXU',
    locationBadge: 'URRUTIA KALEA 1 • INDAUTXU • BILBAO',
    tickerText: '★ ESPACIO PARA GRUPOS Y CELEBRACIONES ★ SALÓN MULTIUSOS VERSÁTIL ★ HAMBURGUESAS Y PICOTEO ★ AMBIENTE INTERGENERACIONAL ★ BILBAO INDAUTXU ★',
    mainTagline: 'Un espacio singular en el corazón de Indautxu diseñado para acoger encuentros, comidas de grupo y celebraciones con identidad propia.',
    polaroids: [
      {
        id: 'hero-salon',
        src: './assets/grafit/instagram/volkswagen.jpg',
        caption: 'La Furgoneta Volkswagen • Salón Multiusos',
        rotation: '-3deg'
      },
      {
        id: 'hero-food',
        src: './assets/grafit/instagram/burguer.webp',
        caption: 'Burger Grafit 100% Buey',
        rotation: '3deg'
      },
      {
        id: 'hero-bar',
        src: './assets/grafit/interior/grafit-barra-01.jpg',
        caption: 'La Barra de Urrutia Kalea',
        rotation: '-2deg'
      }
    ]
  },

  // Eje 1: Experiencias y Tipologías de Eventos (Orientativas y adaptables)
  eventos: {
    headline: 'TU EVENTO CON PERSONALIDAD PROPIA EN BILBAO',
    subtext: 'Desde comidas de cuadrilla y cumpleaños hasta reuniones de empresa y presentaciones. El salón multiusos de Grafit se adapta a lo que necesitas sin encorsetamientos.',
    valueProps: [
      {
        title: 'Salón Multiusos Amplio y Flexible',
        desc: 'Un espacio versátil de generosa superficie que permite redistribuir mesas, zona de pie o formato cóctel según el tamaño de tu grupo.'
      },
      {
        title: 'Gastronomía para Grupos',
        desc: 'Menús para compartir, hamburguesas gourmet, raciones y pintxos elaborados al momento.'
      },
      {
        title: 'Atención Directa y Personalizada',
        desc: 'Planificamos cada encuentro contigo para adaptar la disposición del salón, la propuesta gastronómica y el ritmo de la velada.'
      }
    ],
    tipologias: [
      {
        id: 'cuadrillas',
        title: 'Comidas y Cenas de Cuadrilla',
        subtitle: 'El punto de encuentro tradicional con espacio de sobra',
        description: 'Mesa larga, cañas bien tiradas, raciones abundantes y sobremesas sin presión para que disfrutéis juntos.',
        idealFor: 'Grupos de amigos, reuniones anuales y previas de celebraciones.',
        image: './assets/grafit/instagram/621137527_18159238840410802_2351787220592329803_n.jpg',
        badge: 'TRADICIÓN BILBAÍNA'
      },
      {
        id: 'celebraciones',
        title: 'Cumpleaños y Aniversarios',
        subtitle: 'Festejos distendidos con música y buen rollo',
        description: 'Reserva una zona exclusiva o el salón para tu gente. Combina picoteo informal, copas y tarta en un entorno desenfadado.',
        idealFor: 'Cumpleaños de 30, 40, 50... y aniversarios señalados.',
        image: './assets/grafit/instagram/650038313_18016798205818470_3726701705553018311_n.jpg',
        badge: 'CELEBRACIONES'
      },
      {
        id: 'empresa',
        title: 'Encuentros de Empresa y Afterworks',
        subtitle: 'Cenas de equipo y reuniones sin la rigidez de un salón formal',
        description: 'Un ambiente acogedor que fomenta la conversación distendida. Menús cerrados o picoteo dinámico para conectar con los compañeros.',
        idealFor: 'Cenas de departamento, despedidas de proyectos y afterworks.',
        image: './assets/grafit/instagram/649233943_18113393878655824_4936967214840179256_n.jpg',
        badge: 'EQUIPOS & EMPRESA'
      },
      {
        id: 'formatos-medida',
        title: 'Reuniones y Formatos a Medida',
        subtitle: 'El salón a tu disposición para proyectos especiales',
        description: 'Presentaciones informales, quedadas temáticas o encuentros culturales que requieran amplitud y personalidad visual.',
        idealFor: 'Iniciativas creativas, peñas y asociaciones.',
        image: './assets/grafit/instagram/pintxos_eventos.webp',
        badge: 'FORMATO FLEXIBLE'
      }
    ] as ExperienceType[]
  },

  // Eje 2: El Espacio (Salón multiusos, Furgoneta Volkswagen y dos ambientes)
  espacio: {
    headline: 'EL SALÓN MULTIUSOS DE GRAFIT',
    subtext: 'Un espacio singular en Indautxu que sorprende por su amplitud y calidez. Madera, ladrillo visto y el icono indiscutible: la furgoneta Volkswagen roja y blanca.',
    furgoneta: {
      title: 'El Icono del Salón: La Furgoneta Volkswagen',
      description: 'Presidiendo el salón principal, nuestra furgoneta Volkswagen T2 roja y blanca es la seña de identidad más fotografiada de Grafit. Un homenaje a la cultura viajera y a la libertad del rock que convierte cualquier evento en un recuerdo memorable.',
      image: './assets/grafit/instagram/volkswagen.jpg'
    },
    ambientes: [
      {
        id: 'ambiente-barra',
        title: 'La Barra & Zona de Entrada',
        description: 'Dinámica, cercana y luminosa. El rincón del café matinal, el aperitivo rápido, las cañas y el ambiente vivo de la calle Urrutia.',
        vibe: 'Encuentro casual, tapeo y bienvenida'
      },
      {
        id: 'ambiente-salon',
        title: 'El Gran Salón Multiusos',
        description: 'Espacioso, resguardado y versátil. Concebido para acoger mesas grupales, zona de charla o celebraciones con mayor intimidad y confort acústico.',
        vibe: 'Eventos, reuniones amplias y sobremesas'
      }
    ],
    gallery: [
      {
        src: './assets/grafit/instagram/volkswagen.jpg',
        caption: 'La icónica furgoneta Volkswagen en el salón',
        alt: 'Furgoneta Volkswagen roja y blanca en Grafit Café'
      },
      {
        src: './assets/grafit/interior/grafit-salon-mesas-03.jpg',
        caption: 'Composición de mesas del salón multiusos',
        alt: 'Salón con mesas para grupos en Grafit'
      },
      {
        src: './assets/grafit/interior/grafit-barra-01.jpg',
        caption: 'La barra principal de madera y tiradores de cerveza',
        alt: 'Barra del Grafit Café'
      },
      {
        src: './assets/grafit/instagram/rolling-pared.jpg',
        caption: 'Mural de The Rolling Stones en pared de ladrillo',
        alt: 'Mural The Rolling Stones en Grafit'
      },
      {
        src: './assets/grafit/instagram/fachada-noche.jpg',
        caption: 'Exterior nocturno de Urrutia Kalea 1',
        alt: 'Fachada nocturna de Grafit Café'
      },
      {
        src: './assets/grafit/archive/grafit-inauguracion-2017-05.jpg',
        caption: 'Perspectiva arquitectónica del local',
        alt: 'Vista completa del local'
      }
    ],
    // Incertidumbres técnicas identificadas internamente: no inventar datos sin evidencia del propietario
    caracteristicasPendientes: [
      {
        id: 'feat-aforo',
        title: 'Capacidad y Aforos de Salón',
        description: 'Configurable para grupos pequeños, medianos o eventos completos. (Aforo numérico exacto por confirmar con el propietario).',
        status: 'pendiente_confirmacion'
      },
      {
        id: 'feat-tecnico',
        title: 'Equipamiento Audiovisual',
        description: 'Posibilidad de apoyo para pantallas o ambientación sonora. (Especificaciones técnicas precisas por validar).',
        status: 'pendiente_confirmacion'
      },
      {
        id: 'feat-reserva',
        title: 'Condiciones de Reserva para Grupos',
        description: 'Adaptadas al tamaño del grupo y formato gastronómico solicitado.',
        status: 'pendiente_confirmacion'
      }
    ] as SpaceFeature[]
  },

  // Eje 3: Gastronomía real, compartible y adaptable
  gastronomia: {
    headline: 'GASTRONOMÍA & PRODUCTO REAL',
    subtext: 'En Grafit la gastronomía acompaña tu experiencia: platos para compartir, hamburguesas de autor y picoteo de barra.',
    posterSrc: './assets/grafit/instagram/burguer.webp',
    dishes: [
      {
        id: 'b1',
        name: 'Burger Grafit 100% Buey',
        description: 'Carne seleccionada 100% buey, queso cheddar ahumado, bacon crujiente, cebolla pochada y salsa casera Rock en pan brioche artesano.',
        badge: 'PLATO INSIGNIA',
        image: './assets/grafit/instagram/burguer.webp',
        category: 'burger'
      },
      {
        id: 'p1',
        name: 'Tortillas Jugosas & Pintxos de Barra',
        description: 'Tortillas jugosas recién salidas y selección de pintxos y gildas tradicionales de la barra de Indautxu.',
        badge: 'BARRA AL DÍA',
        image: './assets/grafit/instagram/619354530_18068635448548618_8267537641264067155_n.webp',
        category: 'pintxo'
      },
      {
        id: 's1',
        name: 'Sándwiches Tostados a la Plancha',
        description: 'Pan artesano crujiente tostado al momento, quesos fundentes y combinaciones sabrosas para reponer fuerzas.',
        badge: 'ESPECIALIDAD',
        image: './assets/grafit/instagram/sandwich-barra.jpg',
        category: 'plato'
      },
      {
        id: 'g1',
        name: 'Bandejas de Catering para Grupos',
        description: 'Surtido de bocaditos variados, raciones calientes y tablas pensadas para compartir en celebraciones en el salón.',
        badge: 'GRUPOS & EVENTOS',
        image: './assets/grafit/instagram/pintxos_eventos.webp',
        category: 'plato'
      }
    ] as MenuItem[],
    gruposNota: 'Para grupos y eventos diseñamos propuestas gastronómicas a medida (picoteo de pie, menús de mesa compartida o meriendas-cena). Consulta las opciones disponibles para tu fecha.'
  },

  // Eje 4: Progresión Narrativa de Historia (Inspiración The Rolling Stones)
  // La historia no interrumpe el flujo comercial; acompaña la evolución visual del recorrido.
  historiaProgression: [
    {
      id: 'h-origen',
      context: 'LAS RAÍCES DE INDAUTXU',
      title: 'Materia, barrio y resistencia',
      quote: 'Grafit nació de la voluntad de construir un refugio auténtico en Urrutia Kalea: madera noble, ladrillo visto y calor de taberna donde todo el mundo es bienvenido.',
      yearHint: 'Memoria de Barrio',
      image: './assets/grafit/interior/grafit-barra-01.jpg'
    },
    {
      id: 'h-evolucion',
      context: 'EVOLUCIÓN ROCKERA',
      title: 'El rock como actitud, no como nostalgia',
      quote: 'Al igual que las grandes bandas atemporales, la identidad del local ha ido madurando a través de los años. El rock aquí no es un disfraz: es la energía con la que acogemos cada encuentro.',
      yearHint: 'Evolución Constante',
      image: './assets/grafit/instagram/chupa-cuero.jpg'
    },
    {
      id: 'h-icono',
      context: 'EL ESPACIO VIVIDO',
      title: 'Paredes que guardan miles de historias',
      quote: 'El mural de The Rolling Stones, la furgoneta Volkswagen y las guitarras en las paredes son testigos mudos de celebraciones memorables que forman parte de la vida de Indautxu.',
      yearHint: 'Espacio con Alma',
      image: './assets/grafit/instagram/rolling-pared.jpg'
    }
  ] as HistoricSnippet[],

  // Eje 5: Comunidad y Athletic
  athletic: {
    badge: 'ESPÍRITU DE BARRIO // INDAUTXU',
    headline: 'EL ATHLETIC SE VIVE EN GRAFIT',
    subtext: 'A 10 minutos a pie de San Mamés. La previa de cuadrilla, las cañas bien tiradas y el punto de encuentro rojiblanco en Indautxu.',
    distance: '10 MIN A SAN MAMÉS',
    highlights: [
      {
        title: 'LA PREVIA EN URRUTIA KALEA',
        desc: 'Pintxos recién salidos, zuritos y ambiente animado antes de iniciar la kalejira por Licenciado Poza hacia la Catedral.',
        tag: 'DÍAS DE PARTIDO'
      },
      {
        title: 'CAÑAS Y POTEO DE PREVIA',
        desc: 'Servicio ágil desde barra para atender cuadrillas y grupos antes de subir al estadio.',
        tag: 'LA PREVIA'
      },
      {
        title: 'EL POSTPARTIDO EN EL SALÓN',
        desc: 'Mesas en el salón multiusos para comentar el encuentro, reponer fuerzas con hamburguesas y raciones, y alargar la celebración con buen rock.',
        tag: 'TERCER TIEMPO'
      }
    ],
    gallery: [
      {
        src: './assets/grafit/drinks/grafit-cerveza-canero-01.jpg',
        caption: 'Tiradores activos y cañas frías en la barra de Urrutia Kalea',
        alt: 'Grifos de cerveza en Grafit'
      },
      {
        src: './assets/grafit/archive/grafit-inauguracion-2017-05.jpg',
        caption: 'Celebraciones de cuadrillas y ambiente festivo en el salón',
        alt: 'Celebración de amigos en Grafit'
      },
      {
        src: './assets/grafit/interior/grafit-barra-01.jpg',
        caption: 'La barra tradicional de Indautxu, punto de encuentro clásico',
        alt: 'Barra de madera en Grafit'
      }
    ]
  },

  // Eje 6: Galería Editorial Rock (Inspiración WebGL Magazine)
  magazineGallery: [
    {
      id: 'mag-01',
      num: '01',
      title: 'LA BURGER 100% BUEY',
      subtitle: 'Producto estrella de autor',
      tag: 'CULINARY ROCK',
      src: './assets/grafit/instagram/burguer.webp',
      caption: '200g de carne seleccionada, queso fundente y pan crujiente.',
      orientation: 'portrait',
      quote: 'El bocado contundente que identifica la cocina de Grafit.'
    },
    {
      id: 'mag-02',
      num: '02',
      title: 'LA VOLKSWAGEN DEL SALÓN',
      subtitle: 'El icono de las celebraciones',
      tag: 'ESPACIO SINGULAR',
      src: './assets/grafit/instagram/volkswagen.jpg',
      caption: 'Media estructura decorativa frontal instalada en el salón multiusos. La firma visual del bar.',
      orientation: 'landscape',
      quote: 'Donde los eventos de grupo se convierten en recuerdos fotográficos.'
    },
    {
      id: 'mag-03',
      num: '03',
      title: 'LA BARRA DE URRUTIA',
      subtitle: 'Punto de encuentro en Indautxu',
      tag: 'BARRA & INDAUTXU',
      src: './assets/grafit/interior/grafit-barra-01.jpg',
      caption: 'Madera cálida, tiradores de cerveza y el dinamismo cotidiano de la calle Urrutia.',
      orientation: 'square',
      quote: 'El aperitivo rápido, el zurito de previa o el café matinal.'
    },
    {
      id: 'mag-04',
      num: '04',
      title: 'MURAL THE ROLLING STONES',
      subtitle: 'Actitud rock en ladrillo visto',
      tag: 'CULTURA & ALMA',
      src: './assets/grafit/instagram/rolling-pared.jpg',
      caption: 'Homenaje a las bandas atemporales que definen la banda sonora del establecimiento.',
      orientation: 'portrait',
      quote: 'El rock como energía para recibir a distintas generaciones.'
    },
    {
      id: 'mag-05',
      num: '05',
      title: 'MEMORIA DE CUADRILLAS',
      subtitle: 'Celebraciones que hacen historia',
      tag: 'MEMORIA VIVIDA',
      src: './assets/grafit/archive/grafit-inauguracion-2017-05.jpg',
      caption: 'Encuentros multitudinarios, cumpleaños y brindis que han dado vida al salón multiusos.',
      orientation: 'landscape',
      quote: 'Espacio para reunir a quienes de verdad importan.'
    },
    {
      id: 'mag-06',
      num: '06',
      title: 'NOCHE EN INDAUTXU',
      subtitle: 'Urrutia Kalea 1',
      tag: 'PUNTO DE ENCUENTRO',
      src: './assets/grafit/instagram/fachada-noche.jpg',
      caption: 'Fachada iluminada en el centro de Bilbao. A 3 minutos del metro y 10 de San Mamés.',
      orientation: 'square',
      quote: 'Un refugio con carácter abierto a toda la ciudad.'
    }
  ]
};
