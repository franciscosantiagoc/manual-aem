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

const manifest = `Bundle-SymbolicName: com.misitio.core
Bundle-Version: 1.0.0.SNAPSHOT
Export-Package: com.misitio.core.services;version="1.0.0"
Import-Package: com.day.cq.wcm.api;version="[1.29,2)",
 org.apache.sling.api.resource;version="[2.12,3)",
 org.slf4j;version="[1.7,2)"`;

const unresolved = `Imported Packages
  com.day.cq.wcm.api,version=[1.29,2) from com.day.cq.wcm.cq-wcm-api (215)
  org.apache.sling.api.resource,version=[2.12,3) from org.apache.sling.api (58)
  com.google.gson,version=[2.11,3) -- Cannot be resolved`;

const unsatisfied = `Component: com.misitio.core.services.impl.ClimaServiceImpl
State:     unsatisfied (reference)
Reference httpClientFactory
           Unsatisfied
           Service Name: org.apache.http.osgi.services.HttpClientBuilderFactory
           Cardinality: 1..1
           Policy: static`;

const configPaths = `/apps/system/config/
    com.misitio.core.services.impl.ClimaServiceImpl.config
    org.apache.sling.commons.log.LogManager.factory.config-1a2b3c4d.config`;

const loggerJson = `{
  "org.apache.sling.commons.log.level": "debug",
  "org.apache.sling.commons.log.file": "logs/misitio.log",
  "org.apache.sling.commons.log.names": ["com.misitio"],
  "org.apache.sling.commons.log.additiv": "false"
}`;

const tailLog = `# macOS / Linux
tail -f crx-quickstart/logs/misitio.log

# Windows (PowerShell)
Get-Content crx-quickstart\\logs\\misitio.log -Tail 50 -Wait`;

const recentRequest = `      0 TIMER_START{Request Processing}
     14 LOG Method=GET, PathInfo=null
     17 TIMER_START{ResourceResolution}
     84 TIMER_END{67,ResourceResolution} URI=/content/practica/es/servicios.html resolves to Resource=JcrNodeResource, type=cq:Page, path=/content/practica/es/servicios
     86 LOG Resource Path Info: SlingRequestPathInfo: path='/content/practica/es/servicios', selectorString='null', extension='html', suffix='null'
     88 TIMER_START{ServletResolution}
    412 TIMER_END{324,ServletResolution} URI=/content/practica/es/servicios.html handled by Servlet=/apps/practica/components/page/page.html
    ...
 184320 TIMER_END{184320,Request Processing} Dumping SlingRequestProgressTracker Entries`;

