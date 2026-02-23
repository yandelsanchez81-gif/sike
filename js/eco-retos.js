// ========================================
// ECO-RETOS.JS - VERSIÓN OPTIMIZADA
// Sistema escalable con 30+ preguntas por nivel
// ========================================

class EcoRetos {
    constructor() {
        // Configuración
        this.PREGUNTAS_POR_PARTIDA = 10;
        this.TIEMPO_POR_PREGUNTA = 20;
        
        // Estado del juego
        this.nivelActual = null;
        this.preguntasPartida = [];
        this.indicePregunta = 0;
        this.puntaje = 0;
        this.timer = null;
        this.respuestaSeleccionada = false;
        
        // Elementos del DOM
        this.initElements();
    }

    // ========================================
    // INICIALIZACIÓN DE ELEMENTOS
    // ========================================
    initElements() {
        this.levelSelection = document.getElementById('level-selection');
        this.quizBox = document.getElementById('quiz-box');
        this.resultBox = document.getElementById('result-box');
        
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.getElementById('options');
        this.feedbackEl = document.getElementById('feedback');
        this.feedbackMessage = document.getElementById('feedback-message');
        
        this.currentQuestionEl = document.getElementById('current-question');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.currentScoreEl = document.getElementById('current-score');
        this.timerEl = document.getElementById('timer');
        this.progressBar = document.getElementById('progress-bar');
        
        this.finalScoreEl = document.getElementById('final-score');
        this.correctAnswersEl = document.getElementById('correct-answers');
        this.badgeContainer = document.getElementById('badge-container');
    }

    // ========================================
    // INICIO DEL JUEGO
    // ========================================
    startQuiz(nivel) {
        this.nivelActual = nivel;
        this.indicePregunta = 0;
        this.puntaje = 0;
        this.respuestaSeleccionada = false;
        
        // 1. Seleccionar preguntas aleatorias SIN repetición
        this.preguntasPartida = this.seleccionarPreguntasAleatorias(
            nivel, 
            this.PREGUNTAS_POR_PARTIDA
        );
        
        // 2. Verificar que hay preguntas suficientes
        if (this.preguntasPartida.length === 0) {
            console.error('No hay suficientes preguntas para este nivel');
            return;
        }
        
        // 3. Actualizar UI
        this.levelSelection.classList.add('hidden');
        this.quizBox.classList.remove('hidden');
        this.resultBox.classList.add('hidden');
        
        this.totalQuestionsEl.textContent = this.PREGUNTAS_POR_PARTIDA;
        this.currentScoreEl.textContent = '0';
        
        // 4. Cargar primera pregunta
        this.cargarPregunta();
    }

    // ========================================
    // SELECCIÓN DE PREGUNTAS ALEATORIAS (SIN REPETICIÓN)
    // ========================================
    seleccionarPreguntasAleatorias(nivel, cantidad) {
        // Validar que el nivel existe
        if (!preguntasBanco[nivel] || preguntasBanco[nivel].length === 0) {
            console.error(`Nivel ${nivel} no encontrado o vacío`);
            return [];
        }
        
        const bancoNivel = preguntasBanco[nivel];
        
        // Si pedimos más preguntas de las disponibles, tomar todas
        const maxPreguntas = Math.min(cantidad, bancoNivel.length);
        
        // 1. Crear array de índices [0, 1, 2, 3, ...]
        const indicesDisponibles = Array.from(
            { length: bancoNivel.length }, 
            (_, i) => i
        );
        
        // 2. Algoritmo Fisher-Yates para mezclar índices
        for (let i = indicesDisponibles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indicesDisponibles[i], indicesDisponibles[j]] = 
            [indicesDisponibles[j], indicesDisponibles[i]];
        }
        
        // 3. Tomar los primeros 'maxPreguntas' índices
        const indicesSeleccionados = indicesDisponibles.slice(0, maxPreguntas);
        
