// Banco de preguntas del Módulo 2: Creación de Proyectos AEM (6.5 y Cloud Service)
export default [
  {
    "id": "ch-8-q1",
    "chapterId": "ch-8",
    "type": "single",
    "question": "¿Qué es un archetype de Maven?",
    "options": [
      "Un servidor donde se publican los paquetes de AEM.",
      "Una plantilla que genera la estructura completa de un proyecto Maven.",
      "Un plugin que despliega código en AEM."
    ],
    "answer": [
      1
    ],
    "explanation": "Un archetype es una plantilla de proyecto. El AEM Project Archetype genera módulos, POMs, un sitio de ejemplo, el Dispatcher y los perfiles de despliegue."
  },
  {
    "id": "ch-8-q2",
    "chapterId": "ch-8",
    "type": "single",
    "question": "En Maven, ¿qué significa que una dependencia tenga scope provided?",
    "options": [
      "Que se descarga en cada build.",
      "Que se usa para compilar pero no se empaqueta, porque el servidor ya la tiene.",
      "Que solo se usa en las pruebas."
    ],
    "answer": [
      1
    ],
    "explanation": "Las APIs de AEM (aem-sdk-api o uber-jar) son provided: AEM ya las incluye, así que no se meten en el bundle."
  },
  {
    "id": "ch-8-q3",
    "chapterId": "ch-8",
    "type": "multiple",
    "question": "¿Cuáles son las coordenadas de un artefacto Maven?",
    "options": [
      "groupId",
      "artifactId",
      "version",
      "appTitle"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Un artefacto se identifica con groupId, artifactId y version. appTitle es una propiedad del archetype de AEM, no una coordenada."
  },
  {
    "id": "ch-8-q4",
    "chapterId": "ch-8",
    "type": "single",
    "question": "¿Qué valores acepta frontendModule en el AEM Project Archetype 58?",
    "options": [
      "general o none",
      "react, angular o decoupled",
      "general, react o angular"
    ],
    "answer": [
      0
    ],
    "explanation": "Desde la versión 58 el archetype solo genera sitios HTL: frontendModule acepta general o none. Las variantes React, Angular y decoupled existían hasta la 57."
  },
  {
    "id": "ch-8-q5",
    "chapterId": "ch-8",
    "type": "single",
    "question": "Necesitas generar un proyecto nuevo con el SPA Editor en React para estudiar un proyecto existente. ¿Qué haces?",
    "options": [
      "Usar el archetype 58 con frontendModule=react.",
      "Usar el archetype 57, el último que genera variantes SPA.",
      "No es posible generar proyectos React en AEM."
    ],
    "answer": [
      1
    ],
    "explanation": "El archetype 58 eliminó las variantes SPA. Para mantener o estudiar proyectos SPA existentes se usa la 57; para proyectos nuevos Adobe recomienda HTL o headless con Universal Editor."
  },
  {
    "id": "ch-8-q6",
    "chapterId": "ch-8",
    "type": "multiple",
    "question": "¿Qué cambia al generar con aemVersion=cloud en lugar de una versión 6.5?",
    "options": [
      "Depende de aem-sdk-api en lugar del uber-jar.",
      "Genera .cloudmanager/java-version.",
      "El Dispatcher se genera en la variante Cloud.",
      "No se genera el módulo core."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Con cloud el proyecto usa aem-sdk-api, crea .cloudmanager/java-version y genera el Dispatcher para Cloud. El módulo core existe en ambos casos."
  },
  {
    "id": "ch-8-q7",
    "chapterId": "ch-8",
    "type": "single",
    "question": "En PowerShell el comando del archetype falla con parámetros inválidos. ¿Cuál es la causa más común?",
    "options": [
      "Falta ejecutar como administrador.",
      "Los argumentos -D con puntos no están entre comillas y PowerShell los corta.",
      "Maven no funciona en Windows."
    ],
    "answer": [
      1
    ],
    "explanation": "PowerShell interpreta mal valores como com.adobe.aem sin comillas. Cada argumento -D debe ir entre comillas dobles."
  },
  {
    "id": "ch-8-q8",
    "chapterId": "ch-8",
    "type": "single",
    "question": "¿Qué hace mvn clean install -PautoInstallSinglePackage?",
    "options": [
      "Solo compila, sin ejecutar pruebas.",
      "Compila, ejecuta pruebas y además instala el paquete all en AEM Author (localhost:4502).",
      "Publica el sitio en Publish."
    ],
    "answer": [
      1
    ],
    "explanation": "mvn clean install compila, prueba e instala en el repositorio local de Maven; el perfil autoInstallSinglePackage además sube e instala el paquete all en Author."
  },
  {
    "id": "ch-8-q9",
    "chapterId": "ch-8",
    "type": "single",
    "question": "Generaste con language=es y country=mx y singleCountry=y. ¿Dónde está la página inicial del sitio?",
    "options": [
      "/content/practica/es/mx.html",
      "/content/practica/mx/es.html",
      "/content/practica/language-masters/es.html"
    ],
    "answer": [
      1
    ],
    "explanation": "La estructura inicial es /content/<appId>/<country>/<language>. language-masters solo se crea con singleCountry=n."
  },
  {
    "id": "ch-8-q10",
    "chapterId": "ch-8",
    "type": "single",
    "question": "En el Reactor Summary un módulo aparece como FAILURE y los siguientes como SKIPPED. ¿Qué haces?",
    "options": [
      "Ejecutar de nuevo con -DskipTests siempre.",
      "Buscar en la salida el primer [ERROR] del módulo que falló para ver la causa.",
      "Borrar los módulos SKIPPED."
    ],
    "answer": [
      1
    ],
    "explanation": "Cuando un módulo falla, Maven omite los que dependen de él. La causa real está en el primer [ERROR] de la salida."
  },
  {
    "id": "ch-9-q1",
    "chapterId": "ch-9",
    "type": "single",
    "question": "¿Qué módulo reúne todos los paquetes del proyecto en uno solo para desplegarlo?",
    "options": [
      "core",
      "all",
      "ui.apps.structure"
    ],
    "answer": [
      1
    ],
    "explanation": "all es un paquete de tipo container que incrusta ui.apps, core, ui.config y ui.content en carpetas install dentro de /apps/<app>-packages."
  },
  {
    "id": "ch-9-q2",
    "chapterId": "ch-9",
    "type": "single",
    "question": "Un componente de ui.apps solo tiene .content.xml con sling:resourceSuperType=\"core/wcm/components/title/v3/title\". ¿Qué es?",
    "options": [
      "Un componente roto, porque le falta el HTL.",
      "Un componente proxy que hereda todo del Core Component Title v3.",
      "Una plantilla de página."
    ],
    "answer": [
      1
    ],
    "explanation": "Los proxies no tienen código propio: heredan HTL, diálogo y modelo del Core Component. Así las páginas apuntan a tu componente y puedes personalizarlo en un solo lugar."
  },
  {
    "id": "ch-9-q3",
    "chapterId": "ch-9",
    "type": "single",
    "question": "¿Por qué el filter.xml de ui.content usa mode=\"merge\"?",
    "options": [
      "Para que el despliegue sea más rápido.",
      "Para agregar solo lo que no existe y no sobrescribir el contenido que ya crearon los autores.",
      "Porque es obligatorio en todos los paquetes."
    ],
    "answer": [
      1
    ],
    "explanation": "En modo merge, al instalar solo se agregan nodos nuevos. En modo replace (el de ui.apps) la rama queda exactamente como en Git, lo que borraría cambios de autores."
  },
  {
    "id": "ch-9-q4",
    "chapterId": "ch-9",
    "type": "single",
    "question": "En disco ves una carpeta llamada _cq_dialog. ¿A qué nodo corresponde en el repositorio?",
    "options": [
      "_cq_dialog",
      "cq:dialog",
      "dialog"
    ],
    "answer": [
      1
    ],
    "explanation": "FileVault codifica los dos puntos con guiones bajos: _cq_dialog es cq:dialog, _jcr_content es jcr:content y _oak_index es oak:index."
  },
  {
    "id": "ch-9-q5",
    "chapterId": "ch-9",
    "type": "single",
    "question": "¿Para qué sirve package-info.java con @Version en el módulo core?",
    "options": [
      "Para definir la versión de Java.",
      "Para declarar la versión con la que se exporta cada paquete Java a otros bundles.",
      "Para configurar el logger."
    ],
    "answer": [
      1
    ],
    "explanation": "Cada paquete exportado se versiona con @Version. El plugin bnd-baseline avisa si cambias la API sin subir la versión."
  },
  {
    "id": "ch-9-q6",
    "chapterId": "ch-9",
    "type": "multiple",
    "question": "Sobre ui.config, ¿qué afirmaciones son correctas?",
    "options": [
      "Los archivos en config aplican en todas las instancias.",
      "Los archivos en config.author aplican solo en Author.",
      "Las factory configurations se nombran <PID>~<nombre>.cfg.json.",
      "Contiene las páginas iniciales del sitio."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "ui.config organiza configuraciones OSGi por run mode. Las páginas iniciales están en ui.content."
  },
  {
    "id": "ch-9-q7",
    "chapterId": "ch-9",
    "type": "single",
    "question": "¿Qué hace el script repoinit del proyecto generado?",
    "options": [
      "Borra el DAM en cada despliegue.",
      "Crea la carpeta del DAM del sitio y le asigna cq:conf y un título, sin duplicar nada si ya existe.",
      "Instala el Dispatcher."
    ],
    "answer": [
      1
    ],
    "explanation": "Repoinit crea rutas, propiedades, usuarios y permisos de forma declarativa e idempotente."
  },
  {
    "id": "ch-9-q8",
    "chapterId": "ch-9",
    "type": "single",
    "question": "El package.json de ui.frontend trae los scripts sync, aemsyncro y watch. ¿Qué recomienda este manual?",
    "options": [
      "Usarlos siempre para sincronizar con AEM.",
      "Evitarlos, porque usan aemsync, y usar npm run dev con VSCode AEM Sync o despliegues con Maven.",
      "Borrar ui.frontend."
    ],
    "answer": [
      1
    ],
    "explanation": "Esos scripts dependen de aemsync, que en la práctica tiende a corromper la instancia local."
  },
  {
    "id": "ch-9-q9",
    "chapterId": "ch-9",
    "type": "single",
    "question": "Al generar el proyecto en Windows falla con \"El cliente no dispone de un privilegio requerido\" en dispatcher/.../enabled_vhosts. ¿Por qué?",
    "options": [
      "Falta memoria.",
      "La configuración del Dispatcher usa enlaces simbólicos y la terminal no tiene permisos para crearlos.",
      "El archetype no soporta Windows."
    ],
    "answer": [
      1
    ],
    "explanation": "enabled_vhosts y enabled_farms contienen enlaces simbólicos. Hay que generar con permisos de administrador o desde WSL, o usar -DincludeDispatcherConfig=n si solo quieres estudiar el resto."
  },
  {
    "id": "ch-9-q10",
    "chapterId": "ch-9",
    "type": "single",
    "question": "¿Qué valida ui.apps.structure durante el build?",
    "options": [
      "Que el CSS esté minificado.",
      "Que cada ruta de los paquetes cuelgue de una raíz del repositorio declarada para el proyecto.",
      "Que las pruebas de Cypress pasen."
    ],
    "answer": [
      1
    ],
    "explanation": "ui.apps.structure declara las raíces (/apps, /apps/<app>, /content/dam/<app>, /oak:index...) y el plugin de FileVault valida los paquetes contra ellas."
  }
];
