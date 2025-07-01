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

const pageJson = `{
  "jcr:primaryType": "cq:PageContent",
  "jcr:title": "Sobre nosotros",
  "jcr:description": "Quiénes somos y qué hacemos",
  "sling:resourceType": "practica/components/page",
  "cq:template": "/conf/practica/settings/wcm/templates/page-content",
  "cq:lastModified": "Sat Sep 26 2026 10:42:18 GMT-0600",
  "cq:lastModifiedBy": "admin",
  "root": {
    "jcr:primaryType": "nt:unstructured",
    "sling:resourceType": "practica/components/container",
    "container": {
      "jcr:primaryType": "nt:unstructured",
      "sling:resourceType": "practica/components/container",
      "title": {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "practica/components/title",
        "jcr:title": "Quiénes somos",
        "type": "h1"
      },
      "text": {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "practica/components/text",
        "text": "<p>Somos un equipo que aprende AEM desde cero.</p>",
        "textIsRich": "true"
      }
    }
  }
}`;

const jsonUrls = `# Contenido de la página (3 niveles de profundidad, formateado)
http://localhost:4502/content/practica/es/sobre-nosotros/jcr:content.tidy.3.json

# Toda la página, sin límite de profundidad (úsalo solo en páginas pequeñas)
http://localhost:4502/content/practica/es/sobre-nosotros/jcr:content.infinity.json`;

