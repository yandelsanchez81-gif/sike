// ========================================
// MAPA INTERACTIVO DE ESPECIES MARINAS
// Panamá - Océano Pacífico y Mar Caribe
// VERSIÓN FINAL - CON ANIMACIÓN DE ONDA MEDIA
// ========================================

// Variables globales
let map;
let marcadores = [];

// Colores de marcadores según nivel de peligro
const coloresMarcadores = {
    critico: '#E63946',      // Rojo
    peligro: '#E63946',       // Rojo (mismo que crítico)
    vulnerable: '#F9C74F',    // Amarillo
    
    menor: '#2A9D8F'          // Verde (para consistencia)
};

// ========================================
// INICIALIZACIÓN DEL MAPA
// ========================================
function inicializarMapa() {
    
    // Crear el mapa centrado en Panamá
    map = L.map('map', {
        center: [8.5, -80.5],
        zoom: 8,
        minZoom: 7,
        maxZoom: 15,
        maxBounds: [
            [6.8, -83.2],
            [9.8, -77.2]
        ],
        maxBoundsViscosity: 0.8,
        bounceAtZoomLimits: true
    });
    
    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        opacity: 0.9
    }).addTo(map);
    
    // Cargar todas las especies
    cargarEspecies(especiesData);
    
    // Configurar filtros
    configurarFiltros();
    
    console.log('✅ Mapa inicializado correctamente');
    mostrarEstadisticas();
}

// ========================================
// CREAR MARCADOR CON ANIMACIÓN DE ONDA MEDIA
// ========================================
function crearIconoMarcador(nivelPeligro) {
    const color = coloresMarcadores[nivelPeligro] || '#2A9D8F';
    
    // Crear un contenedor con animación de onda (un poco más rápida y visible)
    const iconoHTML = `
        <div style="position: relative; width: 28px; height: 28px;">
            <!-- Onda expansiva (ajustada: más rápida y visible) -->
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background-color: ${color};
                opacity: 0.35;
                animation: ondaMedia 2s infinite ease-out;
            "></div>
            <!-- Centro del marcador -->
            <div style="
                position: absolute;
                top: 2px;
                left: 2px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: ${color};
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                z-index: 10;
            "></div>
        </div>
    `;
    
    return L.divIcon({
        html: iconoHTML,
        className: 'marcador-onda-media',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
    });
}

// ========================================
// CREAR CONTENIDO DEL POPUP
// ========================================
function crearPopupContent(especie) {
    // Determinar el texto del estado según nivel de peligro
    let estadoTexto = '';
    let colorFondo = '';
    
    if (especie.nivelPeligro === 'critico' || especie.nivelPeligro === 'peligro') {
        estadoTexto = '🔴 ' + (especie.nivelPeligro === 'critico' ? 'Peligro Crítico' : 'En Peligro');
        colorFondo = '#E63946';
    } else if (especie.nivelPeligro === 'vulnerable') {
        estadoTexto = '🟡 Vulnerable';
        colorFondo = '#F9C74F';
    } else {
        estadoTexto = '🟢 Preocupación Menor';
        colorFondo = '#2A9D8F';
    }
    
    return `
        <div class="popup-container">
            <div class="popup-imagen-placeholder" style="background: linear-gradient(135deg, ${colorFondo}, #3AAFA9); height: 140px; display: flex; align-items: center; justify-content: center; border-radius: 8px 8px 0 0;">
                <span style="font-size: 50px; color: white;">${especie.nombreComun.charAt(0)}</span>
            </div>
            <div class="popup-info" style="padding: 15px;">
                <h3 class="popup-title" style="margin: 0 0 5px; color: #0A2F4E;">${especie.nombreComun}</h3>
                <p class="popup-scientific-name" style="margin: 0 0 10px; font-style: italic; color: #666;">${especie.nombreCientifico}</p>
                <div style="background-color: ${colorFondo}; color: white; padding: 5px 12px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    ${estadoTexto}
                </div>
                <p style="margin: 8px 0; font-size: 0.95rem;"><strong>📍 ${especie.lugarPanama || 'Panamá'}</strong></p>
                <p style="margin: 8px 0; font-size: 0.9rem; color: #444;">${especie.habitat.substring(0, 80)}...</p>
                <a href="especies.html?id=${especie.id}" style="display: inline-block; width: 100%; padding: 12px; background: #0A2F4E; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; margin-top: 10px; border: 2px solid ${colorFondo}; box-sizing: border-box;">
                    📖 Ver más información
                </a>
            </div>
        </div>
    `;
}

