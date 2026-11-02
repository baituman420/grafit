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

export interface CartaItem {
  id: string;
  name: string;
  description: string;
  badge?: string;
  image?: string;
  isSpecial?: boolean;
  bread?: string;
}

export interface CartaGroup {
  id: string;
  title: string;
  subtitle: string;
  note?: string;
  badge?: string;
  items: CartaItem[];
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
    phone: '944 102 772',
    email: 'grafitcafe@gmail.com',
    hours: [
      { days: 'De lunes a jueves', time: '8:30 a 00:00' },
      { days: 'Viernes', time: '8:30 a 2:00' },
      { days: 'Sábado', time: '10:30 a 2:00' },
      { days: 'Domingo', time: '12:00 a 00:00' },
    ],
    kitchenHours: 'Gastronomía y carta de barra y salón',
    socials: {
      facebook: 'https://www.facebook.com/grafitrockcafe',
      x: 'https://x.com/grafitcafe',
      email: 'mailto:grafitcafe@gmail.com',
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
        src: './assets/grafit/burgers/burger-trufa.jpg',
        caption: 'Burger de Pollo Trufada • Receta de Autor',
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
        image: './assets/grafit/catering/catering-bandejas-03.jpg',
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
        name: 'Burger Grafit de Autor',
        description: 'Carne seleccionada 100% vaca, queso cheddar ahumado, bacon crujiente, cebolla pochada y salsa casera Rock en pan brioche artesano.',
        badge: 'PLATO INSIGNIA',
        image: './assets/grafit/burgers/burger-rulo-cabra.jpg',
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
        image: './assets/grafit/catering/catering-bandejas-03.jpg',
        category: 'plato'
      }
    ] as MenuItem[],
    gruposNota: 'Para grupos y eventos diseñamos propuestas gastronómicas a medida (picoteo de pie, menús de mesa compartida o meriendas-cena). Consulta las opciones disponibles para tu fecha.',
    carta: {
      glutenFreeNotice: 'Disponemos de pan de hamburguesa sin gluten para todas nuestras opciones.',
      hamburguesas: {
        title: 'HAMBURGUESAS',
        subtitle: 'Especialidades de la casa y clásicas con pan artesano',
        notice: 'Disponemos de pan de hamburguesa sin gluten.',
        especiales: [
          {
            id: 'h-esp-vaca-cheddar',
            name: 'Hamburguesa de Vaca 100% Especial',
            description: 'Carne 100% vaca seleccionada, cebolla caramelizada, salsa cheddar cremosa, huevo a la plancha y toque de alegría.',
            bread: 'Pan Cristal Artesano',
            badge: 'ESPECIAL DE LA CASA',
            image: './assets/grafit/instagram/burguer.webp',
            isSpecial: true,
          },
          {
            id: 'h-esp-rulo-cabra',
            name: 'Hamburguesa de Vaca 100% con Rulo de Cabra',
            description: 'Carne 100% vaca, rulo de cabra a la plancha caramelizado, cebolla crujiente, chutney de tomate y pimiento, y mezclum de lechugas frescas.',
            bread: 'Pan Brioche Artesano',
            image: './assets/grafit/burgers/burger-rulo-cabra.jpg',
            badge: 'TOP GOURMET',
            isSpecial: true,
          },
          {
            id: 'h-esp-pollo-trufa',
            name: 'Hamburguesa de Pollo Trufada',
            description: 'Pechuga de pollo seleccionada, queso emmental fundente, bacon crujiente, bouquet de brotes tiernos y mahonesa de trufa.',
            bread: 'Pan Brioche Artesano',
            image: './assets/grafit/burgers/burger-trufa.jpg',
            badge: 'RECOMENDACIÓN',
            isSpecial: true,
          },
          {
            id: 'h-esp-vegetariana',
            name: 'Hamburguesa Vegetariana de Autor',
            description: 'Compuesta artesanalmente de calabaza, zanahoria y queso, acompañada de cebolla pochada, champiñón laminado, tomate fresco y salsa guacamole.',
            bread: 'Pan Cristal Artesano',
            image: './assets/grafit/burgers/burger-vegana.jpg',
            badge: 'VEGGIE GOURMET',
            isSpecial: true,
          },
        ] as CartaItem[],
        clasicas: [
          {
            id: 'h-clas-holandesa',
            name: 'Holandesa',
            description: 'Lechuga, tomate fresco, cebolla pochada, queso fundido y mahonesa.',
          },
          {
            id: 'h-clas-caballo',
            name: 'A Caballo',
            description: 'Lechuga, tomate, cebolla, queso fundido, huevo frito y mahonesa.',
            badge: 'CLÁSICA',
          },
          {
            id: 'h-clas-grafit',
            name: 'Grafit',
            description: 'Lechuga, tomate, pepinillo, queso, bacon crujiente y salsa rosa.',
            badge: 'RECETA ROCK',
          },
          {
            id: 'h-clas-doble',
            name: 'Doble de Carne',
            description: 'Doble porción de carne, lechuga, tomate, cebolla, queso, tortilla francesa, bacon y mahonesa.',
            badge: 'EXTRA CONTUNDENTE',
          },
          {
            id: 'h-clas-vegana',
            name: 'Vegana',
            description: 'Hamburguesa vegana, lechuga, tomate, cebolla pochada y tomate frito.',
            badge: '100% VEGAN',
          },
          {
            id: 'h-clas-crunchi',
            name: 'Pollo Crunchi',
            description: 'Pollo crujiente, lechuga, cebolla cruda, queso cheddar y ali-oli.',
            badge: 'CRUNCHY',
          },
        ] as CartaItem[],
      },
      sandwiches: [
        {
          id: 's-marinero',
          name: 'Marinero',
          description: 'Lechuga, tomate, huevo cocido, txaka, bonito, anchoas y salsa rosa.',
        },
        {
          id: 's-tropical',
          name: 'Tropical',
          description: 'Lechuga, huevo cocido, txaka, pepinillo, jamón york y mahonesa.',
        },
        {
          id: 's-vegetal',
          name: 'Vegetal',
          description: 'Lechuga, tomate, huevo cocido, espárrago, queso, jamón york, bonito y mahonesa.',
          badge: 'FAVORITO',
        },
        {
          id: 's-primavera',
          name: 'Primavera',
          description: 'Lechuga, tomate, queso, jamón york, huevo frito y mahonesa.',
        },
        {
          id: 's-grafit',
          name: 'Grafit',
          description: 'Tomate, pepinillo, huevo cocido, queso, lomo adobado y salsa rosa.',
          badge: 'ESPECIALIDAD',
        },
        {
          id: 's-mananero',
          name: 'Mañanero',
          description: 'Bacon crujiente, queso fundido y huevo frito.',
        },
        {
          id: 's-veg-pechuga',
          name: 'Vegetal de Pechuga',
          description: 'Lechuga, tomate, queso, huevo cocido y pechuga de pollo a la plancha.',
        },
        {
          id: 's-mixto-iberico',
          name: 'Mixto Ibérico',
          description: 'Paletilla ibérica y queso fundido a la plancha.',
        },
      ] as CartaItem[],
      bocatas: {
        frios: [
          {
            id: 'b-frio-jamon',
            name: 'Jamón Ibérico',
            description: 'Paleta ibérica seleccionada sobre pan crujiente.',
            badge: 'IBÉRICO',
          },
          {
            id: 'b-frio-tumaka',
            name: 'Tumaka',
            description: 'Paletilla ibérica, tomate natural triturado y aceite de oliva virgen extra.',
          },
          {
            id: 'b-frio-veg-york',
            name: 'Vegetal de York',
            description: 'Lechuga, tomate, huevo cocido, jamón york, bonito y mahonesa.',
          },
        ] as CartaItem[],
        calientes: [
          {
            id: 'b-cal-camembert',
            name: 'Camembert',
            description: 'Fundido de queso Camembert y paletilla ibérica.',
            badge: 'FUNDIDO',
          },
          {
            id: 'b-cal-emmental',
            name: 'Emmental',
            description: 'Fundido de queso Emmental y paletilla ibérica.',
          },
          {
            id: 'b-cal-pollito',
            name: 'Pollito',
            description: 'Pechuga de pollo a la plancha y queso a las finas hierbas.',
          },
          {
            id: 'b-cal-vegano',
            name: 'Vegano',
            description: 'Tomate, cebolla pochada, pimiento rojo y verde, calabacín y champiñón.',
            badge: 'VEGANO',
          },
          {
            id: 'b-cal-tortilla',
            name: 'Tortilla Francesa al Gusto',
            description: 'Tortilla francesa recién hecha: de chistorra, queso, jamón york, paletilla ibérica o bonito.',
          },
          {
            id: 'b-cal-serranito',
            name: 'Serranito',
            description: 'Ternera a la plancha, paletilla ibérica y pimientos rojos asados.',
            badge: 'CLÁSICO',
          },
          {
            id: 'b-cal-pechuga-alioli',
            name: 'Pechuga Ali-Oli',
            description: 'Lechuga, tomate, pechuga de pollo y suave ali-oli.',
          },
          {
            id: 'b-cal-pechuga-kebab',
            name: 'Pechuga Kebab',
            description: 'Lechuga, tomate, cebolla, pechuga de pollo y salsa kebab.',
          },
          {
            id: 'b-cal-grafit',
            name: 'Grafit',
            description: 'Ternera, bacon crujiente y queso fundente.',
            badge: 'GRAFIT',
          },
          {
            id: 'b-cal-superlomo',
            name: 'Superlomo',
            description: 'Lomo a la plancha, tortilla francesa y bacon crujiente.',
          },
          {
            id: 'b-cal-esparramao',
            name: 'Esparramao',
            description: 'Lechuga, tomate, lomo, queso fundido, huevo frito y mahonesa.',
            badge: 'CONTUNDENTE',
          },
          {
            id: 'b-cal-gordo',
            name: 'Gordo',
            description: 'Ternera sabrosa, queso fundido y paletilla ibérica.',
          },
          {
            id: 'b-cal-picasuelos',
            name: 'Picasuelos',
            description: 'Pechuga de pollo, paletilla ibérica y salsa secreta de la casa.',
          },
          {
            id: 'b-cal-uno-nuestros',
            name: 'Uno de los Nuestros',
            description: 'Pechuga de pollo, paleta ibérica, tomate natural y queso finas hierbas.',
            badge: 'ESPECIALIDAD',
          },
        ] as CartaItem[],
      },
      pizzas: [
        {
          id: 'pz-americana',
          name: 'Americana',
          description: 'Mozzarella fundente, orégano, bacon crujiente y ternera.',
        },
        {
          id: 'pz-serrana',
          name: 'Serrana',
          description: 'Mozzarella, orégano, bacon, paletilla ibérica, champiñones y pimiento rojo.',
          badge: 'IBÉRICA',
        },
        {
          id: 'pz-grafit',
          name: 'Grafit',
          description: 'Mozzarella, orégano, jamón york, bacon, champiñones, pimiento rojo y verde.',
          badge: 'DE LA CASA',
        },
        {
          id: 'pz-pollo-alioli',
          name: 'Pollo Ali-Oli',
          description: 'Mozzarella, orégano, pollo braseado, champiñones, paletilla ibérica y ali-oli.',
        },
        {
          id: 'pz-baserri',
          name: 'Baserri',
          description: 'Mozzarella, orégano, chistorra artesana y bacon.',
          badge: 'TRADICIÓN',
        },
        {
          id: 'pz-mexicana',
          name: 'Mexicana',
          description: 'Mozzarella, orégano, pollo, bacon, champiñones, pimiento rojo y salsa picante.',
        },
        {
          id: 'pz-vegetariana',
          name: 'Vegetariana (32 cm)',
          description: 'Mozzarella, orégano, cebolla pochada, tomate natural, champiñones y pimientos variados.',
          badge: 'VEGGIE',
        },
        {
          id: 'pz-bonito',
          name: 'Bonito (32 cm)',
          description: 'Mozzarella, orégano, bonito del norte, champiñón y cebolla pochada.',
        },
        {
          id: 'pz-americana-huevo',
          name: 'Americana con Huevo (32 cm)',
          description: 'Mozzarella, orégano, tomate natural, ternera y huevo frito en el centro.',
        },
        {
          id: 'pz-burrata',
          name: 'Burrata (32 cm)',
          description: 'Mozzarella, rúcula fresca, paletilla ibérica, tomates cherry confitados y burrata cremosa.',
          badge: 'GOURMET',
        },
      ] as CartaItem[],
      ensaladas: [
        {
          id: 'ens-mar-huerta',
          name: 'Mar y Huerta',
          description: 'Bouquet de lechugas variadas, tomate cherry, anchoas, huevo cocido, salmón ahumado y bonito.',
          badge: 'MARINERA',
        },
        {
          id: 'ens-rulo-cabra',
          name: 'Rulo de Cabra',
          description: 'Bouquet de lechugas variadas, cebolla caramelizada, tomates secos, pimientos del piquillo, nueces, rulo de cabra a la plancha y picatostes.',
          badge: 'TEMPLADA',
        },
        {
          id: 'ens-euskaldun',
          name: 'Euskaldun',
          description: 'Bouquet de lechugas variadas, tomate cherry, maíz, zanahoria rallada, cebolla, huevo cocido, espárrago y patata.',
        },
        {
          id: 'ens-tropical',
          name: 'Tropical',
          description: 'Bouquet de lechugas variadas, tomate cherry, jamón york, queso, piña, nueces y picatostes.',
        },
        {
          id: 'ens-italiana',
          name: 'Italiana',
          description: 'Pasta tricolor, txaka, jamón york, pollo, maíz, picatostes y salsa rosa casera.',
        },
        {
          id: 'ens-mixta',
          name: 'Mixta Clásica',
          description: 'Bouquet de lechugas variadas, tomate cherry, bonito, cebolla fresca, huevo cocido y espárrago.',
        },
        {
          id: 'ens-grafit',
          name: 'Grafit',
          description: 'Bouquet de lechugas variadas, tomate cherry, queso, maíz, zanahoria rallada, virutas de paleta ibérica y picatostes.',
          badge: 'ESPECIAL',
        },
        {
          id: 'ens-tomate-burrata',
          name: 'Tomate y Burrata',
          description: 'Tomate en rodajas, mezclum de lechugas, cebolla crujiente, aceitunas verdes, paleta ibérica y burrata cremosa.',
          badge: 'GOURMET',
        },
      ] as CartaItem[],
      picoteo: [
        {
          id: 'pic-sarteneko-gulas',
          name: 'Sarteneko de Gulas con Gambas al Ajillo',
          description: 'Cazuela caliente de gulas del norte salteadas con gambas jugosas al ajillo y guindilla.',
          badge: 'ESPECIALIDAD',
        },
        {
          id: 'pic-patatas-6-salsas',
          name: 'Patatas Crujientes 6 Salsas',
          description: 'Patatas fritas doradas acompañadas de una degustación de 6 salsas de la casa.',
          badge: 'FAVORITO',
        },
        {
          id: 'pic-patatas-fritas',
          name: 'Patatas Fritas (Solas o con Ali-Oli)',
          description: 'Ración de patatas fritas al punto crujiente, con opción de salsa ali-oli casera.',
        },
        {
          id: 'pic-croquetas-jamon',
          name: 'Croquetas de Jamón Ibérico (8 unid.)',
          description: '8 croquetas cremosas con bechamel suave y jamón ibérico curado.',
          badge: 'CASERAS',
        },
        {
          id: 'pic-croquetas-variadas',
          name: 'Croquetas Variadas (8 unid. o Media)',
          description: 'Surtido de 8 croquetas gourmet: gambón, chuleta a la brasa, boletus y bacalao. Disponible también en media ración.',
          badge: 'SURTIDO GOURMET',
        },
        {
          id: 'pic-natxos',
          name: 'Natxos Gratinados con Queso (Solos o con Bacon)',
          description: 'Totopos de maíz crujientes gratinados al horno con abundante queso fundido y opción de bacon.',
        },
        {
          id: 'pic-nuggets',
          name: 'Nuggets de Pollo Crujientes',
          description: 'Bocados crujientes de pollo dorados con dip de salsa.',
        },
        {
          id: 'pic-mozzarella',
          name: 'Palitos de Mozzarella (8 unid.)',
          description: '8 palitos crujientes de queso mozzarella fundente.',
        },
        {
          id: 'pic-combo',
          name: 'Combo Nuggets + Palitos Mozzarella',
          description: 'Combinado para compartir con nuggets de pollo crujientes y palitos de mozzarella.',
          badge: 'PARA COMPARTIR',
        },
        {
          id: 'pic-tempura',
          name: 'Tempura de Verduras Variadas',
          description: 'Fritura ligera y crujiente de verduras frescas de temporada.',
        },
        {
          id: 'pic-tabla-iberica',
          name: 'Tabla de Paleta Ibérica',
          description: 'Paleta ibérica curada servida con pan crujiente y aceite de oliva virgen extra.',
          badge: 'CHARCUTERÍA',
        },
      ] as CartaItem[],
      platosCombinados: [
        {
          id: 'pc-1',
          name: 'Plato Nº 1',
          description: 'Pechuga de pollo, croquetas artesanas, bacon crujiente, patatas fritas y ensalada fresca.',
        },
        {
          id: 'pc-2',
          name: 'Plato Nº 2',
          description: 'Lomo a la plancha, pimientos rojos, dos huevos fritos y patatas fritas.',
        },
        {
          id: 'pc-3',
          name: 'Plato Nº 3',
          description: 'Pechugas de pollo empanadas, ensaladilla rusa casera, huevo frito, pimientos y patatas fritas.',
          badge: 'COMPLETO',
        },
        {
          id: 'pc-4',
          name: 'Plato Nº 4',
          description: 'Filete de ternera, pimientos rojos asados, huevo frito, croquetas y patatas fritas.',
        },
        {
          id: 'pc-5',
          name: 'Plato Nº 5',
          description: 'Hamburguesa de la casa, huevo frito, bacon crujiente, croquetas y patatas fritas.',
          badge: 'HAMBURGUESA',
        },
        {
          id: 'pc-6',
          name: 'Plato Nº 6',
          description: 'Filete de ternera con queso y paletilla ibérica, pimientos rojos, huevo y patatas fritas.',
          badge: 'ESPECIAL',
        },
        {
          id: 'pc-8',
          name: 'Plato Nº 8',
          description: 'Ensalada, espárragos, tortilla francesa al gusto y paletilla ibérica.',
        },
      ] as CartaItem[],
    },
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
      title: 'LA BURGER DE AUTOR',
      subtitle: 'Producto estrella de autor',
      tag: 'CULINARY ROCK',
      src: './assets/grafit/burgers/burger-rulo-cabra.jpg',
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
