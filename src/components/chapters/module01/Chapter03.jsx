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

const winInstall = `# PowerShell: instala las herramientas con winget (incluido en Windows 10/11)
winget install EclipseAdoptium.Temurin.21.JDK
winget install EclipseAdoptium.Temurin.11.JDK
winget install Git.Git
winget install CoreyButler.NVMforWindows
winget install Microsoft.VisualStudioCode
winget install JetBrains.IntelliJIDEA.Community
winget install Google.Chrome`;

const winMaven = `# 1. Descarga apache-maven-3.9.x-bin.zip desde https://maven.apache.org/download.cgi
# 2. Descomprímelo, por ejemplo en C:\\tools\\apache-maven-3.9.11
# 3. Registra las variables de entorno del usuario (ajusta las rutas a las tuyas)
$jdk   = 'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.8.9-hotspot'
$maven = 'C:\\tools\\apache-maven-3.9.11'

[Environment]::SetEnvironmentVariable('JAVA_HOME', $jdk, 'User')
[Environment]::SetEnvironmentVariable('MAVEN_HOME', $maven, 'User')

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
[Environment]::SetEnvironmentVariable('Path', "$userPath;$jdk\\bin;$maven\\bin", 'User')

# 4. Cierra y vuelve a abrir la terminal para que tome los cambios`;

const winSwitch = `# Agrega esta función a tu perfil de PowerShell (notepad $PROFILE)
function Use-Jdk([string]$Version) {
  $jdk = Get-ChildItem 'C:\\Program Files\\Eclipse Adoptium' -Directory |
    Where-Object Name -like "jdk-$Version*" |
    Select-Object -First 1

  if (-not $jdk) {
    Write-Error "No se encontró un JDK $Version instalado"
    return
  }

  $env:JAVA_HOME = $jdk.FullName
  $env:Path = "$($jdk.FullName)\\bin;" + $env:Path
  java -version
}

# Uso (solo afecta a la terminal actual):
#   Use-Jdk 11   -> proyecto AEM 6.5
#   Use-Jdk 21   -> proyecto AEM as a Cloud Service`;

const unixInstall = `# macOS / Linux: SDKMAN gestiona varias versiones de Java y Maven
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

sdk list java                 # muestra los identificadores disponibles
sdk install java 21.0.8-tem   # usa un identificador real de la lista
sdk install java 11.0.28-tem
sdk install maven             # instala la última versión estable de Maven
sdk default java 21.0.8-tem   # versión por defecto en terminales nuevas
sdk use java 11.0.28-tem      # cambia solo en la terminal actual

# Git
brew install git              # macOS (con Homebrew)
sudo apt install git          # Debian / Ubuntu

# nvm (Node Version Manager); revisa la última versión en github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`;

const nodeSetup = `# Instala y usa la versión LTS de Node.js
nvm install --lts
nvm use --lts

# En un proyecto con archivo .nvmrc (macOS / Linux)
echo "lts/*" > .nvmrc
nvm use          # lee la versión desde .nvmrc`;

const gitSetup = `git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
git config --global init.defaultBranch main

# Finales de línea
git config --global core.autocrlf true    # Windows
git config --global core.autocrlf input   # macOS / Linux`;

const gitattributes = `# .gitattributes en la raíz del proyecto AEM
* text=auto eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
*.png binary
*.jpg binary
*.zip binary`;

const vscodeExtensions = `code --install-extension yamato-ltd.vscode-aem-sync
code --install-extension vscjava.vscode-java-pack
code --install-extension redhat.vscode-xml
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode`;

const aemSyncSettings = `{
  "aemsync.server": "http://localhost:4502",
  "aemsync.user": "admin",
  "aemsync.password": "admin",
  "aemsync.autopush": false,
  "aemsync.acceptSelfSignedCert": false
}`;

const checkSh = `#!/usr/bin/env bash
# check-env.sh: verifica las herramientas del entorno AEM
set -u

check() {
  local name="$1"
  shift
  if command -v "$1" >/dev/null 2>&1; then
    printf "%-6s OK     %s\\n" "$name" "$("$@" 2>&1 | head -n 1)"
  else
    printf "%-6s FALTA\\n" "$name"
  fi
}

check "Java"  java -version
check "Maven" mvn -v
check "Git"   git --version
check "Node"  node -v
check "npm"   npm -v
echo "JAVA_HOME=\${JAVA_HOME:-<no definido>}"`;

