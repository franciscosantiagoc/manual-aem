// Banco de preguntas del Módulo 1: Fundamentos de AEM y Entorno de Trabajo
export default [
  {
    id: 'ch-1-q1',
    chapterId: 'ch-1',
    type: 'single',
    question: '¿Cuál es el principio que permite a un autor cambiar textos sin tocar el código que genera el diseño?',
    options: [
      'El uso de bases de datos relacionales SQL.',
      'La separación de contenido (repositorio) y presentación (componentes con HTML/CSS/JS).',
      'La compilación del sitio completo en cada publicación.'
    ],
    answer: [1],
    explanation: 'Un CMS guarda el contenido de forma estructurada y deja la presentación a los componentes. Por eso el autor edita datos y el desarrollador edita el diseño sin pisarse.'
  },
  {
    id: 'ch-1-q2',
    chapterId: 'ch-1',
    type: 'single',
    question: '¿Qué caracteriza a un CMS headless?',
    options: [
      'Genera el HTML final y además incluye un editor visual obligatorio.',
      'Solo almacena contenido estructurado y lo expone por API; la presentación la construye otra aplicación.',
      'No almacena contenido: lo lee de archivos estáticos del servidor web.'
    ],
    answer: [1],
    explanation: 'Un CMS headless no tiene "cabeza" de presentación: entrega contenido por REST o GraphQL y cada canal (web, app, kiosco) decide cómo mostrarlo.'
  },
  {
    id: 'ch-1-q3',
    chapterId: 'ch-1',
    type: 'single',
    question: '¿Por qué se considera a AEM un CMS híbrido?',
    options: [
      'Porque funciona a la vez en Windows y Linux.',
      'Porque ofrece páginas con edición visual (Sites) y también contenido estructurado por API (Content Fragments + GraphQL).',
      'Porque combina una base de datos SQL con una NoSQL.'
    ],
    answer: [1],
    explanation: 'AEM sirve páginas renderizadas con editor visual y, desde el mismo repositorio, contenido headless por GraphQL. Esa dualidad es "híbrido".'
  },
  {
    id: 'ch-1-q4',
    chapterId: 'ch-1',
    type: 'single',
    question: 'En la arquitectura clásica de AEM, ¿cuál es el rol de la instancia Author?',
    options: [
      'Guardar en caché y servir las páginas finales a los visitantes.',
      'Ofrecer la interfaz donde los autores crean, editan y aprueban el contenido.',
      'Filtrar las peticiones maliciosas antes de que lleguen al servidor.'
    ],
    answer: [1],
    explanation: 'Author es la instancia privada de edición. Publish sirve el contenido al público y el Dispatcher cachea y filtra delante de Publish.'
  },
  {
    id: 'ch-1-q5',
    chapterId: 'ch-1',
    type: 'multiple',
    question: 'Selecciona las afirmaciones correctas sobre Publish y Dispatcher.',
    options: [
      'Publish genera las páginas que ven los visitantes.',
      'Publish es donde los autores editan el contenido.',
      'El Dispatcher es un módulo de Apache HTTP Server que cachea y filtra peticiones.',
      'El Dispatcher reemplaza a Publish: no hace falta tener ambas piezas.'
    ],
    answer: [0, 2],
    explanation: 'Publish renderiza el sitio público sin herramientas de edición. El Dispatcher se coloca delante de Publish para cachear y filtrar; no lo reemplaza.'
  },
  {
    id: 'ch-1-q6',
    chapterId: 'ch-1',
    type: 'single',
    question: '¿Qué proyecto de Apache implementa el repositorio de contenido (JCR) de AEM?',
    options: [
      'Apache Felix',
      'Apache Jackrabbit Oak',
      'Apache Sling'
    ],
    answer: [1],
    explanation: 'Jackrabbit Oak es el repositorio JCR. Sling es el framework web que resuelve URLs a nodos y Felix es el contenedor OSGi.'
  },
  {
    id: 'ch-1-q7',
    chapterId: 'ch-1',
    type: 'multiple',
    question: 'Selecciona las características de AEM as a Cloud Service frente a AEM 6.5.',
    options: [
      'Adobe lo actualiza de forma continua y automática.',
      '/apps y /libs son inmutables en ejecución: el código solo llega por el pipeline.',
      'El código se sube a producción con Package Manager sin pasar por Cloud Manager.',
      'Incluye autoescalado y CDN.'
    ],
    answer: [0, 1, 3],
    explanation: 'Cloud Service es "siempre actualizado", autoescala, incluye CDN y solo acepta código desplegado por Cloud Manager; el Package Manager no sirve para instalar código en producción.'
  },
  {
    id: 'ch-1-q8',
    chapterId: 'ch-1',
    type: 'single',
    question: 'Un equipo debe quedarse en AEM 6.5 on-premise dos años más y quiere usar Java 21. ¿Qué opción recomiendas?',
    options: [
      'Seguir en AEM 6.5 con el último Service Pack clásico y Java 11.',
      'Actualizar in-place a AEM 6.5 LTS, que soporta Java 17 y 21.',
      'Instalar el AEM SDK de Cloud Service en sus servidores de producción.'
    ],
    answer: [1],
    explanation: 'AEM 6.5 LTS es la rama recomendada para quedarse en 6.5: soporta Java 17/21 y permite actualizar in-place. El AEM SDK es solo para desarrollo local.'
  },
  {
    id: 'ch-1-q9',
    chapterId: 'ch-1',
    type: 'single',
    question: '¿Qué distingue a Edge Delivery Services del stack clásico de AEM Sites?',
    options: [
      'Reemplaza la entrega Publish/Dispatcher y permite autoría en documentos (Word, Google Docs) o Universal Editor.',
      'Es una versión de AEM 6.5 que corre en servidores propios.',
      'Solo sirve para gestionar assets del DAM.'
    ],
    answer: [0],
    explanation: 'EDS publica desde el edge con un proyecto frontend en GitHub. Sustituye la capa Publish/Dispatcher y los Core Components clásicos, y admite autoría basada en documentos.'
  },
  {
    id: 'ch-1-q10',
    chapterId: 'ch-1',
    type: 'multiple',
    question: 'Al analizar un sitio con DevTools, ¿qué señales indican que probablemente usa AEM Sites clásico?',
    options: [
      'CSS o JS servidos desde /etc.clientlibs/',
      'Atributos data-cmp-is o data-cmp-data-layer en el HTML',
      'Un script /scripts/aem.js como base del proyecto',
      'Un archivo wp-content/ en las rutas de imágenes'
    ],
    answer: [0, 1],
    explanation: '/etc.clientlibs/ y los atributos data-cmp-* son huellas de AEM Sites y sus Core Components. /scripts/aem.js indica Edge Delivery Services y wp-content/ indica WordPress.'
  }
];
