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

const rootTree = `practica/
├── .cloudmanager/java-version   ← "21": Java que usa Cloud Manager
├── .gitattributes / .gitignore
├── AGENTS.md / CLAUDE.md        ← instrucciones para asistentes de programación con IA
├── README.md / LICENSE
├── archetype.properties         ← parámetros con los que se generó el proyecto
├── pom.xml                      ← POM raíz
├── core/                        ← Java (bundle OSGi)
├── ui.apps/                     ← /apps: componentes, clientlibs, i18n
├── ui.apps.structure/           ← raíces del repositorio que el proyecto controla
├── ui.config/                   ← configuraciones OSGi por run mode
├── ui.content/                  ← /content y /conf iniciales
├── ui.frontend/                 ← webpack: SCSS/TS → clientlibs
├── all/                         ← paquete contenedor desplegable
├── dispatcher/                  ← configuración del Dispatcher (Cloud)
├── it.tests/                    ← pruebas de integración
└── ui.tests/                    ← pruebas de interfaz (Cypress)`;

const rootProps = `<properties>
    <aem.host>localhost</aem.host>
    <aem.port>4502</aem.port>
    <aem.publish.host>localhost</aem.publish.host>
    <aem.publish.port>4503</aem.publish.port>
    <sling.user>admin</sling.user>
    <sling.password>admin</sling.password>
    <vault.user>admin</vault.user>
    <vault.password>admin</vault.password>
    <frontend-maven-plugin.version>1.12.0</frontend-maven-plugin.version>
    <core.wcm.components.version>2.28.0</core.wcm.components.version>
    <aem.sdk.api>2026.9.28386.20260923T071724Z-260900</aem.sdk.api>
    <componentGroupName>Sitio de Practica</componentGroupName>
</properties>`;

const coreTree = `core/src/main/java/com/practica/core/
├── models/HelloWorldModel.java        ← Sling Model del componente Hello World
├── servlets/SimpleServlet.java        ← ejemplo de servlet
├── filters/LoggingFilter.java         ← ejemplo de Sling Filter
├── listeners/SimpleResourceListener.java ← reacciona a cambios en el repositorio
├── schedulers/SimpleScheduledTask.java   ← tarea programada
└── */package-info.java                ← versión de cada paquete exportado

core/src/test/java/com/practica/core/
├── models/HelloWorldModelTest.java    ← una prueba por clase de ejemplo
├── ...
└── testcontext/AppAemContext.java     ← contexto de pruebas con AEM Mocks`;

const packageInfo = `@Version("1.0")
package com.practica.core.models;

import org.osgi.annotation.versioning.Version;`;

const bndConfig = `<bnd><![CDATA[
Import-Package: javax.annotation;version=0.0.0,*
]]></bnd>`;

const appsTree = `ui.apps/src/main/content/
├── META-INF/vault/filter.xml
└── jcr_root/
    ├── apps/practica/
    │   ├── components/          ← title, text, image, teaser, page... y helloworld
    │   │   └── helloworld/
    │   │       ├── .content.xml
    │   │       ├── _cq_dialog/  ← el diálogo (nodo cq:dialog)
    │   │       └── helloworld.html
    │   ├── clientlibs/          ← clientlib-base, clientlib-dependencies, clientlib-grid, clientlib-site
    │   └── i18n/                ← diccionarios de traducción
    ├── apps/sling/servlet/errorhandler/  ← página 404 (includeErrorHandler=y)
    └── _oak_index/diff.index    ← definición de índices`;

const proxyXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
    xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Title"
    sling:resourceSuperType="core/wcm/components/title/v3/title"
    componentGroup="Sitio de Practica - Content"/>`;

const appsFilter = `<workspaceFilter version="1.0">
    <filter root="/apps/practica/clientlibs"/>
    <filter root="/apps/practica/components"/>
    <filter root="/apps/practica/i18n"/>
    <filter root="/apps/sling" />
    <filter root="/oak:index/diff.index"/>
