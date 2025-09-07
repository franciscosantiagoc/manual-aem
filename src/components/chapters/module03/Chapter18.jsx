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

// Colores del tema para los diagramas SVG (funcionan en modo claro y oscuro)
const c = {
  box: { fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' },
  text: { fill: 'var(--text-primary)' },
  muted: { fill: 'var(--text-secondary)' },
  include: 'var(--accent-cyan)',
  call: 'var(--accent-purple)',
  resource: 'var(--color-success)',
  primary: 'var(--primary)'
};

const DiagramaTresFormas = () => (
  <svg viewBox="0 0 360 470" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="f18-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--text-secondary)' }} />
      </marker>
    </defs>

    <rect x="60" y="8" width="240" height="50" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: c.primary, strokeWidth: 1.5 }} />
    <text x="180" y="30" textAnchor="middle" fontSize="14" fontWeight="700" style={c.text}>promo.html</text>
    <text x="180" y="47" textAnchor="middle" fontSize="11" style={c.muted}>practica/components/promo</text>

    <line x1="40" y1="58" x2="40" y2="290" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.5 }} />
    <line x1="180" y1="58" x2="180" y2="66" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.5 }} />
    <line x1="40" y1="66" x2="180" y2="66" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.5 }} />

    {[
      { y: 90, color: c.include, label: 'include', title: 'encabezado.html', l1: 'Otro archivo del mismo componente', l2: 'Mismo recurso y misma petición' },
      { y: 170, color: c.call, label: 'call', title: 'templates.html → boton()', l1: 'Bloque reutilizable con parámetros', l2: 'texto, enlace, estilo' },
      { y: 250, color: c.resource, label: 'resource', title: 'Nodo hijo «aviso»', l1: 'Otro recurso con su componente', l2: 'Nueva petición interna' }
    ].map((r) => (
      <g key={r.label}>
        <line x1="40" y1={r.y + 25} x2="104" y2={r.y + 25} markerEnd="url(#f18-arrow)" style={{ stroke: r.color, strokeWidth: 2 }} />
        <text x="72" y={r.y + 19} textAnchor="middle" fontSize="10" fontWeight="700" style={{ fill: r.color }}>{r.label}</text>
        <rect x="108" y={r.y} width="244" height="62" rx="9" style={{ fill: 'var(--bg-tertiary)', stroke: r.color, strokeWidth: 1.5 }} />
        <text x="120" y={r.y + 20} fontSize="12.5" fontWeight="700" style={c.text}>{r.title}</text>
        <text x="120" y={r.y + 38} fontSize="10.5" style={c.muted}>{r.l1}</text>
        <text x="120" y={r.y + 53} fontSize="10.5" style={c.muted}>{r.l2}</text>
      </g>
    ))}

    <line x1="180" y1="318" x2="180" y2="342" markerEnd="url(#f18-arrow)" style={{ stroke: 'var(--text-secondary)', strokeWidth: 1.5 }} />
    <rect x="20" y="346" width="320" height="116" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' }} />
    <text x="34" y="366" fontSize="11" fontWeight="700" style={c.text}>HTML final de una sola respuesta</text>
    {[
      { y: 376, color: c.include, t: '<header> … título y subtítulo' },
      { y: 403, color: c.call, t: '<a class="cmp-boton"> … botón' },
      { y: 430, color: c.resource, t: '<div> … salida del componente Aviso' }
    ].map((b) => (
      <g key={b.y}>
        <rect x="34" y={b.y} width="292" height="22" rx="5" style={{ fill: 'transparent', stroke: b.color, strokeWidth: 1.5 }} />
        <text x="44" y={b.y + 15} fontSize="10.5" fontFamily="var(--font-mono)" style={c.text}>{b.t}</text>
      </g>
    ))}
  </svg>
);

const DiagramaJcr = () => {
  const rows = [
    { x: 14, t: '…/jcr:content/root/container', type: '', dot: 'var(--text-secondary)' },
    { x: 30, t: 'promo', type: 'practica/components/promo', dot: c.primary, note: 'titulo, texto, etiquetas…' },
    { x: 50, t: 'aviso', type: 'practica/components/aviso', dot: c.resource, note: 'se crea al guardar su diálogo' },
    { x: 50, t: 'zona', type: 'wcm/foundation/…/responsivegrid', dot: c.resource, note: 'zona para arrastrar componentes' },
    { x: 70, t: 'text', type: 'practica/components/text', dot: c.call, note: 'lo agregó el autor' }
  ];
  return (
    <svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="352" height="242" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: 'var(--border-color)' }} />
      <line x1="20" y1="34" x2="20" y2="62" style={{ stroke: 'var(--border-color)', strokeWidth: 1.5 }} />
      <line x1="36" y1="80" x2="36" y2="158" style={{ stroke: 'var(--border-color)', strokeWidth: 1.5 }} />
      <line x1="56" y1="166" x2="56" y2="206" style={{ stroke: 'var(--border-color)', strokeWidth: 1.5 }} />
      {rows.map((r, i) => {
        const y = 28 + i * 46;
        return (
          <g key={r.t}>
            <circle cx={r.x + 6} cy={y} r="5" style={{ fill: r.dot }} />
            <text x={r.x + 16} y={y + 4} fontSize="12" fontWeight="700" fontFamily="var(--font-mono)" style={c.text}>{r.t}</text>
            {r.type && <text x={r.x + 16} y={y + 19} fontSize="10" fontFamily="var(--font-mono)" style={{ fill: r.dot }}>{r.type}</text>}
            {r.note && <text x={r.x + 16} y={y + 32} fontSize="10" style={c.muted}>{r.note}</text>}
          </g>
        );
      })}
    </svg>
  );
};

