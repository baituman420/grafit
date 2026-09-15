export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  image?: string;
  category: 'burger' | 'pintxo' | 'plato' | 'desayuno' | 'cerveza' | 'copa';
}

export interface EventItem {
  id: string;
  dateDay: string;
  dateMonth: string;
  artist: string;
  genre: string;
  time: string;
  entry: string;
  description: string;
  image: string;
  highlight?: boolean;
  stampText?: string;
}

export interface HoyItem {
  id: string;
  tag: string;
  title: string;
  time?: string;
  price?: string;
  description: string;
  type: 'comida' | 'deporte' | 'musica' | 'oferta';
  badgeColor?: string;
}

export const GRAFIT_DATA = {
  info: {
    name: 'Grafit Rock Café',
    subname: 'Indautxu — Bilbao',
    tagline: 'Café, Cocina Non-Stop, Cervezas de Tanque, Conciertos y Copas',
    established: '2017',
    address: 'Urrutia Kalea, 1',
    neighborhood: 'Indautxu',
    city: '48010 Bilbao, Bizkaia',
    phone: '+34 944 12 34 56',
    email: 'hola@grafitcafe.com',
    hours: [
      { days: 'Lunes a Jueves', time: '08:00 – 23:00' },
      { days: 'Viernes', time: '08:00 – 02:00' },
      { days: 'Sábados', time: '09:00 – 02:30' },
      { days: 'Domingos', time: '10:00 – 23:00' },
    ],
    kitchenHours: 'Cocina Non-Stop: De 12:00 a 23:30 ininterrumpidamente',
    socials: {
      instagram: 'https://instagram.com/grafitcafe',
      facebook: 'https://facebook.com/grafitcafe',
      whatsapp: 'https://wa.me/34944123456'
    }
  },

  navLinks: [
    { label: 'HOME', path: '/', isHome: true },
    { label: 'CARTA', path: '/carta', badge: 'Non-Stop' },
    { label: 'AGENDA', path: '/agenda', badge: 'En Vivo' },
    { label: 'GRUPOS', path: '/grupos' },
    { label: 'GRAFIT 2017', path: '/grafit' },
  ],

  hero: {
    titleTop: 'GRAFIT',
    titleBottom: 'ROCK CAFÉ',
    subtitle: 'EL PUNTO DE ENCUENTRO PUNK & ROCK EN INDAUTXU',
    locationBadge: 'URRUTIA KALEA 1 • INDAUTXU • BILBAO',
    tickerText: '★ COCINA NON-STOP ★ CERVEZAS DE TANQUE ★ CONCIERTOS EN DIRECTO ★ PINTXOS DE BARRA ★ ROCK & ROLL ★ SIN ARTIFICIOS ★ INDAUTXU BILBAO ★',
    mainTagline: 'Sin postureo. Cerveza fría, comida real, música alta y ambiente de local de toda la vida.',
    polaroids: [
      {
        id: 'hero-bar',
        src: '/assets/grafit/interior/grafit-barra-01.jpg',
        caption: 'La Barra • 08:00 a 02:00',
        rotation: '-3deg',
        top: '5%',
        left: '2%'
      },
      {
        id: 'hero-food',
        src: '/assets/grafit/food/grafit-hamburguesa-01.jpg',
        caption: 'Burger Grafit Gourmet',
        rotation: '4deg',
        top: '12%',
        right: '4%'
      },
      {
        id: 'hero-live',
        src: '/assets/grafit/events/grafit-concierto-mikel-bizar-01.jpg',
        caption: 'Mikel Bizar en Acústico',
        rotation: '-2deg',
        bottom: '8%',
        left: '6%'
      }
    ]
  },

  hoy: [
    {
      id: 'hoy-plato',
      tag: 'PLATO DEL DÍA',
      title: 'Cachopo Rústico con Patatas de la Huerta',
      time: 'Servido de 12:30 a 16:30',
      price: '12,50€',
      description: 'Ternera seleccionada, jamón ibérico y queso fundido con patatas rústicas fritas al momento.',
      type: 'comida'
    },
    {
      id: 'hoy-partido',
      tag: 'EN PANTALLA',
      title: 'ATHLETIC CLUB vs REAL SOCIEDAD',
      time: 'Hoy a las 21:00h',
      description: 'Retransmisión del derbi vasco en directo en las pantallas de la sala principal con cañas bien tiradas.',
      type: 'deporte'
    },
    {
      id: 'hoy-musica',
      tag: 'VINILOS & BEER',
      title: 'Sesión Post-Punk & Classic Rock 33 RPM',
      time: 'A partir de las 19:30h',
      description: 'Selección musical pinchada en vinilo original: The Clash, Barricada, Radio Futura y Joy Division.',
      type: 'musica'
    },
    {
      id: 'hoy-desayuno',
      tag: 'MAÑANAS GRAFIT',
      title: 'Café Doble + Pintxo de Tortilla Especial',
      time: 'De 08:00 a 11:30h',
      price: '3,80€',
      description: 'El desayuno clásico de los madrugadores de Indautxu con tortilla hecha a primera hora.',
      type: 'oferta'
    }
  ] as HoyItem[],

  gastronomia: {
    headline: 'COMIDA NON-STOP & CERVEZA BIEN TIRADA',
    description: 'En Grafit la cocina no cierra a deshoras. Hamburguesas contundentes, pintxos recién salidos de la cocina y tanques de cerveza helada a cualquier hora.',
    posterSrc: '/assets/grafit/branding/grafit-cartel-cocina-nonstop.jpg',
    beersPhoto: '/assets/grafit/drinks/grafit-cerveza-canero-01.jpg',
    featuredDishes: [
      {
        id: 'b1',
        name: 'Burger Grafit Special',
        description: '100% carne de buey (200g), queso cheddar ahumado, bacon crujiente, cebolla caramelizada y salsa secreta Rock.',
        price: '11,90€',
        badge: 'TOP VENTAS',
        image: '/assets/grafit/food/grafit-hamburguesa-01.jpg',
        category: 'burger'
      },
      {
        id: 'p1',
        name: 'Pintxo de Tortilla de Patata con Alegrías',
        description: 'La reina de la barra. Jugosa, recién hecha, con o sin cebolla y un toque picante suave.',
        price: '2,60€',
        badge: 'RECIÉN HECHA',
        image: '/assets/grafit/food/grafit-pintxos-02.jpg',
        category: 'pintxo'
      },
      {
        id: 'b2',
        name: 'Cerveza de Tanque Calibre 0',
        description: 'Servida a la temperatura exacta desde nuestros tanques principales. Espuma densa y frescura máxima.',
        price: '2,80€ / Caña',
        badge: 'TANQUE DIRECTO',
        image: '/assets/grafit/drinks/grafit-tanques-cerveza-01.jpg',
        category: 'cerveza'
      },
      {
        id: 'd1',
        name: 'Desayuno Indautxu Completo',
        description: 'Café illy, zumo de naranja natural exprimido al momento y tostada de pan de masa madre con tomate y aceite VE.',
        price: '4,50€',
        badge: 'DESDE 08:00H',
        image: '/assets/grafit/food/grafit-desayuno-04.jpg',
        category: 'desayuno'
      }
    ] as MenuItem[]
  },

  agenda: {
    headline: 'CONCIERTOS & ACTUACIONES EN DIRECTO',
    subtext: 'Música en vivo sin artificios. Acústicos íntimos, bandas locales y ambiente eléctrico.',
    posterCutout: '/assets/grafit/events/grafit-concierto-cuarto-traste-06.jpg',
    eventsList: [
      {
        id: 'ev-1',
        dateDay: '24',
        dateMonth: 'SEP',
        artist: 'MIKEL BIZAR',
        genre: 'Rock Euskaldun / Acústico en Vivo',
        time: '20:30h',
        entry: 'Entrada Libre',
        description: 'El vocalista histórico de Idi Bihotz repasa temas clásicos del rock en un formato acústico único e íntimo.',
        image: '/assets/grafit/events/grafit-concierto-mikel-bizar-01.jpg',
        highlight: true,
        stampText: 'IMPRESCINDIBLE'
      },
      {
        id: 'ev-2',
        dateDay: '02',
        dateMonth: 'OCT',
        artist: 'CUARTO TRASTE',
        genre: 'Rock Urbano & Blues Electrizante',
        time: '21:30h',
        entry: 'Entrada Libre',
        description: 'Banda bilbaína de rock en estado puro. Guitarrazos, distorsión y sala llena garantizada.',
        image: '/assets/grafit/events/grafit-concierto-cuarto-traste-06.jpg',
        highlight: true,
        stampText: 'DIRECTO ROCK'
      },
      {
        id: 'ev-3',
        dateDay: '15',
        dateMonth: 'OCT',
        artist: 'NOCHE DE VINILOS & JAM',
        genre: 'Sesión Abierta & Post-Punk',
        time: '19:30h',
        entry: 'Entrada Libre',
        description: 'Trae tus propios vinilos o súbete al micro abierto para la sesión de jam session comunitaria.',
        image: '/assets/grafit/events/grafit-concierto-directo-04.jpg',
        highlight: false,
        stampText: 'JAM SESSION'
      }
    ] as EventItem[]
  },

  historia: {
    headline: 'DESDE 2017 CONSTRUYENDO UN REFUGIO ROCK EN INDAUTXU',
    quote: '"Grafit no se diseñó en un despacho de marketing. Se construyó con madera, guitarras en las paredes, fotos de amigos y mucha actitud."',
    openingYear: '2017',
    inaugurationPhoto: '/assets/grafit/archive/grafit-inauguracion-2017-05.jpg',
    reopeningPhoto: '/assets/grafit/archive/grafit-reapertura-celebracion-05.jpg',
    muralPhoto: '/assets/grafit/interior/grafit-interior-mural-02.jpg',
    manifesto: [
      'Un local nacido para quienes buscan buena música, cañas heladas y platos sustanciosos.',
      'Ubicados en la céntrica calle Urrutia 1, entre la plaza Indautxu y los lugares de poteo emblemáticos de Bilbao.',
      'Aquí el rock no es una pose decorativa: suena en los altavoces, se respira en el mural de vinilos y se vive en cada concierto.'
    ]
  },

  grupos: {
    headline: 'CELEBRACIONES, CUMPLEAÑOS Y REUNIONES DE CUADRILLA',
    description: '¿Tienes un cumpleaños, una cena de cuadrilla o un evento especial? Reserva nuestro espacio de mesas o la zona de la barra para tu grupo.',
    photo: '/assets/grafit/archive/grafit-reapertura-celebracion-05.jpg',
    features: [
      'Menús cerrados para grupos a medida',
      'Zona reservada en salón con mural rock',
      'Cocina non-stop adaptada a tu horario',
      'Posibilidad de reservar barril o consumiciones'
    ]
  }
};
