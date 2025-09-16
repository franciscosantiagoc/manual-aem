import React from 'react';
import {
  LessonPage,
  SectionTitle,
  Paragraph,
  List,
  Alert,
  CodeBlock,
  DataTable,
  Figure,
  VideoEmbed,
  ResourceLinks
} from '../../LessonUI';

const txt = { fill: 'var(--text-primary)' };
const sub = { fill: 'var(--text-secondary)' };

// Qué pasa cuando se renderiza un Core Component a través de su proxy
const DiagramaCapas = () => (
  <svg viewBox="0 0 360 470" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="f19-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" style={sub} />
      </marker>
    </defs>
    {[
      { y: 8, color: 'var(--primary)', t: 'Nodo en la página', d1: 'sling:resourceType = practica/components/title', d2: 'jcr:title = "Nuestros cursos" (datos del autor)' },
      { y: 92, color: 'var(--accent-purple)', t: 'Proxy del proyecto', d1: '/apps/practica/components/title', d2: 'solo apunta a core/wcm/components/title/v3/title' },
      { y: 176, color: 'var(--accent-cyan)', t: 'Core Component (HTL)', d1: 'title.html usa data-sly-use del modelo Title', d2: 'marcado BEM: cmp-title, cmp-title__text' }
    ].map((b) => (
      <g key={b.t}>
        <rect x="10" y={b.y} width="340" height="66" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: b.color, strokeWidth: 1.6 }} />
        <text x="24" y={b.y + 22} fontSize="13" fontWeight="700" style={txt}>{b.t}</text>
        <text x="24" y={b.y + 40} fontSize="10" fontFamily="var(--font-mono)" style={sub}>{b.d1}</text>
        <text x="24" y={b.y + 56} fontSize="10" style={sub}>{b.d2}</text>
        <line x1="180" y1={b.y + 66} x2="180" y2={b.y + 86} markerEnd="url(#f19-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.4 }} />
      </g>
    ))}
    <rect x="10" y="260" width="200" height="82" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--color-success)', strokeWidth: 1.6 }} />
    <text x="24" y="282" fontSize="13" fontWeight="700" style={txt}>Sling Model Title</text>
    <text x="24" y="300" fontSize="10" style={sub}>lee las propiedades del nodo</text>
    <text x="24" y="315" fontSize="10" style={sub}>y las completa con la política</text>
    <text x="24" y="330" fontSize="10" style={sub}>(tipo por defecto, enlaces...)</text>
    <rect x="222" y="260" width="128" height="82" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--color-warning)', strokeWidth: 1.6, strokeDasharray: '5 4' }} />
    <text x="236" y="282" fontSize="13" fontWeight="700" style={txt}>Política</text>
    <text x="236" y="300" fontSize="10" style={sub}>/conf/practica/…</text>
    <text x="236" y="315" fontSize="10" style={sub}>type = h2</text>
    <text x="236" y="330" fontSize="10" style={sub}>allowedTypes</text>
    <line x1="222" y1="301" x2="212" y2="301" markerEnd="url(#f19-arrow)" style={{ stroke: 'var(--color-warning)', strokeWidth: 1.4 }} />
    <line x1="110" y1="342" x2="90" y2="372" markerEnd="url(#f19-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.4 }} />
    <line x1="110" y1="342" x2="270" y2="372" markerEnd="url(#f19-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.4 }} />
    <rect x="10" y="376" width="160" height="84" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' }} />
    <text x="24" y="398" fontSize="12.5" fontWeight="700" style={txt}>.html</text>
    <text x="24" y="416" fontSize="10" fontFamily="var(--font-mono)" style={sub}>{'<h2 class="cmp-title__'}</text>
    <text x="24" y="430" fontSize="10" fontFamily="var(--font-mono)" style={sub}>{'text">…</h2>'}</text>
    <text x="24" y="448" fontSize="10" style={sub}>+ data layer en atributo</text>
    <rect x="190" y="376" width="160" height="84" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' }} />
    <text x="204" y="398" fontSize="12.5" fontWeight="700" style={txt}>.model.json</text>
    <text x="204" y="416" fontSize="10" fontFamily="var(--font-mono)" style={sub}>{'{"type":"h2",'}</text>
    <text x="204" y="430" fontSize="10" fontFamily="var(--font-mono)" style={sub}>{'"text":"…"}'}</text>
    <text x="204" y="448" fontSize="10" style={sub}>el mismo modelo en JSON</text>
  </svg>
);

