// Banco de preguntas del Módulo 3: Componentes, HTL y Diálogos Básicos
export default [
  {
    "id": "ch-16-q1",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Qué tipo de nodo define un componente en AEM?",
    "options": [
      "cq:Page",
      "cq:Component",
      "nt:unstructured",
      "sling:Folder"
    ],
    "answer": [
      1
    ],
    "explanation": "Un componente es un nodo cq:Component en /apps. Las instancias en las páginas lo referencian con sling:resourceType."
  },
  {
    "id": "ch-16-q2",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Qué efecto tiene componentGroup=\".hidden\"?",
    "options": [
      "Oculta el componente en la página publicada.",
      "Impide que el componente se despliegue.",
      "Oculta el componente del panel de componentes del editor, aunque puede seguir usándose por herencia.",
      "Hace que el componente solo sea visible para administradores."
    ],
    "answer": [
      2
    ],
    "explanation": "Las versiones de un componente se ocultan con .hidden para que los autores solo vean el proxy."
  },
  {
    "id": "ch-16-q3",
    "chapterId": "ch-16",
    "type": "multiple",
    "question": "¿Qué nodos especiales pueden formar parte de un componente?",
    "options": [
      "cq:dialog",
      "cq:editConfig",
      "cq:template",
      "cq:PageContent"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "cq:dialog (campos del autor), cq:editConfig (comportamiento en el editor) y cq:template (valores iniciales). cq:PageContent es el tipo de jcr:content de una página."
  },
  {
    "id": "ch-16-q4",
    "chapterId": "ch-16",
    "type": "single",
    "question": "En el cq:editConfig del Aviso, ¿qué hace afteredit=\"REFRESH_SELF\"?",
    "options": [
      "Recarga toda la página tras editar.",
      "Recarga solo el componente editado.",
      "Publica el componente automáticamente.",
      "Cierra el diálogo sin guardar."
    ],
    "answer": [
      1
    ],
    "explanation": "REFRESH_SELF vuelve a renderizar solo el componente después de guardar el diálogo."
  },
  {
    "id": "ch-16-q5",
    "chapterId": "ch-16",
    "type": "single",
    "question": "En el patrón versionado + proxy, ¿a qué componente apunta el sling:resourceType del contenido de las páginas?",
    "options": [
      "A la última versión (por ejemplo base/aviso/v2/aviso).",
      "Al proxy (por ejemplo practica/components/aviso).",
      "Directamente al Core Component en /libs.",
      "A la primera versión, para mantener compatibilidad."
    ],
    "answer": [
      1
    ],
    "explanation": "El contenido siempre apunta al proxy; así, cambiar de versión es cambiar una línea del proxy sin tocar el contenido."
  },
  {
    "id": "ch-16-q6",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Cómo se pasa el componente Aviso de la versión 1 a la versión 2?",
    "options": [
      "Actualizando el sling:resourceType de cada instancia en las páginas.",
      "Borrando la v1 del repositorio.",
      "Cambiando el sling:resourceSuperType del proxy a la v2.",
      "Renombrando la carpeta v2 como v1."
    ],
    "answer": [
      2
    ],
    "explanation": "El proxy hereda de la versión indicada en sling:resourceSuperType. Cambiarlo actualiza todas las instancias y es reversible."
  },
  {
    "id": "ch-16-q7",
    "chapterId": "ch-16",
    "type": "multiple",
    "question": "El diálogo de la v2 solo define el campo titulo. ¿Qué es cierto?",
    "options": [
      "El Resource Merger combina ese diálogo con el heredado de la v1.",
      "Debe repetir la misma ruta de nodos que el diálogo de la v1.",
      "sling:orderBefore=\"texto\" coloca el campo antes del campo texto heredado.",
      "Los campos texto y tipo desaparecen porque no se repiten."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Solo se definen las diferencias; los campos no mencionados siguen apareciendo, heredados."
  },
  {
    "id": "ch-16-q8",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Cuál de estos cambios justifica crear una versión nueva del componente?",
    "options": [
      "Corregir una falta de ortografía en la etiqueta de un campo.",
      "Agregar un campo opcional que no altera el HTML existente.",
      "Renombrar una propiedad que ya guarda contenido y cambiar la estructura del HTML.",
      "Cambiar la descripción del componente."
    ],
    "answer": [
      2
    ],
    "explanation": "Los cambios incompatibles (propiedades renombradas, HTML distinto) requieren una versión nueva; los compatibles se hacen en la versión actual."
  },
  {
    "id": "ch-16-q9",
    "chapterId": "ch-16",
    "type": "multiple",
    "question": "Un proxy que hereda de core/wcm/components/title/v3/title, sin otros archivos, ¿qué obtiene del Core Component?",
    "options": [
      "El script HTL.",
      "El diálogo.",
      "El Sling Model usado por el HTL.",
      "Su jcr:title y su componentGroup."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Se heredan scripts, diálogos, configuración de edición y la lógica que el HTL usa. El título y el grupo los define cada componente."
  },
  {
    "id": "ch-16-q10",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Cómo se oculta un campo heredado del diálogo de un Core Component, como el campo id del Título?",
    "options": [
      "Borrándolo de /libs o de /apps/core.",
      "Repitiendo su nodo en el diálogo del proxy con sling:hideResource=\"{Boolean}true\".",
      "Poniéndole componentGroup=\".hidden\".",
      "Copiando el diálogo completo y quitando el campo."
    ],
    "answer": [
      1
    ],
    "explanation": "sling:hideResource indica al Resource Merger que oculte ese nodo heredado, sin copiar ni modificar el original."
  },
  {
    "id": "ch-16-q11",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Cuál es el orden recomendado para personalizar un Core Component, de menor a mayor impacto?",
    "options": [
      "HTML, lógica, diálogo, estilos",
      "Estilos, diálogo, HTML, lógica",
      "Lógica, HTML, estilos, diálogo",
      "Diálogo, lógica, estilos, HTML"
    ],
    "answer": [
      1
    ],
    "explanation": "Usa la opción de menor impacto que resuelva la necesidad: cuanto menos copies, más correcciones de Adobe recibes al actualizar."
  },
  {
    "id": "ch-16-q12",
    "chapterId": "ch-16",
    "type": "single",
    "question": "Si sobrescribes title.html en tu proxy del Título, ¿qué dejas de recibir en futuras versiones de Core Components?",
    "options": [
      "Todo: el componente deja de heredar.",
      "Los cambios que Adobe haga en ese script; el diálogo y el Sling Model se siguen heredando.",
      "Solo los cambios del diálogo.",
      "Nada, el HTL se combina automáticamente."
    ],
    "answer": [
      1
    ],
    "explanation": "Un script con el mismo nombre reemplaza al heredado; el resto (diálogo, modelo, otros scripts) se sigue heredando."
  },
  {
    "id": "ch-16-q13",
    "chapterId": "ch-16",
    "type": "single",
    "question": "¿Qué hace el plugin htl-maven-plugin durante el build del proyecto?",
    "options": [
      "Publica los scripts HTL en AEM.",
      "Valida la sintaxis de los scripts HTL y detiene el build si hay errores.",
      "Convierte HTL en JSP.",
      "Minifica el HTML generado."
    ],
    "answer": [
      1
    ],
    "explanation": "La validación indica archivo, línea y columna del error, y evita que un HTL roto llegue a AEM."
  },
  {
    "id": "ch-17-q1",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Dónde se ejecuta HTL?",
    "options": [
      "En el navegador, como JavaScript.",
      "En el servidor de AEM; el navegador recibe HTML puro.",
      "En el Dispatcher.",
      "En el CDN."
    ],
    "answer": [
      1
    ],
    "explanation": "HTL se compila y ejecuta en AEM; el navegador nunca ve expresiones ni atributos data-sly-*."
  },
  {
    "id": "ch-17-q2",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué imprime ${properties.titulo || 'Sin título'} si la propiedad titulo no existe?",
    "options": [
      "null",
      "false",
      "Sin título",
      "Un error de compilación"
    ],
    "answer": [
      2
    ],
    "explanation": "|| devuelve el primer valor verdadero; una propiedad inexistente es falsa."
  },
  {
    "id": "ch-17-q3",
    "chapterId": "ch-17",
    "type": "multiple",
    "question": "¿Cuáles de estos valores cuentan como falsos en HTL?",
    "options": [
      "0",
      "'' (texto vacío)",
      "[] (colección vacía)",
      "'false' (texto)"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "El texto 'false' no está vacío, así que es verdadero."
  },
  {
    "id": "ch-17-q4",
    "chapterId": "ch-17",
    "type": "single",
    "question": "La propiedad cantidad se guardó como el texto \"3\". ¿Qué devuelve ${properties.cantidad == 3}?",
    "options": [
      "true, HTL convierte los tipos.",
      "false, la comparación es estricta y no convierte tipos.",
      "Un error.",
      "3"
    ],
    "answer": [
      1
    ],
    "explanation": "== funciona como === de JavaScript: texto contra número es falso."
  },
  {
    "id": "ch-17-q5",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué diferencia hay entre data-sly-list y data-sly-repeat?",
    "options": [
      "Ninguna, son sinónimos.",
      "list repite el contenido del elemento; repeat repite el elemento completo.",
      "list solo recorre mapas y repeat solo arreglos.",
      "repeat no ofrece la variable de estado itemList."
    ],
    "answer": [
      1
    ],
    "explanation": "Con list el <ul> aparece una vez y se repiten los <li>; con repeat se repite la etiqueta donde está la directiva."
  },
  {
    "id": "ch-17-q6",
    "chapterId": "ch-17",
    "type": "single",
    "question": "En un ciclo data-sly-list.hija, ¿qué contiene hijaList.count?",
    "options": [
      "El total de elementos.",
      "La posición actual empezando en 1.",
      "La posición actual empezando en 0.",
      "El número de elementos restantes."
    ],
    "answer": [
      1
    ],
    "explanation": "index empieza en 0 y count en 1; first, last, middle, odd y even completan el estado."
  },
  {
    "id": "ch-17-q7",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué contexto se debe usar para imprimir el HTML de un Rich Text Editor de forma segura?",
    "options": [
      "text",
      "unsafe",
      "html",
      "uri"
    ],
    "answer": [
      2
    ],
    "explanation": "html conserva las etiquetas seguras y elimina scripts y atributos peligrosos; unsafe desactiva toda protección."
  },
  {
    "id": "ch-17-q8",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué ocurre con <div style=\"color: ${properties.color}\"> sin opción context?",
    "options": [
      "Se imprime el color escapado como atributo.",
      "La expresión se reemplaza por texto vacío y el validador del proyecto lo marca.",
      "AEM lanza un error 500.",
      "Se aplica el contexto styleToken automáticamente."
    ],
    "answer": [
      1
    ],
    "explanation": "En style, on* y dentro de script o style el contexto es obligatorio; sin él la expresión no imprime nada."
  },
  {
    "id": "ch-17-q9",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué devuelve ${'/content/practica/us/en' @ extension='html'}?",
    "options": [
      "/content/practica/us/en",
      "/content/practica/us/en.html",
      "/content/practica/us/en/html",
      "en.html"
    ],
    "answer": [
      1
    ],
    "explanation": "La opción extension agrega o cambia la extensión de una URL."
  },
  {
    "id": "ch-17-q10",
    "chapterId": "ch-17",
    "type": "single",
    "question": "Cuando un elemento tiene data-sly-list y data-sly-test, ¿cuál se evalúa primero?",
    "options": [
      "data-sly-list",
      "data-sly-test",
      "El que esté escrito a la izquierda",
      "Se evalúan a la vez"
    ],
    "answer": [
      1
    ],
    "explanation": "test (prioridad 2) va antes que list (prioridad 7); por eso la variable del ciclo no existe todavía en la prueba."
  },
  {
    "id": "ch-17-q11",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué elementos acepta data-sly-element?",
    "options": [
      "Cualquier etiqueta, incluida script.",
      "Solo etiquetas de una lista permitida (h1–h6, p, div, section...); script, style, form o input se rechazan.",
      "Solo h1 a h6.",
      "Solo div y span."
    ],
    "answer": [
      1
    ],
    "explanation": "El contexto elementName valida el nombre contra una lista segura."
  },
  {
    "id": "ch-17-q12",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Qué produce <p data-sly-unwrap>Hola</p>?",
    "options": [
      "<p>Hola</p>",
      "Hola",
      "Nada",
      "<sly>Hola</sly>"
    ],
    "answer": [
      1
    ],
    "explanation": "unwrap quita la etiqueta y conserva el contenido; <sly> hace lo mismo siempre."
  },
  {
    "id": "ch-17-q13",
    "chapterId": "ch-17",
    "type": "single",
    "question": "¿Por qué falló ${'Creada el {0}' @ format=['dd/MM/yyyy' @ format=fecha]}?",
    "options": [
      "Porque format no admite fechas.",
      "Porque las opciones @ no se pueden anidar dentro de otra expresión; se resuelve con data-sly-set.",
      "Porque faltaba type='string'.",
      "Porque {0} solo acepta números."
    ],
    "answer": [
      1
    ],
    "explanation": "El validador respondió 'no viable alternative at input'; se formatea la fecha en una variable y luego se inserta."
  }
];
