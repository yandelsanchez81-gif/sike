// ============================================================
// GUARDIANES DEL MAR — DATOS DE ESPECIES MARINAS EN PELIGRO
// Panamá — Océano Pacífico + Mar Caribe
// Versión 5.0 — INFORMACIÓN VERIFICADA CON FUENTES OFICIALES
// ============================================================
// SISTEMA DE COLORES (semáforo):
//   "critico"    → 🔴 ROJO — Peligro Crítico (CR)
//   "peligro"    → 🔴 ROJO — En Peligro (EN)
//   "vulnerable" → 🟡 AMARILLO — Vulnerable (VU)
//   "menor"      → 🟢 VERDE — Preocupación Menor (LC)
// ============================================================

const especiesData = [

    // =========================================================
    // OCÉANO PACÍFICO — 12 ESPECIES
    // =========================================================

    // --- PELIGRO CRÍTICO (🔴) ---
    {
        id: 1,
        nombreComun: "Tiburón Martillo",
        nombreCientifico: "Sphyrna lewini",
        region: "pacifico",
        tipo: "tiburon",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [7.64, -81.73],
        lugarPanama: "Bajo Mono, Parque Nacional Coiba",
        habitat: "Aguas costeras y montes submarinos del Pacífico. El Parque Nacional Coiba es su refugio más importante en Panamá. Los juveniles crecen en bahías protegidas como Punta Chame.",
        descripcion: "El tiburón martillo es fácilmente reconocible por su cabeza en forma de 'T', que le proporciona visión de 360 grados y contiene miles de sensores eléctricos para detectar presas enterradas en la arena. Es una de las especies de tiburón más amenazadas del mundo debido a la demanda de sus aletas en el mercado asiático. La UICN lo ha clasificado en Peligro Crítico tras documentarse reducciones poblacionales de hasta el 80% en el Pacífico Oriental. En Panamá, el Parque Nacional Coiba protege una de las últimas agregaciones importantes de esta especie.",
        amenazas: ["Pesca dirigida por el alto valor de sus aletas", "Captura incidental en redes de pesca artesanal", "Destrucción de manglares y estuarios que son zonas de cría", "Baja tasa de reproducción: una cría cada 2 años"],
        datoCurioso: "Su cabeza en forma de martillo le permite tener una visión de 360 grados y detectar los campos eléctricos de peces enterrados en la arena. Puede sentir los latidos del corazón de una presa escondida.",
        fotoUrl: "tiburon-martillo.jpg",
        fuentes: "STRI; Parque Nacional Coiba; UICN; CITES Apéndice II"
    },

    {
        id: 2,
        nombreComun: "Pez Sierra Común",
        nombreCientifico: "Pristis pristis",
        region: "pacifico",
        tipo: "pez",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [7.95, -78.30],
        lugarPanama: "Estuario del Río Sambú, Darién",
        habitat: "Estuarios y ríos de agua dulce del Darién. Utiliza su sierra electrosensorial para cazar en aguas turbias.",
        descripcion: "El pez sierra es una de las especies más amenazadas del planeta. Aunque su aspecto recuerda a un tiburón, en realidad es una raya especializada. Su característico rostro alargado (la 'sierra') está bordado de dientes sensibles que detectan los campos eléctricos de sus presas. Ha desaparecido del 95% de su distribución histórica en América. Las poblaciones remanentes en el Darién son de importancia crítica para la supervivencia de la especie.",
        amenazas: ["Enredo de su sierra en redes de pesca artesanal", "Destrucción de manglares y humedales", "Comercio ilegal de su sierra como trofeo", "Bajísima densidad poblacional que dificulta la reproducción"],
        datoCurioso: "Los bebés del pez sierra nacen con la sierra cubierta por una vaina protectora de cartílago blando para no lastimar a su madre. Esa vaina se disuelve sola horas después del nacimiento.",
        fotoUrl: "pez-sierra.jpg",
        fuentes: "MarAlliance; ARAP; IUCN SSC Shark Specialist Group; CITES Apéndice I"
    },

    // --- EN PELIGRO (🔴) ---
    {
        id: 3,
        nombreComun: "Tortuga Verde",
        nombreCientifico: "Chelonia mydas",
        region: "pacifico",
        tipo: "tortuga",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [8.56, -79.71],
        lugarPanama: "Punta Chame, Panamá Oeste",
        habitat: "Praderas de pastos marinos del Golfo de Panamá. Anida en playas de arena de Punta Chame, donde comunidades locales protegen sus nidos.",
        descripcion: "La tortuga verde es la única tortuga marina herbívora en su etapa adulta. Se alimenta de pastos marinos, manteniendo saludables estos ecosistemas al podarlos y estimular su crecimiento. Su nombre proviene del color verdoso de su grasa, causado por su dieta vegetal. Esta característica la hizo víctima de cacería intensiva durante siglos. En Punta Chame, programas de conservación comunitaria han logrado aumentar la protección de nidos en los últimos años.",
        amenazas: ["Cacería ilegal para consumo de carne", "Captura incidental en redes de pesca", "Contaminación por plásticos en zonas de alimentación", "Desarrollo costero que destruye playas de anidación"],
        datoCurioso: "Su grasa tiene un tono verde debido a su dieta exclusivamente herbívora. Es la única tortuga marina que come plantas en lugar de animales.",
        fotoUrl: "tortuga-verde.jpg",
        fuentes: "MiAMBIENTE; Programa de Conservación de Tortugas Marinas de Panamá; UICN"
    },

    {
        id: 4,
        nombreComun: "Manta Gigante",
        nombreCientifico: "Mobula birostris",
        region: "pacifico",
        tipo: "raya",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [7.47, -82.24],
        lugarPanama: "Isla Montuosa, Golfo de Chiriquí",
        habitat: "Aguas oceánicas profundas alrededor de islas remotas. Visita estaciones de limpieza en arrecifes donde peces pequeños le quitan parásitos.",
        descripcion: "La manta gigante es la raya más grande del océano, alcanzando hasta 7 metros de envergadura. Posee el cerebro más grande de todos los peces en relación a su tamaño corporal, lo que sugiere una inteligencia compleja. Son animales sociales que visitan regularmente 'estaciones de limpieza' en arrecifes oceánicos. A diferencia de otras rayas, deben nadar constantemente para mantener el flujo de agua oxigenada sobre sus branquias; si se detienen, se asfixian.",
        amenazas: ["Pesca ilegal para comercio de sus branquias", "Captura incidental en redes de deriva", "Turismo de buceo no regulado", "Lenta reproducción: una cría cada 2-5 años"],
        datoCurioso: "La manta gigante nunca duerme. Si dejara de nadar, dejaría de respirar y moriría por asfixia. Tiene el cerebro más grande de todos los peces.",
        fotoUrl: "manta-gigante.jpg",
        fuentes: "MarViva; Fundación Megafauna Marina; Corredor Marino del Pacífico Este Tropical; UICN"
    },

    // --- VULNERABLE (🟡) ---
    {
        id: 5,
        nombreComun: "Tortuga Lora",
        nombreCientifico: "Lepidochelys olivacea",
        region: "pacifico",
        tipo: "tortuga",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [7.25, -80.42],
        lugarPanama: "Playa La Marinera, Tonosí",
        habitat: "Aguas costeras del Pacífico. Anida en masa en playas arenosas de Tonosí, donde se protegen sus nidos durante la temporada.",
        descripcion: "La tortuga lora es la tortuga marina más pequeña del mundo. Es famosa por sus 'arribadas': anidaciones masivas sincronizadas donde miles de hembras emergen del mar simultáneamente para desovar. Panamá es uno de los pocos países del Pacífico americano donde aún ocurre este fenómeno. Las arribadas están sincronizadas con los ciclos lunares y ocurren principalmente entre julio y diciembre.",
        amenazas: ["Extracción ilegal de huevos para consumo humano", "Captura incidental en redes camaroneras", "Ataques de perros callejeros a hembras anidantes", "Pérdida de playas por erosión costera"],
        datoCurioso: "En una sola 'arribada' pueden llegar hasta 10,000 tortugas a la misma playa en una noche. Este fenómeno está sincronizado con los ciclos lunares.",
        fotoUrl: "tortuga-lora.jpg",
        fuentes: "ARAP; MiAMBIENTE; Sea Turtle Conservancy"
    },

    {
        id: 6,
        nombreComun: "Tiburón Ballena",
        nombreCientifico: "Rhincodon typus",
        region: "pacifico",
        tipo: "tiburon",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [7.43, -82.07],
        lugarPanama: "Banco Hannibal, Golfo de Chiriquí",
        habitat: "Aguas superficiales ricas en plancton del Golfo de Chiriquí. Presente principalmente entre enero y marzo, cuando se concentra para alimentarse.",
        descripcion: "El tiburón ballena es el pez más grande del mundo, alcanzando hasta 12 metros de longitud. A pesar de su tamaño colosal, es completamente inofensivo: se alimenta filtrando plancton y pequeños peces a través de sus branquias. Cada individuo tiene un patrón único de puntos blancos en su piel, como una huella digital humana, que permite a los científicos identificarlos y rastrearlos a lo largo de los años. El Banco Hannibal es una de sus zonas de agregación más importantes en el Pacífico panameño.",
        amenazas: ["Colisiones con embarcaciones turísticas y pesqueras", "Pérdida de plancton por calentamiento oceánico", "Contaminación por microplásticos", "Pesca incidental en redes atuneras"],
        datoCurioso: "Cada tiburón ballena tiene un patrón único de puntos blancos, como una huella digital. Los científicos usan estos patrones para identificar individuos y estudiar sus migraciones.",
        fotoUrl: "tiburon-ballena.jpg",
        fuentes: "Migramar; STRI; Comisión Interamericana del Atún Tropical; UICN"
    },

    {
        id: 7,
        nombreComun: "Cachalote",
        nombreCientifico: "Physeter macrocephalus",
        region: "pacifico",
        tipo: "mamifero",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [7.10, -81.80],
        lugarPanama: "Talud continental, sur de Isla Jicarón",
        habitat: "Cañones submarinos profundos del Pacífico panameño, donde bucea en busca de calamares gigantes.",
        descripcion: "El cachalote es el depredador con dientes más grande del planeta. Posee el cerebro más pesado de todos los animales conocidos. Está adaptado para cazar en las profundidades: puede sumergirse a más de 2,000 metros y permanecer bajo el agua hasta 90 minutos. Su cabeza contiene el 'órgano de espermaceti', una cavidad llena de cera que utiliza para controlar su flotabilidad y emitir los sonidos más potentes del océano para ecolocalizar a sus presas.",
        amenazas: ["Contaminación acústica por sonares y tráfico marítimo", "Captura incidental en palangres de pesca de altura", "Ingestión de plásticos de aguas profundas", "Bioacumulación de metales pesados"],
        datoCurioso: "Sus clicks de ecolocalización son los sonidos más potentes producidos por cualquier animal, alcanzando 236 decibelios bajo el agua. Pueden aturdir a sus presas con el sonido.",
        fotoUrl: "cachalote.jpg",
        fuentes: "NOAA Fisheries; STRI; Sociedad de Mastozoología Marina; UICN"
    },

    {
        id: 8,
        nombreComun: "Tiburón Sedoso",
        nombreCientifico: "Carcharhinus falciformis",
        region: "pacifico",
        tipo: "tiburon",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [7.43, -82.07],
        lugarPanama: "Banco Hannibal, Golfo de Chiriquí",
        habitat: "Aguas oceánicas pelágicas profundas. Sigue cardúmenes de atún en el Pacífico Oriental.",
        descripcion: "El tiburón sedoso debe su nombre a la textura extraordinariamente suave de su piel. Es uno de los tiburones oceánicos más abundantes, pero también uno de los más afectados por la pesca industrial. Es la especie de tiburón más capturada incidentalmente por las flotas atuneras de cerco a nivel mundial. Su piel suave y su cuerpo hidrodinámico le permiten nadar grandes distancias siguiendo cardúmenes de atún. Está incluido en el Apéndice II de CITES, que regula su comercio internacional.",
        amenazas: ["Alta captura incidental en redes atuneras industriales", "Uso de dispositivos agregadores de peces (FADs)", "Aleteo ilegal para comercio de aletas", "Baja tasa reproductiva: 2-14 crías cada 2 años"],
        datoCurioso: "Su piel es tan suave que parece seda al tacto. Se agrupa alrededor de objetos flotantes en el mar, donde es capturado accidentalmente por la pesca de atún.",
        fotoUrl: "tiburon-sedoso.jpg",
        fuentes: "STRI; Comisión Interamericana del Atún Tropical (CIAT); FAO; CITES Apéndice II"
    },

    {
        id: 9,
        nombreComun: "Mero del Pacífico",
        nombreCientifico: "Epinephelus quinquefasciatus",
        region: "pacifico",
        tipo: "pez",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [7.74, -81.78],
        lugarPanama: "Bajo 20, Parque Nacional Coiba",
        habitat: "Arrecifes rocosos profundos del Parque Nacional Coiba. Vive en cuevas y grietas, donde puede alcanzar más de 2 metros.",
        descripcion: "El mero del Pacífico es un gigante de los arrecifes rocosos, pudiendo alcanzar más de 2 metros y pesar hasta 400 kilogramos. Es hermafrodita protógino: todos los individuos nacen como hembras y algunos se transforman en machos al alcanzar la madurez. Esta estrategia reproductiva los hace especialmente vulnerables a la sobrepesca, ya que la captura de ejemplares grandes elimina selectivamente a los machos reproductores. El Parque Nacional Coiba protege algunas de las poblaciones más saludables del Pacífico Oriental.",
        amenazas: ["Sobrepesca dirigida a individuos grandes", "Pesca ilegal con arpón dentro de áreas protegidas", "Destrucción de cuevas rocosas", "Lento crecimiento y madurez tardía"],
        datoCurioso: "Todos los meros nacen siendo hembras. Los individuos más grandes y viejos se convierten en machos para asegurar la reproducción del grupo.",
        fotoUrl: "mero-pacifico.jpg",
        fuentes: "ARAP; Parque Nacional Coiba; Sociedad Panameña de Biología; UICN"
    },

    // --- PREOCUPACIÓN MENOR (🟢) ---
    {
        id: 10,
        nombreComun: "Ballena Jorobada",
        nombreCientifico: "Megaptera novaeangliae",
        region: "pacifico",
        tipo: "mamifero",
        nivelPeligro: "menor",
        nivelPeligroLabel: "Preocupación Menor",
        estadoUICN: "LC — Preocupación Menor",
        coordenadas: [8.55, -79.65],
        lugarPanama: "Archipiélago de las Perlas, Golfo de Panamá",
        habitat: "Aguas cálidas del Golfo de Panamá entre julio y octubre. Zona de reproducción y crianza del Pacífico Oriental.",
        descripcion: "La ballena jorobada es famosa por sus espectaculares saltos y sus complejos cantos, que pueden durar hasta 20 minutos. Panamá tiene una característica única: es el único lugar del mundo donde convergen ballenas jorobadas de ambos hemisferios. Las poblaciones del norte migran desde California, mientras que las del sur viajan más de 8,000 kilómetros desde la Antártida para reproducirse en aguas panameñas. Están protegidas por la legislación nacional, que prohíbe acercarse a menos de 250 metros.",
        amenazas: ["Colisiones con buques en rutas del Canal de Panamá", "Contaminación acústica por tráfico marítimo", "Enredo en redes de pesca abandonadas", "Turismo de avistamiento no regulado"],
        datoCurioso: "Los machos cantan canciones que cambian cada temporada. Todos los machos de una región aprenden la nueva canción del año, como un 'hit musical' oceánico.",
        fotoUrl: "ballena-jorobada.jpg",
        fuentes: "STRI; The Whale Museum; Comisión Ballenera Internacional; MiAMBIENTE"
    },

    {
        id: 11,
        nombreComun: "Ballena de Bryde",
        nombreCientifico: "Balaenoptera edeni",
        region: "pacifico",
        tipo: "mamifero",
        nivelPeligro: "menor",
        nivelPeligroLabel: "Preocupación Menor",
        estadoUICN: "LC — Preocupación Menor",
        coordenadas: [7.96, -82.03],
        lugarPanama: "Islas Secas, Golfo de Chiriquí",
        habitat: "Aguas tropicales del Golfo de Chiriquí. Es la única ballena que reside en Panamá durante todo el año.",
        descripcion: "A diferencia de otras ballenas que migran a los polos, la ballena de Bryde vive permanentemente en aguas tropicales. En Panamá se le conoce como 'ballena sardinera' porque se alimenta siguiendo cardúmenes de sardinas y otros peces pequeños. Es fácil de identificar por las tres crestas paralelas en su hocico, una característica única entre los rorcuales. Su presencia constante en aguas panameñas la hace especialmente vulnerable a las actividades humanas locales.",
        amenazas: ["Colisiones con embarcaciones pesqueras y turísticas", "Sobrepesca de sardinas, su principal alimento", "Contaminación acústica", "Degradación de zonas costeras"],
        datoCurioso: "Es la única ballena que vive en Panamá los 365 días del año. Se le identifica fácilmente por las tres crestas paralelas en su hocico.",
        fotoUrl: "ballena-bryde.jpg",
        fuentes: "STRI; NOAA Fisheries; Comisión Ballenera Internacional"
    },

    {
        id: 12,
        nombreComun: "Delfín Manchado Pantropical",
        nombreCientifico: "Stenella attenuata",
        region: "pacifico",
        tipo: "mamifero",
        nivelPeligro: "menor",
        nivelPeligroLabel: "Preocupación Menor",
        estadoUICN: "LC — Preocupación Menor",
        coordenadas: [7.45, -81.75],
        lugarPanama: "Parque Nacional Coiba",
        habitat: "Aguas oceánicas tropicales. Viaja en grupos de hasta cientos de individuos alrededor de Coiba.",
        descripcion: "El delfín manchado es el cetáceo más abundante del Pacífico panameño. Los recién nacidos no tienen manchas; estas aparecen y se acentúan con la edad, permitiendo identificar individuos. Tiene una fascinante relación con el atún aleta amarilla: ambas especies nadan juntas en el Pacífico Oriental. Esta asociación causó la muerte de millones de delfines en redes atuneras antes de que se implementaran métodos de pesca más selectivos. Hoy sus poblaciones se están recuperando.",
        amenazas: ["Captura incidental histórica en redes atuneras", "Acoso por embarcaciones turísticas", "Contaminación química y acústica", "Degradación de hábitat oceánico"],
        datoCurioso: "Los delfines manchados nacen sin manchas y las van desarrollando con la edad, como si les salieran 'pecas' con los años.",
        fotoUrl: "delfin-manchado.jpg",
        fuentes: "STRI; NOAA; Comisión Interamericana del Atún Tropical"
    },

    // =========================================================
    // MAR CARIBE — 13 ESPECIES
    // =========================================================

    // --- PELIGRO CRÍTICO (🔴) ---
    {
        id: 13,
        nombreComun: "Tortuga Carey",
        nombreCientifico: "Eretmochelys imbricata",
        region: "caribe",
        tipo: "tortuga",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [9.26, -82.03],
        lugarPanama: "Cayo Zapatilla, Parque Nacional Marino Isla Bastimentos",
        habitat: "Arrecifes coralinos del Caribe panameño. Se alimenta de esponjas tóxicas que ningún otro animal puede digerir.",
        descripcion: "La tortuga carey es una de las especies más amenazadas del Caribe. Su caparazón de placas superpuestas en tonos ámbar ha sido codiciado durante siglos para fabricar joyería y artesanías, lo que la llevó al borde de la extinción. Desempeña un papel ecológico fundamental: es uno de los pocos animales capaces de alimentarse de esponjas tóxicas que, de otro modo, competirían con los corales por el espacio en el arrecife. El comercio de su caparazón está prohibido por CITES desde 1977.",
        amenazas: ["Caza ilegal para comercio de carey", "Pesca incidental en redes de enmalle", "Saqueo de nidos en playas remotas", "Destrucción de arrecifes coralinos"],
        datoCurioso: "Es el único animal capaz de comer esponjas tóxicas. Sin ella, las esponjas cubrirían el coral y lo matarían. Proteger a la carey es proteger todo el arrecife.",
        fotoUrl: "tortuga-carey.jpg",
        fuentes: "STRI; Parque Nacional Marino Isla Bastimentos; ICAPO; CITES; UICN"
    },

    {
        id: 14,
        nombreComun: "Tortuga Baula (Tinglar)",
        nombreCientifico: "Dermochelys coriacea",
        region: "caribe",
        tipo: "tortuga",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [9.50, -82.50],
        lugarPanama: "Playa Soropta, Humedal San San Pond Sak, Bocas del Toro",
        habitat: "Océano abierto. Anida en playas del Caribe panameño, siendo Playa Soropta la más importante de Centroamérica.",
        descripcion: "La tortuga baula es la tortuga marina más grande del planeta, pudiendo alcanzar 2 metros y pesar hasta 900 kilogramos. A diferencia de otras tortugas, no tiene un caparazón óseo, sino una piel coriácea flexible reforzada por miles de pequeñas placas óseas. Esta adaptación le permite sumergirse a más de 1,200 metros de profundidad en busca de medusas, su alimento exclusivo. El aumento de temperatura por cambio climático está afectando la proporción de sexos de las crías, produciendo más del 90% de hembras en algunas playas.",
        amenazas: ["Ingestión de bolsas plásticas que confunde con medusas", "Captura incidental en palangres", "Aumento de temperatura en nidos", "Desarrollo costero en playas de anidación"],
        datoCurioso: "Puede sumergirse a más de 1,200 metros de profundidad, más que cualquier otro reptil. Su cuerpo flexible le permite resistir la presión extrema.",
        fotoUrl: "tortuga-baula.jpg",
        fuentes: "Sea Turtle Conservancy; MiAMBIENTE; Humedal San San (RAMSAR); UICN"
    },

    {
        id: 15,
        nombreComun: "Coral Cuerno de Alce",
        nombreCientifico: "Acropora palmata",
        region: "caribe",
        tipo: "coral",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [9.17, -82.16],
        lugarPanama: "Ensenada Tobobe, Península Valiente",
        habitat: "Crestas arrecifales de alta energía en zonas someras (1-5 metros). Forma barreras naturales que protegen la costa.",
        descripcion: "El coral cuerno de alce es una especie arquitectónica fundamental en los arrecifes del Caribe. Sus ramas anchas y aplanadas crean estructuras masivas que rompen la energía del oleaje y protegen las costas de la erosión. Ha perdido más del 90% de su población en el Caribe en las últimas décadas debido a enfermedades y blanqueamiento masivo. Su tasa de crecimiento es relativamente rápida (5-10 cm por año), lo que ofrece esperanza para programas de restauración.",
        amenazas: ["Blanqueamiento por aumento de temperatura", "Enfermedades coralinas (banda blanca)", "Sedimentación por deforestación costera", "Daños físicos por anclas y tormentas"],
        datoCurioso: "Sus colonias crecen entre 5 y 10 cm al año, una de las tasas más rápidas entre los corales del Caribe. Es el 'arquitecto' de los arrecifes.",
        fotoUrl: "coral-cuerno-alce.jpg",
        fuentes: "STRI; Iniciativa Arrecifes Saludables; Red de Monitoreo de Corales del Caribe; UICN"
    },

    {
        id: 16,
        nombreComun: "Coral Cuerno de Ciervo",
        nombreCientifico: "Acropora cervicornis",
        region: "caribe",
        tipo: "coral",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [9.32, -82.22],
        lugarPanama: "Arrecife Chamorro, Isla Solarte, Bocas del Toro",
        habitat: "Matorrales coralinos someros (5-20 metros). Brinda refugio esencial para juveniles de peces.",
        descripcion: "El coral cuerno de ciervo forma densos matorrales submarinos que proporcionan hábitat tridimensional para cientos de especies. Los peces jóvenes crecen protegidos entre sus ramas antes de aventurarse al arrecife abierto. Tiene la capacidad de reproducirse asexualmente por fragmentación: cualquier rama rota que logre fijarse al fondo puede generar una nueva colonia genéticamente idéntica. Esta característica es aprovechada por los científicos para restaurar arrecifes degradados mediante viveros submarinos.",
        amenazas: ["Enfermedad de la banda blanca", "Fragmentación por anclas y tormentas", "Acidificación oceánica", "Blanqueamiento por altas temperaturas"],
        datoCurioso: "Un fragmento roto de solo 1 cm puede generar una nueva colonia si logra fijarse al fondo. Los científicos usan esta capacidad para restaurar arrecifes.",
        fotoUrl: "coral-cuerno-ciervo.jpg",
        fuentes: "STRI; Red de Monitoreo de Corales del Caribe; Iniciativa Arrecifes Saludables; UICN"
    },

    {
        id: 17,
        nombreComun: "Pez Sierra de Dientes Pequeños",
        nombreCientifico: "Pristis pectinata",
        region: "caribe",
        tipo: "pez",
        nivelPeligro: "critico",
        nivelPeligroLabel: "Peligro Crítico",
        estadoUICN: "CR — En Peligro Crítico",
        coordenadas: [9.25, -79.91],
        lugarPanama: "Desembocadura del Río Chagres, Colón",
        habitat: "Estuarios y zonas costeras de fondos blandos del Caribe panameño.",
        descripcion: "El pez sierra de dientes pequeños es una de las especies de elasmobranquios más amenazadas del mundo. Se diferencia de su pariente del Pacífico por tener entre 20 y 32 pares de dientes más pequeños y numerosos en su rostro. Funcionalmente extinto en la mayor parte de su distribución histórica, Panamá figura entre los países donde aún podría persistir. Los científicos utilizan técnicas de ADN ambiental para detectar su presencia sin necesidad de capturar individuos, analizando rastros genéticos en muestras de agua.",
        amenazas: ["Captura accidental en redes de pesca artesanal", "Destrucción de manglares en la costa atlántica", "Bajísima densidad poblacional", "Comercio histórico de su sierra como trofeo"],
        datoCurioso: "Los científicos usan ADN ambiental para detectar su presencia: analizan el agua en busca de rastros genéticos, sin necesidad de ver al animal.",
        fotoUrl: "pez-sierra-caribe.jpg",
        fuentes: "MarAlliance; ARAP; IUCN SSC Shark Specialist Group; CITES Apéndice I"
    },

    // --- EN PELIGRO (🔴) ---
    {
        id: 18,
        nombreComun: "Manatí Antillano",
        nombreCientifico: "Trichechus manatus manatus",
        region: "caribe",
        tipo: "mamifero",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [9.38, -82.35],
        lugarPanama: "Canales del Humedal San San Pond Sak, Bocas del Toro",
        habitat: "Lagunas costeras y canales de agua salobre. Consume grandes cantidades de vegetación acuática.",
        descripcion: "El manatí antillano es el mamífero acuático más grande del Caribe panameño. Puede consumir hasta 50 kilogramos de vegetación acuática al día, jugando un papel fundamental en el mantenimiento de los ecosistemas fluviales. A pesar de su aspecto, son parientes evolutivos lejanos de los elefantes, como evidencian sus uñas en las aletas y su labio superior prensil. La población del Humedal San San Pond Sak es una de las más importantes de Centroamérica, con aproximadamente 60 individuos censados.",
        amenazas: ["Colisiones con embarcaciones de motor", "Pérdida de hábitat por contaminación agrícola", "Enredo en redes de pesca", "Baja tasa reproductiva"],
        datoCurioso: "Son parientes lejanos de los elefantes, no de las ballenas. Tienen uñas en sus aletas y un labio superior dividido que usan como manos para alimentarse.",
        fotoUrl: "manati.jpg",
        fuentes: "ARAP; Proyecto de Conservación de Manatíes de Panamá; MiAMBIENTE; STRI"
    },

    {
        id: 19,
        nombreComun: "Coral de Montaña",
        nombreCientifico: "Orbicella faveolata",
        region: "caribe",
        tipo: "coral",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [9.28, -82.33],
        lugarPanama: "Arrecife Pondsock, Bahía Almirante, Bocas del Toro",
        habitat: "Grandes cúpulas en arrecifes profundos (5-30 metros). Principal arquitecto de arrecifes profundos.",
        descripcion: "El coral de montaña forma enormes cúpulas masivas que pueden tener más de 500 años de edad. Es el principal constructor de los arrecifes profundos del Caribe panameño, proporcionando la estructura sobre la que viven miles de especies. Su crecimiento es extremadamente lento (menos de 1 cm por año), pero sus colonias pueden sobrevivir durante siglos. Los científicos extraen núcleos de estos corales para estudiar la historia climática de Panamá mediante el análisis de sus bandas de crecimiento anuales.",
        amenazas: ["Blanqueamiento por altas temperaturas", "Enfermedad de pérdida de tejido (SCTLD)", "Sobrepesca de peces loro", "Acidificación oceánica"],
        datoCurioso: "Algunas colonias tienen más de 500 años. Los científicos estudian sus bandas de crecimiento para conocer el clima del pasado, como los anillos de los árboles.",
        fotoUrl: "coral-montana.jpg",
        fuentes: "STRI; Programa de Paleoclimatología del Smithsonian; Science; UICN"
    },

    {
        id: 20,
        nombreComun: "Tiburón Arrecifal del Caribe",
        nombreCientifico: "Carcharhinus perezi",
        region: "caribe",
        tipo: "tiburon",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [9.55, -82.25],
        lugarPanama: "Área Marina Protegida de Banco Volcán, Colón",
        habitat: "Arrecifes exteriores del Caribe. Depredador tope esencial para el equilibrio del ecosistema arrecifal.",
        descripcion: "El tiburón arrecifal del Caribe es el depredador tope por excelencia de los arrecifes coralinos. Controla las poblaciones de peces medianos, lo que a su vez protege a los peces herbívoros que limpian el coral de algas. Su presencia es indicador de un arrecife saludable. Panamá lideró en 2022 la propuesta que incluyó a esta especie en el Apéndice II de CITES, regulando su comercio internacional por primera vez. Sus poblaciones han disminuido drásticamente en todo el Caribe por la pesca de aletas.",
        amenazas: ["Pesca dirigida para comercio de aletas", "Pérdida de hábitat coralino", "Baja tasa de reproducción", "Captura incidental en pesquerías"],
        datoCurioso: "Panamá lideró en 2022 la propuesta para incluir a esta especie en CITES, regulando su comercio internacional. Es el 'guardián' del arrecife.",
        fotoUrl: "tiburon-arrecifal.jpg",
        fuentes: "MiAMBIENTE; CITES (Propuesta CoP19, 2022); UICN; ARAP"
    },

    {
        id: 21,
        nombreComun: "Raya Águila",
        nombreCientifico: "Aetobatus narinari",
        region: "caribe",
        tipo: "raya",
        nivelPeligro: "peligro",
        nivelPeligroLabel: "En Peligro",
        estadoUICN: "EN — En Peligro",
        coordenadas: [9.57, -78.96],
        lugarPanama: "Isla Porvenir, Guna Yala",
        habitat: "Canales entre arrecifes y manglares costeros. Se alimenta de moluscos y crustáceos.",
        descripcion: "La raya águila es una de las especies más elegantes del Caribe panameño. Su dorso con puntos blancos sobre fondo oscuro la hace inconfundible. Sus aletas pectorales, que mueve como alas, le permiten 'volar' bajo el agua. Se alimenta de moluscos y crustáceos, cuyas conchas tritura con poderosas placas dentales. Es conocida por realizar espectaculares saltos fuera del agua, que pueden alcanzar hasta 2 metros de altura. La UICN la reclasificó como 'En Peligro' en 2020 ante la evidencia de capturas incidentales crecientes.",
        amenazas: ["Captura incidental en redes y palangres", "Degradación de pastos marinos", "Acoso por embarcaciones turísticas", "Comercio de su cola como adorno"],
        datoCurioso: "Puede saltar hasta 2 metros fuera del agua. Los científicos creen que lo hace para quitarse parásitos, durante el cortejo, o simplemente por diversión.",
        fotoUrl: "raya-aguila.jpg",
        fuentes: "ARAP; Congreso Guna; Fundación Megafauna Marina; UICN"
    },

    // --- VULNERABLE (🟡) ---
    {
        id: 22,
        nombreComun: "Caracol Reina (Cambute)",
        nombreCientifico: "Aliger gigas",
        region: "caribe",
        tipo: "pez",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [9.49, -78.64],
        lugarPanama: "Cayos Holandeses, Guna Yala",
        habitat: "Pastos marinos y fondos arenosos. Organismo detritívoro que limpia los fondos marinos.",
        descripcion: "El cambute, conocido internacionalmente como 'caracol reina', es el molusco más icónico del Caribe. Tiene gran importancia cultural para el pueblo Guna, que lo ha usado tradicionalmente en alimentación y artesanía. Fue sobreexplotado hasta cerca del colapso poblacional durante el siglo XX. En Panamá, la ARAP estableció una veda permanente para permitir su recuperación. Para reproducirse necesita encontrar a otro individuo, pero cuando las poblaciones son muy bajas, no logran encontrarse, un fenómeno llamado 'efecto Allee'.",
        amenazas: ["Sobreexplotación histórica", "Destrucción de pastos marinos", "Recolección de conchas vacías", "Lento crecimiento"],
        datoCurioso: "En Panamá existe una veda permanente que protege a esta especie. Cuando las poblaciones son muy bajas, los individuos no logran encontrarse para reproducirse.",
        fotoUrl: "cambute.jpg",
        fuentes: "ARAP (Resolución No. 028); Congreso Guna; UICN"
    },

    {
        id: 23,
        nombreComun: "Mero Guasa",
        nombreCientifico: "Epinephelus itajara",
        region: "caribe",
        tipo: "pez",
        nivelPeligro: "vulnerable",
        nivelPeligroLabel: "Vulnerable",
        estadoUICN: "VU — Vulnerable",
        coordenadas: [9.28, -82.32],
        lugarPanama: "Naufragio de Pondsock, Bahía Almirante",
        habitat: "Naufragios, cuevas arrecifales y manglares. Los juveniles crecen exclusivamente en manglares.",
        descripcion: "El mero guasa es el mero más grande del Atlántico, pudiendo superar los 2.5 metros y pesar hasta 400 kilogramos. A pesar de su enorme tamaño, es notablemente curioso y se acerca lentamente a los buzos. Puede producir sonidos de baja frecuencia utilizando su vejiga natatoria como caja de resonancia, probablemente para defender su territorio. Los juveniles pasan sus primeros años de vida exclusivamente en manglares, lo que hace que la conservación de estos ecosistemas sea crítica para la especie.",
        amenazas: ["Pesca con arpón", "Destrucción de manglares", "Agregaciones de desove predecibles", "Madurez tardía"],
        datoCurioso: "Puede producir sonidos de baja frecuencia con su vejiga natatoria para defender su territorio. Es el mero más grande del Atlántico.",
        fotoUrl: "mero-guasa.jpg",
        fuentes: "MarAlliance; STRI; Sociedad de Biología Marina; UICN"
    },

    // --- PREOCUPACIÓN MENOR (🟢) ---
    {
        id: 24,
        nombreComun: "Delfín Costero",
        nombreCientifico: "Sotalia guianensis",
        region: "caribe",
        tipo: "mamifero",
        nivelPeligro: "menor",
        nivelPeligroLabel: "Preocupación Menor",
        estadoUICN: "LC — Preocupación Menor",
        coordenadas: [9.35, -82.36],
        lugarPanama: "Bahía Almirante, Bocas del Toro",
        habitat: "Aguas costeras someras y estuarios. Nunca se adentra en mar abierto.",
        descripcion: "El delfín costero es uno de los cetáceos menos conocidos del Caribe panameño. Vive exclusivamente en aguas muy someras y estuarios, sin alejarse mar adentro. Es más pequeño y robusto que el delfín nariz de botella. Posee una capacidad extraordinaria: puede detectar campos eléctricos débiles mediante electrorrecepción, lo que le permite localizar peces escondidos bajo el fango. La población de Bahía Almirante es una de las únicas dos poblaciones confirmadas en Centroamérica.",
        amenazas: ["Contaminación acústica por motores", "Atrapamiento en redes de pesca", "Degradación de manglares", "Contaminación de aguas costeras"],
        datoCurioso: "Es uno de los pocos mamíferos con electrorrecepción: puede detectar los campos eléctricos de peces escondidos bajo el fango.",
        fotoUrl: "delfin-costero.jpg",
        fuentes: "STRI; Sociedad de Mastozoología Marina; Marine Mammal Protected Areas Task Force"
    },

    {
        id: 25,
        nombreComun: "Coral Siderastrea",
        nombreCientifico: "Siderastrea siderea",
        region: "caribe",
        tipo: "coral",
        nivelPeligro: "menor",
        nivelPeligroLabel: "Preocupación Menor",
        estadoUICN: "LC — Preocupación Menor",
        coordenadas: [9.20, -82.25],
        lugarPanama: "Bahía Almirante, Bocas del Toro",
        habitat: "Coral masivo altamente resistente a condiciones adversas como alta turbidez y variaciones térmicas.",
        descripcion: "El coral siderastrea es el 'superviviente' de los arrecifes del Caribe. Tolera condiciones que matarían a otras especies: aguas turbias, altas temperaturas y baja salinidad. Por eso, es a menudo el último coral que persiste en arrecifes degradados, funcionando como refugio para otras especies. Su esqueleto denso y su lento crecimiento (menos de 1 cm por año) le permiten vivir durante siglos, convirtiéndose en un archivo natural de las condiciones oceánicas del pasado. Los científicos del STRI lo estudian para entender la resistencia al cambio climático.",
        amenazas: ["Aumento del nivel del mar", "Enfermedades bacterianas emergentes", "Contaminación industrial", "Blanqueamientos extremos y prolongados"],
        datoCurioso: "Es el 'camello' de los corales: soporta altas temperaturas, aguas turbias y contaminación que matan a otras especies. Los científicos lo estudian para entender la resistencia climática.",
        fotoUrl: "coral-siderastrea.jpg",
        fuentes: "STRI; Programa de Corales Resilientes; Coral Reefs"
    }
];