const includeBasic = `<!--/* promo.html */-->
<sly data-sly-include="encabezado.html"/>

<!--/* Rutas: relativa al componente, o absoluta */-->
<sly data-sly-include="partes/pie.html"/>
<sly data-sly-include="/apps/practica/components/promo/encabezado.html"/>

<!--/* Construir la ruta con opciones */-->
<sly data-sly-include="\${'encabezado.html' @ prependPath='partes'}"/>   <!--/* partes/encabezado.html */-->`;

const includeScope = `<!--/* promo.html */-->
<sly data-sly-set.color="rojo"/>
<sly data-sly-include="encabezado.html"/>

<!--/* encabezado.html */-->
\${properties.titulo}   <!--/* ✔ funciona: mismo recurso, mismos objetos globales */-->
\${color}               <!--/* ✘ vacío: las variables del script que incluye no pasan */-->`;

const includeAem = `<!--/* AEM: incluir un script forzando un modo del editor */-->
<sly data-sly-include="\${'vista-previa.html' @ wcmmode='disabled'}"/>`;

const tplLocal = `<!--/* Declarar: el elemento <template> nunca aparece en la salida */-->
<template data-sly-template.etiqueta="\${@ texto}">
    <span class="cmp-etiqueta">\${texto}</span>
</template>

<!--/* Llamar: el contenido del elemento se reemplaza por la plantilla */-->
<li data-sly-call="\${etiqueta @ texto='Nuevo'}"></li>
<!--/* salida: <li><span class="cmp-etiqueta">Nuevo</span></li> */-->

<sly data-sly-call="\${etiqueta @ texto='Oferta'}"/>
<!--/* salida: <span class="cmp-etiqueta">Oferta</span> */-->`;

const tplLib = `<!--/* Cargar una biblioteca (otro archivo) con data-sly-use */-->
<sly data-sly-use.tpl="practica/components/commons/templates.html"/>
<sly data-sly-call="\${tpl.boton @ texto='Comprar', enlace=properties.enlace}"/>

<!--/* Tres formas de escribir la ruta */-->
data-sly-use.partes="partes.html"                                  <!--/* relativa al componente */-->
data-sly-use.tpl="practica/components/commons/templates.html"      <!--/* como resourceType: se busca en /apps y /libs */-->
data-sly-use.tpl="/apps/practica/components/commons/templates.html" <!--/* absoluta */-->`;

const tplParams = `<!--/* El valor de cada parámetro en la declaración es solo una pista para quien lo lea */-->
<template data-sly-template.boton="\${@ texto, enlace, estilo='primario o secundario'}">
    <a data-sly-test="\${texto && enlace}"
       class="cmp-boton cmp-boton--\${estilo || 'primario'}"
       href="\${enlace @ extension='html'}">\${texto}</a>
</template>

<sly data-sly-call="\${boton @ texto='Ver', enlace='/content/practica/us/en'}"/>
<!--/* estilo no se pasó: dentro vale '' y se usa 'primario' */-->`;

const coreTeaser = `<!--/* core/wcm/components/teaser/v2/teaser/teaser.html (fragmento real) */-->
<div data-sly-use.teaser="com.adobe.cq.wcm.core.components.models.Teaser"
     data-sly-use.templates="core/wcm/components/commons/v1/templates.html"
     data-sly-use.titleTemplate="title.html"
     data-sly-use.descriptionTemplate="description.html"
     ...>
        <sly data-sly-call="\${titleTemplate.title @ teaser=teaser}"></sly>
        <sly data-sly-call="\${descriptionTemplate.description @ teaser=teaser}"></sly>
</div>
<sly data-sly-call="\${templates.placeholder @ isEmpty=!hasContent, classAppend='cmp-teaser'}"></sly>

<!--/* core/wcm/components/teaser/v2/teaser/title.html (fragmento real) */-->
<sly data-sly-template.title="\${@ teaser}">
    <h2 class="cmp-teaser__title" data-sly-test.title="\${teaser.title}" data-sly-element="\${teaser.titleType}">
        ...\${title}...
    </h2>
</sly>`;

const coreTemplates = `<!--/* core/wcm/components/commons/v1/templates.html (contenido real) */-->
<sly data-sly-template.placeholder="\${@ isEmpty, classAppend, emptyTextAppend}">
    <div data-sly-test="\${(wcmmode.edit || wcmmode.preview) && isEmpty}"
         class="cq-placeholder \${classAppend}"
         data-emptytext="\${component.properties.jcr:title}\${emptyTextAppend && ' - '}\${emptyTextAppend}"></div>
</sly>`;

