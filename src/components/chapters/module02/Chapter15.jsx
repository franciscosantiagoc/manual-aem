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

const profilesCmds = `# Todo el proyecto, en Author y en Publish
mvn clean install -PautoInstallSinglePackage
mvn clean install -PautoInstallSinglePackagePublish

# Solo el bundle Java (core) en Author
mvn clean install -pl core -PautoInstallBundle

# El paquete de un módulo concreto (ui.apps, ui.config, ui.content) en Author o Publish
mvn clean install -pl ui.apps -PautoInstallPackage
mvn clean install -pl ui.apps -PautoInstallPackagePublish`;

const flagsCmds = `# Excluir módulos (prueba de integración y de interfaz)
mvn install "-pl=!it.tests,!ui.tests"

# Construir un módulo y también los módulos de los que depende
mvn install -pl ui.apps -am

# Saltar las pruebas unitarias (solo de forma puntual)
mvn install -DskipTests

# Trabajar sin conexión, usando solo lo que ya está en ~/.m2
mvn -o install

# Saltar npm y la instalación de Node en ui.frontend (frontend-maven-plugin)
mvn install -Dskip.npm -Dskip.installnodenpm

# Cambiar destino o credenciales sin tocar el pom.xml
mvn install -PautoInstallSinglePackage -Daem.port=4502 -Dvault.password=miClave`;

const timingScript = `#!/usr/bin/env bash
# medir-builds.sh: compara el tiempo de cada estrategia (sin desplegar)
t() {
  local inicio=$(date +%s)
  "$@" > /tmp/build.log 2>&1
  local fin=$(date +%s)
  echo "$((fin - inicio)) s :: $(grep -E 'BUILD (SUCCESS|FAILURE)' /tmp/build.log) :: $*"
}

t mvn -B -o install -pl core -DskipTests
t mvn -B -o install -pl ui.apps
t mvn -B -o install -pl ui.frontend,ui.apps
t mvn -B -o install "-pl=!it.tests,!ui.tests"
t mvn -B -o install -Dskip.npm -Dskip.installnodenpm "-pl=!it.tests,!ui.tests"`;

const repoCmds = `# Instalación (macOS con Homebrew)
brew tap adobe-marketing-cloud/brews
brew install adobe-marketing-cloud/brews/repo

# Dentro de ui.apps/src/main/content/jcr_root/apps/practica
repo status                 # qué archivos cambiaron respecto a AEM
repo diff components/servicecard
repo put components/servicecard   # enviar a AEM (sobrescribe la carpeta completa)
repo get components/servicecard   # traer de AEM (sobrescribe tu copia local)`;

const repoConfig = `# Archivo .repo en la carpeta de trabajo (o usa -s y -u en cada comando)
server=http://localhost:4502
credentials=admin:admin`;

const commitExamples = `feat: add service card component with dialog and sling model
fix: resolve empty link when page path is external
refactor: extract link mapping into a reusable service
test: cover service card model with aem mocks
docs: explain local deployment profiles in readme
chore: update aem analyser plugin to 1.7.6
style: align scss of service card with bem naming`;

const branches = `main          ← lo que está en producción
develop       ← integración del trabajo terminado
feature/servicecard-etiqueta   ← una funcionalidad
release/1.4.0                  ← preparación de una versión
hotfix/enlace-vacio            ← corrección urgente sobre main`;

