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

const firstLook = `<!--/* Esto es un comentario HTL: no llega al navegador */-->
<div class="cmp-saludo" data-sly-test="\${properties.nombre}">
    <p>Hola, \${properties.nombre}</p>
</div>`;

const firstOut = `<div class="cmp-saludo">
    <p>Hola, Ana</p>
</div>`;

const literals = `\${true}                      <!--/* booleano */-->
\${42}                        <!--/* número */-->
\${'texto'}  \${"texto"}       <!--/* cadenas: comillas simples o dobles */-->
\${[1, 2, 'tres']}            <!--/* arreglo */-->

\${properties.titulo}          <!--/* acceso con punto */-->
\${properties['jcr:title']}    <!--/* acceso con corchetes: útil con ':' o nombres variables */-->
\${properties[nombreCampo]}    <!--/* la clave sale de otra variable */-->
\${miArreglo[0]}               <!--/* primer elemento de un arreglo */-->`;

const operators = `\${titulo && !(oculto || borrador)}     <!--/* agrupar, NOT, AND, OR */-->
\${properties.titulo || currentPage.title}  <!--/* valor por defecto */-->
\${destacado ? 'is-on' : 'is-off'}         <!--/* ternario: espacios alrededor de ':' */-->
\${cantidad > 10}                          <!--/* <, <=, >, >=, ==, != */-->
\${'web' in properties.etiquetas}          <!--/* ¿el arreglo contiene 'web'? */-->
\${'ver' in 'verano'}                      <!--/* ¿la cadena contiene 'ver'? -> true */-->`;

const useEx = `<!--/* Instancia un Sling Model y lo expone como 'tarjeta' */-->
<div data-sly-use.tarjeta="com.practica.core.models.Tarjeta">\${tarjeta.titulo}</div>

<!--/* También carga bibliotecas de plantillas (Tema 18) */-->
<sly data-sly-use.tpl="core/wcm/components/commons/v1/templates.html"/>`;

const setEx = `<sly data-sly-set.titulo="\${properties.titulo || currentPage.title}"/>
<h2>\${titulo}</h2>
<meta property="og:title" content="\${titulo}"/>`;

const testEx = `<p data-sly-test="\${wcmmode.edit}">Solo se ve en modo edición</p>

<!--/* Guarda el resultado para reutilizarlo después */-->
<sly data-sly-test.tieneEnlace="\${properties.enlace}"/>
<a data-sly-test="\${tieneEnlace}" href="\${properties.enlace}">Ver más</a>

<!--/* El "else" se escribe negando la misma condición */-->
<p data-sly-test="\${!tieneEnlace}">Sin enlace</p>`;

const textEx = `<p data-sly-text="\${properties.titulo}">Texto de maqueta que nunca se muestra</p>
<!--/* salida, si titulo = 'Oferta': */-->
<p>Oferta</p>`;

const attrEx = `<!--/* Un atributo concreto (reemplaza el valor estático) */-->
<div class="estatica" data-sly-attribute.class="\${properties.clase}"></div>

<!--/* Atributos booleanos */-->
<input type="checkbox" checked="\${properties.activo}"/>
<!--/* true  -> <input type="checkbox" checked/>
     false -> <input type="checkbox"/>          */-->

<!--/* Valor vacío: el atributo desaparece */-->
<div title="\${''}"></div>   <!--/* salida: <div></div> */-->

<!--/* Un mapa con varios atributos (preparado en un Sling Model) */-->
<a data-sly-attribute="\${modelo.atributosEnlace}">Enlace</a>`;

const elementEx = `<h2 data-sly-element="\${properties.nivel || 'h2'}">\${properties.titulo}</h2>
<!--/* si nivel = 'h3' la salida es <h3>...</h3> */-->`;

const listEx = `<!--/* data-sly-list: el <ul> aparece una vez; el <li> se repite */-->
<ul data-sly-list.hija="\${currentPage.listChildren}">
    <li class="\${hijaList.odd ? 'impar' : 'par'}">\${hijaList.count}. \${hija.title}</li>
</ul>

<!--/* data-sly-repeat: se repite el propio elemento */-->
<a data-sly-repeat.hija="\${currentPage.listChildren @ end=2}"
   href="\${hija.path @ extension='html'}">\${hija.title}</a>`;

const listOut = `<ul>
    <li class="impar">1. Productos</li>
    <li class="par">2. Servicios</li>
    <li class="impar">3. Contacto</li>
</ul>

<a href="/content/practica/us/en/productos.html">Productos</a>
<a href="/content/practica/us/en/servicios.html">Servicios</a>
<a href="/content/practica/us/en/contacto.html">Contacto</a>`;

const mapEx = `<!--/* Recorrer un mapa: 'item' es la clave */-->
<dl data-sly-list="\${miMapa}">
    <dt>\${item}</dt>
    <dd>\${miMapa[item]}</dd>
</dl>`;

const unwrapEx = `<!--/* Quita la etiqueta y deja su contenido */-->
<div data-sly-unwrap>Solo el texto</div>          <!--/* salida: Solo el texto */-->

<!--/* Condicional: el <a> solo existe si hay enlace */-->
<a href="\${properties.enlace}" data-sly-unwrap="\${!properties.enlace}">\${properties.titulo}</a>

<!--/* <sly> es una etiqueta que nunca se imprime */-->
<sly data-sly-test="\${properties.titulo}">\${properties.titulo}</sly>`;

const modEx = `<!--/* Incluir otro script del mismo componente */-->
<sly data-sly-include="encabezado.html"/>

<!--/* Renderizar un recurso hijo con su propio componente */-->
<div data-sly-resource="\${'boton' @ resourceType='practica/components/button'}"></div>

<!--/* Declarar y llamar una plantilla con parámetros */-->
<template data-sly-template.etiqueta="\${@ texto}"><span class="tag">\${texto}</span></template>
<sly data-sly-call="\${etiqueta @ texto='Nuevo'}"/>`;

const scriptStyle = `<!--/* Obligatorio indicar el contexto dentro de <script>, <style>, on* y style="" */-->
<script>var titulo = '\${properties.titulo @ context='scriptString'}';</script>
<div style="color: \${properties.color @ context='styleToken'};"></div>

<!--/* Mejor práctica: pasar datos al JavaScript con atributos data-* */-->
<div class="cmp-mapa" data-lat="\${properties.lat}" data-lng="\${properties.lng}"></div>`;