const resourceBasic = `<!--/* Nodo hijo "aviso" del recurso actual, renderizado como Aviso */-->
<div data-sly-resource="\${'aviso' @ resourceType='practica/components/aviso'}"></div>

<!--/* Un recurso que ya existe, con su propio sling:resourceType */-->
<div data-sly-resource="\${'/content/experience-fragments/practica/us/en/site/footer/master'}"></div>

<!--/* Un objeto Resource (por ejemplo, cada hijo de una lista) */-->
<sly data-sly-list.hijo="\${resource.listChildren}">
    <div data-sly-resource="\${hijo}"></div>
</sly>

<!--/* Opciones: selectores y atributos de la petición */-->
<div data-sly-resource="\${'aviso' @ resourceType='practica/components/aviso', addSelectors='compacto'}"></div>`;

const resourceMap = `<!--/* AEM: un mapa crea un recurso sintético (no existe en el JCR) */-->
<!--/* si mapa = { resourceName: 'saludo', 'sling:resourceType': 'core/wcm/components/text/v2/text', text: 'Hola' } */-->
<div data-sly-resource="\${mapa}"></div>`;

const labTemplates = `<!--/* Biblioteca de plantillas compartidas por los componentes del sitio */-->

<!--/* Botón: texto y enlace obligatorios; estilo opcional */-->
<template data-sly-template.boton="\${@ texto, enlace, estilo='primario o secundario'}">
    <a data-sly-test="\${texto && enlace}"
       class="cmp-boton cmp-boton--\${estilo || 'primario'}"
       href="\${enlace @ extension='html'}">\${texto}</a>
</template>

<!--/* Etiqueta pequeña */-->
<template data-sly-template.etiqueta="\${@ texto}">
    <span class="cmp-etiqueta">\${texto}</span>
</template>

<!--/* Árbol de páginas recursivo hasta la profundidad indicada */-->
<template data-sly-template.arbol="\${@ pagina, profundidadMax}">
    <ul class="cmp-arbol" data-sly-list.hija="\${pagina.listChildren}">
        <li class="cmp-arbol__item">
            <a href="\${hija.path @ extension='html'}">\${hija.title || hija.name}</a>
            <sly data-sly-test="\${hija.depth < profundidadMax}"
                 data-sly-call="\${arbol @ pagina=hija, profundidadMax=profundidadMax}"/>
        </li>
    </ul>
</template>`;

const labPromo = `<div data-sly-use.tpl="practica/components/commons/templates.html"
     data-sly-use.partes="partes.html"
     data-sly-test.titulo="\${properties.titulo}"
     class="cmp-promo">

    <!--/* 1. Inclusión: otro archivo del componente, mismo recurso */-->
    <sly data-sly-include="encabezado.html"/>

    <!--/* 2. Plantilla local (partes.html) con parámetros */-->
    <sly data-sly-call="\${partes.cuerpo @ texto=properties.texto}"/>

    <!--/* 3. Plantillas de la biblioteca compartida */-->
    <ul class="cmp-promo__etiquetas" data-sly-list.etiqueta="\${properties.etiquetas}">
        <li data-sly-call="\${tpl.etiqueta @ texto=etiqueta}"></li>
    </ul>
    <sly data-sly-call="\${tpl.boton @ texto=properties.textoBoton, enlace=properties.enlace}"/>

    <!--/* 4. Recurso: el componente Aviso como nodo hijo "aviso" */-->
    <div class="cmp-promo__aviso"
         data-sly-resource="\${'aviso' @ resourceType='practica/components/aviso'}"></div>

    <!--/* 5. Recurso: una zona donde el autor arrastra más componentes */-->
    <div class="cmp-promo__zona"
         data-sly-resource="\${'zona' @ resourceType='wcm/foundation/components/responsivegrid'}"></div>
</div>
<sly data-sly-use.core="core/wcm/components/commons/v1/templates.html"
     data-sly-call="\${core.placeholder @ isEmpty=!titulo, classAppend='cmp-promo'}"/>`;

const labEncabezado = `<!--/* Se ejecuta sobre el mismo recurso: properties es el del Promo.
       Las variables del script que lo incluye (tpl, partes, titulo) NO existen aquí. */-->
<header class="cmp-promo__encabezado">
    <h2 class="cmp-promo__titulo">\${properties.titulo}</h2>
    <p class="cmp-promo__subtitulo" data-sly-test="\${properties.subtitulo}">\${properties.subtitulo}</p>
</header>`;

const labPartes = `<!--/* Plantillas locales del componente Promo */-->
<template data-sly-template.cuerpo="\${@ texto}">
    <div class="cmp-promo__cuerpo" data-sly-test="\${texto}">
        <p data-sly-list.parrafo="\${texto}">\${parrafo}</p>
    </div>
</template>`;

const labMapa = `<!--/* profundidad: nivel absoluto de página hasta el que se baja
       (/content = 1, /content/practica = 2, .../us = 3, .../us/en = 4) */-->
<nav class="cmp-mapasitio" aria-label="Mapa del sitio"
     data-sly-use.tpl="practica/components/commons/templates.html"
     data-sly-call="\${tpl.arbol @ pagina=currentPage, profundidadMax=properties.profundidad || 6}"></nav>`;

