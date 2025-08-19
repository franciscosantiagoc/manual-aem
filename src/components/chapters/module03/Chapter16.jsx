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
  Figure,
  VideoEmbed,
  ResourceLinks
} from '../../LessonUI';

const anatomy = `/apps/practica/components/aviso/      ← carpeta = nodo cq:Component
├── .content.xml          ← definición: título, grupo, herencia...
├── aviso.html            ← script HTL principal (mismo nombre que la carpeta)
├── _cq_dialog/           ← diálogo de edición (cq:dialog)
├── _cq_editConfig.xml    ← comportamiento en el editor (cq:editConfig)
├── _cq_template/         ← valores iniciales al insertarlo (cq:template)
├── _cq_design_dialog/    ← diálogo de política (cq:design_dialog), opcional
└── clientlibs/           ← CSS/JS propios, opcional`;

const versionTree = `ui.apps/src/main/content/jcr_root/apps/practica/components/
├── aviso/                         ← PROXY: el que ven los autores
│   └── .content.xml               (sling:resourceSuperType → base/aviso/v1/aviso)
└── base/aviso/
    ├── v1/aviso/                  ← implementación versión 1 (oculta)
    │   ├── .content.xml
    │   ├── aviso.html
    │   ├── _cq_dialog/.content.xml
    │   ├── _cq_editConfig.xml
    │   └── _cq_template/.content.xml
    └── v2/aviso/                  ← implementación versión 2 (oculta, hereda de v1)
        ├── .content.xml
        ├── aviso.html
        └── _cq_dialog/.content.xml   (solo agrega un campo)`;

const v1Content = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Aviso (v1)"
    jcr:description="Mensaje destacado de tipo información, advertencia o error"
    componentGroup=".hidden"/>`;

const v1Html = `<div data-sly-test.texto="\${properties.texto}"
     class="cmp-aviso cmp-aviso--\${properties.tipo || 'info'}"
     role="status">
    <p class="cmp-aviso__texto">\${texto}</p>
</div>
<div data-sly-test="\${!texto && wcmmode.edit}"
     class="cq-placeholder"
     data-emptytext="\${component.title}"></div>`;

const v1Dialog = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Aviso"
    sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/fixedcolumns">
        <items jcr:primaryType="nt:unstructured">
            <column
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/container">
                <items jcr:primaryType="nt:unstructured">
                    <texto
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textarea"
                        fieldLabel="Texto del aviso"
                        name="./texto"
                        required="{Boolean}true"/>
                    <tipo
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/select"
                        fieldLabel="Tipo"
                        name="./tipo">
                        <items jcr:primaryType="nt:unstructured">
                            <info jcr:primaryType="nt:unstructured" text="Información" value="info"/>
                            <advertencia jcr:primaryType="nt:unstructured" text="Advertencia" value="advertencia"/>
                            <error jcr:primaryType="nt:unstructured" text="Error" value="error"/>
                        </items>
                    </tipo>
                </items>
            </column>
        </items>
    </content>
</jcr:root>`;

const editConfig = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:EditConfig"
    cq:actions="[edit,-,copymove,delete,-,insert]"
    cq:dialogMode="floating">
    <cq:listeners
        jcr:primaryType="cq:EditListenersConfig"
        afteredit="REFRESH_SELF"/>
</jcr:root>`;

const template = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    tipo="info"/>`;

const proxy = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Aviso"
    jcr:description="Mensaje destacado para el visitante"
    sling:resourceSuperType="practica/components/base/aviso/v1/aviso"
    componentGroup="Sitio de Practica - Content"/>`;

const v2Content = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Aviso (v2)"
    jcr:description="Aviso con título opcional e ícono según el tipo"
    sling:resourceSuperType="practica/components/base/aviso/v1/aviso"
    componentGroup=".hidden"/>`;

const v2Html = `<div data-sly-test.texto="\${properties.texto}"
     class="cmp-aviso cmp-aviso--\${properties.tipo || 'info'}"
     role="status">
    <span class="cmp-aviso__icono" aria-hidden="true"></span>
    <div class="cmp-aviso__cuerpo">
        <strong data-sly-test="\${properties.titulo}" class="cmp-aviso__titulo">\${properties.titulo}</strong>
        <p class="cmp-aviso__texto">\${texto}</p>
    </div>
</div>
<div data-sly-test="\${!texto && wcmmode.edit}"
     class="cq-placeholder"
     data-emptytext="\${component.title}"></div>`;

const v2Dialog = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured">
    <content jcr:primaryType="nt:unstructured">
        <items jcr:primaryType="nt:unstructured">
            <column jcr:primaryType="nt:unstructured">
                <items jcr:primaryType="nt:unstructured">
                    <titulo
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                        sling:orderBefore="texto"
                        fieldLabel="Título (opcional)"
                        name="./titulo"/>
                </items>
            </column>
        </items>
    </content>
