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
  ScreenSketch,
  ResourceLinks
} from '../../LessonUI';

const deepLinks = `# Abrir CRXDE Lite en la raíz
http://localhost:4502/crx/de/index.jsp

# Abrir CRXDE Lite directamente en una ruta (todo lo que va después de #)
http://localhost:4502/crx/de/index.jsp#/content/practica
http://localhost:4502/crx/de/index.jsp#/apps`;

const labNodeJson = `{
  "jcr:primaryType": "nt:unstructured",
  "titulo": "Hola CRXDE",
  "activo": true,
  "cantidad": 42,
  "precio": 19.99,
  "etiquetas": ["aem", "jcr", "crxde"],
  "publicadoEl": "Sat Sep 26 2026 12:00:00 GMT-0600"
}`;

const sqlQuery = `SELECT * FROM [cq:Page] AS pagina
WHERE ISDESCENDANTNODE(pagina, '/content/practica')`;

const sqlQuery2 = `SELECT * FROM [nt:unstructured] AS nodo
WHERE ISDESCENDANTNODE(nodo, '/content/practica')
  AND nodo.[sling:resourceType] LIKE '%/text'`;

const zipTree = `practica-contenido-1.0.zip
├── META-INF/
│   └── vault/
│       ├── filter.xml        ← qué rutas incluye el paquete
│       ├── properties.xml    ← nombre, grupo, versión, descripción
│       └── definition/       ← definición editable del paquete
└── jcr_root/                 ← el contenido, con la misma estructura que el repositorio
    └── content/
        ├── practica/
        │   └── ...
        └── laboratorio/
            ├── .content.xml
            └── demo/
                └── .content.xml`;

const inspectZip = `# macOS / Linux: listar el contenido sin descomprimir
unzip -l practica-contenido-1.0.zip

# Ver el filter.xml
unzip -p practica-contenido-1.0.zip META-INF/vault/filter.xml

# Windows (PowerShell): descomprimir en una carpeta y listar
Expand-Archive practica-contenido-1.0.zip -DestinationPath .\\paquete
Get-ChildItem -Recurse .\\paquete | Select-Object FullName
Get-Content .\\paquete\\META-INF\\vault\\filter.xml`;

const filterXml = `<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
    <filter root="/content/practica"/>
    <filter root="/content/laboratorio">
        <exclude pattern="/content/laboratorio/temporal(/.*)?"/>
    </filter>
</workspaceFilter>`;

const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
    xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    titulo="Hola CRXDE"
    activo="{Boolean}true"
    cantidad="{Long}42"
    precio="{Double}19.99"
    etiquetas="[aem,jcr,crxde]"
    publicadoEl="{Date}2026-09-26T12:00:00.000-06:00"/>`;

const styleIds = `Nodo del componente (lo que eligió el autor)
/content/practica/es/servicios/jcr:content/root/container/teaser
  cq:styleIds = ["1695420379201"]            (String[])