const labTree = `ui.apps/src/main/content/jcr_root/apps/practica/components/
├── commons/
│   └── templates.html        ← biblioteca: boton, etiqueta, arbol
├── promo/
│   ├── .content.xml
│   ├── _cq_dialog/.content.xml   (titulo, subtitulo, texto, etiquetas, textoBoton, enlace)
│   ├── promo.html            ← script principal
│   ├── encabezado.html       ← parcial para data-sly-include
│   └── partes.html           ← plantillas locales
└── mapasitio/
    ├── .content.xml
    └── mapasitio.html        ← usa la plantilla recursiva arbol`;

const errArit = `[ERROR] ...\\components\\mapasitio\\mapasitio.html [3:88]:
        \${tpl.arbol @ pagina=currentPage, profundidadMax=currentPage.depth + 2}: token recognition error at: '+'
[INFO] Processed 17 files in 825ms
[INFO] BUILD FAILURE`;

const labOut = `<div class="cmp-promo">
    <header class="cmp-promo__encabezado">
        <h2 class="cmp-promo__titulo">Oferta de verano</h2>
        <p class="cmp-promo__subtitulo">Solo esta semana</p>
    </header>
    <div class="cmp-promo__cuerpo">
        <p>Hasta 30% de descuento en cursos.</p>
    </div>
    <ul class="cmp-promo__etiquetas">
        <li><span class="cmp-etiqueta">verano</span></li>
        <li><span class="cmp-etiqueta">oferta</span></li>
    </ul>
    <a class="cmp-boton cmp-boton--primario" href="/content/practica/us/en/contacto.html">Inscríbete</a>
    <div class="cmp-promo__aviso">
        <!--/* salida del componente Aviso (con el div que AEM agrega alrededor) */-->
    </div>
    <div class="cmp-promo__zona">
        <!--/* salida de la zona responsive y de lo que el autor arrastró */-->
    </div>
</div>`;

