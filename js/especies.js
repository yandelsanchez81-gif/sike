// ========================================
// GUARDIANES DEL MAR — ESPECIES.JS
// Enciclopedia de especies marinas
// Versión 3.1 — CON FUENTES VISIBLES E IMÁGENES
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarEspecies(especiesData);
    configurarFiltros();
    configurarScrollTop();
    verificarNavegacionDirecta();

    console.log(`✅ Enciclopedia cargada: ${especiesData.length} especies`);
});

// ========================================
// RENDERIZAR LISTA DE ESPECIES
// ========================================
function renderizarEspecies(especies) {
    const container = document.getElementById('especies-container');
    container.innerHTML = '';

    if (especies.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron especies</h3>
                <p>Prueba cambiando los filtros para ver más resultados.</p>
            </div>
        `;
        return;
    }

    especies.forEach((especie, index) => {
        const card = crearTarjetaEspecie(especie, index);
        container.appendChild(card);
    });

    actualizarContador(especies.length);
}

// ========================================
// CREAR TARJETA DE ESPECIE (CON IMÁGENES)
// ========================================
function crearTarjetaEspecie(especie, index) {
    const card = document.createElement('div');
    card.className = 'especie-card';
    card.id = `especie-${especie.id}`;
    card.dataset.region = especie.region;
    card.dataset.tipo = especie.tipo;
    card.dataset.peligro = especie.nivelPeligro;
    card.style.animationDelay = `${index * 0.06}s`;

    // ========================================
    // DICCIONARIO DE IMÁGENES
    // Mapea los nombres de archivo a URLs de Unsplash
    // ========================================
    const imagenesPorEspecie = {
        // Tiburones
        'tiburon-martillo.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/224059254/medium.jpg',
        'tiburon-ballena.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/151593991/medium.jpg',
        'tiburon-sedoso.jpg': 'https://imagenes.teleamazonas.com/files/og_thumbnail/uploads/2025/05/17/6828a5248000f.webp',
        'tiburon-arrecifal.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Caribbean_reef_shark.jpg',
        
        // Tortugas
        'tortuga-verde.jpg': 'https://www.monaconatureencyclopedia.com/wp-content/uploads/2008/08/6-Chelonia-mydas-%C2%A9-Jean-Marie-GRADOT.jpg',
        'tortuga-lora.jpg': 'https://www.tortugueroinfo.com/tortugas-marinas-costa-rica/olive-ridley-turtle.jpg',
        'tortuga-carey.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/9696845/large.jpg',
        'tortuga-baula.jpg': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Leatherback_sea_turtle_Tinglar%2C_USVI_%285839996547%29.jpg',
        
        // Mamíferos marinos
        'ballena-jorobada.jpg': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=900',
        'ballena-bryde.jpg': 'https://us.whales.org/wp-content/uploads/sites/2/2018/07/brydes-whale-jirayu-tour-ekkul-sg.jpg',
        'cachalote.jpg': 'https://assets.superhivemarket.com/store/productimage/58646/image/original-14d6acfe55912eff3fc6789a14b64969.jpg',
        'delfin-manchado.jpg': 'https://www.car-spaw-rac.org/IMG/jpg/pivard_tachetepantropical.jpg',
        'delfin-costero.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/263699847/large.jpg',
        'manati.jpg': 'https://eldia.com.do/wp-content/uploads/2017/09/27V-06_1p01.webp',
        
        // Rayas y mantas
        'manta-gigante.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/61105151/original.jpg',
        'raya-aguila.jpg': 'https://www.aquaportail.com/aquabdd/photos/aetobatus-narinari.webp',
        
        // Peces
        'pez-sierra.jpg': 'https://recorrido.aquariumpuertodeveracruz.mx/wp-content/uploads/2024/10/pez-sierra.jpg',
        'pez-sierra-caribe.jpg': 'https://www.sharksandrays.com/wp-content/uploads/2021/04/Smalltooth-Sawfish-002.jpg',
        'mero-pacifico.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/98710674/large.jpg',
        'mero-guasa.jpg': 'https://biogeodb.stri.si.edu/caribbean/resources/img/images/species/4760_8706.jpg',
        'cambute.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/222365663/large.jpg',
        
        // Corales
        'coral-cuerno-alce.jpg': 'https://www.fishipedia.es/wp-content/uploads/2022/06/Acropora-palmata-scaled.jpg',
        'coral-cuerno-ciervo.jpg': 'https://inaturalist-open-data.s3.amazonaws.com/photos/143908891/large.jpg',
        'coral-montana.jpg': 'https://s3.animalia.bio/animals/photos/full/original/2560pxorbicella-faveolata-colombia-2.webp',
        'coral-siderastrea.jpg': 'https://reefbuilders.com/wp-content/uploads/rd/2017/07/Siderastrea-siderea-10.jpg'
    };

    // Obtener la URL de la imagen o usar un placeholder si no existe
    const imagenUrl = imagenesPorEspecie[especie.fotoUrl] || `https://placehold.co/900x320/0369a1/FFFFFF?text=${encodeURIComponent(especie.nombreComun)}`;

    // Emojis por tipo
    const emojiTipo = {
        'tortuga':  '🐢',
        'tiburon':  '🦈',
        'mamifero': '🐋',
        'cetaceo':  '🐋',
        'coral':    '🪸',
        'raya':     '🐟',
        'pez':      '🐠',
        'delfin':   '🐬',
        'ballena':  '🐳'
    };

    const tipoNombres = {
        'tortuga':  'Tortuga Marina',
        'tiburon':  'Tiburón',
        'mamifero': 'Mamífero Marino',
        'cetaceo':  'Cetáceo (Ballena/Delfín)',
        'coral':    'Coral',
        'raya':     'Raya',
        'pez':      'Pez',
        'delfin':   'Delfín',
        'ballena':  'Ballena'
    };

    // Configuración visual del nivel de peligro
    const configuracionPeligro = {
        'critico': {
            clase: 'critico',
            etiqueta: 'Peligro Crítico',
            codigo: 'CR',
            mensaje: 'Esta especie necesita ayuda urgente',
            barraClase: 'critico',
            textoClase: 'critico-text'
        },
        'peligro': {
            clase: 'critico',
            etiqueta: 'En Peligro',
            codigo: 'EN',
            mensaje: 'Su población está disminuyendo gravemente',
            barraClase: 'critico',
            textoClase: 'critico-text'
        },
        'vulnerable': {
            clase: 'vulnerable',
            etiqueta: 'Vulnerable',
            codigo: 'VU',
            mensaje: 'Necesita protección y vigilancia',
            barraClase: 'vulnerable',
            textoClase: 'vulnerable-text'
        },
        'menor': {
            clase: 'menor',
            etiqueta: 'Preocupación Menor',
            codigo: 'LC',
            mensaje: 'Actualmente estable o recuperándose',
            barraClase: 'menor',
            textoClase: 'menor-text'
        }
    };

    const peligroConfig = configuracionPeligro[especie.nivelPeligro] || configuracionPeligro['menor'];
    const regionTexto = especie.region === 'pacifico' ? '🌊 Océano Pacífico' : '🏝️ Mar Caribe';

    // Amenazas: puede ser array o string separado por coma
    let amenazasHTML;
    if (Array.isArray(especie.amenazas)) {
        amenazasHTML = especie.amenazas.map(a => `<li>${a.trim()}</li>`).join('');
    } else {
        amenazasHTML = especie.amenazas.split(',').map(a => `<li>${a.trim()}</li>`).join('');
    }

    // Lugar de Panama
    const lugarHTML = (especie.lugarPanama || especie.lugarReferencia)
        ? `<p class="lugar-referencia"><i class="fas fa-map-pin"></i> <strong>Sitio en Panamá:</strong> ${especie.lugarPanama || especie.lugarReferencia}</p>`
        : '';

    // ========================================
    // CONSTRUCCIÓN DE LA TARJETA COMPLETA
    // ========================================
    card.innerHTML = `
        <!-- Imagen con badge flotante -->
        <div class="especie-image-wrap">
            <img
                src="${imagenUrl}"
                alt="Fotografía de ${especie.nombreComun}"
                class="especie-image"
                loading="lazy"
                onerror="this.src='https://placehold.co/900x320/0369a1/FFFFFF?text=${encodeURIComponent(especie.nombreComun)}'">
            <span class="badge-region-float">${regionTexto}</span>
        </div>

        <!-- Contenido principal -->
        <div class="especie-content">

            <!-- Header de la tarjeta -->
            <div class="especie-header">
                <div class="especie-tipo-tag">
                    ${emojiTipo[especie.tipo] || '🐠'}
                    ${tipoNombres[especie.tipo] || 'Especie Marina'}
                </div>
                <h2 class="especie-nombre">${especie.nombreComun}</h2>
                <p class="especie-cientifico"><em>${especie.nombreCientifico}</em></p>

                <div class="especie-badges">
                    <span class="badge-amenaza ${peligroConfig.clase}">
                        <span class="dot-amenaza"></span>
                        ${peligroConfig.etiqueta}
                        <span class="badge-codigo">${peligroConfig.codigo}</span>
                    </span>
                </div>
            </div>

            <!-- Barra visual de riesgo -->
            <div class="riesgo-barra-wrap">
                <div class="riesgo-label">
                    <span>Nivel de Riesgo</span>
                    <span class="${peligroConfig.textoClase}">${peligroConfig.etiqueta} — ${peligroConfig.mensaje}</span>
                </div>
                <div class="riesgo-barra">
                    <div class="riesgo-fill ${peligroConfig.barraClase}"></div>
                </div>
            </div>

            <!-- Secciones de información -->
            <div class="especie-secciones">

                <!-- Descripción -->
                <div class="especie-section descripcion-box">
                    <div class="section-title">
                        <i class="fas fa-book-open"></i>
                        Sobre esta especie
                    </div>
                    <p class="section-content">${especie.descripcion}</p>
                </div>

                <!-- Hábitat -->
                <div class="especie-section">
                    <div class="section-title">
                        <i class="fas fa-map-marker-alt"></i>
                        Dónde vive en Panamá
                    </div>
                    <p class="section-content">${especie.habitat}</p>
                    ${lugarHTML}
                </div>

                <!-- Amenazas -->
                <div class="especie-section">
                    <div class="section-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        Amenazas principales
                    </div>
                    <ul class="amenazas-list">${amenazasHTML}</ul>
                </div>

                <!-- Dato curioso -->
                <div class="especie-section">
                    <div class="dato-curioso-box">
                        <div class="dato-curioso-icono">💡</div>
                        <div class="dato-curioso-content">
                            <div class="dato-curioso-label">¿Sabías que...?</div>
                            <p class="dato-curioso-texto">${especie.datoCurioso}</p>
                        </div>
                    </div>
                </div>

                <!-- Estado UICN -->
                <div class="especie-section">
                    <div class="section-title">
                        <i class="fas fa-certificate"></i>
                        Estado de conservación (UICN)
                    </div>
                    <span class="uicn-chip ${peligroConfig.clase}">${especie.estadoUICN}</span>
                </div>

                <!-- SECCIÓN DE FUENTES -->
                ${especie.fuentes ? `
                <div class="especie-section fuentes-section">
                    <div class="section-title">
                        <i class="fas fa-bookmark"></i>
                        Fuentes de información
                    </div>
                    <div class="fuentes-container">
                        <p class="fuente-info">
                            <i class="fas fa-check-circle" style="color: #2E8BC0;"></i> 
                            <strong>Fuentes:</strong> ${especie.fuentes}
                        </p>
                    </div>
                </div>
                ` : ''}

            </div><!-- fin especie-secciones -->

        </div><!-- fin especie-content -->
    `;

    return card;
}

// ========================================
// FILTROS
// ========================================
function configurarFiltros() {
    document.getElementById('filter-region').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-tipo').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-amenaza').addEventListener('change', aplicarFiltros);
    document.getElementById('btn-limpiar-filtros').addEventListener('click', limpiarFiltros);
}