// Dónde se conectan plantilla, mapeo y política
const DiagramaPoliticas = () => (
  <svg viewBox="0 0 360 330" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="f19-arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" style={sub} />
      </marker>
    </defs>
    <text x="10" y="18" fontSize="11" fontWeight="700" style={sub}>/conf/practica/settings/wcm/</text>
    <rect x="10" y="28" width="340" height="120" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--accent-purple)', strokeWidth: 1.6 }} />
    <text x="24" y="50" fontSize="12.5" fontWeight="700" style={txt}>templates/page-content/policies</text>
    <text x="24" y="70" fontSize="10" fontFamily="var(--font-mono)" style={sub}>root/container/container (mapping)</text>
    <text x="24" y="86" fontSize="10" fontFamily="var(--font-mono)" style={sub}>  cq:policy → container/policy_1574695586800</text>
    <text x="24" y="104" fontSize="10" fontFamily="var(--font-mono)" style={sub}>  practica/components/title (mapping)</text>
    <text x="24" y="120" fontSize="10" fontFamily="var(--font-mono)" style={{ fill: 'var(--accent-cyan)' }}>    cq:policy → title/policy_641528232375303</text>
    <text x="24" y="138" fontSize="10" style={sub}>«dentro de este contenedor, los Title usan…»</text>
    <line x1="180" y1="148" x2="180" y2="176" markerEnd="url(#f19-arrow2)" style={{ stroke: 'var(--accent-cyan)', strokeWidth: 1.8 }} />
    <rect x="10" y="180" width="340" height="140" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--accent-cyan)', strokeWidth: 1.6 }} />
    <text x="24" y="202" fontSize="12.5" fontWeight="700" style={txt}>policies/practica/components/title</text>
    <text x="24" y="222" fontSize="10" fontFamily="var(--font-mono)" style={sub}>policy_641475696923109  «Page Title»</text>
    <text x="36" y="238" fontSize="10" fontFamily="var(--font-mono)" style={sub}>allowedTypes = h1 · linkDisabled = true</text>
    <text x="24" y="262" fontSize="10" fontFamily="var(--font-mono)" style={{ fill: 'var(--accent-cyan)' }}>policy_641528232375303  «Content Title»</text>
    <text x="36" y="278" fontSize="10" fontFamily="var(--font-mono)" style={sub}>allowedTypes = [h2…h6] · type = h2</text>
    <text x="24" y="304" fontSize="10" style={sub}>una política se reutiliza en muchas plantillas</text>
  </svg>
);

const realHtml = `<div data-cmp-data-layer="{&#34;title-c6fe1860ab&#34;:{&#34;@type&#34;:&#34;core-components-examples/components/title&#34;,&#34;dc:title&#34;:&#34;Title&#34;}}"
     id="title-c6fe1860ab" class="cmp-title">
    <h1 class="cmp-title__text">Title</h1>
</div>`;

const realJson = `{
  "id": "title-c6fe1860ab",
  "linkDisabled": false,
  "type": "h1",
  "text": "Title",
  ":type": "core-components-examples/components/title",
  "dataLayer": {
    "title-c6fe1860ab": {
      "@type": "core-components-examples/components/title",
      "dc:title": "Title"
    }
  }
}`;

const pom65 = `<!-- all/pom.xml del proyecto 6.5 (generado por el arquetipo 58) -->
<embedded>
    <groupId>com.adobe.cq</groupId>
    <artifactId>core.wcm.components.content</artifactId>
    <type>zip</type>
    <target>/apps/practica-vendor-packages/application/install</target>
</embedded>
<embedded>
    <groupId>com.adobe.cq</groupId>
    <artifactId>core.wcm.components.core</artifactId>
    <target>/apps/practica-vendor-packages/application/install</target>
</embedded>
<embedded>
    <groupId>com.adobe.cq</groupId>
    <artifactId>core.wcm.components.config</artifactId>
    <type>zip</type>
    <target>/apps/practica-vendor-packages/application/install</target>
</embedded>`;

const pomVersion = `<!-- pom.xml raíz (Cloud y 6.5) -->
<core.wcm.components.version>2.28.0</core.wcm.components.version>`;

const coreGroup = `<!-- /apps/core/wcm/components/button/v2/button/.content.xml (Core Components 2.28.0) -->
<jcr:root ...
    cq:icon="button"
    jcr:description="Button"
    jcr:primaryType="cq:Component"
    jcr:title="Button (v2)"
    componentGroup=".core-wcm"/>`;

