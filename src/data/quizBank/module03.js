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
  },
  {
    "id": "ch-18-q1",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Qué hace data-sly-include?",
    "options": [
      "Renderiza otro recurso del JCR con su propio componente.",
      "Ejecuta otro script sobre el mismo recurso y pone su salida en lugar del elemento.",
      "Carga un Sling Model.",
      "Declara una plantilla reutilizable."
    ],
    "answer": [
      1
    ],
    "explanation": "include organiza un componente en archivos; trabaja sobre el mismo recurso y la misma petición."
  },
  {
    "id": "ch-18-q2",
    "chapterId": "ch-18",
    "type": "multiple",
    "question": "En promo.html se crea una variable con data-sly-set y luego se incluye encabezado.html. ¿Qué puede usar encabezado.html?",
    "options": [
      "properties del Promo",
      "currentPage",
      "La variable creada con data-sly-set en promo.html",
      "wcmmode"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "El parcial comparte los objetos globales porque trabaja sobre el mismo recurso, pero no ve las variables locales del script que lo incluye."
  },
  {
    "id": "ch-18-q3",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Qué ocurre con el elemento que lleva data-sly-call?",
    "options": [
      "Desaparece siempre.",
      "Se conserva y su contenido se reemplaza por la salida de la plantilla.",
      "Se duplica por cada parámetro.",
      "Se convierte en <template>."
    ],
    "answer": [
      1
    ],
    "explanation": "Con <li data-sly-call> obtienes el <li> con la plantilla dentro; con <sly> no queda ningún elemento alrededor."
  },
  {
    "id": "ch-18-q4",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Cómo se usan plantillas declaradas en otro archivo?",
    "options": [
      "Con data-sly-include del archivo.",
      "Cargando el archivo con data-sly-use y llamando a variable.nombrePlantilla con data-sly-call.",
      "Con data-sly-resource.",
      "Copiándolas, no se pueden compartir."
    ],
    "answer": [
      1
    ],
    "explanation": "Por ejemplo data-sly-use.tpl=\"practica/components/commons/templates.html\" y luego data-sly-call=\"${tpl.boton @ ...}\"."
  },
  {
    "id": "ch-18-q5",
    "chapterId": "ch-18",
    "type": "single",
    "question": "Una plantilla declara ${@ texto, estilo='primario o secundario'} y se llama sin pasar estilo. ¿Cuánto vale estilo dentro?",
    "options": [
      "'primario o secundario'",
      "'' (texto vacío)",
      "null y la llamada falla",
      "'primario'"
    ],
    "answer": [
      1
    ],
    "explanation": "El texto tras = en la declaración es solo una pista para quien lee; un parámetro no pasado vale texto vacío. El valor por defecto se da con ||."
  },
  {
    "id": "ch-18-q6",
    "chapterId": "ch-18",
    "type": "multiple",
    "question": "¿Qué caracteriza a data-sly-resource?",
    "options": [
      "Hace una petición interna nueva para otro recurso.",
      "El componente incluido usa sus propios scripts, modelo y diálogo.",
      "Recibe parámetros como una plantilla.",
      "Con un nodo hijo relativo, el autor puede editar la pieza por separado."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "No recibe parámetros como una plantilla; acepta opciones como resourceType o selectores."
  },
  {
    "id": "ch-18-q7",
    "chapterId": "ch-18",
    "type": "single",
    "question": "Con data-sly-resource=\"${'aviso' @ resourceType='practica/components/aviso'}\", ¿qué pasa si el nodo hijo aviso no existe?",
    "options": [
      "Se lanza un error 404.",
      "Sling lo dibuja con el componente indicado y AEM crea el nodo cuando el autor guarda su diálogo.",
      "No se muestra nada hasta crear el nodo a mano en CRXDE.",
      "Se crea el nodo al publicar la página."
    ],
    "answer": [
      1
    ],
    "explanation": "resourceType indica con qué componente renderizar un recurso que todavía no existe; al editarlo, AEM crea el nodo."
  },
  {
    "id": "ch-18-q8",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Por qué el Teaser de Core Components carga title.html con una ruta relativa?",
    "options": [
      "Por rendimiento.",
      "Para que un proxy pueda sobrescribir solo ese archivo y heredar el resto.",
      "Porque las rutas absolutas no funcionan en HTL.",
      "Para que el autor elija el título."
    ],
    "answer": [
      1
    ],
    "explanation": "Las rutas relativas se buscan en el componente del recurso y su cadena de herencia, así que el proxy puede reemplazar una sola pieza."
  },
  {
    "id": "ch-18-q9",
    "chapterId": "ch-18",
    "type": "single",
    "question": "Necesitas el mismo marcado de botón en diez componentes con textos distintos. ¿Qué usas?",
    "options": [
      "data-sly-include",
      "Una plantilla en una biblioteca compartida",
      "data-sly-resource",
      "Copiar el HTML en cada componente"
    ],
    "answer": [
      1
    ],
    "explanation": "Las plantillas con parámetros son la herramienta de reutilización de marcado; un cambio en la biblioteca se refleja en todos."
  },
  {
    "id": "ch-18-q10",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Por qué conviene evitar data-sly-resource dentro de ciclos largos?",
    "options": [
      "Porque no funciona dentro de data-sly-list.",
      "Porque cada uso es una petición interna completa y el costo se multiplica.",
      "Porque crea nodos en cada visita.",
      "Porque desactiva la caché del Dispatcher."
    ],
    "answer": [
      1
    ],
    "explanation": "Resolución, filtros, modelo y script se ejecutan por cada inclusión; si solo repites marcado, usa una plantilla."
  },
  {
    "id": "ch-18-q11",
    "chapterId": "ch-18",
    "type": "single",
    "question": "El build falló con 'token recognition error at: +' en ${currentPage.depth + 2}. ¿Por qué?",
    "options": [
      "depth no existe en Page.",
      "HTL no tiene operadores aritméticos.",
      "Faltaba el contexto number.",
      "Las plantillas no aceptan números."
    ],
    "answer": [
      1
    ],
    "explanation": "HTL no calcula; los cálculos van en un Sling Model o se reciben ya calculados."
  },
  {
    "id": "ch-18-q12",
    "chapterId": "ch-18",
    "type": "single",
    "question": "¿Qué permite una plantilla recursiva como arbol del laboratorio?",
    "options": [
      "Recorrer una estructura de profundidad variable, como el árbol de páginas.",
      "Incluir otros componentes editables.",
      "Cachear el componente.",
      "Evitar el escapado XSS."
    ],
    "answer": [
      0
    ],
    "explanation": "La plantilla se llama a sí misma con cada página hija mientras no se alcance la profundidad máxima."
  },
  {
    "id": "ch-19-q1",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Dónde están los Core Components en AEM as a Cloud Service?",
    "options": [
      "En /apps/core/wcm/components, instalados por el proyecto.",
      "En /libs/core/wcm/components, incluidos y actualizados por Adobe.",
      "En /conf/core.",
      "En el bundle core del proyecto."
    ],
    "answer": [
      1
    ],
    "explanation": "En Cloud vienen con el producto y se actualizan continuamente; en 6.5 los instala el proyecto bajo /apps."
  },
  {
    "id": "ch-19-q2",
    "chapterId": "ch-19",
    "type": "single",
    "question": "En un proyecto 6.5, ¿qué decide la propiedad core.wcm.components.version del pom.xml?",
    "options": [
      "Nada, solo sirve para compilar.",
      "Qué versión de Core Components se instala, porque sus paquetes van embebidos en all.",
      "La versión de AEM.",
      "La versión del arquetipo."
    ],
    "answer": [
      1
    ],
    "explanation": "En 6.5 los paquetes core.wcm.components.content, .core y .config se embeben en all; en Cloud la versión solo se usa para compilar."
  },
  {
    "id": "ch-19-q3",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Por qué los autores no ven directamente 'Button (v2)' de Adobe en el panel de componentes?",
    "options": [
      "Porque está en el grupo oculto .core-wcm.",
      "Porque no tiene diálogo.",
      "Porque solo funciona en 6.5.",
      "Porque requiere licencia."
    ],
    "answer": [
      0
    ],
    "explanation": "Los Core Components originales están en .core-wcm; los autores usan los proxies del proyecto."
  },
  {
    "id": "ch-19-q4",
    "chapterId": "ch-19",
    "type": "multiple",
    "question": "¿Qué tres cosas hacen falta para que un autor use un Core Component en una página?",
    "options": [
      "Un proxy en ui.apps con un grupo visible",
      "Que la política del contenedor permita ese grupo o componente",
      "Copiar el HTL del Core Component",
      "Opcionalmente, una política propia mapeada en la plantilla"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "No hace falta copiar el HTL; el proxy hereda todo."
  },
  {
    "id": "ch-19-q5",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Qué es una política (content policy)?",
    "options": [
      "El permiso de un usuario sobre una página.",
      "La configuración de un componente para una plantilla: opciones permitidas y valores por defecto.",
      "Una regla del Dispatcher.",
      "El diálogo de edición del autor."
    ],
    "answer": [
      1
    ],
    "explanation": "La define quien diseña la plantilla con el diálogo de diseño y aplica a todas las páginas de esa plantilla."
  },
  {
    "id": "ch-19-q6",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Cómo se asigna una política a un componente dentro de una plantilla?",
    "options": [
      "Con sling:resourceSuperType en el proxy.",
      "Con un nodo de mapeo en templates/<plantilla>/policies cuya propiedad cq:policy apunta a la política.",
      "Con componentGroup.",
      "Con una configuración OSGi."
    ],
    "answer": [
      1
    ],
    "explanation": "El mapeo replica la estructura de la plantilla y referencia la política, que vive en /conf/.../policies."
  },
  {
    "id": "ch-19-q7",
    "chapterId": "ch-19",
    "type": "single",
    "question": "En el proyecto, el Title de la cabecera solo permite h1 y el del contenido h2–h6. ¿Cómo es posible con el mismo componente?",
    "options": [
      "Con dos versiones del Core Component.",
      "Con dos políticas distintas mapeadas en distintas partes de la plantilla.",
      "Con dos diálogos de edición.",
      "No es posible."
    ],
    "answer": [
      1
    ],
    "explanation": "Page Title (allowedTypes=h1) y Content Title (h2–h6) se mapean a distintos lugares de la estructura."
  },
  {
    "id": "ch-19-q8",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Qué ocurre si cambias en el XML de ui.content una política que ya existe en la instancia y el filtro usa mode=\"merge\"?",
    "options": [
      "Se actualiza.",
      "No se modifica: merge solo agrega nodos nuevos.",
      "Se borra.",
      "El build falla."
    ],
    "answer": [
      1
    ],
    "explanation": "Con merge el paquete no toca lo existente; sirve para crear políticas la primera vez sin pisar los cambios del Template Editor."
  },
  {
    "id": "ch-19-q9",
    "chapterId": "ch-19",
    "type": "single",
    "question": "En el .model.json de un Title, ¿qué valor tiene :type?",
    "options": [
      "core/wcm/components/title/v3/title",
      "El sling:resourceType del proxy del proyecto",
      "cq:Component",
      "h1"
    ],
    "answer": [
      1
    ],
    "explanation": "El JSON describe tu componente: en la Component Library, por ejemplo, es core-components-examples/components/title."
  },
  {
    "id": "ch-19-q10",
    "chapterId": "ch-19",
    "type": "multiple",
    "question": "¿Qué hace la política del Embed del laboratorio?",
    "options": [
      "Desactiva la URL libre (urlDisabled)",
      "Desactiva el HTML libre (htmlDisabled)",
      "Permite solo el embeddable de YouTube",
      "Reproduce los videos automáticamente"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Limita el Embed a contenido de confianza; la reproducción automática no tiene relación con la política."
  },
  {
    "id": "ch-19-q11",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Qué es el Adobe Client Data Layer?",
    "options": [
      "Una base de datos del servidor.",
      "Una capa de datos en el navegador (window.adobeDataLayer) donde los componentes publican su información y eventos para analítica.",
      "El caché del Dispatcher.",
      "Un índice de Oak."
    ],
    "answer": [
      1
    ],
    "explanation": "Se activa con la configuración de contexto DataLayerConfig y cada componente agrega data-cmp-data-layer."
  },
  {
    "id": "ch-19-q12",
    "chapterId": "ch-19",
    "type": "single",
    "question": "¿Cuál es una desventaja real del patrón proxy?",
    "options": [
      "El contenido queda atado a los tipos de Adobe.",
      "Hay una capa más de indirección y las actualizaciones de Adobe pueden cambiar el marcado, por lo que hay que probarlas.",
      "No se pueden tener dos proxies del mismo Core Component.",
      "No permite políticas."
    ],
    "answer": [
      1
    ],
    "explanation": "Las ventajas son justamente lo contrario: el contenido apunta a tus tipos y puedes tener varios proxies."
  }
];
