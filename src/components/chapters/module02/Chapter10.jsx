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

const dialogXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Properties"
    sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/fixedcolumns">
        <items jcr:primaryType="nt:unstructured">
            <column
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/container">
                <items jcr:primaryType="nt:unstructured">
                    <text
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                        fieldLabel="Text"
                        name="./text"/>
                </items>
            </column>
        </items>
    </content>
</jcr:root>`;

const filterRules = `<workspaceFilter version="1.0">
    <!-- A: todo /content/sitio EXCEPTO la carpeta temporal -->
    <filter root="/content/sitio">
        <exclude pattern="/content/sitio/temporal(/.*)?"/>
    </filter>

    <!-- B: SOLO la rama en español del sitio -->
    <filter root="/content/otro-sitio">
        <include pattern="/content/otro-sitio/es(/.*)?"/>
    </filter>

    <!-- C: la rama en español, pero sin sus borradores -->
    <filter root="/content/tercer-sitio">
        <include pattern="/content/tercer-sitio/es(/.*)?"/>
        <exclude pattern="/content/tercer-sitio/es/borradores(/.*)?"/>
    </filter>
</workspaceFilter>`;

const labFilter = `<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
    <filter root="/content/laboratorio/demo" mode="replace"/>
</workspaceFilter>`;

const labProps = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="group">laboratorio</entry>
<entry key="name">modos-demo</entry>
<entry key="version">1.0</entry>
<entry key="description">Laboratorio de modos de importacion</entry>
</properties>`;

const labDemo = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
    xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    titulo="Titulo desde el paquete"
    nuevaPropiedad="agregada por el paquete"/>`;

const labHijo = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
    xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    texto="Nodo hijo creado por el paquete"/>`;

const labTree = `modos-demo/
├── META-INF/vault/
│   ├── filter.xml
│   └── properties.xml
└── jcr_root/content/laboratorio/demo/
    ├── .content.xml
    └── hijo/.content.xml`;

const labZip = `# Desde la carpeta modos-demo (funciona igual en bash y PowerShell)
cd modos-demo
jar -cfM ../modos-demo-1.0.zip -C . .

# Comprueba el contenido del zip
jar -tf ../modos-demo-1.0.zip`;

const labZipOut = `jcr_root/
jcr_root/content/
jcr_root/content/laboratorio/
jcr_root/content/laboratorio/demo/
jcr_root/content/laboratorio/demo/.content.xml
jcr_root/content/laboratorio/demo/hijo/
jcr_root/content/laboratorio/demo/hijo/.content.xml
META-INF/
META-INF/vault/
META-INF/vault/filter.xml
META-INF/vault/properties.xml`;

const repoinitExample = `create path (sling:OrderedFolder) /content/dam/practica

create service user practica-lector

set ACL for practica-lector
    allow jcr:read on /content/practica
end`;

const vltRcp = `# vault-cli se descarga de Maven Central (org.apache.jackrabbit.vault:vault-cli)
vlt rcp -r -b 500 -t 1 \\
  http://admin:admin@localhost:4502/crx/-/jcr:root/content/dam/practica \\
  http://admin:admin@localhost:4602/crx/-/jcr:root/content/dam/practica`;