        // 4. Crear copias profundas de las preguntas seleccionadas
        //    (para no modificar el banco original)
        return indicesSeleccionados.map(index => 
            this.clonarPregunta(bancoNivel[index])
        );
    }
    
    // ========================================
    // CLONAR PREGUNTA (para manipular sin afectar el original)
    // ========================================
    clonarPregunta(pregunta) {
        return {
            q: pregunta.q,
            options: pregunta.options.map(op => ({
                text: op.text,
                correct: op.correct
            }))
        };
    }

    // ========================================
    // CARGAR PREGUNTA ACTUAL
    // ========================================
    cargarPregunta() {
        // Verificar si terminaron las preguntas
        if (this.indicePregunta >= this.preguntasPartida.length) {
            this.mostrarResultados();
            return;
        }

        this.respuestaSeleccionada = false;
        const pregunta = this.preguntasPartida[this.indicePregunta];
        
        // Actualizar contador
        this.currentQuestionEl.textContent = this.indicePregunta + 1;
        
        // Actualizar barra de progreso
        const progreso = (this.indicePregunta / this.PREGUNTAS_POR_PARTIDA) * 100;
        this.progressBar.style.width = `${progreso}%`;
        
        // Mostrar pregunta
        this.questionEl.textContent = pregunta.q;
        
        // Mezclar opciones ANTES de renderizar
        const opcionesMezcladas = this.mezclarArray(pregunta.options);
        
        // Renderizar opciones
        this.renderizarOpciones(opcionesMezcladas);
        
        // Ocultar feedback
        this.feedbackEl.classList.add('hidden');
        
        // Iniciar temporizador
        this.iniciarTemporizador();
    }

    // ========================================
    // RENDERIZAR OPCIONES
    // ========================================
    renderizarOpciones(opciones) {
        this.optionsEl.innerHTML = '';
        
        const letras = ['A', 'B', 'C', 'D'];
        
        opciones.forEach((opcion, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span class="option-prefix">${letras[index]}</span>
                <span class="option-text">${opcion.text}</span>
            `;
            
            btn.dataset.correct = opcion.correct;
            btn.addEventListener('click', () => this.verificarRespuesta(btn));
            
            this.optionsEl.appendChild(btn);
        });
    }

    // ========================================
    // VERIFICAR RESPUESTA
    // ========================================
    verificarRespuesta(btnSeleccionado) {
        if (this.respuestaSeleccionada) return;
        
        this.respuestaSeleccionada = true;
        this.detenerTemporizador();
        
        const esCorrecta = btnSeleccionado.dataset.correct === 'true';
        
        // Deshabilitar todos los botones y marcar correcto/incorrecto
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
            
            if (btn === btnSeleccionado && !esCorrecta) {
                btn.classList.add('incorrect');
            }
        });
        
        // Actualizar puntaje si es correcto
        if (esCorrecta) {
            btnSeleccionado.classList.add('correct');
            this.puntaje += 10;
            this.currentScoreEl.textContent = this.puntaje;
            this.mostrarFeedback('✅ ¡Correcto! Muy bien sabido.', 'success');
        } else {
            this.mostrarFeedback('❌ Incorrecto. Sigue practicando.', 'error');
        }
        
        // Pasar a siguiente pregunta
        setTimeout(() => this.siguientePregunta(), 1500);
    }

    // ========================================
    // SIGUIENTE PREGUNTA
    // ========================================
    siguientePregunta() {
        this.indicePregunta++;
        this.cargarPregunta();
    }

    // ========================================
    // TEMPORIZADOR
    // ========================================
    iniciarTemporizador() {
        let tiempoRestante = this.TIEMPO_POR_PREGUNTA;
        this.timerEl.textContent = tiempoRestante;
        this.timerEl.style.color = 'white';
        
        this.timer = setInterval(() => {
            tiempoRestante--;
            this.timerEl.textContent = tiempoRestante;
            
            // Alerta visual cuando queda poco tiempo
            this.timerEl.style.color = tiempoRestante <= 5 ? '#e74c3c' : 'white';
            
            if (tiempoRestante <= 0) {
                this.detenerTemporizador();
                
                if (!this.respuestaSeleccionada) {
                    this.respuestaSeleccionada = true;
                    
                    // Mostrar respuesta correcta
                    document.querySelectorAll('.option-btn').forEach(btn => {
                        btn.disabled = true;
                        if (btn.dataset.correct === 'true') {
                            btn.classList.add('correct');
                        }
                    });
                    
                    this.mostrarFeedback('⏰ ¡Tiempo agotado!', 'error');
                    setTimeout(() => this.siguientePregunta(), 1500);
                }
            }
        }, 1000);
    }

    detenerTemporizador() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // ========================================
    // FEEDBACK
    // ========================================
    mostrarFeedback(mensaje, tipo) {
        this.feedbackMessage.textContent = mensaje;
        this.feedbackEl.classList.remove('hidden', 'success', 'error');
        this.feedbackEl.classList.add(tipo);
    }

    // ========================================
    // RESULTADOS E INSIGNIAS
    // ========================================
    mostrarResultados() {
        this.quizBox.classList.add('hidden');
        this.resultBox.classList.remove('hidden');
        
        this.finalScoreEl.textContent = this.puntaje;
        
        const respuestasCorrectas = this.puntaje / 10;
        this.correctAnswersEl.textContent = `${respuestasCorrectas}/${this.PREGUNTAS_POR_PARTIDA}`;
        
        this.generarInsignia(respuestasCorrectas);
    }

    generarInsignia(respuestasCorrectas) {
        let badgeClass, badgeIcon, badgeTitle, badgeDescription;
        
        if (respuestasCorrectas >= 9) {
            badgeClass = 'maestro';
            badgeIcon = '👑';
            badgeTitle = '¡Maestro del Mar!';
            badgeDescription = 'Eres un verdadero experto en especies marinas.';
        } else if (respuestasCorrectas >= 7) {
            badgeClass = 'protector';
            badgeIcon = '🛡️';
            badgeTitle = 'Protector del Océano';
            badgeDescription = 'Tienes un gran conocimiento, ¡sigue así!';
        } else {
            badgeClass = 'junior';
            badgeIcon = '🌱';
            badgeTitle = 'Guardián Junior';
            badgeDescription = 'Sigue aprendiendo en la página de Especies.';
        }
        
        this.badgeContainer.className = `badge-container ${badgeClass}`;
        this.badgeContainer.innerHTML = `
            <span class="badge-icon">${badgeIcon}</span>
            <div class="badge-title">${badgeTitle}</div>
            <div class="badge-description">${badgeDescription}</div>
        `;
    }

    // ========================================
    // UTILIDAD: MEZCLAR ARRAY (FISHER-YATES)
    // ========================================
    mezclarArray(array) {
        const copia = [...array];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }
}

// ========================================
// BANCO DE PREGUNTAS (FÁCILMENTE ESCALABLE)
// ========================================
const preguntasBanco = {
    facil: [
        {
            q: "¿Cuál es el pez más grande del mundo que habita en el Pacífico panameño?",
            options: [
                { text: "Tiburón Martillo", correct: false },
                { text: "Tiburón Ballena", correct: true },
                { text: "Mero del Pacífico", correct: false },
                { text: "Tiburón Sedoso", correct: false }
            ]
        },
        {
            q: "¿Qué animal marino puede vivir más de 50 años y regresa a la misma playa donde nació para anidar?",
            options: [
                { text: "Delfín Manchado", correct: false },
                { text: "Tortuga Marina", correct: true },
                { text: "Raya Manta Gigante", correct: false },
                { text: "Manatí Antillano", correct: false }
            ]
        },
        {
            q: "¿Cuál es la única tortuga marina que es herbívora en su etapa adulta?",
            options: [
                { text: "Tortuga Lora", correct: false },
                { text: "Tortuga Carey", correct: false },
                { text: "Tortuga Verde", correct: true },
                { text: "Tortuga Baula", correct: false }
            ]
        },
        {
            q: "¿Qué característica física le da nombre al Tiburón Sedoso?",
            options: [
                { text: "El color de sus ojos", correct: false },
                { text: "La textura suave de su piel", correct: true },
                { text: "La forma de sus aletas", correct: false },
                { text: "Su nado lento", correct: false }
            ]
        },
        {
            q: "¿Cómo se llama el fenómeno donde miles de tortugas lora anidan simultáneamente?",
            options: [
                { text: "Migración", correct: false },
                { text: "Arribada", correct: true },
                { text: "Cardumen", correct: false },
                { text: "Desove lunar", correct: false }
            ]
        },
        {
            q: "¿Qué animal es considerado el 'arquitecto' de los arrecifes por crear estructuras que rompen la energía del oleaje?",
            options: [
                { text: "Coral Cuerno de Ciervo", correct: false },
                { text: "Coral Cuerno de Alce", correct: true },
                { text: "Coral Siderastrea", correct: false },
                { text: "Coral de Montaña", correct: false }
            ]
        },
        {
            q: "¿Qué mamífero marino es pariente lejano de los elefantes?",
            options: [
                { text: "Ballena de Bryde", correct: false },
                { text: "Delfín Costero", correct: false },
                { text: "Manatí Antillano", correct: true },
                { text: "Cachalote", correct: false }
            ]
        },
        {
            q: "¿Cuál es el pez que posee el cerebro más grande en relación a su tamaño corporal?",
            options: [
                { text: "Tiburón Ballena", correct: false },
                { text: "Manta Gigante", correct: true },
                { text: "Mero Guasa", correct: false },
                { text: "Pez Sierra", correct: false }
            ]
        },
        {
            q: "¿Qué ballena es la única que reside en Panamá durante todo el año?",
            options: [
                { text: "Ballena Jorobada", correct: false },
                { text: "Ballena de Bryde", correct: true },
                { text: "Cachalote", correct: false },
                { text: "Ballena Azul", correct: false }
            ]
        },
        {
            q: "¿Cuál es el sonido más potente producido por cualquier animal marino?",
            options: [
                { text: "El canto de la ballena jorobada", correct: false },
                { text: "Los clicks de ecolocalización del cachalote", correct: true },
                { text: "El golpe de la sierra del pez sierra", correct: false },
                { text: "El salto de la raya águila", correct: false }
            ]
        },
        {
            q: "¿Qué animal es apodado el 'camello' de los corales por su alta resistencia?",
            options: [
                { text: "Coral de Montaña", correct: false },
                { text: "Coral Cuerno de Alce", correct: false },
                { text: "Coral Siderastrea", correct: true },
                { text: "Coral Cuerno de Ciervo", correct: false }
            ]
        },
        {
            q: "¿Cuántos grados de visión proporciona la cabeza del Tiburón Martillo?",
            options: [
                { text: "180 grados", correct: false },
                { text: "90 grados", correct: false },
                { text: "360 grados", correct: true },
                { text: "250 grados", correct: false }
            ]
        },
        {
            q: "¿De qué se alimenta exclusivamente la Tortuga Baula?",
            options: [
                { text: "Pastos marinos", correct: false },
                { text: "Medusas", correct: true },
                { text: "Esponjas tóxicas", correct: false },
                { text: "Calamares gigantes", correct: false }
            ]
        },
        {
            q: "¿Qué tortuga es la más pequeña del mundo?",
            options: [
                { text: "Tortuga Carey", correct: false },
                { text: "Tortuga Lora", correct: true },
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Caguama", correct: false }
            ]
        },
        {
            q: "¿Qué especie de raya puede saltar hasta 2 metros fuera del agua?",
            options: [
                { text: "Manta Gigante", correct: false },
                { text: "Raya Águila", correct: true },
                { text: "Raya Látigo", correct: false },
                { text: "Pez Sierra", correct: false }
            ]
        },
        {
            q: "¿Qué animal marino tiene un patrón de puntos blancos único, similar a una huella digital?",
            options: [
                { text: "Raya Águila", correct: false },
                { text: "Tiburón Sedoso", correct: false },
                { text: "Tiburón Ballena", correct: true },
                { text: "Delfín Manchado", correct: false }
            ]
        },
        {
            q: "¿Qué sucede si una Manta Gigante deja de nadar?",
            options: [
                { text: "Se hunde al fondo", correct: false },
                { text: "Se asfixia y muere", correct: true },
                { text: "Entra en estado de hibernación", correct: false },
                { text: "Cambia de color", correct: false }
            ]
        },
        {
            q: "¿Cuál es el molusco más icónico del Caribe panameño?",
            options: [
                { text: "Pulpo de arrecife", correct: false },
                { text: "Caracol Reina (Cambute)", correct: true },
                { text: "Calamar gigante", correct: false },
                { text: "Mejillón", correct: false }
            ]
        },
        {
            q: "¿Qué animal nace sin manchas y las desarrolla con la edad?",
            options: [
                { text: "Tiburón Ballena", correct: false },
                { text: "Delfín Manchado Pantropical", correct: true },
                { text: "Raya Águila", correct: false },
                { text: "Tiburón Sedoso", correct: false }
            ]
        },
        {
            q: "¿Qué parte del Cachalote le ayuda a controlar su flotabilidad?",
            options: [
                { text: "Sus aletas pectorales", correct: false },
                { text: "El órgano de espermaceti", correct: true },
                { text: "Su cola masiva", correct: false },
                { text: "Sus pulmones", correct: false }
            ]
        },
        {
            q: "¿Qué animal marino es el depredador con dientes más grande del planeta?",
            options: [
                { text: "Tiburón Blanco", correct: false },
                { text: "Orca", correct: false },
                { text: "Cachalote", correct: true },
                { text: "Tiburón Tigre", correct: false }
            ]
        },
        {
            q: "¿Cuál es el alimento principal del Manatí Antillano?",
            options: [
                { text: "Peces pequeños", correct: false },
                { text: "Vegetación acuática", correct: true },
                { text: "Plancton", correct: false },
                { text: "Medusas", correct: false }
            ]
        },
        {
            q: "¿Qué animal es capaz de comer esponjas tóxicas en el arrecife?",
            options: [
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Carey", correct: true },
                { text: "Caracol Reina", correct: false },
                { text: "Manatí", correct: false }
            ]
        },
        {
            q: "¿Por qué se llama 'Tortuga Verde' a esta especie?",
            options: [
                { text: "Por el color de su caparazón", correct: false },
                { text: "Por las algas que crecen sobre ella", correct: false },
                { text: "Por el color de su grasa", correct: true },
                { text: "Por su hábitat en aguas verdes", correct: false }
            ]
        },
        {
            q: "¿Qué animal utiliza su 'sierra' para detectar campos eléctricos?",
            options: [
                { text: "Tiburón Martillo", correct: false },
                { text: "Pez Sierra", correct: true },
                { text: "Delfín Costero", correct: false },
                { text: "Raya Manta", correct: false }
            ]
        },
        {
            q: "¿Cuántas crestas paralelas tiene la Ballena de Bryde en su hocico?",
            options: [
                { text: "Una", correct: false },
                { text: "Dos", correct: false },
                { text: "Tres", correct: true },
                { text: "Ninguna", correct: false }
            ]
        },
        {
            q: "¿Cómo nacen los bebés del Pez Sierra para no lastimar a su madre?",
            options: [
                { text: "Nacen de huevos externos", correct: false },
                { text: "Con una vaina protectora en la sierra", correct: true },
                { text: "Sin dientes en la sierra", correct: false },
                { text: "Por la cola primero", correct: false }
            ]
        },
        {
            q: "¿Qué animal puede sumergirse a más de 2,000 metros de profundidad?",
            options: [
                { text: "Tiburón Ballena", correct: false },
                { text: "Tortuga Baula", correct: false },
                { text: "Cachalote", correct: true },
                { text: "Manta Gigante", correct: false }
            ]
        },
        {
            q: "¿Qué animal es hermafrodita protógeno (nace hembra y cambia a macho)?",
            options: [
                { text: "Tiburón Martillo", correct: false },
                { text: "Mero del Pacífico", correct: true },
                { text: "Delfín Manchado", correct: false },
                { text: "Raya Águila", correct: false }
            ]
        },
        {
            q: "¿Cuál es el tiburón más dócil y común en los manglares del Caribe?",
            options: [
                { text: "Tiburón Martillo", correct: false },
                { text: "Tiburón Nodriza", correct: true },
                { text: "Tiburón Sedoso", correct: false },
                { text: "Tiburón de Arrecife", correct: false }
            ]
        }
    ],

    // NIVEL MEDIO - Páginas 6-10 del PDF
    // Preguntas 1-30: Hábitats, amenazas y sitios específicos
    medio: [
        {
            q: "¿En qué parque nacional de Panamá se encuentra una de las últimas agregaciones importantes de Tiburón Martillo?",
            options: [
                { text: "Parque Nacional Darién", correct: false },
                { text: "Parque Nacional Coiba", correct: true },
                { text: "Parque Nacional Marino Isla Bastimentos", correct: false },
                { text: "Parque Nacional Soberanía", correct: false }
            ]
        },
        {
            q: "¿Cuál es el estado de conservación de la Tortuga Carey según la UICN?",
            options: [
                { text: "Vulnerable", correct: false },
                { text: "En Peligro", correct: false },
                { text: "En Peligro Crítico", correct: true },
                { text: "Preocupación Menor", correct: false }
            ]
        },
        {
            q: "¿Dónde se encuentra la población de Manatí Antillano más importante de Centroamérica en Panamá?",
            options: [
                { text: "Bahía de Panamá", correct: false },
                { text: "Humedal San San Pond Sak", correct: true },
                { text: "Archipiélago de las Perlas", correct: false },
                { text: "Golfo de Chiriquí", correct: false }
            ]
        },
        {
            q: "¿Qué amenaza afecta principalmente al Tiburón Ballena en el Banco Hannibal?",
            options: [
                { text: "La caza por su carne", correct: false },
                { text: "Colisiones con embarcaciones", correct: true },
                { text: "El saqueo de nidos", correct: false },
                { text: "La pérdida de manglares", correct: false }
            ]
        },
        {
            q: "¿Qué especie de coral ha perdido más del 90% de su población debido a enfermedades y blanqueamiento?",
            options: [
                { text: "Coral de Montaña", correct: false },
                { text: "Coral Cuerno de Alce", correct: true },
                { text: "Coral Siderastrea", correct: false },
                { text: "Coral Porites", correct: false }
            ]
        },
        {
            q: "¿Qué fenómeno dificulta la reproducción del Caracol Reina cuando hay pocos individuos?",
            options: [
                { text: "Selección natural", correct: false },
                { text: "Efecto Allee", correct: true },
                { text: "Deriva genética", correct: false },
                { text: "Mutación poblacional", correct: false }
            ]
        },
        {
            q: "¿Cuál es el sitio principal de anidación masiva de la Tortuga Lora en Panamá?",
            options: [
                { text: "Isla Jicarón", correct: false },
                { text: "Playa La Marinera, Tonosí", correct: true },
                { text: "Punta Chame", correct: false },
                { text: "Cayo Zapatilla", correct: false }
            ]
        },
        {
            q: "¿Qué tecnología usan los científicos para detectar al Pez Sierra sin verlo?",
            options: [
                { text: "Sonares de alta potencia", correct: false },
                { text: "ADN ambiental", correct: true },
                { text: "Cámaras infrarrojas", correct: false },
                { text: "Marcaje satelital", correct: false }
            ]
        },
        {
            q: "¿Cuál es la profundidad máxima a la que se puede sumergir la Tortuga Baula?",
            options: [
                { text: "500 metros", correct: false },
                { text: "2,000 metros", correct: false },
                { text: "Más de 1,200 metros", correct: true },
                { text: "100 metros", correct: false }
            ]
        },
        {
            q: "¿Cuál es la principal amenaza del Caracol Reina (Cambute)?",
            options: [
                { text: "Sobreexplotación histórica", correct: true },
                { text: "Ataques de perros", correct: false },
                { text: "Contaminación acústica", correct: false },
                { text: "Colisiones con buques", correct: false }
            ]
        },
        {
            q: "¿Qué especie de ballena migra desde la Antártida hasta Panamá para reproducirse?",
            options: [
                { text: "Ballena de Bryde", correct: false },
                { text: "Ballena Jorobada (del sur)", correct: true },
                { text: "Cachalote", correct: false },
                { text: "Orca", correct: false }
            ]
        },
        {
            q: "¿En qué zona de Panamá los juveniles de Tiburón Martillo crecen protegidos?",
            options: [
                { text: "Bajo Mono", correct: false },
                { text: "Punta Chame", correct: true },
                { text: "Isla Montuosa", correct: false },
                { text: "Bahía Almirante", correct: false }
            ]
        },
        {
            q: "¿Cuál es el estado de conservación del Mero del Pacífico?",
            options: [
                { text: "En Peligro Crítico", correct: false },
                { text: "Vulnerable", correct: true },
                { text: "Preocupación Menor", correct: false },
                { text: "Extinto en la naturaleza", correct: false }
            ]
        },
        {
            q: "¿Dónde residen los juveniles del Mero Guasa durante sus primeros años?",
            options: [
                { text: "En arrecifes profundos", correct: false },
                { text: "En manglares", correct: true },
                { text: "En el mar abierto", correct: false },
                { text: "En cuevas de naufragios", correct: false }
            ]
        },
        {
            q: "¿Qué tipo de tortuga anida en Playa Soropta, Bocas del Toro?",
            options: [
                { text: "Tortuga Carey", correct: false },
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Baula", correct: true },
                { text: "Tortuga Lora", correct: false }
            ]
        },
        {
            q: "¿Qué animal es capturado frecuentemente por error en las redes atuneras de cerco?",
            options: [
                { text: "Cachalote", correct: false },
                { text: "Tiburón Sedoso", correct: true },
                { text: "Manatí", correct: false },
                { text: "Mero Guasa", correct: false }
            ]
        },
        {
            q: "¿Qué capacidad sensorial especial tiene el Delfín Costero?",
            options: [
                { text: "Visión térmica", correct: false },
                { text: "Electrorrecepción", correct: true },
                { text: "Olfato bajo el agua", correct: false },
                { text: "Súper oído", correct: false }
            ]
        },
        {
            q: "¿Cuál es el sitio de anidación más importante de Centroamérica para la Tortuga Baula?",
            options: [
                { text: "Punta Chame", correct: false },
                { text: "Playa Soropta", correct: true },
                { text: "Cayo Zapatilla", correct: false },
                { text: "Isla Bastimentos", correct: false }
            ]
        },
        {
            q: "¿Qué coral es fundamental para los arrecifes profundos de 5 a 30 metros?",
            options: [
                { text: "Coral Cuerno de Ciervo", correct: false },
                { text: "Coral de Montaña", correct: true },
                { text: "Coral Siderastrea", correct: false },
                { text: "Coral Cuerno de Alce", correct: false }
            ]
        },
        {
            q: "¿A qué distancia mínima prohíbe la ley panameña acercarse a una ballena jorobada?",
            options: [
                { text: "100 metros", correct: false },
                { text: "500 metros", correct: false },
                { text: "250 metros", correct: true },
                { text: "50 metros", correct: false }
            ]
        },
        {
            q: "¿Qué animal marino sufre por la ingesta de bolsas plásticas al confundirlas con medusas?",
            options: [
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Baula", correct: true },
                { text: "Tiburón Ballena", correct: false },
                { text: "Delfín Manchado", correct: false }
            ]
        },
        {
            q: "¿En qué lugar de Panamá vive el Delfín Costero?",
            options: [
                { text: "Golfo de Chiriquí", correct: false },
                { text: "Bahía Almirante, Bocas del Toro", correct: true },
                { text: "Parque Nacional Coiba", correct: false },
                { text: "Darién", correct: false }
            ]
        },
        {
            q: "¿Cuál es la principal amenaza para el coral Cuerno de Ciervo?",
            options: [
                { text: "Pesca de arrastre", correct: false },
                { text: "Enfermedad de la banda blanca", correct: true },
                { text: "Ataques de tiburones", correct: false },
                { text: "Caza de coleccionistas", correct: false }
            ]
        },
        {
            q: "¿Cuál es el estado UICN de la Raya Águila desde 2020?",
            options: [
                { text: "Vulnerable", correct: false },
                { text: "En Peligro", correct: true },
                { text: "Peligro Crítico", correct: false },
                { text: "Preocupación Menor", correct: false }
            ]
        },
        {
            q: "¿Qué especie de tiburón es el 'guardián' de los arrecifes del Caribe?",
            options: [
                { text: "Tiburón Nodriza", correct: false },
                { text: "Tiburón Martillo", correct: false },
                { text: "Tiburón Arrecifal del Caribe", correct: true },
                { text: "Tiburón Ballena", correct: false }
            ]
        },
        {
            q: "¿Qué animal vive en naufragios y cuevas arrecifales como en Pondsock?",
            options: [
                { text: "Tiburón Martillo", correct: false },
                { text: "Mero Guasa", correct: true },
                { text: "Delfín Manchado", correct: false },
                { text: "Raya Manta", correct: false }
            ]
        },
        {
            q: "¿Dónde vive el pez sierra común en Panamá?",
            options: [
                { text: "Arrecifes de Bocas del Toro", correct: false },
                { text: "Estuarios y ríos del Darién", correct: true },
                { text: "Archipiélago de las Perlas", correct: false },
                { text: "Punta Chame", correct: false }
            ]
        },
        {
            q: "¿Qué animal sufre por el 'aleteo' (finning) en el Pacífico?",
            options: [
                { text: "Tortuga Carey", correct: false },
                { text: "Tiburones (como el Martillo y Sedoso)", correct: true },
                { text: "Ballena Jorobada", correct: false },
                { text: "Manatí", correct: false }
            ]
        },
        {
            q: "¿Qué coral tolera aguas turbias y alta sedimentación?",
            options: [
                { text: "Coral Cuerno de Alce", correct: false },
                { text: "Coral de Montaña", correct: false },
                { text: "Coral Siderastrea", correct: true },
                { text: "Coral Cuerno de Ciervo", correct: false }
            ]
        },
        {
            q: "¿Qué ballena se conoce en Panamá como 'ballena sardinera'?",
            options: [
                { text: "Ballena Jorobada", correct: false },
                { text: "Ballena de Bryde", correct: true },
                { text: "Cachalote", correct: false },
                { text: "Ballena Azul", correct: false }
            ]
        }
    ],

    // NIVEL DIFÍCIL - Páginas 11-16 del PDF
    // Preguntas 1-30: Nombres científicos y datos avanzados
    dificil: [
        {
            q: "¿Cuál es el nombre científico del Tiburón Martillo?",
            options: [
                { text: "Rhincodon typus", correct: false },
                { text: "Carcharhinus falciformis", correct: false },
                { text: "Sphyrna lewini", correct: true },
                { text: "Pristis pristis", correct: false }
            ]
        },
        {
            q: "El nombre científico de la Raya Manta Gigante es:",
            options: [
                { text: "Aetobatus narinari", correct: false },
                { text: "Mobula birostris", correct: true },
                { text: "Manta birostris", correct: true }, // Ambas son aceptadas
                { text: "Dasyatis americana", correct: false }
            ]
        },
        {
            q: "El nombre científico Eretmochelys imbricata corresponde a:",
            options: [
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Baula", correct: false },
                { text: "Tortuga Carey", correct: true },
                { text: "Tortuga Lora", correct: false }
            ]
        },
        {
            q: "¿A qué especie pertenece el nombre Trichechus manatus manatus?",
            options: [
                { text: "Delfín Costero", correct: false },
                { text: "Cachalote", correct: false },
                { text: "Manatí Antillano", correct: true },
                { text: "Ballena de Bryde", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Coral Cuerno de Alce?",
            options: [
                { text: "Acropora cervicornis", correct: false },
                { text: "Acropora palmata", correct: true },
                { text: "Orbicella faveolata", correct: false },
                { text: "Siderastrea siderea", correct: false }
            ]
        },
        {
            q: "El nombre del Caracol Reina o Cambute científicamente es:",
            options: [
                { text: "Aliger gigas (Strombus gigas)", correct: true },
                { text: "Isostichopus badionotus", correct: false },
                { text: "Pristis pectinata", correct: false },
                { text: "Panulirus argus", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Cachalote?",
            options: [
                { text: "Megaptera novaeangliae", correct: false },
                { text: "Balaenoptera edeni", correct: false },
                { text: "Physeter macrocephalus", correct: true },
                { text: "Stenella attenuata", correct: false }
            ]
        },
        {
            q: "¿Qué animal científico es Lepidochelys olivacea?",
            options: [
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Lora", correct: true },
                { text: "Tortuga Baula", correct: false },
                { text: "Tortuga Carey", correct: false }
            ]
        },
        {
            q: "El coral Cuerno de Ciervo se identifica científicamente como:",
            options: [
                { text: "Acropora palmata", correct: false },
                { text: "Acropora cervicornis", correct: true },
                { text: "Pocillopora damicornis", correct: false },
                { text: "Siderastrea siderea", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Mero Guasa?",
            options: [
                { text: "Epinephelus quinquefasciatus", correct: false },
                { text: "Epinephelus itajara", correct: true },
                { text: "Epinephelus striatus", correct: false },
                { text: "Lutjanus cyanopterus", correct: false }
            ]
        },
        {
            q: "¿Qué especie científica es Dermochelys coriacea?",
            options: [
                { text: "Tortuga Carey", correct: false },
                { text: "Tortuga Baula", correct: true },
                { text: "Tortuga Verde", correct: false },
                { text: "Tortuga Lora", correct: false }
            ]
        },
        {
            q: "El nombre científico del Delfín Manchado Pantropical es:",
            options: [
                { text: "Tursiops truncatus", correct: false },
                { text: "Stenella attenuata", correct: true },
                { text: "Sotalia guianensis", correct: false },
                { text: "Physeter macrocephalus", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Tiburón Ballena?",
            options: [
                { text: "Galeocerdo cuvier", correct: false },
                { text: "Rhincodon typus", correct: true },
                { text: "Carcharodon carcharias", correct: false },
                { text: "Sphyrna lewini", correct: false }
            ]
        },
        {
            q: "¿A qué animal corresponde Pristis pristis?",
            options: [
                { text: "Pez Sierra de Dientes Pequeños", correct: false },
                { text: "Pez Sierra Común", correct: true },
                { text: "Tiburón Martillo", correct: false },
                { text: "Raya Águila", correct: false }
            ]
        },
        {
            q: "¿Qué coral tiene el nombre científico Orbicella faveolata?",
            options: [
                { text: "Coral Siderastrea", correct: false },
                { text: "Coral Cuerno de Alce", correct: false },
                { text: "Coral de Montaña", correct: true },
                { text: "Coral de Fuego", correct: false }
            ]
        },
        {
            q: "El nombre científico Megaptera novaeangliae pertenece a:",
            options: [
                { text: "Ballena de Bryde", correct: false },
                { text: "Ballena Jorobada", correct: true },
                { text: "Cachalote", correct: false },
                { text: "Orca", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Delfín Costero?",
            options: [
                { text: "Stenella attenuata", correct: false },
                { text: "Sotalia guianensis", correct: true },
                { text: "Tursiops truncatus", correct: false },
                { text: "Delphinus delphis", correct: false }
            ]
        },
        {
            q: "¿Qué especie científica es el Tiburón Sedoso?",
            options: [
                { text: "Carcharhinus perezi", correct: false },
                { text: "Carcharhinus falciformis", correct: true },
                { text: "Carcharhinus leucas", correct: false },
                { text: "Ginglymostoma cirratum", correct: false }
            ]
        },
        {
            q: "El nombre científico de la Tortuga Verde es:",
            options: [
                { text: "Caretta caretta", correct: false },
                { text: "Chelonia mydas", correct: true },
                { text: "Eretmochelys imbricata", correct: false },
                { text: "Lepidochelys kempii", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico de la Raya Águila?",
            options: [
                { text: "Mobula birostris", correct: false },
                { text: "Aetobatus narinari", correct: true },
                { text: "Himantura pacifica", correct: false },
                { text: "Dasyatis americana", correct: false }
            ]
        },
        {
            q: "¿Qué especie científica es Pristis pectinata?",
            options: [
                { text: "Pez Sierra Común", correct: false },
                { text: "Pez Sierra de Dientes Pequeños", correct: true },
                { text: "Raya Manta", correct: false },
                { text: "Tiburón Sierra", correct: false }
            ]
        },
        {
            q: "El nombre científico del Tiburón Arrecifal del Caribe es:",
            options: [
                { text: "Carcharhinus falciformis", correct: false },
                { text: "Carcharhinus perezi", correct: true },
                { text: "Carcharhinus limbatus", correct: false },
                { text: "Ginglymostoma cirratum", correct: false }
            ]
        },
        {
            q: "¿A qué especie corresponde Balaenoptera edeni?",
            options: [
                { text: "Ballena Jorobada", correct: false },
                { text: "Ballena de Bryde", correct: true },
                { text: "Cachalote", correct: false },
                { text: "Rorcual Común", correct: false }
            ]
        },
        {
            q: "¿Cuál es el nombre científico del Mero del Pacífico?",
            options: [
                { text: "Epinephelus itajara", correct: false },
                { text: "Epinephelus quinquefasciatus", correct: true },
                { text: "Epinephelus striatus", correct: false },
                { text: "Mycteroperca bonaci", correct: false }
            ]
        },
        {
            q: "El coral masivo resistente a la turbidez es científicamente conocido como:",
            options: [
                { text: "Orbicella faveolata", correct: false },
                { text: "Siderastrea siderea", correct: true },
                { text: "Acropora palmata", correct: false },
                { text: "Montastraea cavernosa", correct: false }
            ]
        },
        {
            q: "¿Cuántos decibelios alcanzan los clicks del Cachalote?",
            options: [
                { text: "120 decibelios", correct: false },
                { text: "236 decibelios", correct: true },
                { text: "300 decibelios", correct: false },
                { text: "180 decibelios", correct: false }
            ]
        },
        {
            q: "¿En qué año lideró Panamá la propuesta para proteger a los tiburones de arrecife en la convención CITES?",
            options: [
                { text: "1977", correct: false },
                { text: "2022", correct: true },
                { text: "2010", correct: false },
                { text: "2015", correct: false }
            ]
        },
        {
            q: "¿En qué porcentaje ha disminuido la población de Tiburón Martillo en el Pacífico Oriental, según los registros de la UICN?",
            options: [
                { text: "50%", correct: false },
                { text: "80%", correct: true },
                { text: "95%", correct: false },
                { text: "30%", correct: false }
            ]
        },
        {
            q: "¿Cuál es la tasa de crecimiento anual del coral Cuerno de Alce?",
            options: [
                { text: "Menos de 1 cm", correct: false },
                { text: "5-10 cm", correct: true },
                { text: "20-30 cm", correct: false },
                { text: "2 cm", correct: false }
            ]
        },
        {
            q: "¿Cuántos kilogramos puede llegar a pesar la Tortuga Baula?",
            options: [
                { text: "400 kg", correct: false },
                { text: "Hasta 900 kg", correct: true },
                { text: "1,500 kg", correct: false },
                { text: "100 kg", correct: false }
            ]
        }
    ]

};

// ========================================
// INICIALIZACIÓN
// ========================================
const juego = new EcoRetos();

function startQuiz(nivel) {
    juego.startQuiz(nivel);
}

// Log informativo
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Eco-Retos - Versión Optimizada');
    console.log('📊 Estadísticas del banco de preguntas:');
    Object.entries(preguntasBanco).forEach(([nivel, preguntas]) => {
        console.log(`   • ${nivel}: ${preguntas.length} preguntas disponibles`);
    });
    console.log('🎯 Cada partida: 10 preguntas aleatorias SIN repetición');
});