export default function Chapter07({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-7"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender desde cero qué son un **bundle**, un **servicio**, un **componente** y una **configuración** en OSGi.',
        'Conocer los estados de un bundle y de un componente, y qué significa cada uno.',
        'Usar la **Web Console** (`/system/console`) para diagnosticar bundles, componentes y configuraciones.',
        'Crear configuraciones y loggers desde la consola, y entender por qué en un proyecto real van en el código.',
        'Seguir una petición con **Recent Requests** y conocer las demás páginas de diagnóstico.',
        'Saber qué usar en AEM as a Cloud Service, donde la Web Console no existe.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas Author corriendo ([[ch-4]]). Todavía no escribiremos código Java: aquí aprendes a **leer** el estado del backend. Cuando programes servicios OSGi ([[ch-38]]) y sus configuraciones ([[ch-39]]), esta consola será tu herramienta principal de diagnóstico.'}
      </Alert>

      <SectionTitle>OSGi desde cero: cuatro conceptos</SectionTitle>
      <Paragraph>{'AEM no es un único programa Java monolítico: es un conjunto de cientos de módulos que se instalan, arrancan, detienen y actualizan **sin reiniciar el servidor**. La tecnología que lo permite se llama **OSGi**, y AEM usa su implementación **Apache Felix**. Una analogía útil es un teléfono: puedes instalar, actualizar o desinstalar apps sin apagarlo, y cada app tiene su propia pantalla de ajustes.'}</Paragraph>
      <DataTable
        headers={['Concepto', 'Qué es', 'Analogía', 'Ejemplo en AEM']}
        rows={[
          ['**Bundle**', 'Un archivo `.jar` con metadatos extra que declaran qué paquetes Java ofrece y cuáles necesita', 'Una app instalada', 'El módulo `core` de tu proyecto se compila como un bundle'],
          ['**Servicio**', 'Un objeto que un bundle publica en un registro central para que otros lo usen, identificado por su interfaz Java', 'Un enchufe al que otros se conectan', 'El servicio que resuelve URLs, el que envía correos'],
          ['**Componente (DS)**', 'Una clase Java que OSGi crea y conecta automáticamente con los servicios que necesita (Declarative Services)', 'Un aparato que solo se enciende si todo lo que necesita está conectado', 'Una clase anotada con `@Component`'],
          ['**Configuración**', 'Un conjunto de valores asociado a un componente mediante su **PID** (identificador persistente)', 'La pantalla de ajustes de la app', 'La URL de una API externa, el nivel de log']
        ]}
      />
      <Paragraph>{'Cada bundle declara en su archivo `META-INF/MANIFEST.MF` qué ofrece y qué necesita. No lo escribirás a mano (lo genera Maven al compilar), pero saber leerlo es clave para diagnosticar:'}</Paragraph>
      <CodeBlock filename="META-INF/MANIFEST.MF (fragmento)" language="text" code={manifest} />
      <List items={[
        '`Bundle-SymbolicName` es el nombre único del bundle; `Bundle-Version`, su versión.',
        '`Export-Package` lista los paquetes Java que este bundle **ofrece** a los demás.',
        '`Import-Package` lista los paquetes que **necesita** de otros bundles, con un **rango de versiones**: `[1.29,2)` significa "desde 1.29 incluida hasta 2 sin incluir".',
        'Si algún paquete importado no lo exporta ningún bundle instalado (o no en una versión del rango), el bundle **no puede arrancar**. Es el error de despliegue más frecuente.'
      ]} />

      <SectionTitle>El ciclo de vida de un bundle</SectionTitle>
      <FlowDiagram
        caption="Estados por los que pasa un bundle al instalarse y arrancar"
        steps={[
          { title: 'Installed', detail: 'Está en el sistema, pero sus dependencias no se resolvieron', tone: 'warning' },
          { title: 'Resolved', detail: 'Todas sus dependencias están disponibles; listo para arrancar', tone: 'cyan' },
          { title: 'Starting', detail: 'Arrancando (transitorio)', tone: 'primary' },
          { title: 'Active', detail: 'Funcionando: sus componentes pueden activarse', tone: 'success' }
        ]}
        connectors={['dependencias OK', 'start', '']}
      />
      <DataTable
        headers={['Estado', 'Qué significa', '¿Es un problema?']}
        rows={[
          ['**Active**', 'El bundle funciona', 'No: es el estado normal'],
          ['**Fragment**', 'Un fragmento que se une a otro bundle (por ejemplo, traducciones o configuración). Nunca pasa a Active', 'No'],
          ['**Resolved**', 'Tiene todo lo que necesita pero está detenido', 'Sí, si debería estar funcionando (alguien lo detuvo o falló al arrancar)'],
          ['**Installed**', 'Le falta al menos una dependencia', '**Sí**: casi siempre un `Import-Package` sin resolver'],
          ['**Stopping / Starting**', 'Transitorios', 'Solo si se quedan así mucho tiempo']
        ]}
      />

      <SectionTitle>La Web Console: qué es y dónde existe</SectionTitle>
      <Paragraph>{'La **Web Console** de Apache Felix es la interfaz de administración de OSGi en AEM. Se abre en `http://localhost:4502/system/console` y pide usuario de administrador (`admin`/`admin` en local). Desde ahí ves y controlas bundles, componentes, configuraciones, logs y mucha información de diagnóstico.'}</Paragraph>
      <DataTable
        headers={['Entorno', 'Web Console', 'Alternativa']}
        rows={[
          ['Tu instancia local (AEM 6.5 o AEM SDK)', '**Disponible**, con permisos completos', '—'],
          ['AEM 6.5 en servidores / AMS', 'Disponible para administradores; **nunca** debe ser accesible desde internet', '—'],
          ['AEM as a Cloud Service (dev, stage, prod)', '**No disponible**', '**Developer Console** (desde Cloud Manager): bundles, componentes y configuraciones en **solo lectura**']
        ]}
      />
      <ScreenSketch
        title="Web Console · localhost:4502/system/console"
        caption="Esquema de las zonas de la Web Console (no es una captura)."
        rows={[
          [{ label: 'Menú principal', detail: 'Pestañas **Main** (Bundles, Components, Services...), **OSGi** (Configuration...), **Sling** (Log Support, Requests, Resolvers...), **Status** (informes de estado), **AEM** y otras', tone: 'purple' }],
          [{ label: 'Barra de estado', detail: 'Resumen de la página actual, por ejemplo "Bundle information: 650 bundles in total - all 650 bundles active"', tone: 'cyan' }],
          [
            { label: 'Filtro y acciones', detail: 'Campo de búsqueda y botones (Install/Update, Refresh Packages...)', tone: 'primary', grow: 1 },
            { label: 'Lista', detail: 'Cada fila es un bundle, componente o configuración. Clic en el nombre para ver el detalle; iconos para arrancar, detener o editar', tone: 'success', grow: 3 }
          ]
        ]}
      />

      <SectionTitle>Mapa de las páginas más útiles</SectionTitle>
      <DataTable
        headers={['URL (debajo de /system/console)', 'Para qué sirve', 'Cuándo la usarás']}
        rows={[
          ['`/bundles`', 'Lista de bundles, su estado, versión y detalle de paquetes importados y exportados', 'Después de cada despliegue'],
          ['`/components`', 'Componentes DS, su estado y referencias a servicios', 'Un servicio "no hace nada"'],
          ['`/configMgr`', 'Configuration Manager: ver y editar configuraciones por PID, crear instancias de factory', 'Revisar o probar valores de configuración'],
          ['`/services`', 'Servicios registrados y quién los usa', 'Diagnóstico avanzado'],
          ['`/slinglog`', 'Sling Log Support: loggers, niveles y archivos de log activos', 'Depurar con más detalle'],
          ['`/requests`', 'Recent Requests: las últimas peticiones con cada paso de su procesamiento', 'Ver qué script atendió una URL y cuánto tardó'],
          ['`/servletresolver`', 'Qué servlet o script atendería una URL', 'Tu servlet no responde'],
          ['`/jcrresolver`', 'Configuración y prueba de la resolución de recursos', 'URLs y mapeos'],
          ['`/depfinder`', 'Qué bundle exporta un paquete Java', 'Un `Import-Package` no se resuelve'],
          ['`/osgi-installer`', 'Lo que el instalador de OSGi desplegó desde el repositorio (bundles y configuraciones)', 'Una configuración no se aplica'],
          ['`/status-slingsettings`', 'Run modes activos y datos de Sling', 'Confirmar author/publish y entorno ([[ch-4]])'],
          ['`/productinfo`', 'Versión exacta de AEM', 'Confirmar Service Pack o versión del SDK'],
          ['`/jmx`', 'Beans JMX: métricas y operaciones de mantenimiento', 'Operación avanzada']
        ]}
      />
      <Alert type="tip" title="Atajos con la AEM Chrome Extension">
        {'Con la extensión del [[ch-3]]: `Shift` + `B` abre Bundles y `Shift` + `M` abre Configuration Manager.'}
      </Alert>

      <SectionTitle>Laboratorio 1 · Revisar los bundles</SectionTitle>
      <List items={[
        '**Paso 1.** Abre `http://localhost:4502/system/console/bundles`. Lee la barra de estado: número total de bundles, cuántos están activos y cuántos son fragmentos.',
        '**Paso 2.** Escribe `sling.api` en el filtro y pulsa **Apply Filter**. Aparece el bundle **Apache Sling API** en estado Active.',
        '**Paso 3.** Haz clic en su nombre para ver el detalle: Symbolic Name, Version, **Exported Packages** (lo que ofrece) e **Imported Packages** (lo que necesita, con el bundle que se lo da). Al final verás los servicios que registra.',
        '**Paso 4.** Quita el filtro y ordena por la columna **Status**. En una instancia sana todo es Active o Fragment. Si ves alguno en Installed o Resolved, ábrelo y revisa sus Imported Packages.'
      ]} />
      <Paragraph>{'**Cómo se ve un bundle que no arranca.** En el detalle de un bundle en estado Installed, los paquetes que no se pudieron resolver aparecen marcados (en rojo) con "Cannot be resolved":'}</Paragraph>
      <CodeBlock filename="detalle de un bundle en estado Installed (ejemplo)" language="text" code={unresolved} />
      <List items={[
        'Las dos primeras líneas están bien: indican qué bundle (y con qué número de id entre paréntesis) provee cada paquete.',
        'La tercera dice que **nadie** exporta `com.google.gson` en una versión entre 2.11 y 3: el bundle se queda en Installed y ninguno de sus componentes funciona.',
        'Usa `/system/console/depfinder` para buscar qué bundle exporta ese paquete y en qué versión.',
        'Soluciones típicas: desplegar el bundle que falta, ajustar la versión de la dependencia en Maven, o incluir (embed) la librería dentro de tu bundle. Lo trabajaremos con tu propio proyecto en el Módulo 2.'
      ]} />
      <Alert type="caution" title="Botones peligrosos">
        {'Cada fila tiene acciones para detener, actualizar o **desinstalar** el bundle. Detener un bundle del sistema puede dejar AEM inservible hasta reiniciar, y desinstalarlo puede obligarte a reinstalar. En este tema solo **observa**; detén únicamente bundles de tu propio proyecto y cuando sepas qué haces.'}
      </Alert>

      <SectionTitle>Laboratorio 2 · Componentes y sus referencias</SectionTitle>
      <Paragraph>{'Un bundle Active no garantiza que sus componentes funcionen: cada componente se activa solo si están disponibles **todos** los servicios que necesita (sus **referencias**) y su configuración, si es obligatoria.'}</Paragraph>
      <DataTable
        headers={['Estado del componente', 'Qué significa']}
        rows={[
          ['**active**', 'Creado y funcionando'],
          ['**satisfied**', 'Tiene todo lo necesario pero todavía no se creó: es normal en componentes "perezosos" que se crean cuando alguien los usa'],
          ['**unsatisfied (reference)**', 'Falta un servicio que necesita'],
          ['**unsatisfied (configuration)**', 'Exige una configuración que no existe'],
          ['**failed activation**', 'Intentó activarse y lanzó una excepción: revisa `error.log`'],
          ['**disabled**', 'Deshabilitado de forma explícita']
        ]}
      />
      <List items={[
        '**Paso 1.** Abre `/system/console/components` y filtra por `SlingMainServlet`.',
        '**Paso 2.** Abre el componente `org.apache.sling.engine.impl.SlingMainServlet`: verás su estado, el bundle al que pertenece, sus **References** (cada una con su estado Satisfied) y sus **Properties** (su configuración actual).',
        '**Paso 3.** Así se ve un componente que no puede funcionar porque le falta un servicio:'
      ]} />
      <CodeBlock filename="detalle de un componente insatisfecho (ejemplo)" language="text" code={unsatisfied} />
      <List items={[
        '`State: unsatisfied (reference)` indica que el problema es una dependencia de servicio.',
        '`Reference httpClientFactory ... Unsatisfied` dice cuál: nadie publica un servicio con esa interfaz.',
        '`Cardinality: 1..1` significa que es obligatoria (exactamente una); con `0..1` sería opcional y el componente sí se activaría.',
        'La causa suele ser que el bundle que provee ese servicio no está Active: vuelve al laboratorio 1.'
      ]} />

      <SectionTitle>Laboratorio 3 · Configuration Manager</SectionTitle>
      <Paragraph>{'Cada componente configurable tiene un **PID** (normalmente el nombre completo de su clase) y un formulario generado a partir de su definición en código. Configuration Manager permite verlo y cambiar sus valores **en caliente**: el componente recibe los valores nuevos sin reiniciar nada.'}</Paragraph>
      <List items={[
        '**Paso 1.** Abre `/system/console/configMgr` y busca (`Ctrl+F` del navegador) **Apache Sling Referrer Filter**. Es una configuración de seguridad real: define desde qué dominios se aceptan peticiones POST.',
        '**Paso 2.** Haz clic en su nombre para abrir el formulario. Arriba ves el nombre legible; abajo, en **Configuration Information**, el **PID** (`org.apache.sling.security.impl.ReferrerFilter`) y el bundle que la usa.',
        '**Paso 3.** Observa sin guardar: cada campo tiene una descripción. Pulsa **Cancel**.',
        '**Paso 4.** Busca **Apache Sling Logging Logger Configuration**. Tiene un botón **+** en lugar de un lápiz: es una **factory configuration**, un componente del que se pueden crear **varias instancias**, cada una con sus propios valores. Las usaremos en el laboratorio 4.'
      ]} />
      <DataTable
        headers={['Tipo', 'Cuántas instancias', 'Nombre del archivo en un proyecto', 'Ejemplo']}
        rows={[
          ['Configuración simple (singleton)', 'Una', '`<PID>.cfg.json`', 'Referrer Filter'],
          ['Factory configuration', 'Varias', '`<PID>~<nombre>.cfg.json` (el `~` separa el PID del nombre de la instancia)', 'Un logger por paquete; una conexión por API externa']
        ]}
      />
      <Alert type="warning" title="Lo que guardas en la consola no es código">
        {'Al guardar desde Configuration Manager en AEM 6.5 o en el SDK, AEM crea un nodo en el repositorio, normalmente en `/apps/system/config`. Ese cambio **solo existe en esa instancia**: no está en Git, no llega a otros entornos y puede perderse o pisarse con el siguiente despliegue. En AEM as a Cloud Service ni siquiera es posible. Úsalo para **probar** valores; las configuraciones reales van como archivos `.cfg.json` en tu proyecto, por run mode ([[ch-39]]).'}
      </Alert>
      <CodeBlock filename="dónde terminan los cambios hechos en la consola (ejemplo)" language="text" code={configPaths} />
      <Paragraph>{'Un detalle que confunde a muchos (bien explicado en el artículo de Kumar Raushan de las lecturas recomendadas): en `/system/console/osgi-installer` una misma factory configuration puede aparecer dos veces, una con **guion** (`-`, el archivo en el repositorio) y otra con **tilde** (`~`, la instancia viva). Si editas el archivo a mano en CRXDE Lite, el instalador puede no reflejarlo. Por eso, en tu proyecto, nombra las instancias tú mismo (`~misitio`, `~api-clima`) en lugar de dejar que AEM genere identificadores aleatorios: así cada despliegue actualiza siempre la misma instancia.'}</Paragraph>

      <SectionTitle>Laboratorio 4 · Crear un logger propio</SectionTitle>
      <Paragraph>{'Por defecto `error.log` muestra mensajes de nivel INFO o superior. Cuando depuras un paquete concreto, conviene un logger con nivel **DEBUG** que escriba en un archivo propio, para no mezclarlo con el resto:'}</Paragraph>
      <List items={[
        '**Paso 1.** En Configuration Manager, en **Apache Sling Logging Logger Configuration**, pulsa **+**.',
        '**Paso 2.** Log Level: `Debug`. Log File: `logs/misitio.log`. Logger: `org.apache.sling.engine` (para esta práctica usamos un paquete de Sling; con tu proyecto usarás el tuyo, por ejemplo `com.misitio`). Deja **Additive** desmarcado. Pulsa **Save**.',
        '**Paso 3.** Abre `/system/console/slinglog`: tu logger aparece en la lista con su nivel y su archivo.',
        '**Paso 4.** Sigue el archivo en una terminal y navega por tu sitio en otra pestaña: verás mensajes DEBUG del motor de peticiones de Sling.',
        '**Paso 5.** Cuando termines, vuelve a Configuration Manager, abre la instancia que creaste y pulsa **Delete**: el nivel DEBUG genera muchísimos mensajes.'
      ]} />
      <CodeBlock filename="terminal" language="bash" code={tailLog} />
      <List items={[
        '**Log Level** define el nivel mínimo que se registra: TRACE, DEBUG, INFO, WARN, ERROR (de más a menos detallado).',
        '**Log File** es la ruta del archivo, relativa a `crx-quickstart`.',
        '**Logger** son los paquetes o clases Java que captura este logger (incluye sus subpaquetes).',
        '**Additive** en desmarcado evita que esos mensajes se dupliquen también en `error.log`.'
      ]} />
      <Paragraph>{'En un proyecto, el mismo logger se define como archivo de configuración en el código:'}</Paragraph>
      <CodeBlock filename="ui.config/.../config.author/org.apache.sling.commons.log.LogManager.factory.config~misitio.cfg.json" language="json" code={loggerJson} />
      <List items={[
        'El nombre del archivo es el PID de la factory, `~` y el nombre de la instancia (`misitio`).',
        'Cada clave corresponde a un campo del formulario: nivel, archivo, paquetes (una lista) y `additiv` (así, sin la "e" final: es el nombre real de la propiedad).',
        'Estar en `config.author` hace que solo aplique en instancias Author ([[ch-39]]).',
        'En AEM as a Cloud Service los logs se consultan desde Cloud Manager y conviene escribir en `logs/error.log`; los archivos de log personalizados son una práctica de 6.5 y local.'
      ]} />

      <SectionTitle>Laboratorio 5 · Seguir una petición con Recent Requests</SectionTitle>
      <List items={[
        '**Paso 1.** Abre en otra pestaña una página de tu sitio en Author, por ejemplo `http://localhost:4502/content/practica/es/servicios.html` (añade `?wcmmode=disabled` para evitar las peticiones extra del editor).',
        '**Paso 2.** Abre `/system/console/requests`. Verás la lista de las últimas peticiones; localiza la de tu página y haz clic en ella.',
        '**Paso 3.** Lee el detalle: cada línea es un paso del procesamiento con su tiempo en microsegundos.'
      ]} />
      <CodeBlock filename="detalle de una petición (ejemplo abreviado)" language="text" code={recentRequest} />
      <List items={[
        'La primera columna es el tiempo transcurrido desde el inicio de la petición, en microsegundos.',
        '`ResourceResolution` muestra en qué recurso del repositorio se convirtió la URL: aquí, la página `/content/practica/es/servicios` de tipo `cq:Page`.',
        '`SlingRequestPathInfo` es la descomposición de la URL que practicaste en el [[ch-2]]: ruta, selectores (ninguno), extensión `html` y sufijo (ninguno).',
        '`ServletResolution` indica **qué script o servlet** atendió la petición. Es la forma más rápida de saber "qué código está generando esta página".',
        'La última línea da el tiempo total. Si una página es lenta, los tiempos intermedios te dicen qué parte tarda (lo profundizaremos en [[ch-122]]).'
      ]} />

      <SectionTitle>AEM as a Cloud Service: la Developer Console</SectionTitle>
      <Paragraph>{'En la nube no hay Web Console. Para diagnosticar un entorno se usa la **Developer Console**, que se abre desde **Cloud Manager**: en el programa, en el menú del entorno, elige **Developer Console**. Ofrece, en **solo lectura**, la misma información esencial: bundles con su estado, componentes, configuraciones OSGi con sus valores, servicios y más, con búsqueda de texto. No permite detener bundles ni cambiar configuraciones: todo cambio se hace en el código y se despliega con el pipeline ([[ch-127]]).'}</Paragraph>

      <SectionTitle>Solución de problemas con la Web Console</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Dónde mirar', 'Qué buscar']}
        rows={[
          ['Desplegaste código y "no pasa nada"', '`/bundles`', 'Que tu bundle esté Active; si está Installed, sus Imported Packages en rojo'],
          ['Un servicio o modelo devuelve null', '`/components`', 'Componente unsatisfied: qué referencia o configuración falta'],
          ['Un valor de configuración no se aplica', '`/configMgr` y `/osgi-installer`', 'El PID correcto, el valor vigente y si hay duplicados `-` / `~`'],
          ['Una URL devuelve 404 o el script equivocado', '`/requests` y `/servletresolver`', 'Qué recurso y qué script resolvió Sling'],
          ['No sabes qué versión o run mode tienes', '`/productinfo` y `/status-slingsettings`', 'Versión de AEM y run modes activos'],
          ['Necesitas más detalle de un paquete', '`/slinglog` y Configuration Manager', 'Crear un logger DEBUG temporal']
        ]}
      />

      <SectionTitle>Buenas prácticas y seguridad</SectionTitle>
      <List items={[
        '**Nunca** expongas `/system/console` fuera de la red interna: el Dispatcher debe bloquearla en Publish ([[ch-2]]).',
        'Cambia la contraseña de `admin` en cualquier instancia que no sea tu equipo local.',
        'Usa la consola para **diagnosticar y probar**; las configuraciones definitivas van en el código, versionadas en Git.',
        'Da nombres claros a las instancias de factory configurations (`~misitio`, `~api-clima`).',
        'Borra los loggers DEBUG temporales cuando termines.',
        'Después de cada despliegue, revisa que tus bundles estén Active y tus componentes activos o satisfechos.'
      ]} />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Anota cuántos bundles tiene tu instancia y cuántos son fragmentos.',
        '**2.** Con `/system/console/depfinder`, averigua qué bundle exporta el paquete `com.day.cq.wcm.api` y en qué versión.',
        '**3.** Abre el componente `org.apache.sling.engine.impl.SlingMainServlet` y anota dos de sus propiedades de configuración.',
        '**4.** Crea un logger DEBUG para `org.apache.sling.engine` en `logs/ejercicio.log`, carga una página y confirma que el archivo recibe mensajes. Después elimina ese logger.',
        '**5.** Con Recent Requests, averigua qué script renderizó una página de tu sitio y cuánto tardó.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'(1) La barra de estado de Bundles da los totales. (2) Depfinder muestra el bundle `com.day.cq.wcm.cq-wcm-api` (o similar) y la versión exportada. (3) El detalle del componente lista sus propiedades bajo **Properties**. (4) El archivo `crx-quickstart/logs/ejercicio.log` existe y crece al navegar; tras eliminar el logger deja de crecer. (5) La línea `ServletResolution` indica el script, normalmente dentro de `/apps/<sitio>/components/page` o de `/libs`.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'AEM está formado por bundles OSGi que publican servicios; los componentes DS se activan solo si tienen sus referencias y configuraciones.',
        'Un bundle en **Installed** casi siempre tiene un `Import-Package` sin resolver; depfinder te dice quién exporta cada paquete.',
        'Un componente **unsatisfied** te dice exactamente qué servicio o configuración le falta.',
        'Configuration Manager cambia configuraciones en caliente, pero esos cambios no son código: las definitivas van en archivos `.cfg.json`.',
        'Las factory configurations permiten varias instancias; en archivo se nombran `<PID>~<nombre>`.',
        'Recent Requests muestra qué recurso y qué script atendieron una URL y cuánto tardó.',
        'En Cloud Service se usa la Developer Console, en solo lectura.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['OSGi', 'Especificación para sistemas Java modulares que se actualizan en caliente'],
          ['Apache Felix', 'La implementación de OSGi que usa AEM'],
          ['Bundle', 'Un `.jar` con metadatos OSGi (qué exporta e importa)'],
          ['Servicio', 'Objeto publicado en el registro de OSGi para que otros lo usen'],
          ['Declarative Services (DS)', 'Mecanismo que crea componentes y los conecta con sus servicios automáticamente'],
          ['PID', 'Identificador persistente de una configuración'],
          ['Factory configuration', 'Configuración de la que se pueden crear varias instancias'],
          ['Web Console', 'Interfaz de administración de OSGi en `/system/console`'],
          ['Developer Console', 'Herramienta de diagnóstico en solo lectura de Cloud Service']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Web Console en AEM 6.5', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65/content/implementing/deploying/configuring/web-console' },
        { type: 'image', title: 'Web Console en AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developer-tools/web-console' },
        { type: 'image', title: 'Depurar el AEM SDK con la OSGi Web Console', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/debugging/debugging-aem-sdk/osgi-web-consoles' },
        { type: 'image', title: 'Developer Console de AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-developer-console' },
        { type: 'image', title: 'Configurar OSGi en AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/deploying/configuring-osgi' },
        { type: 'image', title: 'AEM OSGi in Practice: Configurable Services, Factories, and Servlets', source: 'Medium · Kumar Raushan', url: 'https://medium.com/@kumar.raushan/aem-osgi-in-practice-configurable-services-factories-and-servlets-without-restarting-the-server-1ffcf17682b9' }
      ]} />
    </LessonPage>
  );
}
