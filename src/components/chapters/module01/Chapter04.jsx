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

const foldersSh = `# macOS / Linux
mkdir -p ~/aem/sdk/author ~/aem/sdk/publish
mkdir -p ~/aem/65/author ~/aem/65/publish

# Copia y renombra el Quickstart del AEM SDK (ajusta el nombre del archivo descargado)
cp ~/Downloads/aem-sdk/aem-sdk-quickstart-*.jar ~/aem/sdk/author/aem-author-p4502.jar
cp ~/Downloads/aem-sdk/aem-sdk-quickstart-*.jar ~/aem/sdk/publish/aem-publish-p4503.jar

tree -L 2 ~/aem     # opcional: muestra el resultado`;

const foldersPs = `# Windows (PowerShell)
$base = "$HOME\\aem"
New-Item -ItemType Directory -Force "$base\\sdk\\author", "$base\\sdk\\publish" | Out-Null
New-Item -ItemType Directory -Force "$base\\65\\author", "$base\\65\\publish" | Out-Null

# Copia y renombra el Quickstart del AEM SDK (ajusta la ruta del archivo descargado)
$jar = Get-ChildItem "$HOME\\Downloads\\aem-sdk\\aem-sdk-quickstart-*.jar" | Select-Object -First 1
Copy-Item $jar.FullName "$base\\sdk\\author\\aem-author-p4502.jar"
Copy-Item $jar.FullName "$base\\sdk\\publish\\aem-publish-p4503.jar"

Get-ChildItem -Recurse $base -Filter *.jar | Select-Object FullName`;

const startAuthor = `cd ~/aem/sdk/author          # Windows: cd $HOME\\aem\\sdk\\author
java -Xmx4g -jar aem-author-p4502.jar -nobrowser`;

const firstStartLog = `Loading quickstart properties: default
Loading quickstart properties: instance
Setting properties from filename 'aem-author-p4502.jar'
Option '-quickstart.server.port' set to '4502' from filename aem-author-p4502.jar
Setting 'sling.run.modes' to 'author' from filename aem-author-p4502.jar
...
Starting Jetty
Started HTTP server on port 4502
...
Startup completed`;

const startPublish = `cd ~/aem/sdk/publish         # Windows: cd $HOME\\aem\\sdk\\publish
java -Xmx4g -jar aem-publish-p4503.jar -nobrowser`;

const aem65Start = `cd ~/aem/65/author
# El archivo license.properties debe estar junto al jar
ls
#   AEM_6.5_Quickstart.jar   license.properties

mv AEM_6.5_Quickstart.jar aem-author-p4502.jar
java -Xmx4g -jar aem-author-p4502.jar -r author,nosamplecontent -nobrowser`;

const followLogs = `# macOS / Linux: muestra las últimas líneas y sigue escuchando
tail -f crx-quickstart/logs/error.log

# Solo errores
tail -f crx-quickstart/logs/error.log | grep "\\*ERROR\\*"

# Windows (PowerShell)
Get-Content crx-quickstart\\logs\\error.log -Tail 50 -Wait`;

const logLine = `26.09.2026 10:15:32.481 *INFO* [main] org.apache.sling.installer.core.impl.OsgiInstallerImpl Apache Sling OSGi Installer Service started.
26.09.2026 10:15:40.102 *WARN* [qtp123-45] org.apache.sling.engine.impl.SlingRequestProcessorImpl service: Resource /content/misitio/es/pagina not found
26.09.2026 10:15:41.990 *ERROR* [qtp123-46] com.misitio.core.models.HeroModel Error al leer la imagen del hero`;

const binStart = `# crx-quickstart/bin/start (fragmento, macOS / Linux)
# Descomenta y ajusta las variables antes de usar el script

CQ_PORT=4502
CQ_RUNMODE='author'
CQ_JVM_OPTS='-server -Xmx4g -Djava.awt.headless=true'

# Uso:
#   crx-quickstart/bin/start    -> arranca en segundo plano
#   crx-quickstart/bin/status   -> indica si está corriendo
#   crx-quickstart/bin/stop     -> detiene la instancia de forma ordenada`;

const startAllSh = `#!/usr/bin/env bash
# start-aem.sh: arranca Author y Publish del AEM SDK en segundo plano
set -euo pipefail

BASE="$HOME/aem/sdk"
JAVA_OPTS="-Xmx4g"

start_instance() {
  local dir="$1"
  local jar="$2"
  cd "$BASE/$dir"
  nohup java $JAVA_OPTS -jar "$jar" -nobrowser > "$BASE/$dir/console.log" 2>&1 &
  echo "$dir iniciado (PID $!). Consola: $BASE/$dir/console.log"
}

start_instance author  aem-author-p4502.jar
start_instance publish aem-publish-p4503.jar`;