const formatEx = `<!--/* Cadenas con marcadores {0}, {1}... */-->
\${'Hola, {0}' @ format=properties.nombre}                  <!--/* Hola, Ana */-->
\${'Página {0} de {1}' @ format=[actual, total]}            <!--/* Página 2 de 5 */-->

<!--/* Fechas (Date o Calendar) */-->
\${'dd/MM/yyyy' @ format=pageProperties['jcr:created'], type='date'}           <!--/* 30/09/2026 */-->
\${'EEEE d MMMM yyyy' @ format=fecha, type='date', locale='es'}                <!--/* miércoles 30 septiembre 2026 */-->

<!--/* Números */-->
\${'#,##0.00' @ format=1234.5, type='number'}                <!--/* 1,234.50 */-->
\${'#%' @ format=0.25, type='number'}                        <!--/* 25% */-->`;

const i18nJoin = `\${'Leer más' @ i18n}                             <!--/* traducido al idioma de la página */-->
\${'Leer más' @ i18n, locale='en', hint='Botón'}  <!--/* idioma forzado y pista para traductores */-->

\${['verano', 'oferta', 'web'] @ join=', '}       <!--/* verano, oferta, web */-->
<span class="\${clases @ join=' '}"></span>         <!--/* clases CSS a partir de un arreglo */-->`;

const uriEx = `\${'/content/practica/us/en' @ extension='html'}
<!--/* /content/practica/us/en.html */-->

\${'/content/practica/us/en.html' @ selectors='movil'}
<!--/* /content/practica/us/en.movil.html */-->

\${'/content/practica/us/en.html' @ fragment='contacto'}
<!--/* /content/practica/us/en.html#contacto */-->

\${'/buscar' @ query=modelo.parametros}
<!--/* /buscar?q=aem si parametros = {q: 'aem'} */-->`;

const xssIn = `<p>Hasta <b>30%</b> de descuento</p><script>alert('hackeado')</script>
<a href="javascript:alert(1)" onclick="robar()">Clic</a>`;

const xssOut = `<!--/* \${properties.descripcion}  (contexto automático: text) */-->
&lt;p&gt;Hasta &lt;b&gt;30%&lt;/b&gt; de descuento&lt;/p&gt;&lt;script&gt;...

<!--/* \${properties.descripcion @ context='html'} */-->
<p>Hasta <b>30%</b> de descuento</p>
<a>Clic</a>`;

const labDialog = `<precio
    jcr:primaryType="nt:unstructured"
    sling:resourceType="granite/ui/components/coral/foundation/form/numberfield"
    fieldLabel="Precio"
    name="./precio"
    step="0.01"/>
<precioTipo
    jcr:primaryType="nt:unstructured"
    sling:resourceType="granite/ui/components/coral/foundation/form/hidden"
    name="./precio@TypeHint"
    value="Double"/>
<etiquetas
    jcr:primaryType="nt:unstructured"
    sling:resourceType="granite/ui/components/coral/foundation/form/multifield"
    fieldLabel="Etiquetas">
    <field
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
        name="./etiquetas"/>
</etiquetas>`;

const labHtml = `<!--/* Demo HTL: cada bloque muestra una expresión o directiva distinta */-->
<sly data-sly-set.titulo="\${properties.titulo || currentPage.title}"/>
<section class="cmp-demohtl \${properties.destacado ? 'cmp-demohtl--destacado' : ''}"
         data-sly-attribute.data-pagina="\${currentPage.name}">

    <h2 class="cmp-demohtl__titulo" data-sly-element="\${properties.nivel || 'h2'}">\${titulo}</h2>

    <div class="cmp-demohtl__descripcion"
         data-sly-test="\${properties.descripcion}">\${properties.descripcion @ context='html'}</div>

    <p class="cmp-demohtl__precio" data-sly-test="\${properties.precio}">
        \${'Precio: {0}' @ format=properties.precio}
        (\${'#,##0.00' @ format=properties.precio, type='number'} MXN)
    </p>

    <p class="cmp-demohtl__etiquetas" data-sly-test="\${properties.etiquetas}">
        \${properties.etiquetas @ join=' · '}
    </p>

    <ul class="cmp-demohtl__etiquetas-lista" data-sly-list.etiqueta="\${properties.etiquetas}">
        <li class="\${etiquetaList.first ? 'is-first' : ''}">\${etiquetaList.count}. \${etiqueta}</li>
    </ul>

    <a class="cmp-demohtl__enlace"
       data-sly-test="\${properties.enlace}"
       href="\${properties.enlace @ extension='html'}">Ver página enlazada</a>

    <nav class="cmp-demohtl__hijas" data-sly-test="\${currentPage.listChildren}">
        <a data-sly-repeat.hija="\${currentPage.listChildren @ end=4}"
           href="\${hija.path @ extension='html'}">\${hija.title || hija.name}</a>
    </nav>

    <p class="cmp-demohtl__fecha" data-sly-test="\${pageProperties['jcr:created']}"
       data-sly-set.fecha="\${'dd/MM/yyyy' @ format=pageProperties['jcr:created'], type='date'}">
        \${'Creada el {0}' @ format=fecha}
    </p>

    <p class="cmp-demohtl__modo" data-sly-test="\${wcmmode.edit}">Estás en modo edición</p>
    <p data-sly-unwrap>\${'Texto sin envoltura' @ i18n}</p>
</section>
<div data-sly-test="\${!properties.titulo && wcmmode.edit}"
     class="cq-placeholder"
     data-emptytext="\${component.title}"></div>`;

const labData = `titulo      = Oferta de verano
nivel       = h3
descripcion = <p>Hasta <b>30%</b> de descuento</p><script>alert(1)</script>
precio      = 1234.5            (Double)
etiquetas   = [verano, oferta, web]
enlace      = /content/practica/us/en/contacto
destacado   = true`;

