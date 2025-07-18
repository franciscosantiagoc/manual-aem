import React from 'react';
import {
  LessonPage,
  SectionTitle,
  Paragraph,
  List,
  Alert,
  CodeBlock,
  DataTable,
  FlowDiagram,
  ResourceLinks
} from '../../LessonUI';

const pomCoordinates = `<project>
  <groupId>com.practica</groupId>        <!-- organización o proyecto -->
  <artifactId>practica.core</artifactId> <!-- nombre del módulo -->
  <version>1.0.0-SNAPSHOT</version>     <!-- versión -->
  <packaging>jar</packaging>            <!-- qué produce: jar, content-package, pom... -->

  <dependencies>
    <dependency>
      <groupId>com.adobe.aem</groupId>
      <artifactId>aem-sdk-api</artifactId>
      <scope>provided</scope>           <!-- AEM ya la tiene: no se empaqueta -->
    </dependency>
  </dependencies>
</project>`;

const generateBash = `mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem \\
  -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=58 \\
  -DappTitle="Sitio de Practica" \\
  -DappId="practica" \\
  -DgroupId="com.practica" \\
  -DaemVersion=cloud \\
  -DfrontendModule=general \\
  -Dlanguage=es \\
  -Dcountry=mx \\
  -DincludeExamples=y \\
  -DincludeErrorHandler=y`;

const generatePs = `mvn -B "org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate" \`
  "-DarchetypeGroupId=com.adobe.aem" \`
  "-DarchetypeArtifactId=aem-project-archetype" \`
  "-DarchetypeVersion=58" \`
  "-DappTitle=Sitio de Practica" \`
  "-DappId=practica" \`
  "-DgroupId=com.practica" \`
  "-DaemVersion=cloud" \`
  "-DfrontendModule=general" \`
  "-Dlanguage=es" \`
  "-Dcountry=mx" \`
  "-DincludeExamples=y" \`
  "-DincludeErrorHandler=y"`;

const generateOutput = `[INFO] Generating project in Batch mode
[INFO] Archetype repository not defined. Using the one from [com.adobe.aem:aem-project-archetype:58] found in catalog remote
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: aem-project-archetype:58
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: appId, Value: practica
[INFO] Parameter: aemVersion, Value: cloud
...
[INFO] Project created from Archetype in dir: /home/usuario/proyectos/practica
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------`;

const projectTree = `practica/
├── pom.xml                 ← POM raíz: versiones y lista de módulos
├── .cloudmanager/          ← versión de Java para Cloud Manager (solo aemVersion=cloud)
├── all/                    ← paquete contenedor con todo lo desplegable
├── core/                   ← código Java (bundle OSGi)
├── ui.apps/                ← componentes, plantillas de código, clientlibs (/apps)
├── ui.apps.structure/      ← raíces del repositorio que el proyecto "posee"
├── ui.config/              ← configuraciones OSGi por run mode
├── ui.content/             ← contenido inicial: sitio, plantillas editables (/content, /conf)
├── ui.frontend/            ← build de CSS y JavaScript con webpack
├── ui.tests/               ← pruebas de interfaz (navegador)
├── it.tests/               ← pruebas de integración contra una instancia
└── dispatcher/             ← configuración del Dispatcher`;

const buildCmd = `cd practica

# 1. Compilar y ejecutar las pruebas SIN desplegar
mvn clean install

# 2. Compilar y desplegar todo en Author (localhost:4502)
mvn clean install -PautoInstallSinglePackage

# 3. Desplegar también en Publish (localhost:4503)
mvn clean install -PautoInstallSinglePackagePublish`;