function aplicarFiltros() {
    console.log('=== APLICANDO FILTROS EN ESPECIES ===');
    
    const region   = document.getElementById('filter-region').value;
    const tipo     = document.getElementById('filter-tipo').value;
    const amenaza  = document.getElementById('filter-amenaza').value;
    
    console.log('Filtro región:', region);
    console.log('Filtro tipo:', tipo);
    console.log('Filtro amenaza:', amenaza);

    let visibles = 0;
    let conteoPorCategoria = { critico: 0, peligro: 0, vulnerable: 0, menor: 0 };

    document.querySelectorAll('.especie-card').forEach(card => {
        const especieRegion = card.dataset.region;
        const especieTipo = card.dataset.tipo;
        const especiePeligro = card.dataset.peligro;
        
        // Contar para depuración
        conteoPorCategoria[especiePeligro] = (conteoPorCategoria[especiePeligro] || 0) + 1;
        
        const cumpleRegion = region === 'todas' || especieRegion === region;
        const cumpleTipo = tipo === 'todas' || especieTipo === tipo;
        
        let cumpleAmenaza = false;
        
        if (amenaza === 'todas') {
            cumpleAmenaza = true;
        } else if (amenaza === 'critico') {
            cumpleAmenaza = (especiePeligro === 'critico' || especiePeligro === 'peligro');
        } else if (amenaza === 'vulnerable') {
            cumpleAmenaza = (especiePeligro === 'vulnerable');
        } else if (amenaza === 'menor') {
            cumpleAmenaza = (especiePeligro === 'menor');
        }

        if (cumpleRegion && cumpleTipo && cumpleAmenaza) {
            card.classList.remove('hidden');
            visibles++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    console.log('Conteo por categoría en tarjetas:', conteoPorCategoria);
    console.log('Tarjetas visibles:', visibles);

    actualizarContador(visibles);
}

function limpiarFiltros() {
    document.getElementById('filter-region').value  = 'todas';
    document.getElementById('filter-tipo').value    = 'todas';
    document.getElementById('filter-amenaza').value = 'todas';

    document.querySelectorAll('.especie-card').forEach(card => {
        card.classList.remove('hidden');
    });

    actualizarContador(especiesData.length);
}

function actualizarContador(cantidad) {
    document.getElementById('count-especies').textContent = cantidad;
}

// ========================================
// NAVEGACIÓN DIRECTA DESDE EL MAPA
// ========================================
function verificarNavegacionDirecta() {
    const urlParams = new URLSearchParams(window.location.search);
    const especieId = urlParams.get('id');

    if (!especieId) return;

    setTimeout(() => {
        const target = document.getElementById(`especie-${especieId}`);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight temporal
        target.style.outline = '3px solid var(--amarillo-acento)';
        target.style.outlineOffset = '4px';
        target.style.boxShadow = `0 0 0 6px rgba(245, 166, 35, 0.25), ${getComputedStyle(document.documentElement).getPropertyValue('--sombra-xl')}`;

        setTimeout(() => {
            target.style.outline = '';
            target.style.outlineOffset = '';
            target.style.boxShadow = '';
        }, 3000);
    }, 400);
}

// ========================================
// BOTÓN SCROLL TOP
// ========================================
function configurarScrollTop() {
    const btn = document.getElementById('btn-scroll-top');

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}