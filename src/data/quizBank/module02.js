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
  },
  {
    "id": "ch-10-q1",
    "chapterId": "ch-10",
    "type": "single",
    "question": "En un filter.xml con una sola regla <include pattern=\"/content/sitio/es(/.*)?\"/>, ¿qué se incluye?",
    "options": [
      "Todo /content/sitio.",
      "Solo /content/sitio/es y lo que tiene debajo.",
      "Todo excepto /content/sitio/es."
    ],
    "answer": [
      1
    ],
    "explanation": "La primera regla fija el valor por defecto: si es include, todo lo que no coincide queda excluido."
  },
  {
    "id": "ch-10-q2",
    "chapterId": "ch-10",
    "type": "single",
    "question": "Tienes un include de /es(/.*)? seguido de un exclude de /es/borradores(/.*)?. ¿Qué pasa con /es/borradores/nota?",
    "options": [
      "Se incluye, porque coincide con el include.",
      "Se excluye, porque gana la última regla que coincide.",
      "Da error por reglas contradictorias."
    ],
    "answer": [
      1
    ],
    "explanation": "Las rutas se prueban contra todas las reglas y decide la última que coincide, en este caso el exclude."
  },
  {
    "id": "ch-10-q3",
    "chapterId": "ch-10",
    "type": "single",
    "question": "Una regla <exclude pattern=\"/content/sitio/temporal\"/> no excluye los hijos de temporal. ¿Por qué?",
    "options": [
      "Porque exclude no funciona en AEM.",
      "Porque falta (/.*)? para que la expresión cubra también los descendientes.",
      "Porque hay que usar matchProperties."
    ],
    "answer": [
      1
    ],
    "explanation": "Sin (/.*)? la expresión solo coincide con el nodo exacto. Con /content/sitio/temporal(/.*)? cubre el nodo y todo lo que está debajo."
  },
  {
    "id": "ch-10-q4",
    "chapterId": "ch-10",
    "type": "single",
    "question": "Instalas en modo replace un paquete que no trae la propiedad \"manual\" que existe en el nodo. ¿Qué pasa con ella?",
    "options": [
      "Se conserva.",
      "Se elimina, porque replace deja la rama idéntica al paquete.",
      "Se duplica."
    ],
    "answer": [
      1
    ],
    "explanation": "En replace, lo que está dentro de la rama controlada y no viene en el paquete se borra."
  },
  {
    "id": "ch-10-q5",
    "chapterId": "ch-10",
    "type": "single",
    "question": "¿Qué hace el modo merge_properties con una propiedad que ya existe y también viene en el paquete?",
    "options": [
      "La reemplaza con el valor del paquete.",
      "No la toca: conserva el valor existente.",
      "La borra."
    ],
    "answer": [
      1
    ],
    "explanation": "merge_properties no toca propiedades existentes, solo agrega nodos y propiedades nuevos, y no borra nada."
  },
  {
    "id": "ch-10-q6",
    "chapterId": "ch-10",
    "type": "single",
    "question": "¿En qué se diferencia update_properties de merge_properties?",
    "options": [
      "update_properties borra lo que no viene en el paquete.",
      "update_properties reemplaza las propiedades existentes; merge_properties no las toca. Ninguno borra.",
      "No hay diferencia."
    ],
    "answer": [
      1
    ],
    "explanation": "Ambos agregan y ninguno borra; update_properties además actualiza propiedades existentes con los valores del paquete."
  },
  {
    "id": "ch-10-q7",
    "chapterId": "ch-10",
    "type": "single",
    "question": "¿Por qué están deprecados los modos merge y update?",
    "options": [
      "Porque son lentos.",
      "Porque se comportan distinto según el formato de serialización; sus reemplazos son merge_properties y update_properties.",
      "Porque Cloud Service no permite instalar paquetes."
    ],
    "answer": [
      1
    ],
    "explanation": "El Javadoc de ImportMode los depreca por su comportamiento inconsistente y recomienda sus sucesores."
  },
  {
    "id": "ch-10-q8",
    "chapterId": "ch-10",
    "type": "multiple",
    "question": "Según las reglas de AEM as a Cloud Service, ¿qué es correcto?",
    "options": [
      "Un paquete no puede desplegar a la vez en /apps y en áreas mutables.",
      "ui.apps es de tipo application y ui.content de tipo content.",
      "Los paquetes de proyecto pueden escribir en /libs.",
      "Un paquete incrustado en install.author solo se instala en Author."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Código y contenido van en paquetes separados, /libs es solo de Adobe y las carpetas install.author/install.publish limitan el tier."
  },
  {
    "id": "ch-10-q9",
    "chapterId": "ch-10",
    "type": "single",
    "question": "Necesitas crear un service user con permiso de lectura sobre el sitio en todos los entornos. ¿Qué usas?",
    "options": [
      "Un nodo creado a mano en CRXDE Lite.",
      "Un script repoinit en ui.config.",
      "Una página en ui.content."
    ],
    "answer": [
      1
    ],
    "explanation": "Repoinit crea usuarios, grupos y ACLs de forma declarativa e idempotente; es la forma recomendada por Adobe."
  },
  {
    "id": "ch-10-q10",
    "chapterId": "ch-10",
    "type": "single",
    "question": "Debes copiar varios GB de assets entre dos instancias AEM 6.5. ¿Qué es lo más adecuado?",
    "options": [
      "Un paquete gigante con Package Manager.",
      "vlt rcp en lotes, desactivando los workflows del DAM en el destino y vigilando los recursos.",
      "Copiar la carpeta crx-quickstart con la instancia corriendo."
    ],
    "answer": [
      1
    ],
    "explanation": "VLT-RCP copia directamente entre instancias en lotes. Para Cloud Service la herramienta recomendada es Content Transfer Tool."
  },
  {
    "id": "ch-11-q1",
    "chapterId": "ch-11",
    "type": "single",
    "question": "¿Dónde averiguas qué valor usar en aemVersion para tu instancia 6.5?",
    "options": [
      "En /system/console/productinfo, que muestra la versión con su Service Pack.",
      "En el archivo license.properties.",
      "En la página de inicio de AEM."
    ],
    "answer": [
      0
    ],
    "explanation": "productinfo muestra, por ejemplo, 6.5.22.0; para el archetype se usa 6.5.22."
  },
  {
    "id": "ch-11-q2",
    "chapterId": "ch-11",
    "type": "single",
    "question": "¿Por qué el paquete all de un proyecto 6.5 incluye practica-vendor-packages con Core Components?",
    "options": [
      "Porque AEM 6.5 no trae los Core Components de fábrica, a diferencia de Cloud Service.",
      "Porque es un error del archetype.",
      "Para reemplazar el uber-jar."
    ],
    "answer": [
      0
    ],
    "explanation": "En 6.5 el archetype incrusta los Core Components (bundle, contenido y configuración) en all. En Cloud ya vienen con el producto."
  },
  {
    "id": "ch-11-q3",
    "chapterId": "ch-11",
    "type": "single",
    "question": "¿Qué dependencia de API usa AEM 6.5 LTS SP3 según sus release notes?",
    "options": [
      "uber-jar 6.5.22 sin clasificador",
      "uber-jar 6.6.3 con clasificador apis (y deprecated-apis si hace falta)",
      "aem-sdk-api"
    ],
    "answer": [
      1
    ],
    "explanation": "6.5 LTS separa APIs públicas y deprecadas en el uber-jar 6.6.x con los clasificadores apis y deprecated-apis."
  },
  {
    "id": "ch-11-q4",
    "chapterId": "ch-11",
    "type": "single",
    "question": "Tu componente nuevo no aparece en la lista del editor. ¿Qué revisas primero?",
    "options": [
      "Que su componentGroup coincida con el grupo que permite la política de la plantilla.",
      "La versión de Java.",
      "El Dispatcher."
    ],
    "answer": [
      0
    ],
    "explanation": "La política del contenedor permite group:Sitio de Practica - Content; un componente de ese grupo aparece automáticamente."
  },
  {
    "id": "ch-11-q5",
    "chapterId": "ch-11",
    "type": "single",
    "question": "En el diálogo, un campo tiene name=\"./titulo\". ¿Dónde se guarda su valor?",
    "options": [
      "En la propiedad titulo del nodo del componente.",
      "En la propiedad titulo de la página.",
      "En /apps."
    ],
    "answer": [
      0
    ],
    "explanation": "./titulo es relativo al nodo del componente. El Sling Model lo lee con un campo llamado titulo anotado con @ValueMapValue."
  },
  {
    "id": "ch-11-q6",
    "chapterId": "ch-11",
    "type": "single",
    "question": "¿Para qué sirve defaultInjectionStrategy = OPTIONAL en el Sling Model?",
    "options": [
      "Para que el modelo se cree aunque falten propiedades, dejando esos campos en null.",
      "Para que el modelo sea opcional en el HTL.",
      "Para inyectar servicios OSGi."
    ],
    "answer": [
      0
    ],
    "explanation": "Sin OPTIONAL, una propiedad que falta haría fallar la creación del modelo completo."
  },
  {
    "id": "ch-11-q7",
    "chapterId": "ch-11",
    "type": "single",
    "question": "¿Qué hace data-sly-test.hasContent=\"${!card.empty}\" en el HTL?",
    "options": [
      "Muestra el elemento solo si hay contenido y guarda el resultado en la variable hasContent.",
      "Crea el Sling Model.",
      "Carga los estilos."
    ],
    "answer": [
      0
    ],
    "explanation": "data-sly-test condiciona el elemento; con .nombre también guarda el resultado para reutilizarlo, aquí en el placeholder."
  },
  {
    "id": "ch-11-q8",
    "chapterId": "ch-11",
    "type": "multiple",
    "question": "Sobre la prueba unitaria con AEM Mocks, ¿qué es correcto?",
    "options": [
      "No necesita una instancia de AEM corriendo.",
      "context.create().resource() crea un nodo falso con propiedades.",
      "adaptTo() construye el modelo como lo haría AEM.",
      "Solo funciona en Cloud Service."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "AEM Mocks simula AEM en memoria; se usa igual para 6.5 y Cloud."
  },
  {
    "id": "ch-11-q9",
    "chapterId": "ch-11",
    "type": "single",
    "question": "Cambiaste solo el Sling Model (Java). ¿Cuál es la forma más rápida de desplegarlo?",
    "options": [
      "mvn clean install -pl core -PautoInstallBundle",
      "Reinstalar AEM.",
      "mvn clean install -pl ui.content -PautoInstallPackage"
    ],
    "answer": [
      0
    ],
    "explanation": "-pl core construye solo ese módulo y autoInstallBundle instala el bundle en la consola OSGi."
  },
  {
    "id": "ch-11-q10",
    "chapterId": "ch-11",
    "type": "single",
    "question": "Tu componente se ve en Author pero no en Publish tras publicar la página. ¿Causa probable?",
    "options": [
      "El código no se desplegó en Publish.",
      "El componente no tiene diálogo.",
      "Falta el archivo SCSS."
    ],
    "answer": [
      0
    ],
    "explanation": "El código debe desplegarse en ambas instancias (por ejemplo con autoInstallSinglePackagePublish); además hay que publicar las referencias como la imagen."
  },
  {
    "id": "ch-12-q1",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿Contra qué dependencia compila un proyecto de AEM as a Cloud Service?",
    "options": [
      "uber-jar",
      "aem-sdk-api",
      "core.wcm.components.core"
    ],
    "answer": [
      1
    ],
    "explanation": "Los proyectos Cloud compilan contra aem-sdk-api, cuya versión conviene alinear con el SDK local."
  },
  {
    "id": "ch-12-q2",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿Qué hace el AEM Analyser durante el build?",
    "options": [
      "Minifica el CSS.",
      "Valida el proyecto con las reglas de Cloud Service: APIs públicas, configuraciones, APIs deprecadas y artefactos.",
      "Despliega en Cloud Manager."
    ],
    "answer": [
      1
    ],
    "explanation": "El analyser aplica en tu equipo las mismas reglas que Cloud Manager, para detectar problemas antes del pipeline."
  },
  {
    "id": "ch-12-q3",
    "chapterId": "ch-12",
    "type": "single",
    "question": "El build muestra \"Project is configured with outdated aemanalyser plugin version\". ¿Qué haces?",
    "options": [
      "Ignorarlo siempre.",
      "Actualizar la propiedad aemanalyser.version del POM a la versión sugerida.",
      "Borrar el módulo all."
    ],
    "answer": [
      1
    ],
    "explanation": "Con el analyser al día aplicas las reglas más recientes, las mismas que usará Cloud Manager."
  },
  {
    "id": "ch-12-q4",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿Por qué en el paquete all del proyecto Cloud no aparecen los Core Components?",
    "options": [
      "Porque Cloud Service los incluye en el producto.",
      "Porque el proyecto no los usa.",
      "Porque se instalan con npm."
    ],
    "answer": [
      0
    ],
    "explanation": "En 6.5 se incrustan en all; en Cloud Service ya vienen con el producto."
  },
  {
    "id": "ch-12-q5",
    "chapterId": "ch-12",
    "type": "single",
    "question": "El build falla con \"Package of type APPLICATION is not supposed to contain content outside root nodes libs, oak:index or apps\". ¿Qué ocurre?",
    "options": [
      "El paquete ui.apps contiene contenido mutable, como /content, que Cloud prohíbe en paquetes de código.",
      "Falta Java 21.",
      "El Dispatcher está mal configurado."
    ],
    "answer": [
      0
    ],
    "explanation": "Un paquete application solo puede contener /apps, /libs u /oak:index. El contenido va en ui.content o en repoinit."
  },
  {
    "id": "ch-12-q6",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿El Sling Model, HTL y diálogo del laboratorio 6.5 necesitan cambios para funcionar en Cloud?",
    "options": [
      "Sí, hay que reescribirlos.",
      "No, porque usan APIs públicas disponibles en ambos.",
      "Solo el HTL."
    ],
    "answer": [
      1
    ],
    "explanation": "Con APIs públicas el código de componentes es el mismo; cambian la estructura y el despliegue."
  },
  {
    "id": "ch-12-q7",
    "chapterId": "ch-12",
    "type": "multiple",
    "question": "¿Qué tipos de repositorio admite Cloud Manager?",
    "options": [
      "Repositorio gestionado por Adobe",
      "GitHub privado validado con la app de Adobe",
      "GitLab, Bitbucket o Azure DevOps con token y webhook",
      "Una carpeta compartida por FTP"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Cloud Manager usa repositorios Git: el de Adobe, GitHub privado o externos validados por token y webhook."
  },
  {
    "id": "ch-12-q8",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿Qué define la versión de Java con la que Cloud Manager compila tu proyecto?",
    "options": [
      "La variable JAVA_HOME de tu equipo.",
      "El archivo .cloudmanager/java-version.",
      "La versión del SDK local."
    ],
    "answer": [
      1
    ],
    "explanation": "Cloud Manager lee .cloudmanager/java-version (21 en el proyecto generado). Conviene compilar con la misma versión en local."
  },
  {
    "id": "ch-12-q9",
    "chapterId": "ch-12",
    "type": "single",
    "question": "¿Para qué sirve un RDE?",
    "options": [
      "Para desplegar en producción sin pipeline.",
      "Para probar cambios en un entorno de Cloud en segundos, sin pasar por el pipeline, durante el desarrollo.",
      "Para ejecutar el Dispatcher en local."
    ],
    "answer": [
      1
    ],
    "explanation": "Un RDE es un entorno de desarrollo en la nube con despliegue inmediato vía aio aem:rde:install. No es para producción ni cargas altas."
  },
  {
    "id": "ch-12-q10",
    "chapterId": "ch-12",
    "type": "multiple",
    "question": "Según Adobe, ¿qué límites tiene un RDE?",
    "options": [
      "Por defecto uno por programa.",
      "No incluye tier Preview.",
      "Paquetes de contenido de hasta 1 GB.",
      "No permite instalar código."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Un RDE sí permite instalar código; sus límites son la cantidad, el tamaño de contenido y la ausencia de Preview."
  },
  {
    "id": "ch-13-q1",
    "chapterId": "ch-13",
    "type": "single",
    "question": "¿Desde qué versiones está deprecado el SPA Editor?",
    "options": [
      "AEM 6.5.23 y AEM as a Cloud Service 2025.01",
      "AEM 6.4 y Cloud 2020",
      "No está deprecado"
    ],
    "answer": [
      0
    ],
    "explanation": "Adobe lo deprecó en 6.5.23 y en Cloud 2025.01. Se puede seguir usando, pero solo recibe correcciones P1, P2 y de seguridad."
  },
  {
    "id": "ch-13-q2",
    "chapterId": "ch-13",
    "type": "single",
    "question": "¿Qué recomienda Adobe para proyectos nuevos que necesitan edición visual con un framework JavaScript?",
    "options": [
      "SPA Editor con el archetype 58",
      "Universal Editor",
      "Classic UI"
    ],
    "answer": [
      1
    ],
    "explanation": "El Universal Editor es el reemplazo recomendado del SPA Editor para implementaciones headless nuevas."
  },
  {
    "id": "ch-13-q3",
    "chapterId": "ch-13",
    "type": "single",
    "question": "¿Qué versión del archetype es la última que genera proyectos con frontendModule=react?",
    "options": [
      "56",
      "57",
      "58"
    ],
    "answer": [
      1
    ],
    "explanation": "El archetype 58 eliminó las variantes SPA; la 57 es la última que las genera."
  },
  {
    "id": "ch-13-q4",
    "chapterId": "ch-13",
    "type": "single",
    "question": "¿Qué devuelve AEM al pedir una página con la extensión .model.json?",
    "options": [
      "El HTML final de la página.",
      "El contenido de la página en JSON, con el tipo de cada componente en :type.",
      "Los archivos de la clientlib."
    ],
    "answer": [
      1
    ],
    "explanation": "El .model.json es el modelo que la app React recibe y dibuja con los componentes mapeados."
  },
  {
    "id": "ch-13-q5",
    "chapterId": "ch-13",
    "type": "single",
    "question": "¿Qué hace MapTo('practicareact/components/text')(Text, TextEditConfig)?",
    "options": [
      "Crea un componente en AEM.",
      "Asocia el tipo de recurso de AEM con el componente React y define su configuración de edición.",
      "Publica la página."
    ],
    "answer": [
      1
    ],
    "explanation": "MapTo registra qué componente React dibuja cada :type del JSON y lo hace editable con su EditConfig."
  },
  {
    "id": "ch-13-q6",
    "chapterId": "ch-13",
    "type": "multiple",
    "question": "Para que un componente propio aparezca en el .model.json, ¿qué necesita su Sling Model?",
    "options": [
      "Implementar ComponentExporter.",
      "Declarar ComponentExporter en adapters y el resourceType del componente.",
      "La anotación @Exporter con el exporter de Jackson.",
      "Un archivo HTL."
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "El exporter necesita ComponentExporter, el resourceType y @Exporter. En un componente SPA no hace falta HTL."
  },
  {
    "id": "ch-13-q7",
    "chapterId": "ch-13",
    "type": "single",
    "question": "En el EditConfig de un componente React, ¿para qué sirve isEmpty?",
    "options": [
      "Para decidir cuándo el componente está vacío y el editor debe mostrar el marcador.",
      "Para borrar el componente.",
      "Para validar el diálogo."
    ],
    "answer": [
      0
    ],
    "explanation": "Si isEmpty devuelve true, el editor muestra el marcador con el emptyLabel en lugar del componente."
  },
  {
    "id": "ch-13-q8",
    "chapterId": "ch-13",
    "type": "single",
    "question": "Al ejecutar npm start la app queda en blanco. ¿Qué error del archetype 57 revisas?",
    "options": [
      "REACT_APP_PAGE_MODEL_PATH apunta a us/en aunque el sitio se generó con otro país e idioma.",
      "Falta el archivo App.js.",
      "El puerto 3000 está prohibido."
    ],
    "answer": [
      0
    ],
    "explanation": "El .env.development generado usa /content/<app>/us/en.model.json; hay que corregirlo a la página real del sitio."
  },
  {
    "id": "ch-13-q9",
    "chapterId": "ch-13",
    "type": "single",
    "question": "npm start falla con ERR_OSSL_EVP_UNSUPPORTED. ¿Qué haces?",
    "options": [
      "Reinstalar AEM.",
      "Usar Node 16 o definir NODE_OPTIONS=--openssl-legacy-provider.",
      "Borrar node_modules del proyecto Java."
    ],
    "answer": [
      1
    ],
    "explanation": "react-scripts 4 no es compatible con Node 17 o superior sin ese ajuste."
  },
  {
    "id": "ch-13-q10",
    "chapterId": "ch-13",
    "type": "single",
    "question": "El analyser avisa que spa.project.core usa un paquete con retiro previsto para el 31-mar-2027. ¿Qué implica?",
    "options": [
      "Nada, es solo informativo.",
      "Que un proyecto SPA en Cloud debe actualizar esa dependencia o migrar antes de esa fecha.",
      "Que hay que cambiar a AEM 6.5."
    ],
    "answer": [
      1
    ],
    "explanation": "Las APIs deprecadas con fecha de retiro dejarán de existir; hay que planificar la actualización o migración."
  }
];
