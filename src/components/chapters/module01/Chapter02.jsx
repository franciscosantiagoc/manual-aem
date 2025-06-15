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

const curlCommands = `# Windows (PowerShell): usa curl.exe, porque "curl" es un alias de Invoke-WebRequest
curl.exe -sI https://www.aem.live/

# macOS / Linux
curl -sI https://www.aem.live/

# Repite la misma petición unos segundos después y compara las cabeceras
curl -sI https://www.aem.live/ | grep -iE "cache-control|age|x-cache|via|cdn"`;

const slingParser = `function parseSlingUrl(url) {
  const { pathname } = new URL(url, 'https://ejemplo.com');

  const firstDot = pathname.indexOf('.');
  if (firstDot === -1) {
    return { resourcePath: pathname, selectors: '', extension: '', suffix: '' };
  }

  const resourcePath = pathname.slice(0, firstDot);
  const rest = pathname.slice(firstDot + 1);

  const slash = rest.indexOf('/');
  const beforeSuffix = slash === -1 ? rest : rest.slice(0, slash);
  const suffix = slash === -1 ? '' : rest.slice(slash);

  const parts = beforeSuffix.split('.');
  const extension = parts.pop();

  return { resourcePath, selectors: parts.join('.'), extension, suffix };
}

console.table([
  '/content/misitio/es/blog.html',
  '/content/misitio/es/blog.print.html',
  '/content/misitio/es/blog.model.json',
  '/content/misitio/es/productos.lista.pagina-2.html/categoria/zapatos',
  '/content/dam/misitio/logo.png'
].map(parseSlingUrl));`;