export default function Chapter18({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-18"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender por qué dividir el HTL de un componente y qué herramienta usar en cada caso.',
        'Usar `data-sly-include` para separar un componente en archivos y conocer qué comparte con el script principal.',
        'Crear plantillas con parámetros (`data-sly-template` / `data-sly-call`), en el mismo archivo o en una biblioteca compartida, incluso recursivas.',
        'Usar `data-sly-resource` para insertar otros componentes y zonas editables dentro del tuyo, y conocer su costo.',
        'Leer cómo modularizan los Core Components y aprovecharlo para sobrescribir solo una parte.',
        'Construir un componente Promo modular y un mapa del sitio recursivo, validados con el build.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Este tema profundiza en las directivas de inclusión que se presentaron en [[ch-17]]; necesitas también el componente Aviso de [[ch-16]], que se reutiliza en el laboratorio. Todo el código se **compiló y validó** con el `htl-maven-plugin` (17 scripts, BUILD SUCCESS). Las salidas HTML siguen la especificación: no se renderizaron en una instancia de AEM.'}
      </Alert>

      <SectionTitle>¿Por qué modularizar?</SectionTitle>
      <Paragraph>{'Un componente real crece rápido: encabezado, cuerpo, etiquetas, botones, variantes... Si todo vive en un solo `.html` de 200 líneas, cuesta leerlo, revisarlo y, sobre todo, **reutilizarlo**: el mismo botón termina copiado en diez componentes con pequeñas diferencias. HTL ofrece tres herramientas con propósitos distintos:'}</Paragraph>
      <List items={[
        '**`data-sly-include`**: partir un componente en **archivos**. Es organización interna.',
        '**`data-sly-template` + `data-sly-call`**: **funciones de marcado** con parámetros, reutilizables entre componentes.',
        '**`data-sly-resource`**: insertar **otro componente** (con sus datos, su diálogo y su lógica) dentro del tuyo.'
      ]} />
      <Figure
        alt="Diagrama: promo.html usa include, call y resource para armar una sola respuesta HTML"
        caption="Las tres formas de modularidad en el componente Promo del laboratorio: el resultado es una única respuesta HTML."
      >
        <DiagramaTresFormas />
      </Figure>
      <DataTable
        caption="Comparación"
        headers={['', 'data-sly-include', 'data-sly-template / call', 'data-sly-resource']}
        rows={[
          ['¿Qué inserta?', 'La salida de otro script', 'Un bloque de marcado declarado', 'La salida completa de otro componente'],
          ['¿Sobre qué recurso?', 'El mismo', 'El mismo', 'Otro (hijo, ruta o sintético)'],
          ['¿Recibe parámetros?', 'No', 'Sí', 'No (opciones como selectores)'],
          ['¿Ve las variables locales?', 'No', 'No (solo los parámetros)', 'No'],
          ['¿Petición interna nueva?', 'No', 'No', '**Sí**'],
          ['¿Crea nodos en el JCR?', 'No', 'No', 'Puede (al editar el hijo)'],
          ['¿Editable por el autor?', 'No', 'No', 'Sí, con su propio diálogo'],
          ['Uso típico', 'Dividir un componente grande', 'Botones, etiquetas, tarjetas, marcadores', 'Componentes anidados y zonas para arrastrar']
        ]}
      />

      <SectionTitle>data-sly-include: dividir en archivos</SectionTitle>
      <Paragraph>{'`data-sly-include` ejecuta otro script **sobre el mismo recurso y en la misma petición** y pone su salida en lugar del elemento. El elemento que lleva la directiva **no** aparece (por eso se usa `<sly>`).'}</Paragraph>
      <CodeBlock filename="sintaxis" language="html" code={includeBasic} />
      <Paragraph>{'**Qué ve el script incluido.** Tiene los mismos **objetos globales** (`properties`, `resource`, `currentPage`, `wcmmode`), porque trabaja sobre el mismo recurso. Pero **no** ve las variables creadas en el script que lo incluye:'}</Paragraph>
      <CodeBlock filename="alcance de las variables" language="html" code={includeScope} />
      <List items={[
        'Si el parcial necesita un Sling Model, debe declarar su propio `data-sly-use`; si son varios parciales con el mismo modelo, suele ser mejor convertirlos en plantillas y pasar el modelo como parámetro.',
        'El validador del build **no** detecta una variable inexistente: simplemente imprime vacío. Por eso conviene un comentario al inicio del parcial que diga qué usa.',
        'Apache Sling permite además pasar datos con la opción `requestAttributes` (un mapa que se guarda en los atributos de la petición).'
      ]} />
      <CodeBlock filename="extensión de AEM" language="html" code={includeAem} />
      <Alert type="tip" title="Cuándo usar include">
        {'Úsalo para **organizar** un componente grande en partes con nombre (`encabezado.html`, `pie.html`). Si el mismo marcado se repite con datos distintos, no es un include: es una plantilla.'}
      </Alert>

      <SectionTitle>data-sly-template y data-sly-call: plantillas con parámetros</SectionTitle>
      <Paragraph>{'Una plantilla es como una **función que devuelve HTML**: se declara con nombre y parámetros, y se llama pasando valores. Es la herramienta principal de reutilización en HTL.'}</Paragraph>
      <CodeBlock filename="declarar y llamar en el mismo archivo" language="html" code={tplLocal} />
      <List items={[
        '`data-sly-template.etiqueta` declara la plantilla `etiqueta`; el nombre es obligatorio. El elemento de la declaración **nunca** se imprime.',
        '`${@ texto}` es la lista de parámetros.',
        '`data-sly-call` **conserva** su elemento y **reemplaza su contenido** con la plantilla: con `<li>` obtienes el `<li>`; con `<sly>`, nada alrededor.',
        'Una plantilla declarada en el mismo archivo se puede llamar antes o después de su declaración.'
      ]} />
      <Paragraph>{'**Bibliotecas de plantillas.** Para compartir plantillas entre componentes, se guardan en un archivo y se cargan con `data-sly-use`; las plantillas quedan como propiedades de esa variable:'}</Paragraph>
      <CodeBlock filename="usar una biblioteca" language="html" code={tplLib} />
      <CodeBlock filename="parámetros opcionales" language="html" code={tplParams} />
      <List items={[
        'Un parámetro que no se pasa vale **texto vacío** dentro de la plantilla; con `||` le das un valor por defecto.',
        'El texto después de `=` en la declaración (`estilo=\'primario o secundario\'`) **no es un valor por defecto**: es una descripción para quien lee el código.',
        'Puedes pasar cualquier cosa: textos, números, listas o modelos completos (`teaser=teaser`).',
        'La plantilla **no** ve las variables de quien la llama, solo sus parámetros. Los objetos globales sí están disponibles, pero pasar como parámetro todo lo que la plantilla usa la hace predecible y reutilizable.',
        'Las plantillas pueden **llamarse a sí mismas** (recursión); lo usarás en el laboratorio para un mapa del sitio.'
      ]} />
      <VideoEmbed
        provider="youtube"
        id="h3LhZlg00d8"
        title="Create and call Template using data-sly-template and data-sly-call in Sightly"
        source="AEM GEEKS"
        lang="inglés"
        duration="12:50"
        caption="Video de la comunidad: declarar plantillas, guardarlas en otro archivo y llamarlas con parámetros."
      />

      <SectionTitle>Cómo modularizan los Core Components</SectionTitle>
      <Paragraph>{'Los Core Components aplican exactamente estas técnicas. El **Teaser** divide su HTML en archivos de plantillas (`pretitle.html`, `title.html`, `description.html`, `actions.html`, `image.html`) que carga con `data-sly-use` usando rutas **relativas**:'}</Paragraph>
      <CodeBlock filename="Core Components 2.28.0 · Teaser v2" language="html" code={coreTeaser} />
      <Paragraph>{'Y todos usan una pequeña biblioteca común para el marcador de componente vacío:'}</Paragraph>
      <CodeBlock filename="Core Components 2.28.0 · commons/v1/templates.html" language="html" code={coreTemplates} />
      <Alert type="info" title="Por qué importan las rutas relativas">
        {'Cuando un script carga `title.html` con una ruta relativa, Sling la busca primero en el componente del recurso que se está renderizando y en su cadena de herencia (`sling:resourceSuperType`). Así, tu proxy del Teaser puede tener **solo** su propio `title.html` y el resto del Teaser se sigue heredando de Adobe: es la personalización de "nivel 3" del [[ch-16]] aplicada a una sola pieza. La herencia se estudia a fondo en [[ch-20]].'}
      </Alert>
      <Paragraph>{'Tu componente puede usar la misma biblioteca de Adobe; el laboratorio lo hace para su marcador.'}</Paragraph>

      <SectionTitle>data-sly-resource: componentes dentro de componentes</SectionTitle>
      <Paragraph>{'`data-sly-resource` le pide a Sling que renderice **otro recurso** y pone el resultado dentro del elemento. Es una **nueva petición interna**: Sling resuelve el `sling:resourceType` de ese recurso y ejecuta su componente, con sus propios scripts, Sling Model y diálogo.'}</Paragraph>
      <CodeBlock filename="formas de indicar el recurso" language="html" code={resourceBasic} />
      <List items={[
        '**Ruta relativa** (`\'aviso\'`): un hijo del recurso actual. Si el nodo **todavía no existe**, `resourceType` le dice a Sling con qué componente dibujarlo; cuando el autor guarda su diálogo, AEM **crea** el nodo.',
        '**Ruta absoluta**: un recurso que ya existe en otra parte (por ejemplo, un Experience Fragment, [[ch-5]]).',
        '**Un objeto `Resource`**: útil al recorrer los hijos con `data-sly-list`.',
        'Opciones: `resourceType`, `selectors` / `addSelectors` / `removeSelectors`, `prependPath` / `appendPath` y, en Sling, `requestAttributes`.',
        'AEM envuelve la salida del componente incluido en un elemento de **decoración** (un `div`) que en Author lleva lo necesario para el editor.'
      ]} />
      <Figure
        alt="Árbol JCR: el nodo promo con sus hijos aviso y zona; dentro de zona, un text agregado por el autor"
        caption="Nodos en el JCR después de que el autor edita el Aviso y arrastra un Texto a la zona del Promo."
      >
        <DiagramaJcr />
      </Figure>
      <CodeBlock filename="extensión de AEM: recurso sintético desde un mapa" language="html" code={resourceMap} />
      <Alert type="warning" title="El costo de data-sly-resource">
        {'Cada `data-sly-resource` es una petición interna completa: resolución, filtros, Sling Model y script del componente incluido. Unas pocas por página son normales (las páginas de AEM se arman así), pero **dentro de un ciclo de cientos de elementos** se nota. Si solo necesitas repetir marcado, usa una plantilla. Más adelante verás cómo cachear componentes por separado con Sling Dynamic Include ([[ch-90]]).'}
      </Alert>
      <VideoEmbed
        provider="youtube"
        id="AKN_CS6gkEU"
        title="data-sly-resource attribute in HTL/Sightly in AEM 6.3"
        source="SG AEM"
        lang="inglés"
        duration="18:06"
        caption="Video de la comunidad sobre data-sly-resource. Se grabó en AEM 6.3, pero la directiva funciona igual en 6.5 y Cloud Service."
      />

      <SectionTitle>Laboratorio · Componente Promo modular</SectionTitle>
      <Paragraph>{'Construirás un componente **Promo** que usa las tres técnicas, una **biblioteca de plantillas** compartida y un componente **Mapa del sitio** que reutiliza esa biblioteca con una plantilla recursiva. Estructura final:'}</Paragraph>
      <CodeBlock filename="archivos del laboratorio" language="text" code={labTree} />
      <Paragraph>{'**Paso 1 · La biblioteca compartida.** Al no tener `.content.xml`, la carpeta `commons` no es un componente: solo guarda plantillas.'}</Paragraph>
      <CodeBlock filename="components/commons/templates.html" language="html" code={labTemplates} />
      <List items={[
        '`boton`: solo se imprime si hay texto **y** enlace; el estilo por defecto es `primario`; el enlace recibe `.html`.',
        '`etiqueta`: el bloque más pequeño posible; su valor es tener **un solo lugar** donde cambiar el marcado de todas las etiquetas del sitio.',
        '`arbol`: lista las páginas hijas y, si la hija está por encima de la profundidad máxima, **se llama a sí misma** con esa hija. `depth` es el nivel absoluto de la página en el árbol.'
      ]} />
      <Paragraph>{'**Paso 2 · El componente Promo.** Crea `promo/.content.xml` (`jcr:title="Promo"`, grupo *Sitio de Practica - Content*) y un diálogo con `titulo` (obligatorio), `subtitulo`, `texto` (textarea), `etiquetas` (multifield), `textoBoton` y `enlace` (pathfield). El script principal:'}</Paragraph>
      <CodeBlock filename="components/promo/promo.html" language="html" code={labPromo} />
      <List items={[
        '**Líneas 1–2**: dos `data-sly-use` cargan plantillas: la biblioteca compartida (ruta tipo resourceType) y las locales (ruta relativa).',
        '**Línea 3**: el bloque solo existe si hay título; el valor queda en `titulo` para el marcador del final.',
        '**Línea 7**: `data-sly-include` del encabezado.',
        '**Línea 10**: plantilla local `cuerpo`, recibiendo el texto como parámetro.',
        '**Líneas 13–16**: plantillas de la biblioteca; el `<li>` se conserva y su contenido es la etiqueta.',
        '**Líneas 19–20**: el Aviso del [[ch-16]] como nodo hijo `aviso`: el autor lo edita con su propio diálogo, **dentro** del Promo.',
        '**Líneas 23–24**: una zona responsive en el hijo `zona`, donde el autor puede arrastrar cualquier componente permitido. El Layout Container se estudia en [[ch-103]].',
        '**Líneas 26–27**: la plantilla `placeholder` de Core Components, igual que los componentes de Adobe.'
      ]} />
      <CodeBlock filename="components/promo/encabezado.html" language="html" code={labEncabezado} />
      <CodeBlock filename="components/promo/partes.html" language="html" code={labPartes} />
      <List items={[
        '`encabezado.html` usa `properties` directamente: funciona porque se ejecuta sobre el mismo recurso.',
        '`partes.html` no imprime nada por sí solo: solo declara la plantilla `cuerpo`.',
        'En `cuerpo`, `data-sly-list` sobre un **texto** lo trata como lista de un elemento, así que sale un único `<p>`; si el texto viniera de un campo múltiple, saldría un `<p>` por valor.'
      ]} />
      <Paragraph>{'**Paso 3 · El mapa del sitio.** Crea `mapasitio/.content.xml` (`jcr:title="Mapa del sitio"`) y su script:'}</Paragraph>
      <CodeBlock filename="components/mapasitio/mapasitio.html" language="html" code={labMapa} />
      <Paragraph>{'Nuestra primera versión intentaba calcular la profundidad como "dos niveles bajo la página actual". El build lo rechazó:'}</Paragraph>
      <CodeBlock filename="error real del validador" language="text" code={errArit} />
      <List items={[
        '`token recognition error at: \'+\'`: HTL **no tiene operadores aritméticos** ([[ch-17]]). El signo `+` ni siquiera es un símbolo válido.',
        'Solución usada: una profundidad absoluta configurable (`properties.profundidad`) con 6 por defecto. Un cálculo relativo correcto se haría en un Sling Model ([[ch-45]]).'
      ]} />
      <Paragraph>{'**Paso 4 · Compilar y probar.** `mvn clean install -pl ui.apps -PautoInstallPackage`. En nuestra verificación el build validó **17 scripts** y terminó en BUILD SUCCESS. En AEM:'}</Paragraph>
      <List items={[
        '**1.** Arrastra **Promo** a una página: verás el marcador "Promo".',
        '**2.** Llena el diálogo (por ejemplo: *Oferta de verano*, *Solo esta semana*, etiquetas *verano* y *oferta*, botón *Inscríbete* a la página de contacto).',
        '**3.** Dentro del Promo aparece el marcador del **Aviso**: selecciónalo y edítalo con su propio diálogo.',
        '**4.** Arrastra un **Texto** a la zona inferior del Promo.',
        '**5.** Abre CRXDE ([[ch-6]]) o pulsa `c` con la AEM Chrome Extension: el nodo `promo` tiene ahora los hijos `aviso` y `zona` (y `zona` contiene el texto), como en el diagrama.',
        '**6.** Agrega **Mapa del sitio** a la página raíz `/content/practica/us/en` y comprueba la lista anidada de páginas.'
      ]} />
      <CodeBlock filename="salida esperada del Promo (?wcmmode=disabled)" language="html" code={labOut} />

      <SectionTitle>¿Cuál uso?</SectionTitle>
      <DataTable
        headers={['Necesito...', 'Usa']}
        rows={[
          ['Que un componente largo sea más fácil de leer', '`data-sly-include` con parciales con nombre'],
          ['El mismo marcado con datos distintos, en uno o varios componentes', '`data-sly-template` en una biblioteca + `data-sly-call`'],
          ['Que el autor edite una pieza por separado, con su diálogo', '`data-sly-resource` con un nodo hijo'],
          ['Una zona donde el autor arrastre componentes', '`data-sly-resource` con `wcm/foundation/components/responsivegrid`'],
          ['Mostrar contenido que vive en otra ruta (fragmento, encabezado común)', '`data-sly-resource` con ruta absoluta o un Experience Fragment'],
          ['Cambiar solo una parte de un Core Component', 'Sobrescribir en el proxy el archivo de plantilla con el mismo nombre'],
          ['Calcular algo (sumas, filtros, consultas)', 'Nada de lo anterior: un Sling Model ([[ch-45]])']
        ]}
      />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'Una biblioteca de plantillas por sitio (`components/commons/templates.html`) para las piezas comunes; plantillas locales para lo que solo usa un componente.',
        'Nombres de parciales y plantillas que digan qué son: `encabezado.html`, `boton`, `tarjeta`.',
        'Declara en cada plantilla todos los parámetros que usa y documenta con la pista (`${@ estilo=\'primario o secundario\'}`).',
        'Prefiere plantillas a `data-sly-resource` cuando el autor no necesita editar la pieza por separado.',
        'En tus componentes, usa nombres de plantilla y archivo estables: otros proyectos (o tus versiones nuevas) podrán sobrescribir una sola pieza, como con el Teaser.',
        'Evita `data-sly-resource` dentro de ciclos largos.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['Un parcial incluido muestra vacíos', 'Usa variables del script que lo incluye', 'Usar objetos globales, declarar su propio `data-sly-use` o convertirlo en plantilla con parámetros'],
          ['`data-sly-call` no imprime nada', 'Nombre de plantilla mal escrito o biblioteca no cargada con `data-sly-use`', 'Revisar el nombre (`tpl.boton`) y la ruta de la biblioteca'],
          ['Un parámetro llega vacío', 'No se pasó en la llamada (vale `\'\'`)', 'Pasarlo o dar un valor por defecto con `||`'],
          ['El componente incluido no se puede editar', 'Se incluyó con ruta absoluta de otra página o como recurso sintético', 'Usar un nodo hijo relativo al recurso actual'],
          ['La página tarda mucho con muchos componentes anidados', 'Demasiados `data-sly-resource` en ciclos', 'Reemplazar por plantillas o cachear con SDI'],
          ['El build falla con `token recognition error`', 'Operador no permitido (`+`, `-`, `*`)', 'Mover el cálculo a un Sling Model']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Construye la biblioteca, el Promo y el Mapa del sitio; despliega y prueba los seis pasos del laboratorio.',
        '**2.** Agrega a la biblioteca una plantilla `tarjeta` con parámetros `titulo`, `imagen` y `enlace`, y úsala dos veces en el Promo con datos distintos.',
        '**3.** Cambia el marcado de `etiqueta` (por ejemplo, agrega un ícono) y comprueba que cambia en todos los lugares donde se usa.',
        '**4.** En `encabezado.html`, intenta usar la variable `titulo` del script principal y explica por qué sale vacía.',
        '**5.** Crea un proxy del Teaser en tu proyecto y sobrescribe **solo** `title.html` para agregar una clase propia; comprueba que imagen, descripción y botones siguen viniendo de Adobe.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'El build termina en BUILD SUCCESS; en CRXDE el Promo tiene los hijos `aviso` y `zona`; un cambio en `templates.html` se refleja en todos los componentes que la usan; y el Teaser personalizado solo contiene `.content.xml` y `title.html`.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        '`data-sly-include` divide un componente en archivos que se ejecutan sobre el mismo recurso; comparten los objetos globales, no las variables.',
        '`data-sly-template` / `data-sly-call` crean funciones de marcado con parámetros, locales o en bibliotecas cargadas con `data-sly-use`, incluso recursivas.',
        '`data-sly-resource` renderiza otro recurso con su componente en una petición interna; con un nodo hijo, el autor lo edita por separado y AEM lo crea al guardar.',
        'Los Core Components cargan sus piezas con rutas relativas, lo que permite sobrescribir una sola en un proxy.',
        'HTL no calcula: la aritmética y la lógica van en Sling Models.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['Parcial', 'Archivo HTL que se incluye desde otro script del componente'],
          ['Plantilla (template)', 'Bloque de marcado con nombre y parámetros, que se invoca con `data-sly-call`'],
          ['Biblioteca de plantillas', 'Archivo que solo declara plantillas y se carga con `data-sly-use`'],
          ['Recurso sintético', 'Recurso que se renderiza sin existir en el JCR'],
          ['Decoración', 'Elemento que AEM pone alrededor de un componente incluido'],
          ['Recursión', 'Plantilla que se llama a sí misma (por ejemplo, para un árbol)']
        ]}
      />

      <ResourceLinks items={[
        { type: 'doc', title: 'HTL Specification 1.4: Include, Resource, Template & Call', source: 'GitHub · Adobe', url: 'https://github.com/adobe/htl-spec/blob/master/SPECIFICATION.md#228-include' },
        { type: 'doc', title: 'HTL: AEM Extensions (wcmmode en include, mapas en resource)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-htl/content/aem-extensions' },
        { type: 'doc', title: 'Scripting HTL en Apache Sling (requestAttributes, Use Providers)', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/scripting/scripting-htl.html' },
        { type: 'code', title: 'Core Components: commons/v1/templates.html', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-core-wcm-components/blob/main/content/src/content/jcr_root/apps/core/wcm/components/commons/v1/templates.html' },
        { type: 'code', title: 'Core Components: Teaser v2 dividido en plantillas', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-core-wcm-components/tree/main/content/src/content/jcr_root/apps/core/wcm/components/teaser/v2/teaser' },
        { type: 'video', title: 'Component Basics (tutorial WKND, con videos de HTL)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-learn/getting-started-wknd-tutorial-develop/project-archetype/component-basics' },
        { type: 'video', title: '19 HTL sly include (0:49)', source: 'YouTube · AEM Tutorials', url: 'https://www.youtube.com/watch?v=0Pr-8KMSdfk' },
        { type: 'video', title: '18 HTL sly resource (1:17)', source: 'YouTube · AEM Tutorials', url: 'https://www.youtube.com/watch?v=r3dLt_v9Ksg' }
      ]} />
    </LessonPage>
  );
}