export default function Chapter05({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-5"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Orientarte en la interfaz de AEM: navegación global, barra superior y consolas.',
        'Dominar la consola **Sites**: vistas, selección, acciones y panel lateral.',
        'Conseguir un sitio de práctica en AEM 6.5 (We.Retail) o en el AEM SDK (Standard Site Template).',
        'Crear páginas, agregar y editar componentes, y usar los modos del editor (Edit, Layout, Preview y otros).',
        'Configurar propiedades de página, versionar y publicar, verificando el resultado en Publish.',
        'Ver lo que hay "detrás" de una página: cómo se guarda en el repositorio, que es lo que programarás como desarrollador.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas Author (4502) y Publish (4503) corriendo en tu equipo ([[ch-4]]). Todo el tema se hace desde el navegador con el usuario `admin`.'}
      </Alert>

      <SectionTitle>¿Por qué un desarrollador debe saber hacer authoring?</SectionTitle>
      <Paragraph>{'**Authoring** es el trabajo de crear y editar contenido desde la interfaz de AEM. Lo hacen los autores (marketing, contenido, legal), no los desarrolladores. Pero todo lo que programes (componentes, diálogos, plantillas) lo usará un autor, y la única forma de probarlo es **hacer authoring tú mismo**. Un componente que funciona en el código pero es confuso de editar es un componente mal hecho.'}</Paragraph>
      <Paragraph>{'Además, muchas tareas de desarrollo empiezan en la interfaz: revisar cómo guardó un autor sus datos, reproducir un error reportado o preparar contenido de prueba. Este tema es tu entrenamiento como autor.'}</Paragraph>

      <SectionTitle>Primer ingreso: la navegación global</SectionTitle>
      <Paragraph>{'Entra a `http://localhost:4502` con `admin`/`admin`. Llegarás a la **navegación global** (`/aem/start.html`): una pantalla con accesos a cada consola. En AEM as a Cloud Service real, esta interfaz aparece además dentro del **Unified Shell** de Adobe (`experience.adobe.com`), con una barra superior común a todos los productos de Adobe; en tu SDK local la verás sin ese marco.'}</Paragraph>
      <DataTable
        caption="Elementos de la barra superior"
        headers={['Elemento', 'Para qué sirve', 'Atajo o detalle']}
        rows={[
          ['Logo / **Adobe Experience Manager**', 'Vuelve a la navegación global desde cualquier consola', 'Clic en el logo'],
          ['**Búsqueda** (Omnisearch)', 'Busca páginas, assets, usuarios, herramientas y más desde un solo lugar', 'Tecla `/` desde una consola'],
          ['**Ayuda** (?)', 'Enlaces a documentación y tutoriales de Adobe', '—'],
          ['**Notificaciones** (campana)', 'Tareas asignadas por workflows, por ejemplo una aprobación de publicación', 'El número indica tareas pendientes'],
          ['**Usuario**', 'Perfil, preferencias (**idioma de la interfaz**), suplantación y cerrar sesión', 'Menú del avatar']
        ]}
      />
      <Alert type="tip" title="¿Interfaz en español?">
        {'En el menú de usuario abre las **preferencias** y cambia el **idioma** de la interfaz. Te recomendamos dejarla en **inglés**: la documentación oficial, los foros y los mensajes de error usan los nombres en inglés (Sites, Tools, Page Properties), y así será más fácil seguirlos. En esta guía usamos los nombres en inglés.'}
      </Alert>

      <Alert type="tip" title="Muévete más rápido con la AEM Chrome Extension">
        {'Si instalaste la **AEM Chrome Extension** ([[ch-3]]), abre su icono estando en cualquier página y usa sus teclas: `e` abre la página en el editor, `p` abre sus Page Properties, `c` la abre en CRXDE Lite y `d` la muestra sin el editor. Con `Shift` + `S` o `Shift` + `A` saltas a las consolas Sites y Assets. La usarás en los laboratorios de este tema.'}
      </Alert>

      <SectionTitle>Mapa de las consolas</SectionTitle>
      <DataTable
        headers={['Consola', 'Qué gestiona', 'Dónde la estudias a fondo']}
        rows={[
          ['**Sites**', 'Páginas de los sitios web (`/content/<sitio>`)', 'Este tema'],
          ['**Assets**', 'Imágenes, videos y documentos del DAM (`/content/dam`)', '[[ch-131]]'],
          ['**Experience Fragments**', 'Grupos de componentes reutilizables entre páginas (header, footer, banners)', '[[ch-33]]'],
          ['**Content Fragments**', 'Contenido estructurado sin diseño, para headless', 'Módulo 13'],
          ['**Forms**', 'Formularios adaptables (si está licenciado)', 'Módulo 20'],
          ['**Projects** / **Screens** / **Commerce**', 'Proyectos de contenido, pantallas digitales y comercio (según licencias)', 'Módulo 20'],
          ['**Tools**', 'Administración: Templates, Tagging, Security (usuarios y permisos), Workflow, Deployment (paquetes), Operations', 'Varios temas: [[ch-30]], [[ch-32]], [[ch-68]], [[ch-6]]']
        ]}
      />
      <Paragraph>{'No todas las consolas aparecen en todas las instalaciones: dependen de la versión y de lo que tu organización tiene licenciado. En el SDK local verás casi todas.'}</Paragraph>

      <SectionTitle>La consola Sites a fondo</SectionTitle>
      <Paragraph>{'Abre **Sites**. Verás la raíz del contenido con los sitios existentes. Cada sitio es un árbol de páginas y cada página puede tener páginas hijas.'}</Paragraph>
      <DataTable
        caption="Las tres vistas de la consola (selector en la esquina superior derecha)"
        headers={['Vista', 'Cómo se ve', 'Cuándo usarla']}
        rows={[
          ['**Column view**', 'Columnas que se abren a la derecha al navegar, como el Finder de macOS', 'Navegar árboles profundos; es la más usada'],
          ['**Card view**', 'Tarjetas con miniatura, título y estado', 'Revisar visualmente pocas páginas'],
          ['**List view**', 'Tabla con columnas (título, nombre, modificado, publicado, plantilla)', 'Comparar fechas y estados de muchas páginas']
        ]}
      />
      <List items={[
        '**Seleccionar vs. abrir:** hacer clic en el título de una página **navega** a sus hijas; hacer clic en la **miniatura** (o marcar su casilla) la **selecciona**. Con una página seleccionada, la barra superior muestra las acciones disponibles.',
        '**Acciones principales:** Create, Edit, Properties, Lock, Copy, Move, Quick Publish, Manage Publication, Delete. Algunas quedan dentro del menú "…" según el ancho de pantalla.',
        '**Botón Create:** crea páginas, sitios desde plantilla, carpetas de Live Copy o de idioma, según el lugar donde estés.',
        '**Panel lateral (rail):** el selector de la izquierda abre **Timeline** (historial, comentarios y versiones), **References** (dónde se usa la página y qué usa ella), **Content Only** (solo el árbol) y **Filter**.',
        '**Estado de publicación:** en la vista de lista y en las tarjetas verás si una página está publicada, si se modificó después de publicarse o si nunca se publicó.'
      ]} />

      <SectionTitle>Laboratorio 1 · Conseguir un sitio para practicar</SectionTitle>
      <Paragraph>{'Necesitas un sitio con plantillas y componentes ya configurados. Elige la ruta según tu instalación:'}</Paragraph>
      <Paragraph>{'**Ruta A · AEM 6.5 con contenido de ejemplo.** Si instalaste 6.5 sin `nosamplecontent`, ya tienes **We.Retail**. En Sites abre *We.Retail → United States → English*. Para practicar sin romper el ejemplo, crea tus páginas debajo de *English*.'}</Paragraph>
      <Paragraph>{'**Ruta B · AEM SDK o Cloud Service.** El SDK no trae sitio de ejemplo, pero Adobe publica una plantilla oficial de sitio (*Standard Site Template*) que se importa desde la interfaz:'}</Paragraph>
      <List items={[
        '**Paso 1.** Descarga el archivo `aem-site-template-standard-<versión>.zip` de la sección *Releases* del repositorio `github.com/adobe/aem-site-template-standard`. No lo descomprimas.',
        '**Paso 2.** En **Sites**, pulsa **Create → Site from template**.',
        '**Paso 3.** En el asistente pulsa **Import**, selecciona el zip y espera a que aparezca la plantilla en la lista. Selecciónala y pulsa **Next**.',
        '**Paso 4.** Escribe **Site title**: `Sitio de Práctica` y **Site name**: `practica`. El nombre será la carpeta en el repositorio: `/content/practica`.',
        '**Paso 5.** Pulsa **Create**. AEM genera el sitio con sus páginas, plantillas y componentes. Ábrelo en la consola y explora su árbol.'
      ]} />
      <Alert type="info" title="Qué acaba de pasar">
        {'La plantilla de sitio instaló de una vez: las páginas iniciales en `/content/practica`, las plantillas de página y políticas en `/conf/practica` y los estilos del tema. Es una forma rápida de tener un sitio listo sin programar; en el Módulo 2 crearás el tuyo desde el código con el Maven Archetype ([[ch-11]], [[ch-12]]).'}
      </Alert>

      <SectionTitle>Laboratorio 2 · Crear una página</SectionTitle>
      <FlowDiagram
        caption="El asistente de creación de páginas"
        steps={[
          { title: '1. Ubicación', detail: 'Selecciona la página padre', tone: 'purple' },
          { title: '2. Create → Page', detail: 'Abre el asistente', tone: 'primary' },
          { title: '3. Plantilla', detail: 'Elige la estructura base', tone: 'cyan' },
          { title: '4. Propiedades', detail: 'Title y Name', tone: 'success' },
          { title: '5. Open', detail: 'Abre el editor', tone: 'warning' }
        ]}
      />
      <List items={[
        '**Paso 1.** Navega hasta la página de idioma de tu sitio (por ejemplo, la página en inglés o español de *Sitio de Práctica*). Esa será la página padre.',
        '**Paso 2.** Pulsa **Create → Page**.',
        '**Paso 3.** Elige una plantilla de contenido (por ejemplo *Page* o *Content Page*). La plantilla define la estructura fija (header, footer) y qué componentes podrás usar ([[ch-30]]).',
        '**Paso 4.** En propiedades, escribe **Title**: `Sobre nosotros`. AEM propone el **Name** `sobre-nosotros`. Déjalo así.',
        '**Paso 5.** Pulsa **Create** y en el diálogo de confirmación elige **Open**. Se abre el editor de páginas.'
      ]} />
      <DataTable
        caption="Title, Name y otros títulos: no son lo mismo"
        headers={['Campo', 'Para qué sirve', 'Ejemplo']}
        rows={[
          ['**Title**', 'El título visible de la página en AEM y, normalmente, en el sitio', 'Sobre nosotros'],
          ['**Name**', 'El nombre del nodo en el repositorio y el segmento de la URL. Minúsculas, sin espacios ni acentos', '`sobre-nosotros` → `/content/practica/es/sobre-nosotros.html`'],
          ['**Page Title**', 'Título alternativo para la pestaña del navegador y SEO (opcional)', 'Sobre nosotros · Sitio de Práctica'],
          ['**Navigation Title**', 'Texto que muestran los menús de navegación (opcional)', 'Nosotros']
        ]}
      />
      <Alert type="warning" title="El Name es difícil de cambiar">
        {'Cambiar el **Name** después cambia la URL de la página: los enlaces externos y los buscadores que apuntaban a la URL vieja dejan de funcionar. Piénsalo al crear la página; el **Title** en cambio se puede cambiar cuando quieras.'}
      </Alert>

      <SectionTitle>Laboratorio 3 · El editor de páginas</SectionTitle>
      <DataTable
        caption="Barra superior del editor (de izquierda a derecha)"
        headers={['Control', 'Qué hace']}
        rows={[
          ['**Toggle Side Panel**', 'Abre el panel lateral con tres pestañas: **Assets** (imágenes y archivos del DAM), **Components** (componentes permitidos en esta página) y **Content Tree** (árbol de componentes de la página)'],
          ['**Page Information**', 'Menú con Open Properties, Lock Page, View as Published, Start Workflow, Publish y más'],
          ['**Emulator**', 'Muestra la página con el ancho de otros dispositivos (teléfono, tableta)'],
          ['**Selector de modo**', 'Cambia entre Edit, Layout, Timewarp, Annotate, Developer y otros modos'],
          ['**Preview**', 'Muestra la página como la verá el visitante, sin marcas de edición']
        ]}
      />
      <Paragraph>{'**Agregar componentes.** Hay dos formas:'}</Paragraph>
      <List items={[
        '**Arrastrar:** abre el panel lateral, pestaña **Components**, y arrastra un componente (por ejemplo *Title*) sobre el recuadro **"Drag components here"**. Ese recuadro es un **contenedor**: la zona de la página donde se permiten componentes.',
        '**Insertar:** haz clic en el recuadro "Drag components here" y en la barra que aparece pulsa **+** (Insert). Elige el componente de la lista.',
        'Si un componente **no aparece** en la lista, la política de la plantilla no lo permite en ese contenedor. No es un error: lo configura quien administra las plantillas ([[ch-30]]).'
      ]} />
      <Paragraph>{'**Editar componentes.** Haz clic sobre un componente ya insertado. Aparece su **barra de herramientas**:'}</Paragraph>
      <DataTable
        headers={['Icono', 'Acción', 'Detalle']}
        rows={[
          ['Llave inglesa', '**Configure**', 'Abre el **diálogo** del componente: un formulario con sus campos (título, enlace, imagen...). Es lo que construirás como desarrollador ([[ch-21]])'],
          ['Lápiz', '**Edit** (edición en línea)', 'Editar el texto directamente sobre la página, en componentes como Text o Title'],
          ['Pincel', '**Styles**', 'Aplicar variantes visuales definidas por el **Style System** ([[ch-28]])'],
          ['Copiar / Cortar / Papelera', 'Copy, Cut, Delete', 'Mover o eliminar componentes; después usa **Paste** en otro contenedor'],
          ['Flecha hacia arriba', '**Parent**', 'Seleccionar el contenedor que envuelve al componente'],
          ['+', '**Insert**', 'Insertar otro componente antes del actual']
        ]}
      />
      <List items={[
        '**Diálogo vs. edición en línea:** el diálogo sirve para configuraciones completas; la edición en línea es cómoda para textos cortos. Ambos guardan en el mismo lugar del repositorio.',
        '**Imágenes:** inserta un componente *Image*, abre la pestaña **Assets** del panel lateral y **arrastra** una imagen del DAM sobre el componente. Si tu DAM está vacío, sube primero una imagen desde la consola Assets (**Create → Files**).',
        '**Deshacer y rehacer:** `Ctrl+Z` y `Ctrl+Y` (en macOS `Cmd`). También hay botones en la barra.',
        '**Guardado:** no hay botón "Guardar". Cada cambio se guarda en el repositorio al confirmarlo (al cerrar el diálogo o salir de la edición en línea).'
      ]} />

      <SectionTitle>Los modos del editor</SectionTitle>
      <DataTable
        headers={['Modo', 'Para qué sirve', 'Nota']}
        rows={[
          ['**Edit**', 'Agregar, editar, mover y eliminar componentes', 'Modo por defecto'],
          ['**Layout**', 'Diseño responsivo: cambiar el ancho de cada componente en columnas y ocultarlo por tipo de dispositivo', 'Se combina con el Emulator para ajustar cada ancho de pantalla'],
          ['**Preview**', 'Ver la página como el visitante: los enlaces funcionan y no hay marcas de edición', '`Ctrl+Shift+M` alterna entre Preview y el modo anterior'],
          ['**Timewarp**', 'Ver cómo era la página en una fecha pasada, a partir de sus versiones', 'Solo lectura'],
          ['**Annotate**', 'Dejar notas y dibujos sobre la página para otros autores', 'No se publican'],
          ['**Developer**', 'Ver información técnica de los componentes (rutas, scripts, tiempos de render)', 'Útil para depurar; puede no estar disponible en todas las versiones'],
          ['**Targeting**', 'Personalizar contenido por audiencia', 'Requiere configuración de personalización ([[ch-141]])']
        ]}
      />
      <Paragraph>{'**Probar el modo Layout.** Inserta dos componentes *Text* seguidos. Entra en **Layout**, selecciona el primero y arrastra el punto de su borde derecho hasta la mitad: ocupará 6 de 12 columnas. Haz lo mismo con el segundo y quedarán lado a lado. Activa el **Emulator**, elige un teléfono y ajústalos a ancho completo solo para ese dispositivo.'}</Paragraph>
      <Paragraph>{'Existe además el **Universal Editor**, el editor más reciente de Adobe para AEM as a Cloud Service, que edita de forma visual páginas y aplicaciones headless. Lo verás en [[ch-96]]; el editor de páginas de este tema sigue siendo el de los sitios AEM clásicos.'}</Paragraph>

      <SectionTitle>Laboratorio 4 · Propiedades de página</SectionTitle>
      <Paragraph>{'Abre **Page Information → Open Properties** (o, desde la consola Sites, selecciona la página y pulsa **Properties**). Las propiedades son metadatos de la página, no contenido visible en su cuerpo:'}</Paragraph>
      <DataTable
        headers={['Pestaña', 'Campos importantes', 'Para qué sirven']}
        rows={[
          ['**Basic**', 'Title, Tags, Hide in Navigation, Page Title, Navigation Title, Subtitle, Description, On Time / Off Time, Vanity URL', 'Títulos, clasificación con tags, visibilidad en menús, SEO y publicación programada por fechas'],
          ['**Advanced**', 'Language, Redirect, Alias, Authentication Requirement', 'Idioma de la página, redirecciones y restricción de acceso ([[ch-118]])'],
          ['**Thumbnail**', 'Miniatura de la página', 'Se muestra en la consola y en listados'],
          ['**Social Media**', 'Imagen y textos para compartir en redes', 'Metadatos Open Graph'],
          ['**Permissions**', 'Usuarios y grupos con acceso', 'Seguridad por página'],
          ['**Live Copy / Blueprint**', 'Herencia de contenido entre sitios', 'Multi-sitio ([[ch-120]])']
        ]}
      />
      <Paragraph>{'Para practicar: con la página abierta, pulsa `p` en la AEM Chrome Extension (o usa el menú Page Information), escribe una **Description**, marca o desmarca **Hide in Navigation** y guarda con **Save & Close**. Como desarrollador leerás estas propiedades desde el código ([[ch-22]]).'}</Paragraph>

      <SectionTitle>Laboratorio 5 · Versiones y publicación</SectionTitle>
      <Paragraph>{'**Guardar una versión.** En Sites, selecciona tu página, abre el panel lateral **Timeline**, pulsa la flecha junto al campo de comentario y elige **Save as Version**. Ponle una etiqueta como "Primera versión". Desde la misma Timeline puedes comparar o restaurar versiones anteriores ([[ch-36]]).'}</Paragraph>
      <DataTable
        caption="Dos formas de publicar"
        headers={['Opción', 'Qué hace', 'Cuándo usarla']}
        rows={[
          ['**Quick Publish**', 'Publica de inmediato **solo** las páginas seleccionadas (no sus hijas), junto con las referencias que necesiten', 'Cambios puntuales en una página'],
          ['**Manage Publication**', 'Asistente para publicar o **despublicar**, **programar** una fecha, **incluir páginas hijas**, revisar referencias, elegir destino (Publish o **Preview** en Cloud) y disparar workflows de aprobación', 'Publicar secciones completas, lanzamientos programados o contenido que requiere aprobación']
      ]}
      />
      <List items={[
        '**Paso 1.** Selecciona tu página en Sites y pulsa **Quick Publish** → **Publish**.',
        '**Paso 2.** Observa el estado de la página: debe aparecer como publicada con la fecha actual.',
        '**Paso 3.** Abre en otra pestaña la URL de Publish, por ejemplo `http://localhost:4503/content/practica/es/sobre-nosotros.html` (ajusta la ruta a la de tu página; la ves en la barra de direcciones del editor).',
        '**Paso 4.** Deberías ver la página sin las herramientas de edición. Recuerda el flujo del [[ch-2]]: Author envió el contenido a Publish.'
      ]} />
      <Alert type="warning" title="¿La página no aparece en Publish?">
        {'Revisa en este orden: (1) que la página padre también esté publicada (en Publish no existe una página hija sin su padre); (2) que las imágenes o Experience Fragments que usa también se hayan publicado; (3) en AEM 6.5, que el agente de replicación por defecto funcione (*Tools → Deployment → Replication → Agents on author*, botón **Test Connection**). La replicación local se trata a fondo en [[ch-80]].'}
      </Alert>

      <SectionTitle>Lo que hay detrás: la página en el repositorio</SectionTitle>
      <Paragraph>{'Todo lo que hiciste se guardó como **nodos y propiedades** en el JCR. Esta es la mirada del desarrollador. Abre en el navegador (sustituye la ruta por la de tu página), o pulsa `c` en la AEM Chrome Extension para ver el mismo contenido en CRXDE Lite ([[ch-6]]):'}</Paragraph>
      <CodeBlock filename="URLs para inspeccionar la página" language="text" code={jsonUrls} />
      <List items={[
        '`jcr:content` es el nodo que guarda el contenido y las propiedades de la página; la página en sí es solo un contenedor.',
        '`.tidy.3.json` es una vista JSON que ofrece Sling por defecto: `tidy` formatea el resultado y `3` es la profundidad máxima de nodos. `.infinity.json` no tiene límite.',
        'Estas vistas funcionan en tu Author local con el usuario admin; en Publish suelen estar bloqueadas por el Dispatcher por seguridad ([[ch-2]]).'
      ]} />
      <CodeBlock filename="jcr:content.tidy.3.json (ejemplo simplificado)" language="json" code={pageJson} />
      <List items={[
        '`jcr:primaryType: cq:PageContent` indica que el nodo es el contenido de una página.',
        '`jcr:title` y `jcr:description` son el **Title** y la **Description** que escribiste en las propiedades.',
        '`sling:resourceType` dice qué componente renderiza la página (el componente de página del sitio).',
        '`cq:template` apunta a la plantilla usada, guardada en `/conf`.',
        '`cq:lastModified` y `cq:lastModifiedBy` registran quién y cuándo modificó la página.',
        '`root` y `container` son los contenedores ("Drag components here") y guardan los componentes como nodos hijos.',
        'Cada componente es un nodo con su propio `sling:resourceType` y sus propiedades: el *Title* guardó `jcr:title` y `type` (h1); el *Text* guardó el HTML en `text` y `textIsRich`.',
        'Los nombres exactos (`practica/components/...`, `root`, `container`) dependen de la plantilla de tu sitio.'
      ]} />
      <Alert type="tip" title="La idea más importante del tema">
        {'Un **diálogo** es un formulario que guarda propiedades en el nodo del componente; el **HTL** del componente lee esas propiedades para generar HTML. Cuando programes componentes (Módulo 3), este JSON será tu herramienta para comprobar qué guardó el autor.'}
      </Alert>

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** En tu sitio de práctica crea la página **Servicios** (Name `servicios`) con una plantilla de contenido.',
        '**2.** Agrega un *Title* ("Nuestros servicios"), dos *Text* lado a lado en modo Layout, una *Image* con una imagen del DAM y un *Button* que enlace a *Sobre nosotros*.',
        '**3.** En el Emulator, haz que los dos textos ocupen el ancho completo en teléfono.',
        '**4.** En propiedades escribe una Description y guarda una versión llamada "v1".',
        '**5.** Publica la página con Quick Publish y ábrela en Publish (4503).',
        '**6.** Abre su `jcr:content.tidy.3.json` en Author y localiza el nodo de la imagen y el del botón: ¿qué propiedades guardó cada uno?'
      ]} />
      <Alert type="tip" title="Criterios de verificación y pistas">
        {'Está completo si la página se ve en `localhost:4503` con los textos lado a lado en escritorio y apilados en el emulador de teléfono, y si en el JSON encuentras los nodos de ambos componentes. Pistas: la imagen suele guardar la ruta del asset en una propiedad como `fileReference`; el botón guarda el texto y el enlace (por ejemplo `jcr:title` y `linkURL`). Los anchos del modo Layout se guardan en nodos `cq:responsive` dentro de cada componente.'}
      </Alert>

      <SectionTitle>Errores comunes</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa', 'Solución']}
        rows={[
          ['El componente que busco no está en la lista', 'La política de la plantilla no lo permite en ese contenedor', 'Revisar la política del contenedor en el Template Editor ([[ch-30]])'],
          ['No puedo editar la página', 'La página está bloqueada (Lock) por otro usuario, o no tienes permisos', 'Ver quién la bloqueó en Page Information; pedir el desbloqueo'],
          ['El cambio no aparece en Publish', 'No se publicó, falta publicar el padre o las referencias, o hay caché', 'Revisar estado, usar Manage Publication con referencias; caché: [[ch-2]]'],
          ['La URL tiene espacios codificados o acentos', 'Se editó el Name a mano con caracteres especiales', 'Usar solo minúsculas, números y guiones en el Name'],
          ['Borré un componente por error', '—', '`Ctrl+Z` inmediatamente, o restaurar una versión desde Timeline']
        ]}
      />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Prueba cada componente que desarrolles en **todos los modos**: Edit, Layout, Preview y en el Emulator.',
        'No edites contenido directamente en CRXDE Lite: te saltas validaciones, versiones y auditoría. Usa la interfaz de autor.',
        'Guarda versiones antes de cambios grandes y usa **Manage Publication** cuando publiques secciones completas.',
        'Nombra las páginas pensando en la URL final: corta, descriptiva y estable.'
      ]} />

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'La navegación global y la barra superior dan acceso a todas las consolas; Sites, Assets y Tools son las que más usarás.',
        'En Sites, clic en el título navega y clic en la miniatura selecciona; el panel lateral muestra Timeline y References.',
        'Una página se crea desde una plantilla; Title y Name son distintos y el Name define la URL.',
        'Los componentes se agregan en contenedores, se editan con diálogos o en línea, y su disponibilidad depende de la política de la plantilla.',
        'Layout controla el diseño responsivo; Preview muestra la página como la verá el visitante.',
        'Quick Publish publica solo lo seleccionado; Manage Publication agrega hijas, programación, despublicación y workflows.',
        'Todo se guarda como nodos en el JCR, y puedes verlo en JSON con `.tidy.3.json`.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Authoring', 'Crear y editar contenido desde la interfaz de AEM'],
          ['Consola', 'Cada área de trabajo de AEM: Sites, Assets, Tools, etc.'],
          ['Contenedor', 'Zona de una página donde se pueden colocar componentes ("Drag components here")'],
          ['Diálogo', 'Formulario de configuración de un componente'],
          ['Política', 'Configuración de una plantilla que define qué componentes y estilos se permiten'],
          ['Quick Publish', 'Publicación inmediata de las páginas seleccionadas'],
          ['Manage Publication', 'Asistente de publicación con opciones avanzadas'],
          ['`jcr:content`', 'Nodo que guarda el contenido y las propiedades de una página']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Introducción al editor de páginas', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/sites/authoring/page-editor/introduction' },
        { type: 'image', title: 'Publicar páginas (Quick Publish y Manage Publication)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/sites/authoring/sites-console/publishing-pages' },
        { type: 'image', title: 'Standard Site Template', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-site-template-standard' },
        { type: 'image', title: 'Sling: renderizado por defecto en JSON', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/rendering-content-default-get-servlets.html' }
      ]} />
    </LessonPage>
  );
}