export default function Chapter10({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-10"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender qué es **FileVault** y dónde lo usas sin darte cuenta (Package Manager, Maven, herramientas de sincronización).',
        'Leer y escribir `.content.xml`, incluidos nodos anidados como los de un diálogo.',
        'Dominar `filter.xml`: raíces, reglas `include`/`exclude` y el orden en que se evalúan.',
        'Conocer los cinco **modos de importación** y comprobar en tu AEM cómo se comporta cada uno.',
        'Aplicar las reglas de paquetes de AEM as a Cloud Service: tipos de paquete, carpetas `install` y dependencias.',
        'Decidir cuándo usar repoinit, cuándo `ui.content` y cómo mover grandes volúmenes de contenido.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Este tema se apoya en dos anteriores: los paquetes que creaste con Package Manager ([[ch-6]]) y los `filter.xml` del proyecto generado ([[ch-9]]). Necesitas AEM Author corriendo y el JDK instalado (usaremos el comando `jar`).'}
      </Alert>

      <SectionTitle>¿Qué es FileVault?</SectionTitle>
      <Paragraph>{'**Apache Jackrabbit FileVault** es la herramienta que traduce el repositorio JCR a archivos y carpetas (y viceversa). Piénsalo como un "traductor de ida y vuelta": toma una rama del árbol de nodos y la escribe como carpetas con archivos `.content.xml`, y puede hacer el camino inverso. Lo usas constantemente aunque no lo veas:'}</Paragraph>
      <List items={[
        '**Package Manager** crea e instala paquetes en formato FileVault ([[ch-6]]).',
        '**Maven** construye `ui.apps`, `ui.config` y `ui.content` como paquetes FileVault con el `filevault-package-maven-plugin` ([[ch-9]]).',
        'Las herramientas de sincronización (VSCode AEM Sync, repo tool) envían y traen archivos en este mismo formato.',
        'La línea de comandos **`vlt`** (vault-cli) trabaja directamente con él.'
      ]} />
      <FlowDiagram
        caption="El mismo formato viaja en ambos sentidos"
        steps={[
          { title: 'Archivos en Git', detail: '`jcr_root/` + `.content.xml`', tone: 'purple' },
          { title: 'Paquete zip', detail: '`META-INF/vault` + `jcr_root`', tone: 'primary' },
          { title: 'Instalación', detail: 'Filtros y modo deciden qué se escribe', tone: 'cyan' },
          { title: 'Repositorio JCR', detail: 'Nodos y propiedades', tone: 'success' }
        ]}
        connectors={['build', 'upload + install', 'importa']}
      />

      <SectionTitle>Anatomía de un paquete</SectionTitle>
      <DataTable
        headers={['Archivo o carpeta', 'Obligatorio', 'Qué contiene']}
        rows={[
          ['`META-INF/vault/filter.xml`', 'Sí', 'Las ramas del repositorio que el paquete controla, sus reglas y su modo de importación'],
          ['`META-INF/vault/properties.xml`', 'Sí', 'Nombre, grupo, versión, descripción y otras propiedades del paquete'],
          ['`META-INF/vault/definition/`', 'No', 'La definición editable que usa Package Manager (la crea él)'],
          ['`META-INF/vault/nodetypes.cnd`', 'No', 'Definiciones de tipos de nodo personalizados, si el contenido los usa'],
          ['`jcr_root/`', 'Sí', 'El contenido, con la misma estructura de rutas que el repositorio']
        ]}
      />

      <SectionTitle>El formato .content.xml a fondo</SectionTitle>
      <Paragraph>{'En [[ch-6]] viste un `.content.xml` sencillo: un nodo con propiedades y pistas de tipo (`{Boolean}`, `{Long}`...). Dos reglas más completan el formato:'}</Paragraph>
      <List items={[
        '**Nodos hijos en línea.** Un `.content.xml` puede contener nodos hijos como **elementos XML anidados**. No hace falta una carpeta por nodo: un diálogo completo cabe en un solo archivo.',
        '**Archivos reales.** Un archivo que no es `.content.xml` (por ejemplo `helloworld.html` o `logo.png`) se guarda como nodo de tipo archivo con su contenido binario.',
        'Las carpetas usan los nombres codificados que viste en [[ch-9]]: `_cq_dialog` para `cq:dialog`, `_jcr_content` para `jcr:content`.'
      ]} />
      <CodeBlock filename="ui.apps/.../helloworld/_cq_dialog/.content.xml (real, del proyecto generado)" language="xml" code={dialogXml} />
      <List items={[
        '`<jcr:root ...>` es el propio nodo `cq:dialog`. Sus atributos son sus propiedades: `jcr:title` (título del diálogo) y `sling:resourceType` (qué componente de interfaz lo dibuja).',
        '`<content>` es un **nodo hijo** llamado `content`; el nombre del elemento XML es el nombre del nodo. Su `sling:resourceType` indica un diseño de columnas fijas.',
        '`<items>` agrupa los hijos de un contenedor; `<column>` es una columna, y dentro de su `<items>` está el campo.',
        '`<text ... name="./text"/>` es el campo de texto. `fieldLabel` es la etiqueta que ve el autor y `name="./text"` indica **dónde se guarda** el valor: en la propiedad `text` del nodo del componente. Esa es la propiedad que el HTL muestra con `${properties.text}` ([[ch-9]]).',
        'En el repositorio esto se convierte en la ruta `.../helloworld/cq:dialog/content/items/column/items/text`. Los diálogos se estudian a fondo en [[ch-21]].'
      ]} />

      <SectionTitle>filter.xml a fondo</SectionTitle>
      <Paragraph>{'Cada `<filter root="...">` declara una rama que el paquete **controla**. Dentro puedes afinar con reglas `include` y `exclude`, que son **expresiones regulares de Java** comparadas contra la ruta completa de cada nodo. Las reglas se evalúan así (según la documentación oficial de FileVault):'}</Paragraph>
      <List items={[
        '**Gana la última regla que coincide.** Las rutas se prueban contra todas las reglas en orden, y el tipo (include o exclude) de la **última** que coincide decide.',
        '**La primera regla fija el valor por defecto.** Si la primera regla es un `include`, todo lo que no coincida con ninguna queda **excluido**; si es un `exclude`, todo lo demás queda **incluido**.',
        'Las expresiones empiezan con `/` (ruta absoluta) o con un comodín (ruta relativa).'
      ]} />
      <CodeBlock filename="filter.xml (ejemplos comentados)" language="xml" code={filterRules} />
      <DataTable
        headers={['Caso', 'Reglas', 'Resultado']}
        rows={[
          ['A', 'Solo un `exclude`', 'La primera regla es exclude, así que por defecto todo se incluye: toda la rama **menos** `temporal`'],
          ['B', 'Solo un `include`', 'La primera regla es include, así que por defecto todo se excluye: **solo** `es` y lo que tiene debajo'],
          ['C', '`include` y luego `exclude`', 'Todo `es`, pero la última regla que coincide con `borradores` es exclude: queda fuera']
        ]}
      />
      <List items={[
        'El sufijo `(/.*)?` hace que la regla aplique al nodo **y a todo lo que tiene debajo**. Sin él, `/content/sitio/temporal` solo coincide con ese nodo exacto, no con sus hijos: es el error más común al escribir filtros.',
        'Desde FileVault 3.1.28 existe `matchProperties="true"` en una regla para filtrar **propiedades** en lugar de nodos, por ejemplo para excluir una propiedad concreta.'
      ]} />
      <Alert type="caution" title="Lo que no está en el paquete se borra (en modo replace)">
        {'Si un nodo está **dentro** de una rama controlada por el filtro, existe en el repositorio y **no** viene en el paquete, al instalar en modo replace se **elimina**. Los nodos **por encima** de la raíz del filtro (los "ancestros") solo se crean si no existen y nunca se modifican. Por eso los filtros deben ser tan específicos como sea posible.'}
      </Alert>

      <SectionTitle>Los cinco modos de importación</SectionTitle>
      <Paragraph>{'El atributo `mode` de cada `<filter>` decide qué pasa con el contenido que **ya existe** en el repositorio al instalar:'}</Paragraph>
      <DataTable
        caption="Según el Javadoc oficial de ImportMode. Los valores se escriben en minúsculas."
        headers={['Modo', 'Propiedades existentes', 'Nodos y propiedades nuevos', '¿Borra algo?', 'Estado']}
        rows={[
          ['`replace` (por defecto)', 'Se reemplazan', 'Se agregan', '**Sí**: lo que no viene en el paquete', 'Recomendado para código'],
          ['`merge_properties`', '**No se tocan**', 'Se agregan', 'No', 'Recomendado'],
          ['`update_properties`', '**Se reemplazan**', 'Se agregan', 'No', 'Recomendado'],
          ['`merge`', 'No se tocan', 'Se agregan', 'No', '**Deprecado**'],
          ['`update`', 'Se reemplazan', 'Se agregan', 'No', '**Deprecado**']
        ]}
      />
      <List items={[
        '`merge` y `update` están deprecados porque su comportamiento varía según el formato de serialización. Sus reemplazos, `merge_properties` y `update_properties`, se comportan igual siempre.',
        'La única propiedad existente que `merge_properties` y `update_properties` pueden modificar es `jcr:mixinTypes`, a la que agregan los valores del paquete.',
        'En `update_properties`, las propiedades multivalor existentes se reemplazan completas (no se combinan).'
      ]} />
      <Alert type="info" title={'El archetype todavía usa mode="merge"'}>
        {'El `filter.xml` de `ui.content` que genera el archetype 58 usa `mode="merge"` ([[ch-9]]), el modo deprecado. Funciona, pero en un proyecto propio conviene evaluar el cambio a `mode="merge_properties"`, que es su sucesor con el comportamiento consistente, y probarlo antes en un entorno de desarrollo.'}
      </Alert>
      <DataTable
        caption="Qué modo usar"
        headers={['Contenido', 'Modo', 'Por qué']}
        rows={[
          ['Código en `/apps` (`ui.apps`)', '`replace`', 'Lo que está en Git es la única verdad; lo demás debe desaparecer'],
          ['Contenido inicial que después editan los autores (`ui.content`)', '`merge_properties`', 'Crear lo que falta sin pisar lo que los autores cambiaron'],
          ['Configuración que el código debe actualizar sin borrar lo demás', '`update_properties`', 'Actualiza tus propiedades y conserva nodos ajenos'],
          ['Restaurar una copia de seguridad exacta', '`replace`', 'Dejar la rama tal como estaba al hacer el paquete']
        ]}
      />

      <SectionTitle>Laboratorio · Construir un paquete a mano y probar los modos</SectionTitle>
      <Paragraph>{'Vas a construir un paquete sin Package Manager ni Maven, solo con archivos y el comando `jar` del JDK, e instalarlo tres veces con distintos modos para ver la diferencia con tus propios ojos. Usaremos el nodo `/content/laboratorio/demo` del [[ch-6]].'}</Paragraph>
      <Paragraph>{'**Paso 1 · Preparar el nodo en AEM.** En CRXDE Lite, en `/content/laboratorio/demo` (créalo como `nt:unstructured` si no existe), asegúrate de tener la propiedad `titulo` con el valor `Hola CRXDE`. Agrega a mano una propiedad `manual` con el valor `creada a mano` y un nodo hijo `nodoManual` (`nt:unstructured`). Pulsa **Save All**. Estos elementos **no** vienen en el paquete: son los que veremos sobrevivir o desaparecer.'}</Paragraph>
      <Paragraph>{'**Paso 2 · Crear los archivos del paquete.** Crea esta estructura en una carpeta de trabajo:'}</Paragraph>
      <CodeBlock filename="estructura" language="text" code={labTree} />
      <CodeBlock filename="modos-demo/META-INF/vault/filter.xml" language="xml" code={labFilter} />
      <CodeBlock filename="modos-demo/META-INF/vault/properties.xml" language="xml" code={labProps} />
      <List items={[
        '`properties.xml` usa el formato estándar de propiedades XML de Java. `group`, `name` y `version` son los datos con los que Package Manager mostrará el paquete.',
        'El filtro controla solo `/content/laboratorio/demo` y empieza en modo `replace`.'
      ]} />
      <CodeBlock filename="modos-demo/jcr_root/content/laboratorio/demo/.content.xml" language="xml" code={labDemo} />
      <CodeBlock filename="modos-demo/jcr_root/content/laboratorio/demo/hijo/.content.xml" language="xml" code={labHijo} />
      <Paragraph>{'**Paso 3 · Empaquetar.** Un paquete es un zip normal; usamos `jar` porque viene con el JDK y funciona igual en todos los sistemas:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={labZip} />
      <List items={[
        '`jar -c` crea un archivo, `-f` indica su nombre y `-M` evita que agregue un `MANIFEST.MF` (un paquete no lo necesita).',
        '`-C . .` significa "entra a la carpeta actual y agrega todo su contenido", de modo que `jcr_root` y `META-INF` quedan en la **raíz** del zip, que es lo que exige FileVault.',
        '`jar -tf` lista el contenido para comprobarlo. No uses el "Comprimir" de Windows ni `Compress-Archive` de Windows PowerShell 5.1: pueden meter una carpeta extra o usar separadores `\\` que AEM no reconoce.'
      ]} />
      <CodeBlock filename="salida esperada de jar -tf" language="text" code={labZipOut} />
      <Paragraph>{'**Paso 4 · Instalar en modo replace.** En Package Manager pulsa **Upload Package**, selecciona `modos-demo-1.0.zip` y después **Install**. Revisa el nodo en CRXDE Lite (recarga el árbol).'}</Paragraph>
      <Paragraph>{'**Paso 5 · Repetir con los otros modos.** Restaura el estado del paso 1 (vuelve a poner `titulo = Hola CRXDE`, `manual` y `nodoManual`, y borra `nuevaPropiedad` e `hijo`). Cambia en `filter.xml` el modo a `merge_properties` y en `properties.xml` la versión a `1.1`, empaqueta como `modos-demo-1.1.zip`, sube e instala. Repite con `update_properties` y la versión `1.2`.'}</Paragraph>
      <DataTable
        caption="Resultado esperado después de cada instalación"
        headers={['Elemento en /content/laboratorio/demo', 'replace', 'merge_properties', 'update_properties']}
        rows={[
          ['`titulo` (existía y viene en el paquete)', '"Titulo desde el paquete"', '"Hola CRXDE" (no se toca)', '"Titulo desde el paquete"'],
          ['`nuevaPropiedad` (solo en el paquete)', 'Se crea', 'Se crea', 'Se crea'],
          ['`hijo` (solo en el paquete)', 'Se crea', 'Se crea', 'Se crea'],
          ['`manual` (solo en el repositorio)', '**Se borra**', 'Se conserva', 'Se conserva'],
          ['`nodoManual` (solo en el repositorio)', '**Se borra**', 'Se conserva', 'Se conserva'],
          ['Otras propiedades del [[ch-6]] (`cantidad`, `activo`...)', '**Se borran**', 'Se conservan', 'Se conservan']
        ]}
      />
      <Alert type="tip" title="Qué acabas de demostrar">
        {'`replace` deja la rama **idéntica** al paquete, borrando todo lo demás; `merge_properties` solo **agrega**; `update_properties` **agrega y actualiza**, pero nunca borra. Si algún resultado no coincide, revisa en el log de instalación de Package Manager las líneas `A` (agregado), `U` (actualizado) y `D` (eliminado), y confirma que subiste la versión correcta del zip.'}
      </Alert>

      <SectionTitle>Tipos de paquete y reglas de AEM as a Cloud Service</SectionTitle>
      <Paragraph>{'Cloud Service separa de forma estricta el código (inmutable) del contenido (mutable), y exige que cada paquete declare de qué tipo es:'}</Paragraph>
      <DataTable
        headers={['packageType', 'Qué puede contener', 'En el proyecto generado']}
        rows={[
          ['`application`', 'Solo código inmutable: `/apps`', '`ui.apps`'],
          ['`content`', 'Solo contenido mutable: `/content`, `/conf`, `/var`, `/oak:index`...', '`ui.content`'],
          ['`container`', 'Solo otros paquetes (y bundles) incrustados', '`all` y `ui.config`'],
          ['Mezcla de código y contenido', '**No permitido**: un paquete no puede desplegar a la vez en `/apps` y en áreas mutables', '—']
        ]}
      />
      <List items={[
        '**Carpetas de instalación.** Los paquetes incrustados en `all` van en `/apps/<app>-packages/(application|content|container)/install`. Con el sufijo `install.author` o `install.publish` se instalan solo en ese tier; con `install`, en ambos.',
        '**Solo se despliega `all`.** Los demás paquetes se marcan para que Cloud Manager no los despliegue por separado.',
        '**Dependencias.** Los paquetes de contenido deben depender de los de código que los soportan (por ejemplo `ui.content` de `ui.apps`), para que AEM los instale en el orden correcto.',
        '**`/libs` es de Adobe.** Ningún paquete de proyecto puede escribir en `/libs`.',
        '**Sin solapamientos.** Dos paquetes no deben controlar la misma ruta en sus filtros.'
      ]} />

      <SectionTitle>Repoinit o ui.content: ¿cuál uso?</SectionTitle>
      <DataTable
        headers={['Necesitas crear...', 'Usa', 'Por qué']}
        rows={[
          ['Carpetas base y estructuras que el código necesita', '**Repoinit**', 'Idempotente y se ejecuta en cada despliegue y arranque'],
          ['Service users, grupos y permisos (ACL)', '**Repoinit**', 'Es la forma recomendada por Adobe ([[ch-44]])'],
          ['Páginas iniciales, plantillas editables y políticas', '**`ui.content`** (modo merge)', 'Es contenido que después editan los autores'],
          ['Datos de prueba para tu equipo local', '**Paquete manual** o Package Manager', 'No debe llegar a producción']
        ]}
      />
      <CodeBlock filename="ejemplo de script repoinit" language="text" code={repoinitExample} />
      <List items={[
        '`create path (tipo) ruta` crea la ruta con ese tipo de nodo si no existe.',
        '`create service user practica-lector` crea un usuario de sistema para que el código lea el repositorio sin usar credenciales de personas.',
        '`set ACL for ... end` asigna permisos: aquí, solo lectura sobre el sitio.',
        'Los scripts van en el campo `scripts` de la configuración `RepositoryInitializer` de `ui.config`, como viste en [[ch-9]].'
      ]} />

      <SectionTitle>Mover grandes volúmenes de contenido</SectionTitle>
      <Paragraph>{'Package Manager está pensado para paquetes medianos: con cientos de megas o miles de assets, las instalaciones se vuelven lentas o superan los tiempos de espera ([[ch-6]]). Para migraciones grandes hay herramientas específicas:'}</Paragraph>
      <DataTable
        headers={['Herramienta', 'Cuándo', 'Nota']}
        rows={[
          ['**VLT-RCP** (`vlt rcp`)', 'Copiar ramas grandes entre instancias AEM 6.5 o locales', 'Copia en lotes directamente de una instancia a otra, sin crear zips'],
          ['**Content Transfer Tool**', 'Migrar de AEM 6.5 a AEM as a Cloud Service o entre entornos de Cloud', 'Es la herramienta que recomienda Adobe para Cloud ([[ch-145]])']
        ]}
      />
      <CodeBlock filename="terminal · copia remota con vlt rcp" language="bash" code={vltRcp} />
      <List items={[
        '`-r` copia de forma recursiva todo lo que hay debajo de la ruta.',
        '`-b 500` guarda cada 500 nodos, para no mantener una transacción gigante en memoria.',
        '`-t 1` espera 1 segundo después de cada guardado, para no saturar las instancias.',
        'Las direcciones siguen el formato `http://usuario:contraseña@host:puerto/crx/-/jcr:root/ruta`: origen primero, destino después.',
        'Como recomienda Shankar Angadi en su artículo sobre VLT-RCP (en las lecturas recomendadas): si copias assets, **desactiva temporalmente los workflows del DAM** en el destino, para que no reprocese cada imagen, y **vigila CPU, memoria y disco** durante la copia.'
      ]} />

      <SectionTitle>Errores comunes</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa', 'Solución']}
        rows={[
          ['Al desplegar se perdieron páginas creadas por autores', '`ui.content` en modo replace o un filtro demasiado amplio', 'Modo `merge_properties` y filtros específicos'],
          ['Una regla `exclude` no excluye los hijos', 'Falta `(/.*)?` al final de la expresión', 'Usar `/ruta(/.*)?`'],
          ['Cloud Manager rechaza el paquete', 'Mezcla de `/apps` y contenido mutable en un mismo paquete, o `packageType` incorrecto', 'Separar en `ui.apps` y `ui.content` con su tipo'],
          ['Package Manager no reconoce el zip', '`META-INF` y `jcr_root` no están en la raíz del zip', 'Empaquetar con `jar -cfM ... -C . .`'],
          ['Contenido de otro equipo desaparece al desplegar', 'Dos paquetes controlan la misma ruta', 'Revisar y separar los filtros']
        ]}
      />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Filtros mínimos: controla solo las ramas que realmente te pertenecen.',
        '`replace` para código, `merge_properties` para contenido inicial; evita los modos deprecados en proyectos nuevos.',
        'Termina siempre las reglas de rama con `(/.*)?`.',
        'Estructuras, usuarios y permisos con repoinit; nunca a mano en producción.',
        'Antes de instalar un paquete ajeno, lee su `filter.xml` y usa **Test Install**.',
        'Para migraciones grandes, VLT-RCP (6.5) o Content Transfer Tool (Cloud), no Package Manager.'
      ]} />

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'FileVault traduce el repositorio a archivos y viceversa; es el formato de paquetes, de Maven y de las herramientas de sincronización.',
        'Un `.content.xml` puede contener nodos hijos anidados, como un diálogo completo.',
        'En `filter.xml` gana la última regla que coincide y la primera fija el valor por defecto; `(/.*)?` cubre los descendientes.',
        '`replace` deja la rama idéntica al paquete; `merge_properties` solo agrega; `update_properties` agrega y actualiza; `merge` y `update` están deprecados.',
        'En Cloud Service cada paquete es `application`, `content` o `container`, sin mezclas.',
        'Repoinit para estructura y permisos; `ui.content` para contenido inicial; VLT-RCP o Content Transfer Tool para volúmenes grandes.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['FileVault', 'Herramienta de Apache Jackrabbit que serializa el JCR en archivos'],
          ['DocView', 'El formato XML de los archivos `.content.xml`'],
          ['Workspace filter', 'El contenido de `filter.xml`: ramas, reglas y modos'],
          ['Modo de importación', 'Cómo se trata el contenido existente al instalar (replace, merge_properties...)'],
          ['packageType', 'Tipo de paquete: application, content o container'],
          ['VLT-RCP', 'Copia remota de contenido entre instancias con `vlt rcp`'],
          ['Content Transfer Tool', 'Herramienta de Adobe para migrar contenido a Cloud Service']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Workspace Filter', source: 'Apache Jackrabbit FileVault', url: 'https://jackrabbit.apache.org/filevault/filter.html' },
        { type: 'image', title: 'ImportMode (Javadoc)', source: 'Apache Jackrabbit FileVault', url: 'https://jackrabbit.apache.org/filevault/apidocs/org/apache/jackrabbit/vault/fs/api/ImportMode.html' },
        { type: 'image', title: 'Estructura de proyecto y paquetes en AEM as a Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-project-content-package-structure' },
        { type: 'image', title: 'Vault Remote Copy (vlt rcp)', source: 'Apache Jackrabbit FileVault', url: 'https://jackrabbit.apache.org/filevault/rcp.html' },
        { type: 'image', title: 'Repository Initialization (repoinit)', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/repository-initialization.html' },
        { type: 'image', title: 'AEM: Migrate Large AEM Content Between Instances Using VLT-RCP', source: 'Medium · Shankar Angadi', url: 'https://medium.com/@angadi.saa/aem-migrate-large-aem-content-between-instances-using-vlt-rcp-7353a7bba16a' }
      ]} />
    </LessonPage>
  );
}
