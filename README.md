# Manual de Desarrollador y Arquitecto AEM

Manual técnico e interactivo para aprender Adobe Experience Manager (AEM 6.5 y AEM as a Cloud Service) desde nivel **Básico** hasta nivel **Arquitecto**. Cada tema incluye teoría, ejemplos prácticos paso a paso (desde la instalación y configuración), buenas prácticas, ventajas y desventajas, recursos oficiales y una autoevaluación aleatoria.

## Cómo se organiza el temario

- **21 módulos** ordenados por dificultad: Básico → Intermedio → Avanzado → Experto → Arquitecto.
- **147 temas**, cada uno con un tag **Front** o **Back**. El sidebar permite filtrar por track.
- Cuando un tema depende de otro (por ejemplo, un tema de front que necesita un Sling Model), la cabecera del tema muestra la sección **"Antes de este tema revisa"** con enlaces directos.
- Los temas marcados como *(en desarrollo)* ya forman parte del temario y muestran su índice planeado; su contenido se redacta de forma incremental (ver `HANDOFF.md`).

## Evaluaciones

| Nivel | Qué evalúa | Mecánica |
|---|---|---|
| Por tema | El tema actual | 5 preguntas al azar del banco del tema, opciones mezcladas, 80% para aprobar |
| Por módulo | Todos los temas del módulo | Cronometrado, preguntas aleatorias, 80% para aprobar, 2 intentos por día |
| Final Frontend / Backend | Temas del track | 50 preguntas aleatorias |
| Final Developer (AD0-E134) | Módulos del perfil Sites Developer | Simulacro de certificación |
| Final Architect (AD0-E117) | Módulos del perfil Sites Architect | Simulacro de certificación |

## Temario


### Módulo 1: Fundamentos de AEM y Entorno de Trabajo · Básico
* **Tema 1** [Back · Básico] Introducción a los CMS y a Adobe Experience Manager: 6.5, 6.5 LTS, Cloud Service y Edge Delivery Services
* **Tema 2** [Back · Básico] Arquitectura General de AEM: Author, Publish, Dispatcher, JCR, Sling y OSGi
* **Tema 3** [Back · Básico] Preparación del Entorno de Desarrollo: Java, Maven, Git, Node.js e IDE
* **Tema 4** [Back · Básico] Instalación Local de AEM 6.5 (Quickstart) y AEM SDK para Cloud Service
* **Tema 5** [Front · Básico] Recorrido por las Consolas de AEM y Authoring Básico
* **Tema 6** [Back · Básico] Navegación del JCR (CRXDE Lite) y Administración de Paquetes
* **Tema 7** [Back · Básico] OSGi Web Console (/system/console): Bundles, Componentes, Configuraciones y Logs

### Módulo 2: Creación de Proyectos AEM (6.5 y Cloud Service) · Básico
* **Tema 8** [Back · Básico] Cómo Crear un Proyecto AEM con el Maven Archetype
* **Tema 9** [Back · Básico] Anatomía del Proyecto Maven: core, ui.apps, ui.content, ui.config, ui.frontend, all y dispatcher
* **Tema 10** [Back · Básico] FileVault a Fondo: filter.xml, Modos de Importación y Tipos de Paquete
* **Tema 11** [Back · Básico] Laboratorio: Proyecto AEM 6.5 Estándar (HTL) desde Cero
* **Tema 12** [Back · Básico] Laboratorio: Proyecto AEM as a Cloud Service Estándar desde Cero
* **Tema 13** [Front · Básico] Laboratorio: Proyecto AEM con React y SPA Editor (Archetype 57)
* **Tema 14** [Front · Básico] Laboratorio: Proyecto AEM con Angular y SPA Editor (Archetype 57)
* **Tema 15** [Back · Básico] Flujo de Despliegue Local: Perfiles Maven, Sincronización en Caliente y Git Flow *(en desarrollo)*