const reactorOutput = `[INFO] Reactor Summary for Sitio de Practica 1.0.0-SNAPSHOT:
[INFO]
[INFO] Sitio de Practica .................................. SUCCESS [  0.412 s]
[INFO] Sitio de Practica - Core ........................... SUCCESS [ 18.207 s]
[INFO] Sitio de Practica - UI Frontend .................... SUCCESS [ 41.980 s]
[INFO] Sitio de Practica - Repository Structure Package ... SUCCESS [  1.034 s]
[INFO] Sitio de Practica - UI apps ........................ SUCCESS [  6.512 s]
[INFO] Sitio de Practica - UI content ..................... SUCCESS [  2.311 s]
[INFO] Sitio de Practica - UI config ...................... SUCCESS [  0.498 s]
[INFO] Sitio de Practica - All ............................ SUCCESS [  3.870 s]
[INFO] Sitio de Practica - Integration Tests .............. SUCCESS [  4.112 s]
[INFO] Sitio de Practica - Dispatcher ..................... SUCCESS [  0.380 s]
[INFO] Sitio de Practica - UI Tests ....................... SUCCESS [  0.905 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:22 min`;

const compareCmd = `# Genera un segundo proyecto para AEM 6.5 en otra carpeta
mkdir ../comparar && cd ../comparar
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=58 -DappTitle="Sitio de Practica" -DappId="practica" \\
  -DgroupId="com.practica" -DaemVersion=6.5.22 -Dlanguage=es -Dcountry=mx

# Compara los POM raíz de ambos proyectos
git diff --no-index ../practica/pom.xml ./practica/pom.xml

# Resume qué archivos del Dispatcher difieren
git diff --no-index --stat ../practica/dispatcher ./practica/dispatcher`;