Nodo de la política (qué significa ese id)
/conf/practica/settings/wcm/policies/practica/components/teaser/policy_123
  cq:styleGroups/item0/cq:styles/item0/cq:styleId      = "1695420379201"
  cq:styleGroups/item0/cq:styles/item0/cq:styleClasses = "cmp-teaser--destacado"`;

export default function Chapter06({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-6"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender el modelo del JCR: nodos, propiedades, tipos de nodo y tipos de propiedad.',
        'Usar **CRXDE Lite** para navegar, inspeccionar, crear y modificar nodos, y para ejecutar consultas.',
        'Saber dónde vive cada cosa en el repositorio: páginas, componentes, assets, plantillas, usuarios.',
        'Usar **Package Manager** para crear, construir, descargar, subir, instalar y desinstalar paquetes de contenido.',
        'Entender qué hay dentro de un paquete (`filter.xml`, `jcr_root`, `.content.xml`) y cómo evitar borrar contenido por accidente.',
        'Conocer qué cambia en AEM as a Cloud Service.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas Author corriendo ([[ch-4]]) y el sitio de práctica del [[ch-5]] (o We.Retail en AEM 6.5). Los ejemplos usan `/content/practica`; sustitúyelo por la ruta de tu sitio.'}
      </Alert>

      <SectionTitle>El JCR en cinco ideas</SectionTitle>
      <Paragraph>{'En el [[ch-2]] vimos que en AEM "todo es un nodo". Antes de abrir CRXDE Lite, conviene entender exactamente qué significa:'}</Paragraph>
      <List items={[
        '**1. Es un árbol.** El repositorio es una jerarquía, como las carpetas de tu disco. Cada elemento tiene una **ruta** única: `/content/practica/es/servicios`.',
        '**2. Los nodos contienen propiedades.** Un nodo es como una carpeta que además tiene "etiquetas" con valores: sus **propiedades** (`jcr:title = "Servicios"`). Los nodos pueden tener nodos hijos y propiedades a la vez.',
        '**3. Cada nodo tiene un tipo.** La propiedad `jcr:primaryType` indica qué es el nodo y qué reglas sigue (por ejemplo `cq:Page` para una página). Algunos nodos suman **mixins** (`jcr:mixinTypes`), que agregan capacidades como el versionado.',
        '**4. Cada propiedad tiene un tipo de dato.** Texto, número, fecha, booleano, ruta... y puede ser de un solo valor o **multivalor** (una lista).',
        '**5. Los prefijos indican el origen.** `jcr:` viene del estándar JCR, `sling:` de Apache Sling, `cq:` de AEM (herencia de CQ5), `dam:` de Assets y `rep:` del repositorio Oak (usuarios, permisos).'
      ]} />
      <DataTable
        caption="Tipos de nodo que verás todos los días"
        headers={['Tipo de nodo', 'Qué representa', 'Dónde lo encuentras']}
        rows={[
          ['`cq:Page`', 'Una página', '`/content/<sitio>/...`'],
          ['`cq:PageContent`', 'El contenido y las propiedades de una página (su nodo `jcr:content`)', 'Debajo de cada `cq:Page`'],
          ['`nt:unstructured`', 'Nodo genérico que acepta cualquier propiedad o hijo. Los componentes en las páginas usan este tipo', 'Dentro de `jcr:content`, configuraciones'],
          ['`sling:Folder` / `sling:OrderedFolder`', 'Carpetas (la segunda conserva el orden de sus hijos)', '`/apps`, `/content`, `/conf`'],
          ['`nt:folder` / `nt:file`', 'Carpeta y archivo "clásicos" (por ejemplo, un `.html` o `.js`)', 'Scripts y archivos en `/apps`'],
          ['`cq:Component`', 'La definición de un componente', '`/apps/<proyecto>/components/...`'],
          ['`dam:Asset`', 'Un asset del DAM (imagen, PDF, video)', '`/content/dam/...`'],
          ['`rep:User` / `rep:Group`', 'Usuarios y grupos', '`/home/users`, `/home/groups`']
        ]}
      />
      <DataTable
        caption="Tipos de propiedad más comunes"
        headers={['Tipo', 'Ejemplo de valor', 'Uso típico']}
        rows={[
          ['String', '`Servicios`', 'Textos, rutas, HTML'],
          ['Boolean', '`true`', 'Casillas de verificación de los diálogos'],
          ['Long', '`42`', 'Números enteros'],
          ['Double / Decimal', '`19.99`', 'Números con decimales'],
          ['Date', '`2026-09-26T12:00:00.000-06:00`', 'Fechas de modificación y publicación'],
          ['Name / Path', '`cq:Page`, `/content/dam/logo.png`', 'Nombres de tipos y rutas'],
          ['Binary', '(datos)', 'Contenido de archivos'],
          ['Multivalor (String[], etc.)', '`["aem", "jcr"]`', 'Listas: tags, ids de estilos']
        ]}
      />

      <SectionTitle>CRXDE Lite: qué es y dónde está disponible</SectionTitle>
      <Paragraph>{'**CRXDE Lite** es un explorador y editor web del repositorio incluido en AEM. Permite ver y modificar cualquier nodo y propiedad, crear archivos, revisar permisos y ejecutar consultas. Es la herramienta que más usarás como desarrollador para **inspeccionar**.'}</Paragraph>
      <DataTable
        headers={['Entorno', '¿Hay CRXDE Lite?']}
        rows={[
          ['Tu instancia local (AEM 6.5 o AEM SDK)', '**Sí**, completo'],
          ['AEM 6.5 en servidores del cliente o AMS', 'Sí, aunque normalmente se restringe en producción por seguridad'],
          ['AEM as a Cloud Service (dev, stage, prod)', '**No**. Para inspeccionar el repositorio se usa el navegador de repositorio de la **Developer Console**, en modo solo lectura']
        ]}
      />
      <CodeBlock filename="URLs de CRXDE Lite" language="text" code={deepLinks} />
      <Paragraph>{'El fragmento después de `#` es la ruta que se abre en el árbol. Guárdalo en tus marcadores: ir directo a una ruta ahorra mucho tiempo.'}</Paragraph>
      <Alert type="tip" title="Atajo con la AEM Chrome Extension">
        {'Con la **AEM Chrome Extension** ([[ch-3]]) no necesitas armar la URL: estando en una página (en el editor o en la vista publicada), pulsa `c` y se abre CRXDE Lite justo en el nodo de esa página. `Shift` + `C` abre CRXDE Lite en la raíz y `Shift` + `P` abre Package Manager.'}
      </Alert>

      <SectionTitle>Anatomía de la pantalla de CRXDE Lite</SectionTitle>
      <ScreenSketch
        title="CRXDE Lite · localhost:4502/crx/de"
        caption="Esquema de las zonas de CRXDE Lite (no es una captura)."
        rows={[
          [{ label: 'Barra de herramientas', detail: '**Save All**, crear nodo/carpeta/archivo, renombrar, copiar, pegar, mover, eliminar, menú **Tools** (Query, Privileges...) y el campo de ruta', tone: 'purple' }],
          [
            { label: 'Árbol del repositorio', detail: 'Navega por los nodos desde `/`. Clic para seleccionar, doble clic en archivos para abrirlos', tone: 'primary', grow: 1 },
            { label: 'Área de edición', detail: 'Muestra el contenido de los archivos abiertos (HTL, JS, CSS, XML) con resaltado de sintaxis', tone: 'cyan', grow: 2 }
          ],
          [{ label: 'Panel inferior', detail: 'Pestañas **Properties** (propiedades del nodo seleccionado), **Access Control** (permisos), **Replication** (estado de publicación en 6.5), **Console** y **Build Info**', tone: 'success' }]
        ]}
      />
      <List items={[
        '**Properties** es la pestaña principal: muestra cada propiedad con su **nombre**, **tipo**, **valor**, si es **protegida** y si es **multivalor**.',
        'Las propiedades protegidas (como `jcr:primaryType`, `jcr:created`) las gestiona el repositorio y no se editan.',
        'Los cambios que haces **no se guardan hasta pulsar Save All**. Mientras tanto, los nodos modificados aparecen marcados en el árbol. Si te equivocas, usa el menú de revertir antes de guardar.'
      ]} />

      <SectionTitle>Mapa del repositorio: dónde vive cada cosa</SectionTitle>
      <DataTable
        headers={['Qué buscas', 'Ruta típica', 'Tipo de nodo']}
        rows={[
          ['Páginas de un sitio', '`/content/<sitio>/<idioma>/...`', '`cq:Page` con su `jcr:content`'],
          ['Componentes dentro de una página', '`.../<pagina>/jcr:content/root/container/...`', '`nt:unstructured`'],
          ['Assets (imágenes, PDFs)', '`/content/dam/<sitio>/...`', '`dam:Asset`; metadatos en `jcr:content/metadata`'],
          ['Content Fragments', '`/content/dam/<sitio>/...`', '`dam:Asset` estructurado'],
          ['Experience Fragments', '`/content/experience-fragments/<sitio>/...`', '`cq:Page`'],
          ['Tags', '`/content/cq:tags/...`', '`cq:Tag`'],
          ['Plantillas editables y políticas', '`/conf/<sitio>/settings/wcm/templates` y `.../policies`', 'Varios'],
          ['Componentes y código del proyecto', '`/apps/<proyecto>/...`', '`cq:Component`, `nt:file`'],
          ['Componentes de Adobe (Core Components y producto)', '`/libs/...` (solo lectura)', 'Varios'],
          ['Usuarios y grupos', '`/home/users`, `/home/groups`', '`rep:User`, `rep:Group`'],
          ['Workflows en ejecución y auditoría', '`/var/workflow`, `/var/audit`', 'Varios']
        ]}
      />

      <SectionTitle>Laboratorio 1 · Inspeccionar tu página</SectionTitle>
      <List items={[
        '**Paso 1.** Abre `http://localhost:4502/crx/de/index.jsp#/content/practica` y despliega el árbol hasta la página **Servicios** que creaste en el [[ch-5]].',
        '**Paso 2.** Selecciona el nodo de la página (`servicios`). En Properties verás `jcr:primaryType = cq:Page` y casi nada más: la página es un contenedor.',
        '**Paso 3.** Despliega y selecciona `jcr:content`. Ahora verás `jcr:title`, `cq:template`, `sling:resourceType`, `cq:lastModified` y las propiedades que llenaste en Page Properties.',
        '**Paso 4.** Baja por `root → container` y selecciona cada componente. Compara sus propiedades con lo que escribiste en los diálogos.',
        '**Paso 5.** En el nodo de la imagen busca `fileReference`: copia su valor, pégalo en el campo de ruta de CRXDE y verás el asset en `/content/dam`.'
      ]} />
      <Alert type="tip" title="Qué acabas de comprobar">
        {'La interfaz de autor es solo una forma cómoda de escribir nodos y propiedades. Todo lo que ve un visitante sale de estos nodos, renderizados por el componente que indica `sling:resourceType`.'}
      </Alert>

      <SectionTitle>Laboratorio 2 · Crear nodos y propiedades</SectionTitle>
      <Paragraph>{'Vamos a crear una zona de práctica separada del sitio, para no dañar páginas reales:'}</Paragraph>
      <List items={[
        '**Paso 1.** En el árbol, haz clic derecho sobre `content` y elige **Create → Create Node** (también está en el menú **Create** de la barra de herramientas).',
        '**Paso 2.** Nombre: `laboratorio`. Tipo: `sling:Folder`. Pulsa **OK**.',
        '**Paso 3.** Haz clic derecho sobre `laboratorio` → **Create → Create Node**. Nombre: `demo`. Tipo: `nt:unstructured`. **OK**.',
        '**Paso 4.** Pulsa **Save All**. Si no guardas, al recargar la página los nodos desaparecen.',
        '**Paso 5.** Con `demo` seleccionado, ve a la pestaña **Properties**. En la fila inferior escribe **Name** `titulo`, **Type** `String`, **Value** `Hola CRXDE` y pulsa **Add**.',
        '**Paso 6.** Agrega también: `activo` (Boolean, `true`), `cantidad` (Long, `42`), `precio` (Double, `19.99`), `publicadoEl` (Date, elige una fecha) y `etiquetas` (String, marcando **Multi**, con los valores `aem`, `jcr`, `crxde`).',
        '**Paso 7.** Pulsa **Save All**.'
      ]} />
      <Paragraph>{'Ahora comprueba el resultado con la vista JSON de Sling que conociste en el tema anterior: abre `http://localhost:4502/content/laboratorio/demo.json`.'}</Paragraph>
      <CodeBlock filename="respuesta de /content/laboratorio/demo.json (ejemplo)" language="json" code={labNodeJson} />
      <List items={[
        'Cada propiedad aparece con su valor y en JSON se nota el tipo: `true` sin comillas es Boolean, `42` es número y `["aem", ...]` es multivalor.',
        'Si `cantidad` aparece como `"42"` (con comillas), la guardaste como String: en el JCR el tipo importa, y un componente que espera un número puede fallar.',
        'Modifica un valor (doble clic sobre él en Properties), guarda y recarga el JSON para ver el cambio.'
      ]} />
      <Alert type="caution" title="CRXDE Lite no tiene red de seguridad">
        {'No hay versiones ni confirmaciones: si borras un nodo y pulsas Save All, se pierde. Por eso: (1) nunca edites en CRXDE Lite contenido que pueda editarse desde la interfaz de autor; (2) nunca toques `/libs`; (3) antes de experimentar con algo importante, crea un paquete de respaldo (lo aprenderás en este mismo tema).'}
      </Alert>

      <SectionTitle>Laboratorio 3 · Consultas desde CRXDE Lite</SectionTitle>
      <Paragraph>{'En **Tools → Query** puedes buscar nodos con consultas. Elige el tipo **JCR-SQL2** y ejecuta:'}</Paragraph>
      <CodeBlock filename="Todas las páginas del sitio de práctica" language="sql" code={sqlQuery} />
      <List items={[
        '`SELECT * FROM [cq:Page]` busca nodos cuyo tipo es `cq:Page`. Los corchetes se usan porque el nombre tiene `:`.',
        '`AS pagina` le da un alias al conjunto de resultados para referirte a él después.',
        '`ISDESCENDANTNODE(pagina, \'/content/practica\')` limita la búsqueda a lo que está **debajo** de esa ruta.'
      ]} />
      <CodeBlock filename="Todos los componentes de texto del sitio" language="sql" code={sqlQuery2} />
      <List items={[
        'Busca nodos genéricos (`nt:unstructured`) debajo del sitio.',
        '`nodo.[sling:resourceType] LIKE \'%/text\'` filtra los que terminan en `/text`: los componentes de texto. `%` significa "cualquier texto".',
        'Consultas como estas son la base de listados, buscadores y migraciones. Rendimiento, índices y QueryBuilder se ven en el Módulo 10.'
      ]} />

      <SectionTitle>Un vistazo real: cómo se guarda un estilo del Style System</SectionTitle>
      <Paragraph>{'Un buen ejemplo de por qué CRXDE Lite es indispensable: cuando un autor elige un estilo con el pincel ([[ch-28]]), AEM no guarda la clase CSS en el componente, guarda un **identificador**. La clase se busca en la **política** de la plantilla:'}</Paragraph>
      <CodeBlock filename="dos nodos relacionados" language="text" code={styleIds} />
      <Paragraph>{'Al renderizar, AEM lee el id del componente en `/content`, busca en la política de `/conf` qué clase CSS le corresponde (`cmp-teaser--destacado`) y la agrega al HTML. Así se puede cambiar el diseño de todo un sitio editando la política, sin tocar cada página.'}</Paragraph>

      <SectionTitle>Package Manager: paquetes de contenido</SectionTitle>
      <Paragraph>{'Un **paquete de contenido** es un archivo `.zip` que contiene una porción del repositorio (nodos, propiedades y archivos) junto con la descripción de qué rutas abarca. Es la forma estándar de **mover contenido entre instancias**: de Author a tu máquina, de un compañero a otro, o de un entorno a otro. El código de tu proyecto también se empaqueta así, como verás al compilar con Maven ([[ch-10]]).'}</Paragraph>
      <Paragraph>{'**Package Manager** es la consola que gestiona estos paquetes: `http://localhost:4502/crx/packmgr` (también desde *Tools → Deployment → Packages*).'}</Paragraph>
      <ScreenSketch
        title="Package Manager · localhost:4502/crx/packmgr"
        caption="Esquema de las zonas de Package Manager (no es una captura)."
        rows={[
          [{ label: 'Barra superior', detail: '**Create Package**, **Upload Package**, búsqueda y filtros', tone: 'purple' }],
          [
            { label: 'Grupos', detail: 'Los paquetes se organizan por **grupo** (por ejemplo `my_packages`)', tone: 'primary', grow: 1 },
            { label: 'Lista de paquetes', detail: 'Nombre, versión, fecha. Al abrir uno: **Edit**, **Build**, **Install**, **Download** y el menú **More** (Rebuild, Uninstall, Delete, Contents, Test Install...)', tone: 'cyan', grow: 3 }
          ],
          [{ label: 'Log de actividad', detail: 'Al construir o instalar, muestra cada nodo agregado (A), modificado (U) o eliminado (D)', tone: 'success' }]
        ]}
      />
      <FlowDiagram
        caption="Ciclo de vida de un paquete"
        steps={[
          { title: 'Create', detail: 'Nombre, grupo y versión', tone: 'purple' },
          { title: 'Edit → Filters', detail: 'Qué rutas incluye', tone: 'primary' },
          { title: 'Build', detail: 'Copia el contenido al zip', tone: 'cyan' },
          { title: 'Download / Upload', detail: 'Mover el zip entre instancias', tone: 'success' },
          { title: 'Install', detail: 'Escribe el contenido en el destino', tone: 'warning' }
        ]}
      />

      <SectionTitle>Laboratorio 4 · Crear y descargar un paquete</SectionTitle>
      <List items={[
        '**Paso 1.** En Package Manager pulsa **Create Package**. Package Name: `practica-contenido`, Version: `1.0`, Group: `laboratorio`. Pulsa **OK**.',
        '**Paso 2.** En el paquete creado pulsa **Edit** y ve a la pestaña **Filters**.',
        '**Paso 3.** Pulsa **Add Filter** y en Root Path escribe `/content/laboratorio`. Pulsa **Done**. Agrega otro filtro con la ruta de tu sitio, por ejemplo `/content/practica`.',
        '**Paso 4.** Pulsa **Save**. Todavía el paquete está vacío: solo tiene la definición.',
        '**Paso 5.** Pulsa **Build** y confirma. El log muestra cada nodo que entró al paquete. Al terminar, el tamaño deja de ser 0.',
        '**Paso 6.** Pulsa **Download**. Obtendrás `practica-contenido-1.0.zip`.'
      ]} />
      <Paragraph>{'Mira qué hay dentro del zip:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={inspectZip} />
      <CodeBlock filename="estructura de un paquete" language="text" code={zipTree} />
      <List items={[
        '`META-INF/vault` guarda la "ficha" del paquete: `filter.xml` define qué rutas abarca y `properties.xml` su nombre, grupo y versión.',
        '`jcr_root` reproduce el árbol del repositorio con carpetas.',
        'Cada nodo se guarda como un archivo `.content.xml` dentro de su carpeta. Este formato (llamado *FileVault*) es el mismo que usa tu proyecto Maven en `ui.apps` y `ui.content`.'
      ]} />
      <CodeBlock filename="META-INF/vault/filter.xml" language="xml" code={filterXml} />
      <List items={[
        'Cada `filter root` es una rama del repositorio que el paquete "controla".',
        '`exclude pattern` (expresión regular) deja fuera partes de esa rama: aquí, la subcarpeta `temporal`. También existe `include`.',
        'Este archivo decide qué se **escribe y qué se borra** al instalar. Lo profundizamos en [[ch-10]].'
      ]} />
      <CodeBlock filename="jcr_root/content/laboratorio/demo/.content.xml" language="xml" code={contentXml} />
      <List items={[
        '`<jcr:root ...>` representa el propio nodo `demo`; los atributos son sus propiedades.',
        '`xmlns:jcr` y `xmlns:nt` declaran los prefijos que se usan en el archivo.',
        'Los Strings se escriben tal cual; los demás tipos llevan una pista entre llaves: `{Boolean}`, `{Long}`, `{Double}`, `{Date}`.',
        'Los multivalor se escriben entre corchetes: `[aem,jcr,crxde]`.'
      ]} />

      <SectionTitle>Laboratorio 5 · Restaurar e instalar un paquete</SectionTitle>
      <List items={[
        '**Paso 1 · Simular un accidente.** En CRXDE Lite borra el nodo `/content/laboratorio/demo` y pulsa **Save All**. Comprueba que `demo.json` ahora da 404.',
        '**Paso 2 · Restaurar.** En Package Manager abre tu paquete y pulsa **Install**. El log muestra los nodos restaurados. Recarga `demo.json`: volvió.',
        '**Paso 3 · Llevarlo a otra instancia.** Abre Package Manager en Publish (`http://localhost:4503/crx/packmgr`, entra como admin), pulsa **Upload Package**, selecciona el zip y después **Install**.',
        '**Paso 4 · Desinstalar.** En Author, abre el paquete y en **More → Uninstall**: AEM vuelve al estado previo a la instalación usando el *snapshot* que guardó al instalar.'
      ]} />
      <Alert type="caution" title="Instalar un paquete puede BORRAR contenido">
        {'Por defecto, al instalar, cada `filter root` se **reemplaza** por lo que trae el paquete: los nodos que existen en la instancia pero no en el paquete **se eliminan**. Si instalas un paquete con filtro `/content/practica` hecho hace un mes, perderás todo lo que los autores crearon desde entonces en esa ruta. Revisa siempre los filtros antes de instalar y, si dudas, usa **More → Test Install**, que simula la instalación sin escribir nada.'}
      </Alert>
      <Alert type="info" title="Instalar en Publish vs. publicar">
        {'Instalar un paquete directamente en Publish sirve para pruebas locales, pero **no es publicar**: se salta el flujo de replicación, los workflows y la invalidación de caché. El contenido debe llegar a Publish publicándolo desde Author ([[ch-5]]).'}
      </Alert>

      <SectionTitle>Opciones importantes de un paquete</SectionTitle>
      <DataTable
        headers={['Opción (Edit)', 'Qué controla', 'Recomendación']}
        rows={[
          ['**Filters**', 'Qué rutas incluye y excluye', 'Lo más específicas posible'],
          ['**Dependencies**', 'Paquetes que deben estar instalados antes', 'Úsalo cuando el contenido depende de otro paquete'],
          ['**Access Control Handling** (Advanced)', 'Qué hacer con los permisos (ACL) que trae el paquete: Ignore, Overwrite, Merge, MergePreserve, Clear', 'Para contenido normal, `Ignore` o `MergePreserve`; nunca `Clear` sin entenderlo'],
          ['**Version**', 'Versión del paquete', 'Súbela cada vez que cambies el contenido del paquete']
        ]}
      />

      <SectionTitle>Diferencias en AEM as a Cloud Service</SectionTitle>
      <DataTable
        headers={['Aspecto', 'AEM 6.5 / local', 'AEM as a Cloud Service']}
        rows={[
          ['CRXDE Lite', 'Disponible', 'Solo en el SDK local; en la nube se inspecciona con la Developer Console (solo lectura)'],
          ['Qué puede instalar Package Manager', 'Contenido y código', '**Solo contenido mutable** (`/content`, `/conf`...). El código (`/apps`, `/libs`) llega **solo** por Cloud Manager'],
          ['Paquetes grandes', 'Limitados por el servidor', 'Adobe recomienda paquetes pequeños (la interfaz puede mostrar "undefined" si la instalación supera 10 minutos) y el **Content Transfer Tool** para mover volúmenes grandes'],
          ['Replicar un paquete a Publish', 'Existe la acción **Replicate**', 'Se publica el contenido desde Author']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Crea en `/content/laboratorio` un nodo `producto` (`nt:unstructured`) con: `nombre` (String), `stock` (Long), `disponible` (Boolean) y `colores` (String multivalor). Verifícalo con `producto.json`.',
        '**2.** Escribe una consulta JCR-SQL2 que devuelva todos los nodos debajo de `/content/laboratorio` que tengan la propiedad `disponible` en `true`.',
        '**3.** Crea el paquete `laboratorio-productos` versión `1.0` con un filtro sobre `/content/laboratorio` que **excluya** el nodo `demo`. Constrúyelo, descárgalo y revisa su `filter.xml` y el `.content.xml` de `producto`.',
        '**4.** Borra `producto`, restaura instalando el paquete y confirma que `demo` **no** fue afectado.'
      ]} />
      <Alert type="tip" title="Solución y criterios de verificación">
        {'Consulta: `SELECT * FROM [nt:unstructured] AS n WHERE ISDESCENDANTNODE(n, \'/content/laboratorio\') AND n.[disponible] = CAST(\'true\' AS BOOLEAN)` (el `CAST` asegura que se compare como booleano y no como texto). Filtro: root `/content/laboratorio` con exclude `/content/laboratorio/demo(/.*)?`. En el `.content.xml` deberías ver `stock="{Long}..."`, `disponible="{Boolean}true"` y `colores="[...]"`. Si al instalar desapareció `demo`, tu exclusión no coincidió con la ruta: revisa la expresión regular y usa **Test Install** antes de volver a instalar.'}
      </Alert>

      <SectionTitle>Errores comunes</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa', 'Solución']}
        rows={[
          ['Los cambios en CRXDE desaparecen al recargar', 'No se pulsó **Save All**', 'Guarda siempre antes de salir'],
          ['El paquete pesa 0 bytes', 'Se guardó la definición pero no se hizo **Build**', 'Pulsa Build después de editar los filtros'],
          ['Al instalar se perdió contenido reciente', 'El filtro reemplazó la rama completa', 'Desinstala (usa el snapshot) y rehaz el paquete con filtros más específicos'],
          ['Un componente falla tras editar una propiedad', 'Se cambió el tipo (por ejemplo Long guardado como String)', 'Corrige el tipo en Properties'],
          ['No se puede guardar en `/libs`', 'Es de solo lectura por diseño', 'Personaliza en `/apps` con overlays o herencia ([[ch-20]])']
        ]}
      />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Usa CRXDE Lite principalmente para **inspeccionar**; los cambios de contenido, desde la interfaz de autor; los cambios de código, desde tu proyecto en Git.',
        'Nunca modifiques `/libs`.',
        'Crea un paquete de respaldo antes de cualquier cambio manual importante.',
        'Filtros específicos y versiones claras en cada paquete; revisa los filtros antes de instalar y usa Test Install si tienes dudas.',
        'No uses paquetes para "publicar": el contenido llega a Publish publicándolo desde Author.'
      ]} />

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'El JCR es un árbol de nodos con propiedades; cada nodo tiene un tipo (`jcr:primaryType`) y cada propiedad un tipo de dato, simple o multivalor.',
        'CRXDE Lite permite navegar, editar, crear nodos y consultar el repositorio; en Cloud Service solo existe en local.',
        'Los cambios en CRXDE Lite no se guardan hasta pulsar Save All y no tienen versiones.',
        'Un paquete es un zip con `META-INF/vault` (filtros y propiedades) y `jcr_root` (el contenido en archivos `.content.xml`).',
        'Instalar un paquete reemplaza por defecto las ramas de sus filtros; Test Install y Uninstall te protegen.',
        'En Cloud Service, Package Manager solo instala contenido mutable; el código va por Cloud Manager.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Nodo', 'Elemento del árbol del repositorio; puede tener propiedades y nodos hijos'],
          ['Propiedad', 'Par nombre-valor guardado en un nodo, con un tipo de dato'],
          ['`jcr:primaryType`', 'Tipo del nodo, que define sus reglas'],
          ['Mixin', 'Tipo adicional que agrega capacidades a un nodo'],
          ['CRXDE Lite', 'Explorador y editor web del repositorio'],
          ['Paquete de contenido', 'Zip con una porción del repositorio y sus filtros'],
          ['`filter.xml`', 'Archivo que define qué rutas controla un paquete'],
          ['FileVault', 'Formato con el que AEM serializa el repositorio en archivos (`.content.xml`)'],
          ['JCR-SQL2', 'Lenguaje de consultas del repositorio']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'CRXDE Lite (AEM as a Cloud Service)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developer-tools/crxde' },
        { type: 'image', title: 'Developing with CRXDE Lite (AEM 6.5)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65/content/implementing/developing/devtools/developing-with-crxde-lite' },
        { type: 'image', title: 'Package Manager (AEM as a Cloud Service)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developer-tools/package-manager' },
        { type: 'image', title: 'Apache Jackrabbit FileVault: filtros', source: 'Apache', url: 'https://jackrabbit.apache.org/filevault/filter.html' },
        { type: 'image', title: 'Especificación JCR-SQL2', source: 'Apache Jackrabbit', url: 'https://jackrabbit.apache.org/oak/docs/query/grammar-sql2.html' }
      ]} />
    </LessonPage>
  );
}