### Módulo 3: Componentes, HTL y Diálogos Básicos · Básico
* **Tema 16** [Front · Básico] Creación de Componentes AEM: Estructura JCR y Versionado *(en desarrollo)*
* **Tema 17** [Front · Básico] Guía Completa de Directivas y Expresiones HTL *(en desarrollo)*
* **Tema 18** [Front · Básico] Modularidad en HTL: Separación de Archivos y Plantillas *(en desarrollo)*
* **Tema 19** [Front · Básico] Componentes Core: Uso y Habilitación mediante Código *(en desarrollo)*
* **Tema 20** [Front · Básico] Herencia de Componentes: sling:resourceType y sling:resourceSuperType *(en desarrollo)*
* **Tema 21** [Front · Básico] Diálogos Touch UI Básicos: Campos Granite más Usados *(en desarrollo)*
* **Tema 22** [Front · Básico] Propiedades de Página en HTL: Propias y Heredadas *(en desarrollo)*
* **Tema 23** [Front · Básico] Uso de Tags en AEM desde HTL *(en desarrollo)*

### Módulo 4: Frontend en AEM: Clientlibs, Estilos y Buenas Prácticas · Básico
* **Tema 24** [Front · Básico] Clientlibs (Client Libraries): Buenas Prácticas, Ventajas y Desventajas *(en desarrollo)*
* **Tema 25** [Front · Básico] ui.frontend a Fondo: Webpack, Servidor de Desarrollo y Proxy a AEM *(en desarrollo)*
* **Tema 26** [Front · Básico] Configuración de SASS o LESS en ui.frontend: Estructura, Ventajas y Desventajas *(en desarrollo)*
* **Tema 27** [Front · Básico] Configuración de JavaScript y TypeScript en ui.frontend *(en desarrollo)*
* **Tema 28** [Front · Básico] AEM Style System: Configuración de Reglas, Políticas y Buenas Prácticas *(en desarrollo)*
* **Tema 29** [Front · Básico] Buenas Prácticas de Maquetación: Semántica, SEO, Accesibilidad y DevTools *(en desarrollo)*

### Módulo 5: Estructuras de Contenido: Templates, Tags, Experience Fragments y Content Fragments · Intermedio
* **Tema 30** [Front · Intermedio] Templates Editables desde el Template Editor: Estructura, Contenido Inicial, Políticas y Layout *(en desarrollo)*
* **Tema 31** [Front · Intermedio] Creación de Plantillas de Página por Código *(en desarrollo)*
* **Tema 32** [Front · Intermedio] Tagging a Fondo: Namespaces, Consola de Tags, Permisos y TagManager API *(en desarrollo)*
* **Tema 33** [Front · Intermedio] Experience Fragments (XF) y su Integración en Plantillas *(en desarrollo)*
* **Tema 34** [Front · Intermedio] Experience Fragments Avanzados: Variaciones, Building Blocks, Header/Footer Global y Exportación a Target *(en desarrollo)*
* **Tema 35** [Back · Intermedio] Creación de Content Fragment Models desde la Consola de AEM *(en desarrollo)*
* **Tema 36** [Front · Intermedio] Launches, Versiones de Página y Flujo de Publicación del Autor *(en desarrollo)*

### Módulo 6: Fundamentos de Backend: Java, OSGi y Sling · Intermedio
* **Tema 37** [Back · Intermedio] Introducción al Backend en AEM: Java, OSGi, JCR y Fundamentos de Sling Models *(en desarrollo)*
* **Tema 38** [Back · Intermedio] OSGi Declarative Services: @Component, @Reference, @Activate y Ciclo de Vida *(en desarrollo)*
* **Tema 39** [Back · Intermedio] Configuraciones OSGi: .cfg.json, Run Modes, Factory Configs, Variables de Entorno y Secretos *(en desarrollo)*
* **Tema 40** [Back · Intermedio] Resolución de Peticiones en Sling: URL, Selectores, Extensión, Sufijo y Scripts *(en desarrollo)*
* **Tema 41** [Back · Intermedio] Sling Resource Resolver, Resource Merger y Overlays *(en desarrollo)*
* **Tema 42** [Back · Avanzado] Sling Filters, Adapters y Ciclo de Vida OSGi Avanzado *(en desarrollo)*
* **Tema 43** [Back · Intermedio] JCR API y Sling Resource API: Leer y Escribir Nodos de Forma Segura *(en desarrollo)*
* **Tema 44** [Back · Intermedio] Service Users y Service User Mapping: Checklist Completo *(en desarrollo)*