export default function Chapter02({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-2"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Describir la responsabilidad de cada pieza: Author, Publish, Dispatcher y CDN.',
        'Reconocer las capas técnicas de AEM (OSGi, Sling, JCR/Oak, HTL) y en qué tema se estudia cada una.',
        'Seguir paso a paso una petición HTTP desde el navegador hasta el repositorio y de regreso.',
        'Explicar cómo viaja el contenido al publicar, en AEM 6.5 y en AEM as a Cloud Service.',
        'Comparar las topologías on-premise y Cloud Service.',
        'Usar dos herramientas de diagnóstico: cabeceras HTTP con curl y descomposición de URLs de Sling.'
      ]} />
      <Paragraph>{'Este tema es el mapa de toda la guía. No busca que domines cada pieza (cada una tiene su módulo), sino que sepas **dónde está cada cosa** y cómo se conectan. Cuando algo falle en un proyecto real, este mapa te dirá en qué capa buscar.'}</Paragraph>

      <SectionTitle>Las cuatro piezas de la entrega</SectionTitle>
      <FlowDiagram
        caption="Camino del contenido: se crea en Author, se publica y se sirve a los visitantes a través de la caché."
        steps={[
          { title: 'Author', detail: 'Autores crean y aprueban contenido', tone: 'purple' },
          { title: 'Publish', detail: 'Renderiza el sitio público', tone: 'primary' },
          { title: 'Dispatcher', detail: 'Apache + módulo: caché y filtros', tone: 'cyan' },
          { title: 'CDN', detail: 'Caché global cerca del visitante', tone: 'success' },
          { title: 'Visitante', detail: 'Navegador o app', tone: 'warning' }
        ]}
        connectors={['publicación', 'petición / respuesta', 'origen', 'HTTPS']}
      />
      <DataTable
        headers={['Pieza', 'Responsabilidad', 'Quién accede', 'En local (por defecto)']}
        rows={[
          ['**Author**', 'Crear, editar, revisar y publicar contenido. Tiene la interfaz Touch UI, workflows y consolas.', 'Solo usuarios internos autenticados', '`http://localhost:4502`'],
          ['**Publish**', 'Recibir el contenido publicado y generar las páginas y APIs públicas. No tiene herramientas de edición.', 'El Dispatcher (nunca el público directamente)', '`http://localhost:4503`'],
          ['**Dispatcher**', 'Módulo de Apache HTTP Server. Guarda en disco copias de las respuestas, filtra peticiones peligrosas y balancea hacia Publish.', 'La CDN o los visitantes', 'Normalmente `http://localhost:8080` con el Dispatcher SDK ([[ch-79]])'],
          ['**CDN**', 'Caché distribuida geográficamente, TLS y protección perimetral.', 'Los visitantes', 'No aplica en local']
        ]}
      />
      <Alert type="info" title="¿Por qué separar Author y Publish?">
        {'Por **seguridad** (el público nunca toca el servidor donde se edita), por **rendimiento** (Publish no carga herramientas de autoría y se escala de forma independiente) y por **control editorial** (lo que está en Author no es público hasta que alguien lo publica). En Cloud Service existe además un tier **Preview** para revisar el contenido antes de publicarlo.'}
      </Alert>

      <SectionTitle>Las capas técnicas de AEM</SectionTitle>
      <Paragraph>{'Author y Publish son la **misma aplicación** con distinta configuración (run mode). Por dentro, cada instancia es una pila de capas:'}</Paragraph>
      <DataTable
        headers={['Capa', 'Tecnología', 'Qué hace', 'Dónde la estudias']}
        rows={[
          ['Presentación', 'HTL + Sling Models + clientlibs', 'Genera el HTML de cada componente con datos del repositorio', '[[ch-17]], [[ch-45]], [[ch-24]]'],
          ['Aplicación WCM', 'AEM Sites, Assets, Granite UI', 'Páginas, plantillas, DAM, workflows, interfaz de autor', '[[ch-5]], [[ch-30]]'],
          ['Framework web', '**Apache Sling**', 'Convierte cada URL en un recurso del repositorio y elige el script o servlet que lo renderiza', '[[ch-40]], [[ch-41]]'],
          ['Módulos y servicios', '**OSGi (Apache Felix)**', 'Carga el código en bundles, gestiona servicios y configuraciones sin reiniciar', '[[ch-38]], [[ch-39]], [[ch-7]]'],
          ['Repositorio', '**JCR (Apache Jackrabbit Oak)**', 'Guarda contenido y código como un árbol de nodos y propiedades, con versiones e índices', '[[ch-71]], [[ch-72]]'],
          ['Runtime', 'JVM (Java)', 'Ejecuta todo lo anterior', '[[ch-3]], [[ch-4]]']
        ]}
      />

      <SectionTitle>Todo es un nodo: las carpetas raíz del repositorio</SectionTitle>
      <Paragraph>{'En AEM no hay una base de datos para el contenido y otra para el código: **todo vive en el JCR**, organizado en carpetas raíz con propósitos fijos. Conocerlas evita el error más común de principiante: guardar cosas en el lugar equivocado.'}</Paragraph>
      <DataTable
        headers={['Ruta', 'Contiene', 'En Cloud Service']}
        rows={[
          ['`/apps`', 'Código del proyecto: componentes, plantillas de diálogo, clientlibs, overlays', 'Inmutable (solo por despliegue)'],
          ['`/libs`', 'Código de Adobe. **Nunca se modifica**', 'Inmutable'],
          ['`/content`', 'Páginas de los sitios (`/content/misitio`), DAM (`/content/dam`), Experience Fragments', 'Mutable'],
          ['`/conf`', 'Plantillas editables, políticas y configuraciones por contexto (CA-Config)', 'Mutable'],
          ['`/var`', 'Datos generados en ejecución: colas, auditoría, datos de workflows', 'Mutable'],
          ['`/home`', 'Usuarios y grupos', 'Mutable'],
          ['`/oak:index`', 'Definiciones de índices para las consultas', 'Se despliegan con el código']
        ]}
      />

      <SectionTitle>Recorrido de una petición, paso a paso</SectionTitle>
      <Paragraph>{'Supongamos que un visitante abre `https://www.misitio.com/es/blog.html`. Esto es lo que ocurre:'}</Paragraph>
      <List items={[
        '**1. CDN.** La CDN busca la URL en su caché. Si tiene una copia vigente, responde en milisegundos y la petición termina aquí. Si no, la reenvía a su origen: el Dispatcher.',
        '**2. Dispatcher: reescritura y filtros.** Apache aplica sus reglas de reescritura (por ejemplo, `/es/blog.html` → `/content/misitio/es/blog.html`) y el Dispatcher revisa sus **filtros**: si la ruta o el selector no están permitidos, responde 404 sin molestar a Publish ([[ch-82]]).',
        '**3. Dispatcher: caché.** Si el archivo existe en su docroot y no fue invalidado, lo sirve desde disco. Si no, pide la página a Publish.',
        '**4. Sling: resolución del recurso.** Publish recibe la petición y Sling la descompone: ruta del recurso `/content/misitio/es/blog`, extensión `html`, sin selectores ni sufijo. Busca ese nodo en el JCR.',
        '**5. Sling: resolución del script.** Lee la propiedad `sling:resourceType` del nodo (por ejemplo, `misitio/components/page`) y busca el script que la renderiza, primero en `/apps` y después en `/libs` ([[ch-40]]).',
        '**6. Renderizado.** Se ejecuta el HTL de la página, que incluye cada componente. Cada componente usa su Sling Model para leer datos del JCR o de servicios OSGi.',
        '**7. Respuesta y caché.** El HTML vuelve al Dispatcher, que lo guarda en disco (si las reglas lo permiten), y a la CDN, que también lo cachea según las cabeceras `Cache-Control`. El visitante recibe la página.'
      ]} />
      <Alert type="tip" title="La regla de oro del diagnóstico">
        {'Si "no se ve un cambio", la causa casi siempre está en uno de tres puntos: el contenido no se publicó (Author → Publish), el Dispatcher sirve una copia vieja (invalidación) o la CDN la sirve (TTL). Revisa en ese orden.'}
      </Alert>

      <SectionTitle>Cómo viaja el contenido al publicar</SectionTitle>
      <Paragraph>{'La mecánica de publicación es una de las mayores diferencias entre versiones:'}</Paragraph>
      <DataTable
        headers={['Paso', 'AEM 6.5 / 6.5 LTS', 'AEM as a Cloud Service']}
        rows={[
          ['Mecanismo', '**Agentes de replicación**: Author envía cada cambio por HTTP a cada Publish configurado', '**Sling Content Distribution**: modelo publicar-suscribir con colas en la nube; cada Publish se suscribe'],
          ['Escalado', 'Añadir un Publish implica configurar un agente más en Author', 'Los Publish entran y salen dinámicamente sin configurar nada en Author'],
          ['Invalidación del Dispatcher', 'Agente de **flush** en Publish (o Author) que llama al Dispatcher', 'Automática al distribuir el contenido; la CDN se gestiona aparte'],
          ['Binarios (imágenes, PDFs)', 'Pasan por el repositorio de cada instancia', 'Se guardan en un **Cloud Data Store**; los bytes no pasan por la JVM']
        ]}
      />

      <SectionTitle>Topologías: on-premise vs. Cloud Service</SectionTitle>
      <DataTable
        headers={['Aspecto', 'AEM 6.5 típico (on-premise / AMS)', 'AEM as a Cloud Service']}
        rows={[
          ['Author', 'Una instancia (a veces con un standby para recuperación)', 'Un **clúster de pods** que comparten un repositorio; mínimo dos para no interrumpir el servicio durante mantenimientos'],
          ['Publish', 'Un número fijo de instancias, cada una con su repositorio', 'Una **granja** de Publish con número variable de pods según el tráfico, cada uno con su repositorio'],
          ['Dispatcher', 'Servidores Apache, normalmente uno por Publish, detrás de un balanceador', 'Cada Publish va acoplado a su propio Apache con el módulo Dispatcher'],
          ['CDN', 'La elige y configura el cliente (Akamai, Cloudflare, etc.)', 'CDN gestionada por Adobe incluida; se puede poner una CDN propia delante'],
          ['Preview', 'No existe como tier', 'Tier **Preview** para control de calidad del contenido'],
          ['Entornos', 'Los que el equipo construya', 'Development, Stage, Production y RDE (desarrollo rápido)']
        ]}
      />

      <SectionTitle>Ejemplo práctico 1: ver las capas de caché con curl</SectionTitle>
      <Paragraph>{'Las cabeceras HTTP de una respuesta revelan qué capa respondió y cuánto tiempo lleva cacheada. Vamos a leerlas con **curl**.'}</Paragraph>
      <List items={[
        '**Instalación.** Windows 10/11, macOS y la mayoría de distribuciones Linux ya incluyen curl. Compruébalo con `curl --version` (en PowerShell: `curl.exe --version`). Si no existe en Linux: `sudo apt install curl` (Debian/Ubuntu) o `sudo dnf install curl` (Fedora).',
        '**Paso 1.** Abre una terminal (PowerShell en Windows, Terminal en macOS/Linux).',
        '**Paso 2.** Ejecuta los comandos siguientes.',
        '**Paso 3.** Repite la petición y observa qué cabeceras cambian.'
      ]} />
      <CodeBlock filename="terminal" language="bash" code={curlCommands} />
      <List items={[
        '`-s` (silent) oculta la barra de progreso; `-I` pide solo las cabeceras (método HEAD), sin descargar el cuerpo.',
        'En PowerShell se escribe `curl.exe` porque `curl` a secas es un alias de `Invoke-WebRequest`, que tiene otra sintaxis.',
        'El último comando filtra con `grep` solo las cabeceras relacionadas con caché. En PowerShell usa `| Select-String -Pattern "cache|age|via|cdn"` en lugar de `grep`.',
        '`cache-control` indica cuánto tiempo puede cachearse la respuesta (`max-age`, `s-maxage`).',
        '`age` son los segundos que la respuesta lleva en la caché de la CDN: si crece entre dos peticiones, te respondió la caché y no el origen.',
        'Cabeceras como `x-cache` (HIT o MISS) o `via` las añade la CDN; los nombres exactos cambian según el proveedor.'
      ]} />

      <SectionTitle>Ejemplo práctico 2: descomponer URLs como Sling</SectionTitle>
      <Paragraph>{'Sling decide qué ejecutar a partir de cuatro partes de la URL: **ruta del recurso, selectores, extensión y sufijo**. Esta función reproduce esa descomposición para que la practiques. Puedes ejecutarla en la consola del navegador (F12 → Console) o guardarla como `sling-url.js` y correrla con `node sling-url.js` si ya instalaste Node.js ([[ch-3]]).'}</Paragraph>
      <CodeBlock filename="sling-url.js" language="javascript" code={slingParser} />
      <List items={[
        '`new URL(url, \'https://ejemplo.com\')` convierte el texto en un objeto URL; el segundo parámetro permite pasar rutas relativas. Nos quedamos con `pathname` (sin dominio ni query string).',
        '`indexOf(\'.\')` busca el primer punto: todo lo anterior es la **ruta del recurso**. Si no hay punto, la URL no tiene selectores ni extensión.',
        '`rest` es lo que sigue al primer punto, por ejemplo `lista.pagina-2.html/categoria/zapatos`.',
        'El primer `/` dentro de `rest` separa el **sufijo** (`/categoria/zapatos`) del bloque de selectores y extensión.',
        '`split(\'.\')` divide ese bloque; `pop()` extrae el último elemento, que es la **extensión** (`html`), y lo que queda son los **selectores** (`lista.pagina-2`).',
        '`console.table` muestra el resultado de las cinco URLs de ejemplo en una tabla.'
      ]} />
      <DataTable
        caption="Resultado esperado"
        headers={['URL', 'Recurso', 'Selectores', 'Extensión', 'Sufijo']}
        rows={[
          ['`blog.html`', '`/content/misitio/es/blog`', '—', '`html`', '—'],
          ['`blog.print.html`', '`/content/misitio/es/blog`', '`print`', '`html`', '—'],
          ['`blog.model.json`', '`/content/misitio/es/blog`', '`model`', '`json`', '—'],
          ['`productos.lista.pagina-2.html/categoria/zapatos`', '`/content/misitio/es/productos`', '`lista.pagina-2`', '`html`', '`/categoria/zapatos`'],
          ['`logo.png`', '`/content/dam/misitio/logo`', '—', '`png`', '—']
        ]}
      />
      <Alert type="warning" title="Simplificación didáctica">
        {'El Sling real consulta el repositorio: si un nodo tiene un punto en su nombre (por ejemplo `logo.png` en el DAM), la ruta del recurso incluye ese punto. Nuestra función asume que ningún nombre de nodo tiene puntos. El algoritmo completo lo verás en [[ch-40]].'}
      </Alert>

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <Paragraph>{'**Parte A.** Ejecuta el ejemplo de curl sobre dos sitios públicos distintos. Para cada uno anota `cache-control`, `age` y las cabeceras de la CDN, y explica si la segunda respuesta vino de caché.'}</Paragraph>
      <Paragraph>{'**Parte B.** Para cada síntoma indica la pieza o capa donde empezarías a investigar:'}</Paragraph>
      <List items={[
        '1. Un autor publicó un cambio hace una hora y en Publish (puerto 4503) ya se ve, pero en el sitio público no.',
        '2. La página `/content/misitio/es/blog.debug.html` devuelve 404 en el sitio público, pero funciona en Publish directo.',
        '3. Un componente nuevo muestra su HTML pero los datos vienen vacíos.',
        '4. Tras desplegar, un servicio Java no hace nada y en `/system/console` su bundle aparece como "Installed".'
      ]} />
      <Alert type="tip" title="Solución">
        {'**1.** Caché: primero el Dispatcher (¿se invalidó?) y luego la CDN (¿TTL?). **2.** Filtros del Dispatcher: el selector `debug` no está permitido, y es correcto que así sea. **3.** Capa de presentación: el Sling Model no está leyendo las propiedades (nombres o inyección); revisa también que el diálogo guarde donde crees. **4.** OSGi: el bundle no se activó, casi siempre por una dependencia no resuelta ([[ch-7]]).'}
      </Alert>

      <SectionTitle>Buenas prácticas y errores comunes</SectionTitle>
      <List items={[
        '**Error:** exponer Publish directamente a internet sin Dispatcher. Se pierde la caché y, sobre todo, los filtros de seguridad.',
        '**Error:** guardar datos de ejecución en `/apps` o `/content`. Los datos generados van en `/var`, y en Cloud Service `/apps` ni siquiera es escribible.',
        '**Error:** modificar algo dentro de `/libs`. Usa overlays en `/apps` o herencia de componentes.',
        '**Buena práctica:** piensa cada funcionalidad en términos de caché desde el diseño: ¿esta respuesta se puede cachear?, ¿quién la invalida?',
        '**Buena práctica:** cuando algo falle, recorre la petición capa por capa (CDN → Dispatcher → Sling → componente) en lugar de adivinar.'
      ]} />

      <ResourceLinks items={[
        { type: 'image', title: 'Arquitectura de AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/overview/architecture' },
        { type: 'image', title: 'Dispatcher overview', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-dispatcher/using/dispatcher' },
        { type: 'image', title: 'URL decomposition', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/the-sling-engine/url-decomposition.html' },
        { type: 'image', title: 'Apache Jackrabbit Oak', source: 'Apache', url: 'https://jackrabbit.apache.org/oak/docs/' }
      ]} />
    </LessonPage>
  );
}