</workspaceFilter>`;

const repoinit = `{
    "scripts": [
        "create path (sling:OrderedFolder) /content/dam/practica",
        "create path (nt:unstructured) /content/dam/practica/jcr:content",
        "set properties on /content/dam/practica/jcr:content\\n  set cq:conf{String} to /conf/practica\\n  set jcr:title{String} to \\"Sitio de Practica\\"\\nend"
    ]
}`;

const configTree = `ui.config/src/main/content/jcr_root/apps/practica/osgiconfig/
├── config/                              ← aplica en TODAS las instancias
│   ├── org.apache.sling.commons.log.LogManager.factory.config~practica.cfg.json
│   ├── org.apache.sling.jcr.repoinit.RepositoryInitializer~practica.cfg.json
│   └── com.adobe.cq.wcm.core.components.internal.servlets.TableOfContentsFilter~practica.cfg.json
└── config.author/                       ← aplica SOLO en Author
    ├── com.adobe.granite.cors.impl.CORSPolicyImpl~practica.cfg.json
    └── com.day.cq.wcm.mobile.core.impl.MobileEmulatorProvider~practica.cfg.json`;

const contentFilter = `<workspaceFilter version="1.0">
    <filter root="/conf/practica" mode="merge"/>
    <filter root="/content/practica" mode="merge"/>
    <filter root="/content/dam/practica" mode="merge">
        <exclude pattern="/content/dam/practica(/.*)?"/>
        <include pattern="/content/dam/practica/jcr:content(/.*)?"/>
    </filter>
    <filter root="/content/dam/practica/asset.jpg" mode="merge"/>
    <filter root="/content/experience-fragments/practica" mode="merge"/>
</workspaceFilter>`;

const contentTree = `/conf/practica/settings/wcm/
├── templates/page-content          ← plantilla editable de páginas
├── templates/xf-web-variation      ← plantilla de Experience Fragments
├── template-types/                 ← tipos de plantilla (page, xf...)
├── policies/                       ← políticas: componentes y estilos permitidos
└── segments/                       ← segmentos de ejemplo para personalización
/content/practica/mx/es             ← página inicial del sitio (y páginas de ejemplo)
/content/experience-fragments/practica/mx/es/site  ← header y footer como XF
/content/dam/practica/asset.jpg     ← un asset de ejemplo`;

const npmScripts = `"scripts": {
  "dev": "webpack --env dev --config ./webpack.dev.js && clientlib --verbose",
  "prod": "webpack --config ./webpack.prod.js && clientlib --verbose",
  "start": "webpack-dev-server --open --config ./webpack.dev.js",
  "sync": "aemsync -d -p ../ui.apps/src/main/content",
  "chokidar": "chokidar -c \\"clientlib\\" ./dist",
  "aemsyncro": "aemsync -w ../ui.apps/src/main/content",
  "watch": "npm-run-all --parallel start chokidar aemsyncro"
}`;

const allEmbeds = `<packageType>container</packageType>
<embeddeds>
    <embedded>
        <artifactId>practica.ui.apps</artifactId>
        <target>/apps/practica-packages/application/install</target>
    </embedded>
    <embedded>
        <artifactId>practica.core</artifactId>
        <target>/apps/practica-packages/application/install</target>
    </embedded>
    <embedded>
        <artifactId>practica.ui.content</artifactId>
        <target>/apps/practica-packages/content/install</target>
    </embedded>
    <embedded>
        <artifactId>practica.ui.config</artifactId>
        <target>/apps/practica-packages/application/install</target>
    </embedded>