// ========================================
// CARGAR ESPECIES EN EL MAPA
// ========================================
function cargarEspecies(especies) {
    // Limpiar marcadores existentes
    if (marcadores.length > 0) {
        marcadores.forEach(marker => map.removeLayer(marker));
    }
    marcadores = [];
    
    let contador = { rojos: 0, amarillos: 0, verdes: 0 };
    
    // Añadir marcador para cada especie
    especies.forEach(especie => {
        // Validar coordenadas
        if (!especie.coordenadas || especie.coordenadas.length !== 2) {
            console.warn(`⚠️ Coordenadas inválidas para ${especie.nombreComun}`);
            return;
        }
        
        const icono = crearIconoMarcador(especie.nivelPeligro);
        const marker = L.marker(especie.coordenadas, { icon: icono });
        
        // Añadir popup
        const popupContent = crearPopupContent(especie);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'popup-personalizado',
            autoPan: true,
            autoPanPadding: [60, 60],
            keepInView: true
        });
        
        // ===== CENTRADO INTELIGENTE SIN REBOTES =====
        marker.on('popupopen', function(e) {
            const latlng = e.target.getLatLng();
            const currentZoom = map.getZoom();
            
            // Calcular zoom ideal
            const targetZoom = currentZoom < 10 ? 10 : currentZoom;
            
            // Animar el movimiento suavemente
            map.flyTo(latlng, targetZoom, {
                animate: true,
                duration: 0.7,
                easeLinearity: 0.3
            });
        });
        // ============================================
        
        // Guardar datos
        marker.especieData = especie;
        
        // Contar por color
        if (especie.nivelPeligro === 'critico' || especie.nivelPeligro === 'peligro') contador.rojos++;
        else if (especie.nivelPeligro === 'vulnerable') contador.amarillos++;
        else contador.verdes++;
        
        marker.addTo(map);
        marcadores.push(marker);
    });
    
    console.log(`✅ Marcadores cargados: ${marcadores.length} total (🔴${contador.rojos} 🟡${contador.amarillos} 🟢${contador.verdes})`);
}

// ========================================
// SISTEMA DE FILTROS
// ========================================
function configurarFiltros() {
    const filtrosRegion = document.querySelectorAll('#filter-pacifico, #filter-caribe');
    const filtrosTipo = document.querySelectorAll('.tipo-filter');
    const filtrosPeligro = document.querySelectorAll('.peligro-filter');
    
    filtrosRegion.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    filtrosTipo.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    filtrosPeligro.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    
    document.getElementById('reset-filters').addEventListener('click', restablecerFiltros);
}

function aplicarFiltros() {
    console.log('=== APLICANDO FILTROS EN MAPA ===');
    
    const regionesMarcadas = [];
    if (document.getElementById('filter-pacifico')?.checked) regionesMarcadas.push('pacifico');
    if (document.getElementById('filter-caribe')?.checked) regionesMarcadas.push('caribe');
    console.log('Regiones:', regionesMarcadas);
    
    const tiposMarcados = Array.from(document.querySelectorAll('.tipo-filter:checked'))
        .map(cb => cb.value);
    console.log('Tipos:', tiposMarcados);
    
    const peligroCheckboxes = document.querySelectorAll('.peligro-filter:checked');
    const categoriasSeleccionadas = Array.from(peligroCheckboxes).map(cb => cb.value);
    console.log('Categorías peligro seleccionadas:', categoriasSeleccionadas);
    
    let especiesVisibles = 0;
    let conteoPorCategoria = { critico: 0, peligro: 0, vulnerable: 0, menor: 0 };
    
    marcadores.forEach(marker => {
        const especie = marker.especieData;
        
        const cumpleRegion = regionesMarcadas.length === 0 || regionesMarcadas.includes(especie.region);
        const cumpleTipo = tiposMarcados.length === 0 || tiposMarcados.includes(especie.tipo);
        
        let cumplePeligro = false;
        
        if (categoriasSeleccionadas.length === 0) {
            cumplePeligro = true;
        } else {
            categoriasSeleccionadas.forEach(categoria => {
                if (categoria === 'critico') {
                    if (especie.nivelPeligro === 'critico' || especie.nivelPeligro === 'peligro') {
                        cumplePeligro = true;
                    }
                } else if (categoria === 'vulnerable') {
                    if (especie.nivelPeligro === 'vulnerable') {
                        cumplePeligro = true;
                    }
                } else if (categoria === 'menor') {
                    if (especie.nivelPeligro === 'menor') {
                        cumplePeligro = true;
                    }
                }
            });
        }
        
        // Contar por categoría para depuración
        conteoPorCategoria[especie.nivelPeligro] = (conteoPorCategoria[especie.nivelPeligro] || 0) + 1;
        
        if (cumpleRegion && cumpleTipo && cumplePeligro) {
            if (!map.hasLayer(marker)) marker.addTo(map);
            especiesVisibles++;
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });
    
    console.log('Total especies en datos:', marcadores.length);
    console.log('Conteo por categoría:', conteoPorCategoria);
    console.log('Especies visibles:', especiesVisibles);
    
    actualizarContador(especiesVisibles);
}

function restablecerFiltros() {
    document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
    
    marcadores.forEach(marker => {
        if (!map.hasLayer(marker)) marker.addTo(map);
    });
    
    actualizarContador(especiesData.length);
}

function actualizarContador(cantidad) {
    const elemento = document.getElementById('especies-count');
    if (elemento) elemento.textContent = cantidad;
}

// ========================================
// ESTADÍSTICAS
// ========================================
function mostrarEstadisticas() {
    console.log('📊 Especies por categoría:');
    console.log('   🔴 Crítico/En Peligro:', especiesData.filter(e => e.nivelPeligro === 'critico' || e.nivelPeligro === 'peligro').length);
    console.log('   🟡 Vulnerable:', especiesData.filter(e => e.nivelPeligro === 'vulnerable').length);
    console.log('   🟢 Menor:', especiesData.filter(e => e.nivelPeligro === 'menor').length);
}

// ========================================
// INICIAR MAPA
// ========================================
document.addEventListener('DOMContentLoaded', inicializarMapa);