export default function Chapter15({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-15"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Elegir la forma más rápida de desplegar según el tipo de cambio (Java, HTL, diálogo, CSS, configuración, contenido).',
        'Dominar los perfiles de Maven del proyecto y las opciones que acortan el build.',
        'Sincronizar archivos en caliente con **VSCode AEM Sync** o **repo**, entendiendo por qué evitamos **aemsync**.',
        'Organizar el trabajo con ramas y **Conventional Commits**.',
        'Medir en tu equipo cuánto tarda cada estrategia.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas un proyecto generado y funcionando en tu AEM local ([[ch-11]] o [[ch-12]]) y VS Code con VSCode AEM Sync ([[ch-3]]). Los tiempos de este tema se **midieron** sobre el proyecto Cloud del [[ch-12]] con el componente de los laboratorios (sin desplegar, en modo sin conexión).'}
      </Alert>

      <SectionTitle>El ciclo editar → desplegar → probar</SectionTitle>
      <Paragraph>{'Un desarrollador AEM repite este ciclo decenas de veces al día. Si cada cambio de una línea de CSS requiere un build completo de 4 minutos, pierdes horas. La clave es saber **qué parte del proyecto afecta cada cambio** y desplegar solo esa parte.'}</Paragraph>
      <FlowDiagram
        caption="El ciclo diario"
        steps={[
          { title: 'Editar', detail: 'Java, HTL, XML, SCSS...', tone: 'purple' },
          { title: 'Construir lo mínimo', detail: 'Solo el módulo afectado', tone: 'primary' },
          { title: 'Enviar a AEM', detail: 'Perfil de Maven o sincronización', tone: 'cyan' },
          { title: 'Probar', detail: 'Editor, Preview, logs', tone: 'success' },
          { title: 'Commit', detail: 'Cuando funciona', tone: 'warning' }
        ]}
      />

      <SectionTitle>Los perfiles de Maven del proyecto</SectionTitle>
      <Paragraph>{'El proyecto generado por el archetype trae estos perfiles (los tres primeros en el POM raíz, los dos últimos en `all/pom.xml`):'}</Paragraph>
      <DataTable
        headers={['Perfil', 'Qué instala', 'Dónde', 'Úsalo cuando']}
        rows={[
          ['`autoInstallBundle`', 'El bundle Java del módulo', 'Consola OSGi de Author', 'Cambias solo Java en `core`'],
          ['`autoInstallPackage`', 'El paquete del módulo', 'Package Manager de Author', 'Cambias un módulo de contenido o código (`ui.apps`, `ui.config`, `ui.content`)'],
          ['`autoInstallPackagePublish`', 'El paquete del módulo', 'Package Manager de Publish', 'Igual, en Publish'],
          ['`autoInstallSinglePackage`', 'El paquete `all` completo', 'Author', 'Primer despliegue o cambios en varios módulos'],
          ['`autoInstallSinglePackagePublish`', 'El paquete `all` completo', 'Publish', 'Igual, en Publish']
        ]}
      />
      <CodeBlock filename="terminal" language="bash" code={profilesCmds} />
      <List items={[
        '`-pl` (project list) limita el build a los módulos indicados.',
        'El destino y las credenciales salen de las propiedades del POM raíz (`aem.host`, `aem.port`, `aem.publish.port`, `vault.user`, `vault.password`...), que viste en [[ch-9]].',
        'Si Author no está corriendo, el build termina con un error de conexión al intentar instalar: no pasa nada grave, arranca AEM y repite.'
      ]} />

      <SectionTitle>Opciones que acortan el build</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={flagsCmds} />
      <List items={[
        '`"-pl=!it.tests,!ui.tests"`: el `!` excluye módulos. Las pruebas de integración y de interfaz no se despliegan y consumen mucho tiempo. Las comillas evitan que la terminal interprete el `!`.',
        '`-am` (also make) construye además los módulos de los que depende el indicado. Útil si el repositorio local de Maven no tiene todavía sus artefactos.',
        '`-DskipTests` salta las pruebas unitarias. Úsalo solo de forma puntual: las pruebas son tu red de seguridad y Cloud Manager las ejecuta igual.',
        '`-o` (offline) no consulta repositorios remotos: más rápido y útil sin internet, siempre que ya hayas compilado una vez.',
        '`-Dskip.npm -Dskip.installnodenpm` son propiedades del `frontend-maven-plugin` que saltan npm y la instalación de Node en `ui.frontend`. **Cuidado**: `ui.apps` empaquetará las clientlibs que ya estaban generadas; si cambiaste CSS o JS, estarán desactualizadas.',
        '`-Dpropiedad=valor` sobrescribe cualquier propiedad del POM sin editarlo, por ejemplo el puerto o la contraseña.'
      ]} />

      <SectionTitle>Tiempos medidos</SectionTitle>
      <DataTable
        caption="Proyecto Cloud con el componente de los laboratorios, sin desplegar, en modo offline (equipo de referencia)"
        headers={['Comando', 'Tiempo']}
        rows={[
          ['`mvn clean install` (todo, con pruebas de integración e interfaz)', '~260 s (4:20)'],
          ['`mvn install "-pl=!it.tests,!ui.tests"`', '148 s'],
          ['El anterior + `-Dskip.npm -Dskip.installnodenpm`', '**65 s**'],
          ['`mvn install -pl ui.frontend,ui.apps`', '109 s'],
          ['`mvn install -pl ui.apps,all` (incluye el AEM Analyser)', '69 s'],
          ['`mvn install -pl core` (con pruebas)', '24 s'],
          ['`mvn install -pl core -DskipTests`', '19 s'],
          ['`mvn install -pl ui.apps`', '**16 s**']
        ]}
      />
      <Paragraph>{'La diferencia entre el peor y el mejor caso es de **más de 15 veces**. Y la sincronización en caliente (siguiente sección) baja a **segundos**, sin Maven. Mide en tu equipo con este script:'}</Paragraph>
      <CodeBlock filename="medir-builds.sh" language="bash" code={timingScript} />
      <List items={[
        '`t()` ejecuta el comando que recibe, guarda la salida en un log y calcula los segundos con `date +%s` (segundos desde 1970) antes y después.',
        '`grep -E \'BUILD (SUCCESS|FAILURE)\'` extrae el resultado del build.',
        'Ejecútalo en Git Bash, macOS o Linux desde la raíz del proyecto, después de un primer `mvn clean install` completo (para que `-o` funcione).'
      ]} />

      <SectionTitle>Sincronización en caliente</SectionTitle>
      <Paragraph>{'Para cambios en archivos que viven en el repositorio **tal cual** (HTL, diálogos, `.content.xml`, archivos de clientlibs) no hace falta Maven: basta con copiar el archivo a AEM. Tres herramientas lo hacen:'}</Paragraph>
      <DataTable
        headers={['Herramienta', 'Cómo funciona', 'Recomendación']}
        rows={[
          ['**VSCode AEM Sync** (`yamato-ltd.vscode-aem-sync`)', 'Exporta o importa archivos y carpetas desde el explorador de VS Code; con `autopush` envía al guardar', '**Recomendada**: controlas cada envío ([[ch-3]])'],
          ['**repo** (Adobe)', 'Línea de comandos tipo FTP: `put`, `get`, `status`, `diff`', 'Buena alternativa desde la terminal'],
          ['**aemsync** (npm)', 'Vigila carpetas y envía cambios automáticamente', '**Evitar**: tiende a corromper la instancia local']
        ]}
      />
      <Paragraph>{'**Flujo con VSCode AEM Sync:**'}</Paragraph>
      <List items={[
        '**HTL, diálogos y `.content.xml`**: edita en `ui.apps/src/main/content/jcr_root/...`, guarda y usa clic derecho → exportar a AEM (o `autopush`). Recarga la página: el cambio es inmediato.',
        '**CSS y JS de `ui.frontend`**: ejecuta `npm run dev` en `ui.frontend` (compila y regenera las clientlibs dentro de `ui.apps`) y luego exporta la carpeta de la clientlib (`clientlibs/clientlib-site`) con VSCode AEM Sync.',
        'Si no ves el cambio, puede ser caché de la clientlib: prueba con `?debugClientLibs=true` o recarga forzada.'
      ]} />
      <Paragraph>{'**repo** es una herramienta de Adobe que funciona como un FTP para contenido FileVault:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={repoCmds} />
      <CodeBlock filename=".repo" language="text" code={repoConfig} />
      <List items={[
        'Requiere Bash y las utilidades `zip`, `unzip`, `curl`, `rsync` y `mktemp`: funciona en macOS y Linux; en Windows, con Cygwin o dentro de WSL.',
        '`repo put` **sobrescribe por completo** el archivo o carpeta indicados en AEM; `repo get`, tu copia local. Revisa antes con `repo status` y `repo diff`.',
        'Puedes excluir archivos con `.repoignore` o `.vltignore` en `jcr_root`.'
      ]} />
      <Alert type="warning" title="aemsync también viene en los proyectos generados">
        {'El `package.json` de `ui.frontend` que genera el archetype incluye scripts con aemsync (`sync`, `aemsyncro`, `watch` en la variante HTL; `sync` en React y Angular). Envía ráfagas de cambios automáticamente y, en la práctica, puede dejar la instancia local inconsistente. Prefiere `npm run dev` + VSCode AEM Sync, y guarda snapshots de tu instancia ([[ch-4]]).'}
      </Alert>

      <SectionTitle>¿Qué método uso para cada cambio?</SectionTitle>
      <DataTable
        headers={['Cambiaste...', 'Método más rápido', 'Por qué']}
        rows={[
          ['HTL, diálogo o `.content.xml` en `ui.apps`', 'VSCode AEM Sync (segundos) o `-pl ui.apps -PautoInstallPackage` (~16 s + instalación)', 'Son archivos del repositorio, no hay que compilar'],
          ['SCSS o JS en `ui.frontend`', '`npm run dev` + VSCode AEM Sync de la clientlib, o `-pl ui.frontend,ui.apps -PautoInstallPackage`', 'Hay que compilar el frontend'],
          ['Java en `core` (modelos, servicios, servlets)', '`-pl core -PautoInstallBundle` (~20 s + instalación)', 'Java siempre necesita compilar y reinstalar el bundle'],
          ['Configuración OSGi en `ui.config`', '`-pl ui.config -PautoInstallPackage`', 'Se aplica al instalar el paquete'],
          ['Contenido inicial en `ui.content`', '`-pl ui.content -PautoInstallPackage`', 'Recuerda que con modo merge no sobrescribe lo existente ([[ch-10]])'],
          ['Varios módulos o antes de subir a Git', '`mvn clean install -PautoInstallSinglePackage`', 'Verifica todo igual que Cloud Manager'],
          ['Probar en la nube (Cloud Service)', 'RDE: `aio aem:rde:install` ([[ch-12]])', 'Sin pasar por el pipeline']
        ]}
      />
      <Alert type="tip" title="Antes de cada commit o pull request">
        {'Aunque durante el día uses atajos, antes de subir cambios ejecuta un `mvn clean install` completo. Es el mismo build que hará Cloud Manager: si falla en tu equipo, fallará en el pipeline.'}
      </Alert>

      <SectionTitle>Git: ramas y Conventional Commits</SectionTitle>
      <Paragraph>{'Un proyecto AEM es un monorepo con código, contenido y configuración: una buena organización en Git evita conflictos y facilita los despliegues. Una estructura de ramas habitual:'}</Paragraph>
      <CodeBlock filename="ramas" language="text" code={branches} />
      <List items={[
        'Cada tarea se hace en una rama `feature/...` creada desde `develop` y se integra con un pull request revisado.',
        'Los pipelines de Cloud Manager se asocian a ramas concretas ([[ch-12]]): por ejemplo, desarrollo desde `develop` y stage/producción desde `main`.',
        'Las correcciones urgentes de producción salen de `main` en una rama `hotfix/...` y se integran también a `develop`.'
      ]} />
      <Paragraph>{'**Conventional Commits** es una convención para los mensajes: `tipo: descripción en imperativo`. Facilita leer el historial y generar notas de versión:'}</Paragraph>
      <DataTable
        headers={['Tipo', 'Para qué']}
        rows={[
          ['`feat`', 'Nueva funcionalidad (un componente, un campo de diálogo)'],
          ['`fix`', 'Corrección de un error'],
          ['`refactor`', 'Cambio de código que no altera el comportamiento'],
          ['`test`', 'Agregar o corregir pruebas'],
          ['`docs`', 'Documentación'],
          ['`style`', 'Formato o estilos sin cambio de lógica'],
          ['`chore` / `build` / `ci`', 'Mantenimiento, dependencias, build y pipelines']
        ]}
      />
      <CodeBlock filename="ejemplos de mensajes" language="text" code={commitExamples} />
      <List items={[
        'Qué **no** versionar: `target/`, `node_modules/`, `node/` y `dist/` ya están en el `.gitignore` del archetype, y las clientlibs que genera `ui.frontend` dentro de `ui.apps` (`clientlib-site`, `clientlib-dependencies`) también se ignoran: se regeneran en cada build.',
        'Nunca subas credenciales: ni en `.vscode/settings.json`, ni en `.repo`, ni en configuraciones OSGi (para eso existen los secretos de Cloud, [[ch-39]]).'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['Desplegué pero no veo el cambio de CSS', 'No se recompiló `ui.frontend` o hay caché de la clientlib', '`npm run dev` o incluir `ui.frontend` en `-pl`; probar con `?debugClientLibs=true`'],
          ['El cambio de Java no se refleja', 'El bundle no se actualizó o quedó en Installed', 'Revisar en `/system/console/bundles` la fecha y el estado del bundle ([[ch-7]])'],
          ['`401 Unauthorized` al instalar', 'Cambiaste la contraseña de admin', 'Pasar `-Dvault.password=...` y `-Dsling.password=...`'],
          ['CSS viejo después de usar `-Dskip.npm`', 'Se empaquetaron clientlibs generadas antes', 'Construir sin `-Dskip.npm` cuando cambias el frontend'],
          ['`repo put` borró archivos en AEM', 'Sobrescribe la carpeta completa', 'Usar `repo status`/`diff` antes y restaurar con un build'],
          ['La instancia local se comporta raro tras días de sincronizar', 'Estado inconsistente (típico con aemsync)', 'Restaurar un snapshot ([[ch-4]]) y redesplegar con Maven']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Ejecuta el script de medición en tu proyecto y compara tus tiempos con la tabla del tema.',
        '**2.** Cambia el texto "Ver más" del HTL de la tarjeta y envíalo solo con VSCode AEM Sync. Mide cuánto tardas desde guardar hasta verlo.',
        '**3.** Cambia el color del borde en `_servicecard.scss`, ejecuta `npm run dev` y exporta la clientlib con VSCode AEM Sync.',
        '**4.** Cambia el Sling Model (por ejemplo, que el enlace externo abra en otra pestaña con una nueva propiedad) y despliega solo `core`.',
        '**5.** Haz un commit por cada cambio en una rama `feature/`, con mensajes de Conventional Commits.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'(2) y (3) deben verse sin ejecutar Maven, en segundos. (4) debe desplegarse con `mvn clean install -pl core -PautoInstallBundle` y aparecer la nueva fecha del bundle en la Web Console. (5) `git log --oneline` debe mostrar mensajes como `feat: ...` o `style: ...`. Antes de integrar la rama, un `mvn clean install` completo debe terminar en BUILD SUCCESS.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'Cada tipo de cambio tiene un camino más corto: sincronización en caliente para archivos del repositorio, `-pl` y el perfil adecuado para lo que hay que compilar.',
        '`autoInstallBundle` instala Java, `autoInstallPackage` un módulo y `autoInstallSinglePackage` todo el proyecto.',
        'Excluir módulos de prueba y saltar npm reduce el build de más de 4 minutos a alrededor de 1, con sus riesgos.',
        'VSCode AEM Sync es la herramienta recomendada; repo es una buena alternativa en la terminal; aemsync conviene evitarlo.',
        'Ramas por tarea y Conventional Commits mantienen el historial legible; antes de subir, siempre un build completo.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['`-pl`', 'Opción de Maven para construir solo ciertos módulos'],
          ['`-am`', 'Construir también los módulos de los que depende'],
          ['Sincronización en caliente', 'Copiar archivos a AEM sin compilar ni desplegar el proyecto'],
          ['repo', 'Herramienta de Adobe tipo FTP para contenido FileVault'],
          ['Conventional Commits', 'Convención `tipo: descripción` para mensajes de commit'],
          ['Pull request', 'Solicitud para integrar una rama, con revisión']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'AEM Project Archetype (perfiles de build)', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' },
        { type: 'image', title: 'repo: FTP-like tool for JCR content', source: 'GitHub · Adobe', url: 'https://github.com/Adobe-Marketing-Cloud/tools/tree/master/repo' },
        { type: 'image', title: 'VSCode AEM Sync', source: 'Visual Studio Marketplace', url: 'https://marketplace.visualstudio.com/items?itemName=yamato-ltd.vscode-aem-sync' },
        { type: 'image', title: 'frontend-maven-plugin (opciones skip)', source: 'GitHub', url: 'https://github.com/eirslett/frontend-maven-plugin' },
        { type: 'image', title: 'Conventional Commits', source: 'conventionalcommits.org', url: 'https://www.conventionalcommits.org/es/v1.0.0/' },
        { type: 'image', title: 'Optimising Frontend Development: ui.frontend Module', source: 'Medium · Jaivyas', url: 'https://medium.com/@jaivyas80/optimising-frontend-development-ui-frontend-module-b9248300f747' }
      ]} />
    </LessonPage>
  );
}