</jcr:root>`;

const scss = `.cmp-aviso {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-left: 4px solid #2563eb;
  border-radius: 8px;
  background: #eff6ff;

  &--advertencia {
    border-left-color: #d97706;
    background: #fffbeb;
  }

  &--error {
    border-left-color: #dc2626;
    background: #fef2f2;
  }

  &__icono::before {
    content: "ℹ";
    font-weight: 700;
  }

  &--advertencia &__icono::before {
    content: "⚠";
  }

  &--error &__icono::before {
    content: "✖";
  }

  &__titulo {
    display: block;
    margin-bottom: 0.25rem;
  }

  &__texto {
    margin: 0;
  }
}`;

const buildOut = `[INFO] --- htl:2.0.2-1.4.0:validate (validate-htl-scripts) @ practica.ui.apps ---
[INFO] Processed 10 files in 1940ms
[INFO] Sitio de Practica - UI Frontend .................... SUCCESS [01:35 min]
[INFO] Sitio de Practica - UI apps ........................ SUCCESS [ 15.143 s]
[INFO] Sitio de Practica - All ............................ SUCCESS [ 47.970 s]
[INFO] BUILD SUCCESS`;

const htlError = `[ERROR] ...\\components\\base\\aviso\\v1\\aviso\\aviso.html [4:41]: \${texto</p>
[INFO] BUILD FAILURE
[ERROR] Failed to execute goal org.apache.sling:htl-maven-plugin:2.0.2-1.4.0:validate
        (validate-htl-scripts) on project practica.ui.apps: Please check the reported syntax errors.`;

const upgrade = `<!-- components/aviso/.content.xml: cambiar SOLO esta línea -->
sling:resourceSuperType="practica/components/base/aviso/v2/aviso"`;

const titleProxy = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Title"
    sling:resourceSuperType="core/wcm/components/title/v3/title"
    componentGroup="Sitio de Practica - Content"/>`;

const titleDialog = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured">
    <content jcr:primaryType="nt:unstructured">
        <items jcr:primaryType="nt:unstructured">
            <tabs jcr:primaryType="nt:unstructured">
                <items jcr:primaryType="nt:unstructured">
                    <properties jcr:primaryType="nt:unstructured">
                        <items jcr:primaryType="nt:unstructured">
                            <columns jcr:primaryType="nt:unstructured">
                                <items jcr:primaryType="nt:unstructured">
                                    <column jcr:primaryType="nt:unstructured">
                                        <items jcr:primaryType="nt:unstructured">
                                            <subtitulo
                                                jcr:primaryType="nt:unstructured"
                                                sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                                sling:orderBefore="types"
                                                fieldLabel="Subtítulo (opcional)"
                                                name="./subtitulo"/>
                                            <id
                                                jcr:primaryType="nt:unstructured"
                                                sling:hideResource="{Boolean}true"/>
                                        </items>
                                    </column>
                                </items>
                            </columns>
                        </items>
                    </properties>
                </items>
            </tabs>
        </items>
    </content>
</jcr:root>`;

const titleHtml = `<div data-sly-use.title="com.adobe.cq.wcm.core.components.models.Title"
     data-sly-use.template="core/wcm/components/commons/v1/templates.html"
     data-sly-test.text="\${title.text}"
     data-cmp-data-layer="\${title.data.json}"
     id="\${title.id}"
     class="cmp-title">
    <h1 class="cmp-title__text" data-sly-element="\${title.type}"><a
            data-sly-unwrap="\${!title.link.valid || title.linkDisabled}"
            class="cmp-title__link"
            data-sly-attribute="\${title.link.htmlAttributes}"
            data-cmp-clickable="\${title.data ? true : false}">\${text}</a></h1>
    <p data-sly-test="\${properties.subtitulo}" class="cmp-title__subtitulo">\${properties.subtitulo}</p>
</div>
<sly data-sly-call="\${template.placeholder @ isEmpty=!text, classAppend='cmp-title'}"></sly>`;

// Diagrama del patrón proxy: el contenido apunta al proxy y el proxy elige la versión
const DiagramaProxy = () => (
  <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="f16-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--text-secondary)' }} />
      </marker>
    </defs>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={14 + i * 114} y="10" width="104" height="44" rx="8" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' }} />
        <text x={66 + i * 114} y="30" textAnchor="middle" fontSize="11" fontWeight="700" style={{ fill: 'var(--text-primary)' }}>{['Página A', 'Página B', '500 páginas…'][i]}</text>
        <text x={66 + i * 114} y="45" textAnchor="middle" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>instancia del Aviso</text>
        <line x1={66 + i * 114} y1="54" x2="180" y2="96" markerEnd="url(#f16-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.2 }} />
      </g>
    ))}
    <text x="250" y="80" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>sling:resourceType</text>
    <rect x="80" y="100" width="200" height="50" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--primary)', strokeWidth: 1.8 }} />
    <text x="180" y="121" textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: 'var(--text-primary)' }}>Proxy: components/aviso</text>
    <text x="180" y="138" textAnchor="middle" fontSize="10" style={{ fill: 'var(--text-secondary)' }}>visible para los autores · sin código</text>
    <line x1="150" y1="150" x2="95" y2="214" markerEnd="url(#f16-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.2, strokeDasharray: '4 4' }} />
    <line x1="210" y1="150" x2="265" y2="214" markerEnd="url(#f16-arrow)" style={{ stroke: 'var(--accent-cyan)', strokeWidth: 2.2 }} />
    <text x="40" y="186" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>antes</text>
    <text x="250" y="186" fontSize="9.5" fontWeight="700" style={{ fill: 'var(--accent-cyan)' }}>ahora</text>
    <text x="180" y="200" textAnchor="middle" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>sling:resourceSuperType</text>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={20 + i * 170} y="218" width="150" height="64" rx="9" style={{ fill: 'var(--bg-tertiary)', stroke: i ? 'var(--accent-cyan)' : 'var(--border-color)', strokeWidth: i ? 1.8 : 1 }} />
        <text x={95 + i * 170} y="240" textAnchor="middle" fontSize="12" fontWeight="700" style={{ fill: 'var(--text-primary)' }}>{['base/aviso/v1', 'base/aviso/v2'][i]}</text>
        <text x={95 + i * 170} y="256" textAnchor="middle" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>{['HTL, diálogo, editConfig', 'hereda de v1 + cambios'][i]}</text>
        <text x={95 + i * 170} y="271" textAnchor="middle" fontSize="9.5" style={{ fill: 'var(--text-secondary)' }}>oculta (.hidden)</text>
      </g>
    ))}
  </svg>
);

export default function Chapter16({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-16"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender qué es un componente en AEM y de qué nodos y archivos se compone.',
        'Conocer cada propiedad de la definición (`jcr:title`, `componentGroup`, `sling:resourceSuperType`...) y cada nodo especial (`cq:dialog`, `cq:editConfig`, `cq:template`...).',
        'Crear un componente desde cero y aplicar el patrón **versionado + proxy** que usan los Core Components.',
        'Publicar una versión nueva de un componente **sin romper** el contenido existente.',
        'Conocer el catálogo de Core Components y saber **heredarlos y personalizarlos** en cuatro niveles: estilos, diálogo, HTML y lógica.',
        'Aprovechar las validaciones del build (HTL y FileVault) para detectar errores antes de desplegar.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas el proyecto de los laboratorios ([[ch-11]] o [[ch-12]]) y conocer cómo se ve un componente como autor ([[ch-5]]) y en el repositorio ([[ch-6]]). En el [[ch-11]] ya creaste un componente completo con Sling Model; aquí profundizamos en su **estructura** y en cómo **evolucionarlo**. Todo el código de este tema se **compiló**: el build validó los 10 scripts HTL del proyecto y terminó en BUILD SUCCESS.'}
      </Alert>

      <SectionTitle>¿Qué es un componente?</SectionTitle>
      <Paragraph>{'Un **componente** es una pieza reutilizable que el autor coloca en las páginas: un título, una imagen, un aviso. Técnicamente es **un nodo `cq:Component` en `/apps`** que agrupa todo lo necesario para mostrarse y editarse: el script que genera el HTML, el diálogo para configurarlo y las reglas de edición.'}</Paragraph>
      <Paragraph>{'Cada vez que un autor inserta un componente en una página, AEM crea un **nodo de contenido** con `sling:resourceType` apuntando al componente ([[ch-5]]). Al renderizar, Sling busca ese tipo en `/apps` (y luego en `/libs`) y ejecuta su script ([[ch-2]]). Así, el componente es la "plantilla" y cada instancia en una página son sus "datos".'}</Paragraph>
      <FlowDiagram
        caption="Componente (código en /apps) e instancias (contenido en /content)"
        steps={[
          { title: 'Componente', detail: '`/apps/practica/components/aviso`', tone: 'purple' },
          { title: 'Instancia en una página', detail: 'Nodo con `sling:resourceType = practica/components/aviso`', tone: 'primary' },
          { title: 'Sling resuelve el tipo', detail: 'Busca el script en `/apps` y luego `/libs`', tone: 'cyan' },
          { title: 'HTML', detail: 'El script lee las propiedades de la instancia', tone: 'success' }
        ]}
      />

      <SectionTitle>Anatomía de un componente</SectionTitle>
      <CodeBlock filename="estructura de un componente" language="text" code={anatomy} />
      <DataTable
        caption="Propiedades de la definición (.content.xml del componente)"
        headers={['Propiedad', 'Qué define', 'Ejemplo']}
        rows={[
          ['`jcr:primaryType`', 'Siempre `cq:Component`', '`cq:Component`'],
          ['`jcr:title`', 'Nombre visible en la lista de componentes del editor', '`Aviso`'],
          ['`jcr:description`', 'Descripción que ve el autor', '`Mensaje destacado...`'],
          ['`componentGroup`', 'Grupo del panel de componentes. **`.hidden` lo oculta** a los autores', '`Sitio de Practica - Content`'],
          ['`sling:resourceSuperType`', 'Componente del que **hereda** scripts, diálogo y configuración', '`core/wcm/components/title/v3/title`'],
          ['`cq:isContainer`', 'Indica que el componente contiene a otros (como un contenedor o pestañas)', '`{Boolean}true`'],
          ['`cq:icon`', 'Ícono del panel de componentes (de la librería Coral)', '`alert`']
        ]}
      />
      <DataTable
        caption="Nodos especiales dentro del componente"
        headers={['En disco', 'En el repositorio', 'Para qué sirve']}
        rows={[
          ['`aviso.html`', '`aviso.html`', 'Script HTL principal. Debe llamarse **igual que el componente** para ser el script por defecto'],
          ['`_cq_dialog/`', '`cq:dialog`', 'Diálogo con los campos que llena el autor ([[ch-21]])'],
          ['`_cq_editConfig.xml`', '`cq:editConfig`', 'Acciones disponibles, modo del diálogo, edición en línea y qué se refresca tras editar'],
          ['`_cq_template/`', '`cq:template`', 'Propiedades iniciales que se copian al insertar el componente'],
          ['`_cq_design_dialog/`', '`cq:design_dialog`', 'Diálogo de la **política** (configuración a nivel de plantilla, no de instancia)'],
          ['`_cq_htmlTag/`', '`cq:htmlTag`', 'Personaliza el elemento que envuelve al componente (etiqueta, clases)']
        ]}
      />
      <Alert type="tip" title="Un componente sin diálogo también es válido">
        {'Solo el nodo `cq:Component` y un script son imprescindibles. El diálogo, la configuración de edición y la plantilla son opcionales: agrégalos cuando el componente los necesite.'}
      </Alert>

      <SectionTitle>Dos formas de construir componentes</SectionTitle>
      <DataTable
        headers={['Forma', 'Cómo', 'Cuándo']}
        rows={[
          ['**Proxy de un Core Component**', 'Un componente sin código que hereda de un Core Component con `sling:resourceSuperType`', 'Casi siempre que Adobe ya ofrece el componente (título, imagen, teaser...). Lo viste en [[ch-9]] y se profundiza en [[ch-19]] y [[ch-20]]'],
          ['**Componente propio**', 'Tu propio HTL, diálogo y, si hace falta, Sling Model', 'Cuando ningún Core Component resuelve la necesidad (como la tarjeta del [[ch-11]] o el aviso de este tema)']
        ]}
      />
      <Paragraph>{'En ambos casos conviene aplicar el mismo patrón que usan los Core Components: **implementación versionada + proxy**.'}</Paragraph>

      <SectionTitle>El patrón versionado + proxy</SectionTitle>
      <Paragraph>{'Imagina que el componente **Aviso** está en 500 páginas y necesitas cambiar su HTML de forma incompatible. Si editas el componente directamente, cambian las 500 páginas a la vez, para bien o para mal. El patrón versionado lo resuelve:'}</Paragraph>
      <List items={[
        '**Implementaciones versionadas** (`base/aviso/v1/aviso`, `base/aviso/v2/aviso`): contienen el código real y están **ocultas** para los autores (`componentGroup=".hidden"`). Una versión publicada **no se modifica** de forma incompatible.',
        '**Proxy** (`aviso`): el único componente visible. No tiene código propio; hereda de una versión con `sling:resourceSuperType`. **El contenido de las páginas apunta al proxy**, nunca a una versión.',
        '**Actualizar** consiste en cambiar una sola línea del proxy (de `v1` a `v2`). Si algo falla, se vuelve atrás con la misma línea.',
        'Es exactamente lo que hacen los Core Components: `/libs/core/wcm/components/title/v2/title` y `.../v3/title` conviven, y tu proxy `practica/components/title` elige cuál usar ([[ch-9]]).'
      ]} />
      <Figure
        alt="Las páginas apuntan al proxy del Aviso; el proxy hereda de la versión 1 o de la versión 2"
        caption="El contenido nunca cambia: para pasar de v1 a v2 solo se mueve la flecha `sling:resourceSuperType` del proxy."
      >
        <DiagramaProxy />
      </Figure>
      <CodeBlock filename="estructura del laboratorio" language="text" code={versionTree} />

      <SectionTitle>Laboratorio · Versión 1 del componente Aviso</SectionTitle>
      <Paragraph>{'Crea los archivos en `ui.apps` de tu proyecto. **Definición de la versión 1:**'}</Paragraph>
      <CodeBlock filename="base/aviso/v1/aviso/.content.xml" language="xml" code={v1Content} />
      <List items={[
        '`componentGroup=".hidden"`: la versión no aparece en el panel de componentes; los autores solo verán el proxy.',
        '`jcr:title="Aviso (v1)"`: el número de versión en el título ayuda a identificarla en CRXDE y en herramientas de administración.'
      ]} />
      <CodeBlock filename="base/aviso/v1/aviso/aviso.html" language="html" code={v1Html} />
      <List items={[
        '`data-sly-test.texto="${properties.texto}"` muestra el bloque solo si el autor escribió texto, y guarda el valor en la variable `texto`.',
        '`properties` es un objeto que HTL ofrece siempre: las propiedades del nodo de **esta instancia** del componente.',
        '`${properties.tipo || \'info\'}` usa `info` si no hay tipo: el operador `||` da un valor por defecto.',
        '`role="status"` indica a los lectores de pantalla que es un mensaje de estado (accesibilidad).',
        'El segundo `div` solo aparece si no hay texto **y** estamos en modo edición (`wcmmode.edit`): es el marcador clásico de AEM (`cq-placeholder`), que muestra el texto de `data-emptytext` para que el autor sepa que debe configurar el componente.',
        '`${component.title}` es el título del componente que se está renderizando.',
        'HTL se estudia en detalle en [[ch-17]]; aquí no hace falta Sling Model porque solo mostramos propiedades.'
      ]} />
      <CodeBlock filename="base/aviso/v1/aviso/_cq_dialog/.content.xml" language="xml" code={v1Dialog} />
      <List items={[
        'Un `textarea` obligatorio para el texto (`required="{Boolean}true"`).',
        'Un `select` con tres opciones: cada nodo de `items` tiene el `text` que ve el autor y el `value` que se guarda en la propiedad `tipo`.'
      ]} />
      <CodeBlock filename="base/aviso/v1/aviso/_cq_editConfig.xml" language="xml" code={editConfig} />
      <List items={[
        '`cq:actions` define los botones de la barra del componente en el editor: `edit` (abrir diálogo), `copymove`, `delete` e `insert`; el guion `-` agrega un separador.',
        '`cq:dialogMode="floating"` abre el diálogo flotante sobre la página (otras opciones: `inline` y `auto`).',
        '`cq:listeners` con `afteredit="REFRESH_SELF"` recarga **solo este componente** después de editarlo, en lugar de toda la página. Las distintas opciones de refresco se ven en [[ch-59]].'
      ]} />
      <CodeBlock filename="base/aviso/v1/aviso/_cq_template/.content.xml" language="xml" code={template} />
      <List items={[
        '`cq:template` define propiedades que se copian al nodo cuando el autor inserta el componente: el aviso empieza con `tipo="info"`.',
        'Es la forma de dar valores iniciales sin depender de que el autor abra el diálogo.'
      ]} />
      <Paragraph>{'**El proxy**, el componente que usarán los autores:'}</Paragraph>
      <CodeBlock filename="components/aviso/.content.xml" language="xml" code={proxy} />
      <List items={[
        '`sling:resourceSuperType` apunta a la versión 1: el proxy hereda su HTL, diálogo, edit config y template.',
        '`componentGroup="Sitio de Practica - Content"`: la política de la plantilla permite ese grupo, así que el aviso aparece solo en el editor ([[ch-11]]).',
        'Las instancias en las páginas tendrán `sling:resourceType = practica/components/aviso`: **nunca** la ruta de una versión.'
      ]} />
      <Paragraph>{'**Estilos** (en `ui.frontend`, se importan automáticamente):'}</Paragraph>
      <CodeBlock filename="ui.frontend/src/main/webpack/components/_aviso.scss" language="scss" code={scss} />
      <List items={[
        'Un modificador BEM por tipo: `--advertencia` y `--error` cambian color y fondo.',
        'El ícono se dibuja con `::before`, así el HTML queda limpio; `aria-hidden` en el HTML evita que los lectores de pantalla lo lean.'
      ]} />

      <SectionTitle>Compilar y aprovechar las validaciones</SectionTitle>
      <Paragraph>{'Ejecuta `mvn clean install -pl ui.frontend,ui.apps,all -PautoInstallSinglePackage` (o el despliegue que prefieras, [[ch-15]]). Salida real de nuestra verificación:'}</Paragraph>
      <CodeBlock filename="salida real" language="text" code={buildOut} />
      <Paragraph>{'El plugin `htl-maven-plugin` **valida la sintaxis de todos los scripts HTL** y, en el proyecto generado, está configurado para fallar incluso con advertencias. Si te equivocas, lo sabes en segundos. Así se ve un error real que provocamos (una expresión sin cerrar):'}</Paragraph>
      <CodeBlock filename="error real de sintaxis HTL" language="text" code={htlError} />
      <List items={[
        'El mensaje indica el **archivo**, la **línea y columna** (`[4:41]`) y el fragmento con el error.',
        'El build se detiene: el HTL roto nunca llega a AEM.',
        'Los validadores de FileVault revisan además la estructura y el XML de los paquetes ([[ch-12]]).'
      ]} />

      <SectionTitle>Probar como autor</SectionTitle>
      <VideoEmbed
        provider="adobe"
        id="330986"
        title="Component Basics - Component Authoring"
        source="Adobe · tutorial WKND"
        lang="inglés"
        caption="Video oficial: cómo se agrega, configura e inspecciona un componente en el editor (con un HelloWorld en lugar del Aviso)."
      />
      <List items={[
        '**1.** Abre una página del sitio en el editor y busca **Aviso** en el grupo *Sitio de Practica - Content*. No aparecerán "Aviso (v1)" ni "Aviso (v2)": están ocultas.',
        '**2.** Arrástralo: verás el marcador con el texto "Aviso".',
        '**3.** Abre el diálogo: el tipo ya viene en *Información* gracias a `cq:template`. Escribe un texto, elige *Advertencia* y guarda: solo el componente se refresca.',
        '**4.** Con la AEM Chrome Extension pulsa `c` para ver el nodo en CRXDE Lite ([[ch-6]]): su `sling:resourceType` es `practica/components/aviso` y tiene las propiedades `texto` y `tipo`.'
      ]} />

      <SectionTitle>Laboratorio · Publicar la versión 2 sin romper nada</SectionTitle>
      <Paragraph>{'Ahora el negocio pide un **título opcional** y un **ícono** según el tipo. En lugar de modificar la v1, creamos la v2 heredando de ella y cambiando solo lo necesario.'}</Paragraph>
      <CodeBlock filename="base/aviso/v2/aviso/.content.xml" language="xml" code={v2Content} />
      <List items={[
        'La v2 **hereda de la v1** (`sling:resourceSuperType`): se lleva su diálogo, edit config y template sin copiarlos.'
      ]} />
      <CodeBlock filename="base/aviso/v2/aviso/aviso.html" language="html" code={v2Html} />
      <List items={[
        'Un script con el mismo nombre (`aviso.html`) **reemplaza** al heredado de la v1.',
        'Agrega el ícono y un título opcional (solo se muestra si existe `titulo`).'
      ]} />
      <CodeBlock filename="base/aviso/v2/aviso/_cq_dialog/.content.xml" language="xml" code={v2Dialog} />
      <List items={[
        'Este diálogo **no repite** los campos de la v1: gracias al **Sling Resource Merger**, AEM combina el diálogo de la v2 con el heredado siguiendo la misma estructura de nodos (`content/items/column/items`).',
        'Solo define el campo nuevo `titulo`; los nodos intermedios no llevan `sling:resourceType` porque ya lo aportan los de la v1.',
        '`sling:orderBefore="texto"` coloca el campo nuevo **antes** del campo `texto` heredado.',
        'El Resource Merger y los overlays se estudian en [[ch-41]] y [[ch-64]].'
      ]} />
      <Paragraph>{'**Activar la v2** es cambiar una sola línea del proxy:'}</Paragraph>
      <CodeBlock filename="components/aviso/.content.xml" language="xml" code={upgrade} />
      <List items={[
        'Despliega `ui.apps` y recarga una página con avisos: **todos** usan ahora la v2, sin tocar ni un nodo de contenido.',
        'Los avisos existentes siguen funcionando: su `texto` y su `tipo` se leen igual, y el título simplemente no aparece hasta que el autor lo agregue.',
        'Si hay un problema, vuelves a `v1` con la misma línea.',
        'Si un proyecto necesita convivir con ambas versiones, puede tener dos proxies (por ejemplo `aviso` con v1 y `aviso-destacado` con v2).'
      ]} />
      <Alert type="warning" title="¿Cuándo crear una versión nueva?">
        {'Crea una **versión nueva** cuando el cambio sea **incompatible**: cambias el HTML que otros estilos o scripts esperan, renombras propiedades o cambias su significado. Para cambios **compatibles** (corregir un error, agregar un campo opcional que no altera lo existente) basta con modificar la versión actual. Renombrar propiedades es el caso más peligroso: el contenido viejo quedaría con la propiedad anterior.'}
      </Alert>

      <SectionTitle>Componentes heredados: extender los Core Components</SectionTitle>
      <Paragraph>{'Tu Aviso v2 hereda de tu propia v1, pero el caso más frecuente en proyectos reales es **heredar de un Core Component** de Adobe. En lugar de programar un título, una imagen o un menú de navegación desde cero, creas un componente en tu proyecto que hereda del de Adobe y **personalizas solo lo que tu diseño necesita**.'}</Paragraph>
      <Paragraph>{'**¿Qué se hereda?** Cuando Sling renderiza un componente y no encuentra algo en él, lo busca en su `sling:resourceSuperType`, y luego en el padre de ese, y así sucesivamente. Se heredan:'}</Paragraph>
      <List items={[
        '**Scripts HTL**: si tu componente no tiene `title.html`, se usa el del padre.',
        '**Diálogo** (`cq:dialog`) y **diálogo de diseño** (`cq:design_dialog`): se combinan con los tuyos mediante el Resource Merger.',
        '**Configuración de edición** (`cq:editConfig`) y **plantilla** (`cq:template`), cuando tu componente no define la suya.',
        '**Sling Model**: el HTL heredado lo usa con `data-sly-use`, así que la lógica Java viene incluida sin escribir una línea.',
        'Lo que **no** se hereda: el `jcr:title`, el `componentGroup` y la ubicación en el panel. Cada componente define los suyos.'
      ]} />
      <FlowDiagram
        caption="Cadena de herencia del Título del proyecto"
        steps={[
          { title: 'Contenido', detail: '`sling:resourceType = practica/components/title`', tone: 'primary' },
          { title: 'Proxy del proyecto', detail: '`/apps/practica/components/title`', tone: 'purple' },
          { title: 'Core Component', detail: '`core/wcm/components/title/v3/title` (en `/libs` o `/apps`)', tone: 'cyan' },
          { title: 'Script encontrado', detail: 'Sling sube por la cadena hasta hallar `title.html`', tone: 'success' }
        ]}
      />

      <SectionTitle>Catálogo de Core Components que puedes heredar</SectionTitle>
      <Paragraph>{'Esta es la lista de componentes incluidos en **Core Components 2.28.0**, la versión que integra el arquetipo 58. La columna *Última versión* sale del paquete de Adobe; la columna *Arquetipo* indica de qué versión hereda el proxy que genera el arquetipo. Su ruta es `core/wcm/components/<nombre>/vN/<nombre>`: en **Cloud Service** vienen incluidos en el producto, bajo `/libs`; en **6.5** los instala tu proyecto como paquete, bajo `/apps` ([[ch-11]]). Como Sling busca los tipos en `/apps` y luego en `/libs`, el mismo `sling:resourceSuperType="core/wcm/components/title/v3/title"` funciona en ambos.'}</Paragraph>
      <DataTable
        caption="Componentes de página y estructura"
        headers={['Componente', 'Última versión', 'Arquetipo', 'Uso típico']}
        rows={[
          ['Page', '`page/v3`', 'v3', 'Base de todas las páginas: `<head>`, clientlibs, metadatos'],
          ['Container', '`container/v1`', 'v1', 'Agrupa componentes; base del layout responsive'],
          ['Tabs', '`tabs/v1`', 'v1', 'Contenido en pestañas'],
          ['Accordion', '`accordion/v1`', 'v1', 'Secciones desplegables (preguntas frecuentes)'],
          ['Carousel', '`carousel/v1`', 'v1', 'Carrusel de paneles'],
          ['Experience Fragment', '`experiencefragment/v2`', 'v2', 'Reutiliza encabezado, pie o bloques ([[ch-5]])'],
          ['Separator', '`separator/v1`', 'v1', 'Línea divisoria']
        ]}
      />
      <DataTable
        caption="Componentes de contenido"
        headers={['Componente', 'Última versión', 'Arquetipo', 'Uso típico']}
        rows={[
          ['Title', '`title/v3`', 'v3', 'Encabezados h1–h6 con enlace opcional'],
          ['Text', '`text/v2`', 'v2', 'Texto enriquecido (RTE)'],
          ['Image', '`image/v3`', 'v3', 'Imagen adaptable con recorte y texto alternativo'],
          ['Teaser', '`teaser/v2`', 'v2', 'Imagen + título + descripción + llamada a la acción'],
          ['Button', '`button/v2`', 'v2', 'Botón o enlace con ícono'],
          ['List', '`list/v4`', 'v3', 'Lista de páginas (hijas, por etiqueta, por búsqueda)'],
          ['Download', '`download/v2`', 'v2', 'Enlace de descarga de un asset'],
          ['Embed', '`embed/v2`', 'v2', 'Contenido externo (YouTube, HTML)'],
          ['PDF Viewer', '`pdfviewer/v1`', 'v1', 'Visor de PDF incrustado'],
          ['Content Fragment', '`contentfragment/v1`', 'v1', 'Muestra un Content Fragment ([[ch-35]])'],
          ['Content Fragment List', '`contentfragmentlist/v2`', 'v2', 'Lista de Content Fragments de un modelo'],
          ['Progress Bar', '`progressbar/v1`', 'v1', 'Barra de progreso'],
          ['Table of Contents', '`tableofcontents/v1`', 'v1', 'Índice automático de los títulos de la página']
        ]}
      />
      <DataTable
        caption="Componentes de navegación y formularios"
        headers={['Componente', 'Última versión', 'Arquetipo', 'Uso típico']}
        rows={[
          ['Navigation', '`navigation/v2`', 'v2', 'Menú principal a partir del árbol de páginas'],
          ['Language Navigation', '`languagenavigation/v2`', 'v2', 'Selector de idioma o país'],
          ['Breadcrumb', '`breadcrumb/v3`', 'v3', 'Ruta de migas de pan'],
          ['Search', '`search/v2`', 'v2', 'Búsqueda rápida en el sitio'],
          ['Form Container', '`form/container/v2`', 'v2', 'Contenedor de un formulario básico'],
          ['Form Text', '`form/text/v2`', 'v2', 'Campo de texto de formulario'],
          ['Form Options', '`form/options/v2`', 'v2', 'Casillas, radios o lista desplegable'],
          ['Form Hidden', '`form/hidden/v2`', 'v2', 'Campo oculto'],
          ['Form Button', '`form/button/v2`', 'v2', 'Botón de envío']
        ]}
      />
      <Alert type="info" title="Versiones anteriores y la v4 del List">
        {'El paquete también trae versiones antiguas (como `title/v1`, `image/v1` o `list/v1`) para no romper proyectos viejos; no las uses en código nuevo. Observa que el arquetipo 58 genera el proxy de **List en v3**, aunque ya existe `list/v4`: igual que con tu Aviso, subir de versión es decisión tuya, cambiando el `sling:resourceSuperType` del proxy tras revisar las notas de la versión. El catálogo completo, con qué ofrece cada componente, se estudia en [[ch-19]].'}
      </Alert>

      <SectionTitle>Cómo heredar un Core Component</SectionTitle>
      <Paragraph>{'Heredar es crear un proxy: un nodo `cq:Component` que apunta al Core Component. Este es el proxy del Título que genera el arquetipo (archivo real del proyecto):'}</Paragraph>
      <CodeBlock filename="components/title/.content.xml" language="xml" code={titleProxy} />
      <List items={[
        'Sin ningún otro archivo, el componente ya funciona: HTL, diálogo, Sling Model y estilos base vienen del Core Component.',
        'Para agregar otro (por ejemplo, **Table of Contents**, que el arquetipo sí incluye, o uno que borraste), crea la carpeta con su `.content.xml`, cambia la ruta del `sling:resourceSuperType` y el `jcr:title`, y permítelo en la política del contenedor de la plantilla ([[ch-30]]).'
      ]} />

      <SectionTitle>Cómo personalizar un componente heredado</SectionTitle>
      <Paragraph>{'Ordena las opciones de **menor a mayor impacto** y usa siempre la menor que resuelva la necesidad. Cuanto menos copies del Core Component, más fácil será aprovechar las correcciones de Adobe en futuras versiones.'}</Paragraph>
      <DataTable
        headers={['Nivel', 'Qué cambias', 'Cómo', 'Dónde se profundiza']}
        rows={[
          ['**1. Estilos**', 'Solo la apariencia', 'CSS sobre las clases BEM del componente (`.cmp-title__text`) o variantes con el **Style System**', '[[ch-24]], [[ch-28]]'],
          ['**2. Diálogo**', 'Agregar, ocultar o reordenar campos', 'Un `_cq_dialog` en tu proxy con **solo las diferencias**: el Resource Merger lo combina con el del Core Component', '[[ch-21]], [[ch-64]]'],
          ['**3. HTML**', 'El marcado que se genera', 'Un script con el **mismo nombre** en tu proxy (`title.html`) reemplaza al heredado', '[[ch-17]], [[ch-20]]'],
          ['**4. Lógica**', 'Datos que el modelo de Adobe no ofrece', 'Un Sling Model propio que **delega** en el de Adobe y agrega métodos', '[[ch-45]]']
        ]}
      />

      <SectionTitle>Laboratorio · Título con subtítulo</SectionTitle>
      <Paragraph>{'Requisito de diseño: el Título debe poder mostrar un **subtítulo opcional** debajo, y los autores no deben poder cambiar el **ID HTML**. Usaremos los niveles 2 (diálogo) y 3 (HTML). Estos archivos se agregaron al proyecto y el build terminó en BUILD SUCCESS, con la validación HTL procesando ahora 11 archivos.'}</Paragraph>
      <Paragraph>{'**Paso 1 · Extender el diálogo.** Estudia primero la estructura del diálogo de Adobe (en CRXDE Lite, `/libs/core/wcm/components/title/v3/title/cq:dialog` en Cloud Service o `/apps/core/...` en 6.5): los campos están en `content/items/tabs/items/properties/items/columns/items/column/items`. Tu diálogo debe **repetir exactamente esa ruta de nodos**, sin `sling:resourceType`, y definir solo los cambios:'}</Paragraph>
      <CodeBlock filename="components/title/_cq_dialog/.content.xml" language="xml" code={titleDialog} />
      <List items={[
        '`subtitulo` es un campo **nuevo**: lleva su `sling:resourceType` completo y se guarda en la propiedad `./subtitulo`.',
        '`sling:orderBefore="types"` lo coloca justo debajo del campo *Title* y antes de *Type / Size* (el nodo `types` del diálogo de Adobe).',
        '`id` **ya existe** en el diálogo de Adobe; al repetir su nombre con `sling:hideResource="{Boolean}true"`, el Resource Merger lo oculta.',
        'Los campos que no mencionas (título, tipo, enlace) y la pestaña *Styles* siguen apareciendo, heredados de Adobe.'
      ]} />
      <Paragraph>{'**Paso 2 · Sobrescribir el HTL.** Copia `title.html` de `core/wcm/components/title/v3/title` (misma ubicación que el diálogo; el original incluye un comentario de licencia que aquí omitimos) y agrega solo lo necesario:'}</Paragraph>
      <CodeBlock filename="components/title/title.html" language="html" code={titleHtml} />
      <List items={[
        'Líneas 1–12: idénticas al original de Adobe. `data-sly-use.title` sigue usando el **Sling Model de Adobe** (`com.adobe.cq.wcm.core.components.models.Title`), así que el texto por defecto (el título de la página si el autor no escribe nada), el tipo de encabezado y el enlace funcionan igual.',
        '`data-sly-element="${title.type}"` cambia la etiqueta `h1` por la que el autor eligió (h2, h3...).',
        'Línea 13, la **única nueva**: el párrafo con la clase BEM `cmp-title__subtitulo`, visible solo si el autor escribió un subtítulo.',
        'La última línea usa la plantilla de marcador de los Core Components: muestra el placeholder cuando el título está vacío.'
      ]} />
      <Alert type="warning" title="El costo de sobrescribir el HTL">
        {'Al copiar `title.html` dejas de recibir los cambios que Adobe haga en **ese archivo** en versiones futuras (por ejemplo, mejoras de accesibilidad). El diálogo y el Sling Model sí se siguen heredando. Por eso: copia solo el script que necesitas cambiar, conserva las mismas clases CSS y, al actualizar Core Components, compara tu copia con la nueva versión del original.'}
      </Alert>
      <Paragraph>{'**Paso 3 · Probar.** Despliega, agrega un Título a una página y abre el diálogo: verás *Subtítulo (opcional)* bajo *Title* y ya no verás *ID*. Los títulos que ya existían en las páginas siguen igual, porque sin `subtitulo` la línea nueva no genera nada.'}</Paragraph>

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Nombres de componente en minúsculas y sin espacios; el script principal con el mismo nombre que la carpeta.',
        'El contenido siempre apunta a **proxies** en `/apps/<proyecto>/components`, nunca a versiones ni a `/libs`.',
        'Versiones ocultas con `componentGroup=".hidden"`; solo los proxies en grupos visibles.',
        'Prefiere heredar (Core Components o una versión anterior) antes que copiar código.',
        'Marcador para componentes vacíos, para que el autor siempre sepa qué configurar.',
        'Nunca modifiques componentes en `/libs`: extiéndelos desde `/apps`.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['El componente no aparece en el panel', 'Grupo no permitido por la política o `.hidden`', 'Revisar `componentGroup` del proxy'],
          ['Aparecen "Aviso (v1)" y "Aviso (v2)" para los autores', 'Las versiones no tienen `.hidden`', 'Poner `componentGroup=".hidden"` en las versiones'],
          ['El componente no muestra nada y no hay marcador', 'El script no se llama igual que el componente o falta el placeholder', 'Renombrar el `.html` y agregar el `cq-placeholder`'],
          ['El diálogo de la v2 no muestra los campos de la v1', 'Estructura de nodos distinta a la de la v1', 'Repetir exactamente la ruta `content/items/column/items`'],
          ['El build falla en `validate-htl-scripts`', 'Error de sintaxis HTL', 'Ir al archivo, línea y columna del mensaje']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Crea el componente Aviso completo (v1 y proxy) y pruébalo como autor.',
        '**2.** Coloca tres avisos de distintos tipos en una página.',
        '**3.** Crea la v2 y cambia el proxy. Comprueba que los tres avisos siguen funcionando y ahora muestran el ícono.',
        '**4.** Agrega un título a uno de ellos desde el diálogo (el campo aparece antes del texto).',
        '**5.** Vuelve el proxy a v1 y comprueba que todo sigue funcionando (el título simplemente deja de mostrarse).',
        '**6.** Aplica el laboratorio del Título con subtítulo. Después, por tu cuenta, extiende el **Teaser** (`teaser/v2`): agrega al diálogo un campo *Etiqueta* (por ejemplo, "Nuevo") y muéstralo sobre el título. Pistas: el Teaser divide su HTML en varios scripts (`teaser.html` carga `pretitle.html`, `title.html`, `description.html`... como plantillas con `data-sly-use`, [[ch-18]]), así que basta con sobrescribir **solo** `title.html`; y `teaser/v2` no tiene diálogo propio, porque **lo hereda de `teaser/v1`**: busca en CRXDE la ruta de nodos del diálogo antes de escribir el tuyo.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'En CRXDE Lite, los tres nodos de aviso conservan `sling:resourceType = practica/components/aviso` durante todo el ejercicio: nunca tocaste el contenido. Lo único que cambió entre los pasos 3 y 5 fue el `sling:resourceSuperType` del proxy.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'Un componente es un nodo `cq:Component` en `/apps`; las instancias en las páginas lo referencian con `sling:resourceType`.',
        'Su definición y sus nodos especiales (`cq:dialog`, `cq:editConfig`, `cq:template`, `cq:design_dialog`, `cq:htmlTag`) controlan cómo se ve y se edita.',
        'El patrón versionado + proxy separa el código (versiones ocultas) de lo que usa el contenido (el proxy).',
        'Una versión nueva hereda de la anterior y, con el Resource Merger, solo define lo que cambia.',
        'Cambiar de versión es cambiar una línea del proxy, reversible y sin tocar contenido.',
        'Heredar un Core Component es crear un proxy; se heredan HTL, diálogos, configuración de edición y Sling Model.',
        'Personaliza con el menor impacto posible: estilos, luego diálogo (solo diferencias, con `sling:orderBefore` y `sling:hideResource`), luego HTML y, por último, lógica.',
        'El build valida HTL y paquetes, deteniendo errores antes de llegar a AEM.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['`cq:Component`', 'Tipo de nodo que define un componente'],
          ['Proxy', 'Componente visible sin código propio que hereda de otro'],
          ['`.hidden`', 'Valor de `componentGroup` que oculta el componente a los autores'],
          ['`cq:editConfig`', 'Configuración del comportamiento en el editor'],
          ['`cq:template`', 'Valores iniciales al insertar el componente'],
          ['`sling:orderBefore`', 'Ordena un nodo antes de otro al combinar estructuras heredadas'],
          ['Sling Resource Merger', 'Mecanismo que combina nodos heredados (diálogos, overlays)'],
          ['`sling:hideResource`', 'Oculta un nodo heredado (por ejemplo, un campo del diálogo del padre)'],
          ['Core Components', 'Biblioteca de componentes de Adobe, versionados y pensados para heredarse']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Componentes: guía de referencia (Cloud Service)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/full-stack/components-templates/reference' },
        { type: 'image', title: 'Core Components: versionado y proxies', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/developing/guidelines' },
        { type: 'image', title: 'Core Components: lista de componentes', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/introduction' },
        { type: 'image', title: 'Core Components: personalización', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-core-components/using/developing/customizing' },
        { type: 'image', title: 'Sling Resource Merger', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/full-stack/sling-resource-merger' },
        { type: 'image', title: 'HTL Maven Plugin', source: 'Apache Sling', url: 'https://sling.apache.org/components/htl-maven-plugin/' },
        { type: 'video', title: 'Component Basics: tutorial WKND completo (texto y videos)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/getting-started-wknd-tutorial-develop/project-archetype/component-basics' },
        { type: 'code', title: 'Core Components en GitHub: versiones de cada componente', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-core-wcm-components/tree/main/content/src/content/jcr_root/apps/core/wcm/components' }
      ]} />
    </LessonPage>
  );
}