### Módulo 7: Sling Models, Servlets y Lógica de Negocio · Intermedio
* **Tema 45** [Back · Intermedio] Modelos Sling (Sling Models) para Consumo de Diálogos *(en desarrollo)*
* **Tema 46** [Back · Intermedio] Multifields en Modelos Sling - Método 1: Resource API *(en desarrollo)*
* **Tema 47** [Back · Intermedio] Multifields en Modelos Sling - Método 2: Colecciones Bean con @ChildResource *(en desarrollo)*
* **Tema 48** [Back · Intermedio] Propiedades de Página en Sling Models: Locales y Heredadas *(en desarrollo)*
* **Tema 49** [Back · Avanzado] Content Services y Sling Model Exporter: Exposición de JSON Nativo (.model.json) *(en desarrollo)*
* **Tema 50** [Back · Intermedio] Creación de Servlets desde Cero (GET, POST, PUT, DELETE) *(en desarrollo)*
* **Tema 51** [Back · Intermedio] Consumo de APIs desde Modelos OSGi y Contratos *(en desarrollo)*
* **Tema 52** [Back · Intermedio] Propiedades de Página Protegidas y OSGi Config (CA-Configs) *(en desarrollo)*
* **Tema 53** [Back · Intermedio] Internacionalización (i18n) en AEM: Sling i18n *(en desarrollo)*
* **Tema 54** [Back · Intermedio] Servlet i18n JSON: Exposición de Diccionarios para SPA *(en desarrollo)*

### Módulo 8: UX de Autoría: Diálogos Avanzados y RTE · Intermedio
* **Tema 55** [Front · Intermedio] Personalizar Estilos de Diálogos Touch UI *(en desarrollo)*
* **Tema 56** [Front · Intermedio] Comportamiento Dinámico en Diálogos con JS *(en desarrollo)*
* **Tema 57** [Front · Intermedio] Personalización del Rich Text Editor (RTE) *(en desarrollo)*
* **Tema 58** [Front · Intermedio] Creación de un Icon Picker Personalizado *(en desarrollo)*
* **Tema 59** [Front · Intermedio] Actualizar Componentes sin Recargar la Página Completa *(en desarrollo)*
* **Tema 60** [Front · Intermedio] Panel Selector: Edición de Paneles en Carousel, Tabs y Accordion *(en desarrollo)*
* **Tema 61** [Front · Intermedio] Validación Personalizada de Campos en Diálogos Touch UI *(en desarrollo)*
* **Tema 62** [Front · Intermedio] Datasource Dinámico: Poblando Selects y Multifields desde el JCR o APIs *(en desarrollo)*
* **Tema 63** [Front · Intermedio] Diálogos Condicionados por la Content Policy de la Plantilla *(en desarrollo)*
* **Tema 64** [Front · Intermedio] Overlay de Diálogos OOTB de Core Components con Resource Merger *(en desarrollo)*

### Módulo 9: Tareas Programadas, Eventos y Workflows · Intermedio
* **Tema 65** [Back · Intermedio] Sling Scheduler con Expresiones Cron: Programar Tareas y Guardar Información en Nodos *(en desarrollo)*
* **Tema 66** [Back · Intermedio] Eventing y Tareas Programadas: OSGi Schedulers y Sling Jobs *(en desarrollo)*
* **Tema 67** [Back · Intermedio] Listeners de Contenido: ResourceChangeListener, EventHandler y Replicación *(en desarrollo)*
* **Tema 68** [Back · Avanzado] Motor de Workflows en AEM: Modelos, Participant Steps y Launchers *(en desarrollo)*
* **Tema 69** [Back · Avanzado] Workflow Process Step Personalizado en Java *(en desarrollo)*

