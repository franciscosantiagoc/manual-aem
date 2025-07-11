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
  },
  {
    "id": "ch-4-q1",
    "chapterId": "ch-4",
    "type": "single",
    "question": "Copias el mismo jar del SDK en dos carpetas. ¿Qué convierte a una copia en Author y a la otra en Publish?",
    "options": [
      "El contenido del jar, que es distinto en cada descarga.",
      "El nombre del archivo: aem-author-p4502.jar y aem-publish-p4503.jar.",
      "La carpeta en la que está: \"author\" o \"publish\"."
    ],
    "answer": [
      1
    ],
    "explanation": "AEM lee el run mode y el puerto del nombre del archivo con la convención aem-<runmode>-p<puerto>.jar. El nombre de la carpeta no influye."
  },
  {
    "id": "ch-4-q2",
    "chapterId": "ch-4",
    "type": "single",
    "question": "¿Dónde crea AEM la carpeta crx-quickstart?",
    "options": [
      "Siempre en la carpeta de usuario.",
      "En la carpeta desde la que ejecutas java -jar.",
      "Dentro de la carpeta de instalación de Java."
    ],
    "answer": [
      1
    ],
    "explanation": "crx-quickstart se crea en el directorio de trabajo actual. Por eso hay que arrancar siempre desde la carpeta del jar."
  },
  {
    "id": "ch-4-q3",
    "chapterId": "ch-4",
    "type": "multiple",
    "question": "¿Qué run modes se fijan en el primer arranque y ya no se pueden cambiar?",
    "options": [
      "author / publish",
      "samplecontent / nosamplecontent",
      "dev / stage / prod",
      "prerelease"
    ],
    "answer": [
      0,
      1
    ],
    "explanation": "El rol (author/publish) y la instalación de contenido de ejemplo se deciden en la instalación. Los run modes de entorno y prerelease se pueden cambiar en cada arranque."
  },
  {
    "id": "ch-4-q4",
    "chapterId": "ch-4",
    "type": "single",
    "question": "Abres http://localhost:4503 y ves un 404. ¿Qué significa?",
    "options": [
      "La instancia Publish está dañada.",
      "Es normal: Publish es la instancia pública y todavía no hay contenido publicado en la raíz.",
      "Publish solo funciona en el puerto 4502."
    ],
    "answer": [
      1
    ],
    "explanation": "Publish no muestra el login en la raíz porque es la instancia pública. Para entrar como admin se usa /libs/granite/core/content/login.html."
  },
  {
    "id": "ch-4-q5",
    "chapterId": "ch-4",
    "type": "single",
    "question": "¿Cuál es la forma correcta de detener una instancia arrancada con java -jar en primer plano?",
    "options": [
      "Cerrar la terminal de golpe.",
      "Pulsar Ctrl+C y esperar el apagado ordenado.",
      "Terminar el proceso con kill -9."
    ],
    "answer": [
      1
    ],
    "explanation": "Ctrl+C (o bin/stop) apaga los servicios en orden y cierra el repositorio. Matar el proceso puede dejar el repositorio inconsistente."
  },
  {
    "id": "ch-4-q6",
    "chapterId": "ch-4",
    "type": "single",
    "question": "¿Qué archivo revisas primero cuando algo falla en la instancia?",
    "options": [
      "crx-quickstart/logs/error.log",
      "crx-quickstart/bin/start",
      "license.properties"
    ],
    "answer": [
      0
    ],
    "explanation": "error.log es el log principal: contiene mensajes INFO, WARN y ERROR con fecha, hilo y la clase que los generó."
  },
  {
    "id": "ch-4-q7",
    "chapterId": "ch-4",
    "type": "single",
    "question": "¿Qué hace la carpeta crx-quickstart/install?",
    "options": [
      "Guarda los instaladores de Java.",
      "Es una carpeta vigilada: los paquetes, bundles o configuraciones que copies ahí se instalan solos.",
      "Contiene el repositorio de contenido."
    ],
    "answer": [
      1
    ],
    "explanation": "AEM vigila crx-quickstart/install e instala automáticamente lo que se copie ahí. Es una alternativa a Package Manager, útil por ejemplo para Service Packs."
  },
  {
    "id": "ch-4-q8",
    "chapterId": "ch-4",
    "type": "single",
    "question": "¿Cómo se actualiza el AEM SDK local a una versión nueva?",
    "options": [
      "Instalando un Service Pack desde Package Manager.",
      "Reemplazándolo: se detiene, se borra crx-quickstart y se arranca con el jar nuevo.",
      "No se actualiza nunca."
    ],
    "answer": [
      1
    ],
    "explanation": "El SDK no se actualiza encima: se reemplaza. Adobe recomienda hacerlo al menos cada mes, exportando antes como paquete el contenido que quieras conservar."
  },
  {
    "id": "ch-4-q9",
    "chapterId": "ch-4",
    "type": "single",
    "question": "Al arrancar el SDK aparece UnsupportedClassVersionError. ¿Qué revisas?",
    "options": [
      "La memoria asignada con -Xmx.",
      "La versión de Java: el SDK necesita Java 21.",
      "El puerto 4502."
    ],
    "answer": [
      1
    ],
    "explanation": "UnsupportedClassVersionError indica que el código fue compilado para una versión de Java más nueva que la que lo ejecuta."
  },
  {
    "id": "ch-4-q10",
    "chapterId": "ch-4",
    "type": "multiple",
    "question": "Selecciona las afirmaciones correctas sobre las copias de seguridad locales (snapshots).",
    "options": [
      "La instancia debe estar detenida antes de copiar crx-quickstart.",
      "Restaurar consiste en reemplazar crx-quickstart por la copia guardada.",
      "Se puede copiar con la instancia corriendo sin riesgo.",
      "Evitan reinstalar AEM desde cero cuando el entorno se daña."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Copiar un repositorio en uso produce una copia corrupta. Con la instancia detenida, copiar y restaurar crx-quickstart es rápido y evita reinstalar."
  },
  {
    "id": "ch-5-q1",
    "chapterId": "ch-5",
    "type": "single",
    "question": "En la consola Sites, ¿qué ocurre al hacer clic en la miniatura de una página?",
    "options": [
      "Se abre el editor de la página.",
      "Se selecciona la página y aparecen sus acciones en la barra superior.",
      "Se publica la página."
    ],
    "answer": [
      1
    ],
    "explanation": "Clic en el título navega a las páginas hijas; clic en la miniatura (o su casilla) selecciona la página y muestra acciones como Edit, Properties o Quick Publish."
  },
  {
    "id": "ch-5-q2",
    "chapterId": "ch-5",
    "type": "single",
    "question": "¿Qué diferencia hay entre el Title y el Name de una página?",
    "options": [
      "Son el mismo campo con dos nombres.",
      "El Title es el título visible y el Name es el nombre del nodo y el segmento de la URL.",
      "El Name es el título para buscadores y el Title la URL."
    ],
    "answer": [
      1
    ],
    "explanation": "El Name define la ruta en el repositorio y la URL (por ejemplo sobre-nosotros). Cambiarlo rompe enlaces; el Title se puede cambiar libremente."
  },
  {
    "id": "ch-5-q3",
    "chapterId": "ch-5",
    "type": "single",
    "question": "Un componente que necesitas no aparece en la pestaña Components del editor. ¿Cuál es la causa más probable?",
    "options": [
      "El componente está roto.",
      "La política de la plantilla no lo permite en ese contenedor.",
      "Falta publicar la página."
    ],
    "answer": [
      1
    ],
    "explanation": "Los componentes disponibles en cada contenedor los define la política de la plantilla, que se configura en el Template Editor."
  },
  {
    "id": "ch-5-q4",
    "chapterId": "ch-5",
    "type": "multiple",
    "question": "Selecciona las formas válidas de editar un componente insertado.",
    "options": [
      "Abrir su diálogo con Configure (llave inglesa).",
      "Edición en línea con Edit (lápiz) en componentes de texto.",
      "Editar el HTML generado directamente en el modo Preview.",
      "Aplicar variantes visuales con Styles (pincel), si el Style System está configurado."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Configure abre el diálogo, Edit permite editar texto en línea y Styles aplica variantes del Style System. En Preview no se edita."
  },
  {
    "id": "ch-5-q5",
    "chapterId": "ch-5",
    "type": "single",
    "question": "¿Para qué sirve el modo Layout?",
    "options": [
      "Para cambiar la plantilla de la página.",
      "Para definir el ancho de cada componente en columnas y ocultarlo por tipo de dispositivo.",
      "Para ver versiones anteriores de la página."
    ],
    "answer": [
      1
    ],
    "explanation": "Layout controla el diseño responsivo sobre la grilla de columnas; combinado con el Emulator se ajusta cada ancho de pantalla."
  },
  {
    "id": "ch-5-q6",
    "chapterId": "ch-5",
    "type": "single",
    "question": "¿Qué atajo alterna entre Preview y el modo anterior en el editor?",
    "options": [
      "Ctrl+Shift+M",
      "Ctrl+P",
      "Ctrl+Shift+E"
    ],
    "answer": [
      0
    ],
    "explanation": "Ctrl+Shift+M (Cmd en macOS) alterna entre Preview y el modo en el que estabas."
  },
  {
    "id": "ch-5-q7",
    "chapterId": "ch-5",
    "type": "single",
    "question": "Publicas con Quick Publish una página que tiene 5 páginas hijas. ¿Qué se publica?",
    "options": [
      "La página y sus 5 hijas.",
      "Solo la página seleccionada (y las referencias que necesite), no sus hijas.",
      "Nada, porque Quick Publish solo programa la publicación."
    ],
    "answer": [
      1
    ],
    "explanation": "Quick Publish publica únicamente lo seleccionado. Para incluir hijas, programar o despublicar se usa Manage Publication."
  },
  {
    "id": "ch-5-q8",
    "chapterId": "ch-5",
    "type": "multiple",
    "question": "¿Qué permite Manage Publication que Quick Publish no permite?",
    "options": [
      "Incluir páginas hijas.",
      "Programar la publicación para una fecha futura.",
      "Despublicar contenido.",
      "Editar el contenido de la página."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Manage Publication es un asistente para publicar o despublicar, programar, incluir hijas, revisar referencias, elegir destino y disparar workflows. No edita contenido."
  },
  {
    "id": "ch-5-q9",
    "chapterId": "ch-5",
    "type": "single",
    "question": "Publicaste una página pero en Publish da 404, aunque la página se ve publicada en Author. ¿Qué revisas primero?",
    "options": [
      "Que su página padre también esté publicada.",
      "Que la página tenga una miniatura.",
      "Que el Title no tenga acentos."
    ],
    "answer": [
      0
    ],
    "explanation": "En Publish no puede existir una página hija sin su padre. También hay que revisar referencias (imágenes, fragmentos) y, en 6.5, el agente de replicación."
  },
  {
    "id": "ch-5-q10",
    "chapterId": "ch-5",
    "type": "single",
    "question": "En el JSON de jcr:content de una página, ¿qué indica sling:resourceType de un componente?",
    "options": [
      "El usuario que lo creó.",
      "Qué componente (y por lo tanto qué script) lo renderiza.",
      "La fecha de publicación."
    ],
    "answer": [
      1
    ],
    "explanation": "sling:resourceType apunta al componente que renderiza ese nodo. El diálogo guarda propiedades en el nodo y el HTL del componente las lee para generar el HTML."
  },
  {
    "id": "ch-6-q1",
    "chapterId": "ch-6",
    "type": "single",
    "question": "¿Qué propiedad indica el tipo de un nodo en el JCR?",
    "options": [
      "sling:resourceType",
      "jcr:primaryType",
      "cq:template"
    ],
    "answer": [
      1
    ],
    "explanation": "jcr:primaryType define el tipo del nodo (cq:Page, nt:unstructured, dam:Asset...). sling:resourceType indica qué componente lo renderiza."
  },
  {
    "id": "ch-6-q2",
    "chapterId": "ch-6",
    "type": "single",
    "question": "En una página, ¿en qué nodo están el título, la plantilla y los componentes?",
    "options": [
      "En el nodo cq:Page de la página.",
      "En su nodo hijo jcr:content.",
      "En /conf."
    ],
    "answer": [
      1
    ],
    "explanation": "El nodo cq:Page es solo un contenedor; jcr:content (tipo cq:PageContent) guarda las propiedades y, dentro de sus contenedores, los componentes."
  },
  {
    "id": "ch-6-q3",
    "chapterId": "ch-6",
    "type": "single",
    "question": "Creaste nodos en CRXDE Lite y al recargar desaparecieron. ¿Qué pasó?",
    "options": [
      "CRXDE Lite borra los nodos nuevos cada hora.",
      "No pulsaste Save All, así que los cambios nunca se guardaron.",
      "Los nodos solo existen en Publish."
    ],
    "answer": [
      1
    ],
    "explanation": "CRXDE Lite acumula los cambios hasta pulsar Save All. Mientras tanto no están en el repositorio."
  },
  {
    "id": "ch-6-q4",
    "chapterId": "ch-6",
    "type": "single",
    "question": "¿Dónde está disponible CRXDE Lite si trabajas con AEM as a Cloud Service?",
    "options": [
      "En todos los entornos de Cloud Service.",
      "Solo en el SDK local; en la nube se inspecciona con la Developer Console en modo lectura.",
      "Solo en producción."
    ],
    "answer": [
      1
    ],
    "explanation": "Adobe indica que CRXDE Lite solo está disponible en el entorno de desarrollo local. En la nube se usa el navegador de repositorio de la Developer Console."
  },
  {
    "id": "ch-6-q5",
    "chapterId": "ch-6",
    "type": "multiple",
    "question": "¿Qué contiene un paquete de contenido de AEM?",
    "options": [
      "META-INF/vault/filter.xml con las rutas que abarca",
      "Una carpeta jcr_root que reproduce el árbol del repositorio",
      "Archivos .content.xml con las propiedades de los nodos",
      "Una copia de la base de datos SQL de AEM"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Un paquete es un zip en formato FileVault: filtros y metadatos en META-INF/vault y el contenido en jcr_root. AEM no usa una base de datos SQL."
  },
  {
    "id": "ch-6-q6",
    "chapterId": "ch-6",
    "type": "single",
    "question": "Creas un paquete, editas sus filtros y lo descargas, pero pesa 0 bytes. ¿Qué faltó?",
    "options": [
      "Hacer Build.",
      "Hacer Install.",
      "Publicar el paquete."
    ],
    "answer": [
      0
    ],
    "explanation": "Build es lo que copia el contenido de los filtros al zip. Sin Build, el paquete solo tiene su definición."
  },
  {
    "id": "ch-6-q7",
    "chapterId": "ch-6",
    "type": "single",
    "question": "Instalas un paquete con filtro /content/practica creado hace un mes. ¿Qué riesgo corres?",
    "options": [
      "Ninguno: los paquetes solo agregan contenido.",
      "Perder el contenido creado en esa ruta desde entonces, porque por defecto la rama se reemplaza.",
      "Que se desinstale AEM."
    ],
    "answer": [
      1
    ],
    "explanation": "Por defecto cada filter root se reemplaza por lo que trae el paquete: lo que exista en la instancia y no en el paquete se elimina. Test Install ayuda a comprobarlo antes."
  },
  {
    "id": "ch-6-q8",
    "chapterId": "ch-6",
    "type": "single",
    "question": "En un .content.xml aparece cantidad=\"{Long}42\". ¿Qué indica {Long}?",
    "options": [
      "Que el valor es muy largo.",
      "El tipo de la propiedad: un número entero.",
      "Que la propiedad es multivalor."
    ],
    "answer": [
      1
    ],
    "explanation": "FileVault indica el tipo con una pista entre llaves ({Boolean}, {Long}, {Date}...). Los String no llevan pista y los multivalor se escriben entre corchetes."
  },
  {
    "id": "ch-6-q9",
    "chapterId": "ch-6",
    "type": "single",
    "question": "En AEM as a Cloud Service, ¿qué puede instalarse con Package Manager?",
    "options": [
      "Código de /apps y contenido.",
      "Solo contenido mutable (/content, /conf...); el código llega por Cloud Manager.",
      "Nada: Package Manager no existe en Cloud."
    ],
    "answer": [
      1
    ],
    "explanation": "En Cloud Service /apps y /libs son inmutables. Package Manager solo instala contenido mutable; el código se despliega con los pipelines de Cloud Manager."
  },
  {
    "id": "ch-6-q10",
    "chapterId": "ch-6",
    "type": "single",
    "question": "Cuando un autor aplica un estilo del Style System, ¿qué se guarda en el nodo del componente?",
    "options": [
      "La clase CSS directamente en una propiedad class.",
      "Un identificador en cq:styleIds, que se traduce a clase CSS con la política de /conf.",
      "Un archivo CSS nuevo en /apps."
    ],
    "answer": [
      1
    ],
    "explanation": "El componente guarda ids en cq:styleIds; la política de la plantilla en /conf relaciona cada id con sus clases CSS. Así el diseño se cambia sin editar cada página."
  },
  {
    "id": "ch-7-q1",
    "chapterId": "ch-7",
    "type": "single",
    "question": "¿Qué es un bundle en OSGi?",
    "options": [
      "Un paquete de contenido del repositorio.",
      "Un archivo .jar con metadatos que declaran qué paquetes Java exporta e importa.",
      "Una página de la Web Console."
    ],
    "answer": [
      1
    ],
    "explanation": "Un bundle es un .jar con un MANIFEST.MF que declara Export-Package e Import-Package. El módulo core de un proyecto AEM se compila como bundle."
  },
  {
    "id": "ch-7-q2",
    "chapterId": "ch-7",
    "type": "single",
    "question": "Tu bundle quedó en estado Installed después de desplegar. ¿Cuál es la causa más probable?",
    "options": [
      "Está funcionando correctamente.",
      "Algún paquete de su Import-Package no lo exporta ningún bundle en una versión compatible.",
      "Alguien lo detuvo manualmente."
    ],
    "answer": [
      1
    ],
    "explanation": "Installed significa que no se resolvieron sus dependencias. En el detalle del bundle, los Imported Packages sin resolver aparecen con \"Cannot be resolved\"."
  },
  {
    "id": "ch-7-q3",
    "chapterId": "ch-7",
    "type": "single",
    "question": "¿Qué herramienta de la Web Console indica qué bundle exporta un paquete Java?",
    "options": [
      "/system/console/depfinder",
      "/system/console/requests",
      "/system/console/slinglog"
    ],
    "answer": [
      0
    ],
    "explanation": "Depfinder (Dependency Finder) busca qué bundle exporta un paquete y en qué versión."
  },
  {
    "id": "ch-7-q4",
    "chapterId": "ch-7",
    "type": "single",
    "question": "Un componente aparece como \"unsatisfied (reference)\". ¿Qué significa?",
    "options": [
      "Le falta un servicio obligatorio del que depende.",
      "Falló su código al activarse.",
      "Está deshabilitado a propósito."
    ],
    "answer": [
      0
    ],
    "explanation": "Una referencia insatisfecha indica que ningún servicio disponible cumple una dependencia obligatoria (cardinalidad 1..1). El detalle muestra cuál."
  },
  {
    "id": "ch-7-q5",
    "chapterId": "ch-7",
    "type": "single",
    "question": "Un componente en estado \"satisfied\" pero no \"active\", ¿es un problema?",
    "options": [
      "Sí, siempre indica un error.",
      "No necesariamente: tiene todo lo necesario y se creará cuando alguien lo use.",
      "Sí, significa que su bundle está en Installed."
    ],
    "answer": [
      1
    ],
    "explanation": "Los componentes DS pueden ser perezosos: se crean al primer uso. Satisfied significa que no les falta nada."
  },
  {
    "id": "ch-7-q6",
    "chapterId": "ch-7",
    "type": "multiple",
    "question": "Sobre los cambios hechos en Configuration Manager, ¿qué afirmaciones son correctas?",
    "options": [
      "Se aplican en caliente, sin reiniciar.",
      "Solo existen en esa instancia: no están en Git ni llegan a otros entornos.",
      "Son la forma recomendada de configurar producción.",
      "En AEM as a Cloud Service no se pueden hacer porque no hay Web Console."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Configuration Manager sirve para probar valores. Las configuraciones definitivas van como archivos .cfg.json en el proyecto; en Cloud Service la Web Console no existe."
  },
  {
    "id": "ch-7-q7",
    "chapterId": "ch-7",
    "type": "single",
    "question": "¿Cómo se nombra el archivo de una instancia de factory configuration en un proyecto?",
    "options": [
      "<PID>.cfg.json",
      "<PID>~<nombre>.cfg.json",
      "<nombre>.xml"
    ],
    "answer": [
      1
    ],
    "explanation": "El ~ separa el PID de la factory del nombre de la instancia. Nombrarlas tú (por ejemplo ~misitio) permite que cada despliegue actualice siempre la misma instancia."
  },
  {
    "id": "ch-7-q8",
    "chapterId": "ch-7",
    "type": "single",
    "question": "Creas un logger con Log Level DEBUG, Logger com.misitio y Additive desmarcado. ¿Qué logras?",
    "options": [
      "Que todo AEM registre en DEBUG.",
      "Que los mensajes DEBUG de com.misitio y subpaquetes vayan a su archivo sin duplicarse en error.log.",
      "Que se borre error.log."
    ],
    "answer": [
      1
    ],
    "explanation": "El logger captura solo los paquetes indicados, con el nivel mínimo elegido. Additive desmarcado evita duplicar esos mensajes en error.log."
  },
  {
    "id": "ch-7-q9",
    "chapterId": "ch-7",
    "type": "single",
    "question": "En Recent Requests, ¿qué te dice la entrada ServletResolution?",
    "options": [
      "El tiempo total de la petición.",
      "Qué script o servlet atendió la petición.",
      "Qué usuario hizo la petición."
    ],
    "answer": [
      1
    ],
    "explanation": "ServletResolution indica qué script o servlet eligió Sling. ResourceResolution indica en qué recurso se convirtió la URL."
  },
  {
    "id": "ch-7-q10",
    "chapterId": "ch-7",
    "type": "single",
    "question": "En AEM as a Cloud Service, ¿cómo revisas el estado de bundles y configuraciones de un entorno?",
    "options": [
      "Con /system/console en ese entorno.",
      "Con la Developer Console, que se abre desde Cloud Manager y es de solo lectura.",
      "No es posible revisarlo."
    ],
    "answer": [
      1
    ],
    "explanation": "La Web Console solo existe en el SDK local. La Developer Console ofrece bundles, componentes y configuraciones en solo lectura; los cambios se hacen en el código."
  }
];