const startAllPs = `# start-aem.ps1: arranca Author y Publish del AEM SDK en ventanas separadas
$base = "$HOME\\aem\\sdk"

$instances = @(
  @{ Dir = 'author';  Jar = 'aem-author-p4502.jar' },
  @{ Dir = 'publish'; Jar = 'aem-publish-p4503.jar' }
)

foreach ($i in $instances) {
  $dir = Join-Path $base $i.Dir
  Start-Process -FilePath 'java' \`
    -ArgumentList '-Xmx4g', '-jar', $i.Jar, '-nobrowser' \`
    -WorkingDirectory $dir
  Write-Host "$($i.Dir) iniciado en $dir"
}`;

const debugCmd = `java -Xmx4g \\
  -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:30303 \\
  -jar aem-author-p4502.jar -nobrowser`;

const portCheck = `# ¿Quién ocupa el puerto 4502?
# macOS / Linux
lsof -i :4502

# Windows (PowerShell)
Get-NetTCPConnection -LocalPort 4502 | Select-Object LocalPort, OwningProcess
Get-Process -Id <OwningProcess>`;

const snapshot = `# Con la instancia DETENIDA
cd ~/aem/sdk/author
cp -r crx-quickstart ../crx-quickstart-author-limpio     # copia de seguridad

# Para volver a ese estado más tarde (instancia detenida)
rm -rf crx-quickstart
cp -r ../crx-quickstart-author-limpio crx-quickstart`;