### Módulo 10: Repositorio, Consultas e Índices · Intermedio
* **Tema 70** [Back · Intermedio] Consultas JCR: QueryBuilder y JCR-SQL2 *(en desarrollo)*
* **Tema 71** [Back · Avanzado] Oak y el Repositorio JCR por Dentro *(en desarrollo)*
* **Tema 72** [Back · Avanzado] Índices Oak: oak:index, Lucene, Explain Query y Gestión de Índices en Cloud *(en desarrollo)*
* **Tema 73** [Back · Intermedio] Procesamiento de CSV y Excel (XLSX): Importación y Exportación *(en desarrollo)*
* **Tema 74** [Back · Intermedio] Generación de PDFs Personalizados desde Java en AEM *(en desarrollo)*
* **Tema 75** [Back · Intermedio] AEM Groovy Console: Scripting Administrativo y Manipulación del JCR *(en desarrollo)*
* **Tema 76** [Back · Intermedio] ACS AEM Commons: Herramientas Esenciales para Proyectos Reales *(en desarrollo)*

### Módulo 11: Entornos Locales con Docker y Dispatcher Local · Intermedio
* **Tema 77** [Back · Intermedio] Docker desde Cero para Desarrolladores AEM *(en desarrollo)*
* **Tema 78** [Back · Intermedio] Entorno AEM Completo con Docker Compose: Author, Publish y Dispatcher *(en desarrollo)*
* **Tema 79** [Back · Intermedio] Entorno local de Publish y Dispatcher local *(en desarrollo)*
* **Tema 80** [Back · Intermedio] Replicación y Flush de Extremo a Extremo en Local: Probar como en Producción *(en desarrollo)*

### Módulo 12: Dispatcher y Estrategias de Caché · Avanzado
* **Tema 81** [Back · Avanzado] El Dispatcher de AEM: Caching y Servlets *(en desarrollo)*
* **Tema 82** [Back · Avanzado] AEM Dispatcher: Configuración Detallada de Filtros de Seguridad *(en desarrollo)*
* **Tema 83** [Back · Avanzado] AEM Dispatcher: Gestión de Caché Avanzada, Cabeceras y TTL *(en desarrollo)*
* **Tema 84** [Back · Avanzado] Invalidación de Caché en el Dispatcher: statfileslevel, Flush Agents y Auto-invalidation *(en desarrollo)*
* **Tema 85** [Back · Avanzado] AEM Dispatcher: Virtual Hosts y Configuración Multi-dominio *(en desarrollo)*
* **Tema 86** [Back · Avanzado] URLs Cortas y Amigables: Sling Mappings vs. Apache Rules *(en desarrollo)*
* **Tema 87** [Back · Avanzado] AEM Dispatcher: Gestión de Vanity URLs Dinámicas *(en desarrollo)*
* **Tema 88** [Back · Experto] AEM Dispatcher: Permission-Sensitive Caching y Auth Checker *(en desarrollo)*
* **Tema 89** [Back · Experto] AEM Dispatcher: Balanceo de Carga, Renders y Sticky Sessions *(en desarrollo)*
* **Tema 90** [Back · Avanzado] Gestión de Caché por Componente: Sling Dynamic Include (SDI) *(en desarrollo)*
* **Tema 91** [Back · Avanzado] Caché de Extremo a Extremo: Navegador, CDN, Dispatcher y AEM *(en desarrollo)*
* **Tema 92** [Back · Experto] CDN (Fastly) y Estrategias de Invalidación de Caché a Escala *(en desarrollo)*

### Módulo 13: Content Fragments, Headless y GraphQL · Avanzado
* **Tema 93** [Back · Avanzado] Content Fragments (CF): Creación y Consumo desde Java *(en desarrollo)*
* **Tema 94** [Back · Avanzado] GraphQL, Persisted Queries y Content Fragments a Escala *(en desarrollo)*
* **Tema 95** [Front · Avanzado] Aplicaciones Headless con React y Angular Consumiendo GraphQL de AEM *(en desarrollo)*
* **Tema 96** [Front · Experto] Universal Editor: Instrumentación y Edición Visual de Apps Headless *(en desarrollo)*