const labOut = `<section class="cmp-demohtl cmp-demohtl--destacado" data-pagina="en">
    <h3 class="cmp-demohtl__titulo">Oferta de verano</h3>
    <div class="cmp-demohtl__descripcion"><p>Hasta <b>30%</b> de descuento</p></div>
    <p class="cmp-demohtl__precio">
        Precio: 1234.5
        (1,234.50 MXN)
    </p>
    <p class="cmp-demohtl__etiquetas">
        verano · oferta · web
    </p>
    <ul class="cmp-demohtl__etiquetas-lista">
        <li class="is-first">1. verano</li>
        <li>2. oferta</li>
        <li>3. web</li>
    </ul>
    <a class="cmp-demohtl__enlace" href="/content/practica/us/en/contacto.html">Ver página enlazada</a>
    <nav class="cmp-demohtl__hijas">
        <a href="/content/practica/us/en/contacto.html">Contacto</a>
        ...
    </nav>
    <p class="cmp-demohtl__fecha">
        Creada el 30/09/2026
    </p>
    Texto sin envoltura
</section>`;

const errNested = `[ERROR] ...\\components\\demohtl\\demohtl.html [34:133]:
        \${'Creada el {0}' @ format=['dd/MM/yyyy' @ format=pageProperties['jcr:created'], type='date']}
    : no viable alternative at input '['dd/MM/yyyy' @'
[INFO] BUILD FAILURE`;

const errContext = `[WARNING] demohtl.html [38:22]: \${properties.color}: Expressions within the value of attribute style
          need to have an explicit context option. The expression will be replaced with an empty string.
[WARNING] demohtl.html [38:58]: \${properties.titulo}: Expressions within the value of attribute onclick
          need to have an explicit context option. The expression will be replaced with an empty string.
[ERROR] Failed to execute goal org.apache.sling:htl-maven-plugin:2.0.2-1.4.0:validate (validate-htl-scripts)
        on project practica.ui.apps: Compilation warnings were configured to fail the build.`;