export default function Chapter04({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-4"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender qué es el Quickstart de AEM, qué es una instancia y qué son los run modes, antes de instalar nada.',
        'Obtener los archivos correctos para AEM 6.5 / 6.5 LTS y para el AEM SDK de Cloud Service.',
        'Instalar y arrancar una instancia **Author** (puerto 4502) y una **Publish** (puerto 4503), sabiendo qué esperar en cada paso.',
        'Verificar que la instalación funciona, leer los logs y detener las instancias sin dañar el repositorio.',
        'Instalar un Service Pack en 6.5, actualizar el SDK y guardar copias de seguridad de tu entorno local.',
        'Resolver los problemas más frecuentes del primer arranque.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas el JDK correcto instalado y `JAVA_HOME` configurado ([[ch-3]]): **Java 21** para el AEM SDK, **Java 11** para AEM 6.5 clásico y **Java 17 o 21** para AEM 6.5 LTS. Verifica con `java -version` antes de continuar.'}
      </Alert>

      <SectionTitle>Conceptos clave antes de instalar</SectionTitle>
      <Paragraph>{'**¿Qué es el Quickstart?** Es un único archivo `.jar` que contiene AEM completo: el repositorio (Oak), el framework web (Sling), el contenedor OSGi (Felix), un servidor web embebido y todas las aplicaciones de AEM. No hay un instalador tradicional: al ejecutarlo por primera vez, el jar se **desempaqueta** a sí mismo en una carpeta llamada `crx-quickstart` y arranca el servidor. Piensa en él como un instalador y un servidor en un solo archivo.'}</Paragraph>
      <Paragraph>{'**¿Qué es una instancia?** Es una copia de AEM en ejecución, con su propia carpeta `crx-quickstart` y, por lo tanto, su propio repositorio. Para tener Author y Publish necesitas **dos instancias**: dos carpetas, cada una con su jar, cada una en su propio puerto. Todo lo que hagas en una (crear páginas, instalar paquetes) no existe en la otra hasta que lo publiques o lo instales también allí.'}</Paragraph>
      <Paragraph>{'**¿Qué es un run mode?** Es una etiqueta que le dice a la instancia qué papel cumple y en qué entorno está. AEM usa los run modes para activar configuraciones distintas según el caso (por ejemplo, una URL de API diferente en desarrollo y en producción, como verás en [[ch-39]]).'}</Paragraph>
      <DataTable
        headers={['Tipo de run mode', 'Valores', 'Para qué sirve', '¿Se puede cambiar después?']}
        rows={[
          ['Tier (rol)', '`author` o `publish`', 'Define si la instancia es de edición o de entrega', '**No.** Se fija en el primer arranque'],
          ['Contenido de ejemplo (6.5)', '`samplecontent` (por defecto) o `nosamplecontent`', 'Instala o no el sitio de ejemplo We.Retail y otros ejemplos', '**No.** Se fija en el primer arranque'],
          ['Entorno', '`local`, `dev`, `stage`, `prod` (en 6.5 los defines tú)', 'Activar configuraciones OSGi por entorno', 'Sí, en cada arranque'],
          ['Especiales del SDK', '`prerelease`', 'Probar funcionalidades de la próxima release de Cloud Service', 'Sí, en cada arranque']
        ]}
      />
      <Paragraph>{'**¿Por qué los puertos 4502 y 4503?** Son una convención de Adobe: 4502 para Author y 4503 para Publish. No son obligatorios, pero toda la documentación, los tutoriales y la configuración por defecto de los proyectos (por ejemplo, el perfil de Maven que despliega tu código) asumen esos puertos. Úsalos siempre en local.'}</Paragraph>

      <SectionTitle>AEM 6.5 Quickstart vs. AEM SDK</SectionTitle>
      <DataTable
        headers={['Aspecto', 'AEM 6.5 / 6.5 LTS Quickstart', 'AEM SDK (Cloud Service)']}
        rows={[
          ['Para qué sirve', 'Desarrollo local **y** servidores reales (on-premise, AMS)', '**Solo** desarrollo local; nunca se usa en producción'],
          ['Licencia', 'Requiere el archivo `license.properties` junto al jar', 'No usa archivo de licencia'],
          ['Versión de Java', '6.5: Java 11 · 6.5 LTS: Java 17 o 21', 'Java 21'],
          ['Actualizaciones', 'Instalando **Service Packs** sobre la instancia', 'Descargando un SDK nuevo (Adobe recomienda hacerlo cada mes) y recreando la instancia'],
          ['Contenido de ejemplo', 'We.Retail y otros, salvo con `nosamplecontent`', 'Sin sitio de ejemplo'],
          ['Diferencias con el servidor real', 'Es el mismo producto', 'Igual al runtime de Cloud en lo esencial, pero sin servicios de la nube como los microservicios de procesamiento de assets']
        ]}
      />

      <SectionTitle>Paso 1 · Obtener los archivos</SectionTitle>
      <Paragraph>{'Los archivos de AEM **no son de descarga pública**. Se obtienen desde **Software Distribution** (`https://experience.adobe.com/#/downloads`) con un Adobe ID que pertenezca a una organización con licencia de AEM (cliente o partner). Si trabajas en una empresa que usa AEM, pide acceso a tu administrador de Adobe.'}</Paragraph>
      <DataTable
        headers={['Necesitas', 'Dónde está en Software Distribution', 'Archivos']}
        rows={[
          ['AEM SDK', 'Pestaña **AEM as a Cloud Service**, ordenada por fecha de publicación (el más reciente primero)', '`aem-sdk-<versión>.zip`, que contiene `aem-sdk-quickstart-<versión>.jar`, las herramientas del Dispatcher y otros recursos'],
          ['AEM 6.5 / 6.5 LTS', 'Pestaña **AEM** (o la que te indique tu organización)', 'El jar del Quickstart y los paquetes de Service Pack (`aem-service-pkg-...zip`)'],
          ['Licencia 6.5', 'La entrega Adobe o tu organización', '`license.properties`']
        ]}
      />
      <Alert type="tip" title="Descomprime el SDK">
        {'El SDK se descarga como `.zip`. Descomprímelo (por ejemplo en `Descargas/aem-sdk`) y localiza el archivo `aem-sdk-quickstart-<versión>.jar`: ese es el que vamos a usar. Guarda también las herramientas del Dispatcher que vienen dentro; las usaremos en [[ch-79]].'}
      </Alert>

      <SectionTitle>Paso 2 · Preparar la estructura de carpetas</SectionTitle>
      <Paragraph>{'Cada instancia necesita su propia carpeta. Proponemos esta estructura, que separa el SDK de 6.5 por si trabajas con ambos:'}</Paragraph>
      <CodeBlock filename="estructura" language="text" code={'aem/\n├── sdk/\n│   ├── author/    → aem-author-p4502.jar\n│   └── publish/   → aem-publish-p4503.jar\n└── 65/\n    ├── author/    → aem-author-p4502.jar + license.properties\n    └── publish/   → aem-publish-p4503.jar + license.properties'} />
      <CodeBlock filename="terminal · macOS / Linux" language="bash" code={foldersSh} />
      <CodeBlock filename="PowerShell · Windows" language="powershell" code={foldersPs} />
      <List items={[
        '`mkdir -p` / `New-Item -ItemType Directory -Force` crean las carpetas y no fallan si ya existen.',
        'Copiamos el **mismo jar** dos veces: lo que convierte a una copia en Author y a la otra en Publish es el **nombre del archivo**.',
        'La convención de nombre es `aem-<runmode>-p<puerto>.jar`. Al arrancar, AEM lee `author` o `publish` y el número después de `-p` como puerto.',
        'En PowerShell, `Get-ChildItem ... | Select-Object -First 1` encuentra el jar aunque no sepas el número de versión exacto.'
      ]} />
      <Alert type="warning" title="Evita rutas con espacios o acentos">
        {'No pongas las instancias en carpetas como `C:\\Mis Documentos\\Instalación AEM`. Algunos componentes internos y scripts fallan con espacios o caracteres especiales en la ruta. Usa rutas simples como `C:\\Users\\tu-usuario\\aem`.'}
      </Alert>

      <SectionTitle>Paso 3 · Primer arranque de Author</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={startAuthor} />
      <List items={[
        '`cd` entra a la carpeta de la instancia. **Importante:** AEM crea `crx-quickstart` en la carpeta desde donde lo ejecutas, así que siempre arranca desde la carpeta del jar.',
        '`java` ejecuta la máquina virtual de Java (debe ser la versión correcta, revisa `java -version`).',
        '`-Xmx4g` fija la memoria máxima de la JVM en 4 GB. Con menos, AEM arranca pero se vuelve lento o falla al indexar. Si tu equipo tiene 8 GB de RAM usa `-Xmx2g`.',
        '`-jar aem-author-p4502.jar` indica el archivo a ejecutar; el nombre define el run mode `author` y el puerto `4502`.',
        '`-nobrowser` evita que AEM abra el navegador automáticamente (lo abriremos nosotros cuando esté listo).',
        'No se puede arrancar el SDK con doble clic: siempre desde la línea de comandos.'
      ]} />
      <Paragraph>{'**Qué vas a ver.** La terminal muestra mensajes como estos (resumidos):'}</Paragraph>
      <CodeBlock filename="salida en la terminal (ejemplo)" language="text" code={firstStartLog} />
      <List items={[
        'Las primeras líneas confirman que tomó el puerto y el run mode **desde el nombre del archivo**.',
        'Después AEM desempaqueta `crx-quickstart`, arranca el servidor web y comienza a instalar cientos de bundles OSGi y paquetes.',
        'El **primer arranque tarda entre 5 y 15 minutos** según tu equipo. Los siguientes arranques son mucho más rápidos (1 a 3 minutos).',
        'Aunque veas "Startup completed", AEM puede seguir instalando e indexando en segundo plano durante unos minutos. Si una consola carga incompleta, espera y recarga.',
        'Si el SDK te pide una contraseña de administrador en el primer arranque, escribe `admin`: Adobe recomienda usar el valor por defecto en local.'
      ]} />
      <Paragraph>{'Cuando termine, abre `http://localhost:4502` en el navegador. Verás la pantalla de login de AEM. Entra con usuario **admin** y contraseña **admin**. Llegarás a la navegación principal (`/aem/start.html`).'}</Paragraph>
      <Alert type="caution" title="admin/admin solo en tu máquina">
        {'La contraseña por defecto es aceptable en una instancia local que solo tú usas. En cualquier servidor compartido o accesible desde la red, cámbiala de inmediato (Tools → Security → Users → admin).'}
      </Alert>

      <SectionTitle>Paso 4 · Primer arranque de Publish</SectionTitle>
      <Paragraph>{'Abre una **segunda terminal** (la primera queda ocupada por Author) y arranca Publish de la misma forma:'}</Paragraph>
      <CodeBlock filename="segunda terminal" language="bash" code={startPublish} />
      <List items={[
        'El nombre `aem-publish-p4503.jar` fija el run mode `publish` y el puerto `4503`.',
        'Al abrir `http://localhost:4503` **no verás el login**: Publish es la instancia pública y la raíz no tiene contenido todavía, así que es normal un 404 o una página en blanco.',
        'Para entrar como administrador a Publish usa `http://localhost:4503/libs/granite/core/content/login.html` (admin/admin). Solo lo harás para tareas de diagnóstico.',
        'Con ambas instancias arrancadas, tu equipo usa unos 8 GB de RAM solo para AEM. Cierra aplicaciones que no necesites.'
      ]} />

      <SectionTitle>Paso extra · Instalar AEM 6.5 o 6.5 LTS</SectionTitle>
      <Paragraph>{'El procedimiento es igual, con dos diferencias: necesitas el archivo de licencia junto al jar y usas el JDK de 6.5 (11) o de 6.5 LTS (17/21).'}</Paragraph>
      <CodeBlock filename="terminal · AEM 6.5" language="bash" code={aem65Start} />
      <List items={[
        '`license.properties` debe estar en la misma carpeta que el jar; sin él, AEM pide los datos de licencia en una ventana o no arranca.',
        '`mv` renombra el jar con la convención de nombre (en Windows: `Rename-Item`).',
        '`-r author,nosamplecontent` fija los run modes de forma explícita. `nosamplecontent` evita instalar el sitio de ejemplo We.Retail: es la opción que se usa en servidores reales. En local puedes omitirlo si quieres explorar el contenido de ejemplo.',
        'Recuerda: `author`/`publish` y `samplecontent`/`nosamplecontent` **no se pueden cambiar después del primer arranque**. Si te equivocas, borra `crx-quickstart` y vuelve a empezar.'
      ]} />

      <SectionTitle>Paso 5 · Verificar la instalación</SectionTitle>
      <Paragraph>{'Recorre estas URLs en Author (`localhost:4502`). Cada una confirma que una parte de AEM funciona:'}</Paragraph>
      <DataTable
        headers={['URL', 'Qué debes ver', 'Qué confirma']}
        rows={[
          ['`/aem/start.html`', 'La navegación principal con Sites, Assets, Experience Fragments, etc.', 'La interfaz de autor funciona'],
          ['`/crx/de`', 'CRXDE Lite: el árbol del repositorio (`/apps`, `/content`...)', 'El repositorio JCR responde ([[ch-6]])'],
          ['`/crx/packmgr`', 'Package Manager con la lista de paquetes instalados', 'Puedes instalar paquetes'],
          ['`/system/console/bundles`', 'La lista de bundles OSGi; casi todos en estado **Active**', 'El contenedor OSGi está sano ([[ch-7]])'],
          ['`/system/console/status-slingsettings`', 'Los run modes activos, por ejemplo `author, ...`', 'Que la instancia tomó el run mode correcto'],
          ['`/system/console/productinfo`', 'La versión exacta de AEM (Service Pack o versión del SDK)', 'Qué versión tienes instalada']
        ]}
      />
      <Alert type="tip" title="Una instancia sana">
        {'En `/system/console/bundles` la línea superior resume el estado, por ejemplo "Bundle information: 650 bundles in total - all 650 bundles active". Unos pocos bundles en estado **Resolved** que son "fragments" es normal. Si ves bundles en **Installed**, algo no se resolvió: lo diagnosticaremos en [[ch-7]].'}
      </Alert>

      <SectionTitle>Anatomía de crx-quickstart</SectionTitle>
      <Paragraph>{'Tras el primer arranque, cada carpeta de instancia contiene `crx-quickstart`. Estas son sus partes importantes:'}</Paragraph>
      <DataTable
        headers={['Carpeta', 'Contenido', 'Cuándo la usarás']}
        rows={[
          ['`bin/`', 'Scripts `start`, `stop`, `status` (y `.bat` en Windows)', 'Para arrancar y detener en segundo plano'],
          ['`logs/`', '`error.log` (el principal), `request.log`, `access.log`, `stdout.log`', 'Siempre que algo falle'],
          ['`repository/`', 'El repositorio Oak: nodos (`segmentstore`), binarios (`datastore`) e índices', 'Nunca se edita a mano'],
          ['`install/`', 'Carpeta **vigilada**: todo paquete, bundle o configuración que copies aquí se instala solo', 'Para instalar Service Packs o paquetes sin usar la interfaz'],
          ['`launchpad/`', 'Los bundles de Felix/Sling ya desplegados', 'Solo en diagnóstico avanzado'],
          ['`conf/`', 'Configuración de arranque', 'Rara vez']
        ]}
      />

      <SectionTitle>Leer los logs</SectionTitle>
      <Paragraph>{'El archivo `crx-quickstart/logs/error.log` es la fuente de verdad: si algo falla, ahí está la explicación. Su nombre confunde, porque no solo guarda errores, también mensajes informativos y advertencias.'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={followLogs} />
      <CodeBlock filename="error.log (ejemplo de líneas)" language="text" code={logLine} />
      <List items={[
        'Cada línea tiene: **fecha y hora**, **nivel** (`*INFO*`, `*WARN*`, `*ERROR*`, `*DEBUG*`), **hilo** entre corchetes, **logger** (normalmente la clase Java) y el **mensaje**.',
        '`*INFO*` es informativo; `*WARN*` es una advertencia que conviene revisar; `*ERROR*` indica un fallo real.',
        'El logger te dice de dónde viene el mensaje: si empieza por el paquete de tu proyecto (por ejemplo `com.misitio`), el problema es tu código.',
        'En la segunda línea, el WARN "Resource ... not found" significa que alguien pidió una página que no existe (un 404).',
        'Configurar logs propios por paquete se ve en [[ch-7]] y [[ch-122]].'
      ]} />

      <SectionTitle>Detener y volver a arrancar correctamente</SectionTitle>
      <List items={[
        '**Si arrancaste en primer plano** (con `java -jar`): pulsa `Ctrl+C` en esa terminal y espera. AEM detiene los servicios en orden y cierra el repositorio; tarda entre 30 segundos y 2 minutos.',
        '**Si arrancaste con los scripts de `bin/`**: ejecuta `crx-quickstart/bin/stop` (Windows: `crx-quickstart\\bin\\stop.bat`).',
        '**Nunca** mates el proceso con `kill -9`, el Administrador de tareas o apagando el equipo con AEM corriendo: el repositorio puede quedar inconsistente y el siguiente arranque tardará mucho o fallará.',
        'Para volver a arrancar, repite el mismo comando `java -jar ...` desde la carpeta de la instancia: ya no desempaqueta nada y arranca en 1 a 3 minutos.'
      ]} />
      <Paragraph>{'Tras el primer arranque puedes usar los scripts de `bin/`, que arrancan AEM en segundo plano. En macOS y Linux se configuran editando las variables al inicio del archivo:'}</Paragraph>
      <CodeBlock filename="crx-quickstart/bin/start" language="bash" code={binStart} />
      <List items={[
        '`CQ_PORT` y `CQ_RUNMODE` equivalen a `-p` y `-r`.',
        '`CQ_JVM_OPTS` son los parámetros de la JVM: `-Xmx4g` para la memoria y `-Djava.awt.headless=true` para que Java no intente abrir ventanas.',
        'Con estos scripts la salida ya no aparece en la terminal: revisa `crx-quickstart/logs/`.'
      ]} />

      <SectionTitle>Ejemplo práctico: arrancar ambas instancias con un script</SectionTitle>
      <Paragraph>{'Arrancar dos terminales cada día es tedioso. Estos scripts arrancan Author y Publish del SDK con un solo comando.'}</Paragraph>
      <CodeBlock filename="start-aem.sh (macOS / Linux)" language="bash" code={startAllSh} />
      <List items={[
        '`set -euo pipefail` detiene el script ante cualquier error, variable no definida o fallo dentro de una tubería.',
        '`BASE` y `JAVA_OPTS` concentran lo que podrías querer cambiar (ruta y memoria).',
        '`start_instance` recibe la carpeta y el nombre del jar, y entra a la carpeta con `cd` (recuerda: `crx-quickstart` se crea donde ejecutas).',
        '`nohup ... &` ejecuta Java en segundo plano y lo mantiene vivo aunque cierres la terminal.',
        '`> console.log 2>&1` guarda la salida normal y la de error en `console.log` dentro de la carpeta de la instancia.',
        '`$!` es el identificador (PID) del último proceso lanzado; lo imprimimos para poder detenerlo después.',
        'Uso: `chmod +x start-aem.sh` y luego `./start-aem.sh`. Para detener: `crx-quickstart/bin/stop` en cada carpeta, o `kill <PID>` (sin `-9`), que pide un apagado ordenado.'
      ]} />
      <CodeBlock filename="start-aem.ps1 (Windows)" language="powershell" code={startAllPs} />
      <List items={[
        '`$instances` es una lista con la carpeta y el jar de cada instancia.',
        '`Join-Path` arma la ruta completa de forma segura.',
        '`Start-Process` abre una **ventana nueva** por instancia; `-WorkingDirectory` hace que `crx-quickstart` se cree en la carpeta correcta.',
        'El acento grave (backtick) al final de una línea indica a PowerShell que el comando continúa en la línea siguiente.',
        'Para detener una instancia, pulsa `Ctrl+C` en su ventana.'
      ]} />

      <SectionTitle>Modo debug remoto (vista previa)</SectionTitle>
      <Paragraph>{'Para depurar tu código Java con puntos de interrupción, arranca AEM con el agente de depuración de Java:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={debugCmd} />
      <List items={[
        '`-agentlib:jdwp=...` activa el protocolo de depuración de Java (JDWP).',
        '`server=y` hace que la JVM espere conexiones del IDE; `suspend=n` arranca AEM sin esperar a que el IDE se conecte.',
        '`address=*:30303` es el puerto de depuración (usa `30304` para Publish). El `*` permite conexiones desde otra máquina o contenedor; en local puedes usar `localhost:30303`.',
        'En IntelliJ: *Run → Edit Configurations → + → Remote JVM Debug*, puerto 30303. El uso completo se ve en [[ch-122]].'
      ]} />

      <SectionTitle>Mantener el entorno: Service Packs, actualizaciones y copias</SectionTitle>
      <Paragraph>{'**Instalar un Service Pack en AEM 6.5.** Hazlo antes de desplegar el código de tu proyecto:'}</Paragraph>
      <List items={[
        '**1.** Descarga el paquete del Service Pack (`aem-service-pkg-6.5.X.0.zip`) desde Software Distribution.',
        '**2.** Abre `http://localhost:4502/crx/packmgr`, pulsa **Upload Package**, selecciona el zip y después **Install**. Alternativa: copia el zip a `crx-quickstart/install/` con la instancia corriendo.',
        '**3.** Observa `error.log`: la instalación tarda varios minutos y AEM reinicia bundles varias veces. No uses la instancia mientras tanto.',
        '**4.** Cuando el log se estabilice, reinicia la instancia y confirma la versión nueva en `/system/console/productinfo`.',
        '**5.** Repite en Publish. Cómo elegir el Service Pack correcto y cómo pasar a 6.5 LTS se explica en [[ch-129]].'
      ]} />
      <Paragraph>{'**Actualizar el AEM SDK.** Cloud Service se actualiza cada mes, y Adobe recomienda actualizar el SDK al menos una vez al mes (a partir del último jueves de cada mes). El SDK no se actualiza encima: se **reemplaza**. Antes, exporta como paquete el contenido de prueba que quieras conservar ([[ch-6]]), detén las instancias, borra sus carpetas `crx-quickstart`, copia el jar nuevo con los mismos nombres y arranca de nuevo.'}</Paragraph>
      <Paragraph>{'**Copias de seguridad locales (snapshots).** Una instancia recién instalada es valiosa: guárdala para volver a ella en segundos en lugar de reinstalar.'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={snapshot} />
      <List items={[
        'La instancia **debe estar detenida**: copiar un repositorio en uso produce una copia corrupta.',
        '`cp -r` copia la carpeta completa (en Windows: `Copy-Item -Recurse`).',
        'Para restaurar, borra `crx-quickstart` y copia la versión guardada en su lugar.'
      ]} />

      <SectionTitle>¿Y con Docker?</SectionTitle>
      <Paragraph>{'En este tema instalaste AEM directamente en tu sistema operativo, que es la forma más sencilla de empezar. Cuando avances en el manual verás una alternativa muy usada en equipos de desarrollo: levantar **todo el entorno en contenedores Docker**, de modo que cualquier persona del equipo tenga exactamente la misma configuración con un solo comando, incluido un **Dispatcher local** que se comporta como el de producción. Esa ruta se explica paso a paso en el Módulo 11:'}</Paragraph>
      <List items={[
        '[[ch-77]]: Docker desde cero (instalación, imágenes, contenedores, volúmenes, redes y Docker Compose).',
        '[[ch-78]]: entorno completo con Docker Compose: Author, Publish y Dispatcher.',
        '[[ch-79]]: Dispatcher local con el Dispatcher SDK de Adobe, para probar caché y filtros como en producción.',
        '[[ch-80]]: replicación y flush de extremo a extremo, para validar el ciclo publicar → cachear → invalidar en tu equipo.'
      ]} />
      <Alert type="tip" title="¿Cuándo conviene pasarse a Docker?">
        {'Mientras aprendes, la instalación directa de este tema es suficiente. Docker vale la pena cuando trabajas en equipo (todos con el mismo entorno), cuando necesitas el Dispatcher en local o cuando alternas entre varios proyectos con versiones distintas de AEM.'}
      </Alert>

      <SectionTitle>Solución de problemas del primer arranque</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['"Address already in use" o el puerto no responde', 'Otro proceso (o una instancia anterior) usa el 4502', 'Busca el proceso con el comando de abajo y ciérralo, o detén la otra instancia'],
          ['`UnsupportedClassVersionError` al arrancar', 'Versión de Java incorrecta (por ejemplo, SDK con Java 11)', 'Cambia al JDK correcto ([[ch-3]])'],
          ['`OutOfMemoryError` en el log o todo muy lento', 'Poca memoria asignada', 'Aumenta `-Xmx` (4g recomendado) y cierra otras aplicaciones'],
          ['Las consolas cargan a medias tras "Startup completed"', 'AEM sigue instalando o indexando', 'Espera unos minutos y recarga'],
          ['Se creó `crx-quickstart` en otra carpeta', 'Ejecutaste `java -jar` desde otra ubicación', 'Detén, borra esa carpeta y arranca desde la carpeta del jar'],
          ['La instancia quedó como publish en vez de author', 'Nombre del jar o `-r` incorrectos en el primer arranque', 'Borra `crx-quickstart` y arranca con el nombre correcto'],
          ['6.5 pide licencia o no arranca', 'Falta `license.properties` junto al jar', 'Copia el archivo de licencia a la carpeta']
        ]}
      />
      <CodeBlock filename="terminal · diagnosticar puertos" language="bash" code={portCheck} />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Crea la estructura de carpetas e instala Author (4502) y Publish (4503) del AEM SDK (o de 6.5 si ese es tu caso).',
        '**2.** Mientras arranca Author, sigue su `error.log` en otra terminal y localiza el mensaje de arranque completado.',
        '**3.** Recorre las 6 URLs de verificación y anota: número de bundles activos, run modes y versión de AEM.',
        '**4.** Detén ambas instancias de forma ordenada, crea un snapshot de Author y vuelve a arrancar con tu script `start-aem`.',
        '**5.** Provoca un error a propósito: intenta arrancar una segunda copia de Author en el mismo puerto y lee el mensaje. Después usa el comando de diagnóstico de puertos para encontrar el proceso que lo ocupa.'
      ]} />
      <Alert type="tip" title="Criterios de verificación y solución">
        {'Está completo si: (a) `localhost:4502` muestra el login y `localhost:4503/libs/granite/core/content/login.html` también; (b) `status-slingsettings` muestra `author` en 4502 y `publish` en 4503; (c) tienes la carpeta del snapshot con un `crx-quickstart` completo. En el paso 5, la segunda copia no puede usar el 4502 porque ya lo tiene la primera: el diagnóstico de puertos te mostrará el PID del proceso Java de la instancia original.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'El Quickstart es AEM completo en un jar que se desempaqueta en `crx-quickstart`; cada carpeta es una instancia independiente.',
        'El nombre `aem-<runmode>-p<puerto>.jar` define el rol y el puerto; `author`/`publish` y `nosamplecontent` se fijan para siempre en el primer arranque.',
        'Author (4502) muestra el login; Publish (4503) es público y su raíz vacía es normal al inicio.',
        '`error.log` es la primera fuente de diagnóstico y las URLs de `/system/console` confirman el estado interno.',
        'Las instancias se detienen de forma ordenada (Ctrl+C o `bin/stop`), nunca matando el proceso.',
        '6.5 se actualiza con Service Packs; el SDK se reemplaza cada mes. Los snapshots te ahorran reinstalaciones.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Quickstart', 'El jar ejecutable que contiene AEM completo'],
          ['Instancia', 'Una copia de AEM en ejecución con su propio `crx-quickstart` y repositorio'],
          ['Run mode', 'Etiqueta que define el rol (author/publish) y el entorno de una instancia'],
          ['`crx-quickstart`', 'Carpeta creada en el primer arranque con el repositorio, logs y scripts'],
          ['Service Pack', 'Paquete de actualización acumulativa de AEM 6.5'],
          ['AEM SDK', 'Versión local de AEM as a Cloud Service para desarrollo'],
          ['Software Distribution', 'Portal de Adobe para descargar AEM, SDK y Service Packs'],
          ['JDWP', 'Protocolo de depuración remota de Java']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Configurar el AEM SDK local', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/local-development-environment-set-up/aem-runtime' },
        { type: 'image', title: 'AEM as a Cloud Service SDK', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-as-a-cloud-service-sdk' },
        { type: 'image', title: 'Instalación personalizada del Quickstart 6.5 (opciones de línea de comandos)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65/content/implementing/deploying/deploying/custom-standalone-install' },
        { type: 'image', title: 'Requisitos técnicos de AEM 6.5 LTS', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65-lts/content/implementing/deploying/introduction/technical-requirements' },
        { type: 'image', title: 'Software Distribution', source: 'Adobe', url: 'https://experience.adobe.com/#/downloads' }
      ]} />
    </LessonPage>
  );
}