### Módulo 14: SPA Editor con React y Angular · Avanzado
* **Tema 97** [Front · Avanzado] La Arquitectura de AEM SPA Editor *(en desarrollo)*
* **Tema 98** [Front · Avanzado] Arrancando el Proyecto SPA Paso a Paso: Estructura y Servidor Local *(en desarrollo)*
* **Tema 99** [Front · Avanzado] SPA Editor con React: Configuración y Mapeo MapTo *(en desarrollo)*
* **Tema 100** [Front · Avanzado] React en AEM: Estructura Modular y Subcomponentes *(en desarrollo)*
* **Tema 101** [Front · Avanzado] SPA Editor con Angular: Configuración e Implementación *(en desarrollo)*
* **Tema 102** [Front · Avanzado] Mapeo del Componente Page Raíz en React y Angular *(en desarrollo)*
* **Tema 103** [Front · Avanzado] Mapeo del Container y Responsive Grid para Edición Visual *(en desarrollo)*
* **Tema 104** [Front · Avanzado] Routing Multi-Página Sincronizado con el PageModelManager *(en desarrollo)*
* **Tema 105** [Front · Avanzado] Modelos Tipados de Datos en React y Angular *(en desarrollo)*
* **Tema 106** [Front · Experto] SPA Editor Clásico vs. Remote SPA + Universal Editor *(en desarrollo)*

### Módulo 15: Edge Delivery Services: de Cero a Experto · Avanzado
* **Tema 107** [Front · Básico] Edge Delivery Services (EDS): La Revolución de Rendimiento *(en desarrollo)*
* **Tema 108** [Front · Básico] Edge Delivery Services desde Cero: tu Primer Sitio con Document Authoring *(en desarrollo)*
* **Tema 109** [Front · Intermedio] Anatomía de un Proyecto EDS: scripts.js, aem.js, Fases Eager/Lazy/Delayed y Estilos *(en desarrollo)*
* **Tema 110** [Front · Intermedio] Desarrollo en Edge Delivery Services: Creación de Bloques y Lógica Serverless *(en desarrollo)*
* **Tema 111** [Front · Avanzado] Bloques Avanzados en EDS: Variantes, Auto-blocking, Fragmentos y Metadata *(en desarrollo)*
* **Tema 112** [Front · Avanzado] Datos en EDS: Spreadsheets como JSON, query-index y Formularios *(en desarrollo)*
* **Tema 113** [Front · Avanzado] Desarrollo Local en EDS: AEM CLI, Ramas, Previews y Linting *(en desarrollo)*
* **Tema 114** [Front · Avanzado] Edge Delivery Services: Performance, SEO, Navegación y Redirects *(en desarrollo)*
* **Tema 115** [Front · Experto] Arquitectura Híbrida en AEM: Sites, Content Fragments y Universal Editor en EDS *(en desarrollo)*
* **Tema 116** [Front · Experto] EDS a Escala: Multi-sitio, Repoless, CDN Propia, Headers y Producción *(en desarrollo)*

### Módulo 16: Seguridad, Multi-sitio y Traducciones · Avanzado
* **Tema 117** [Back · Avanzado] Seguridad Web en AEM: XSS API, CSRF, ACLs y OWASP *(en desarrollo)*
* **Tema 118** [Back · Avanzado] Control de Acceso y Login en Páginas (CUG) *(en desarrollo)*
* **Tema 119** [Back · Avanzado] Seguridad a nivel de Componente *(en desarrollo)*
* **Tema 120** [Back · Avanzado] Activación y Configuración de un Proyecto Multi-sitio (MSM) *(en desarrollo)*
* **Tema 121** [Back · Avanzado] Translation Integration y Language Copies *(en desarrollo)*

### Módulo 17: Calidad: Testing y Depuración · Avanzado
* **Tema 122** [Back · Intermedio] Depuración y Troubleshooting en AEM *(en desarrollo)*
* **Tema 123** [Back · Avanzado] Pruebas Unitarias en el Backend: AEM Mocks y Mockito *(en desarrollo)*
* **Tema 124** [Front · Avanzado] Pruebas Unitarias en el Frontend: Vitest y Cobertura *(en desarrollo)*
* **Tema 125** [Back · Experto] Testing de Integración (aem-testing-clients) y End-to-End en AEM *(en desarrollo)*