</embeddeds>`;

const dispatcherTree = `dispatcher/src/
├── conf.d/                         ← configuración de Apache
│   ├── available_vhosts/default.vhost
│   ├── enabled_vhosts/             ← enlaces a los vhosts activos
│   ├── rewrites/rewrite.rules      ← tus reglas de reescritura
│   ├── variables/custom.vars       ← tus variables
│   └── dispatcher_vhost.conf       ← inmutable
├── conf.dispatcher.d/              ← configuración del módulo Dispatcher
│   ├── available_farms/default.farm
│   ├── enabled_farms/
│   ├── cache/rules.any             ← tus reglas de caché
│   ├── filters/filters.any         ← tus filtros de seguridad
│   ├── clientheaders/, renders/, virtualhosts/
│   └── default_*.any / dispatcher.any ← inmutables
└── opt-in/USE_SOURCES_DIRECTLY`;

const windowsError = `[ERROR] Failed to execute goal org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate
(default-cli) on project standalone-pom: java.nio.file.FileSystemException:
...\\practica\\dispatcher\\src\\conf.d\\enabled_vhosts\\default.vhost:
El cliente no dispone de un privilegio requerido.`;

export default function Chapter09({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-9"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Recorrer, archivo por archivo, el proyecto que genera el AEM Project Archetype 58.',
        'Saber qué va en cada módulo, a qué parte del repositorio llega y quién lo edita (frontend o backend).',
        'Entender cómo se conectan los módulos al compilar y cómo se empaquetan en uno solo.',
        'Leer los archivos clave: POM raíz, `filter.xml`, `.content.xml`, configuraciones OSGi, repoinit y scripts de npm.',
        'Reconocer qué archivos puedes modificar y cuáles no (por ejemplo, los inmutables del Dispatcher).'
      ]} />
      <Alert type="info" title="Cómo se preparó este tema">
        {'Todo lo que ves aquí sale de un proyecto **generado de verdad** con el archetype 58 (`appId=practica`, `aemVersion=cloud`, `language=es`, `country=mx`), no de memoria. Genera el tuyo con el [[ch-8]] y ábrelo en tu IDE para seguir el recorrido.'}
      </Alert>

      <SectionTitle>Vista general</SectionTitle>
      <CodeBlock filename="raíz del proyecto" language="text" code={rootTree} />
      <FlowDiagram
        caption="Cómo fluye el build: cada módulo produce un artefacto y all los reúne en un único paquete para AEM."
        steps={[
          { title: 'ui.frontend', detail: 'SCSS/TS → CSS/JS → clientlibs', tone: 'cyan' },
          { title: 'ui.apps', detail: 'Componentes + clientlibs → paquete', tone: 'primary' },
          { title: 'core · ui.config · ui.content', detail: 'Bundle Java y paquetes de configuración y contenido', tone: 'purple' },
          { title: 'all', detail: 'Paquete contenedor con todo', tone: 'success' },
          { title: 'AEM', detail: 'Instala y reparte cada paquete', tone: 'warning' }
        ]}
        connectors={['copia a', '', 'se incrustan en', 'se despliega en']}
      />
      <DataTable
        headers={['Módulo', 'Produce', 'Llega a', 'Lo edita', 'En Cloud Service']}
        rows={[
          ['`core`', 'Bundle OSGi (`jar` procesado con bnd)', 'Registro OSGi', 'Backend', 'Código inmutable'],
          ['`ui.apps`', 'Paquete de contenido tipo `application`', '`/apps`, `/oak:index`', 'Frontend y backend', 'Inmutable'],
          ['`ui.apps.structure`', 'Paquete (solo metadatos)', 'No instala nada: declara raíces', 'Arquitectura', '—'],
          ['`ui.config`', 'Paquete tipo `container`', '`/apps/practica/osgiconfig`', 'Backend', 'Inmutable'],
          ['`ui.content`', 'Paquete tipo `content`', '`/content`, `/conf`', 'Backend y autores (contenido inicial)', 'Mutable'],
          ['`ui.frontend`', 'Nada propio: genera archivos en `ui.apps`', '(vía `ui.apps`)', 'Frontend', '—'],
          ['`all`', 'Paquete tipo `container`', 'Reparte los demás', 'Nadie (solo al agregar módulos)', 'Es lo que se despliega'],
          ['`dispatcher`', 'Zip de configuración', 'Servidor Apache/Dispatcher', 'Backend / DevOps', 'Parte inmutable + parte editable'],
          ['`it.tests` / `ui.tests`', 'Pruebas', 'Se ejecutan contra una instancia', 'QA / desarrollo', 'Pasos de prueba de Cloud Manager']
        ]}
      />

      <SectionTitle>Los archivos de la raíz</SectionTitle>
      <Paragraph>{'**`pom.xml` raíz.** Declara los módulos, las versiones de todo (API de AEM, Core Components, plugins) y los perfiles de despliegue. Sus propiedades son lo primero que conviene conocer:'}</Paragraph>
      <CodeBlock filename="pom.xml (propiedades, fragmento real)" language="xml" code={rootProps} />
      <List items={[
        '`aem.host` / `aem.port` y `aem.publish.host` / `aem.publish.port` son el destino de los perfiles de despliegue: por eso los puertos 4502 y 4503 de [[ch-4]] importan.',
        '`sling.user` / `vault.user` y sus contraseñas son las credenciales con las que Maven instala en AEM. En local, `admin`/`admin`. Si cambias la contraseña de admin, cámbiala aquí (o pásala por línea de comandos con `-Dvault.password=...`).',
        '`core.wcm.components.version` es la versión de los Core Components.',
        '`aem.sdk.api` es la versión exacta del SDK de Cloud contra la que compilas; el archetype puso la más reciente al generar.',
        '`componentGroupName` es el nombre del grupo en que aparecen tus componentes en el editor.'
      ]} />
      <Alert type="warning" title="Dos detalles reales que conviene revisar">
        {'(1) El compilador está configurado con `<release>11</release>`: el código se compila para ser compatible con Java 11, aunque Cloud Manager usa Java 21 (`.cloudmanager/java-version`). Funciona, pero no puedes usar sintaxis de Java más nueva sin subir ese valor. (2) El `frontend-maven-plugin` fija **Node v16.17.0**, una versión que ya no tiene soporte. Muchos equipos la actualizan a una LTS vigente y verifican que el build siga pasando; mientras tanto, usa esa misma versión con nvm al trabajar en `ui.frontend` ([[ch-3]]).'}
      </Alert>
      <DataTable
        headers={['Archivo', 'Para qué sirve']}
        rows={[
          ['`.cloudmanager/java-version`', 'Contiene `21`: la versión de Java con la que Cloud Manager compila'],
          ['`archetype.properties`', 'Guarda los parámetros exactos con los que se generó el proyecto. Útil para regenerar o comparar'],
          ['`AGENTS.md` y `CLAUDE.md`', 'Instrucciones para asistentes de programación con IA: describe módulos, comandos de build y documentación oficial recomendada. También es un buen resumen para personas'],
          ['`.gitignore` / `.gitattributes`', 'Qué no versionar (carpetas `target`, `node_modules`) y cómo tratar finales de línea'],
          ['`README.md`', 'Instrucciones del proyecto, incluidos los comandos de build']
        ]}
      />

      <SectionTitle>core: el código Java</SectionTitle>
      <CodeBlock filename="estructura de core" language="text" code={coreTree} />
      <List items={[
        'Cada carpeta es un tipo de pieza de backend que estudiarás más adelante: Sling Models ([[ch-45]]), servlets ([[ch-50]]), filtros ([[ch-42]]), listeners ([[ch-67]]) y tareas programadas ([[ch-65]]).',
        'Cada clase de ejemplo tiene su prueba unitaria en `src/test`, escrita con JUnit 5, Mockito y **AEM Mocks** de wcm.io ([[ch-123]]).',
        'El POM de `core` no declara `packaging` (por lo tanto es `jar`): el **bnd-maven-plugin** agrega al jar el `MANIFEST.MF` de OSGi que estudiaste en [[ch-7]], convirtiéndolo en bundle.'
      ]} />
      <CodeBlock filename="core/src/main/java/com/practica/core/models/package-info.java" language="java" code={packageInfo} />
      <List items={[
        'Cada paquete Java tiene un `package-info.java` con `@Version`: es la versión con la que ese paquete se **exporta** a otros bundles.',
        'El plugin `bnd-baseline-maven-plugin` compara tus cambios con la versión anterior y avisa si rompiste la compatibilidad sin subir la versión.',
        'Regla práctica: si solo agregas cosas, sube el número menor (1.0 → 1.1); si cambias o quitas algo existente, sube el mayor (1.x → 2.0).'
      ]} />
      <CodeBlock filename="core/pom.xml (configuración de bnd)" language="xml" code={bndConfig} />
      <List items={[
        'Esta instrucción ajusta el `Import-Package` que bnd calcula a partir de tu código.',
        '`javax.annotation;version=0.0.0` acepta cualquier versión del paquete de anotaciones (por ejemplo `@PostConstruct`).',
        '`*` importa todo lo demás que el código use, con los rangos que bnd calcule. Aquí se corrigen los problemas de "Cannot be resolved" que viste en [[ch-7]].'
      ]} />

      <SectionTitle>ui.apps: lo que va a /apps</SectionTitle>
      <CodeBlock filename="estructura de ui.apps" language="text" code={appsTree} />
      <Paragraph>{'**Los nombres con guion bajo.** En disco no se pueden usar dos puntos en nombres de carpeta en todos los sistemas operativos, así que FileVault los codifica:'}</Paragraph>
      <DataTable
        headers={['En disco', 'En el repositorio']}
        rows={[
          ['`_cq_dialog`', '`cq:dialog`'],
          ['`_jcr_content`', '`jcr:content`'],
          ['`_oak_index`', '`oak:index`'],
          ['`_cq_template`', '`cq:template`'],
          ['`.content.xml` dentro de una carpeta', 'Las propiedades del nodo que representa esa carpeta']
        ]}
      />
      <Paragraph>{'**Componentes proxy.** Casi todos los componentes de `ui.apps` son **proxies**: no tienen código propio, solo apuntan a un Core Component de Adobe. Así se ve el del título:'}</Paragraph>
      <CodeBlock filename="ui.apps/.../components/title/.content.xml" language="xml" code={proxyXml} />
      <List items={[
        '`jcr:primaryType="cq:Component"`: este nodo es la definición de un componente.',
        '`jcr:title="Title"`: el nombre que ve el autor en la lista de componentes.',
        '`sling:resourceSuperType`: **hereda** todo (HTL, diálogo, Sling Model) del Core Component Title versión 3. Es la forma recomendada de usar Core Components ([[ch-19]], [[ch-20]]).',
        '`componentGroup`: el grupo donde aparece en el editor, que viene de `componentGroupName`.',
        '¿Por qué un proxy y no usar directamente el de Adobe? Porque tus páginas quedan apuntando a **tu** componente: si mañana cambias de versión o lo personalizas, lo haces en un solo lugar.'
      ]} />
      <Paragraph>{'El componente **helloworld** sí tiene código propio: un `helloworld.html` (HTL) que muestra la propiedad `text` guardada por su diálogo (`_cq_dialog`) y un mensaje calculado por `HelloWorldModel.java` en `core`. Es el ejemplo completo de "diálogo → propiedades → HTL → Sling Model" que viste en el [[ch-5]] y que programarás en el Módulo 3 ([[ch-16]], [[ch-17]]).'}</Paragraph>
      <CodeBlock filename="ui.apps/src/main/content/META-INF/vault/filter.xml" language="xml" code={appsFilter} />
      <List items={[
        'El paquete solo **controla** estas ramas: clientlibs, componentes, i18n, el manejador de errores de Sling y su índice.',
        'Como es código, se usa el modo por defecto (**replace**): al desplegar, esas ramas quedan exactamente como están en Git.',
        'Nota que **no** incluye `/apps/practica` entero: `osgiconfig` pertenece a `ui.config`. Dos paquetes nunca deben controlar la misma ruta.'
      ]} />

      <SectionTitle>ui.apps.structure: las raíces del repositorio</SectionTitle>
      <Paragraph>{'Este módulo no instala nada. Solo declara, con filtros, qué ramas del repositorio "existen" para el proyecto: `/apps`, `/apps/practica`, `/apps/sling`, `/apps/cq`, `/content/dam/practica`, `/oak:index`, entre otras. `ui.apps` lo referencia como `repositoryStructurePackage`, y al compilar el plugin de FileVault valida que cada ruta de tus paquetes cuelgue de una raíz conocida. Sirve para detectar en el build, y no al desplegar en Cloud, errores de paquetes que intentan crear rutas donde no deben.'}</Paragraph>

      <SectionTitle>ui.config: configuraciones OSGi</SectionTitle>
      <CodeBlock filename="estructura de ui.config" language="text" code={configTree} />
      <List items={[
        'Las carpetas `config.<run mode>` deciden **dónde** aplica cada archivo: `config` en todas las instancias, `config.author` solo en Author. También existen `config.publish`, `config.dev`, `config.stage`, `config.prod` y combinaciones como `config.author.prod` ([[ch-39]]).',
        'Los nombres siguen la regla que viste en [[ch-7]]: `<PID>.cfg.json` o, para factories, `<PID>~<nombre>.cfg.json`. El archetype ya nombra las instancias `~practica`.',
        'El logger `LogManager.factory.config~practica` registra el paquete `com.practica` en nivel INFO dentro de `logs/error.log`: es el mismo tipo de configuración que creaste a mano en la Web Console.'
      ]} />
      <Paragraph>{'**Repoinit.** Una configuración especial ejecuta instrucciones que crean estructuras y permisos en el repositorio al arrancar o desplegar:'}</Paragraph>
      <CodeBlock filename="org.apache.sling.jcr.repoinit.RepositoryInitializer~practica.cfg.json" language="json" code={repoinit} />
      <List items={[
        '`create path (sling:OrderedFolder) /content/dam/practica` crea la carpeta del DAM del sitio si no existe, con ese tipo de nodo.',
        '`create path (nt:unstructured) .../jcr:content` crea su nodo de propiedades.',
        '`set properties on ... end` asigna propiedades: `cq:conf` vincula la carpeta del DAM con la configuración del sitio en `/conf/practica`, y `jcr:title` le da un título.',
        'Repoinit es idempotente (ejecutarlo varias veces no duplica nada) y es la forma recomendada de crear **service users** y permisos ([[ch-44]]).'
      ]} />

      <SectionTitle>ui.content: el contenido inicial</SectionTitle>
      <CodeBlock filename="lo que crea ui.content en el repositorio" language="text" code={contentTree} />
      <CodeBlock filename="ui.content/src/main/content/META-INF/vault/filter.xml" language="xml" code={contentFilter} />
      <List items={[
        '`mode="merge"` es la diferencia clave con `ui.apps`: en modo **merge**, al desplegar solo se agrega lo que **no existe**; lo que ya está en el repositorio **no se toca**. Así, cada despliegue no borra las páginas ni los cambios que hicieron los autores (recuerda el peligro del modo replace del [[ch-6]]).',
        'En `/content/dam/practica`, el `exclude` deja fuera todo el DAM y el `include` vuelve a incluir solo su `jcr:content`: el paquete gestiona la configuración de la carpeta, pero nunca los assets que suban los autores.',
        'Las plantillas y políticas de `/conf/practica` se estudian en [[ch-30]]; los Experience Fragments de header y footer en [[ch-33]].',
        'Además de la página inicial, el archetype crea algunas páginas de ejemplo (búsqueda, cuenta, productos) que puedes borrar si no las necesitas.'
      ]} />

      <SectionTitle>ui.frontend: CSS y JavaScript</SectionTitle>
      <List items={[
        '`src/main/webpack/` contiene tu SCSS y TypeScript: un archivo por componente (`components/_title.scss`, `_helloworld.js`...) más estilos globales.',
        '`webpack.common.js`, `webpack.dev.js` y `webpack.prod.js` definen cómo se compila en desarrollo y en producción ([[ch-25]]).',
        '`clientlib.config.js` indica cómo se copia el resultado a `ui.apps`: genera `clientlib-dependencies` (categoría `practica.dependencies`) y `clientlib-site` (categoría `practica.site`) ([[ch-24]]).',
        '`package.json` define las dependencias de npm y los scripts:'
      ]} />
      <CodeBlock filename="ui.frontend/package.json (scripts, real)" language="json" code={npmScripts} />
      <DataTable
        headers={['Script', 'Qué hace', 'Recomendación']}
        rows={[
          ['`npm run dev`', 'Compila sin minificar (con source maps) y genera las clientlibs en `ui.apps`', 'Úsalo para desarrollar'],
          ['`npm run prod`', 'Compila optimizado para producción', 'Lo ejecuta el build de Maven'],
          ['`npm start`', 'Servidor de desarrollo de webpack con recarga en caliente', 'Para maquetar sin depender de AEM'],
          ['`npm run sync`, `aemsyncro` y `watch`', 'Usan **aemsync** para enviar cambios a AEM automáticamente', '**Evítalos** (ver advertencia)']
        ]}
      />
      <Alert type="warning" title="El archetype trae scripts con aemsync">
        {'Los scripts `sync`, `aemsyncro` y `watch` dependen de **aemsync**, la herramienta que en la práctica tiende a corromper la instancia local ([[ch-3]]). En su lugar: compila con `npm run dev` y envía la carpeta de la clientlib a AEM con **VSCode AEM Sync** (clic derecho → exportar), o despliega con Maven. El flujo completo lo armamos en [[ch-15]].'}
      </Alert>

      <SectionTitle>all: el paquete que se despliega</SectionTitle>
      <CodeBlock filename="all/pom.xml (fragmento real)" language="xml" code={allEmbeds} />
      <List items={[
        '`packageType container` significa que este paquete no tiene contenido propio: **contiene otros paquetes**.',
        'Cada `embedded` incrusta un módulo en una carpeta `install` dentro de `/apps/practica-packages`. AEM detecta los paquetes y bundles en carpetas `install` y los instala automáticamente.',
        'El código (`ui.apps`, `core`, `ui.config`) va a `application/install` y el contenido (`ui.content`) a `content/install`: Cloud Service trata distinto ambos tipos.',
        'Aquí se definen los perfiles `autoInstallSinglePackage` y `autoInstallSinglePackagePublish` que usaste en [[ch-8]], y aquí corre el **AEM Analyser**, que valida el proyecto con las mismas reglas que Cloud Manager.'
      ]} />

      <SectionTitle>dispatcher: la configuración del servidor web</SectionTitle>
      <CodeBlock filename="estructura del módulo dispatcher (variante Cloud)" language="text" code={dispatcherTree} />
      <List items={[
        '`conf.d` es la configuración de Apache (hosts virtuales, reescrituras, variables); `conf.dispatcher.d`, la del módulo Dispatcher (granjas, caché, filtros).',
        'Los archivos `default_*` y algunos otros son **inmutables**: los provee Adobe y el build falla si los cambias. Tus cambios van en los archivos editables: `filters.any`, `rules.any`, `rewrite.rules`, `custom.vars`...',
        '`enabled_vhosts` y `enabled_farms` contienen **enlaces simbólicos** hacia `available_*`: así se activan hosts y granjas.',
        'Lo estudiaremos a fondo con un Dispatcher corriendo en tu equipo ([[ch-79]], [[ch-81]]).'
      ]} />
      <Paragraph>{'Esos enlaces simbólicos explican el error que advierte el README del archetype en Windows. Al preparar este tema lo reprodujimos en una terminal sin permisos de administrador:'}</Paragraph>
      <CodeBlock filename="error real al generar en Windows sin permisos" language="text" code={windowsError} />
      <Paragraph>{'La solución recomendada es generar desde una terminal **con permisos de administrador** o desde **WSL**. En algunos equipos también funciona activar el **Modo de desarrollador** de Windows, que habilita la creación de enlaces simbólicos sin ser administrador. Si solo quieres estudiar el resto del proyecto, puedes generar con `-DincludeDispatcherConfig=n`.'}</Paragraph>

      <SectionTitle>it.tests y ui.tests</SectionTitle>
      <DataTable
        headers={['Módulo', 'Qué contiene', 'Cuándo se ejecuta']}
        rows={[
          ['`it.tests`', 'Pruebas de integración en Java con AEM Testing Clients (por ejemplo `CreatePageIT` y `GetPageIT`), que hacen peticiones HTTP a una instancia', 'En Cloud Manager, en el paso *Custom Functional Testing*'],
          ['`ui.tests`', 'Pruebas de extremo a extremo con **Cypress** en un contenedor Docker', 'En Cloud Manager, en el paso *Custom UI Testing*']
        ]}
      />
      <Paragraph>{'Ambos se tratan en [[ch-125]]. Por ahora basta saber que no forman parte de lo que se instala en AEM.'}</Paragraph>

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** En tu proyecto, abre `archetype.properties` y comprueba los valores con los que lo generaste.',
        '**2.** Encuentra en `ui.apps` el proxy del componente **Teaser** y anota de qué Core Component y versión hereda.',
        '**3.** Busca en qué módulo y archivo está la configuración que define el nivel de log de `com.practica`, y en qué run mode aplica.',
        '**4.** En `ui.content`, explica con tus palabras por qué `/content/practica` usa `mode="merge"`.',
        '**5.** Cambia en `ui.apps` el `jcr:title` del proxy **Title** a "Título del sitio", despliega solo `ui.apps` con `mvn clean install -pl ui.apps -PautoInstallPackage` y comprueba en el editor que el componente cambió de nombre.'
      ]} />
      <Alert type="tip" title="Solución">
        {'(2) En `ui.apps/.../components/teaser/.content.xml`, la propiedad `sling:resourceSuperType` apunta a `core/wcm/components/teaser/v2/teaser` (Teaser versión 2). (3) `ui.config/.../osgiconfig/config/org.apache.sling.commons.log.LogManager.factory.config~practica.cfg.json`, en la carpeta `config`, es decir, en todos los run modes. (4) Para que desplegar no borre ni sobrescriba el contenido que ya crearon los autores. (5) `-pl ui.apps` construye solo ese módulo y el perfil `autoInstallPackage` instala su paquete; en la lista de componentes del editor verás el nombre nuevo. Si el build se queja de dependencias, ejecuta antes un `mvn clean install` completo.'}
      </Alert>

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Respeta la separación: código en `ui.apps` y `core`, configuración en `ui.config`, contenido inicial en `ui.content`. Mezclarlos rompe el despliegue en Cloud Service.',
        'Dos paquetes nunca deben controlar la misma ruta en sus `filter.xml`.',
        'Crea tus componentes como proxies de Core Components siempre que puedas.',
        'Nombra las instancias de factory configurations de forma explícita (`~practica`).',
        'Usa repoinit para estructuras y permisos, en lugar de crearlos a mano o dentro de `ui.content`.',
        'No edites los archivos inmutables del Dispatcher.'
      ]} />

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'El proyecto tiene módulos con responsabilidades separadas; `all` los reúne en un único paquete contenedor.',
        '`core` es un jar convertido en bundle OSGi por bnd; cada paquete exportado se versiona con `package-info.java`.',
        '`ui.apps` lleva el código a `/apps` en modo replace; `ui.content` lleva el contenido inicial en modo merge.',
        'Los componentes del sitio son proxies de Core Components mediante `sling:resourceSuperType`.',
        '`ui.config` organiza las configuraciones OSGi por run mode; repoinit crea estructuras y permisos.',
        '`ui.frontend` compila SCSS/TS y genera clientlibs; sus scripts con aemsync conviene evitarlos.',
        'El Dispatcher tiene archivos inmutables y editables, y usa enlaces simbólicos que en Windows requieren permisos.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Componente proxy', 'Componente del proyecto que hereda de un Core Component con `sling:resourceSuperType`'],
          ['`packageType`', 'Tipo de paquete: `application` (código), `content`, `container` (contiene otros)'],
          ['Modo `merge`', 'Al instalar, solo agrega lo que no existe; no sobrescribe'],
          ['Repoinit', 'Lenguaje para crear rutas, usuarios y permisos en el repositorio de forma declarativa'],
          ['bnd', 'Herramienta que genera los metadatos OSGi de un bundle'],
          ['AEM Analyser', 'Validación del proyecto con las reglas de Cloud Service durante el build'],
          ['Repository structure package', 'Paquete que declara las raíces del repositorio que usa el proyecto']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Estructura de proyecto AEM (paquetes de contenido)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-project-content-package-structure' },
        { type: 'image', title: 'AEM Project Archetype', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' },
        { type: 'image', title: 'Repoinit', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/repository-initialization.html' },
        { type: 'image', title: 'Filtros de FileVault', source: 'Apache Jackrabbit', url: 'https://jackrabbit.apache.org/filevault/filter.html' },
        { type: 'image', title: 'AEM ui.frontend module Complete Guide', source: 'Medium · Imran Khan', url: 'https://medium.com/@toimrank/aem-ui-frontend-module-complete-guide-265175c540b0' }
      ]} />
    </LessonPage>
  );
}
