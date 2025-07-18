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
  }
];