export default function Chapter08({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-8"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender desde cero qué es **Maven**: coordenadas, dependencias, ciclo de vida, módulos y perfiles.',
        'Entender qué es un **archetype** y por qué todos los proyectos AEM empiezan con el **AEM Project Archetype** de Adobe.',
        'Conocer cada propiedad del archetype y decidir su valor según tu proyecto (Cloud Service o 6.5, frontend, idioma, ejemplos...).',
        'Generar un proyecto, compilarlo, desplegarlo en tu AEM local y verlo funcionando.',
        'Conocer el cambio reciente del archetype: desde la versión 58 ya no genera proyectos React ni Angular.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas Java, Maven, Git y Node.js instalados ([[ch-3]]) y AEM Author corriendo en `localhost:4502` ([[ch-4]]). Para el despliegue en Publish, también `localhost:4503`.'}
      </Alert>

      <SectionTitle>Maven desde cero</SectionTitle>
      <Paragraph>{'**Maven** es la herramienta que compila, prueba y empaqueta los proyectos Java (y los de AEM). En lugar de escribir scripts con cada paso, describes el proyecto en un archivo **`pom.xml`** (Project Object Model) y Maven sabe qué hacer. Todo proyecto AEM se construye con Maven, tanto en tu equipo como en Cloud Manager.'}</Paragraph>
      <DataTable
        headers={['Concepto', 'Qué es', 'Ejemplo']}
        rows={[
          ['**Coordenadas**', 'Tres valores que identifican de forma única un artefacto: `groupId`, `artifactId` y `version`', '`com.practica : practica.core : 1.0.0-SNAPSHOT`'],
          ['**Dependencia**', 'Otro artefacto que tu proyecto necesita; Maven lo descarga solo', 'La API de AEM (`aem-sdk-api`)'],
          ['**Scope `provided`**', 'La dependencia se usa para compilar pero no se empaqueta, porque el servidor ya la tiene', 'Todas las APIs de AEM'],
          ['**Repositorio local**', 'Carpeta `~/.m2/repository` donde Maven guarda lo que descarga', 'Se llena la primera vez que compilas'],
          ['**Ciclo de vida**', 'Fases en orden: `clean` (borrar lo compilado), `compile`, `test`, `package`, `install`', '`mvn clean install` ejecuta todas hasta install'],
          ['**Proyecto multimódulo**', 'Un POM padre que agrupa varios módulos que se construyen juntos (el "reactor")', 'Un proyecto AEM tiene unos 10 módulos'],
          ['**Plugin**', 'Extensión que hace una tarea concreta en una fase', 'Compilar Java, empaquetar para AEM, instalar en AEM'],
          ['**Perfil (`-P`)**', 'Conjunto de configuración que se activa a pedido', '`-PautoInstallSinglePackage` despliega en AEM']
        ]}
      />
      <CodeBlock filename="pom.xml (fragmento simplificado)" language="xml" code={pomCoordinates} />
      <List items={[
        '`groupId` suele ser el dominio invertido de tu organización o proyecto (`com.practica`).',
        '`artifactId` es el nombre del módulo; `version` termina en `-SNAPSHOT` mientras está en desarrollo.',
        '`packaging` dice qué produce el módulo: en AEM verás `jar` (el código Java, que el plugin bnd convierte en bundle OSGi), `content-package` (zip de FileVault, como en [[ch-6]]) y `pom` (módulos que solo agrupan).',
        'En una dependencia, `scope: provided` significa "la necesito para compilar, pero AEM ya la trae".'
      ]} />

      <SectionTitle>¿Qué es un archetype y por qué usarlo?</SectionTitle>
      <Paragraph>{'Un **archetype** es una **plantilla de proyecto Maven**: con un comando genera la estructura completa de carpetas, POMs y archivos de ejemplo. Adobe mantiene el **AEM Project Archetype**, el punto de partida oficial y recomendado para cualquier proyecto AEM, porque genera desde el primer día:'}</Paragraph>
      <List items={[
        'La separación de módulos que exige AEM as a Cloud Service (código inmutable en `/apps`, contenido mutable en `/content` y `/conf`).',
        'Un sitio de ejemplo con plantillas editables, políticas, un componente de muestra y Core Components configurados.',
        'El build de frontend con webpack, que produce las clientlibs.',
        'La configuración del Dispatcher, pruebas unitarias, de integración y de interfaz.',
        'Los perfiles de Maven para desplegar en tu AEM local con un comando.'
      ]} />
      <Alert type="tip" title="Regla práctica">
        {'Empieza siempre con el archetype y luego adapta. Montar la estructura a mano o copiar la de un proyecto viejo es la forma más rápida de acumular errores de despliegue que solo aparecen en Cloud Manager.'}
      </Alert>

      <SectionTitle>Versiones del archetype y un cambio importante</SectionTitle>
      <DataTable
        caption="Información vigente a septiembre de 2026 (README y releases del repositorio oficial)"
        headers={['Versión', 'Publicada', 'Soporta', 'Frontend disponible']}
        rows={[
          ['**58** (actual)', '18-sep-2026', 'AEM as a Cloud Service y AEM 6.5.17 o superior · Java 11 mínimo (21 preferido) · Maven 3.3.9+', '`general` o `none` (sitios HTL)'],
          ['**57**', '03-jul-2026', 'Igual', '`general`, `none`, `react`, `angular`, `decoupled`'],
          ['**≤ 56**', 'Anteriores', 'Según la versión', 'Incluyen las variantes SPA']
      ]}
      />
      <Alert type="warning" title="El archetype 58 ya no genera proyectos React ni Angular">
        {'Adobe limpió el archetype para enfocarlo en sitios con **componentes HTL**: se eliminaron las variantes del **SPA Editor** (React, Angular y *decoupled*) y el soporte de renderizado en servidor, porque la dirección del producto para edición visual de aplicaciones es el **Universal Editor** ([[ch-96]]). Para **mantener** proyectos SPA existentes, o para estudiar cómo funcionan, puede usarse el archetype **57**; así lo haremos en los laboratorios de React y Angular ([[ch-13]], [[ch-14]]). Para proyectos nuevos, el camino recomendado es un sitio HTL o una aplicación headless con Universal Editor.'}
      </Alert>

      <SectionTitle>Todas las propiedades del archetype</SectionTitle>
      <DataTable
        headers={['Propiedad', 'Por defecto', 'Qué define', 'Qué usar para aprender']}
        rows={[
          ['`appTitle`', '—', 'Título legible del sitio; se usa en el sitio y en los grupos de componentes', '`Sitio de Practica`'],
          ['`appId`', '—', 'Nombre técnico: carpetas de componentes, configuraciones y contenido, y nombres de clientlibs (`/apps/<appId>`, `/content/<appId>`)', '`practica` (minúsculas, sin espacios)'],
          ['`groupId`', '—', 'groupId de Maven y paquete Java base (debe ser un nombre de paquete válido)', '`com.practica`'],
          ['`artifactId`', '`${appId}`', 'artifactId base de Maven', 'Por defecto'],
          ['`package`', '`${groupId}`', 'Paquete Java del código', 'Por defecto'],
          ['`version`', '`1.0-SNAPSHOT`', 'Versión del proyecto', 'Por defecto'],
          ['`aemVersion`', '`cloud`', 'Versión destino: `cloud` o una versión 6.5 (por ejemplo `6.5.22`)', 'La de tu instancia local'],
          ['`sdkVersion`', '`latest`', 'Versión del SDK de Cloud a usar como dependencia', 'Por defecto'],
          ['`includeDispatcherConfig`', '`y`', 'Genera el módulo `dispatcher` (para Cloud o para AMS/on-premise según `aemVersion`)', '`y`'],
          ['`frontendModule`', '`general`', 'Genera `ui.frontend` con webpack (`general`) o no (`none`)', '`general`'],
          ['`language` / `country`', '`en` / `us`', 'Idioma y país de la estructura de contenido inicial', '`es` / `mx`'],
          ['`singleCountry`', '`y`', 'Con `n` crea además una estructura *language-masters* para sitios multi-país', '`y`'],
          ['`includeExamples`', '`n`', 'Incluye un sitio de ejemplo con la librería de componentes', '`y` (muy útil para aprender)'],
          ['`includeErrorHandler`', '`n`', 'Incluye una página 404 personalizada', '`y`'],
          ['`datalayer`', '`y`', 'Integración con Adobe Client Data Layer (analítica)', 'Por defecto'],
          ['`amp`', '`n`', 'Soporte AMP', 'Por defecto'],
          ['`enableDynamicMedia`', '`n`', 'Componentes de Dynamic Media', 'Por defecto'],
          ['`precompiledScripts`', '`n`', 'Precompila los scripts HTL en un bundle (solo Cloud)', 'Por defecto'],
          ['`includeCif` / `commerceEndpoint`', '`n` / —', 'Dependencias de AEM Commerce (CIF)', 'Por defecto'],
          ['`includeFormsenrollment` / `includeFormscommunications`', '`n`', 'Dependencias de AEM Forms', 'Por defecto']
        ]}
      />

      <SectionTitle>Decisiones clave antes de generar</SectionTitle>
      <DataTable
        headers={['Decisión', 'Opción', 'Qué cambia en el proyecto generado']}
        rows={[
          ['`aemVersion`', '`cloud`', 'Depende de `aem-sdk-api`; Dispatcher en formato Cloud; archivo `.cloudmanager/java-version`; validaciones del *analyser* de Cloud'],
          ['`aemVersion`', '`6.5.x`', 'Depende del `uber-jar` de 6.5 y agrega los Core Components como dependencia; Dispatcher en formato AMS/on-premise'],
          ['`frontendModule`', '`general`', 'Crea `ui.frontend` (webpack) que genera las clientlibs `clientlib-site` y `clientlib-dependencies` en `ui.apps` ([[ch-25]])'],
          ['`frontendModule`', '`none`', 'Sin `ui.frontend`: el CSS/JS se escribe directo en clientlibs de `ui.apps` ([[ch-24]])'],
          ['`singleCountry`', '`n`', 'Estructura `language-masters` + países, pensada para multi-sitio ([[ch-120]])']
        ]}
      />
      <Paragraph>{'**Java.** Para Cloud Service, el archetype crea `.cloudmanager/java-version`: revisa que indique `21` (la versión preferida; el runtime de Cloud es Java 21). Para AEM 6.5 la regla es la inversa: **primero** fijas el Service Pack de tus servidores ([[ch-129]]), **después** usas la versión de Java que ese Service Pack soporta, y esa misma versión en tu equipo, en CI y en el servidor. Mezclar versiones es una causa frecuente de errores `UnsupportedClassVersionError` al desplegar.'}</Paragraph>

      <SectionTitle>Laboratorio 1 · Generar el proyecto</SectionTitle>
      <List items={[
        '**Paso 1.** Crea una carpeta para tus proyectos (por ejemplo `~/proyectos`) y abre una terminal ahí. **No** la crees dentro de la carpeta de AEM.',
        '**Paso 2.** Ejecuta el comando de tu sistema operativo. La primera vez tarda algunos minutos porque Maven descarga el archetype y sus dependencias.',
        '**Paso 3.** Revisa que al final diga **BUILD SUCCESS** y la carpeta donde creó el proyecto.'
      ]} />
      <CodeBlock filename="terminal · macOS / Linux / Git Bash" language="bash" code={generateBash} />
      <CodeBlock filename="PowerShell · Windows" language="powershell" code={generatePs} />
      <List items={[
        '`mvn -B` ejecuta Maven en modo *batch* (no interactivo): no hace preguntas y usa los valores que le pasas.',
        '`org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate` indica el plugin y su versión exacta; Adobe pide la 3.3.1 o superior.',
        '`archetypeGroupId`, `archetypeArtifactId` y `archetypeVersion` identifican **qué plantilla** usar: el AEM Project Archetype, versión 58.',
        'El resto (`appTitle`, `appId`, `groupId`, `aemVersion`...) son las **propiedades** de la tabla anterior. Todas las que omitas toman su valor por defecto.',
        'En bash, `\\` al final de línea continúa el comando; en PowerShell se usa el acento grave (backtick).',
        '**En PowerShell cada argumento `-D...` va entre comillas dobles.** Sin comillas, PowerShell corta los valores que contienen puntos (como `com.adobe.aem`) y Maven recibe parámetros incompletos.'
      ]} />
      <CodeBlock filename="salida esperada (resumida)" language="text" code={generateOutput} />
      <Alert type="warning" title="Windows y la configuración del Dispatcher">
        {'El README oficial advierte que en Windows, al generar la configuración del Dispatcher, conviene usar una terminal **con permisos de administrador** o **WSL**, porque el proceso crea enlaces simbólicos. Si la generación falla en la carpeta `dispatcher`, repite el comando en una terminal elevada o en WSL.'}
      </Alert>

      <SectionTitle>Laboratorio 2 · Recorrer lo que se generó</SectionTitle>
      <CodeBlock filename="estructura del proyecto generado" language="text" code={projectTree} />
      <List items={[
        '**`core`** es Java: Sling Models, servicios y servlets. Se compila como bundle OSGi (lo que diagnosticaste en [[ch-7]]).',
        '**`ui.apps`** es lo que termina en `/apps`: componentes (HTL, diálogos), clientlibs y plantillas de código.',
        '**`ui.content`** es lo que termina en `/content` y `/conf`: la página inicial del sitio, plantillas editables y políticas.',
        '**`ui.config`** son configuraciones OSGi por run mode (`config.author`, `config.publish`, `config.prod`...).',
        '**`ui.frontend`** compila CSS y JavaScript con webpack y copia el resultado como clientlibs dentro de `ui.apps`.',
        '**`all`** junta todos los paquetes en uno solo: es lo que se despliega.',
        'Cada módulo se explica archivo por archivo en [[ch-9]], y cómo se empaquetan con FileVault en [[ch-10]].'
      ]} />
      <Paragraph>{'Abre el proyecto en tu IDE: en IntelliJ IDEA, *File → Open* y selecciona el `pom.xml` raíz (ábrelo **como proyecto**); en VS Code, *File → Open Folder* sobre la carpeta `practica`.'}</Paragraph>

      <SectionTitle>Laboratorio 3 · Compilar y desplegar</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={buildCmd} />
      <List items={[
        '`cd practica` entra al proyecto (siempre se compila desde la carpeta del POM raíz).',
        '`mvn clean install` borra lo compilado antes (`clean`), compila, ejecuta las pruebas unitarias y deja los artefactos en tu repositorio local de Maven (`install`). **No toca AEM**. Úsalo para comprobar que todo compila.',
        '`-PautoInstallSinglePackage` activa el perfil que, al final, sube e instala el paquete `all` en `localhost:4502` usando el usuario `admin`.',
        '`-PautoInstallSinglePackagePublish` hace lo mismo contra `localhost:4503`.',
        'La primera compilación tarda varios minutos: descarga dependencias y una copia de Node.js para `ui.frontend`. Las siguientes son mucho más rápidas.'
      ]} />
      <CodeBlock filename="salida esperada al final del build (ejemplo)" language="text" code={reactorOutput} />
      <List items={[
        'El **Reactor Summary** lista cada módulo en el orden en que se construyó y si terminó bien (`SUCCESS`).',
        'El orden no es casual: Maven respeta las dependencias entre módulos (por ejemplo, `ui.frontend` va antes que `ui.apps`, porque genera clientlibs que `ui.apps` empaqueta, y `all` va casi al final porque incluye a los demás).',
        'Si un módulo falla, los siguientes aparecen como `SKIPPED`. Sube en la salida hasta el primer `[ERROR]` para ver la causa.'
      ]} />
      <Paragraph>{'**Comprueba el resultado en AEM:**'}</Paragraph>
      <List items={[
        '**Package Manager** (`/crx/packmgr`): aparecen los paquetes del proyecto, como `practica.all`, `practica.ui.apps` y `practica.ui.content`, recién instalados ([[ch-6]]).',
        '**Web Console** (`/system/console/bundles`): filtra por `practica` y confirma que el bundle **practica.core** está **Active** ([[ch-7]]).',
        '**Sites**: aparece el sitio **Sitio de Practica** con su página inicial. Ábrela: está en `/content/practica/mx/es.html` (país y luego idioma, según `country` y `language`).',
        '**Componentes**: edita la página y busca el componente de ejemplo **Hello World** del grupo de tu sitio. Arrástralo a la página: muestra un texto y datos de un Sling Model. Es tu primer componente con código propio.',
        'Con `includeExamples=y` verás además un sitio de ejemplo con la librería de componentes, ideal para curiosear cómo está hecho cada uno.'
      ]} />

      <SectionTitle>Qué genera frontendModule=general</SectionTitle>
      <Paragraph>{'Como explica Imran Khan en su guía de `ui.frontend` (en las lecturas recomendadas), este módulo permite al equipo de frontend trabajar con herramientas modernas (webpack, npm, un servidor de desarrollo local) y, al compilar, el paquete `aem-clientlib-generator` copia el CSS y JS resultantes a `ui.apps` como dos clientlibs: `clientlib-dependencies` (librerías de terceros) y `clientlib-site` (tu código), con las categorías `practica.dependencies` y `practica.site`. Todo el detalle está en [[ch-24]] y [[ch-25]].'}</Paragraph>

      <SectionTitle>¿Un repositorio o varios?</SectionTitle>
      <Paragraph>{'El archetype genera un **monorepo**: código, contenido, configuración y Dispatcher en un solo repositorio Git, que es lo que Cloud Manager espera por defecto. En equipos grandes a veces se separa, por ejemplo cuando el Dispatcher lo mantiene otro equipo con su propio ritmo de cambios: Cloud Manager permite pipelines específicos para la configuración del Dispatcher y para el frontend. Mientras aprendes, y en la mayoría de proyectos, **mantén el monorepo**; las opciones de pipelines se ven en [[ch-127]].'}</Paragraph>

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['`The parameters ... are missing or invalid` en PowerShell', 'Argumentos `-D` sin comillas cortados por PowerShell', 'Poner cada `-D...` entre comillas dobles'],
          ['`Could not find artifact ... aem-project-archetype`', 'Sin conexión o proxy de la empresa', 'Revisa la red o configura el proxy en `~/.m2/settings.xml`'],
          ['`invalid target release` o `UnsupportedClassVersionError`', 'JDK distinto al que pide el proyecto', 'Cambia de JDK ([[ch-3]]) y verifica con `mvn -v`'],
          ['Falla `ui.frontend` descargando Node o paquetes npm', 'Red, proxy o caché de npm', 'Repite el build; en redes corporativas configura el proxy de npm'],
          ['`Connection refused` al final del build con el perfil', 'AEM no está corriendo o en otro puerto', 'Arranca Author en `4502` ([[ch-4]])'],
          ['El bundle `practica.core` queda en Installed', 'Dependencias no resueltas en la instancia', 'Revisa sus Imported Packages en la Web Console ([[ch-7]])'],
          ['Pruebas fallan y detienen el build', 'Un test roto', 'Corrige el test; `-DskipTests` solo como medida temporal']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <Paragraph>{'Genera un segundo proyecto idéntico pero con `aemVersion` de 6.5 en otra carpeta, y compara ambos para ver con tus propios ojos qué cambia:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={compareCmd} />
      <List items={[
        '**1.** ¿Qué dependencia de API de AEM usa cada POM raíz?',
        '**2.** ¿Qué dependencia aparece en el proyecto 6.5 y no en el de Cloud (pista: componentes)?',
        '**3.** ¿Qué tan distinta es la carpeta `dispatcher` entre ambos?',
        '**4.** ¿Cuál de los dos tiene la carpeta `.cloudmanager` y qué contiene?'
      ]} />
      <Alert type="tip" title="Solución">
        {'(1) Cloud usa `aem-sdk-api`; 6.5 usa el `uber-jar`. (2) El proyecto 6.5 declara los **Core Components** como dependencia (en Cloud ya vienen con el producto). (3) Muy distinta: según `aemVersion`, el archetype genera la variante **Cloud** (compatible con el Dispatcher SDK, con archivos inmutables que no debes editar) o la variante **AMS/on-premise**. Lo estudiaremos en el módulo de Dispatcher ([[ch-81]]). (4) Solo el de Cloud tiene `.cloudmanager/java-version`, con la versión de Java que usará Cloud Manager para compilar.'}
      </Alert>

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Usa siempre la **última versión del archetype** para proyectos nuevos y anota en el README del proyecto con qué versión y parámetros se generó.',
        'Elige `appId` con cuidado: aparece en rutas del repositorio, nombres de clientlibs y paquetes, y cambiarlo después es costoso.',
        'Haz tu primer commit en Git **justo después de generar**, antes de modificar nada: así siempre podrás ver qué cambiaste respecto a la plantilla.',
        'No borres módulos "que no usas" sin entender sus dependencias en los POMs (por ejemplo `ui.frontend` está referenciado desde `ui.apps` y `all`).',
        'Compila con `mvn clean install` antes de subir cambios: Cloud Manager ejecuta el mismo build.'
      ]} />

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'Maven construye proyectos a partir de un `pom.xml`: coordenadas, dependencias (con scope `provided` para las APIs de AEM), ciclo de vida, módulos y perfiles.',
        'El AEM Project Archetype genera un proyecto multimódulo listo para 6.5 o Cloud Service.',
        'Las propiedades más importantes son `appId`, `groupId`, `aemVersion` y `frontendModule`.',
        'Desde la versión 58, el archetype solo genera sitios HTL; para SPA React/Angular existentes se usa la 57.',
        '`mvn clean install` compila y prueba; `-PautoInstallSinglePackage` además despliega en tu Author local.',
        'Después de desplegar, verificas en Package Manager, en la Web Console y en Sites.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Maven', 'Herramienta de construcción y gestión de dependencias de proyectos Java'],
          ['POM', 'Archivo `pom.xml` que describe un proyecto Maven'],
          ['Coordenadas', '`groupId`, `artifactId` y `version` de un artefacto'],
          ['Archetype', 'Plantilla que genera la estructura de un proyecto Maven'],
          ['Reactor', 'Mecanismo de Maven que construye los módulos de un proyecto en el orden correcto'],
          ['Perfil', 'Configuración de Maven que se activa con `-P`'],
          ['SNAPSHOT', 'Versión en desarrollo, que puede cambiar'],
          ['Monorepo', 'Un solo repositorio con todos los módulos del proyecto']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'AEM Project Archetype (README, propiedades y requisitos)', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' },
        { type: 'image', title: 'Releases del AEM Project Archetype', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype/releases' },
        { type: 'image', title: 'AEM Project Archetype (documentación)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/developing/archetype/overview' },
        { type: 'image', title: 'Introducción a Maven', source: 'Apache Maven', url: 'https://maven.apache.org/guides/getting-started/index.html' },
        { type: 'image', title: 'AEM ui.frontend module Complete Guide', source: 'Medium · Imran Khan', url: 'https://medium.com/@toimrank/aem-ui-frontend-module-complete-guide-265175c540b0' }
      ]} />
    </LessonPage>
  );
}