const checkPs1 = `# check-env.ps1: verifica las herramientas del entorno AEM
$tools = @(
  @{ Name = 'Java';  Cmd = 'java'; Args = @('-version') },
  @{ Name = 'Maven'; Cmd = 'mvn';  Args = @('-v') },
  @{ Name = 'Git';   Cmd = 'git';  Args = @('--version') },
  @{ Name = 'Node';  Cmd = 'node'; Args = @('-v') },
  @{ Name = 'npm';   Cmd = 'npm';  Args = @('-v') }
)

foreach ($t in $tools) {
  if (Get-Command $t.Cmd -ErrorAction SilentlyContinue) {
    $out = & $t.Cmd @($t.Args) 2>&1 | Select-Object -First 1
    '{0,-6} OK     {1}' -f $t.Name, $out
  } else {
    '{0,-6} FALTA' -f $t.Name
  }
}

"JAVA_HOME = $env:JAVA_HOME"`;

export default function Chapter03({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-3"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Saber qué versión de Java, Maven y Node.js necesita cada tipo de proyecto AEM.',
        'Instalar paso a paso JDK, Maven, Git, Node.js (con nvm) y un IDE en Windows, macOS o Linux.',
        'Configurar `JAVA_HOME` y `PATH`, y cambiar de versión de Java según el proyecto.',
        'Configurar Git para evitar problemas de finales de línea.',
        'Preparar **Visual Studio Code** con las extensiones para AEM, incluida la sincronización con **VSCode AEM Sync**.',
        'Instalar **Google Chrome** con la extensión **AEM Chrome Extension** para moverte rápido entre páginas, editor, propiedades y CRXDE Lite.',
        'Verificar todo el entorno con un script de diagnóstico.'
      ]} />
      <FlowDiagram
        caption="El orden recomendado de instalación."
        steps={[
          { title: '1. JDK', detail: 'Java para compilar y ejecutar AEM', tone: 'purple' },
          { title: '2. Maven', detail: 'Compila y empaqueta el proyecto', tone: 'primary' },
          { title: '3. Git', detail: 'Control de versiones y Cloud Manager', tone: 'cyan' },
          { title: '4. Node.js', detail: 'Build del frontend (ui.frontend)', tone: 'success' },
          { title: '5. IDE', detail: 'IntelliJ IDEA y **VS Code** con **VSCode AEM Sync**', tone: 'warning' },
          { title: '6. Navegador', detail: 'Chrome con **AEM Chrome Extension**', tone: 'purple' }
        ]}
      />

      <SectionTitle>Hardware recomendado</SectionTitle>
      <DataTable
        headers={['Recurso', 'Mínimo para aprender', 'Recomendado para trabajar']}
        rows={[
          ['RAM', '8 GB (una sola instancia de AEM)', '16 a 32 GB (Author + Publish + IDE + Docker)'],
          ['Disco', '20 GB libres', 'SSD con 50 GB o más libres'],
          ['CPU', '4 núcleos', '8 núcleos o más'],
          ['Sistema operativo', 'Windows 10/11, macOS o Linux', 'Cualquiera de los tres; en Windows, WSL2 para Docker ([[ch-77]])']
        ]}
      />
      <Paragraph>{'Adobe documenta un mínimo de 2 GB de memoria para una instancia base de AEM 6.5 LTS, pero en la práctica un desarrollador ejecuta Author, Publish, el IDE, el navegador y a veces Docker al mismo tiempo.'}</Paragraph>

      <SectionTitle>¿Qué versiones necesito? Matriz de compatibilidad</SectionTitle>
      <DataTable
        caption="Versiones vigentes a septiembre de 2026; confírmalas en la documentación oficial al iniciar un proyecto."
        headers={['Proyecto', 'Java', 'Maven', 'Node.js']}
        rows={[
          ['AEM 6.5 (Service Pack clásico)', 'Java 11 (Java 8 solo en proyectos antiguos)', '3.9.x', 'El que indique el `pom.xml` del proyecto'],
          ['AEM 6.5 LTS', 'Java 17 o 21 (Oracle o IBM Semeru)', '3.9.x', 'El que indique el `pom.xml`'],
          ['AEM as a Cloud Service (AEM SDK local)', '**Java 21** recomendado; se compila con 17 o 21', '3.9.x (Cloud Manager usa 3.9.4)', 'El que indique el `pom.xml`'],
          ['Edge Delivery Services', 'No necesita Java', 'No necesita Maven', 'LTS activa']
        ]}
      />
      <Alert type="info" title="Cloud Service: Java 21 en runtime">
        {'AEM as a Cloud Service ya no ejecuta código en Java 8 ni 11: el runtime es Java 21. En Cloud Manager eliges la versión de compilación con el archivo `.cloudmanager/java-version` (valores `21` o `17`). Lo configuraremos en el laboratorio de Cloud ([[ch-12]]).'}
      </Alert>
      <Alert type="warning" title="¿Qué distribución de Java uso?">
        {'Para producción, Adobe soporta Oracle JDK (e IBM Semeru en 6.5 LTS); los clientes lo descargan desde **Software Distribution** de Adobe. Para aprender y desarrollar en local puedes usar **Eclipse Temurin** (OpenJDK gratuito), que es lo que usaremos en los comandos de este tema.'}
      </Alert>
      <Paragraph>{'Como vas a trabajar con proyectos 6.5 y Cloud, lo práctico es instalar **dos JDK (11 y 21)** y cambiar entre ellos según el proyecto.'}</Paragraph>

      <SectionTitle>Instalación en Windows</SectionTitle>
      <List items={[
        '**Paso 1.** Abre **PowerShell** (no hace falta que sea como administrador para instalar a nivel de usuario).',
        '**Paso 2.** Instala las herramientas con `winget`, el gestor de paquetes incluido en Windows 10 y 11.',
        '**Paso 3.** Instala Maven de forma manual (es un zip) y registra las variables de entorno.',
        '**Paso 4.** Cierra y vuelve a abrir la terminal, y ejecuta el script de verificación del final del tema.'
      ]} />
      <CodeBlock filename="PowerShell · instalación" language="powershell" code={winInstall} />
      <List items={[
        '`EclipseAdoptium.Temurin.21.JDK` y `...11.JDK` instalan los dos JDK. El instalador de Temurin puede configurar `JAVA_HOME` por ti si marcas esa opción.',
        '`Git.Git` instala Git para Windows, que incluye **Git Bash** (una terminal compatible con los comandos de Linux).',
        '`CoreyButler.NVMforWindows` instala **nvm-windows**, que permite tener varias versiones de Node.js.',
        'Los dos últimos instalan VS Code e IntelliJ IDEA Community; con uno es suficiente.'
      ]} />
      <CodeBlock filename="PowerShell · Maven y variables de entorno" language="powershell" code={winMaven} />
      <List items={[
        '`$jdk` y `$maven` guardan las rutas de instalación. **Ajústalas**: revisa el nombre exacto de la carpeta en `C:\\Program Files\\Eclipse Adoptium`.',
        '`SetEnvironmentVariable(..., \'User\')` guarda la variable de forma permanente para tu usuario (equivale a editarla en "Variables de entorno" del Panel de control).',
        '`JAVA_HOME` es la variable que leen Maven y AEM para saber qué Java usar. `MAVEN_HOME` es opcional pero útil.',
        'La última línea agrega las carpetas `bin` al `Path` del usuario para poder ejecutar `java` y `mvn` desde cualquier carpeta.'
      ]} />
      <Paragraph>{'Para cambiar de JDK sin tocar las variables globales, agrega esta función a tu perfil de PowerShell:'}</Paragraph>
      <CodeBlock filename="$PROFILE (perfil de PowerShell)" language="powershell" code={winSwitch} />
      <List items={[
        '`Get-ChildItem ... -Directory` lista las carpetas de JDK instaladas por Temurin.',
        '`Where-Object Name -like "jdk-$Version*"` se queda con la que empieza por la versión pedida, por ejemplo `jdk-11`.',
        'Si no la encuentra, muestra un error y sale sin cambiar nada.',
        '`$env:JAVA_HOME` y `$env:Path` cambian **solo en la terminal actual**; al abrir otra vuelves a la versión global.',
        'Al final ejecuta `java -version` para confirmar el cambio.'
      ]} />

      <SectionTitle>Instalación en macOS y Linux</SectionTitle>
      <Paragraph>{'En macOS y Linux la forma más cómoda de manejar varias versiones de Java y Maven es **SDKMAN**. Requisitos previos: `curl` y `zip`/`unzip` (en Ubuntu: `sudo apt install curl zip unzip`). En macOS se recomienda además **Homebrew** (`brew.sh`) para Git.'}</Paragraph>
      <CodeBlock filename="terminal · macOS / Linux" language="bash" code={unixInstall} />
      <List items={[
        'El primer comando descarga e instala SDKMAN; `source` lo activa en la terminal actual sin reiniciarla.',
        '`sdk list java` muestra los identificadores exactos; los sufijos `-tem` corresponden a Eclipse Temurin. **Copia uno real de la lista**, porque cambian con cada actualización.',
        '`sdk default` fija la versión global y `sdk use` cambia solo la terminal actual.',
        'Consejo: dentro de un proyecto ejecuta `sdk env init` para crear un archivo `.sdkmanrc` con la versión de Java del proyecto, y `sdk env` para activarla.',
        'El script de nvm modifica tu `~/.bashrc` o `~/.zshrc`; abre una terminal nueva después de instalarlo.'
      ]} />

      <SectionTitle>Node.js con nvm</SectionTitle>
      <Paragraph>{'El módulo `ui.frontend` de un proyecto AEM compila CSS y JavaScript con Node.js. Durante el build de Maven, el plugin `frontend-maven-plugin` descarga su **propia** copia de Node con la versión fijada en el `pom.xml`, pero para trabajar en local (por ejemplo, con `npm run watch`) necesitas Node instalado. Adobe recomienda mantener tu versión local igual o cercana a la del `pom.xml`.'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={nodeSetup} />
      <List items={[
        '`nvm install --lts` instala la versión LTS más reciente y `nvm use --lts` la activa.',
        'Si el `pom.xml` fija otra versión (busca la propiedad `node.version` o `nodeVersion`), instala esa: `nvm install 20`, por ejemplo.',
        'El archivo `.nvmrc` guarda la versión del proyecto para que todo el equipo use la misma (nvm-windows no lo lee de forma automática; ahí usa `nvm use <versión>`).'
      ]} />

      <SectionTitle>Configuración de Git</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={gitSetup} />
      <List items={[
        '`user.name` y `user.email` identifican tus commits.',
        '`init.defaultBranch main` hace que los repositorios nuevos empiecen en la rama `main`.',
        '`core.autocrlf` controla los finales de línea: Windows usa CRLF y Linux/macOS usan LF. Con `true` en Windows e `input` en macOS/Linux, el repositorio guarda LF y cada sistema trabaja con su formato.'
      ]} />
      <Paragraph>{'Además, en cada proyecto AEM agrega un `.gitattributes`. Esto es importante porque la configuración del Dispatcher y los scripts se ejecutan en contenedores Linux, y un final de línea CRLF puede romperlos:'}</Paragraph>
      <CodeBlock filename=".gitattributes" language="text" code={gitattributes} />
      <List items={[
        '`* text=auto eol=lf` normaliza todos los archivos de texto a LF.',
        '`.bat` y `.cmd` son scripts de Windows y necesitan CRLF.',
        'Los binarios se marcan como `binary` para que Git nunca modifique sus bytes.'
      ]} />

      <SectionTitle>El IDE: IntelliJ IDEA y Visual Studio Code</SectionTitle>
      <DataTable
        headers={['IDE', 'Ideal para', 'Configuración mínima']}
        rows={[
          ['**IntelliJ IDEA** (Community basta)', 'Backend Java: Sling Models, servicios OSGi, pruebas', 'Abre el `pom.xml` raíz como proyecto Maven y selecciona el JDK correcto en *Project Structure → SDK*'],
          ['**Visual Studio Code**', 'Frontend: HTL, CSS, JavaScript, XML de diálogos, Edge Delivery Services', 'Extensión **VSCode AEM Sync** para sincronizar con AEM, más las extensiones de la sección siguiente'],
          ['**Eclipse**', 'Equipos que usan AEM Developer Tools', 'Plugin oficial *AEM Developer Tools for Eclipse*']
        ]}
      />
      <Paragraph>{'Una combinación muy común es **IntelliJ IDEA para Java** y **VS Code para todo lo demás** (HTL, clientlibs, XML y Edge Delivery Services). Si prefieres un solo editor, VS Code con las extensiones de Java también sirve para aprender.'}</Paragraph>
      <Alert type="tip" title="Recomendación de esta guía">
        {'Instala **Visual Studio Code** con la extensión **VSCode AEM Sync** (`yamato-ltd.vscode-aem-sync`) para sincronizar tus archivos con AEM, y **evita aemsync**. En la sección siguiente tienes la instalación y la configuración paso a paso.'}
      </Alert>

      <SectionTitle>Visual Studio Code para AEM, paso a paso</SectionTitle>
      <List items={[
        '**Paso 1 · Instalar VS Code.** En Windows: `winget install Microsoft.VisualStudioCode`. En macOS: `brew install --cask visual-studio-code`. En Linux: descarga el `.deb` o `.rpm` desde `code.visualstudio.com`.',
        '**Paso 2 · Habilitar el comando `code` en la terminal.** En Windows el instalador lo agrega al `PATH`. En macOS abre VS Code, pulsa `Cmd+Shift+P` y ejecuta *Shell Command: Install \'code\' command in PATH*. Comprueba con `code --version`.',
        '**Paso 3 · Instalar las extensiones** con los comandos de abajo (o desde la vista Extensiones, `Ctrl+Shift+X`, buscando cada nombre).',
        '**Paso 4 · Configurar la conexión con AEM** en el archivo de ajustes del espacio de trabajo.'
      ]} />
      <CodeBlock filename="terminal · extensiones de VS Code" language="bash" code={vscodeExtensions} />
      <DataTable
        headers={['Extensión', 'Id', 'Para qué la usarás']}
        rows={[
          ['**VSCode AEM Sync** (recomendada)', '`yamato-ltd.vscode-aem-sync`', 'Enviar a AEM (export) o traer de AEM (import) archivos y carpetas del proyecto, incluidos `.content.xml` y diálogos, sin recompilar con Maven'],
          ['Extension Pack for Java', '`vscjava.vscode-java-pack`', 'Autocompletado, compilación y depuración de Java'],
          ['XML (Red Hat)', '`redhat.vscode-xml`', 'Validación y formato de `.content.xml`, diálogos y `filter.xml`'],
          ['ESLint', '`dbaeumer.vscode-eslint`', 'Revisar el JavaScript de `ui.frontend` y de Edge Delivery Services'],
          ['Prettier', '`esbenp.prettier-vscode`', 'Formato automático de JS, CSS y JSON']
        ]}
      />
      <Paragraph>{'**Configurar VSCode AEM Sync.** Crea el archivo `.vscode/settings.json` en la raíz de tu proyecto (o usa los ajustes de usuario con `Ctrl+,` y busca "aemsync"):'}</Paragraph>
      <CodeBlock filename=".vscode/settings.json" language="json" code={aemSyncSettings} />
      <List items={[
        '`aemsync.server` es la URL de la instancia destino. Usa `http://localhost:4502` para Author; cámbiala a `4503` si quieres probar en Publish.',
        '`aemsync.user` y `aemsync.password` son las credenciales. En local, `admin`/`admin`.',
        '`aemsync.autopush` en `false` significa que tú decides cuándo enviar. Con `true`, cada vez que guardas un archivo se envía a AEM de forma automática.',
        '`aemsync.acceptSelfSignedCert` solo es necesario si te conectas por HTTPS a un servidor con certificado autofirmado.'
      ]} />
      <Paragraph>{'**Cómo se usa.** Haz clic derecho sobre un archivo o carpeta en el Explorador de VS Code (o dentro del editor) y elige la opción de **exportar a AEM** para enviar tus cambios, o la de **importar desde AEM** para traer lo que haya en el repositorio (por ejemplo, un diálogo que alguien modificó en CRXDE Lite). La extensión trabaja con los archivos de contenido del proyecto, los que están dentro de la carpeta `jcr_root` de módulos como `ui.apps` ([[ch-10]]).'}</Paragraph>
      <Alert type="tip" title="Empieza con autopush desactivado">
        {'Mientras aprendes, deja `autopush` en `false` y exporta a mano: así ves exactamente qué envías y cuándo. Cuando domines el flujo, actívalo para que cada guardado de un HTL o CSS se refleje al instante al recargar la página en AEM.'}
      </Alert>
      <Alert type="warning" title="Por qué recomendamos VSCode AEM Sync y no aemsync">
        {'**aemsync** es una herramienta de línea de comandos (paquete de npm) que vigila tus carpetas y envía cada cambio a AEM automáticamente. Funciona, pero en la experiencia de proyectos reales tiende a **corromper la instancia local**: al enviar muchos cambios seguidos puede dejar nodos a medio escribir o contenido inconsistente, y terminas reinstalando AEM o restaurando un snapshot ([[ch-4]]). Con VSCode AEM Sync controlas cada envío (o lo haces solo al guardar), y el riesgo es mucho menor. Ninguna de las dos reemplaza al despliegue completo con Maven: lo verás en [[ch-15]].'}
      </Alert>
      <Alert type="caution" title="No subas credenciales al repositorio">
        {'Si guardas la contraseña en `.vscode/settings.json`, que sea solo la de tu instancia local. Nunca pongas ahí credenciales de un servidor compartido; si tu equipo versiona la carpeta `.vscode`, mueve estos ajustes a tu configuración de usuario.'}
      </Alert>

      <SectionTitle>El navegador: Chrome y AEM Chrome Extension</SectionTitle>
      <Paragraph>{'Trabajando con AEM saltas todo el tiempo entre la misma página en distintas vistas: el editor, la vista publicada, sus propiedades, su nodo en CRXDE Lite. Hacerlo a mano implica copiar y editar URLs una y otra vez. La extensión **AEM Chrome Extension** (de SourcedCode, gratuita y compatible con todas las versiones de AEM, incluido Cloud Service) lo resuelve con un clic o una tecla.'}</Paragraph>
      <List items={[
        '**Paso 1 · Instalar Chrome.** En Windows: `winget install Google.Chrome` (incluido en la lista de instalación de arriba). En macOS: `brew install --cask google-chrome`. En Linux: descarga el paquete desde `google.com/chrome`. También funciona en navegadores basados en Chromium, como Edge.',
        '**Paso 2 · Instalar la extensión.** Abre la Chrome Web Store, busca **AEM Chrome Extension - SourcedCode** (publicada por *SourcedCode*) y pulsa **Añadir a Chrome**.',
        '**Paso 3 · Fijarla.** Pulsa el icono de extensiones (pieza de rompecabezas) en la barra de Chrome y fija la extensión con la chincheta para tenerla siempre visible.',
        '**Paso 4 · Configurarla.** En sus opciones indica tu **Author URL Origin**: `http://localhost:4502`. Puedes elegir también si los enlaces se abren en una pestaña nueva y una etiqueta de entorno (Development, Staging, Production) para saber siempre en qué instancia estás.',
        '**Paso 5 · Probarla.** Abre una página de AEM, pulsa el icono de la extensión y usa sus accesos directos o sus teclas.'
      ]} />
      <DataTable
        caption="Accesos rápidos de la extensión (según su ficha en la Chrome Web Store)"
        headers={['Tecla', 'Te lleva a', 'Uso típico']}
        rows={[
          ['`e`', 'Editor de la página (Touch UI)', 'Estás viendo la página publicada y quieres editarla'],
          ['`p`', 'Page Properties de la página actual', 'Revisar título, tags o descripción ([[ch-5]])'],
          ['`c`', 'CRXDE Lite en el nodo de la página actual', 'Inspeccionar cómo se guardó el contenido ([[ch-6]])'],
          ['`d`', 'La página en **modo deshabilitado** (`wcmmode=disabled`)', 'Ver la página sin la capa del editor, como un visitante'],
          ['`s` / `a`', 'La carpeta de la página en Sites / la carpeta del DAM', 'Volver a la consola en el lugar correcto'],
          ['`Shift` + `S`, `A`, `X`', 'Consolas Sites, Assets, Experience Fragments', 'Marcadores de navegación'],
          ['`Shift` + `C`, `P`', 'CRXDE Lite y Package Manager', 'Herramientas de desarrollo ([[ch-6]])'],
          ['`Shift` + `B`, `M`', 'Bundles y Configuration Manager de la consola OSGi', 'Diagnóstico del backend ([[ch-7]])'],
          ['`Shift` + `U`, `T`, `R`', 'Usuarios, Tags y agentes de replicación', 'Administración']
        ]}
      />
      <Alert type="info" title="Es una herramienta de la comunidad">
        {'La AEM Chrome Extension no es un producto de Adobe: la mantiene SourcedCode. Antes de instalar cualquier extensión en un equipo de trabajo, revisa los permisos que pide y la política de tu empresa. Los atajos pueden cambiar entre versiones: consulta su ficha en la Chrome Web Store.'}
      </Alert>
      <Paragraph>{'Dos parámetros de URL que la extensión usa por ti y que conviene conocer: `?wcmmode=disabled` muestra la página en Author **sin** el editor (útil para ver el HTML final) y `?debugClientLibs=true` carga el CSS y JS del sitio **sin combinar ni minificar**, para depurarlos ([[ch-24]]).'}</Paragraph>

      <SectionTitle>Ejemplo práctico: script de verificación del entorno</SectionTitle>
      <Paragraph>{'Guarda el script de tu sistema operativo y ejecútalo. Te dirá qué herramientas están instaladas, su versión y qué Java está usando el sistema.'}</Paragraph>
      <CodeBlock filename="check-env.sh (macOS / Linux / Git Bash)" language="bash" code={checkSh} />
      <List items={[
        '`#!/usr/bin/env bash` indica que el archivo se ejecuta con bash. Dale permisos con `chmod +x check-env.sh` y ejecútalo con `./check-env.sh`.',
        '`set -u` hace que el script falle si usas una variable no definida (evita errores silenciosos).',
        '`check()` recibe un nombre y un comando. `command -v` comprueba si el comando existe en el `PATH`.',
        '`"$@" 2>&1 | head -n 1` ejecuta el comando, une la salida de error con la normal (`java -version` escribe en la salida de error) y se queda con la primera línea.',
        '`printf "%-6s ..."` alinea el nombre en una columna de 6 caracteres.',
        '`${JAVA_HOME:-<no definido>}` muestra el valor de `JAVA_HOME` o un texto por defecto si no existe.'
      ]} />
      <CodeBlock filename="check-env.ps1 (Windows PowerShell)" language="powershell" code={checkPs1} />
      <List items={[
        '`$tools` es un arreglo de tablas hash: cada una tiene el nombre, el comando y sus argumentos.',
        '`Get-Command ... -ErrorAction SilentlyContinue` devuelve el comando si existe y nada si no, sin mostrar errores.',
        '`& $t.Cmd @($t.Args)` ejecuta el comando con sus argumentos; `2>&1` captura también la salida de error.',
        '`\'{0,-6} OK {1}\' -f ...` es el formato de cadenas de PowerShell: el nombre alineado a 6 caracteres y la versión.',
        'Si PowerShell bloquea la ejecución de scripts, ejecútalo con `powershell -ExecutionPolicy Bypass -File .\\check-env.ps1`.'
      ]} />
      <CodeBlock filename="salida esperada (ejemplo)" language="text" code={'Java   OK     openjdk version "21.0.8" 2025-07-15 LTS\nMaven  OK     Apache Maven 3.9.11\nGit    OK     git version 2.51.0\nNode   OK     v22.19.0\nnpm    OK     10.9.3\nJAVA_HOME=/home/usuario/.sdkman/candidates/java/current'} />
      <Alert type="tip" title="Verifica qué Java usa Maven">
        {'`mvn -v` muestra la línea "Java version" y la ruta del JDK que usará Maven, que sale de `JAVA_HOME`. Si no coincide con `java -version`, tu `JAVA_HOME` apunta a otro JDK: es la causa más común de errores de compilación como "invalid target release".'}
      </Alert>

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Instala JDK 11 y 21, Maven, Git, nvm y un IDE siguiendo las instrucciones de tu sistema operativo.',
        '**2.** Ejecuta el script de verificación y confirma que todo aparece como OK.',
        '**3.** Cambia a Java 11 (`Use-Jdk 11` o `sdk use java <id-11>`) y ejecuta `mvn -v`. Después cambia a 21 y repite.',
        '**4.** Configura Git con tu nombre y correo, y crea una carpeta de práctica con un `.gitattributes` como el del tema.',
        '**5.** Instala la LTS de Node.js con nvm y comprueba `node -v` y `npm -v`.',
        '**6.** Instala VS Code con VSCode AEM Sync y Chrome con la AEM Chrome Extension configurada para `http://localhost:4502`.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'El ejercicio está completo si: (a) el script muestra las 5 herramientas en OK; (b) `mvn -v` cambia de "Java version: 11" a "Java version: 21" al cambiar de JDK; (c) `git config --global --list` muestra tu nombre, correo y `core.autocrlf`. Si `mvn` no cambia de versión, revisa que la función o SDKMAN estén actualizando `JAVA_HOME` y no solo el `PATH`.'}
      </Alert>

      <SectionTitle>Errores comunes</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa', 'Solución']}
        rows={[
          ['`java` o `mvn` "no se reconoce como un comando"', 'La carpeta `bin` no está en el `PATH`', 'Revisa la variable `Path` y abre una terminal nueva'],
          ['`mvn -v` muestra otra versión de Java', '`JAVA_HOME` apunta a otro JDK', 'Corrige `JAVA_HOME` o usa `Use-Jdk` / `sdk use`'],
          ['"invalid target release: 21" al compilar', 'Compilas con un JDK más viejo que el que pide el proyecto', 'Cambia al JDK que indica el `pom.xml`'],
          ['El build de `ui.frontend` falla por la versión de Node', 'Versión local muy distinta a la del `pom.xml`', 'Instala con nvm la versión que fija el proyecto'],
          ['Scripts del Dispatcher fallan con `\\r: command not found`', 'Archivos con finales de línea CRLF', 'Agrega `.gitattributes` con `eol=lf` y vuelve a clonar']
        ]}
      />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Usa gestores de versiones (SDKMAN, nvm) en lugar de instalar Java y Node "a mano" varias veces.',
        'Documenta en el README de cada proyecto las versiones exactas de Java, Maven y Node, y guárdalas en `.sdkmanrc` y `.nvmrc`.',
        'No instales Node, Maven ni Java dentro de carpetas con espacios o acentos en la ruta: algunos plugins fallan.',
        'Mantén las herramientas actualizadas dentro de la misma versión mayor (por ejemplo, el último parche de Java 21).'
      ]} />

      <ResourceLinks items={[
        { type: 'image', title: 'Herramientas de desarrollo para AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/local-development-environment-set-up/development-tools' },
        { type: 'image', title: 'Entorno de build de Cloud Manager', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/create-application-project/build-environment-details' },
        { type: 'image', title: 'Requisitos técnicos de AEM 6.5 LTS', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65-lts/content/implementing/deploying/introduction/technical-requirements' },
        { type: 'image', title: 'AEM Project Archetype: requisitos', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' },
        { type: 'image', title: 'SDKMAN', source: 'sdkman.io', url: 'https://sdkman.io/' },
        { type: 'image', title: 'nvm (macOS / Linux)', source: 'GitHub', url: 'https://github.com/nvm-sh/nvm' }
      ]} />
    </LessonPage>
  );
}