const containerPolicy = `<!-- conf/practica/settings/wcm/policies/.content.xml (fragmento real) -->
<container jcr:primaryType="nt:unstructured">
    <policy_1574695586800
        jcr:title="Page Content"
        ...
        components="[group:Sitio de Practica - Content,/apps/practica/components/form/container]">`;

const titlePolicies = `<title jcr:primaryType="nt:unstructured">
    <policy_641475696923109
        jcr:title="Page Title"
        jcr:description="Allows only H1 and disallows links for the main page title."
        sling:resourceType="wcm/core/components/policy/policy"
        allowedTypes="h1"
        linkDisabled="true"
        type="h1">
        <jcr:content jcr:primaryType="nt:unstructured"/>
    </policy_641475696923109>
    <policy_641528232375303
        jcr:title="Content Title"
        jcr:description="Allows all sizes, but not H1, which is reserved for the main page title."
        sling:resourceType="wcm/core/components/policy/policy"
        allowedTypes="[h2,h3,h4,h5,h6]"
        linkDisabled="false"
        type="h2">
        <jcr:content jcr:primaryType="nt:unstructured"/>
    </policy_641528232375303>
</title>`;

const imagePolicy = `<policy_651483963895698
    jcr:title="Content Image"
    sling:resourceType="wcm/core/components/policy/policy"
    allowedRenditionWidths="[320,480,600,800,1024,1200,1600]"
    disableLazyLoading="false"
    enableAssetDelivery="true"
    allowUpload="false"
    altValueFromDAM="true"
    jpegQuality="{Long}85"
    ...>`;

const mappingSnippet = `<!-- conf/practica/settings/wcm/templates/page-content/policies/.content.xml (fragmento real) -->
<container
    cq:policy="practica/components/container/policy_1574695586800"
    sling:resourceType="wcm/core/components/policies/mapping">
    <practica jcr:primaryType="nt:unstructured">
        <components jcr:primaryType="nt:unstructured">
            <title
                cq:policy="practica/components/title/policy_641528232375303"
                sling:resourceType="wcm/core/components/policies/mapping"/>
            ...`;

const dataLayerConf = `<!-- ui.content: conf/practica/_sling_configs/.content.xml (generado con datalayer=y) -->
<com.adobe.cq.wcm.core.components.internal.DataLayerConfig
    jcr:primaryType="nt:unstructured"
    enabled="{Boolean}true"/>`;

const dataLayerConsole = `// En la consola del navegador, sobre una página del sitio:
window.adobeDataLayer.getState()
// devuelve un objeto con la página y cada componente (id, @type, dc:title...)`;

const labPolicy = `<!-- conf/practica/settings/wcm/policies/.content.xml: nuevo nodo, antes de <download> -->
<embed jcr:primaryType="nt:unstructured">
    <policy_video_youtube
        jcr:title="Video de YouTube"
        jcr:description="Solo videos de YouTube mediante el embeddable de confianza; sin URL libre ni HTML."
        jcr:primaryType="nt:unstructured"
        sling:resourceType="wcm/core/components/policy/policy"
        urlDisabled="{Boolean}true"
        htmlDisabled="{Boolean}true"
        embeddablesDisabled="{Boolean}false"
        allowedEmbeddables="[core/wcm/components/embed/v1/embed/embeddable/youtube]">
        <jcr:content jcr:primaryType="nt:unstructured"/>
    </policy_video_youtube>
</embed>`;

const labMapping = `<!-- templates/page-content/policies/.content.xml: dentro de .../container/container/practica/components -->
<embed
    cq:policy="practica/components/embed/policy_video_youtube"
    jcr:primaryType="nt:unstructured"
    sling:resourceType="wcm/core/components/policies/mapping"/>`;

const labCta = `<!-- apps/practica/components/cta/.content.xml -->
<jcr:root ...
    jcr:primaryType="cq:Component"
    jcr:title="Botón CTA"
    jcr:description="Llamada a la acción: Button de Core Components con valores iniciales"
    sling:resourceSuperType="core/wcm/components/button/v2/button"
    cq:icon="actions"
    componentGroup="Sitio de Practica - Content"/>

<!-- apps/practica/components/cta/_cq_template/.content.xml -->
<jcr:root ...
    jcr:primaryType="nt:unstructured"
    jcr:title="Contáctanos"
    link="/content/practica/us/en"/>`;

const labBuild = `mvn clean install -pl ui.apps,ui.content,all -PautoInstallSinglePackage

[INFO] Processed 17 files in 2152ms
[INFO] BUILD SUCCESS`;

const labJson = `curl -u admin:admin "http://localhost:4502/content/practica/us/en/jcr:content/root/container/container/title.model.json"`;

