// Metadatos del temario: módulos ordenados por nivel de dificultad.
// Cada tema tiene un track (front | back), un nivel y sus prerrequisitos.
// Los temas con status 'pending' aún no tienen contenido redactado y se
// muestran con su índice planeado (outline).

export const LEVELS = ['Básico', 'Intermedio', 'Avanzado', 'Experto', 'Arquitecto'];

export const TRACKS = {
  front: { label: 'Frontend', short: 'Front' },
  back: { label: 'Backend', short: 'Back' }
};

// Módulos que alimentan cada examen final de certificación
export const certModules = {
  "developer": [
    "module-1",
    "module-2",
    "module-3",
    "module-4",
    "module-5",
    "module-6",
    "module-7",
    "module-8",
    "module-9",
    "module-10",
    "module-11",
    "module-12",
    "module-13",
    "module-14",
    "module-15",
    "module-16",
    "module-17",
    "module-18"
  ],
  "architect": [
    "module-1",
    "module-2",
    "module-5",
    "module-6",
    "module-10",
    "module-11",
    "module-12",
    "module-13",
    "module-15",
    "module-16",
    "module-18",
    "module-19",
    "module-20",
    "module-21"
  ]
};

export const allModules = [
  {
    "id": "module-1",
    "number": 1,
    "title": "Módulo 1: Fundamentos de AEM y Entorno de Trabajo",
    "level": "Básico",
    "chapters": [
      {
        "id": "ch-1",
        "number": "1",
        "title": "Introducción a los CMS y a Adobe Experience Manager: 6.5, 6.5 LTS, Cloud Service y Edge Delivery Services",
        "level": "Básico",
        "track": "back",
        "summary": "Qué es un CMS y sus tipos, qué es AEM y su familia de productos, y cómo elegir entre AEM 6.5, 6.5 LTS, AEM as a Cloud Service y Edge Delivery Services. Incluye un script para reconocer sitios AEM desde el navegador.",
        "prerequisites": []
      },
      {
        "id": "ch-2",
        "number": "2",
        "title": "Arquitectura General de AEM: Author, Publish, Dispatcher, JCR, Sling y OSGi",
        "level": "Básico",
        "track": "back",
        "summary": "El mapa de toda la guía: responsabilidades de Author, Publish, Dispatcher y CDN, capas técnicas (OSGi, Sling, JCR/Oak, HTL), carpetas raíz del repositorio, recorrido de una petición, publicación en 6.5 vs. Cloud y topologías. Incluye diagnóstico con curl y descomposición de URLs de Sling.",
        "prerequisites": []
      },
      {
        "id": "ch-3",
        "number": "3",
        "title": "Preparación del Entorno de Desarrollo: Java, Maven, Git, Node.js e IDE",
        "level": "Básico",
        "track": "back",
        "summary": "Instala y configura paso a paso JDK, Maven, Git, Node.js con nvm y el IDE (IntelliJ IDEA y Visual Studio Code con la extensión VSCode AEM Sync) en Windows, macOS y Linux, con la matriz de versiones para AEM 6.5, 6.5 LTS y Cloud Service, cambio de JDK por proyecto, finales de línea en Git y un script de verificación del entorno.",
        "prerequisites": []
      },
      {
        "id": "ch-4",
        "number": "4",
        "title": "Instalación Local de AEM 6.5 (Quickstart) y AEM SDK para Cloud Service",
        "level": "Básico",
        "track": "back",
        "summary": "Instala desde cero instancias Author (4502) y Publish (4503) con el AEM SDK o el Quickstart de 6.5: conceptos de instancia y run modes, primer arranque paso a paso, verificación, anatomía de crx-quickstart, logs, arranque y parada seguros, scripts, debug remoto, Service Packs, actualización del SDK, snapshots y solución de problemas.",
        "prerequisites": [
          "ch-3"
        ]
      },
      {
        "id": "ch-5",
        "number": "5",
        "title": "Recorrido por las Consolas de AEM y Authoring Básico",
        "level": "Básico",
        "track": "front",
        "summary": "Entrenamiento como autor para desarrolladores: navegación global y consolas, consola Sites a fondo, sitio de práctica (We.Retail o Standard Site Template), creación de páginas, editor y sus modos, propiedades, versiones y publicación, y cómo se guarda una página en el repositorio.",
        "prerequisites": [
          "ch-4"
        ]
      },
      {
        "id": "ch-6",
        "number": "6",
        "title": "Navegación del JCR (CRXDE Lite) y Administración de Paquetes",
        "level": "Básico",
        "track": "back",
        "summary": "El modelo del JCR (nodos, propiedades y tipos), CRXDE Lite para inspeccionar, crear y consultar el repositorio, y Package Manager para crear, instalar y restaurar paquetes de contenido: estructura del zip, filter.xml, .content.xml, riesgos al instalar y diferencias en Cloud Service.",
        "prerequisites": []
      },
      {
        "id": "ch-7",
        "number": "7",
        "title": "OSGi Web Console (/system/console): Bundles, Componentes, Configuraciones y Logs",
        "level": "Básico",
        "track": "back",
        "summary": "OSGi desde cero (bundles, servicios, componentes y configuraciones) y la Web Console para diagnosticarlos: estados de bundles y componentes, Import-Package sin resolver, Configuration Manager y factory configurations, loggers propios, Recent Requests y la Developer Console de Cloud Service.",
        "prerequisites": [
          "ch-4"
        ]
      }
    ]
  },
  {
    "id": "module-2",
    "number": 2,
    "title": "Módulo 2: Creación de Proyectos AEM (6.5 y Cloud Service)",
    "level": "Básico",
    "chapters": [
      {
        "id": "ch-8",
        "number": "8",
        "title": "Cómo Crear un Proyecto AEM con el Maven Archetype",
        "level": "Básico",
        "track": "back",
        "summary": "Maven desde cero, qué es el AEM Project Archetype y todas sus propiedades, decisiones clave (Cloud o 6.5, frontend, idioma, ejemplos), generación paso a paso en bash y PowerShell, primera compilación y despliegue en tu AEM local, y el cambio del archetype 58 que eliminó las variantes React y Angular.",
        "prerequisites": [
          "ch-3",
          "ch-4"
        ]
      },
      {
        "id": "ch-9",
        "number": "9",
        "title": "Anatomía del Proyecto Maven: core, ui.apps, ui.content, ui.config, ui.frontend, all y dispatcher",
        "level": "Básico",
        "track": "back",
        "summary": "Recorrido archivo por archivo del proyecto real que genera el archetype 58: POM raíz, core (bnd y versionado de paquetes), ui.apps (proxies y FileVault), ui.apps.structure, ui.config (run modes y repoinit), ui.content (modo merge), ui.frontend (scripts de npm), all (paquete contenedor), dispatcher y pruebas.",
        "prerequisites": [
          "ch-8"
        ]
      },
      {
        "id": "ch-10",
        "number": "10",
        "title": "FileVault a Fondo: filter.xml, Modos de Importación y Tipos de Paquete",
        "level": "Básico",
        "track": "back",
        "summary": "Qué es FileVault, el formato .content.xml con nodos anidados, reglas include/exclude de filter.xml, los cinco modos de importación probados con un paquete construido a mano, tipos de paquete y reglas de Cloud Service, repoinit frente a ui.content y migración de grandes volúmenes con VLT-RCP.",
        "prerequisites": [
          "ch-6",
          "ch-9"
        ]
      },
      {
        "id": "ch-11",
        "number": "11",
        "title": "Laboratorio: Proyecto AEM 6.5 Estándar (HTL) desde Cero",
        "level": "Básico",
        "track": "back",
        "summary": "Laboratorio completo en AEM 6.5: elegir la versión según el Service Pack, generar, compilar y desplegar, qué cambia frente a Cloud (uber-jar y Core Components incrustados) y construir un componente propio con diálogo, HTL, Sling Model, prueba unitaria y estilos, más los ajustes para AEM 6.5 LTS.",
        "prerequisites": [
          "ch-4",
          "ch-8",
          "ch-9",
          "ch-10"
        ]
      },
      {
        "id": "ch-12",
        "number": "12",
        "title": "Laboratorio: Proyecto AEM as a Cloud Service Estándar desde Cero",
        "level": "Básico",
        "track": "back",
        "summary": "Laboratorio en AEM as a Cloud Service: alinear el proyecto con el SDK, compilar y leer el AEM Analyser (y actualizarlo), desplegar en el SDK, llevar el mismo componente del laboratorio 6.5, provocar y corregir un error de validación, preparar el repositorio para Cloud Manager y probar en un RDE.",
        "prerequisites": [
          "ch-4",
          "ch-10",
          "ch-11"
        ]
      },
      {
        "id": "ch-13",
        "number": "13",
        "title": "Laboratorio: Proyecto AEM con React (6.5 y Cloud)",
        "level": "Básico",
        "track": "front",
        "summary": "Genera un proyecto con frontendModule=react para 6.5 y para Cloud, entiende la estructura del ui.frontend en React y ejecuta el servidor de desarrollo.",
        "prerequisites": [
          "ch-8"
        ],
        "status": "pending",
        "outline": [
          "Por qué se usa el archetype 57: el 58 ya no genera proyectos React (SPA Editor)",
          "Archetype con frontendModule=react: qué cambia",
          "Estructura de ui.frontend: src, components, import-components",
          "Servidor de desarrollo con proxy a AEM",
          "Diferencias 6.5 vs. Cloud en la variante React",
          "Estado actual del SPA Editor y alternativas recomendadas",
          "Ejercicio práctico"
        ]
      },
      {
        "id": "ch-14",
        "number": "14",
        "title": "Laboratorio: Proyecto AEM con Angular (6.5 y Cloud)",
        "level": "Básico",
        "track": "front",
        "summary": "Genera un proyecto con frontendModule=angular para 6.5 y para Cloud, con la estructura de módulos Angular y el flujo de build hacia clientlibs.",
        "prerequisites": [
          "ch-8"
        ],
        "status": "pending",
        "outline": [
          "Por qué se usa el archetype 57: el 58 ya no genera proyectos Angular (SPA Editor)",
          "Archetype con frontendModule=angular: qué cambia",
          "Estructura de ui.frontend: módulos, componentes y MapTo",
          "Servidor de desarrollo y proxy",
          "Diferencias 6.5 vs. Cloud en la variante Angular",
          "Ejercicio práctico"
        ]
      },
      {
        "id": "ch-15",
        "number": "15",
        "title": "Flujo de Despliegue Local: Perfiles Maven, Sincronización en Caliente y Git Flow",
        "level": "Básico",
        "track": "back",
        "summary": "Optimiza el ciclo editar-desplegar-probar: qué perfil Maven usar en cada caso, sincronización en caliente de archivos y convención de ramas.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Perfiles autoInstallPackage, autoInstallBundle y autoInstallSinglePackage",
          "Desplegar solo un módulo para ahorrar tiempo",
          "Sincronización en caliente con la extensión VSCode AEM Sync (recomendada) y repo tool",
          "Por qué evitar aemsync (watcher de npm): riesgos de corromper la instancia local",
          "Git flow y Conventional Commits en proyectos AEM"
        ]
      }
    ]
  },
  {
    "id": "module-3",
    "number": 3,
    "title": "Módulo 3: Componentes, HTL y Diálogos Básicos",
    "level": "Básico",
    "chapters": [
      {
        "id": "ch-16",
        "number": "16",
        "title": "Creación de Componentes AEM: Estructura JCR y Versionado",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende a construir componentes de AEM desde cero detallando su anatomía en el JCR y las mejores prácticas de versionamiento.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Las Dos Formas de Crear Componentes en AEM",
          "Caso 1: Componente Custom (error-message)",
          "Caso 2: Componente Versionado (login/v1/login)",
          "Tipos de Campos (Fields) Granite UI Comunes (Boilerplate de Diálogos)",
          "Ocultar Campos Dinámicamente (Show/Hide Nativo de AEM)"
        ]
      },
      {
        "id": "ch-17",
        "number": "17",
        "title": "Guía Completa de Directivas y Expresiones HTL",
        "level": "Básico",
        "track": "front",
        "summary": "Domina la sintaxis y directivas del motor HTL (Sightly): variables implícitas, sly attributes, templates, resource merging, XSS escaping y performance.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Guía Completa de Directivas y Expresiones HTL (Sightly)",
          "1. Variables Implícitas (Contexto Global)",
          "2. Directivas de Lógica y Flujo (Sly Attributes)",
          "3. Plantillas y Modularización de Código",
          "4. Escapado Automático por Contexto (Context-Aware Escaping)",
          "5. Recomendaciones de Rendimiento y Buenas Prácticas"
        ]
      },
      {
        "id": "ch-18",
        "number": "18",
        "title": "Modularidad en HTL: Separación de Archivos y Plantillas",
        "level": "Básico",
        "track": "front",
        "summary": "Divide y vencerás. Aprende a modularizar los archivos HTML de tus componentes complejos mediante plantillas sightly e inclusiones locales.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "La Necesidad de Modularidad en HTL",
          "Forma 1: Inclusión Básica (data-sly-include)",
          "Forma 2: Plantillas Parametrizadas (data-sly-template y data-sly-call)",
          "Forma 3: Inclusión de Recursos (data-sly-resource)",
          "Recomendaciones y Buenas Prácticas"
        ]
      },
      {
        "id": "ch-19",
        "number": "19",
        "title": "Componentes Core: Uso y Habilitación mediante Código",
        "level": "Básico",
        "track": "front",
        "summary": "Descubre los componentes base preconstruidos por Adobe y cómo habilitarlos y extenderlos correctamente desde el código.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Introducción a los Core Components",
          "Habilitación en el Proyecto mediante Proxy Components",
          "Ventajas de usar Componentes Proxy",
          "Desventajas de usar Componentes Proxy",
          "Catálogo de Componentes Core de AEM",
          "Personalización del Diálogo (Sling Resource Merger)"
        ]
      },
      {
        "id": "ch-20",
        "number": "20",
        "title": "Herencia de Componentes: sling:resourceType y sling:resourceSuperType",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende a extender Core Components heredando su script HTL, diálogo y Sling Model vía sling:resourceSuperType, sin copiar el componente completo.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Herencia de Componentes: sling:resourceType y sling:resourceSuperType",
          "Cómo Resuelve Sling un Script: la Cadena de Herencia",
          "Sobreescribir Sólo lo Necesario"
        ]
      },
      {
        "id": "ch-21",
        "number": "21",
        "title": "Diálogos Touch UI Básicos: Campos Granite más Usados",
        "level": "Básico",
        "track": "front",
        "summary": "Construye diálogos con los campos de Granite UI que usarás a diario y entiende cómo se guardan sus valores en el JCR.",
        "prerequisites": [
          "ch-45"
        ],
        "status": "pending",
        "outline": [
          "Estructura cq:dialog: tabs, columnas y contenedores",
          "textfield, textarea, numberfield, checkbox, select, pathfield, datepicker",
          "fileupload / imagen y el componente Image",
          "multifield compuesto y dónde se guardan los ítems",
          "cq:design_dialog vs. políticas",
          "Ejercicio: diálogo completo de un componente Card"
        ]
      },
      {
        "id": "ch-22",
        "number": "22",
        "title": "Propiedades de Página en HTL: Propias y Heredadas",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende a leer variables de página y heredar configuraciones de nodos superiores de la ramificación en AEM desde HTL.",
        "prerequisites": [
          "ch-48"
        ],
        "status": "pending",
        "outline": [
          "Propiedades Propias vs. Heredadas",
          "Tipos de Campos Comunes en las Propiedades de Página",
          "Guía Paso a Paso para Extender las Propiedades de Página",
          "Mejores Prácticas en el Diseño de Propiedades de Página"
        ]
      },
      {
        "id": "ch-23",
        "number": "23",
        "title": "Uso de Tags en AEM desde HTL",
        "level": "Básico",
        "track": "front",
        "summary": "Administra y visualiza categorías mediante etiquetas y su renderizado en plantillas HTL.",
        "prerequisites": [
          "ch-32"
        ],
        "status": "pending",
        "outline": [
          "El Framework de Tags (Etiquetas) de AEM",
          "Ventajas y Desventajas de las Etiquetas",
          "Cómo Crear Etiquetas en AEM",
          "Cómo Aplicar Etiquetas a una Página Paso a Paso",
          "Consumo de Etiquetas en HTL y Sling Models"
        ]
      }
    ]
  },
  {
    "id": "module-4",
    "number": 4,
    "title": "Módulo 4: Frontend en AEM: Clientlibs, Estilos y Buenas Prácticas",
    "level": "Básico",
    "chapters": [
      {
        "id": "ch-24",
        "number": "24",
        "title": "Clientlibs (Client Libraries): Buenas Prácticas, Ventajas y Desventajas",
        "level": "Básico",
        "track": "front",
        "summary": "Domina el sistema de gestión de recursos CSS/JS en AEM, políticas de caché, dependencias, allowProxy y sus pros y contras.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "¿Qué es una Clientlib?",
          "Atributos Fundamentales de una Clientlib",
          "Clasificación y Tipos de Clientlibs en AEM",
          "Estructuración de Clientlibs en Proyectos Empresariales",
          "Caso Práctico 1: Clientlib Centralizada para el Componente error-message",
          "Caso Práctico 2: Clientlib Centralizada para el Componente login",
          "Cómo Cargar estas Clientlibs Selectivamente en HTL",
          "Ventajas y Desventajas del Modelo Centralizado",
          "Recomendaciones y Buenas Prácticas de Rendimiento (Web Performance)",
          "Arquitectura y Buenas Prácticas para Escribir CSS y JS en Clientlibs"
        ]
      },
      {
        "id": "ch-25",
        "number": "25",
        "title": "ui.frontend a Fondo: Webpack, Servidor de Desarrollo y Proxy a AEM",
        "level": "Básico",
        "track": "front",
        "summary": "Entiende el pipeline de build del ui.frontend general: entradas, clientlib generator, dev server con recarga en caliente y proxy a una instancia local.",
        "prerequisites": [
          "ch-9"
        ],
        "status": "pending",
        "outline": [
          "webpack.common / dev / prod explicados línea por línea",
          "aem-clientlib-generator y clientlib.config.js",
          "npm run watch vs. npm start (dev server)",
          "Proxy a AEM y cómo probar sin redeploy",
          "Frontend pipeline de Cloud Manager"
        ]
      },
      {
        "id": "ch-26",
        "number": "26",
        "title": "Configuración de SASS o LESS en ui.frontend: Estructura, Ventajas y Desventajas",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende a estructurar de forma modular tus archivos SASS en el módulo ui.frontend y las ventajas y desventajas de los preprocesadores.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Estructura de Carpetas Recomendada para SASS",
          "Ejemplo de main.scss",
          "Ventajas de usar SASS o LESS en AEM",
          "Desventajas de usar SASS o LESS",
          "LESS: Sintaxis y Diferencias frente a SASS"
        ]
      },
      {
        "id": "ch-27",
        "number": "27",
        "title": "Configuración de JavaScript y TypeScript en ui.frontend",
        "level": "Básico",
        "track": "front",
        "summary": "Domina la configuración de TypeScript, empaquetado de Webpack, buenas prácticas (IIFE, namespaces), tipado de variables globales de AEM y la inyección puntual de librerías de framework en proyectos clásicos sin SPA Editor.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Arquitectura de JavaScript en ui.frontend",
          "Módulos ES6 en JavaScript Vanilla",
          "Buenas Prácticas y Optimización de Rendimiento en JS",
          "Integración de TypeScript en el Proyecto AEM",
          "Comparativa: JavaScript Vanilla vs TypeScript en AEM",
          "Inyección de Librerías de Framework en un Proyecto Clásico sin SPA Editor"
        ]
      },
      {
        "id": "ch-28",
        "number": "28",
        "title": "AEM Style System: Configuración de Reglas, Políticas y Buenas Prácticas",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende el funcionamiento del Sistema de Estilos de AEM, configuración de políticas JCR de diseño, uso de currentStyle en HTL y buenas prácticas.",
        "prerequisites": [
          "ch-30"
        ],
        "status": "pending",
        "outline": [
          "¿Qué es el Style System (Sistema de Estilos)?",
          "Ventajas de usar el Style System",
          "Desventajas de usar el Style System",
          "Políticas y Reglas del Style System",
          "Paso 1: Configurar la Política del Componente en el JCR",
          "Paso 2: Leer y Aplicar el Estilo en HTL",
          "Paso 3: Escribir las Hojas de Estilo (SASS)"
        ]
      },
      {
        "id": "ch-29",
        "number": "29",
        "title": "Buenas Prácticas de Maquetación: Semántica, SEO, Accesibilidad y DevTools",
        "level": "Básico",
        "track": "front",
        "summary": "Domina la semántica HTML (divitis vs semántica), la optimización SEO, accesibilidad (ARIA/WCAG) y herramientas de Chrome DevTools (Lighthouse, Core Web Vitals).",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Buenas Prácticas de Maquetación: HTML Semántico, SEO, Accesibilidad y DevTools",
          "1. El Catálogo Definitivo de Etiquetas HTML Semánticas",
          "2. Recomendaciones Específicas por Elemento Visual",
          "3. SEO, Accesibilidad y Rendimiento",
          "Ventajas y Desafíos de Aplicar estos Estándares",
          "4. Validación con Herramientas de Chrome DevTools"
        ]
      }
    ]
  },
  {
    "id": "module-5",
    "number": 5,
    "title": "Módulo 5: Estructuras de Contenido: Templates, Tags, Experience Fragments y Content Fragments",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-30",
        "number": "30",
        "title": "Templates Editables desde el Template Editor: Estructura, Contenido Inicial, Políticas y Layout",
        "level": "Intermedio",
        "track": "front",
        "summary": "Crea y administra plantillas editables desde la consola, entendiendo cada capa (structure, initial, policies) y cómo se guardan en /conf.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Plantillas estáticas vs. editables",
          "Template Types y dónde viven en /conf",
          "Structure, Initial Content y Layout",
          "Políticas de componentes y de página",
          "Habilitar y publicar plantillas",
          "Buenas prácticas: cuántas plantillas y cuándo crear una nueva"
        ]
      },
      {
        "id": "ch-31",
        "number": "31",
        "title": "Creación de Plantillas de Página por Código",
        "level": "Intermedio",
        "track": "front",
        "summary": "Aprende a configurar de forma programática las Editable Templates sin depender del editor visual, manejando estructuras JCR.",
        "prerequisites": [
          "ch-10"
        ],
        "status": "pending",
        "outline": [
          "Concepto de Editable Templates",
          "Estructura JCR de una Plantilla Editable",
          "Definición XML de una Plantilla de Página",
          "Estructura del Contenedor de Layout (structure)"
        ]
      },
      {
        "id": "ch-32",
        "number": "32",
        "title": "Tagging a Fondo: Namespaces, Consola de Tags, Permisos y TagManager API",
        "level": "Intermedio",
        "track": "front",
        "summary": "Diseña una taxonomía de tags, créala en la consola y por código, controla quién puede editarla y consúmela desde Java con TagManager.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Qué es un tag y dónde vive (/content/cq:tags)",
          "Crear namespaces y tags desde la consola",
          "Tags en propiedades de página y en assets",
          "TagManager API: resolve, find y búsqueda por tags",
          "Taxonomía, i18n de tags y gobernanza",
          "Ejercicio: listado de artículos filtrado por tag"
        ]
      },
      {
        "id": "ch-33",
        "number": "33",
        "title": "Experience Fragments (XF) y su Integración en Plantillas",
        "level": "Intermedio",
        "track": "front",
        "summary": "Comprende la naturaleza de los Experience Fragments y aprende a integrarlos de forma fija en tus plantillas por código.",
        "prerequisites": [
          "ch-30"
        ],
        "status": "pending",
        "outline": [
          "¿Qué es un Experience Fragment?",
          "Estructura de Referencia de un XF en código",
          "Lógica de renderizado en HTL"
        ]
      },
      {
        "id": "ch-34",
        "number": "34",
        "title": "Experience Fragments Avanzados: Variaciones, Building Blocks, Header/Footer Global y Exportación a Target",
        "level": "Intermedio",
        "track": "front",
        "summary": "Lleva los Experience Fragments al siguiente nivel: variaciones por canal, header/footer compartido multi-sitio, localización con MSM y ofertas en Adobe Target.",
        "prerequisites": [
          "ch-33",
          "ch-120"
        ],
        "status": "pending",
        "outline": [
          "Variaciones y building blocks",
          "Header y footer globales por idioma y sitio",
          "XF con MSM y Live Copies",
          "Exportación a Adobe Target y a canales externos (.plain.html)",
          "Caché e invalidación de XF en el Dispatcher"
        ]
      },
      {
        "id": "ch-35",
        "number": "35",
        "title": "Creación de Content Fragment Models desde la Consola de AEM",
        "level": "Intermedio",
        "track": "back",
        "summary": "Diseña la estructura, tipos de elemento y validaciones de un Content Fragment Model desde Tools > Assets, antes de consumirlo desde Java.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Creación de Content Fragment Models desde la Consola de AEM",
          "Paso 1: Crear el Modelo desde Tools > Assets > Content Fragment Models",
          "Paso 2: Definir los Elementos y sus Validaciones"
        ]
      },
      {
        "id": "ch-36",
        "number": "36",
        "title": "Launches, Versiones de Página y Flujo de Publicación del Autor",
        "level": "Intermedio",
        "track": "front",
        "summary": "Cómo planifican y publican contenido los autores: versiones, restauraciones, publicación programada y Launches para campañas futuras.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Versionado de páginas y restauración",
          "Publicación inmediata, programada y árbol de publicación",
          "Launches: crear, editar, promover",
          "Workflows de aprobación básicos",
          "Implicaciones para el desarrollador"
        ]
      }
    ]
  },
  {
    "id": "module-6",
    "number": 6,
    "title": "Módulo 6: Fundamentos de Backend: Java, OSGi y Sling",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-37",
        "number": "37",
        "title": "Introducción al Backend en AEM: Java, OSGi, JCR y Fundamentos de Sling Models",
        "level": "Intermedio",
        "track": "back",
        "summary": "Establece los pilares técnicos del desarrollo Java en AEM (OSGi, JCR, Sling), las anotaciones principales de Sling Models y la elección de adaptables.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Introducción al Backend en AEM: Java, OSGi, JCR y Fundamentos de Sling Models",
          "1. Los Tres Pilares del Backend de AEM",
          "2. ¿Qué son los Sling Models?",
          "3. Catálogo Detallado de Anotaciones de Inyección",
          "4. Ejemplo Práctico: Sling Model con Inyecciones y Ubicación Actual",
          "5. Profundización: El Patrón Adapter y la Elección del Adaptable Correcto",
          "6. Ventajas y Desventajas de Usar Java en el Backend de AEM",
          "7. Buenas Prácticas en Sling Models"
        ]
      },
      {
        "id": "ch-38",
        "number": "38",
        "title": "OSGi Declarative Services: @Component, @Reference, @Activate y Ciclo de Vida",
        "level": "Intermedio",
        "track": "back",
        "summary": "Construye servicios OSGi con las anotaciones oficiales de DS, inyecta dependencias y entiende el ciclo de vida de un componente.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Bundle, servicio y componente: diferencias",
          "@Component, service y properties",
          "@Reference: cardinalidad, política estática/dinámica",
          "@Activate, @Modified, @Deactivate",
          "Ejercicio: servicio con dos implementaciones y selección por propiedad"
        ]
      },
      {
        "id": "ch-39",
        "number": "39",
        "title": "Configuraciones OSGi: .cfg.json, Run Modes, Factory Configs, Variables de Entorno y Secretos",
        "level": "Intermedio",
        "track": "back",
        "summary": "Configura servicios por entorno de forma segura: @ObjectClassDefinition, archivos .cfg.json por run mode, factory configs y variables $[env:] / $[secret:] de Cloud.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "@ObjectClassDefinition y @AttributeDefinition",
          "Carpetas config.author, config.publish, config.dev, config.prod",
          "Factory configurations (~nombre)",
          "Variables de entorno y secretos en Cloud Service",
          "Prioridad de resolución y depuración de configs",
          "Ejercicio: cliente de API configurable por entorno"
        ]
      },
      {
        "id": "ch-40",
        "number": "40",
        "title": "Resolución de Peticiones en Sling: URL, Selectores, Extensión, Sufijo y Scripts",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende cómo Sling descompone una URL y elige el script o servlet que la atiende; la base para entender componentes, servlets y el Dispatcher.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Descomposición de la URL: path, selectores, extensión, sufijo",
          "Resource resolution y sling:resourceType",
          "Script resolution: prioridad por selector, extensión y método",
          "Herramienta Recent Requests para depurar",
          "Ejercicio: vista alternativa de un componente con selector"
        ]
      },
      {
        "id": "ch-41",
        "number": "41",
        "title": "Sling Resource Resolver, Resource Merger y Overlays",
        "level": "Intermedio",
        "track": "back",
        "summary": "Domina cómo Sling resuelve una URL a un recurso JCR, el uso de /etc/map y el mecanismo de Resource Merger para overlays limpios entre /libs y /apps.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "De una URL a un Nodo JCR: El Pipeline de Resolución",
          "La API de ResourceResolver en Código",
          "/etc/map: Mapeo Bidireccional de URLs",
          "Resource Merger: La Magia detrás de /libs vs. /apps",
          "Control Fino del Merge: hideChildren, hideProperties, orderBefore",
          "Buenas Prácticas: Overlay Quirúrgico, no Copia Completa",
          "Resource Type Delegation: la Alternativa Preferida al Overlay"
        ]
      },
      {
        "id": "ch-42",
        "number": "42",
        "title": "Sling Filters, Adapters y Ciclo de Vida OSGi Avanzado",
        "level": "Avanzado",
        "track": "back",
        "summary": "Implementa cadenas de Sling Filters, el patrón AdapterFactory para adaptables personalizados y Event Handlers OSGi para lógica reactiva desacoplada.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Sling Filters: Interceptando el Pipeline de Request",
          "Orden de Ejecución: service.ranking y sling.filter.scope",
          "El Patrón AdapterFactory: Adaptables Personalizados",
          "EventHandler: Reaccionando a Eventos OSGi",
          "OSGi Declarative Services vs. Componentes 'Reactivos'",
          "Ciclo de Vida OSGi Avanzado: @Activate, @Modified, @Deactivate"
        ]
      },
      {
        "id": "ch-43",
        "number": "43",
        "title": "JCR API y Sling Resource API: Leer y Escribir Nodos de Forma Segura",
        "level": "Intermedio",
        "track": "back",
        "summary": "Lee, crea, modifica y elimina nodos y propiedades con ResourceResolver, ModifiableValueMap y JCR Session, con commits, rollback y cierre correcto de recursos.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Resource, ValueMap y ModifiableValueMap",
          "ResourceResolver.create / delete / commit / revert",
          "Cuándo bajar a javax.jcr (Node, Session)",
          "Manejo de resolvers de servicio y try-with-resources",
          "Ejercicio: guardar datos de un formulario en /var"
        ]
      },
      {
        "id": "ch-44",
        "number": "44",
        "title": "Service Users y Service User Mapping: Checklist Completo",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende las tres piezas obligatorias para un Service User funcional (creación vía repoinit, Service User Mapping y ACLs) y el bootstrap de contenido con repoinit.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Service Users y Service User Mapping: Checklist Completo",
          "Las Tres Piezas Obligatorias",
          "Repoinit también para Bootstrap de Contenido, no Solo ACLs"
        ]
      }
    ]
  },
  {
    "id": "module-7",
    "number": 7,
    "title": "Módulo 7: Sling Models, Servlets y Lógica de Negocio",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-45",
        "number": "45",
        "title": "Modelos Sling (Sling Models) para Consumo de Diálogos",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende a mapear propiedades del JCR a variables Java mediante anotaciones nativas de Sling Models.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Modelos Sling (Sling Models) para Consumo de Diálogos y Lógica de Componentes",
          "1. El Flujo de Datos: Diálogo ➔ JCR ➔ Sling Model ➔ HTL",
          "2. Mapeo de Campos Granite UI a Tipos de Datos de Java",
          "3. Configuración de Inyección: Valores por Defecto y Opcionalidad",
          "4. Tipos Primitivos vs. Clases Wrapper en la Inyección",
          "5. Modelos Versionados en AEM: Garantizando Retrocompatibilidad",
          "6. Buenas Prácticas definitivas para Modelos de Diálogos",
          "5. Ejemplo Práctico Completo: cq:dialog, Sling Model y HTL"
        ]
      },
      {
        "id": "ch-46",
        "number": "46",
        "title": "Multifields en Modelos Sling - Método 1: Resource API",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende a jugar con listas dinámicas de diálogos (Multifield) leyendo manualmente el JCR con la Resource API.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Multifields en Modelos Sling - Método 1: Resource API (Lectura Manual)",
          "1. La Estructura de Persistencia en el JCR",
          "2. Funcionamiento de la Resource API en Java",
          "3. Ventajas y Desventajas del Método Manual",
          "4. Ejemplo de Implementación Extremo a Extremo"
        ]
      },
      {
        "id": "ch-47",
        "number": "47",
        "title": "Multifields en Modelos Sling - Método 2: Colecciones Bean con @ChildResource",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende la inyección automática de subnodos adaptados a sub-modelos de Sling para colecciones limpias y desacopladas, y cómo evolucionar el esquema de un bean sin duplicar clases (V2).",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Multifields en Modelos Sling - Método 2: Model Beans (Inyección de Modelos Hijos)",
          "1. La Filosofía de Orientación a Objetos",
          "2. La Anotación @ChildResource",
          "3. Ventajas del Enfoque Model Beans",
          "4. Ejemplo de Implementación Extremo a Extremo",
          "5. Configuración Avanzada: Lombok en Sling Models",
          "6. Caso de Uso Complejo: Multifield Anidado (Multifield dentro de otro)",
          "7. Evolución del Esquema: Cómo Versionar un Model Bean sin Romper Contenido Existente"
        ]
      },
      {
        "id": "ch-48",
        "number": "48",
        "title": "Propiedades de Página en Sling Models: Locales y Heredadas",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende a leer variables de página y heredar configuraciones de nodos superiores en Java.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Consumo en Modelos Sling (Java)"
        ]
      },
      {
        "id": "ch-49",
        "number": "49",
        "title": "Content Services y Sling Model Exporter: Exposición de JSON Nativo (.model.json)",
        "level": "Avanzado",
        "track": "back",
        "summary": "Expón cualquier Sling Model como JSON vía el Exporter Framework y Jackson, con selectors .model.json, versionado de contrato y buenas prácticas de seguridad, sin depender de CIF ni SPA Editor.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Problema: JSON sin Duplicar Lógica de Negocio",
          "Arquitectura del Exporter Framework",
          "Anotando el Sling Model con @Exporter",
          "Selectors, Extensión y Resolución en Sling",
          "Content Services: Exponer Colecciones, no solo Componentes",
          "Versionado de Contrato con @JsonView",
          "Seguridad: El Riesgo de la Sobre-exposición",
          "Content Services vs. GraphQL (CIF / Content Fragments)"
        ]
      },
      {
        "id": "ch-50",
        "number": "50",
        "title": "Creación de Servlets desde Cero (GET, POST, PUT, DELETE)",
        "level": "Intermedio",
        "track": "back",
        "summary": "Desarrolla APIs REST personalizadas en AEM implementando Servlets de Sling basados en recursos y rutas.",
        "prerequisites": [
          "ch-40"
        ],
        "status": "pending",
        "outline": [
          "Creación de Servlets desde Cero (GET, POST, PUT, DELETE)",
          "1. Tipos de Servlets y su Registro",
          "2. Buenas Prácticas definitivas en el Desarrollo de Servlets",
          "3. Arquitectura Basada en Contratos (Interfaces)"
        ]
      },
      {
        "id": "ch-51",
        "number": "51",
        "title": "Consumo de APIs desde Modelos OSGi y Contratos",
        "level": "Intermedio",
        "track": "back",
        "summary": "Diseña un cliente HTTP desacoplado en OSGi con interfaces y configuraciones seguras para consumir APIs externas.",
        "prerequisites": [
          "ch-39"
        ],
        "status": "pending",
        "outline": [
          "Diseño Basado en Contratos",
          "Paso 1: Definir la Interfaz de Contrato",
          "Paso 2: Implementar el Servicio OSGi"
        ]
      },
      {
        "id": "ch-52",
        "number": "52",
        "title": "Propiedades de Página Protegidas y OSGi Config (CA-Configs)",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende a gestionar variables de entorno y API Keys protegidas de forma segura utilizando Context-Aware Configurations.",
        "prerequisites": [
          "ch-39"
        ],
        "status": "pending",
        "outline": [
          "El Reto de las Configuraciones por Entorno",
          "Paso 1: Definición de la Configuración en Java",
          "Paso 2: Consumo en un Modelo Sling"
        ]
      },
      {
        "id": "ch-53",
        "number": "53",
        "title": "Internacionalización (i18n) en AEM: Sling i18n",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende a configurar diccionarios de traducción en el JCR y consumirlos en el backend de Sling Models.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Diccionarios Sling i18n",
          "Traducción en Sling Models"
        ]
      },
      {
        "id": "ch-54",
        "number": "54",
        "title": "Servlet i18n JSON: Exposición de Diccionarios para SPA",
        "level": "Intermedio",
        "track": "back",
        "summary": "Expón los diccionarios de traducción JCR mediante un servlet JSON para ser consumido en React o Angular.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Servlet de Diccionario JSON"
        ]
      }
    ]
  },
  {
    "id": "module-8",
    "number": 8,
    "title": "Módulo 8: UX de Autoría: Diálogos Avanzados y RTE",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-55",
        "number": "55",
        "title": "Personalizar Estilos de Diálogos Touch UI",
        "level": "Intermedio",
        "track": "front",
        "summary": "Aplica CSS personalizado a los campos y pestañas de la interfaz Touch UI de tus diálogos.",
        "prerequisites": [
          "ch-21"
        ],
        "status": "pending",
        "outline": [
          "Personalización Visual de Diálogos",
          "Paso 1: Asignar una clase CSS al campo del Diálogo",
          "Paso 2: Crear la Clientlib de Autoría (cq.authoring.dialog)"
        ]
      },
      {
        "id": "ch-56",
        "number": "56",
        "title": "Comportamiento Dinámico en Diálogos con JS",
        "level": "Intermedio",
        "track": "front",
        "summary": "Desarrolla interactividad en diálogos: muestra u oculta campos según el estado de un checkbox o selector de forma dinámica.",
        "prerequisites": [
          "ch-21"
        ],
        "status": "pending",
        "outline": [
          "Interactividad y Dinamismo en Granite UI",
          "Estructura del Diálogo XML",
          "Lógica Javascript del Listener"
        ]
      },
      {
        "id": "ch-57",
        "number": "57",
        "title": "Personalización del Rich Text Editor (RTE)",
        "level": "Intermedio",
        "track": "front",
        "summary": "Configura el editor enriquecido (RTE) de AEM para incluir selectores de formato de párrafo y estilos de listas personalizados.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Configuración Avanzada del RTE",
          "Configuración XML de Plugins de Formato y Listas"
        ]
      },
      {
        "id": "ch-58",
        "number": "58",
        "title": "Creación de un Icon Picker Personalizado",
        "level": "Intermedio",
        "track": "front",
        "summary": "Desarrolla un selector de iconos integrado para diálogos que permita a los editores elegir iconos vectoriales basados en una tipografía corporativa.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Diseño del Icon Picker",
          "Definición en el Diálogo",
          "Estilización e Inyección de Vista Previa"
        ]
      },
      {
        "id": "ch-59",
        "number": "59",
        "title": "Actualizar Componentes sin Recargar la Página Completa",
        "level": "Intermedio",
        "track": "front",
        "summary": "Configura cq:editConfig/cq:listeners (REFRESH_SELF, REFRESH_PARENT, REFRESH_PAGE, REFRESH_INSERTED) para refrescar solo lo necesario tras editar un componente.",
        "prerequisites": [
          "ch-50"
        ],
        "status": "pending",
        "outline": [
          "Actualizar Componentes sin Recargar la Página Completa",
          "El Nodo cq:listeners y sus Valores"
        ]
      },
      {
        "id": "ch-60",
        "number": "60",
        "title": "Panel Selector: Edición de Paneles en Carousel, Tabs y Accordion",
        "level": "Intermedio",
        "track": "front",
        "summary": "Usa y hereda el Panel Selector nativo de los Core Components contenedor para activar y editar directamente un panel oculto sin adivinar su posición.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Panel Selector: Edición de Paneles en Carousel, Tabs y Accordion",
          "Qué Hace el Panel Selector",
          "Habilitarlo en un Contenedor Propio"
        ]
      },
      {
        "id": "ch-61",
        "number": "61",
        "title": "Validación Personalizada de Campos en Diálogos Touch UI",
        "level": "Intermedio",
        "track": "front",
        "summary": "Registra un validador custom con foundation.validation.validator para reglas de negocio que la validación nativa de Granite UI no cubre.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Validación Personalizada de Campos en Diálogos Touch UI",
          "Registrar un Validador Custom"
        ]
      },
      {
        "id": "ch-62",
        "number": "62",
        "title": "Datasource Dinámico: Poblando Selects y Multifields desde el JCR o APIs",
        "level": "Intermedio",
        "track": "front",
        "summary": "Implementa un Servlet DataSource que puebla dinámicamente un select o autocomplete desde una query JCR o una API externa.",
        "prerequisites": [
          "ch-50"
        ],
        "status": "pending",
        "outline": [
          "Datasource Dinámico: Poblando Selects y Multifields desde el JCR o APIs",
          "Paso 1: Diálogo Apuntando a un Datasource Propio",
          "Paso 2: El Servlet Datasource (Query JCR de Tags Reales)"
        ]
      },
      {
        "id": "ch-63",
        "number": "63",
        "title": "Diálogos Condicionados por la Content Policy de la Plantilla",
        "level": "Intermedio",
        "track": "front",
        "summary": "Lee la Content Policy activa desde el Sling Model para mostrar u ocultar campos según la plantilla, en vez de por lógica JS en el mismo diálogo.",
        "prerequisites": [
          "ch-30"
        ],
        "status": "pending",
        "outline": [
          "Diálogos Condicionados por la Content Policy de la Plantilla",
          "Paso 1: Definir la Propiedad en la Content Policy del Componente",
          "Paso 2: Leer la Policy desde el Sling Model del Componente"
        ]
      },
      {
        "id": "ch-64",
        "number": "64",
        "title": "Overlay de Diálogos OOTB de Core Components con Resource Merger",
        "level": "Intermedio",
        "track": "front",
        "summary": "Agrega o quita campos de un diálogo de Core Components fusionando /apps con /libs vía Resource Merger, sin duplicar el diálogo completo.",
        "prerequisites": [
          "ch-41"
        ],
        "status": "pending",
        "outline": [
          "Overlay de Diálogos OOTB de Core Components con Resource Merger",
          "El Mecanismo: /libs vs. /apps con el Mismo Path Relativo",
          "Cuándo Fusionar y Cuándo Ocultar con sling:hideChildren"
        ]
      }
    ]
  },
  {
    "id": "module-9",
    "number": 9,
    "title": "Módulo 9: Tareas Programadas, Eventos y Workflows",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-65",
        "number": "65",
        "title": "Sling Scheduler con Expresiones Cron: Programar Tareas y Guardar Información en Nodos",
        "level": "Intermedio",
        "track": "back",
        "summary": "Programa tareas periódicas con expresiones cron de Quartz (scheduler.expression), configúralas por entorno y persiste los resultados en el JCR con un service user.",
        "prerequisites": [
          "ch-39",
          "ch-44",
          "ch-43"
        ],
        "status": "pending",
        "outline": [
          "Sintaxis cron de Quartz campo por campo con ejemplos (cada 5 min, diario 2 AM, lunes a viernes)",
          "Runnable + scheduler.expression vs. Scheduler API programática",
          "scheduler.concurrent, scheduler.runOn (LEADER / SINGLE) y clústeres",
          "Configuración OSGi por run mode para cambiar la expresión sin redeploy",
          "Guardar resultados en nodos con un service user",
          "Consideraciones en Cloud Service (pods múltiples) y alternativa con Sling Jobs",
          "Ejercicio: importar tipos de cambio cada hora y guardarlos en /var"
        ]
      },
      {
        "id": "ch-66",
        "number": "66",
        "title": "Eventing y Tareas Programadas: OSGi Schedulers y Sling Jobs",
        "level": "Intermedio",
        "track": "back",
        "summary": "Diseña lógica de ejecución asíncrona mediante el procesamiento distribuido de Sling Jobs y planificadores OSGi, con activación explícita vía Replicator y manejo seguro de credenciales.",
        "prerequisites": [
          "ch-65"
        ],
        "status": "pending",
        "outline": [
          "Tareas Programadas (Cron Jobs) y Eventos en AEM",
          "Caso de Estudio Práctico: Sincronización del Tipo de Cambio (Banxico)",
          "Paso 1: Definir la Configuración OSGi",
          "Paso 2: Implementar el Schedulable Task (Runnable)",
          "Paso 3: Leer el valor mediante un Sling Model",
          "Paso 4: Renderizar en la Plantilla HTL",
          "Estrategia de Caché y Rendimiento (Web Performance)",
          "Buenas Prácticas para Tareas Programadas en AEM"
        ]
      },
      {
        "id": "ch-67",
        "number": "67",
        "title": "Listeners de Contenido: ResourceChangeListener, EventHandler y Replicación",
        "level": "Intermedio",
        "track": "back",
        "summary": "Reacciona a cambios en el repositorio y a eventos de publicación de forma eficiente, delegando el trabajo pesado a Sling Jobs.",
        "prerequisites": [
          "ch-66"
        ],
        "status": "pending",
        "outline": [
          "ResourceChangeListener: paths y tipos de cambio",
          "OSGi EventHandler y topics de replicación",
          "Por qué no hacer trabajo pesado en el listener",
          "Delegar a Sling Jobs con garantía de ejecución",
          "Ejercicio: notificar a un sistema externo al publicar una página"
        ]
      },
      {
        "id": "ch-68",
        "number": "68",
        "title": "Motor de Workflows en AEM: Modelos, Participant Steps y Launchers",
        "level": "Avanzado",
        "track": "back",
        "summary": "Diseña flujos de aprobación personalizados, Workflow Launchers condicionales y procesos administrativos automatizados sobre el repositorio.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Motor de Workflow de AEM (Granite Workflow)",
          "1. Anatomía de un Workflow Model",
          "2. Implementación de un Process Step Custom",
          "3. Participant Step: Aprobación Humana en la Inbox",
          "4. Workflow Launchers: Disparo Automático por Evento",
          "5. Ejemplo Completo: Flujo de Aprobación Editorial de 2 Pasos"
        ]
      },
      {
        "id": "ch-69",
        "number": "69",
        "title": "Workflow Process Step Personalizado en Java",
        "level": "Avanzado",
        "track": "back",
        "summary": "Implementa la interfaz WorkflowProcess para ejecutar lógica de negocio Java dentro de un paso automático de un Modelo de Workflow.",
        "prerequisites": [
          "ch-68"
        ],
        "status": "pending",
        "outline": [
          "Workflow Process Step Personalizado en Java",
          "Implementar la Interfaz WorkflowProcess"
        ]
      }
    ]
  },
  {
    "id": "module-10",
    "number": 10,
    "title": "Módulo 10: Repositorio, Consultas e Índices",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-70",
        "number": "70",
        "title": "Consultas JCR: QueryBuilder y JCR-SQL2",
        "level": "Intermedio",
        "track": "back",
        "summary": "Optimiza la recuperación de nodos JCR realizando búsquedas eficientes con QueryBuilder e índices Oak.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Herramientas de Consulta en AEM",
          "Ejemplo Práctico con QueryBuilder"
        ]
      },
      {
        "id": "ch-71",
        "number": "71",
        "title": "Oak y el Repositorio JCR por Dentro",
        "level": "Avanzado",
        "track": "back",
        "summary": "Comprende los tipos de NodeStore (TarMK/SegmentNodeStore vs. DocumentNodeStore), el BlobStore externo, la indexación Oak y el versionado de nodos.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Apache Jackrabbit Oak: La Capa de Persistencia Real",
          "Tipos de NodeStore: SegmentNodeStore vs. DocumentNodeStore",
          "BlobStore: FileDataStore vs. Almacenamiento Externo (S3/Azure)",
          "Indexación en Oak: de Traversal Costoso a Lucene",
          "Cost-Based Query Planning",
          "Versionado de Nodos JCR: mix:versionable"
        ]
      },
      {
        "id": "ch-72",
        "number": "72",
        "title": "Índices Oak: oak:index, Lucene, Explain Query y Gestión de Índices en Cloud",
        "level": "Avanzado",
        "track": "back",
        "summary": "Diseña índices para que tus consultas sean rápidas, diagnostica consultas lentas y aplica la gestión de índices propia de Cloud Service.",
        "prerequisites": [
          "ch-70"
        ],
        "status": "pending",
        "outline": [
          "Por qué una consulta sin índice es un riesgo",
          "Tipos de índice: property, Lucene, ordered",
          "Definir un índice personalizado en ui.apps",
          "Explain Query y Query Performance",
          "Índices en Cloud Service: nomenclatura -custom-N y despliegue",
          "Ejercicio: indexar una búsqueda de artículos por tag y fecha"
        ]
      },
      {
        "id": "ch-73",
        "number": "73",
        "title": "Procesamiento de CSV y Excel (XLSX): Importación y Exportación",
        "level": "Intermedio",
        "track": "back",
        "summary": "Domina la lectura y escritura de CSV/XLSX en AEM con Apache POI (backend) y ExcelJS (frontend), aplicando estilos e inyección en plantillas DAM.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Procesamiento de CSV y Excel (XLSX) en AEM",
          "Comparativa Arquitectónica: ¿Backend (Java) o Frontend (JS)?",
          "Recomendación de Decisión",
          "Ejemplo 1: Backend Java (Apache POI) - Inyectar Datos en Plantilla del DAM",
          "Ejemplo 2: Frontend JS (ExcelJS) - Creación, Estilos y Descarga al Clic",
          "Buenas Prácticas de Rendimiento y Memoria (Evitar OutOfMemory)"
        ]
      },
      {
        "id": "ch-74",
        "number": "74",
        "title": "Generación de PDFs Personalizados desde Java en AEM",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende el listado de librerías para PDFs en AEM (AEM Forms, PDFBox, Flying Saucer, JasperReports) y desarrolla un servicio OSGi Java completo para fusionar XML/JSON con plantillas XDP.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Generación de PDFs Personalizados desde Java en AEM",
          "1. Catálogo de Librerías y Herramientas de Diseño",
          "2. El Enfoque Nativo Enterprise: AEM Forms Document Services",
          "3. Ejemplo Práctico: Servicio OSGi para Generar PDF mediante AEM Forms",
          "4. Estructura de Datos XML Requerida por la Plantilla XDP"
        ]
      },
      {
        "id": "ch-75",
        "number": "75",
        "title": "AEM Groovy Console: Scripting Administrativo y Manipulación del JCR",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende el uso de la Groovy Console para scripting en AEM, variables implícitas y escribe scripts reales para migrar componentes y modificar propiedades masivamente en el JCR.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Groovy Console: Guía Definitiva de Cero a Experto",
          "1. Fundamentos: ¿Por qué Groovy en AEM?",
          "2. Variables Implícitas (El Contexto de AEM)",
          "3. Patrones de Diseño Avanzados para Scripting Seguro",
          "4. Catálogo de Scripts de Nivel Experto",
          "5. Seguridad y Hardening en Producción"
        ]
      },
      {
        "id": "ch-76",
        "number": "76",
        "title": "ACS AEM Commons: Herramientas Esenciales para Proyectos Reales",
        "level": "Intermedio",
        "track": "back",
        "summary": "Domina Generic Lists, SiteMapServlet y Named Image Transform con foco lateral de ACS AEM Commons, la colección de utilidades más usada en proyectos 6.5 reales.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "ACS AEM Commons: Herramientas Esenciales para Proyectos Reales",
          "Generic Lists: Configuración de Negocio como Contenido Editable",
          "SiteMapServlet: Generación Automática de sitemap.xml",
          "Named Image Transform: Recortes Responsivos con Punto Focal"
        ]
      }
    ]
  },
  {
    "id": "module-11",
    "number": 11,
    "title": "Módulo 11: Entornos Locales con Docker y Dispatcher Local",
    "level": "Intermedio",
    "chapters": [
      {
        "id": "ch-77",
        "number": "77",
        "title": "Docker desde Cero para Desarrolladores AEM",
        "level": "Intermedio",
        "track": "back",
        "summary": "Aprende Docker desde la instalación: imágenes, contenedores, volúmenes, redes y Docker Compose, con los casos de uso concretos de un proyecto AEM.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Instalación de Docker Desktop / Docker Engine (Windows con WSL2, macOS, Linux)",
          "Imagen vs. contenedor, Dockerfile línea por línea",
          "Volúmenes y persistencia de datos",
          "Redes entre contenedores",
          "Docker Compose: servicios, dependencias y variables",
          "Comandos de diagnóstico: logs, exec, inspect, stats"
        ]
      },
      {
        "id": "ch-78",
        "number": "78",
        "title": "Entorno AEM Completo con Docker Compose: Author, Publish y Dispatcher",
        "level": "Intermedio",
        "track": "back",
        "summary": "Construye desde cero un entorno local reproducible con Author, Publish y Dispatcher en contenedores, con replicación y flush configurados como en producción.",
        "prerequisites": [
          "ch-77",
          "ch-4"
        ],
        "status": "pending",
        "outline": [
          "Arquitectura del entorno y puertos",
          "Dockerfile de AEM (quickstart / SDK) con volúmenes persistentes",
          "Servicio de Dispatcher (Apache + módulo) conectado a Publish",
          "Configurar agente de replicación Author→Publish y flush Publish→Dispatcher",
          "Scripts de arranque, reinicio y limpieza",
          "Compartir el entorno con el equipo"
        ]
      },
      {
        "id": "ch-79",
        "number": "79",
        "title": "Entorno local de Publish y Dispatcher local",
        "level": "Intermedio",
        "track": "back",
        "summary": "Monta un entorno de desarrollo local con instancias de Author, Publish y un Dispatcher basado en Docker.",
        "prerequisites": [
          "ch-78"
        ],
        "status": "pending",
        "outline": [
          "Paso 1: Levantar Publish",
          "Paso 2: Compilar y Arrancar el Dispatcher en Docker"
        ]
      },
      {
        "id": "ch-80",
        "number": "80",
        "title": "Replicación y Flush de Extremo a Extremo en Local: Probar como en Producción",
        "level": "Intermedio",
        "track": "back",
        "summary": "Valida en tu máquina el ciclo completo publicar-cachear-invalidar: agentes de replicación, flush del Dispatcher y verificación de la caché en disco.",
        "prerequisites": [
          "ch-79"
        ],
        "status": "pending",
        "outline": [
          "Agentes de replicación en 6.5 vs. Sling Content Distribution en Cloud",
          "Configurar el agente de flush y el statfile",
          "Probar invalidación con curl y revisar el docroot",
          "Depurar replicaciones bloqueadas",
          "Checklist de pruebas antes de subir a un entorno real"
        ]
      }
    ]
  },
  {
    "id": "module-12",
    "number": 12,
    "title": "Módulo 12: Dispatcher y Estrategias de Caché",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-81",
        "number": "81",
        "title": "El Dispatcher de AEM: Caching y Servlets",
        "level": "Avanzado",
        "track": "back",
        "summary": "Comprende el servidor web Apache Dispatcher, la configuración de reglas de caché y el desbloqueo de endpoints de Servlets.",
        "prerequisites": [
          "ch-79",
          "ch-40"
        ],
        "status": "pending",
        "outline": [
          "El Dispatcher de AEM: Introducción, Caching, Seguridad y Balanceo",
          "1. Rol Dual del Dispatcher",
          "2. Ventajas y Desventajas de Usar el Dispatcher",
          "3. Características Principales y Qué Podemos Hacer con Él",
          "4. Ejemplo de Configuración: Filtros de Seguridad y Servlets"
        ]
      },
      {
        "id": "ch-82",
        "number": "82",
        "title": "AEM Dispatcher: Configuración Detallada de Filtros de Seguridad",
        "level": "Avanzado",
        "track": "back",
        "summary": "Domina la estrategia deny-by-default del bloque /filter, la anatomía de una regla, las buenas prácticas de seguridad del Dispatcher y una regla anti-DoS real contra selectores costosos.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Configuración Detallada de Filtros de Seguridad",
          "1. La Estrategia de Filtros: Deny-by-Default",
          "2. Anatomía de una Regla de Filtro",
          "3. Ejemplo Práctico Paso a Paso: Estructura de filters.any",
          "Regla Real: Bloqueo Anti-DoS de Selectores Costosos",
          "4. Herramientas de Validación y Buenas Prácticas"
        ]
      },
      {
        "id": "ch-83",
        "number": "83",
        "title": "AEM Dispatcher: Gestión de Caché Avanzada, Cabeceras y TTL",
        "level": "Avanzado",
        "track": "back",
        "summary": "Configura /ignoreUrlParams, cacheo de cabeceras HTTP, TTL dinámico y el nivel de statfiles para una invalidación selectiva y eficiente.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Gestión de Caché Avanzada, Cabeceras y TTL",
          "1. La Raíz de Caché (/docroot) y Reglas Básicas (/rules)",
          "2. El Desafío de los Parámetros Query (/ignoreUrlParams)",
          "3. Caché de Cabeceras HTTP (/headers) y TTL (/enableTTL)",
          "4. Invalidación Jerárquica y el Nivel de Archivos Estadísticos (/statfileslevel)"
        ]
      },
      {
        "id": "ch-84",
        "number": "84",
        "title": "Invalidación de Caché en el Dispatcher: statfileslevel, Flush Agents y Auto-invalidation",
        "level": "Avanzado",
        "track": "back",
        "summary": "Controla qué se invalida y cuándo: statfile, statfileslevel, reglas /invalidate, invalidación explícita por API y estrategias para sitios grandes.",
        "prerequisites": [
          "ch-80"
        ],
        "status": "pending",
        "outline": [
          "Cómo decide el Dispatcher si un archivo está obsoleto",
          "statfileslevel explicado con un árbol de ejemplo",
          "Reglas /invalidate y auto-invalidation",
          "Invalidación manual vía HTTP (CQ-Action, CQ-Handle)",
          "Estrategias para sitios con miles de páginas"
        ]
      },
      {
        "id": "ch-85",
        "number": "85",
        "title": "AEM Dispatcher: Virtual Hosts y Configuración Multi-dominio",
        "level": "Avanzado",
        "track": "back",
        "summary": "Sirve múltiples marcas o dominios desde una sola instalación de Dispatcher con aislamiento de caché por granja, proxy reverso hacia sistemas no-AEM y separación de vhosts de salud/flush.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Virtual Hosts y Configuración Multi-dominio",
          "1. La Directiva /virtualhosts del Dispatcher",
          "2. Aislamiento de Caché por Granja (Farm-level Isolation)",
          "3. Configuración del Servidor Apache (Vhost Config)",
          "4. Flujo Paso a Paso del Enrutamiento Multi-dominio",
          "5. El Dispatcher como Fachada: Proxy Reverso hacia un Sistema No-AEM",
          "6. Separar Vhosts de Control (Salud y Flush) del Tráfico de Contenido"
        ]
      },
      {
        "id": "ch-86",
        "number": "86",
        "title": "URLs Cortas y Amigables: Sling Mappings vs. Apache Rules",
        "level": "Avanzado",
        "track": "back",
        "summary": "Configura mapeos bidireccionales y redirecciones en Apache para eliminar el prefijo /content/ de las URLs, incluyendo migración de URLs legacy a escala y mapeo de robots.txt/sitemap.xml.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Método: Reglas de Rewrite de Apache",
          "Migración de URLs Legacy a Escala: Cientos de Reglas 1:1",
          "Mapeo de robots.txt y sitemap.xml a Rutas Específicas del JCR"
        ]
      },
      {
        "id": "ch-87",
        "number": "87",
        "title": "AEM Dispatcher: Gestión de Vanity URLs Dinámicas",
        "level": "Avanzado",
        "track": "back",
        "summary": "Sincroniza URLs amigables autoadministrables por el negocio entre AEM Publish y el Dispatcher sin reinicios de servidor.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Gestión de Vanity URLs Dinámicas",
          "1. El Desafío de las Vanity URLs y el Dispatcher",
          "2. Configuración del Bloque /vanity_urls",
          "3. Configuración de Seguridad en filters.any",
          "4. Flujo de Ejecución y Sincronización"
        ]
      },
      {
        "id": "ch-88",
        "number": "88",
        "title": "AEM Dispatcher: Permission-Sensitive Caching y Auth Checker",
        "level": "Experto",
        "track": "back",
        "summary": "Cachea páginas protegidas de forma segura validando permisos de usuario en tiempo real antes de servir el archivo cacheado.",
        "prerequisites": [
          "ch-118"
        ],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Permission-Sensitive Caching y Auth Checker",
          "1. El Flujo de Trabajo del Auth Checker",
          "2. Configuración de /authchecker en la Granja del Dispatcher",
          "3. Configuración del Servlet de Validación en AEM (Java Backend)"
        ]
      },
      {
        "id": "ch-89",
        "number": "89",
        "title": "AEM Dispatcher: Balanceo de Carga, Renders y Sticky Sessions",
        "level": "Experto",
        "track": "back",
        "summary": "Configura múltiples renders de Publish, sticky sessions para usuarios autenticados y conmutación por error automática.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "AEM Dispatcher: Balanceo de Carga, Renders y Sticky Sessions",
          "1. Configuración de Instancias Activas (/renders)",
          "2. Sticky Sessions (Sesiones Persistentes)",
          "3. Conmutación por Error y Monitoreo de Disponibilidad (/statistics)"
        ]
      },
      {
        "id": "ch-90",
        "number": "90",
        "title": "Gestión de Caché por Componente: Sling Dynamic Include (SDI)",
        "level": "Avanzado",
        "track": "back",
        "summary": "Aprende a fragmentar la caché de AEM utilizando inclusiones dinámicas en el lado del servidor web, con un ejemplo real de Header/Footer protegido con required_header.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Solución: Sling Dynamic Include (SDI)",
          "Configuración OSGi de SDI",
          "Ejemplo Real: Header y Footer Cacheados Aparte de la Página"
        ]
      },
      {
        "id": "ch-91",
        "number": "91",
        "title": "Caché de Extremo a Extremo: Navegador, CDN, Dispatcher y AEM",
        "level": "Avanzado",
        "track": "back",
        "summary": "Diseña la estrategia de caché completa por capa: cabeceras Cache-Control, TTL, surrogate keys, caché de APIs/GraphQL y cómo depurar qué capa respondió.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Capas de caché y quién manda en cada una",
          "Cache-Control, s-maxage, stale-while-revalidate y Surrogate-Control",
          "Caché de HTML vs. clientlibs versionadas vs. assets",
          "Caché de JSON, persisted queries y SPAs",
          "Depuración: cabeceras Age, X-Cache y herramientas",
          "Matriz de decisión de TTL por tipo de contenido"
        ]
      },
      {
        "id": "ch-92",
        "number": "92",
        "title": "CDN (Fastly) y Estrategias de Invalidación de Caché a Escala",
        "level": "Experto",
        "track": "back",
        "summary": "Domina la CDN gestionada de AEMaaCS, las cabeceras Cache-Control/Surrogate-Control/Surrogate-Key y los patrones de purga soft vs. hard.",
        "prerequisites": [
          "ch-91"
        ],
        "status": "pending",
        "outline": [
          "Tres Capas de Caché, No Una",
          "La CDN Gestionada (Fastly) y su Relación con el Dispatcher",
          "Cabeceras que Gobiernan el Comportamiento de Cada Capa",
          "Patrones de Invalidación: Soft Purge vs. Hard Purge",
          "Disparo de la Invalidación desde el Flujo de Publicación",
          "Diferencias con la Estrategia Clásica de Solo-Dispatcher On-Premise"
        ]
      }
    ]
  },
  {
    "id": "module-13",
    "number": 13,
    "title": "Módulo 13: Content Fragments, Headless y GraphQL",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-93",
        "number": "93",
        "title": "Content Fragments (CF): Creación y Consumo desde Java",
        "level": "Avanzado",
        "track": "back",
        "summary": "Modelado y consumo de fragmentos de contenido estructurado desacoplado utilizando la API de Content Fragments.",
        "prerequisites": [
          "ch-35"
        ],
        "status": "pending",
        "outline": [
          "¿Qué es un Content Fragment?",
          "Consumo de Content Fragments en un Modelo Sling"
        ]
      },
      {
        "id": "ch-94",
        "number": "94",
        "title": "GraphQL, Persisted Queries y Content Fragments a Escala",
        "level": "Avanzado",
        "track": "back",
        "summary": "Diseña Content Fragment Models complejos y anidados, configura Persisted Queries para producción y aplica estrategias de caché sobre el endpoint GraphQL.",
        "prerequisites": [
          "ch-93"
        ],
        "status": "pending",
        "outline": [
          "GraphQL en AEM: Del Content Fragment a la API de Consumo",
          "1. Diseño de Content Fragment Models Complejos y Anidados",
          "2. La API GraphQL Nativa: Endpoints y Esquema Autogenerado",
          "3. Persisted Queries: Por Qué Son Obligatorias en Cloud Service",
          "4. Caching del Endpoint GraphQL vía Dispatcher/CDN",
          "5. Paginación y Filtros en Queries Grandes"
        ]
      },
      {
        "id": "ch-95",
        "number": "95",
        "title": "Aplicaciones Headless con React y Angular Consumiendo GraphQL de AEM",
        "level": "Avanzado",
        "track": "front",
        "summary": "Construye apps React y Angular que consumen Content Fragments vía persisted queries con el AEM Headless Client, incluyendo autenticación, CORS y caché.",
        "prerequisites": [
          "ch-94"
        ],
        "status": "pending",
        "outline": [
          "AEM Headless Client for JavaScript",
          "App React: listar y detallar Content Fragments",
          "App Angular: mismo caso con servicios e interceptores",
          "CORS, autenticación y variables de entorno",
          "Imágenes optimizadas y rendimiento"
        ]
      },
      {
        "id": "ch-96",
        "number": "96",
        "title": "Universal Editor: Instrumentación y Edición Visual de Apps Headless",
        "level": "Experto",
        "track": "front",
        "summary": "Habilita la edición visual in-context en aplicaciones headless con Universal Editor: atributos data-aue, conexiones y modelos de componentes.",
        "prerequisites": [
          "ch-95"
        ],
        "status": "pending",
        "outline": [
          "Qué resuelve Universal Editor frente al SPA Editor",
          "Instrumentación: data-aue-resource, prop, type",
          "component-definition, component-models y component-filters",
          "Configurar la conexión con AEM",
          "Ejercicio: hacer editable la app headless del tema anterior"
        ]
      }
    ]
  },
  {
    "id": "module-14",
    "number": 14,
    "title": "Módulo 14: SPA Editor con React y Angular",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-97",
        "number": "97",
        "title": "La Arquitectura de AEM SPA Editor",
        "level": "Avanzado",
        "track": "front",
        "summary": "Comprende los fundamentos técnicos de AEM SPA Editor, el flujo de comunicación y el mapeo dinámico de JSON.",
        "prerequisites": [
          "ch-49"
        ],
        "status": "pending",
        "outline": [
          "Flujo de Trabajo SPA Editor"
        ]
      },
      {
        "id": "ch-98",
        "number": "98",
        "title": "Arrancando el Proyecto SPA Paso a Paso: Estructura y Servidor Local",
        "level": "Avanzado",
        "track": "front",
        "summary": "Explora qué genera el archetype en ui.frontend y levanta el servidor de desarrollo local con proxy hacia AEM Author para iterar sin Maven.",
        "prerequisites": [
          "ch-13",
          "ch-14"
        ],
        "status": "pending",
        "outline": [
          "Arrancando el Proyecto SPA Paso a Paso: Estructura y Servidor Local",
          "Qué Contiene ui.frontend Después del Archetype",
          "Levantar el Servidor de Desarrollo Local contra AEM Author"
        ]
      },
      {
        "id": "ch-99",
        "number": "99",
        "title": "SPA Editor con React: Configuración y Mapeo MapTo",
        "level": "Avanzado",
        "track": "front",
        "summary": "Aprende el mapeo de componentes de React con JCR a través del decorador MapTo y el flujo de inyección de propiedades.",
        "prerequisites": [
          "ch-13"
        ],
        "status": "pending",
        "outline": [
          "Paso 1: Creación del Componente en React",
          "Paso 2: Registrar el Mapeo"
        ]
      },
      {
        "id": "ch-100",
        "number": "100",
        "title": "React en AEM: Estructura Modular y Subcomponentes",
        "level": "Avanzado",
        "track": "front",
        "summary": "Establece una estructura de archivos recomendada en React, optimizando la jerarquía de subcomponentes complejos.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Estructura de Componentes React Complejos"
        ]
      },
      {
        "id": "ch-101",
        "number": "101",
        "title": "SPA Editor con Angular: Configuración e Implementación",
        "level": "Avanzado",
        "track": "front",
        "summary": "Aprende a integrar AEM SPA Editor usando Angular, inyección de inputs y directivas de mapeo.",
        "prerequisites": [
          "ch-14"
        ],
        "status": "pending",
        "outline": [
          "Paso 1: Crear el Componente en Angular",
          "Paso 2: HTML del Componente Angular",
          "Paso 3: Registrar el Mapeo en Angular"
        ]
      },
      {
        "id": "ch-102",
        "number": "102",
        "title": "Mapeo del Componente Page Raíz en React y Angular",
        "level": "Avanzado",
        "track": "front",
        "summary": "Mapea el componente Page contra el sling:resourceType de la plantilla, el punto de entrada sin el cual ningún componente hijo se instancia.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Mapeo del Componente Page Raíz en React y Angular",
          "React: Extender la Clase Page",
          "Angular: El Módulo de Página"
        ]
      },
      {
        "id": "ch-103",
        "number": "103",
        "title": "Mapeo del Container y Responsive Grid para Edición Visual",
        "level": "Avanzado",
        "track": "front",
        "summary": "Integra el Container/responsive-grid del SDK para habilitar drag & drop real de componentes dentro de zonas editables de la SPA.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Mapeo del Container y Responsive Grid para Edición Visual",
          "React: Usar el Container Provisto por el SDK",
          "Angular: La Directiva de Contenedor Responsivo"
        ]
      },
      {
        "id": "ch-104",
        "number": "104",
        "title": "Routing Multi-Página Sincronizado con el PageModelManager",
        "level": "Avanzado",
        "track": "front",
        "summary": "Sincroniza react-router / Angular Router con el PageModelManager para navegar entre páginas de AEM sin recarga completa del navegador.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Routing Multi-Página Sincronizado con el PageModelManager",
          "React: react-router-dom + Escucha de Cambios del Modelo",
          "Angular: Router Nativo + Servicio de Navegación"
        ]
      },
      {
        "id": "ch-105",
        "number": "105",
        "title": "Modelos Tipados de Datos en React y Angular",
        "level": "Avanzado",
        "track": "front",
        "summary": "Formaliza el contrato de datos del componente con TypeScript/PropTypes en React y una interfaz dedicada en Angular.",
        "prerequisites": [
          "ch-49"
        ],
        "status": "pending",
        "outline": [
          "Modelos Tipados de Datos en React y Angular",
          "React: Tipado con TypeScript (o PropTypes si el proyecto es JS puro)",
          "Angular: Interfaz Formal Inyectada al Componente"
        ]
      },
      {
        "id": "ch-106",
        "number": "106",
        "title": "SPA Editor Clásico vs. Remote SPA + Universal Editor",
        "level": "Experto",
        "track": "front",
        "summary": "Compara el patrón MapTo clásico con Remote SPA + Universal Editor y define cuándo usar cada arquitectura en un proyecto nuevo.",
        "prerequisites": [
          "ch-96"
        ],
        "status": "pending",
        "outline": [
          "SPA Editor Clásico vs. Remote SPA + Universal Editor: Cuándo Usar Cada Uno",
          "La Alternativa: Remote SPA + Universal Editor",
          "Matriz de Decisión"
        ]
      }
    ]
  },
  {
    "id": "module-15",
    "number": 15,
    "title": "Módulo 15: Edge Delivery Services: de Cero a Experto",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-107",
        "number": "107",
        "title": "Edge Delivery Services (EDS): La Revolución de Rendimiento",
        "level": "Básico",
        "track": "front",
        "summary": "Aprende el funcionamiento de Edge Delivery Services, el paradigma Document-based Authoring y el desarrollo de bloques front-end.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Edge Delivery Services (EDS): Arquitectura, Proyecto y Document-Based Authoring",
          "1. Comparación Arquitectónica: AEM Sites Tradicional vs. Edge Delivery Services (EDS)",
          "2. La Arquitectura de Trabajo de EDS (Proyecto Helix)",
          "3. El Paradigma de Document-Based Authoring: Adiós a las Plantillas (Templates)",
          "4. Helix Sidekick: La Herramienta de Autoría",
          "5. Guía de Inicio Rápido: Creación de un Proyecto EDS desde Cero"
        ]
      },
      {
        "id": "ch-108",
        "number": "108",
        "title": "Edge Delivery Services desde Cero: tu Primer Sitio con Document Authoring",
        "level": "Básico",
        "track": "front",
        "summary": "Crea tu primer sitio EDS paso a paso: boilerplate en GitHub, AEM Code Sync, contenido en Google Drive o SharePoint y publicación con AEM Sidekick.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Qué necesitas: cuenta de GitHub, Google Drive o SharePoint",
          "Crear el repositorio desde aem-boilerplate e instalar AEM Code Sync",
          "Conectar la carpeta de contenido (fstab.yaml)",
          "Instalar AEM Sidekick: preview y publish",
          "URLs .page vs. .live y ciclo de publicación",
          "Ejercicio: publicar una landing page completa"
        ]
      },
      {
        "id": "ch-109",
        "number": "109",
        "title": "Anatomía de un Proyecto EDS: scripts.js, aem.js, Fases Eager/Lazy/Delayed y Estilos",
        "level": "Intermedio",
        "track": "front",
        "summary": "Entiende línea por línea el boilerplate de EDS y el modelo de carga en tres fases que permite obtener Lighthouse 100.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Estructura del repositorio: blocks, scripts, styles, icons",
          "aem.js: decoración de secciones y bloques",
          "scripts.js: loadEager, loadLazy, loadDelayed",
          "Estilos globales, fuentes y LCP",
          "Buenas prácticas de rendimiento desde el día uno"
        ]
      },
      {
        "id": "ch-110",
        "number": "110",
        "title": "Desarrollo en Edge Delivery Services: Creación de Bloques y Lógica Serverless",
        "level": "Intermedio",
        "track": "front",
        "summary": "Construye Bloques de EDS desde cero (tabla de autoría, HTML compilado, decorador JS, CSS modular) y consume APIs externas de forma serverless en el cliente.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Desarrollo en Edge Delivery Services: Creación de Bloques y Lógica Serverless",
          "1. Anatomía y Creación de un Bloque (Componente) desde Cero",
          "2. Lógica de Negocio Serverless e Integraciones sin Java"
        ]
      },
      {
        "id": "ch-111",
        "number": "111",
        "title": "Bloques Avanzados en EDS: Variantes, Auto-blocking, Fragmentos y Metadata",
        "level": "Avanzado",
        "track": "front",
        "summary": "Diseña bloques reutilizables con variantes, genera bloques automáticamente desde el contenido y reutiliza secciones con fragmentos y metadata.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Variantes de bloques y opciones en la tabla",
          "Auto-blocking: crear bloques desde patrones de contenido",
          "Fragments y el bloque fragment",
          "Metadata de página y bulk metadata",
          "Section metadata y estilos por sección"
        ]
      },
      {
        "id": "ch-112",
        "number": "112",
        "title": "Datos en EDS: Spreadsheets como JSON, query-index y Formularios",
        "level": "Avanzado",
        "track": "front",
        "summary": "Usa hojas de cálculo como fuente de datos JSON, construye listados dinámicos con query-index y maneja formularios en Edge Delivery Services.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Spreadsheets publicadas como JSON: hojas, paginación y filtros",
          "query-index: indexar páginas del sitio",
          "Listados dinámicos y buscador",
          "Formularios en EDS y destino de los envíos",
          "Placeholders e i18n"
        ]
      },
      {
        "id": "ch-113",
        "number": "113",
        "title": "Desarrollo Local en EDS: AEM CLI, Ramas, Previews y Linting",
        "level": "Avanzado",
        "track": "front",
        "summary": "Trabaja como en un equipo profesional: aem up en local, ramas con URL de preview propia, linting, pruebas y revisión de rendimiento en cada PR.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Instalar AEM CLI y ejecutar aem up",
          "Ramas y URLs {branch}--{repo}--{owner}.aem.page",
          "ESLint y Stylelint del boilerplate",
          "PageSpeed en cada Pull Request",
          "Flujo de trabajo en equipo"
        ]
      },
      {
        "id": "ch-114",
        "number": "114",
        "title": "Edge Delivery Services: Performance, SEO, Navegación y Redirects",
        "level": "Avanzado",
        "track": "front",
        "summary": "Gestiona nav/footer globales, metadata SEO por página y redirects.xlsx como documentos editables, completando el ciclo de producción de EDS.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Edge Delivery Services: Performance, SEO, Navegación y Redirects",
          "Navegación y Footer Globales como Documentos",
          "Metadata y SEO por Página",
          "Redirects a Escala con redirects.xlsx"
        ]
      },
      {
        "id": "ch-115",
        "number": "115",
        "title": "Arquitectura Híbrida en AEM: Sites, Content Fragments y Universal Editor en EDS",
        "level": "Experto",
        "track": "front",
        "summary": "Combina la gobernanza de AEM Author con la velocidad de EDS: Universal Editor, atributos data-aue y consumo de Content Fragments publicados como JSON en el Edge.",
        "prerequisites": [
          "ch-96"
        ],
        "status": "pending",
        "outline": [
          "Arquitectura Híbrida en AEM: Sites, Content Fragments y Universal Editor en EDS",
          "1. La Arquitectura Híbrida de AEM",
          "2. El Universal Editor: Autoría Visual en EDS",
          "3. Content Fragments con EDS"
        ]
      },
      {
        "id": "ch-116",
        "number": "116",
        "title": "EDS a Escala: Multi-sitio, Repoless, CDN Propia, Headers y Producción",
        "level": "Experto",
        "track": "front",
        "summary": "Lleva un proyecto EDS a producción: configuración de CDN propia (BYO CDN), headers, redirects, multi-sitio y multi-idioma, y gobierno del proyecto.",
        "prerequisites": [
          "ch-91"
        ],
        "status": "pending",
        "outline": [
          "Go-live: dominio, CDN propia y push invalidation",
          "Configuración de headers y redirects",
          "Multi-sitio y repoless",
          "Multi-idioma",
          "Monitoreo con RUM y operación continua"
        ]
      }
    ]
  },
  {
    "id": "module-16",
    "number": 16,
    "title": "Módulo 16: Seguridad, Multi-sitio y Traducciones",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-117",
        "number": "117",
        "title": "Seguridad Web en AEM: XSS API, CSRF, ACLs y OWASP",
        "level": "Avanzado",
        "track": "back",
        "summary": "Aplica las defensas de AEM contra las vulnerabilidades más comunes: contextos de escape en HTL, XSSAPI, CSRF framework, ACLs mínimas y checklist OWASP.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Contextos de escape en HTL y XSSAPI en Java",
          "CSRF framework y el token en peticiones POST",
          "Principio de mínimo privilegio con ACLs y repoinit",
          "Filtros del Dispatcher como defensa en profundidad",
          "Checklist de seguridad de Adobe y OWASP Top 10"
        ]
      },
      {
        "id": "ch-118",
        "number": "118",
        "title": "Control de Acceso y Login en Páginas (CUG)",
        "level": "Avanzado",
        "track": "back",
        "summary": "Aprende a asignar acceso exclusivo de navegación a grupos cerrados de usuarios mediante Closed User Groups en AEM.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Closed User Groups (CUG)",
          "Configuración JCR de CUG"
        ]
      },
      {
        "id": "ch-119",
        "number": "119",
        "title": "Seguridad a nivel de Componente",
        "level": "Avanzado",
        "track": "back",
        "summary": "Aplica condiciones de visualización a componentes específicos dependiendo de los privilegios del usuario activo.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Seguridad Granular",
          "Validación de Sesión en Sling Models",
          "Uso en HTL (data-sly-test)"
        ]
      },
      {
        "id": "ch-120",
        "number": "120",
        "title": "Activación y Configuración de un Proyecto Multi-sitio (MSM)",
        "level": "Avanzado",
        "track": "back",
        "summary": "Configura la estructura de blueprints, live copies, rollout-configs y traducciones multinivel desde el repositorio JCR.",
        "prerequisites": [
          "ch-31"
        ],
        "status": "pending",
        "outline": [
          "Conceptos de Multi-Site Manager (MSM)",
          "Configuración JCR de una Live Copy por Código"
        ]
      },
      {
        "id": "ch-121",
        "number": "121",
        "title": "Translation Integration y Language Copies",
        "level": "Avanzado",
        "track": "back",
        "summary": "Configura Language Copies sobre el motor de MSM y el Translation Integration Framework para gestionar traducción humana o automática a escala.",
        "prerequisites": [
          "ch-120",
          "ch-53"
        ],
        "status": "pending",
        "outline": [
          "Translation Integration y Language Copies",
          "Language Copies: el Punto de Partida",
          "Configurar el Framework de Integración de Traducción"
        ]
      }
    ]
  },
  {
    "id": "module-17",
    "number": 17,
    "title": "Módulo 17: Calidad: Testing y Depuración",
    "level": "Avanzado",
    "chapters": [
      {
        "id": "ch-122",
        "number": "122",
        "title": "Depuración y Troubleshooting en AEM",
        "level": "Intermedio",
        "track": "back",
        "summary": "Configura el debug remoto (JPDA) con Eclipse/IntelliJ, lee error.log/request.log y cambia niveles de log en caliente, y aplica un checklist de causas comunes de 404 y NullPointerException.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Depuración y Troubleshooting en AEM",
          "Depuración Remota (Remote Debug) con Eclipse/IntelliJ",
          "Lectura de Logs sin Reiniciar la Instancia",
          "Checklist: 404 en un Componente o Servlet",
          "Checklist: NullPointerException en un Sling Model"
        ]
      },
      {
        "id": "ch-123",
        "number": "123",
        "title": "Pruebas Unitarias en el Backend: AEM Mocks y Mockito",
        "level": "Avanzado",
        "track": "back",
        "summary": "Aprende a emular el repositorio JCR mediante AemContext de wcm.io, escribir aserciones en JUnit 5 y mockear con Mockito.",
        "prerequisites": [
          "ch-45"
        ],
        "status": "pending",
        "outline": [
          "Pruebas Unitarias en el Backend: JUnit 5, Mockito y AEM Mocks",
          "Estrategias de Testing en AEM Backend",
          "Caso Práctico 1: Test Unitario para un Sling Model (HeaderModel)",
          "Caso Práctico 2: Test Unitario para un Sling Servlet",
          "Manejo de Cobertura con JaCoCo (Java Code Coverage)",
          "Comandos Maven para Optimizar Tiempos de Desarrollo"
        ]
      },
      {
        "id": "ch-124",
        "number": "124",
        "title": "Pruebas Unitarias en el Frontend: Vitest y Cobertura",
        "level": "Avanzado",
        "track": "front",
        "summary": "Configura pruebas unitarias para JavaScript Vanilla y React en ui.frontend usando Vitest, RTL, reportes de Istanbul y optimizaciones.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Pruebas Unitarias en el Frontend: Vitest, RTL y Pruebas Visuales",
          "1. Configuración de Archivos del Proyecto (Antes de Programar Tests)",
          "2. Herramientas Estándar de Testing",
          "3. Mockeo de Variables Globales de AEM (window.Granite)",
          "4. Caso Práctico 1: Testeando un Módulo JS Vanilla Asíncrono",
          "5. Caso Práctico 2: Testeando Componentes React de AEM (React Testing Library)",
          "6. Pruebas de Estructura de Marcado: Snapshot Testing",
          "7. Asegurando el Diseño Pixel a Pixel: Visual Regression Testing",
          "8. Cómo Leer las Tablas de Cobertura en el Terminal",
          "9. Comandos npm para Optimizar Tiempos de Desarrollo",
          "10. Optimización de Compilación en Maven (pom.xml)"
        ]
      },
      {
        "id": "ch-125",
        "number": "125",
        "title": "Testing de Integración (aem-testing-clients) y End-to-End en AEM",
        "level": "Experto",
        "track": "back",
        "summary": "Distingue el testing unitario del de integración (aem-testing-clients contra una instancia real) y del end-to-end (Selenium/WebdriverIO en Docker), y dónde ubicar cada capa en el pipeline.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Testing de Integración (aem-testing-clients) y End-to-End en AEM",
          "Pruebas de Integración con aem-testing-clients",
          "Pruebas End-to-End con Selenium/WebdriverIO en Docker"
        ]
      }
    ]
  },
  {
    "id": "module-18",
    "number": 18,
    "title": "Módulo 18: AEM as a Cloud Service, DevOps y Operación",
    "level": "Experto",
    "chapters": [
      {
        "id": "ch-126",
        "number": "126",
        "title": "Estructura de Repositorio para AEM as a Cloud Service: Mutable vs. Inmutable y Run Modes",
        "level": "Experto",
        "track": "back",
        "summary": "Domina la separación de repositorio inmutable (/apps, /libs) vs. mutable (/content, /conf) en AEMaaCS y la configuración de Run Modes por entorno.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Cambio de Paradigma: Repositorio Inmutable en AEM as a Cloud Service",
          "1. Repositorio Inmutable: /apps y /libs",
          "2. Repositorio Mutable: /content, /conf, /var, /tmp",
          "3. Reglas de Cloud Manager que Bloquean el Build",
          "4. Run Modes: author/publish y Run Modes Custom por Entorno",
          "5. Estructura Recomendada de ui.config por Run Mode",
          "6. Diferencias Clave Frente a AEM 6.5 On-Premise"
        ]
      },
      {
        "id": "ch-127",
        "number": "127",
        "title": "Cloud Manager e Integración Continua (CI/CD)",
        "level": "Experto",
        "track": "back",
        "summary": "Aprende los estándares de despliegue a la nube de AEM Cloud Service, la configuración de variables y el patrón alternativo de CI/CD con Azure DevOps para proyectos 6.5/AMS sin Cloud Manager.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "La tubería de Adobe Cloud Manager",
          "Configuración de variables de entorno en la Nube",
          "CI/CD Fuera de Cloud Manager: AEM 6.5/AMS con Azure DevOps"
        ]
      },
      {
        "id": "ch-128",
        "number": "128",
        "title": "Cloud Manager Avanzado: Pipelines, RDE y Gobernanza de Despliegues",
        "level": "Experto",
        "track": "back",
        "summary": "Configura pipelines non-production/production, Rapid Development Environments (RDE), quality gates y variables de entorno seguras.",
        "prerequisites": [
          "ch-127"
        ],
        "status": "pending",
        "outline": [
          "Cloud Manager como Plano de Control de Despliegues",
          "Arquitectura de Pipelines: Non-Production vs. Production",
          "Rapid Development Environments (RDE): Iteración sin Pipeline Completo",
          "Quality Gates: Sonar y Cobertura de Código",
          "Variables de Entorno y Gestión Segura de Secretos",
          "Aprobaciones Manuales: el Paso Approve",
          "Estrategia de Branching Git Recomendada"
        ]
      },
      {
        "id": "ch-129",
        "number": "129",
        "title": "Ciclo de Vida de Versiones en AEM 6.5: Cómo Elegir un Service Pack",
        "level": "Experto",
        "track": "back",
        "summary": "Comprende el versionado 6.5.X.0, el artefacto aem-service-pkg y los criterios para elegir y actualizar el Service Pack objetivo de un proyecto, en producto nuevo y en mantenimiento.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Ciclo de Vida de Versiones en AEM 6.5: Cómo Elegir un Service Pack",
          "Qué es un Service Pack y Cómo se Nombra",
          "Cómo Elegir el Service Pack Objetivo para un Proyecto Nuevo",
          "Cómo Decidir Cuándo Actualizar un Proyecto Ya en Producción"
        ]
      },
      {
        "id": "ch-130",
        "number": "130",
        "title": "Performance, Sizing y Observabilidad",
        "level": "Experto",
        "track": "back",
        "summary": "Aprende tuning de JVM, pruebas de carga con JMeter, sizing de instancias y monitoreo con New Relic y Developer Console.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Performance, Sizing y Observabilidad en AEM",
          "1. Tuning de la JVM: Heap y Garbage Collector",
          "2. Pruebas de Carga con JMeter: Diseño de un Plan Realista",
          "3. Sizing: Author vs. Publish",
          "4. Observabilidad: New Relic y Adobe Developer Console",
          "5. Cuellos de Botella Típicos y Cómo Detectarlos"
        ]
      }
    ]
  },
  {
    "id": "module-19",
    "number": 19,
    "title": "Módulo 19: AEM Assets y Dynamic Media",
    "level": "Experto",
    "chapters": [
      {
        "id": "ch-131",
        "number": "131",
        "title": "Fundamentos de AEM Assets: DAM, Ingesta y Metadata Schemas",
        "level": "Avanzado",
        "track": "back",
        "summary": "Comprende los mecanismos de ingesta de assets y diseña Metadata Schemas que gobiernan la búsqueda y organización del DAM.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Fundamentos de AEM Assets: DAM, Ingesta y Metadata Schemas",
          "Ingesta: Cómo Entra un Asset al Repositorio",
          "Metadata Schemas: la Interfaz de Propiedades del Asset"
        ]
      },
      {
        "id": "ch-132",
        "number": "132",
        "title": "Workflows de Procesamiento de Assets: Processing Profiles y Renditions",
        "level": "Experto",
        "track": "back",
        "summary": "Configura Processing Profiles y post-procesamiento con Workflows para controlar qué renditions se generan de cada asset.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Workflows de Procesamiento de Assets: Processing Profiles y Renditions",
          "Processing Profiles: Qué Renditions se Generan",
          "Post-Processing: Cuando el Profile No Alcanza"
        ]
      },
      {
        "id": "ch-133",
        "number": "133",
        "title": "Servicios de IA de Adobe Sensei: Smart Tags y Smart Crop",
        "level": "Experto",
        "track": "back",
        "summary": "Automatiza el etiquetado y el recorte responsivo de imágenes y video con Adobe Sensei, con la gobernanza editorial necesaria.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Servicios de IA de Adobe Sensei: Smart Tags y Smart Crop",
          "Smart Tags: Etiquetado Automático por Contenido Visual",
          "Smart Crop: Recorte Responsivo Automático"
        ]
      },
      {
        "id": "ch-134",
        "number": "134",
        "title": "Dynamic Media: Imágenes y Video Responsivo a Escala",
        "level": "Experto",
        "track": "front",
        "summary": "Entrega imágenes y video responsivo bajo demanda vía Dynamic Media, con srcset e impacto directo en Core Web Vitals.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Dynamic Media: Imágenes y Video Responsivo a Escala",
          "Entrega Bajo Demanda vía URL",
          "Video Responsivo y Streaming Adaptativo"
        ]
      },
      {
        "id": "ch-135",
        "number": "135",
        "title": "Asset Microservices y Consumo de Assets vía API/GraphQL",
        "level": "Experto",
        "track": "back",
        "summary": "Comprende la arquitectura de Asset Microservices en AEMaaCS y consume assets desde un frontend headless vía Sling Exporter o GraphQL.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Asset Microservices y Consumo de Assets vía API/GraphQL",
          "Arquitectura de Asset Microservices",
          "Consumir Assets desde un Frontend Externo"
        ]
      },
      {
        "id": "ch-136",
        "number": "136",
        "title": "Gobernanza de Assets: Permisos, Brand Portal y Asset Share Links",
        "level": "Experto",
        "track": "back",
        "summary": "Diseña permisos granulares del DAM y elige entre Brand Portal y Asset Share Links para distribuir assets a audiencias externas.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Gobernanza de Assets: Permisos, Brand Portal y Asset Share Links",
          "Permisos a Nivel de Carpeta del DAM",
          "Brand Portal: Distribución a Audiencias Externas",
          "Asset Share Links: Compartir sin Cuenta"
        ]
      }
    ]
  },
  {
    "id": "module-20",
    "number": 20,
    "title": "Módulo 20: Ecosistema: Forms, Commerce, Integraciones y Personalización",
    "level": "Experto",
    "chapters": [
      {
        "id": "ch-137",
        "number": "137",
        "title": "AEM Forms: Formularios Adaptables e Integración",
        "level": "Experto",
        "track": "back",
        "summary": "Diseña formularios adaptables con Core Components, reglas condicionales del Rule Editor, FDM, firma con Adobe Sign/Document of Record y consumo headless.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Formularios Adaptables (Adaptive Forms)",
          "El Rule Editor: Lógica Condicional sin Código",
          "FDM (Form Data Model) y Adobe Sign",
          "Formularios Headless: Consumir el Modelo desde una SPA"
        ]
      },
      {
        "id": "ch-138",
        "number": "138",
        "title": "AEM Commerce (CIF): Integración de Comercio Electrónico",
        "level": "Experto",
        "track": "back",
        "summary": "Comprende el Commerce Integration Framework (CIF), el mapeo de catálogos y el consumo de productos vía GraphQL.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "¿Qué es el Commerce Integration Framework (CIF)?",
          "Comunicación vía GraphQL en AEM"
        ]
      },
      {
        "id": "ch-139",
        "number": "139",
        "title": "Integración Avanzada de APIs y Servicios SaaS de Terceros",
        "level": "Experto",
        "track": "back",
        "summary": "Domina el intercambio de token OAuth2, la subida de archivos multipart a sistemas externos, el enrutamiento de acciones por selectores en un solo servlet y el cliente HTTP gestionado por OSGi.",
        "prerequisites": [
          "ch-51"
        ],
        "status": "pending",
        "outline": [
          "Integración Avanzada de APIs y Servicios SaaS de Terceros",
          "Intercambio de Token OAuth2 (Password Grant) para APIs de CRM/Marketing",
          "Subida de Archivos a un Sistema Externo (Multipart + Doble Credencial)",
          "Enrutamiento de Múltiples Acciones bajo un Solo Servlet vía Selectores",
          "Servicios de Búsqueda SaaS Configurados por Run Mode",
          "Cliente HTTP Gestionado por OSGi en vez de HttpClient Ad-Hoc"
        ]
      },
      {
        "id": "ch-140",
        "number": "140",
        "title": "Integraciones del Ecosistema Adobe Experience Cloud",
        "level": "Experto",
        "track": "back",
        "summary": "Comprende a nivel de arquitectura la integración con Adobe I/O Runtime/Events, Target, Analytics, Launch/Tags y Real-Time CDP.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Integraciones del Ecosistema Adobe Experience Cloud",
          "1. El Patrón de Integración Central: Adobe I/O",
          "2. Adobe I/O Runtime: Cómputo Serverless Desacoplado",
          "3. Adobe I/O Events: Arquitectura de Notificación Basada en Eventos",
          "4. Adobe Target: Arquitectura de Personalización",
          "5. Adobe Analytics: Arquitectura de Tracking",
          "6. Adobe Launch (Tags): Gobernanza de Scripts de Terceros",
          "7. Real-Time Customer Data Platform (RT-CDP): Cierre del Círculo de Personalización",
          "8. Matriz de Decisión: Qué Integrar y Cuándo"
        ]
      },
      {
        "id": "ch-141",
        "number": "141",
        "title": "Personalización: ContextHub, Adobe Target y Ofertas con Experience Fragments",
        "level": "Experto",
        "track": "front",
        "summary": "Personaliza contenido por audiencia con ContextHub y Adobe Target, usando Experience Fragments como ofertas y considerando el impacto en la caché.",
        "prerequisites": [
          "ch-34"
        ],
        "status": "pending",
        "outline": [
          "ContextHub: stores, segmentos y UI",
          "Integración con Adobe Target",
          "Experience Fragments como ofertas",
          "Personalización y caché: patrones client-side vs. edge",
          "Medición de resultados"
        ]
      }
    ]
  },
  {
    "id": "module-21",
    "number": 21,
    "title": "Módulo 21: Arquitectura de Soluciones AEM (Architect)",
    "level": "Arquitecto",
    "chapters": [
      {
        "id": "ch-142",
        "number": "142",
        "title": "Headless vs. Sites vs. Híbrido: Matriz de Decisión Arquitectónica",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Aprende a elegir entre SPA Editor, Edge Delivery Services, GraphQL headless puro o AEM Sites tradicional según el caso de negocio.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Problema Real: No Existe una Arquitectura 'Correcta' Universal",
          "1. Los Cuatro Paradigmas",
          "2. Matriz Comparativa",
          "3. Árbol de Decisión: Preguntas que Debes Hacer Antes de Elegir",
          "4. Casos de Uso Reales por Industria",
          "5. Cómo Justificar la Elección ante Stakeholders de Negocio",
          "6. Diseño Práctico de un Proyecto Híbrido: Estructura Multi-Módulo",
          "7. Checklist de Madurez para Sustentar la Decisión Arquitectónica"
        ]
      },
      {
        "id": "ch-143",
        "number": "143",
        "title": "Seguridad de Identidad: Adobe IMS, SSO y Modelo de Permisos a Escala",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Integra Adobe IMS y SSO corporativo, y diseña un modelo de ACLs granular y mantenible aplicando el principio de mínimo privilegio.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "El Perímetro de Identidad en AEM as a Cloud Service",
          "Adobe IMS: El Directorio Central de la Organización",
          "Identidades de Máquina: Service Credentials (OAuth Server-to-Server)",
          "SSO Corporativo en Author: SAML2 y OIDC",
          "Diseño del Modelo de ACL: Rol vs. Sitio",
          "rep:policy y el Modelo ACL del JCR",
          "Provisioning de Permisos como Código: repoinit",
          "Caso de Estudio: Estructura de Grupos para un Proyecto Multi-Marca"
        ]
      },
      {
        "id": "ch-144",
        "number": "144",
        "title": "Alta Disponibilidad, Clustering y Disaster Recovery",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Comprende el clustering de Author, la topología de granjas de Publish y la estrategia de Disaster Recovery (RTO/RPO) en Cloud Service.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Disponibilidad como Decisión de Arquitectura, No como Feature",
          "Clustering en AEM 6.5 On-Premise: TarMK vs. MongoMK",
          "Cómo AEMaaCS Resuelve HA de Forma Gestionada",
          "Topología del Publish Farm Detrás de Dispatcher y CDN",
          "Agentes de Replicación y Flush",
          "Estrategia de Disaster Recovery: Backups, RTO y RPO",
          "Qué Controla el Arquitecto vs. Qué Gestiona Adobe"
        ]
      },
      {
        "id": "ch-145",
        "number": "145",
        "title": "Migración de AEM 6.5 a AEM as a Cloud Service",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Aplica un checklist de cloud readiness, usa el Content Transfer Tool y define una estrategia de migración incremental segura.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Migración de AEM 6.5 a AEM as a Cloud Service: La Perspectiva del Architect",
          "1. Diferencias Arquitectónicas Fundamentales",
          "2. Checklist de Cloud Readiness: Patrones Prohibidos",
          "3. Content Transfer Tool (CTT): Migración del JCR",
          "4. Migración de Configuraciones OSGi Legacy",
          "5. Estrategia de Migración: Incremental vs. Big-Bang",
          "6. Pruebas de Regresión Post-Migración"
        ]
      },
      {
        "id": "ch-146",
        "number": "146",
        "title": "Diseño Multi-tenant y Multi-marca en AEM",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Diseña una plataforma AEM que aloje varias marcas o países: aislamiento de código, contenido, permisos, configuraciones y caché.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Estrategias: un repositorio vs. varios, un programa vs. varios",
          "Aislamiento en /apps, /conf, /content y /content/dam",
          "Permisos por tenant y grupos",
          "CA-Configs y tenancy",
          "Dispatcher y dominios por marca",
          "Gobernanza de componentes compartidos"
        ]
      },
      {
        "id": "ch-147",
        "number": "147",
        "title": "Gobernanza Técnica y Preparación para Certificación de Architect",
        "level": "Arquitecto",
        "track": "back",
        "summary": "Define estándares de código, Architecture Decision Records y un checklist de revisión, cerrando el manual con el mapeo a la certificación Adobe Certified Master.",
        "prerequisites": [],
        "status": "pending",
        "outline": [
          "Gobernanza Técnica y Preparación para la Certificación Adobe Certified Master — AEM Architect",
          "1. Estándares de Código: Automatizar el Criterio, no Debatirlo en cada PR",
          "2. Checklist de Code Review para un Architect",
          "3. Architecture Decision Records (ADR): Documentar el Porqué, no Solo el Qué",
          "4. Checklist de Revisión Técnica Pre-Producción (Go-Live Readiness)",
          "5. Mapa del Manual Completo vs. Dominios del Examen Adobe Certified Master — AEM Architect"
        ]
      }
    ]
  }
];

// Lista plana de temas en orden de lectura
export const allChapters = allModules.flatMap(module =>
  module.chapters.map(c => ({
    ...c,
    moduleId: module.id,
    moduleNumber: module.number,
    moduleTitle: module.title
  }))
);

export const chaptersMap = Object.fromEntries(allChapters.map(c => [c.id, c]));

export const levelClass = (level) =>
  'diff-' + level.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const manualStats = {
  totalModules: allModules.length,
  totalChapters: allChapters.length,
  pendingChapters: allChapters.filter(c => c.status === 'pending').length,
  levels: Object.fromEntries(LEVELS.map(l => [l, allChapters.filter(c => c.level === l).length]))
};