// Diagrama: el mismo tipo de dato se protege distinto según dónde se imprime
const DiagramaEscapado = () => {
  const rows = [
    { pos: 'Texto', code: '<p>${x}</p>', input: '<b>Hola</b>', out: '&lt;b&gt;Hola&lt;/b&gt;', note: 'se ve como texto', color: 'var(--accent-cyan)' },
    { pos: 'HTML del autor', code: "${x @ context='html'}", input: '<b>Hola</b><script>…', out: '<b>Hola</b>', note: 'el script se elimina', color: 'var(--color-success)' },
    { pos: 'URL', code: 'href="${x}"', input: 'javascript:alert(1)', out: '(se descarta)', note: 'URL no válida', color: 'var(--accent-purple)' },
    { pos: 'JavaScript', code: 'onclick="${x}"', input: 'cualquier valor', out: '(vacío)', note: 'falta el contexto', color: 'var(--color-warning, #f59e0b)' }
  ];
  return (
    <svg viewBox="0 0 360 372" xmlns="http://www.w3.org/2000/svg">
      {rows.map((r, i) => {
        const y = 6 + i * 91;
        return (
          <g key={r.pos}>
            <rect x="4" y={y} width="352" height="82" rx="10" style={{ fill: 'var(--bg-tertiary)', stroke: r.color, strokeWidth: 1.5 }} />
            <text x="16" y={y + 20} fontSize="12" fontWeight="700" style={{ fill: r.color }}>{r.pos}</text>
            <text x="344" y={y + 20} textAnchor="end" fontSize="10.5" fontFamily="var(--font-mono)" style={{ fill: 'var(--text-secondary)' }}>{r.code}</text>
            <text x="16" y={y + 44} fontSize="10" style={{ fill: 'var(--text-secondary)' }}>valor</text>
            <text x="62" y={y + 44} fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--text-primary)' }}>{r.input}</text>
            <text x="16" y={y + 66} fontSize="10" style={{ fill: 'var(--text-secondary)' }}>salida</text>
            <text x="62" y={y + 66} fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" style={{ fill: 'var(--text-primary)' }}>{r.out}</text>
            <text x="344" y={y + 66} textAnchor="end" fontSize="10" style={{ fill: r.color }}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default function Chapter17({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-17"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del tema</SectionTitle>
      <List items={[
        'Entender qué es HTL, dónde se ejecuta y por qué es el lenguaje de plantillas de AEM.',
        'Escribir expresiones `${...}`: literales, acceso a propiedades, operadores y reglas de verdadero/falso.',
        'Conocer los objetos globales (`properties`, `currentPage`, `wcmmode`...) y cuándo usar cada uno.',
        'Dominar las 12 directivas `data-sly-*`, el elemento `<sly>` y el orden en que se evalúan.',
        'Usar las opciones de expresión: contextos de escapado (XSS), `format`, `i18n`, `join` y manipulación de URLs.',
        'Construir un componente de práctica que usa todo lo anterior y leer los errores reales del validador.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas el proyecto del laboratorio ([[ch-11]] o [[ch-12]]) y saber crear un componente ([[ch-16]]). Todos los ejemplos siguen la **especificación oficial HTL 1.4**; el componente del laboratorio se **compiló y validó** con el `htl-maven-plugin` del proyecto. Las salidas HTML se muestran según la especificación: no se renderizaron en una instancia de AEM.'}
      </Alert>

      <SectionTitle>¿Qué es HTL?</SectionTitle>
      <Paragraph>{'**HTL** (*HTML Template Language*, antes llamado **Sightly**) es el lenguaje con el que los componentes de AEM generan su HTML. Un archivo HTL es HTML normal al que se le agregan **expresiones** `${...}` para insertar datos y **atributos** `data-sly-*` para la lógica de presentación (condiciones, ciclos, inclusiones).'}</Paragraph>
      <List items={[
        '**Se ejecuta en el servidor.** AEM procesa el archivo y envía al navegador HTML puro: el navegador nunca ve `${...}` ni `data-sly-*`.',
        '**Es seguro por defecto.** Escapa automáticamente cada valor según dónde se imprime, lo que previene ataques XSS sin que tengas que recordarlo.',
        '**Separa presentación y lógica.** HTL no permite programar (no hay sumas, ni llamadas a métodos con parámetros); la lógica va en Java con **Sling Models** ([[ch-45]]).',
        '**Reemplaza a JSP.** Los JSP siguen funcionando en proyectos antiguos, pero Adobe recomienda HTL para todo código nuevo. La Use-API en JavaScript está **obsoleta en Cloud Service**: usa Java.'
      ]} />
      <FlowDiagram
        caption="De la petición al HTML"
        steps={[
          { title: 'Petición', detail: '`/content/practica/us/en.html`', tone: 'primary' },
          { title: 'Sling', detail: 'Resuelve el componente de cada nodo ([[ch-2]])', tone: 'purple' },
          { title: 'Motor HTL', detail: 'Compila el `.html` a Java (una vez) y lo ejecuta', tone: 'cyan' },
          { title: 'HTML', detail: 'Datos insertados y escapados', tone: 'success' }
        ]}
      />
      <VideoEmbed
        provider="adobe"
        id="330987"
        title="Component Basics - HTL"
        source="Adobe · tutorial WKND"
        lang="inglés"
        caption="Video oficial: los cambios del diálogo de un componente se reflejan en su script HTL."
      />
      <Paragraph>{'Un primer vistazo. Si el nodo del componente tiene la propiedad `nombre = Ana`:'}</Paragraph>
      <CodeBlock filename="saludo.html" language="html" code={firstLook} />
      <CodeBlock filename="HTML que recibe el navegador" language="html" code={firstOut} />
      <List items={[
        '`<!--/* ... */-->` es un **comentario HTL**: se elimina de la salida. Un comentario HTML normal `<!-- -->` sí llega al navegador (y sus expresiones se evalúan).',
        '`data-sly-test` decide si el `div` existe; el atributo `data-sly-test` desaparece de la salida.',
        '`${properties.nombre}` imprime la propiedad del nodo, escapada como texto.',
        'Si `nombre` estuviera vacío, el navegador no recibiría **nada**.'
      ]} />

      <SectionTitle>{'Expresiones: ${...}'}</SectionTitle>
      <Paragraph>{'Una expresión se escribe entre `${` y `}` y puede ir en el texto o en el valor de un atributo. Puede contener **literales**, **variables** y **operadores**, y terminar con **opciones** después de `@`.'}</Paragraph>
      <CodeBlock filename="literales y acceso a datos" language="html" code={literals} />
      <List items={[
        'Las variables de nivel superior (`properties`, `titulo`...) **no distinguen mayúsculas**; sus propiedades **sí** (`properties.Titulo` ≠ `properties.titulo`).',
        'Para acceder a un objeto Java, HTL prueba en orden: campo público, método con ese nombre, `getNombre()` e `isNombre()`. Por eso `${currentPage.title}` llama a `getTitle()`.',
        'Una propiedad que no existe no da error: devuelve vacío.'
      ]} />
      <DataTable
        caption="Operadores (de mayor a menor precedencia)"
        headers={['Operador', 'Significado', 'Ejemplo']}
        rows={[
          ['`( )`', 'Agrupar', '`${a && (b || c)}`'],
          ['`!`', 'Negación', '`${!wcmmode.edit}`'],
          ['`&&`', 'Y lógico', '`${titulo && imagen}`'],
          ['`||`', 'O lógico; devuelve el primer valor verdadero', '`${properties.titulo || \'Sin título\'}`'],
          ['`? :`', 'Ternario (`:` con espacios alrededor)', '`${destacado ? \'si\' : \'no\'}`'],
          ['`== !=`', 'Igualdad **estricta**, sin conversión de tipos', '`${properties.tipo == \'error\'}`'],
          ['`< <= > >=`', 'Comparación de números', '`${total > 10}`'],
          ['`in`', 'Contiene: texto en texto, elemento en arreglo o clave en objeto', '`${\'web\' in etiquetas}`']
        ]}
      />
      <CodeBlock filename="operadores en uso" language="html" code={operators} />
      <Alert type="warning" title="La comparación no convierte tipos">
        {'Si guardaste `cantidad` desde un `textfield`, en el JCR es el texto `"3"`, y `${properties.cantidad == 3}` es **falso** (texto contra número). Guarda el tipo correcto desde el diálogo (con `@TypeHint`, como en el laboratorio) o compara en un Sling Model. HTL tampoco hace aritmética: `${a + b}` no existe.'}
      </Alert>
      <DataTable
        caption="¿Cuándo un valor cuenta como falso?"
        headers={['Valor', 'Resultado', 'Al imprimirse']}
        rows={[
          ['`false`', 'Falso', '`false`'],
          ['`0`', 'Falso', '`0`'],
          ['`\'\'` (texto vacío)', 'Falso', '(nada)'],
          ['`[]` (colección vacía)', 'Falso', '(nada)'],
          ['propiedad inexistente (`null`)', 'Falso', '(nada)'],
          ['`\'false\'` (texto)', '**Verdadero**: no está vacío', '`false`'],
          ['`[0]`', '**Verdadero**: tiene un elemento', '`0`'],
          ['`[1, 2, 3]`', 'Verdadero', '`1,2,3`']
        ]}
      />

      <SectionTitle>Objetos globales</SectionTitle>
      <Paragraph>{'Sin declarar nada, todo script HTL tiene acceso a estos objetos. Los tres primeros son **mapas de propiedades** (se pueden recorrer con `data-sly-list`); el resto son objetos Java de AEM y Sling.'}</Paragraph>
      <DataTable
        caption="Los más usados"
        headers={['Objeto', 'Qué contiene', 'Ejemplo']}
        rows={[
          ['`properties`', 'Propiedades del **nodo del componente** (lo que guarda el diálogo)', '`${properties.titulo}`'],
          ['`pageProperties`', 'Propiedades de la **página** (`jcr:content` de la página)', '`${pageProperties[\'jcr:title\']}`'],
          ['`inheritedPageProperties`', 'Propiedades buscadas en la página y, si no están, en sus padres', '`${inheritedPageProperties.logo}` ([[ch-22]])'],
          ['`currentPage`', 'La página que se está mostrando (`Page`)', '`${currentPage.title}`, `${currentPage.path}`'],
          ['`resource`', 'El recurso del componente (`Resource`)', '`${resource.name}`, `${resource.path}`'],
          ['`component`', 'La definición del componente', '`${component.title}`'],
          ['`wcmmode`', 'Modo del editor', '`${wcmmode.edit}`, `${wcmmode.preview}`, `${wcmmode.disabled}`'],
          ['`currentStyle`', 'Configuración de la **política** del componente en la plantilla', '`${currentStyle.mostrarFecha}` ([[ch-30]])'],
          ['`request`', 'La petición HTTP (`SlingHttpServletRequest`)', '`${request.requestPathInfo.selectorString}`']
        ]}
      />
      <Paragraph>{'Lista completa según Adobe: `properties`, `pageProperties`, `inheritedPageProperties`, `component`, `componentContext`, `currentContentPolicy`, `currentContentPolicyProperties`, `currentDesign`, `currentNode`, `currentPage`, `currentSession`, `currentStyle`, `designer`, `editContext`, `log`, `out`, `pageManager`, `reader`, `request`, `resolver`, `resource`, `resourceDesign`, `resourcePage`, `response`, `sling`, `slyWcmHelper`, `wcmmode` y `xssAPI`.'}</Paragraph>
      <Alert type="tip" title="currentPage vs. resourcePage">
        {'Casi siempre coinciden. Difieren cuando el componente vive en otra página y se muestra aquí, como un Experience Fragment o un encabezado heredado: `currentPage` es la página que ve el visitante y `resourcePage` la página donde está guardado el componente.'}
      </Alert>
      <Alert type="info" title="Ver la página como en Publish">
        {'`wcmmode.disabled` es verdadero en Publish y en Author al añadir `?wcmmode=disabled` a la URL. La **AEM Chrome Extension** ([[ch-3]]) cambia de modo con un clic, útil para comprobar que los bloques de `wcmmode.edit` no salen al público.'}
      </Alert>

      <SectionTitle>Directivas data-sly-*</SectionTitle>
      <Paragraph>{'Las directivas (*block statements*) son atributos que controlan el elemento donde están. Todas desaparecen de la salida. Algunas aceptan un **identificador** después de un punto (`data-sly-test.tieneEnlace`) para guardar un valor.'}</Paragraph>
      <DataTable
        caption="Resumen de las 12 directivas"
        headers={['Directiva', 'Para qué', '¿Se muestra el elemento?']}
        rows={[
          ['`data-sly-use`', 'Carga lógica (Sling Model) o una biblioteca de plantillas', 'Sí'],
          ['`data-sly-set`', 'Crea una variable', 'Sí'],
          ['`data-sly-test`', 'Condición: mantiene o elimina el elemento', 'Solo si es verdadero'],
          ['`data-sly-text`', 'Reemplaza el contenido por un texto', 'Sí'],
          ['`data-sly-attribute`', 'Agrega o reemplaza atributos', 'Sí'],
          ['`data-sly-element`', 'Cambia la etiqueta (`div` → `h3`)', 'Sí, con otra etiqueta'],
          ['`data-sly-list`', 'Repite el **contenido** por cada elemento', 'Una vez, si la colección no está vacía'],
          ['`data-sly-repeat`', 'Repite el **propio elemento** por cada elemento', 'Una vez por elemento'],
          ['`data-sly-unwrap`', 'Quita la etiqueta y deja el contenido', 'No (o sí, si la condición es falsa)'],
          ['`data-sly-include`', 'Inserta la salida de otro script', 'No: se reemplaza por el script'],
          ['`data-sly-resource`', 'Renderiza otro recurso con su componente', 'Sí, con el recurso dentro'],
          ['`data-sly-template` / `data-sly-call`', 'Declara y llama bloques reutilizables', 'La plantilla nunca; la llamada sí']
        ]}
      />

      <Paragraph>{'**data-sly-use: cargar lógica.** La variable queda disponible en todo el script **a partir de** la línea donde se declara.'}</Paragraph>
      <CodeBlock filename="data-sly-use" language="html" code={useEx} />
      <Paragraph>{'**data-sly-set: crear variables.** Evita repetir la misma expresión varias veces.'}</Paragraph>
      <CodeBlock filename="data-sly-set" language="html" code={setEx} />
      <Paragraph>{'**data-sly-test: condiciones.** HTL no tiene `else`: se escribe otra prueba con la condición negada, reutilizando el resultado guardado.'}</Paragraph>
      <CodeBlock filename="data-sly-test" language="html" code={testEx} />
      <Paragraph>{'**data-sly-text: reemplazar el contenido.** Útil para conservar el texto de la maqueta del diseñador en el archivo.'}</Paragraph>
      <CodeBlock filename="data-sly-text" language="html" code={textEx} />
      <Paragraph>{'**data-sly-attribute: atributos.** Escribir `${...}` directamente en un atributo también funciona; la directiva sirve para reemplazar atributos estáticos o aplicar un mapa completo.'}</Paragraph>
      <CodeBlock filename="data-sly-attribute" language="html" code={attrEx} />
      <List items={[
        'Un valor vacío (`\'\'` o `[]`) **elimina** el atributo; `0` no lo elimina (`class="0"`).',
        'Los atributos de evento (`onclick`, `onload`...) y `style` **no** se pueden crear con `data-sly-attribute`: no hay contexto que los proteja por completo.'
      ]} />
      <Paragraph>{'**data-sly-element: cambiar la etiqueta.** Ideal para que el autor elija el nivel del encabezado. Por seguridad solo acepta etiquetas de una lista permitida (`h1`–`h6`, `p`, `div`, `section`, `article`, `span`, `a`, `ol`, `li`, `table`...; curiosamente `ul` no está en la lista); `script`, `style`, `form` o `input` se rechazan.'}</Paragraph>
      <CodeBlock filename="data-sly-element" language="html" code={elementEx} />
      <Paragraph>{'**data-sly-list y data-sly-repeat: ciclos.** La diferencia es qué se repite: `list` repite el **contenido** (el `<ul>` aparece una vez), `repeat` repite el **elemento completo**.'}</Paragraph>
      <CodeBlock filename="list y repeat" language="html" code={listEx} />
      <CodeBlock filename="salida (página con tres hijas)" language="html" code={listOut} />
      <DataTable
        caption="Variable de estado: <nombre>List (hijaList, itemList...)"
        headers={['Propiedad', 'Valor']}
        rows={[
          ['`index`', 'Posición desde 0'],
          ['`count`', 'Posición desde 1'],
          ['`first` / `last`', 'Verdadero en el primero / último'],
          ['`middle`', 'Ni primero ni último'],
          ['`odd` / `even`', 'Según `count` sea impar / par']
        ]}
      />
      <List items={[
        'Sin identificador, el elemento se llama `item` y el estado `itemList`.',
        'Opciones de control: `begin` (índice inicial), `end` (índice final, **incluido**) y `step` (saltos). `@ end=2` muestra los índices 0, 1 y 2: tres elementos.',
        'Las variables del ciclo solo existen **dentro** del elemento.'
      ]} />
      <CodeBlock filename="recorrer un mapa" language="html" code={mapEx} />
      <Paragraph>{'**data-sly-unwrap y `<sly>`: quitar envolturas.**'}</Paragraph>
      <CodeBlock filename="data-sly-unwrap y sly" language="html" code={unwrapEx} />
      <Paragraph>{'**Inclusión y plantillas.** Se estudian a fondo en [[ch-18]]; aquí solo la idea:'}</Paragraph>
      <CodeBlock filename="include, resource, template y call" language="html" code={modEx} />
      <List items={[
        '`data-sly-include` inserta otro script **del mismo componente**, que se ejecuta sobre el mismo recurso. Las variables del script actual **no** pasan al incluido.',
        '`data-sly-resource` hace una **nueva petición** interna para otro recurso, con su propio componente. Es más costoso: no lo uses dentro de ciclos grandes.',
        '`data-sly-template` declara un bloque con parámetros y `data-sly-call` lo invoca; solo recibe lo que le pasas como parámetro.'
      ]} />

      <SectionTitle>Orden de evaluación</SectionTitle>
      <Paragraph>{'Cuando un elemento tiene varias directivas, HTL las evalúa en este orden (las del mismo nivel, de izquierda a derecha):'}</Paragraph>
      <DataTable
        headers={['Prioridad', 'Directivas']}
        rows={[
          ['1', '`data-sly-template`'],
          ['2', '`data-sly-set`, `data-sly-test`, `data-sly-use`'],
          ['3', '`data-sly-call`'],
          ['4', '`data-sly-text`'],
          ['5', '`data-sly-element`, `data-sly-include`, `data-sly-resource`'],
          ['6', '`data-sly-unwrap`'],
          ['7', '`data-sly-list`, `data-sly-repeat`'],
          ['8', '`data-sly-attribute`']
        ]}
      />
      <Alert type="warning" title="Consecuencia práctica">
        {'`test` se evalúa **antes** que `list`. En `<li data-sly-list.x="${lista}" data-sly-test="${x.visible}">`, la variable `x` todavía no existe cuando se evalúa la prueba. Pon la condición en un elemento **dentro** del ciclo.'}
      </Alert>

      <SectionTitle>Escapado por contexto y XSS</SectionTitle>
      <Paragraph>{'Un ataque **XSS** (*cross-site scripting*) ocurre cuando un texto controlado por alguien (un autor, un parámetro de URL) se imprime como código y el navegador lo ejecuta. HTL lo previene **escapando cada valor según su posición**:'}</Paragraph>
      <List items={[
        'En el **texto** de un elemento usa el contexto `text`: `<` se convierte en `&lt;`.',
        'En el **valor de un atributo** usa `attribute`.',
        'En `href`, `src`, `action`, `poster` y similares usa `uri`: valida la URL y descarta, por ejemplo, `javascript:...`.',
        'Dentro de `<script>`, `<style>`, atributos `on*` y `style=""` **no hay contexto automático**: debes indicarlo o la expresión no imprime nada.'
      ]} />
      <Figure
        alt="Cuatro posiciones de una expresión y lo que HTL imprime en cada una"
        caption="La misma expresión `${x}` se escapa distinto según dónde esté. Salidas según la especificación HTL 1.4."
      >
        <DiagramaEscapado />
      </Figure>
      <DataTable
        caption="Contextos disponibles (opción context)"
        headers={['Contexto', 'Cuándo usarlo']}
        rows={[
          ['`text`', 'Por defecto en el contenido. Escapa todo el HTML'],
          ['`html`', 'Para HTML del autor (Rich Text Editor): elimina etiquetas y atributos peligrosos'],
          ['`attribute`', 'Por defecto en valores de atributos'],
          ['`uri`', 'Por defecto en `href`, `src`... Valida la URL'],
          ['`number`', 'Solo imprime si es un número'],
          ['`elementName` / `attributeName`', 'Por defecto en `data-sly-element` y nombres de `data-sly-attribute`'],
          ['`scriptString` / `scriptToken` / `scriptComment`', 'Dentro de JavaScript: cadenas, identificadores o comentarios'],
          ['`styleString` / `styleToken` / `styleComment`', 'Dentro de CSS: cadenas, valores o comentarios'],
          ['`unsafe`', 'Desactiva toda protección. **Evítalo**']
        ]}
      />
      <Paragraph>{'Lo que pasa si un autor guarda esto en un campo:'}</Paragraph>
      <CodeBlock filename="valor guardado" language="html" code={xssIn} />
      <CodeBlock filename="lo que imprime HTL" language="html" code={xssOut} />
      <List items={[
        'Con el contexto por defecto (`text`) se ve el código como texto: seguro, pero no es lo que el autor quiere para un texto enriquecido.',
        'Con `context=\'html\'` se conserva el formato seguro (`<p>`, `<b>`) y se eliminan `<script>`, `onclick` y la URL `javascript:`.',
        'Por eso el componente Text de Core Components imprime su contenido con `context=\'html\'`.'
      ]} />
      <CodeBlock filename="JavaScript y CSS" language="html" code={scriptStyle} />
      <Alert type="tip" title="Preferir atributos data-*">
        {'En lugar de escribir valores dentro de `<script>`, ponlos en atributos `data-*` y léelos desde tu JavaScript en `ui.frontend` ([[ch-24]]). Así el escapado es automático y el JS queda en archivos cacheables.'}
      </Alert>

      <SectionTitle>Opciones de expresión</SectionTitle>
      <Paragraph>{'Después de `@` se agregan opciones separadas por comas. Además de `context`, las más útiles son:'}</Paragraph>
      <CodeBlock filename="format" language="html" code={formatEx} />
      <List items={[
        'El tipo se decide por la opción `type` (`string`, `date`, `number`); si no la pones, HTL lo deduce de los marcadores `{0}` o del tipo del valor.',
        'Patrones de fecha: `yyyy` año, `MM` mes, `MMMM` nombre del mes, `dd` día, `EEEE` día de la semana, `HH:mm` hora. Opciones extra: `timezone` y `locale`.',
        'Patrones de número: `0` dígito obligatorio, `#` dígito opcional, `,` separador de miles, `.` decimales, `%` porcentaje.',
        'El separador de miles y de decimales depende del idioma (`locale`): `1,234.50` en español de México o inglés; `1.234,50` en alemán.'
      ]} />
      <CodeBlock filename="i18n y join" language="html" code={i18nJoin} />
      <List items={[
        '`i18n` busca el texto en los diccionarios de AEM (se estudian en [[ch-53]]); si no hay traducción, imprime el original.',
        '`join` convierte un arreglo en texto con el separador que elijas (sin `join`, los separa con comas sin espacio).'
      ]} />
      <CodeBlock filename="manipulación de URLs" language="html" code={uriEx} />
      <DataTable
        caption="Opciones de URL"
        headers={['Opción', 'Qué modifica']}
        rows={[
          ['`extension`', 'Agrega, cambia o quita la extensión (`.html`)'],
          ['`selectors` / `addSelectors` / `removeSelectors`', 'Selectores de Sling (`pagina.movil.html`)'],
          ['`suffix` / `prependSuffix` / `appendSuffix`', 'Sufijo después de la extensión'],
          ['`query` / `addQuery` / `removeQuery`', 'Parámetros `?clave=valor` (a partir de un mapa)'],
          ['`fragment`', 'Ancla `#seccion`'],
          ['`scheme`, `domain`, `path`, `prependPath`, `appendPath`', 'Protocolo, dominio y ruta']
        ]}
      />
      <Alert type="info" title="Enlaces a páginas: ¿por qué falta el .html?">
        {'Un `pathfield` guarda la ruta del nodo (`/content/practica/us/en/contacto`), sin extensión. Si la imprimes tal cual, el enlace no abre la página. `@ extension=\'html\'` lo resuelve; en proyectos con URLs cortas, la reescritura final la hacen los mappings y el Dispatcher.'}
      </Alert>

      <SectionTitle>Laboratorio · Componente Demo HTL</SectionTitle>
      <Paragraph>{'Construirás un componente que usa casi todo lo visto. Crea `ui.apps/.../components/demohtl/` con un `.content.xml` (`jcr:title="Demo HTL"`, `componentGroup="Sitio de Practica - Content"`) y un diálogo con estos campos: `titulo` (textfield), `nivel` (select h2/h3), `descripcion` (richtext), `enlace` (pathfield), `precio` (numberfield), `etiquetas` (multifield) y `destacado` (checkbox). Lo nuevo del diálogo:'}</Paragraph>
      <CodeBlock filename="demohtl/_cq_dialog/.content.xml (fragmento)" language="xml" code={labDialog} />
      <List items={[
        '`precio@TypeHint = Double`: un campo oculto que indica al servidor que guarde el precio como **número decimal**. Sin él podría guardarse como texto y el formato numérico no funcionaría.',
        'Un `multifield` con un único `textfield` cuyo `name` está en el campo interno guarda un **arreglo de textos** (`etiquetas = [verano, oferta, web]`). Los multifields compuestos se ven en [[ch-21]].'
      ]} />
      <CodeBlock filename="demohtl/demohtl.html" language="html" code={labHtml} />
      <List items={[
        '**Línea 2**: `data-sly-set` con `||` usa el título del autor o, si está vacío, el de la página. En `<sly .../>` no imprime nada.',
        '**Línea 3**: ternario para agregar un modificador BEM solo si `destacado` es verdadero.',
        '**Línea 4**: `data-sly-attribute.data-pagina` crea el atributo `data-pagina` con el nombre de la página.',
        '**Línea 6**: `data-sly-element` cambia `h2` por el nivel elegido; `|| \'h2\'` es el valor por defecto.',
        '**Líneas 8–9**: el texto enriquecido se imprime con `context=\'html\'`.',
        '**Líneas 11–14**: `format` de cadena (`{0}`) y de número (`#,##0.00`).',
        '**Líneas 16–22**: el mismo arreglo dos veces: con `join` en una línea y con `data-sly-list` como lista. El `<ul>` no aparece si no hay etiquetas.',
        '**Líneas 24–26**: el `href` recibe automáticamente el contexto `uri`, y `extension` agrega `.html`.',
        '**Líneas 28–31**: `data-sly-repeat` sobre las páginas hijas, con `end=4` (máximo cinco).',
        '**Líneas 33–36**: dos pasos para dar formato a una fecha y luego insertarla en una frase (las opciones `@` no se pueden anidar; lo comprobarás en un momento).',
        '**Línea 38**: solo visible para el autor en modo edición.',
        '**Línea 39**: `data-sly-unwrap` deja el texto sin el `<p>`; `i18n` lo traduciría si hubiera diccionario.',
        '**Líneas 41–43**: el marcador para el autor cuando falta el título propio.'
      ]} />
      <Paragraph>{'Compila con `mvn clean install -pl ui.apps -PautoInstallPackage`. En nuestra verificación, la validación terminó con `Processed 12 files` y `BUILD SUCCESS`. Después agrega el componente a una página y llena el diálogo con:'}</Paragraph>
      <CodeBlock filename="datos de prueba" language="text" code={labData} />
      <CodeBlock filename="salida esperada (en modo publicado, ?wcmmode=disabled)" language="html" code={labOut} />
      <List items={[
        'El `<script>` de la descripción desapareció: el contexto `html` lo eliminó.',
        'El segundo y el tercer `<li>` no tienen `class`: cuando **todo** el valor de un atributo es una expresión vacía, HTL elimina el atributo. En la línea 3 no ocurre porque el valor mezcla texto fijo (`cmp-demohtl `) con la expresión.',
        'En modo edición verías además "Estás en modo edición".',
        'Comprueba la salida real con **Ver código fuente** del navegador o con `?wcmmode=disabled`.'
      ]} />

      <SectionTitle>Errores reales del validador</SectionTitle>
      <Paragraph>{'Nuestra primera versión de la línea de la fecha intentaba anidar un `format` dentro de otro. El build falló así:'}</Paragraph>
      <CodeBlock filename="error de sintaxis" language="text" code={errNested} />
      <List items={[
        '`[34:133]` indica línea y columna; debajo aparece la expresión completa.',
        '`no viable alternative at input` significa que el analizador encontró algo que la gramática no permite: aquí, una `@` dentro de un arreglo.',
        'La solución fue guardar la fecha formateada con `data-sly-set` y usarla en la segunda expresión.'
      ]} />
      <Paragraph>{'Luego probamos a propósito una expresión en `style` y otra en `onclick` sin contexto:'}</Paragraph>
      <CodeBlock filename="advertencias convertidas en error" language="text" code={errContext} />
      <List items={[
        'El motor avisa que esas expresiones se **reemplazarían por texto vacío**: en AEM el componente "funcionaría" pero sin color ni evento, un error difícil de detectar.',
        'El proyecto del arquetipo configura el plugin para que **las advertencias detengan el build**, así lo descubres al compilar.',
        'La solución: indicar `context=\'styleToken\'` / `context=\'scriptString\'`, o mejor, mover esos datos a atributos `data-*`.'
      ]} />

      <SectionTitle>Buenas prácticas</SectionTitle>
      <List items={[
        'HTL para **mostrar**; cálculos, formatos complejos, consultas o llamadas externas van en un **Sling Model** ([[ch-45]]).',
        'Pon `data-sly-test` en el contenedor principal para no generar HTML vacío cuando el autor no configuró el componente.',
        'Usa `<sly>` para lógica que no debe generar etiquetas.',
        'Guarda resultados repetidos con `data-sly-set` o con el identificador de `data-sly-test`.',
        'No uses `context=\'unsafe\'`; para HTML del autor, `context=\'html\'`.',
        'Evita `data-sly-resource` dentro de ciclos con muchos elementos: cada uno es una petición interna.',
        'Clases con la convención **BEM** de Core Components (`cmp-nombre__elemento--modificador`) para que estilos y Style System ([[ch-28]]) sean predecibles.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['Una expresión no imprime nada', 'Nombre de propiedad con otra mayúscula, propiedad inexistente o contexto que la descartó', 'Revisa el nodo en CRXDE ([[ch-6]]) y el contexto'],
          ['Se ve el HTML como texto (`&lt;p&gt;`)', 'Texto enriquecido impreso con el contexto por defecto', '`@ context=\'html\'`'],
          ['El enlace lleva a una página 404', 'Ruta sin `.html`', '`@ extension=\'html\'`'],
          ['`${a == 3}` siempre es falso', 'La propiedad se guardó como texto', '`@TypeHint` en el diálogo o comparar con `\'3\'`'],
          ['Un `data-sly-test` no ve la variable del ciclo', 'Orden de evaluación: `test` va antes que `list`', 'Mover la prueba a un elemento interior'],
          ['El build falla en `validate-htl-scripts`', 'Error de sintaxis o advertencia de contexto', 'Ir a la línea y columna que indica el mensaje']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Crea el componente Demo HTL, colócalo en una página y llénalo con los datos de prueba.',
        '**2.** Compara la salida con `?wcmmode=disabled` y en modo edición.',
        '**3.** Marca también el último `<li>` con la clase `is-last` usando `etiquetaList.last`, sin que los elementos intermedios reciban un atributo `class`.',
        '**4.** Agrega una línea que muestre "Etiqueta web incluida" solo si `\'web\' in properties.etiquetas`.',
        '**5.** Muestra la fecha de creación con el nombre del día y del mes en español (`EEEE d \'de\' MMMM` con `locale=\'es\'`).',
        '**6.** Provoca a propósito un error de sintaxis (una `}` faltante) y uno de contexto (`style`) y lee los mensajes del build.'
      ]} />
      <Alert type="tip" title="Criterios de verificación">
        {'La salida publicada no contiene `data-sly-*` ni `${`; la descripción conserva `<b>` pero no `<script>`; los enlaces terminan en `.html`; y el build vuelve a `BUILD SUCCESS` tras corregir los errores provocados.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'HTL se ejecuta en el servidor y entrega HTML puro, escapado según el contexto de cada valor.',
        'Las expresiones admiten literales, acceso con punto o corchetes y operadores lógicos, de comparación estricta e `in`; no hacen aritmética.',
        '`properties`, `pageProperties`, `currentPage` y `wcmmode` son los objetos globales de uso diario.',
        'Las 12 directivas cubren lógica (`use`, `set`, `test`), salida (`text`, `attribute`, `element`, `unwrap`), ciclos (`list`, `repeat`) y modularidad (`include`, `resource`, `template`/`call`), y se evalúan en un orden fijo.',
        'Las opciones `context`, `format`, `i18n`, `join` y las de URL transforman la salida sin escribir Java.',
        'El validador del build detecta errores de sintaxis y expresiones sin contexto antes de desplegar.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['HTL / Sightly', 'Lenguaje de plantillas del lado del servidor de AEM'],
          ['Expresión', 'Código entre `${` y `}` que produce un valor'],
          ['Block statement', 'Atributo `data-sly-*` que controla un elemento'],
          ['`<sly>`', 'Etiqueta que nunca aparece en la salida'],
          ['XSS', 'Ataque que inyecta código ejecutable en una página'],
          ['Contexto de escapado', 'Regla que transforma un valor según dónde se imprime'],
          ['Use-API', 'Mecanismo para cargar lógica (Sling Models) con `data-sly-use`'],
          ['`@TypeHint`', 'Indicación al servidor del tipo con el que guardar un campo']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'HTL Specification 1.4', source: 'GitHub · Adobe', url: 'https://github.com/adobe/htl-spec/blob/master/SPECIFICATION.md' },
        { type: 'image', title: 'HTL Overview', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-htl/content/overview' },
        { type: 'image', title: 'HTL Global Objects', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-htl/content/global-objects' },
        { type: 'image', title: 'HTL Block Statements', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-htl/content/specification' },
        { type: 'image', title: 'HTL Maven Plugin', source: 'Apache Sling', url: 'https://sling.apache.org/components/htl-maven-plugin/' },
        { type: 'video', title: 'Introduction to HTL (AEM GEMS, 2014; la base sigue vigente)', source: 'Adobe Video', url: 'https://video.tv.adobe.com/v/19504' },
        { type: 'video', title: 'Serie corta de directivas HTL (sly test, list, attribute, element...)', source: 'YouTube · AEM Tutorials', url: 'https://www.youtube.com/watch?v=erU77YXEFFc' },
        { type: 'doc', title: 'Scripting HTL en Apache Sling: conversión de tipos y extensiones', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/scripting/scripting-htl.html' }
      ]} />
    </LessonPage>
  );
}