### Módulo 18: AEM as a Cloud Service, DevOps y Operación · Experto
* **Tema 126** [Back · Experto] Estructura de Repositorio para AEM as a Cloud Service: Mutable vs. Inmutable y Run Modes *(en desarrollo)*
* **Tema 127** [Back · Experto] Cloud Manager e Integración Continua (CI/CD) *(en desarrollo)*
* **Tema 128** [Back · Experto] Cloud Manager Avanzado: Pipelines, RDE y Gobernanza de Despliegues *(en desarrollo)*
* **Tema 129** [Back · Experto] Ciclo de Vida de Versiones en AEM 6.5: Cómo Elegir un Service Pack *(en desarrollo)*
* **Tema 130** [Back · Experto] Performance, Sizing y Observabilidad *(en desarrollo)*

### Módulo 19: AEM Assets y Dynamic Media · Experto
* **Tema 131** [Back · Avanzado] Fundamentos de AEM Assets: DAM, Ingesta y Metadata Schemas *(en desarrollo)*
* **Tema 132** [Back · Experto] Workflows de Procesamiento de Assets: Processing Profiles y Renditions *(en desarrollo)*
* **Tema 133** [Back · Experto] Servicios de IA de Adobe Sensei: Smart Tags y Smart Crop *(en desarrollo)*
* **Tema 134** [Front · Experto] Dynamic Media: Imágenes y Video Responsivo a Escala *(en desarrollo)*
* **Tema 135** [Back · Experto] Asset Microservices y Consumo de Assets vía API/GraphQL *(en desarrollo)*
* **Tema 136** [Back · Experto] Gobernanza de Assets: Permisos, Brand Portal y Asset Share Links *(en desarrollo)*

### Módulo 20: Ecosistema: Forms, Commerce, Integraciones y Personalización · Experto
* **Tema 137** [Back · Experto] AEM Forms: Formularios Adaptables e Integración *(en desarrollo)*
* **Tema 138** [Back · Experto] AEM Commerce (CIF): Integración de Comercio Electrónico *(en desarrollo)*
* **Tema 139** [Back · Experto] Integración Avanzada de APIs y Servicios SaaS de Terceros *(en desarrollo)*
* **Tema 140** [Back · Experto] Integraciones del Ecosistema Adobe Experience Cloud *(en desarrollo)*
* **Tema 141** [Front · Experto] Personalización: ContextHub, Adobe Target y Ofertas con Experience Fragments *(en desarrollo)*

### Módulo 21: Arquitectura de Soluciones AEM (Architect) · Arquitecto
* **Tema 142** [Back · Arquitecto] Headless vs. Sites vs. Híbrido: Matriz de Decisión Arquitectónica *(en desarrollo)*
* **Tema 143** [Back · Arquitecto] Seguridad de Identidad: Adobe IMS, SSO y Modelo de Permisos a Escala *(en desarrollo)*
* **Tema 144** [Back · Arquitecto] Alta Disponibilidad, Clustering y Disaster Recovery *(en desarrollo)*
* **Tema 145** [Back · Arquitecto] Migración de AEM 6.5 a AEM as a Cloud Service *(en desarrollo)*
* **Tema 146** [Back · Arquitecto] Diseño Multi-tenant y Multi-marca en AEM *(en desarrollo)*
* **Tema 147** [Back · Arquitecto] Gobernanza Técnica y Preparación para Certificación de Architect *(en desarrollo)*

## Desarrollo

```bash
npm install
npm run dev
```

## Organización del código

| Ruta | Contenido |
|---|---|
| `src/data/chaptersMetadata.js` | Fuente única del temario: módulos, orden, nivel, track, prerrequisitos y temas pendientes |
| `src/components/chapters/moduleNN/ChapterX.jsx` | Contenido de cada tema. `X` es el id estable del tema (`ch-X`), no su número visible |
| `src/data/quizBank/moduleNN.js` | Banco de preguntas por módulo; cada pregunta referencia su `chapterId` |
| `src/data/quizBank/index.js` | Agregación del banco por tema, módulo, track y certificación |
| `src/components/LessonUI.jsx` | Componentes de lección, cabecera del tema y autoevaluación aleatoria |

- Los temas se registran automáticamente (`import.meta.glob`), no hay índice manual.
- El número visible de un tema se calcula por su posición en el temario; el id `ch-X` nunca cambia para no perder el progreso guardado.
- Para referenciar otro tema dentro del texto usa `[[ch-X]]` (se muestra como "Tema N" con enlace) o `[[#ch-X]]` (solo el número).
