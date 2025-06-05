import React from 'react';
import {
  LessonPage,
  SectionTitle,
  Paragraph,
  List,
  Alert,
  CodeBlock,
  DataTable,
  ResourceLinks
} from '../../LessonUI';

const detectorScript = `(() => {
  const has = (selector) => document.querySelector(selector) !== null;

  const signals = {
    clientlibs: has('link[href*="/etc.clientlibs/"], script[src*="/etc.clientlibs/"]'),
    coreComponents: has('[data-cmp-is], [data-cmp-data-layer]'),
    damAssets: has('img[src*="/content/dam/"], source[srcset*="/content/dam/"]'),
    dataLayer: Array.isArray(window.adobeDataLayer),
    edgeDelivery: has('script[src*="/scripts/aem.js"], script[src*="/scripts/lib-franklin.js"]')
  };

  let verdict = 'Sin señales claras de AEM';
  if (signals.edgeDelivery) {
    verdict = 'Edge Delivery Services';
  } else if (signals.clientlibs || signals.coreComponents) {
    verdict = 'AEM Sites (6.5 / 6.5 LTS / Cloud Service)';
  }

  console.table(signals);
  console.log('Veredicto:', verdict);
  return verdict;
})();`;

export default function Chapter01({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-1"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Explicar qué es un CMS y por qué separa el contenido de la presentación.',
        'Distinguir un CMS tradicional, uno headless, uno híbrido y una DXP.',
        'Ubicar a Adobe Experience Manager (AEM) dentro de ese mapa y conocer su historia.',
        'Comparar **AEM 6.5**, **AEM 6.5 LTS**, **AEM as a Cloud Service** y **Edge Delivery Services**, y elegir entre ellos con criterio.',
        'Reconocer un sitio construido con AEM desde el navegador, con un script de diagnóstico.'
      ]} />
      <Alert type="info" title="Cómo usar esta guía">
        {'Cada tema tiene un tag **Frontend** o **Backend** y un nivel (Básico a Arquitecto). Si un tema depende de otro, verás el recuadro "Antes de este tema revisa" en la cabecera. Al final de cada tema hay una autoevaluación aleatoria: apruébala con 80% para marcar el tema como completado.'}
      </Alert>

      <SectionTitle>¿Qué es un CMS?</SectionTitle>
      <Paragraph>{'Un **CMS (Content Management System)** es una plataforma que permite a personas sin conocimientos de programación crear, editar, organizar y publicar contenido digital: páginas, imágenes, documentos, formularios. El equipo técnico construye una sola vez las piezas reutilizables (plantillas y componentes) y a partir de ahí el negocio publica por su cuenta.'}</Paragraph>
      <Paragraph>{'El principio que lo hace posible es la **separación de contenido y presentación**. El contenido (textos, imágenes, metadatos) se guarda de forma estructurada en un repositorio; la presentación (HTML, CSS, JavaScript) la definen los desarrolladores en componentes. Así un autor puede cambiar el texto de un banner sin tocar código, y un desarrollador puede rediseñar el banner sin tocar el contenido de cientos de páginas.'}</Paragraph>
      <DataTable
        caption="Vocabulario básico que usaremos en toda la guía"
        headers={['Concepto', 'Qué es', 'Ejemplo en AEM']}
        rows={[
          ['Contenido', 'Los datos que crea el negocio', 'El título y la imagen de un artículo'],
          ['Componente', 'Pieza visual reutilizable que sabe mostrar cierto contenido', 'Teaser, Carrusel, Texto'],
          ['Plantilla', 'Estructura base de una página y qué componentes se permiten en ella', 'Plantilla "Artículo" con header, cuerpo y footer'],
          ['Autor', 'Persona que crea y edita contenido', 'Un editor de marketing'],
          ['Publicación', 'Acción de hacer visible el contenido al público', 'Botón "Publicar página"'],
          ['Repositorio', 'Donde se almacena el contenido', 'El JCR (Java Content Repository)']
        ]}
      />

      <SectionTitle>Tipos de CMS</SectionTitle>
      <Paragraph>{'No todos los CMS resuelven el mismo problema. Entender las cuatro familias explica muchas decisiones de arquitectura de AEM:'}</Paragraph>
      <DataTable
        headers={['Tipo', 'Cómo funciona', 'Ejemplos', 'Ideal para']}
        rows={[
          ['Tradicional (acoplado)', 'El mismo sistema guarda el contenido y genera el HTML final', 'WordPress, Drupal', 'Sitios institucionales, blogs, presupuestos bajos'],
          ['Headless', 'Solo guarda contenido estructurado y lo expone por API (REST/GraphQL); el frontend es otra aplicación', 'Contentful, Strapi, Sanity', 'Apps móviles, múltiples canales, equipos frontend fuertes'],
          ['Híbrido', 'Ofrece ambos modos: páginas con editor visual y contenido por API', '**AEM**, Drupal (con módulos)', 'Empresas que necesitan web visual y omnicanal a la vez'],
          ['DXP (Digital Experience Platform)', 'CMS híbrido integrado con analítica, personalización, DAM y marketing', '**Adobe Experience Cloud** (AEM + Analytics + Target), Sitecore', 'Grandes marcas con muchos sitios, países e integraciones']
        ]}
      />
      <Alert type="tip" title="Dónde encaja AEM">
        {'AEM es un **CMS híbrido de nivel empresarial** y es la pieza de contenido de la DXP de Adobe (**Adobe Experience Cloud**). Puede renderizar páginas con edición visual (modo **Sites**) y también servir contenido estructurado por GraphQL (modo **headless**, ver [[ch-94]]). Esa dualidad es la principal razón por la que lo eligen empresas grandes.'}
      </Alert>

      <SectionTitle>¿Qué es Adobe Experience Manager?</SectionTitle>
      <Paragraph>{'AEM nació como **Day CQ5** (Communiqué), producto de la empresa suiza Day Software, que Adobe adquirió en 2010. Por esa herencia verás prefijos como `cq:` en el repositorio (`cq:Page`, `cq:dialog`): Adobe los mantiene por compatibilidad incluso en la versión en la nube.'}</Paragraph>
      <Paragraph>{'Técnicamente, AEM es una aplicación Java construida sobre tres proyectos de código abierto de Apache. No necesitas dominarlos todavía (los verás a fondo en el Módulo 6), pero sí reconocer sus nombres:'}</Paragraph>
      <List items={[
        '**Apache Jackrabbit Oak:** el repositorio de contenido (JCR). Guarda todo como un árbol de nodos y propiedades, no como tablas SQL.',
        '**Apache Sling:** el framework web. Traduce cada URL a un nodo del repositorio y decide qué script lo muestra.',
        '**Apache Felix (OSGi):** el contenedor de módulos Java. Permite instalar, actualizar y configurar código sin reiniciar el servidor.'
      ]} />
      <Paragraph>{'Sobre esa base, AEM se vende como una familia de soluciones. En esta guía nos enfocamos en **Sites** y tocamos las demás donde se cruzan con el desarrollo:'}</Paragraph>
      <List items={[
        '**AEM Sites:** gestión de páginas web y experiencias headless. Es el núcleo de esta guía.',
        '**AEM Assets:** gestión de activos digitales (DAM): imágenes, video, documentos, renditions y Dynamic Media (Módulo 19).',
        '**AEM Forms:** formularios adaptables, documentos y firma (Módulo 20).',
        '**Edge Delivery Services:** forma de publicar sitios muy rápidos con autoría basada en documentos (Word, Google Docs) o con Universal Editor (Módulo 15).'
      ]} />

      <SectionTitle>Las piezas mínimas: Author, Publish y Dispatcher</SectionTitle>
      <Paragraph>{'Un sitio AEM clásico no es un solo servidor. Tiene tres piezas con responsabilidades separadas:'}</Paragraph>
      <List items={[
        '**Author:** instancia privada donde los autores crean y editan contenido con la interfaz Touch UI. El público nunca accede a ella.',
        '**Publish:** instancia pública que recibe el contenido aprobado y genera las páginas que ven los visitantes. No tiene herramientas de edición.',
        '**Dispatcher:** módulo de Apache HTTP Server delante de Publish. Guarda copias en caché de las páginas y filtra las peticiones peligrosas.'
      ]} />
      <Paragraph>{'Cuando un autor pulsa **Publicar**, el contenido viaja de Author a Publish (replicación) y el Dispatcher invalida su copia en caché. Este flujo, junto con el resto de la arquitectura, se explica paso a paso en [[ch-2]].'}</Paragraph>

      <SectionTitle>Modelos de despliegue: 6.5, 6.5 LTS, Cloud Service y Edge Delivery Services</SectionTitle>
      <Paragraph>{'"AEM" puede referirse a productos con operación muy distinta. Antes de escribir una línea de código tienes que saber en cuál vas a trabajar, porque cambia cómo despliegas, qué puedes personalizar y qué versión de Java usas.'}</Paragraph>
      <DataTable
        caption="Comparativa de modelos (información vigente a septiembre de 2026)"
        headers={['Aspecto', 'AEM 6.5', 'AEM 6.5 LTS', 'AEM as a Cloud Service', 'Edge Delivery Services']}
        rows={[
          ['Dónde corre', 'On-premise, nube propia o Adobe Managed Services (AMS)', 'Igual que 6.5: on-premise o AMS', 'Nube de Adobe (solo SaaS)', 'Red de Adobe en el edge (SaaS)'],
          ['Actualizaciones', 'Service Packs que instala el equipo del proyecto', 'Service Packs LTS que instala el equipo', 'Continuas y automáticas: release de funcionalidades mensual y mantenimientos frecuentes', 'Continuas, gestionadas por Adobe'],
          ['Java', 'Java 8 u 11', 'Java 17 o 21', 'Gestionado por Adobe (el proyecto compila contra el AEM SDK)', 'No aplica: el código es JavaScript y CSS en el navegador'],
          ['Despliegue de código', 'Paquetes vía Package Manager o pipeline propio', 'Igual que 6.5', 'Solo con pipelines de **Cloud Manager**', 'Push a GitHub: se publica automáticamente'],
          ['Repositorio `/apps`', 'Modificable en ejecución', 'Modificable en ejecución', 'Inmutable: solo cambia con un despliegue', 'No hay repositorio JCR en la entrega'],
          ['Escalado y CDN', 'Lo diseña y opera el cliente o AMS', 'Lo diseña y opera el cliente o AMS', 'Autoescalado y CDN incluidos', 'CDN y rendimiento optimizados por diseño'],
          ['Perfil técnico principal', 'Java, OSGi, DevOps', 'Java 17/21, OSGi, DevOps', 'Java, OSGi, prácticas cloud', 'Frontend (HTML, CSS, JavaScript)']
        ]}
      />
      <Alert type="warning" title="Fechas de soporte de AEM 6.5">
        {'Según Adobe, el soporte principal (core) de AEM 6.5 termina el **28 de febrero de 2027** y el soporte extendido el **28 de febrero de 2028**. AEM 6.5 LTS es la rama recomendada para quien se queda en 6.5 y permite actualizar in-place desde AEM 6.5 directamente a un Service Pack LTS. Verifica siempre estas fechas en la documentación oficial antes de una decisión de proyecto.'}
      </Alert>
      <Paragraph>{'Dos ideas clave de AEM as a Cloud Service que conviene fijar desde ahora:'}</Paragraph>
      <List items={[
        '**Siempre actualizado:** Adobe actualiza el producto de forma continua (por ejemplo, la release 2026.9.0 salió el 24 de septiembre de 2026 y la siguiente está planeada para octubre). Ya no existen proyectos de "upgrade" de varios meses.',
        '**Repositorio mutable vs. inmutable:** `/apps` y `/libs` son de solo lectura en ejecución; `/content`, `/conf` y `/var` sí se pueden escribir. Por eso el código solo llega a través del pipeline (detalle en [[ch-126]]).'
      ]} />

      <SectionTitle>¿Cuál elegir? Guía rápida de decisión</SectionTitle>
      <DataTable
        headers={['Si el proyecto…', 'Opción recomendada', 'Por qué']}
        rows={[
          ['Es nuevo y no tiene restricciones de hosting', 'AEM as a Cloud Service', 'Sin upgrades, autoescalado y es donde Adobe entrega las novedades'],
          ['Necesita máxima velocidad y lo mantiene un equipo frontend', 'Edge Delivery Services (combinable con Cloud Service)', 'Lighthouse cercano a 100 y autoría en documentos o Universal Editor'],
          ['Ya corre en 6.5 y no puede migrar aún (regulación, datos on-premise, personalizaciones profundas)', 'AEM 6.5 LTS', 'Soporte extendido, Java 17/21 y actualización in-place'],
          ['Necesita contenido para apps móviles y varios canales', 'Cloud Service en modo headless (Content Fragments + GraphQL)', 'Un solo repositorio de contenido para todos los canales'],
          ['Tiene web visual y además landings de campaña muy rápidas', 'Arquitectura híbrida: Cloud Service + Edge Delivery Services', 'Cada superficie usa el paradigma que mejor le sirve']
        ]}
      />
      <Paragraph>{'La matriz completa, con costos, riesgos y casos de negocio, la construimos en el módulo de arquitectura ([[ch-142]]).'}</Paragraph>

      <SectionTitle>Ventajas y desventajas de AEM</SectionTitle>
      <DataTable
        headers={['Ventajas', 'Desventajas']}
        rows={[
          ['**Autonomía del negocio:** marketing publica sin esperar un despliegue de código.', '**Curva de aprendizaje alta:** Sling, OSGi, HTL y JCR son tecnologías específicas que hay que aprender.'],
          ['**Consistencia de marca:** todo se construye con componentes y plantillas gobernadas.', '**Costo:** licencias empresariales y equipos especializados.'],
          ['**Workflows de aprobación:** nada se publica sin pasar por los revisores definidos.', '**Caché obligatoria:** sin Dispatcher/CDN bien configurados, el rendimiento sufre.'],
          ['**Multi-sitio e idiomas:** MSM y traducciones para decenas de países con una sola base de código.', '**Rigidez:** un diseño que no contemplan los componentes existentes requiere desarrollo.'],
          ['**Seguridad y auditoría:** permisos granulares e historial de versiones de cada cambio.', '**Operación compleja en 6.5:** upgrades, parches y escalado recaen en el equipo.'],
          ['**Ecosistema Adobe:** integración nativa con Analytics, Target y Assets.', '**Dependencia del proveedor:** migrar fuera de AEM es costoso.']
        ]}
      />

      <SectionTitle>Roles en un proyecto AEM (y cómo se refleja en esta guía)</SectionTitle>
      <List items={[
        '**Autor / editor de contenido:** crea páginas y assets desde la interfaz. Lo verás en [[ch-5]].',
        '**Desarrollador frontend (tag Frontend):** HTL, componentes, clientlibs, CSS/JS, SPA y Edge Delivery Services.',
        '**Desarrollador backend (tag Backend):** Java, OSGi, Sling Models, servlets, schedulers, consultas y Dispatcher.',
        '**DevOps:** entornos, pipelines de Cloud Manager, CDN y monitoreo.',
        '**Arquitecto:** decide el modelo de despliegue, la estructura de contenido, la caché, la seguridad y la gobernanza (último módulo y examen Architect).'
      ]} />

      <SectionTitle>Ejemplo práctico: reconocer un sitio AEM desde el navegador</SectionTitle>
      <Paragraph>{'Todavía no instalamos AEM (eso llega en [[ch-4]]), pero ya puedes practicar leyendo sitios reales. Los sitios AEM dejan "huellas" en su HTML: rutas de clientlibs, atributos de Core Components, rutas del DAM o los scripts de Edge Delivery Services. Este script las busca por ti.'}</Paragraph>
      <Paragraph>{'**Requisitos:** un navegador basado en Chromium (Chrome, Edge) o Firefox. No se instala nada.'}</Paragraph>
      <List items={[
        '**Paso 1.** Abre el sitio que quieras analizar y espera a que cargue por completo.',
        '**Paso 2.** Abre las DevTools con `F12` (o `Ctrl+Shift+I` en Windows/Linux, `Cmd+Option+I` en macOS) y ve a la pestaña **Console**.',
        '**Paso 3.** Si el navegador bloquea el pegado de código, escribe `allow pasting` y pulsa Enter (Chrome lo pide la primera vez como medida de seguridad).',
        '**Paso 4.** Pega el script, pulsa Enter y revisa la tabla de señales y el veredicto.'
      ]} />
      <CodeBlock filename="detector-aem.js (consola del navegador)" language="javascript" code={detectorScript} />
      <Paragraph>{'Qué hace cada parte:'}</Paragraph>
      <List items={[
        '`(() => { ... })();` es una función que se ejecuta de inmediato. Así sus variables no ensucian el ámbito global de la página que analizas.',
        '`has(selector)` es un atajo: devuelve `true` si existe al menos un elemento que coincide con el selector CSS.',
        '`clientlibs` busca hojas de estilo o scripts servidos desde `/etc.clientlibs/`, la ruta pública de las **Client Libraries** de AEM Sites (las verás en [[ch-24]]).',
        '`coreComponents` busca los atributos `data-cmp-is` y `data-cmp-data-layer` que añaden los **Core Components** de Adobe ([[ch-19]]).',
        '`damAssets` busca imágenes servidas desde `/content/dam/`, la carpeta del repositorio donde vive el DAM de AEM Assets.',
        '`dataLayer` revisa si existe `window.adobeDataLayer`, la capa de datos (Adobe Client Data Layer) que usan los Core Components para analítica.',
        '`edgeDelivery` busca `scripts/aem.js` (o su nombre anterior `lib-franklin.js`), el script base de todo proyecto de Edge Delivery Services ([[ch-109]]).',
        'El bloque `if / else if` decide un veredicto: EDS tiene prioridad porque un sitio EDS puede mostrar imágenes del DAM sin ser AEM Sites clásico.',
        '`console.table(signals)` muestra las señales en una tabla legible y la función devuelve el veredicto para que la consola lo imprima.'
      ]} />
      <Alert type="caution" title="Es una heurística, no una prueba">
        {'Un sitio puede reescribir sus rutas en el Dispatcher o la CDN (por ejemplo, ocultar `/content/dam/`), así que una señal ausente no descarta AEM. Y nunca pegues en la consola scripts que no entiendes: la consola ejecuta código con tus sesiones iniciadas en ese sitio.'}
      </Alert>

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <Paragraph>{'**Parte A · Diagnóstico.** Ejecuta el detector en `https://www.aem.live` (el sitio de documentación de Edge Delivery Services, construido con la propia tecnología) y en al menos otros tres sitios de marcas grandes que elijas. Anota para cada uno: las señales en `true`, el veredicto y qué modelo de despliegue crees que usa.'}</Paragraph>
      <Paragraph>{'**Parte B · Decisión.** Una aseguradora corre hoy AEM 6.5 on-premise con Java 11 y fuertes personalizaciones en `/libs`. Su equipo de marketing quiere lanzar landings de campaña en días, no semanas, y el área legal exige mantener los datos de clientes en su propio centro de datos durante 2 años más. ¿Qué recomendarías para los próximos 2 años y para después?'}</Paragraph>
      <Alert type="tip" title="Solución sugerida">
        {'**Parte A:** en aem.live deberías ver `edgeDelivery: true` y el veredicto "Edge Delivery Services". **Parte B:** a corto plazo, actualizar in-place a **AEM 6.5 LTS** (Java 17/21 y soporte extendido) y limpiar las personalizaciones de `/libs`, que además bloquearían una migración futura. Para las landings, evaluar **Edge Delivery Services**, ya que no expone datos de clientes y lo opera un equipo frontend. Cuando termine la restricción legal, planear la migración a **AEM as a Cloud Service** ([[ch-145]]).'}
      </Alert>

      <SectionTitle>Buenas prácticas y errores comunes</SectionTitle>
      <List items={[
        '**Error:** pensar que Cloud Service es "AEM 6.5 instalado en la nube". Cambian el despliegue, el repositorio inmutable, el escalado y la forma de configurar. Diseña para Cloud desde el inicio.',
        '**Error:** personalizar archivos dentro de `/libs`. Se pierden con cada actualización y en Cloud Service ni siquiera es posible. Usa overlays o herencia de componentes ([[ch-20]], [[ch-64]]).',
        '**Error:** comparar AEM con WordPress solo por precio. Compiten en segmentos distintos: la pregunta correcta es qué gobernanza, escala e integraciones necesita el negocio.',
        '**Buena práctica:** identifica el modelo de despliegue y la versión exacta (Service Pack o release de Cloud) antes de elegir librerías, versión de Java o arquetipo.',
        '**Buena práctica:** consulta primero la documentación oficial (Experience League, Adobe Developer, aem.live). Muchos blogs describen versiones antiguas.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['AEM', 'Adobe Experience Manager'],
          ['AEMaaCS', 'AEM as a Cloud Service'],
          ['LTS', 'Long-Term Support: rama de 6.5 con soporte extendido y Java 17/21'],
          ['AMS', 'Adobe Managed Services: AEM 6.5 hospedado y operado por Adobe'],
          ['EDS', 'Edge Delivery Services'],
          ['DAM', 'Digital Asset Management (AEM Assets)'],
          ['JCR', 'Java Content Repository, implementado por Apache Jackrabbit Oak'],
          ['DXP', 'Digital Experience Platform'],
          ['CQ5', 'Nombre original del producto antes de llamarse AEM']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Introducción a AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/overview/introduction' },
        { type: 'image', title: 'Understanding AEM Sites offerings and differences', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/perspectives/understanding-aem-sites-offerings-and-differences' },
        { type: 'image', title: 'AEM 6.5 LTS: preguntas frecuentes', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65-lts/content/release-notes/faq' },
        { type: 'image', title: 'Notas de la release actual de AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/release-notes/release-notes/release-notes-current' },
        { type: 'image', title: 'Documentación de Edge Delivery Services', source: 'aem.live', url: 'https://www.aem.live/docs/' }
      ]} />
    </LessonPage>
  );
}