export default function Chapter19({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-19"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender qué son los Core Components, qué ofrece cada uno además del HTML y cómo llegan a tu instancia en Cloud Service y en 6.5.',
        'Seguir el recorrido completo de un Core Component: proxy, HTL, Sling Model, política y salidas `.html` y `.model.json`.',
        'Habilitar componentes **desde el código**: proxies, grupos permitidos en el contenedor, políticas y su mapeo en la plantilla.',
        'Leer y escribir políticas reales (Title, Image, Container, Embed) en `ui.content`.',
        'Activar y consultar el Adobe Client Data Layer.',
        'Valorar ventajas y desventajas del patrón proxy.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'En [[ch-16]] viste el catálogo de Core Components con sus versiones, cómo crear un proxy y los cuatro niveles de personalización. Aquí profundizamos en **qué ofrece cada Core Component** y en **cómo se configura todo desde el código** del proyecto ([[ch-9]], [[ch-11]]). El laboratorio se compiló en el proyecto Cloud (BUILD SUCCESS); los pasos en AEM no se ejecutaron aquí. Las salidas HTML y JSON de esta página son **reales**: vienen de la Component Library de Adobe, que es una instancia pública de AEM.'}
      </Alert>

      <SectionTitle>¿Qué son los Core Components?</SectionTitle>
      <Paragraph>{'Los **Core Components** son la biblioteca oficial de componentes de AEM Sites: título, texto, imagen, teaser, navegación, formularios, contenedores... Adobe los desarrolla en abierto (GitHub, licencia Apache 2.0), los versiona y publica releases con frecuencia. No son "ejemplos": son la base recomendada para cualquier sitio.'}</Paragraph>
      <DataTable
        caption="Lo que trae cada Core Component, además del HTML"
        headers={['Pieza', 'Para qué sirve', 'Se estudia en']}
        rows={[
          ['**Diálogo de edición**', 'Campos para el autor', '[[ch-21]]'],
          ['**Diálogo de diseño (política)**', 'Opciones que define quien diseña la plantilla: qué se permite y valores por defecto', 'Este tema y [[ch-30]]'],
          ['**Sling Model con interfaz pública**', 'Lógica Java estable (`com.adobe.cq.wcm.core.components.models.*`) que puedes reutilizar o extender', '[[ch-45]]'],
          ['**Exportación JSON**', '`.model.json` con los mismos datos, para headless y SPA', '[[ch-49]]'],
          ['**Marcado BEM**', 'Clases predecibles (`cmp-title__text`) para el CSS', '[[ch-24]]'],
          ['**Style System**', 'Variantes visuales que el autor elige sin código', '[[ch-28]]'],
          ['**Data Layer**', 'Datos de cada componente para analítica', 'Este tema'],
          ['**Accesibilidad e i18n**', 'Marcado accesible y textos de la interfaz traducidos', '—']
        ]}
      />
      <VideoEmbed
        provider="youtube"
        id="OI3Eo4OAWCI"
        title="AEM Core components deep dive | How to extend AEM core components | Proxy Components in AEM"
        source="Tech Forum"
        lang="inglés"
        duration="31:53"
        caption="Video de la comunidad: recorrido por los Core Components, los proxies y cómo extenderlos."
      />

      <SectionTitle>Cómo llegan a tu instancia</SectionTitle>
      <DataTable
        headers={['', 'AEM as a Cloud Service', 'AEM 6.5 / 6.5 LTS']}
        rows={[
          ['¿Dónde están?', 'Incluidos en el producto, bajo `/libs/core/wcm/components`', 'Los instala tu proyecto, bajo `/apps/core/wcm/components`'],
          ['¿Quién los actualiza?', 'Adobe, de forma continua con cada release de AEM', 'Tú, cambiando la versión en el `pom.xml` y desplegando'],
          ['¿Qué hace la versión del POM?', 'Solo sirve para compilar; la API viene en `aem-sdk-api`', 'Decide qué versión se instala'],
          ['Paquetes', 'Ninguno: no se empaquetan', '`core.wcm.components.content`, `.core` y `.config` embebidos en `all`']
        ]}
      />
      <CodeBlock filename="pom.xml" language="xml" code={pomVersion} />
      <CodeBlock filename="all/pom.xml (proyecto 6.5)" language="xml" code={pom65} />
      <Alert type="warning" title="Versiones: proyecto vs. lo más reciente">
        {'El arquetipo 58 fija **2.28.0** (marzo de 2025), pero según la página oficial de versiones la release más reciente es la **2.32.8** (septiembre de 2026), compatible con 6.5.21+ y 6.5 LTS. En Cloud Service no importa: siempre tienes la última. En 6.5, **actualizar es responsabilidad del proyecto**: revisa las notas de cada release y prueba antes de subir la versión.'}
      </Alert>

      <SectionTitle>El recorrido de un Core Component</SectionTitle>
      <Paragraph>{'Cuando se renderiza un Título de tu sitio intervienen cinco piezas. Entenderlas te dice **dónde** cambiar cada cosa:'}</Paragraph>
      <Figure
        alt="Nodo de la página, proxy, HTL del Core Component, Sling Model que combina datos del autor y de la política, y las dos salidas: HTML y model.json"
        caption="El mismo Sling Model alimenta el HTML y el JSON. La política completa lo que el autor no definió."
      >
        <DiagramaCapas />
      </Figure>
      <Paragraph>{'Así se ve la salida real del componente Title en la Component Library de Adobe (una instancia pública de AEM donde el proxy se llama `core-components-examples/components/title`):'}</Paragraph>
      <CodeBlock filename="title.html (salida real)" language="html" code={realHtml} />
      <CodeBlock filename="title.model.json (salida real)" language="json" code={realJson} />
      <List items={[
        '`id` se genera automáticamente (o lo define el autor en el campo ID) y se repite en el HTML y en el JSON.',
        '`type: "h1"` sale del tipo elegido por el autor o, si no eligió, del **tipo por defecto de la política**.',
        '`:type` es el `sling:resourceType` del **proxy**, no el del Core Component: el JSON describe tu componente.',
        '`data-cmp-data-layer` / `dataLayer`: los datos del Data Layer, presentes porque está activado.'
      ]} />

      <SectionTitle>Habilitar componentes desde el código</SectionTitle>
      <Paragraph>{'Que un autor pueda usar un Core Component requiere **tres** cosas, y todas pueden versionarse en Git:'}</Paragraph>
      <List items={[
        '**1. Un proxy en `ui.apps`** con un `componentGroup` visible ([[ch-16]]).',
        '**2. Que la política del contenedor permita ese grupo o ese componente.**',
        '**3. (Opcional) Una política propia del componente**, mapeada en la plantilla, para fijar sus opciones.'
      ]} />
      <Paragraph>{'¿Por qué no usar directamente los de Adobe? Porque están en un grupo **oculto**:'}</Paragraph>
      <CodeBlock filename="Core Components 2.28.0" language="xml" code={coreGroup} />
      <Paragraph>{'**Paso 2: el contenedor.** La política del contenedor tiene la propiedad `components` con los grupos (`group:...`) y rutas permitidas. Es lo que ves como "Componentes permitidos" en el Template Editor ([[ch-30]]):'}</Paragraph>
      <CodeBlock filename="política del contenedor (real)" language="xml" code={containerPolicy} />
      <Alert type="tip" title="Por eso tus componentes aparecen solos">
        {'Todos los componentes de los Temas 16 a 18 usaron `componentGroup="Sitio de Practica - Content"`. Como la política *Page Content* permite ese grupo completo, aparecieron en el editor sin tocar la plantilla. Si creas un grupo nuevo, debes agregarlo aquí.'}
      </Alert>

      <SectionTitle>Políticas: la configuración de diseño</SectionTitle>
      <Paragraph>{'Una **política** (*content policy*) es la configuración de un componente **para una plantilla**: qué opciones tiene el autor y qué valores se usan por defecto. La define quien diseña la plantilla (con el diálogo de diseño del componente) y vale para todas las páginas que usan esa plantilla. Así, el mismo Title puede permitir solo `h1` en la cabecera de la página y `h2`–`h6` en el contenido.'}</Paragraph>
      <Figure
        alt="La plantilla mapea cada componente de un contenedor a una política; la política está en conf/.../policies"
        caption="Dos piezas en /conf: el mapeo (en la plantilla) y la política (compartida)."
      >
        <DiagramaPoliticas />
      </Figure>
      <CodeBlock filename="políticas del Title (reales, generadas por el arquetipo)" language="xml" code={titlePolicies} />
      <CodeBlock filename="mapeo en la plantilla Page Content (real)" language="xml" code={mappingSnippet} />
      <List items={[
        'Las políticas viven en `/conf/<sitio>/settings/wcm/policies/<ruta del resourceType>/<nombre>`.',
        'El mapeo replica la **estructura** de la plantilla y, para cada componente, apunta a una política con `cq:policy` (ruta relativa a `policies`).',
        'Una política se puede reutilizar en varias plantillas: el mapeo solo la referencia.',
        'En HTL accedes a la política con `currentStyle` ([[ch-17]]); en Java, con `ContentPolicyManager` o los modelos de Adobe.'
      ]} />
      <CodeBlock filename="política de la imagen (real)" language="xml" code={imagePolicy} />
      <List items={[
        '`allowedRenditionWidths`: los anchos en los que el navegador puede pedir la imagen según el espacio disponible (imágenes adaptables).',
        '`disableLazyLoading="false"`: la carga diferida está **activa**.',
        '`enableAssetDelivery="true"`: en Cloud Service usa la entrega optimizada de imágenes (Web-Optimized Image Delivery).',
        '`allowUpload="false"`: el autor no puede subir archivos directamente; primero van a Assets.'
      ]} />
      <DataTable
        caption="Propiedades de política útiles (de los README y diálogos de diseño de 2.28.0)"
        headers={['Componente', 'Propiedades', 'Efecto']}
        rows={[
          ['Title v3', '`type`, `allowedTypes`, `linkDisabled`', 'Nivel por defecto, niveles permitidos y si admite enlace'],
          ['Teaser v2', '`titleType`, `allowedHeadingElements`, `actionsDisabled`, `pretitleHidden`, `titleHidden`, `descriptionHidden`', 'Encabezado y qué partes puede usar el autor'],
          ['List v4', '`disableChildren`, `disableStatic`, `disableSearch`, `disableTags`, `showDescription`, `showModificationDate`, `dateFormat`', 'Tipos de lista disponibles y qué se muestra'],
          ['Container v1', '`layout`, `layoutDisabled`, `backgroundImageEnabled`, `backgroundColorEnabled`, `allowedColorSwatches`', 'Diseño simple o responsive y fondos'],
          ['Embed v2', '`urlDisabled`, `htmlDisabled`, `embeddablesDisabled`, `allowedEmbeddables`', 'Qué tipos de contenido externo se permiten'],
          ['Image v3', '`allowedRenditionWidths`, `disableLazyLoading`, `enableAssetDelivery`, `allowUpload`', 'Anchos, carga diferida y origen de las imágenes']
        ]}
      />
      <Alert type="warning" title="Políticas en el código y el modo merge">
        {'El filtro de `ui.content` usa `mode="merge"` para `/conf/practica`: al desplegar, el paquete **agrega los nodos nuevos** pero **no modifica los que ya existen**. Por eso el código sirve para crear políticas y mapeos la primera vez; después, los cambios que hagan en el Template Editor no se pisan (y tus cambios en el XML a una política existente **no** llegarán). El arquetipo todavía usa `merge`, que FileVault marca como obsoleto en favor de `merge_properties`; los modos de importación se vieron en [[ch-10]].'}
      </Alert>
      <VideoEmbed
        provider="adobe"
        id="330991"
        title="Pages Templates - Article Page Template"
        source="Adobe · tutorial WKND"
        lang="inglés"
        caption="Video oficial: el Template Editor con sus tres áreas (estructura, políticas y contenido inicial), donde se ven las políticas que aquí escribimos en XML."
      />

      <SectionTitle>Adobe Client Data Layer</SectionTitle>
      <Paragraph>{'El **Data Layer** es una capa de datos en el navegador (`window.adobeDataLayer`) donde cada Core Component publica su información (tipo, título, enlace...) y sus eventos (clics, cambios de pestaña). Herramientas de analítica como Adobe Analytics o Tags la leen sin depender del HTML. El arquetipo lo activa cuando generas con `datalayer=y`:'}</Paragraph>
      <CodeBlock filename="configuración de contexto (real)" language="xml" code={dataLayerConf} />
      <CodeBlock filename="consola del navegador" language="javascript" code={dataLayerConsole} />
      <List items={[
        'Es una **configuración por contexto** (CA Config) ligada a `/conf/practica`: se puede activar en un sitio y no en otro ([[ch-52]]).',
        'Con el Data Layer activo, cada componente agrega el atributo `data-cmp-data-layer` (lo viste en la salida real del Title).',
        'Tus componentes propios también pueden publicar datos, implementando la interfaz del modelo de Adobe ([[ch-45]]).'
      ]} />

      <SectionTitle>Ventajas y desventajas del patrón proxy</SectionTitle>
      <DataTable
        headers={['Ventajas', 'Desventajas']}
        rows={[
          ['Tu contenido apunta a **tus** tipos: puedes cambiar de versión o reemplazar la implementación sin migrar páginas', 'Un nivel más de indirección: para entender un componente hay que mirar el proxy y el Core Component'],
          ['Correcciones y mejoras de Adobe llegan solas (en Cloud, siempre)', 'Un cambio de Adobe puede alterar el marcado o el comportamiento; hay que probar las actualizaciones'],
          ['Puedes tener **varios proxies** del mismo Core Component con valores, grupos o políticas distintos', 'Más componentes que mantener y documentar'],
          ['Grupos y nombres propios para los autores', 'Personalizaciones profundas (copiar HTL) te alejan de las mejoras futuras'],
          ['Diálogo, modelo, JSON, Data Layer y accesibilidad ya resueltos', 'Si ningún Core Component encaja, forzarlo cuesta más que crear uno propio ([[ch-16]])']
        ]}
      />
      <Paragraph>{'Para cambiar el diálogo de un Core Component sin copiarlo se usa el Sling Resource Merger, como en el laboratorio del Título con subtítulo del [[ch-16]]; los overlays de diálogos se profundizan en [[ch-64]].'}</Paragraph>

      <SectionTitle>Laboratorio · Configurar Core Components desde el código</SectionTitle>
      <Paragraph>{'Objetivo: que en el contenido de las páginas el **Embed** solo acepte videos de YouTube (sin URL libre ni HTML arbitrario, por seguridad), y ofrecer a los autores un **Botón CTA** que ya venga con texto y enlace. Todo con archivos del proyecto.'}</Paragraph>
      <Paragraph>{'**Paso 1 · La política del Embed** en `ui.content/src/main/content/jcr_root/conf/practica/settings/wcm/policies/.content.xml`, como un nodo nuevo antes de `<download>`:'}</Paragraph>
      <CodeBlock filename="policies/.content.xml" language="xml" code={labPolicy} />
      <List items={[
        'El nodo intermedio `embed` corresponde a la ruta del proxy (`practica/components/embed`).',
        '`sling:resourceType="wcm/core/components/policy/policy"` lo identifica como política.',
        '`urlDisabled` y `htmlDisabled` quitan dos de los tres modos del Embed; queda solo el de **embeddables** (contenido de confianza).',
        '`allowedEmbeddables` lista los embeddables permitidos por su tipo de recurso; Core Components trae el de YouTube.'
      ]} />
      <Paragraph>{'**Paso 2 · El mapeo en la plantilla** `templates/page-content/policies/.content.xml`, junto a los demás componentes del contenedor de contenido:'}</Paragraph>
      <CodeBlock filename="templates/page-content/policies/.content.xml" language="xml" code={labMapping} />
      <Paragraph>{'**Paso 3 · Un segundo proxy del Button**, en `ui.apps`, con valores iniciales mediante `cq:template` ([[ch-16]]):'}</Paragraph>
      <CodeBlock filename="components/cta" language="xml" code={labCta} />
      <List items={[
        'Es un proxy más del mismo `button/v2`: el proyecto ya tiene `button`, y ahora también `cta`, con otro nombre, otro ícono y otros valores iniciales.',
        'Las propiedades `jcr:title` y `link` son las que usa el Button v2 (según su README); al insertar el CTA, ya vienen llenas.',
        'Si más adelante quieres estilos distintos para el CTA, le das su propia política con Style System ([[ch-28]]).'
      ]} />
      <Paragraph>{'**Paso 4 · Compilar y desplegar.** En nuestra verificación, los validadores de FileVault y HTL pasaron:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={labBuild} />
      <Alert type="info" title="Advertencias que ya traía el proyecto">
        {'El build muestra advertencias de validación que no vienen del laboratorio (`diff.index` y una entrada huérfana de `practica-vendor-packages`); las genera el arquetipo y no impiden el despliegue.'}
      </Alert>
      <Paragraph>{'**Paso 5 · Probar en AEM.**'}</Paragraph>
      <List items={[
        '**1.** Abre una página del sitio y agrega un **Embed** al contenido: en su diálogo solo aparece la opción de embeddable, con YouTube.',
        '**2.** Abre la plantilla *Page Content* en el Template Editor (Herramientas → Plantillas) y comprueba que el Embed del contenedor tiene la política *Video de YouTube*.',
        '**3.** Agrega un **Botón CTA**: ya muestra "Contáctanos" y enlaza a la página de inicio.',
        '**4.** Consulta el JSON de un Title del contenido (ajusta la ruta a la de tu página):'
      ]} />
      <CodeBlock filename="terminal" language="bash" code={labJson} />
      <Alert type="warning" title="Si el Embed no cambió">
        {'Si la política del Embed ya existía en tu instancia (por ejemplo, porque alguien la creó en el Template Editor), el modo `merge` no la reemplaza. Revisa en CRXDE ([[ch-6]]) qué hay en `/conf/practica/settings/wcm/policies/practica/components/embed`.'}
      </Alert>

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['El componente no aparece en el panel', 'Su grupo no está en `components` de la política del contenedor', 'Agregar el grupo o el componente a la política'],
          ['Aparecen componentes "(v2)", "(v3)"', 'Se permitió el grupo `.core-wcm` o rutas de `/libs`', 'Permitir solo los proxies del proyecto'],
          ['La política del XML no se aplica', 'El nodo ya existía y el filtro es `merge`', 'Ajustarla en el Template Editor o en CRXDE, o cambiar el modo de importación de esa ruta'],
          ['`.model.json` devuelve 404', 'Ruta incorrecta o falta la extensión', 'Copiar la ruta del nodo desde CRXDE y agregar `.model.json`'],
          ['En 6.5 un componente se comporta distinto que en Cloud', 'Versiones de Core Components diferentes', 'Comparar `core.wcm.components.version` con la release de Cloud']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Aplica el laboratorio y prueba los cuatro pasos en AEM.',
        '**2.** Crea una política para el **Teaser** que permita solo `h3` y `h4`, con `h3` por defecto, y mapéala en *Page Content*.',
        '**3.** Crea un proxy **Lista de noticias** de `list/v4/list` y una política que solo permita listas de hijos con fecha visible.',
        '**4.** Abre la consola del navegador en una página y ejecuta `window.adobeDataLayer.getState()`: identifica tu Title y tu CTA.',
        '**5.** Compara el `.model.json` de tu Title con la salida real de la Component Library.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'El build sigue en BUILD SUCCESS; en CRXDE existen las políticas nuevas y sus mapeos; el diálogo del Teaser solo ofrece H3 y H4; y el JSON del Title muestra `:type` con el tipo de tu proxy.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'Los Core Components son la biblioteca oficial y versionada de AEM: además del HTML traen diálogos, política, Sling Model, JSON, BEM, Style System y Data Layer.',
        'En Cloud Service vienen en `/libs` y se actualizan solos; en 6.5 los instala y actualiza tu proyecto.',
        'Habilitarlos desde el código es crear el proxy, permitir su grupo en el contenedor y, si hace falta, darle una política mapeada en la plantilla.',
        'Las políticas viven en `/conf/.../policies` y se asignan con `cq:policy` en el mapeo de la plantilla; con `mode="merge"`, el código solo crea lo que no existe.',
        'El patrón proxy protege tu contenido y permite varios proxies del mismo Core Component, a cambio de una capa más de indirección.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Core Components', 'Biblioteca oficial de componentes de AEM Sites, de código abierto'],
          ['Política (content policy)', 'Configuración de un componente para una plantilla'],
          ['Mapeo de políticas', 'Nodos de la plantilla que asignan una política a cada componente con `cq:policy`'],
          ['Diálogo de diseño', 'Diálogo con el que se edita una política'],
          ['Embeddable', 'Contenido externo de confianza que el Embed puede insertar (por ejemplo, YouTube)'],
          ['Adobe Client Data Layer', 'Capa de datos en el navegador con la información de la página y sus componentes'],
          ['`.core-wcm`', 'Grupo oculto donde están los Core Components originales']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'AEM Component Library: todos los Core Components en vivo, con HTML y JSON', source: 'aemcomponents.dev · Adobe', url: 'https://www.aemcomponents.dev/' },
        { type: 'doc', title: 'Core Components Versions (compatibilidad y releases)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/versions' },
        { type: 'doc', title: 'Customizing Core Components', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/developing/customizing' },
        { type: 'doc', title: 'Using the Adobe Client Data Layer with the Core Components', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/developing/data-layer/overview' },
        { type: 'doc', title: 'Embed Component', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/wcm-components/embed' },
        { type: 'code', title: 'Releases de Core Components', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-core-wcm-components/releases' },
        { type: 'video', title: 'Future of AEM Core Components (adaptTo())', source: 'YouTube · adaptTo() Conference', url: 'https://www.youtube.com/watch?v=2IOJ7gxv0Vw' },
        { type: 'video', title: 'Create Proxy Components referring Core Components', source: 'YouTube · AEM Tutorials', url: 'https://www.youtube.com/watch?v=4LAEF_MnHE8' }
      ]} />
    </LessonPage>
  );
}
