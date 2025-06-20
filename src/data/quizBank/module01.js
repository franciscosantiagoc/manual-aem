// Banco de preguntas del Módulo 1: Fundamentos de AEM y Entorno de Trabajo
export default [
  {
    "id": "ch-1-q1",
    "chapterId": "ch-1",
    "type": "single",
    "question": "¿Cuál es el principio que permite a un autor cambiar textos sin tocar el código que genera el diseño?",
    "options": [
      "El uso de bases de datos relacionales SQL.",
      "La separación de contenido (repositorio) y presentación (componentes con HTML/CSS/JS).",
      "La compilación del sitio completo en cada publicación."
    ],
    "answer": [
      1
    ],
    "explanation": "Un CMS guarda el contenido de forma estructurada y deja la presentación a los componentes. Por eso el autor edita datos y el desarrollador edita el diseño sin pisarse."
  },
  {
    "id": "ch-1-q2",
    "chapterId": "ch-1",
    "type": "single",
    "question": "¿Qué caracteriza a un CMS headless?",
    "options": [
      "Genera el HTML final y además incluye un editor visual obligatorio.",
      "Solo almacena contenido estructurado y lo expone por API; la presentación la construye otra aplicación.",
      "No almacena contenido: lo lee de archivos estáticos del servidor web."
    ],
    "answer": [
      1
    ],
    "explanation": "Un CMS headless no tiene \"cabeza\" de presentación: entrega contenido por REST o GraphQL y cada canal (web, app, kiosco) decide cómo mostrarlo."
  },
  {
    "id": "ch-1-q3",
    "chapterId": "ch-1",
    "type": "single",
    "question": "¿Por qué se considera a AEM un CMS híbrido?",
    "options": [
      "Porque funciona a la vez en Windows y Linux.",
      "Porque ofrece páginas con edición visual (Sites) y también contenido estructurado por API (Content Fragments + GraphQL).",
      "Porque combina una base de datos SQL con una NoSQL."
    ],
    "answer": [
      1
    ],
    "explanation": "AEM sirve páginas renderizadas con editor visual y, desde el mismo repositorio, contenido headless por GraphQL. Esa dualidad es \"híbrido\"."
  },
  {
    "id": "ch-1-q4",
    "chapterId": "ch-1",
    "type": "single",
    "question": "En la arquitectura clásica de AEM, ¿cuál es el rol de la instancia Author?",
    "options": [
      "Guardar en caché y servir las páginas finales a los visitantes.",
      "Ofrecer la interfaz donde los autores crean, editan y aprueban el contenido.",
      "Filtrar las peticiones maliciosas antes de que lleguen al servidor."
    ],
    "answer": [
      1
    ],
    "explanation": "Author es la instancia privada de edición. Publish sirve el contenido al público y el Dispatcher cachea y filtra delante de Publish."
  },
  {
    "id": "ch-1-q5",
    "chapterId": "ch-1",
    "type": "multiple",
    "question": "Selecciona las afirmaciones correctas sobre Publish y Dispatcher.",
    "options": [
      "Publish genera las páginas que ven los visitantes.",
      "Publish es donde los autores editan el contenido.",
      "El Dispatcher es un módulo de Apache HTTP Server que cachea y filtra peticiones.",
      "El Dispatcher reemplaza a Publish: no hace falta tener ambas piezas."
    ],
    "answer": [
      0,
      2
    ],
    "explanation": "Publish renderiza el sitio público sin herramientas de edición. El Dispatcher se coloca delante de Publish para cachear y filtrar; no lo reemplaza."
  },
  {
    "id": "ch-1-q6",
    "chapterId": "ch-1",
    "type": "single",
    "question": "¿Qué proyecto de Apache implementa el repositorio de contenido (JCR) de AEM?",
    "options": [
      "Apache Felix",
      "Apache Jackrabbit Oak",
      "Apache Sling"
    ],
    "answer": [
      1
    ],
    "explanation": "Jackrabbit Oak es el repositorio JCR. Sling es el framework web que resuelve URLs a nodos y Felix es el contenedor OSGi."
  },
  {
    "id": "ch-1-q7",
    "chapterId": "ch-1",
    "type": "multiple",
    "question": "Selecciona las características de AEM as a Cloud Service frente a AEM 6.5.",
    "options": [
      "Adobe lo actualiza de forma continua y automática.",
      "/apps y /libs son inmutables en ejecución: el código solo llega por el pipeline.",
      "El código se sube a producción con Package Manager sin pasar por Cloud Manager.",
      "Incluye autoescalado y CDN."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Cloud Service es \"siempre actualizado\", autoescala, incluye CDN y solo acepta código desplegado por Cloud Manager; el Package Manager no sirve para instalar código en producción."
  },
  {
    "id": "ch-1-q8",
    "chapterId": "ch-1",
    "type": "single",
    "question": "Un equipo debe quedarse en AEM 6.5 on-premise dos años más y quiere usar Java 21. ¿Qué opción recomiendas?",
    "options": [
      "Seguir en AEM 6.5 con el último Service Pack clásico y Java 11.",
      "Actualizar in-place a AEM 6.5 LTS, que soporta Java 17 y 21.",
      "Instalar el AEM SDK de Cloud Service en sus servidores de producción."
    ],
    "answer": [
      1
    ],
    "explanation": "AEM 6.5 LTS es la rama recomendada para quedarse en 6.5: soporta Java 17/21 y permite actualizar in-place. El AEM SDK es solo para desarrollo local."
  },
  {
    "id": "ch-1-q9",
    "chapterId": "ch-1",
    "type": "single",
    "question": "¿Qué distingue a Edge Delivery Services del stack clásico de AEM Sites?",
    "options": [
      "Reemplaza la entrega Publish/Dispatcher y permite autoría en documentos (Word, Google Docs) o Universal Editor.",
      "Es una versión de AEM 6.5 que corre en servidores propios.",
      "Solo sirve para gestionar assets del DAM."
    ],
    "answer": [
      0
    ],
    "explanation": "EDS publica desde el edge con un proyecto frontend en GitHub. Sustituye la capa Publish/Dispatcher y los Core Components clásicos, y admite autoría basada en documentos."
  },
  {
    "id": "ch-1-q10",
    "chapterId": "ch-1",
    "type": "multiple",
    "question": "Al analizar un sitio con DevTools, ¿qué señales indican que probablemente usa AEM Sites clásico?",
    "options": [
      "CSS o JS servidos desde /etc.clientlibs/",
      "Atributos data-cmp-is o data-cmp-data-layer en el HTML",
      "Un script /scripts/aem.js como base del proyecto",
      "Un archivo wp-content/ en las rutas de imágenes"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "/etc.clientlibs/ y los atributos data-cmp-* son huellas de AEM Sites y sus Core Components. /scripts/aem.js indica Edge Delivery Services y wp-content/ indica WordPress."
  },
  {
    "id": "ch-2-q1",
    "chapterId": "ch-2",
    "type": "single",
    "question": "¿Por qué AEM separa las instancias Author y Publish?",
    "options": [
      "Porque Java no permite ejecutar dos funciones en la misma JVM.",
      "Por seguridad, rendimiento y control editorial: el público nunca accede al servidor de edición y Publish escala por separado.",
      "Porque Publish usa una base de datos SQL y Author un JCR."
    ],
    "answer": [
      1
    ],
    "explanation": "Author y Publish son la misma aplicación con distinto run mode. Se separan para que el público no toque el entorno de edición, para escalar la entrega de forma independiente y para que nada sea público sin publicarse."
  },
  {
    "id": "ch-2-q2",
    "chapterId": "ch-2",
    "type": "single",
    "question": "¿Qué hace el Dispatcher cuando recibe una petición a una ruta que sus filtros no permiten?",
    "options": [
      "La reenvía a Author para que un administrador la apruebe.",
      "Responde con error (normalmente 404) sin llegar a Publish.",
      "La guarda en caché para responder más rápido la próxima vez."
    ],
    "answer": [
      1
    ],
    "explanation": "Los filtros del Dispatcher son una defensa perimetral: bloquean rutas y selectores no permitidos antes de que la petición llegue a Publish."
  },
  {
    "id": "ch-2-q3",
    "chapterId": "ch-2",
    "type": "multiple",
    "question": "Selecciona las capas técnicas correctas de una instancia AEM.",
    "options": [
      "Apache Sling: convierte URLs en recursos y elige el script que los renderiza.",
      "OSGi (Apache Felix): gestiona bundles, servicios y configuraciones.",
      "JCR (Jackrabbit Oak): almacena contenido y código como árbol de nodos.",
      "MySQL: almacena las páginas publicadas."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "La pila de AEM es JVM → OSGi → Sling → JCR/Oak, con HTL y Sling Models en la capa de presentación. No hay una base de datos relacional para el contenido."
  },
  {
    "id": "ch-2-q4",
    "chapterId": "ch-2",
    "type": "single",
    "question": "¿En qué carpeta del repositorio va el código de componentes de tu proyecto?",
    "options": [
      "/libs",
      "/apps",
      "/var"
    ],
    "answer": [
      1
    ],
    "explanation": "/apps contiene el código del proyecto. /libs es de Adobe y nunca se modifica; /var es para datos generados en ejecución."
  },
  {
    "id": "ch-2-q5",
    "chapterId": "ch-2",
    "type": "multiple",
    "question": "¿Qué rutas son mutables (escribibles en ejecución) en AEM as a Cloud Service?",
    "options": [
      "/content",
      "/conf",
      "/apps",
      "/var"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "En Cloud Service /apps y /libs son inmutables y solo cambian con un despliegue. /content, /conf y /var sí se pueden escribir."
  },
  {
    "id": "ch-2-q6",
    "chapterId": "ch-2",
    "type": "single",
    "question": "En la URL /content/misitio/es/blog.print.html, ¿qué es \"print\"?",
    "options": [
      "La extensión",
      "Un selector",
      "El sufijo"
    ],
    "answer": [
      1
    ],
    "explanation": "Sling separa ruta del recurso (/content/misitio/es/blog), selectores (print), extensión (html) y sufijo (vacío aquí). Los selectores permiten vistas alternativas del mismo recurso."
  },
  {
    "id": "ch-2-q7",
    "chapterId": "ch-2",
    "type": "single",
    "question": "¿Qué propiedad del nodo usa Sling para saber qué script o componente debe renderizarlo?",
    "options": [
      "jcr:primaryType",
      "sling:resourceType",
      "cq:template"
    ],
    "answer": [
      1
    ],
    "explanation": "sling:resourceType apunta al componente (por ejemplo misitio/components/page). Sling busca su script primero en /apps y luego en /libs."
  },
  {
    "id": "ch-2-q8",
    "chapterId": "ch-2",
    "type": "single",
    "question": "¿Cómo llega el contenido publicado a las instancias Publish en AEM as a Cloud Service?",
    "options": [
      "Con agentes de replicación configurados manualmente por cada Publish.",
      "Con Sling Content Distribution: un modelo publicar-suscribir con colas en la nube.",
      "Copiando el repositorio completo cada noche."
    ],
    "answer": [
      1
    ],
    "explanation": "Cloud Service usa publicar-suscribir: cada Publish se suscribe a las colas, lo que permite agregar o quitar pods dinámicamente. Los agentes de replicación por instancia son el mecanismo de AEM 6.5."
  },
  {
    "id": "ch-2-q9",
    "chapterId": "ch-2",
    "type": "multiple",
    "question": "Selecciona las características de la topología de AEM as a Cloud Service.",
    "options": [
      "Author es un clúster de pods que comparten un repositorio.",
      "Cada Publish tiene su propio repositorio y su propio Apache con Dispatcher.",
      "Incluye un tier Preview para revisar contenido antes de publicarlo.",
      "El número de Publish es fijo y lo define el cliente al contratar."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "En Cloud Service el número de pods de Publish varía según el tráfico. Author es un clúster, cada Publish lleva su Dispatcher y existe un tier Preview."
  },
  {
    "id": "ch-2-q10",
    "chapterId": "ch-2",
    "type": "single",
    "question": "Al repetir curl -sI sobre una URL, la cabecera age pasa de 12 a 40. ¿Qué indica?",
    "options": [
      "Que la página tarda 40 segundos en generarse.",
      "Que la respuesta viene de una caché (probablemente la CDN) y lleva 40 segundos almacenada.",
      "Que el servidor tiene 40 conexiones abiertas."
    ],
    "answer": [
      1
    ],
    "explanation": "age indica cuántos segundos lleva la respuesta en una caché compartida. Si crece entre peticiones, respondió la caché y no el origen."
  },
  {
    "id": "ch-3-q1",
    "chapterId": "ch-3",
    "type": "single",
    "question": "¿Qué versión de Java recomienda Adobe para ejecutar el AEM SDK local de Cloud Service?",
    "options": [
      "Java 8",
      "Java 11",
      "Java 21"
    ],
    "answer": [
      2
    ],
    "explanation": "El runtime de AEM as a Cloud Service es Java 21 y Adobe recomienda ejecutar el SDK local con Java 21. Java 8 y 11 ya no se soportan en el runtime de Cloud."
  },
  {
    "id": "ch-3-q2",
    "chapterId": "ch-3",
    "type": "single",
    "question": "¿Cómo se elige la versión de Java con la que Cloud Manager compila un proyecto?",
    "options": [
      "Con la variable JAVA_HOME del equipo del desarrollador.",
      "Con el archivo .cloudmanager/java-version (valores 21 o 17).",
      "Cambiando la versión dentro de /system/console."
    ],
    "answer": [
      1
    ],
    "explanation": "Cloud Manager lee .cloudmanager/java-version en el repositorio. Si no existe, su JAVA_HOME por defecto apunta a un JDK antiguo, así que conviene fijarlo."
  },
  {
    "id": "ch-3-q3",
    "chapterId": "ch-3",
    "type": "multiple",
    "question": "¿Qué versiones de Java soporta AEM 6.5 LTS?",
    "options": [
      "Java 8",
      "Java 17",
      "Java 21",
      "Java 11"
    ],
    "answer": [
      1,
      2
    ],
    "explanation": "AEM 6.5 LTS soporta Java 17 y 21 (Oracle e IBM Semeru). Los Service Packs clásicos de 6.5 usan Java 8 u 11."
  },
  {
    "id": "ch-3-q4",
    "chapterId": "ch-3",
    "type": "single",
    "question": "¿Qué variable de entorno usa Maven para saber qué JDK usar?",
    "options": [
      "MAVEN_HOME",
      "JAVA_HOME",
      "NODE_PATH"
    ],
    "answer": [
      1
    ],
    "explanation": "Maven usa JAVA_HOME. mvn -v muestra la versión y la ruta del Java que tomará; si no coincide con java -version, JAVA_HOME apunta a otro JDK."
  },
  {
    "id": "ch-3-q5",
    "chapterId": "ch-3",
    "type": "single",
    "question": "Al compilar aparece \"invalid target release: 21\". ¿Cuál es la causa más probable?",
    "options": [
      "Maven está desactualizado.",
      "Se compila con un JDK más antiguo que el que exige el proyecto.",
      "Falta instalar Node.js."
    ],
    "answer": [
      1
    ],
    "explanation": "El proyecto pide compilar para Java 21 pero JAVA_HOME apunta a un JDK anterior. Cambia al JDK correcto."
  },
  {
    "id": "ch-3-q6",
    "chapterId": "ch-3",
    "type": "single",
    "question": "¿Para qué sirve nvm en un proyecto AEM?",
    "options": [
      "Para gestionar varias versiones de Node.js y usar la que pide cada proyecto.",
      "Para instalar paquetes de contenido en AEM.",
      "Para cambiar la versión de Java."
    ],
    "answer": [
      0
    ],
    "explanation": "nvm (o nvm-windows) permite instalar varias versiones de Node.js y alternar entre ellas. La versión debe coincidir o acercarse a la del pom.xml del proyecto."
  },
  {
    "id": "ch-3-q7",
    "chapterId": "ch-3",
    "type": "single",
    "question": "Durante mvn clean install, ¿de dónde toma Node.js el módulo ui.frontend?",
    "options": [
      "Siempre del Node.js instalado en el sistema.",
      "El frontend-maven-plugin descarga su propia copia con la versión fijada en el pom.xml.",
      "De la instancia de AEM."
    ],
    "answer": [
      1
    ],
    "explanation": "El frontend-maven-plugin instala la versión de Node indicada en el pom.xml dentro del proyecto. El Node del sistema se usa al trabajar fuera de Maven, por ejemplo con npm run watch."
  },
  {
    "id": "ch-3-q8",
    "chapterId": "ch-3",
    "type": "multiple",
    "question": "Selecciona las configuraciones de finales de línea recomendadas.",
    "options": [
      "core.autocrlf true en Windows",
      "core.autocrlf input en macOS y Linux",
      "Un .gitattributes con eol=lf en el proyecto",
      "Guardar todos los archivos con CRLF para los contenedores Linux"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "El repositorio debe guardar LF. Los contenedores Linux (por ejemplo, el Dispatcher) fallan con scripts CRLF, así que CRLF solo se deja para .bat y .cmd."
  },
  {
    "id": "ch-3-q9",
    "chapterId": "ch-3",
    "type": "single",
    "question": "En macOS/Linux, ¿qué herramienta permite tener Java 11 y 21 y cambiar entre ellos con un comando?",
    "options": [
      "Homebrew Cask",
      "SDKMAN",
      "npm"
    ],
    "answer": [
      1
    ],
    "explanation": "SDKMAN gestiona varias versiones de Java y Maven: sdk default fija la global y sdk use cambia solo la terminal actual."
  },
  {
    "id": "ch-3-q10",
    "chapterId": "ch-3",
    "type": "single",
    "question": "En PowerShell, la función Use-Jdk cambia $env:JAVA_HOME. ¿Cuál es el alcance del cambio?",
    "options": [
      "Permanente para todo el sistema.",
      "Solo la terminal actual.",
      "Todas las terminales abiertas del usuario."
    ],
    "answer": [
      1
    ],
    "explanation": "$env: modifica variables del proceso actual. Para cambios permanentes se usa [Environment]::SetEnvironmentVariable con el alcance User o Machine."
  },
  {
    "id": "ch-3-q11",
    "chapterId": "ch-3",
    "type": "single",
    "question": "¿Qué ventaja tiene la extensión VSCode AEM Sync frente a aemsync (watcher de npm) para trabajar en local?",
    "options": [
      "Compila el código Java más rápido que Maven.",
      "Controlas cada envío a AEM (manual o al guardar), lo que reduce el riesgo de dejar la instancia local inconsistente.",
      "Reemplaza por completo el despliegue con Maven."
    ],
    "answer": [
      1
    ],
    "explanation": "aemsync vigila carpetas y envía cambios en ráfagas, lo que en la práctica puede corromper la instancia local. VSCode AEM Sync envía solo lo que eliges (o al guardar, con autopush). Ninguna reemplaza el despliegue completo con Maven."
  }
];
