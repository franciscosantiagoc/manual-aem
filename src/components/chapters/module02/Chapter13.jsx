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

const generate = `mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem \\
  -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=57 \\
  -DappTitle="Sitio React" \\
  -DappId="practicareact" \\
  -DgroupId="com.practicareact" \\
  -DaemVersion=cloud \\
  -DfrontendModule=react \\
  -Dlanguage=es \\
  -Dcountry=mx`;

const frontendTree = `ui.frontend/
├── .env                        ← variables para el build que va a AEM
├── .env.development            ← variables para npm start (desarrollo local)
├── clientlib.config.js         ← empaqueta el build como clientlib-react
├── package.json                ← dependencias y scripts de npm
├── public/index.html           ← HTML para el servidor de desarrollo
└── src/
    ├── index.js                ← punto de entrada: inicializa el modelo y renderiza
    ├── App.js                  ← componente raíz (la página)
    ├── LocalDevModelClient.js  ← pide el modelo a AEM en desarrollo local
    └── components/
        ├── import-components.js  ← mapea tipos de recurso de AEM a componentes React
        ├── Page/Page.js
        ├── Container/Container.js
        └── Text/Text.js (+ Text.test.js, Text.css)`;

const indexJs = `const modelManagerOptions = {};
if(process.env.REACT_APP_PROXY_ENABLED) {
    modelManagerOptions.modelClient = new LocalDevModelClient(process.env.REACT_APP_API_HOST);
}

const renderApp = () => {
    ModelManager.initialize(modelManagerOptions).then(pageModel => {
        const history = createBrowserHistory();
        render(
            <Router history={history}>
                <App
                    history={history}
                    cqChildren={pageModel[Constants.CHILDREN_PROP]}
                    cqItems={pageModel[Constants.ITEMS_PROP]}
                    cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
                    cqPath={pageModel[Constants.PATH_PROP]}
                    locationPathname={window.location.pathname}
                />
            </Router>,
            document.getElementById('spa-root')
        );
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});`;

const mapToExample = `import {MapTo} from '@adobe/aem-react-editable-components';

const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function (props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

MapTo('practicareact/components/text')(LazyTextComponent, TextEditConfig);`;

const modelJava = `package com.practicareact.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = { ServiceCardModel.class, ComponentExporter.class },
        resourceType = ServiceCardModel.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ServiceCardModel implements ComponentExporter {

    static final String RESOURCE_TYPE = "practicareact/components/servicecard";

    @ValueMapValue
    private String titulo;

    @ValueMapValue
    private String descripcion;

    @ValueMapValue
    private String imagen;

    @ValueMapValue
    private String enlace;

    @ValueMapValue
    private boolean destacado;

    @SlingObject
    private ResourceResolver resourceResolver;

    private String enlaceUrl;

    @PostConstruct
    protected void init() {
        if (enlace != null && enlace.startsWith("/content/")) {
            enlaceUrl = resourceResolver.map(enlace) + ".html";
        } else {
            enlaceUrl = enlace;
        }
    }

    public String getTitulo() { return titulo; }

    public String getDescripcion() { return descripcion; }

    public String getImagen() { return imagen; }

    public String getEnlaceUrl() { return enlaceUrl; }

    public boolean isDestacado() { return destacado; }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}`;

const modelTest = `@ExtendWith(AemContextExtension.class)
class ServiceCardModelTest {

    private final AemContext context = AppAemContext.newAemContext();

    @Test
    void exponeLasPropiedadesParaReact() {
        context.create().resource("/content/prueba/card",
                "sling:resourceType", ServiceCardModel.RESOURCE_TYPE,
                "titulo", "Consultoría AEM",
                "enlace", "/content/practicareact/mx/es",
                "destacado", true);
        context.currentResource("/content/prueba/card");

        ServiceCardModel card = context.request().adaptTo(ServiceCardModel.class);

        assertNotNull(card);
        assertEquals("Consultoría AEM", card.getTitulo());
        assertEquals("/content/practicareact/mx/es.html", card.getEnlaceUrl());
        assertTrue(card.isDestacado());
        assertEquals("practicareact/components/servicecard", card.getExportedType());
    }

    @Test
    void seRegistraComoComponentExporter() {
        context.create().resource("/content/prueba/card2",
                "sling:resourceType", ServiceCardModel.RESOURCE_TYPE,
                "titulo", "Soporte");
        context.currentResource("/content/prueba/card2");

        ComponentExporter exporter = context.request().adaptTo(ComponentExporter.class);

        assertNotNull(exporter);
        assertEquals(ServiceCardModel.RESOURCE_TYPE, exporter.getExportedType());
    }
}`;

const reactComponent = `import React from 'react';

require('./ServiceCard.css');

export const ServiceCardEditConfig = {
  emptyLabel: 'Tarjeta de servicio',
  isEmpty: (props) => !props || !props.titulo || props.titulo.trim().length === 0
};

const ServiceCard = (props) => {
  if (ServiceCardEditConfig.isEmpty(props)) {
    return null;
  }

  const { titulo, descripcion, imagen, enlaceUrl, destacado } = props;
  const className = 'cmp-servicecard' + (destacado ? ' cmp-servicecard--destacado' : '');

  return (
    <div className={className}>
      {imagen && <img className="cmp-servicecard__imagen" src={imagen} alt={titulo} loading="lazy" />}
      <h3 className="cmp-servicecard__titulo">{titulo}</h3>
      {descripcion && <p className="cmp-servicecard__descripcion">{descripcion}</p>}
      {enlaceUrl && <a className="cmp-servicecard__enlace" href={enlaceUrl}>Ver más</a>}
    </div>
  );
};

export default ServiceCard;`;

const mapping = `// ui.frontend/src/components/import-components.js
import {MapTo} from '@adobe/aem-react-editable-components';
import ServiceCard, { ServiceCardEditConfig } from './ServiceCard/ServiceCard';

// ... resto de los mapeos del archetype ...

MapTo('practicareact/components/servicecard')(ServiceCard, ServiceCardEditConfig);`;

const reactTest = `import React from 'react';
import { render } from '@testing-library/react';
import ServiceCard, { ServiceCardEditConfig } from './ServiceCard';

describe('ServiceCard', () => {
  it('muestra título, descripción y enlace', () => {
    const { getByText, container } = render(
      <ServiceCard
        titulo="Consultoría AEM"
        descripcion="Te ayudamos a migrar"
        enlaceUrl="/content/practicareact/mx/es.html"
        destacado={true}
      />
    );

    expect(getByText('Consultoría AEM')).toBeInTheDocument();
    expect(getByText('Te ayudamos a migrar')).toBeInTheDocument();
    expect(getByText('Ver más')).toHaveAttribute('href', '/content/practicareact/mx/es.html');
    expect(container.firstChild).toHaveClass('cmp-servicecard--destacado');
  });

  it('no renderiza nada si no hay título', () => {
    const { container } = render(<ServiceCard />);

    expect(ServiceCardEditConfig.isEmpty({})).toBe(true);
    expect(container.firstChild).toBeNull();
  });
});`;

const buildOutput = `[INFO] Running com.practicareact.core.models.ServiceCardModelTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO] PASS src/components/ServiceCard/ServiceCard.test.js
[INFO] Test Suites: 6 passed, 6 total
[INFO] Tests:       19 passed, 19 total
[INFO] Compiled successfully.
...
[INFO] BUILD SUCCESS
[INFO] Total time:  06:02 min`;

const modelJson = `{
  ":type": "practicareact/components/servicecard",
  "titulo": "Consultoría AEM",
  "descripcion": "Te ayudamos a migrar a la nube",
  "imagen": "/content/dam/practicareact/asset.jpg",
  "enlaceUrl": "/content/practicareact/mx/es.html",
  "destacado": true
}`;

const envDev = `# ui.frontend/.env.development (generado, con la corrección)
PUBLIC_URL=/
REACT_APP_PROXY_ENABLED=true
# El archetype genera /content/practicareact/us/en.model.json aunque el sitio sea mx/es:
REACT_APP_PAGE_MODEL_PATH=/content/practicareact/mx/es/home.model.json
REACT_APP_API_HOST=http://localhost:4502
REACT_APP_AEM_AUTHORIZATION_HEADER='Basic YWRtaW46YWRtaW4='
REACT_APP_ROOT=/content/practicareact/mx/es/home.html`;

const npmStart = `cd ui.frontend
nvm use 16          # react-scripts 4 funciona con Node 16
npm install
npm start           # abre http://localhost:3000 con proxy a localhost:4502

# Si usas Node 17 o superior y aparece ERR_OSSL_EVP_UNSUPPORTED:
#   macOS/Linux:  export NODE_OPTIONS=--openssl-legacy-provider
#   PowerShell:   $env:NODE_OPTIONS="--openssl-legacy-provider"`;

const analyserWarn = `[WARNING] [region-deprecated-api] com.adobe.aem:spa.project.core.core:1.3.16:
          Usage of deprecated package found : com.day.cq.wcm.commons :
          Please use com.day.cq.wcm.commons.utils instead.
          Deprecated since 2026-07-01 For removal : 2027-03-31`;

export default function Chapter13({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-13"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <Alert type="warning" title="Antes de empezar: el SPA Editor está deprecado">
        {'Adobe deprecó el **SPA Editor** en **AEM 6.5.23** y en **AEM as a Cloud Service 2025.01**. Los proyectos existentes pueden seguir usándolo, pero Adobe solo atenderá problemas P1, P2 y de seguridad, y no habrá mejoras en sus SDKs. Para proyectos **nuevos**, Adobe recomienda el **Universal Editor** ([[ch-96]]) o apps headless ([[ch-95]]). Este laboratorio existe porque **muchos proyectos reales en producción usan React con el SPA Editor**, y un desarrollador necesita saber mantenerlos.'}
      </Alert>

      <SectionTitle>Objetivos del laboratorio</SectionTitle>
      <List items={[
        'Entender cómo funciona un sitio AEM hecho con React y el SPA Editor: modelo JSON, `MapTo` y edición visual.',
        'Generar un proyecto React con el **archetype 57** (el último que lo permite) y compilarlo.',
        'Recorrer el código del frontend React línea por línea.',
        'Crear un componente propio: Sling Model Exporter en Java y componente React, con pruebas de ambos lados.',
        'Trabajar en local con `npm start` contra tu AEM, corrigiendo un error real del archetype.',
        'Reconocer los riesgos de mantener esta tecnología y hacia dónde migrar.'
      ]} />
      <Alert type="info" title="Cómo se verificó este laboratorio">
        {'Generamos el proyecto con el archetype 57 (`frontendModule=react`, Cloud Service), le agregamos el componente del laboratorio y ejecutamos `mvn clean install`: BUILD SUCCESS, con 2 pruebas Java y 19 pruebas de Jest aprobadas. No se probó el despliegue en AEM porque no había una instancia disponible.'}
      </Alert>

      <SectionTitle>Cómo funciona un sitio React en AEM</SectionTitle>
      <Paragraph>{'En un sitio HTL (Temas 11 y 12) AEM genera el HTML en el servidor. En un sitio con **SPA Editor**, AEM entrega los **datos** de la página en JSON y una **aplicación React** los convierte en interfaz en el navegador:'}</Paragraph>
      <FlowDiagram
        caption="Del contenido del autor a la interfaz React"
        steps={[
          { title: 'Diálogo', detail: 'El autor guarda propiedades en el JCR', tone: 'purple' },
          { title: 'Sling Model Exporter', detail: 'Java expone el componente como JSON', tone: 'primary' },
          { title: '.model.json', detail: 'JSON de toda la página', tone: 'cyan' },
          { title: 'PageModelManager', detail: 'La app pide y cachea el modelo', tone: 'success' },
          { title: 'MapTo', detail: 'Cada :type se dibuja con su componente React', tone: 'warning' }
        ]}
      />
      <List items={[
        '**`.model.json`**: agregando `.model.json` a la URL de una página, AEM devuelve su contenido completo en JSON. Cada componente aparece con su tipo en la propiedad `:type` ([[ch-49]]).',
        '**PageModelManager** (`@adobe/aem-spa-page-model-manager`): librería que pide ese JSON y lo mantiene sincronizado mientras el autor edita.',
        '**MapTo** (`@adobe/aem-react-editable-components`): registra "este tipo de recurso de AEM se dibuja con este componente React", y lo hace editable en el editor de AEM.',
        'La arquitectura completa del SPA Editor se profundiza en el Módulo 14 ([[ch-97]]).'
      ]} />

      <SectionTitle>Paso 1 · Generar el proyecto con el archetype 57</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={generate} />
      <List items={[
        '`-DarchetypeVersion=57`: la versión 58 ya no acepta `react` ([[ch-8]]).',
        '`-DfrontendModule=react` reemplaza el `ui.frontend` de webpack por una aplicación **Create React App**.',
        'Para AEM 6.5 cambia `aemVersion` por la versión de tu Service Pack. Recuerda que en 6.5 el SPA Editor está deprecado desde 6.5.23.',
        'En Windows genera desde una terminal de administrador o WSL si incluyes el Dispatcher ([[ch-9]]).'
      ]} />

      <SectionTitle>Paso 2 · Qué cambia en el proyecto</SectionTitle>
      <CodeBlock filename="ui.frontend (real)" language="text" code={frontendTree} />
      <DataTable
        headers={['Pieza', 'Versión generada', 'Nota']}
        rows={[
          ['React / React DOM', '16.12', 'Versión antigua de React'],
          ['react-scripts (Create React App)', '4.0.3', 'Herramienta de build ya sin mantenimiento activo'],
          ['react-router-dom', '5.1', 'Enrutado entre páginas'],
          ['@adobe/aem-react-editable-components', '1.1.6', 'Page, Container, MapTo y edición visual'],
          ['@adobe/aem-spa-page-model-manager', '1.3.11', 'Obtiene y sincroniza el modelo JSON'],
          ['@adobe/aem-core-components-react-base / -spa', '1.1.8 / 1.2.0', 'Versiones React de Core Components (Title, Image, Teaser...)'],
          ['Node en el build de Maven (`ui.frontend/pom.xml`)', '**v12.22.7**', 'Muy antigua; el POM raíz usa v16.17.0'],
          ['Clientlib generada', '`clientlib-react` (categoría `practicareact.react`)', 'Contiene la app compilada']
        ]}
      />
      <List items={[
        'En `ui.apps` aparecen componentes propios del SPA: `spa` (componente de página de la app), `page`, `remotepage` y `remotepagenext`.',
        'Las páginas de `ui.content` usan la plantilla `spa-page-template` y el tipo `practicareact/components/spa`. La página de inicio es `/content/practicareact/mx/es/home`.',
        'El `package.json` también trae un script `sync` con **aemsync**: evítalo y usa VSCode AEM Sync ([[ch-3]]).'
      ]} />

      <SectionTitle>Paso 3 · Compilar y leer las advertencias</SectionTitle>
      <Paragraph>{'`mvn clean install` compila Java, ejecuta las pruebas de Jest del frontend, construye la app React y la empaqueta. En nuestra verificación, el proyecto generado sin cambios terminó en BUILD SUCCESS en 6:54 min, con 17 pruebas de Jest aprobadas. Pero hay advertencias que un desarrollador responsable no debe ignorar:'}</Paragraph>
      <CodeBlock filename="advertencia real del AEM Analyser" language="text" code={analyserWarn} />
      <List items={[
        'La librería de Adobe `spa.project.core` que usa el proyecto depende de un paquete Java **deprecado desde el 1-jul-2026 y con retiro previsto el 31-mar-2027**. Un proyecto SPA en Cloud tendrá que actualizar esa dependencia o migrar antes de esa fecha.',
        'npm reportó **19 vulnerabilidades** (2 críticas) en las dependencias del frontend: normal en un stack con React 16 y Create React App 4, y un motivo más para planificar la migración.',
        'También aparece el aviso de analyser desactualizado que ya viste en [[ch-12]].'
      ]} />

      <SectionTitle>Paso 4 · Recorrer el código React</SectionTitle>
      <Paragraph>{'**`src/index.js`**, el punto de entrada (fragmento real):'}</Paragraph>
      <CodeBlock filename="ui.frontend/src/index.js" language="javascript" code={indexJs} />
      <List items={[
        'Si `REACT_APP_PROXY_ENABLED` está activo (solo en desarrollo local), usa `LocalDevModelClient` para pedir el modelo a AEM con autenticación.',
        '`ModelManager.initialize()` descarga el `.model.json` de la página y devuelve el modelo.',
        'Con el modelo, renderiza `<App>` dentro de un `Router` (para navegar entre páginas sin recargar) en el elemento `#spa-root`.',
        'Las props `cqItems`, `cqItemsOrder` y `cqChildren` son los componentes, su orden y las páginas hijas, tal como vienen en el JSON.'
      ]} />
      <Paragraph>{'**`src/App.js`** extiende `Page` de las librerías de Adobe y dibuja `this.childComponents` y `this.childPages`; `withModel` lo conecta con el modelo. **`Page.js`** hace lo mismo para el tipo `practicareact/components/page`.'}</Paragraph>
      <Paragraph>{'**`import-components.js`** es el "mapa" de la aplicación. Así mapea el componente de texto (fragmento real):'}</Paragraph>
      <CodeBlock filename="ui.frontend/src/components/import-components.js (fragmento)" language="javascript" code={mapToExample} />
      <List items={[
        '`MapTo(\'practicareact/components/text\')` dice: cuando el JSON traiga un componente con `:type` igual a `practicareact/components/text`, dibújalo con `LazyTextComponent`.',
        '`LazyTextComponent` se carga de forma diferida (code splitting) para reducir el JavaScript inicial.',
        'El **EditConfig** define cómo lo ve el autor: `emptyLabel` es el texto del marcador y `isEmpty` decide cuándo el componente está vacío.',
        'El resto del archivo mapea los Core Components (Title, Image, Teaser, Container, Tabs...) a sus versiones React.'
      ]} />

      <SectionTitle>Paso 5 · Tu componente en React: Tarjeta de servicio</SectionTitle>
      <Paragraph>{'Construimos el mismo componente de los Temas 11 y 12, ahora con React. La definición (`.content.xml`, grupo `Sitio React - Content`) y el **diálogo** son idénticos a los del [[ch-11]]: el autor edita igual. Cambian el backend (ahora exporta JSON) y la vista (ahora es React). No hay archivo HTL.'}</Paragraph>
      <Paragraph>{'**Backend: Sling Model Exporter.**'}</Paragraph>
      <CodeBlock filename="core/.../models/ServiceCardModel.java" language="java" code={modelJava} />
      <List items={[
        '`adaptables = SlingHttpServletRequest.class`: el exporter trabaja a partir de la petición.',
        '`adapters = { ServiceCardModel.class, ComponentExporter.class }`: el modelo también se ofrece como `ComponentExporter`, la interfaz que usa AEM para armar el `.model.json`.',
        '`resourceType = ...servicecard`: asocia el modelo al componente; así AEM sabe qué modelo exportar para cada nodo de ese tipo.',
        '`@Exporter(name = "jackson", extensions = "json")` (con las constantes de `ExporterConstants`) activa la exportación a JSON con la librería Jackson.',
        'Cada getter público se convierte en una propiedad del JSON: `getTitulo()` → `titulo`, `isDestacado()` → `destacado`.',
        '`getExportedType()` devuelve el `:type` que React usará en `MapTo`. Todo el detalle del exporter está en [[ch-49]].'
      ]} />
      <CodeBlock filename="core/.../models/ServiceCardModelTest.java (pruebas reales, 2 aprobadas)" language="java" code={modelTest} />
      <List items={[
        '`context.currentResource(...)` indica sobre qué nodo trabaja la petición simulada.',
        '`context.request().adaptTo(...)` construye el modelo desde la petición, como hace AEM.',
        'La segunda prueba confirma que el modelo se puede obtener como `ComponentExporter`: si fallara, el componente no aparecería en el JSON.'
      ]} />
      <Paragraph>{'Con el componente en una página, el `.model.json` incluye algo así para la tarjeta (ejemplo derivado de los getters):'}</Paragraph>
      <CodeBlock filename="fragmento de /content/practicareact/mx/es/home.model.json (ejemplo)" language="json" code={modelJson} />

      <Paragraph>{'**Frontend: el componente React.**'}</Paragraph>
      <CodeBlock filename="ui.frontend/src/components/ServiceCard/ServiceCard.js" language="jsx" code={reactComponent} />
      <List items={[
        '`ServiceCardEditConfig` se exporta para usarlo en el mapeo y en las pruebas; `isEmpty` coincide con la regla del Java (sin título, está vacía).',
        'Si está vacía, el componente devuelve `null` y el editor de AEM muestra el marcador con el texto de `emptyLabel`.',
        'Las props (`titulo`, `descripcion`, `imagen`, `enlaceUrl`, `destacado`) llegan **con el mismo nombre** que las propiedades del JSON.',
        'Los elementos opcionales se renderizan con `&&` solo si hay dato, igual que los `data-sly-test` del HTL del [[ch-11]].',
        'Las clases CSS son las mismas (BEM); el archivo `ServiceCard.css` es la versión CSS plana del SCSS del [[ch-11]].'
      ]} />
      <CodeBlock filename="registro con MapTo" language="javascript" code={mapping} />
      <CodeBlock filename="ServiceCard.test.js (pruebas reales, 2 aprobadas)" language="jsx" code={reactTest} />
      <List items={[
        '`render` (de Testing Library) monta el componente en un DOM simulado.',
        '`getByText` busca por el texto visible, como lo haría un usuario; `toHaveAttribute` y `toHaveClass` vienen de `jest-dom`.',
        'La segunda prueba confirma que sin título no se dibuja nada.'
      ]} />
      <CodeBlock filename="salida real de mvn clean install con el componente" language="text" code={buildOutput} />

      <SectionTitle>Paso 6 · Desplegar y probar como autor</SectionTitle>
      <List items={[
        'Despliega con `mvn clean install -PautoInstallSinglePackage` (y la variante Publish) como en los laboratorios anteriores.',
        'Abre `/content/practicareact/mx/es/home.html` en el editor. La página la dibuja React, pero el editor funciona igual: panel de componentes, diálogos y modos.',
        'Arrastra **Tarjeta de servicio** (grupo *Sitio React - Content*): verás el marcador con el texto "Tarjeta de servicio" hasta que llenes el título.',
        'Llena el diálogo y la tarjeta aparece al instante: el PageModelManager recibe el modelo actualizado y React vuelve a renderizar.',
        'Abre `/content/practicareact/mx/es/home.model.json` en otra pestaña y busca `practicareact/components/servicecard`.'
      ]} />

      <SectionTitle>Paso 7 · Desarrollo local con npm start</SectionTitle>
      <Paragraph>{'Con Create React App puedes trabajar el frontend con recarga en caliente, leyendo el contenido real de tu AEM local. Antes, corrige un **error real del archetype 57** en `.env.development`:'}</Paragraph>
      <CodeBlock filename="ui.frontend/.env.development" language="text" code={envDev} />
      <List items={[
        '`REACT_APP_PROXY_ENABLED=true` activa el `LocalDevModelClient`.',
        '`REACT_APP_PAGE_MODEL_PATH` es el JSON que carga al arrancar. **El archetype lo genera como `/content/practicareact/us/en.model.json` aunque el sitio se generó con `mx/es`**: esa ruta no existe y la app queda en blanco. Corrígela a la página real.',
        '`REACT_APP_API_HOST` es tu Author local.',
        '`REACT_APP_AEM_AUTHORIZATION_HEADER` es `admin:admin` en Base64: solo para tu equipo, **nunca** con credenciales reales.',
        '`REACT_APP_ROOT` es la página que se abre como raíz.'
      ]} />
      <CodeBlock filename="terminal" language="bash" code={npmStart} />
      <List items={[
        '`npm start` levanta el servidor de desarrollo de Create React App en `http://localhost:3000`; la propiedad `proxy` del `package.json` reenvía a `localhost:4502` las peticiones que no son de la app.',
        'Usa **Node 16** para `npm start`: `react-scripts` 4 no es compatible con las versiones modernas de Node sin el ajuste `--openssl-legacy-provider`. El build de Maven no se ve afectado porque descarga su propio Node (v12.22.7).',
        'Cada cambio en `src/` se refleja al instante en el navegador; cuando termines, compila y despliega con Maven.'
      ]} />

      <SectionTitle>Mantener o migrar: la decisión</SectionTitle>
      <DataTable
        headers={['Situación', 'Recomendación']}
        rows={[
          ['Proyecto nuevo que quiere React con edición visual', '**No** usar SPA Editor: app headless con **Universal Editor** ([[ch-96]], [[ch-106]])'],
          ['Proyecto existente con SPA Editor que funciona', 'Mantener, pero planificar: actualizar dependencias de Adobe (atento al retiro del 31-mar-2027) y evaluar migración'],
          ['Sitio de contenido sin necesidad real de SPA', 'Sitio HTL ([[ch-12]]) o Edge Delivery Services (Módulo 15)']
        ]}
      />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['El componente no aparece en el `.model.json`', 'El modelo no se registra como `ComponentExporter` o el `resourceType` no coincide', 'Revisar `adapters` y `resourceType`; ejecutar la prueba del exporter'],
          ['En el editor se ve el marcador aunque hay datos', 'El nombre de la prop en React no coincide con la del JSON', 'Comparar el JSON con las props de `isEmpty` y del componente'],
          ['`npm start` muestra la página en blanco', 'Ruta del modelo incorrecta en `.env.development`', 'Corregir `REACT_APP_PAGE_MODEL_PATH`'],
          ['`ERR_OSSL_EVP_UNSUPPORTED` al ejecutar `npm start`', 'Node demasiado nuevo para react-scripts 4', 'Usar Node 16 o `NODE_OPTIONS=--openssl-legacy-provider`'],
          ['401 en las peticiones al modelo en local', 'Credenciales del header incorrectas', 'Revisar `REACT_APP_AEM_AUTHORIZATION_HEADER`']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Agrega a la tarjeta una propiedad **etiqueta** que viaje de extremo a extremo: diálogo, getter en el exporter, prop en React y su prueba en Java y en Jest.',
        '**2.** Ejecuta `mvn clean install` y verifica que las pruebas nuevas pasan.',
        '**3.** Con `npm start`, cambia el estilo de la etiqueta y observa la recarga en caliente.'
      ]} />
      <Alert type="tip" title="Solución">
        {'Diálogo: `textfield` con `name="./etiqueta"`. Java: `@ValueMapValue private String etiqueta;` y `getEtiqueta()` (aparece en el JSON como `etiqueta`). React: desestructura `etiqueta` y agrega `{etiqueta && <span className="cmp-servicecard__etiqueta">{etiqueta}</span>}`. Pruebas: en Java crea el recurso con `"etiqueta", "Nuevo"` y comprueba el getter; en Jest renderiza con `etiqueta="Nuevo"` y usa `getByText("Nuevo")`.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'El SPA Editor está deprecado (6.5.23 y Cloud 2025.01); se mantiene en proyectos existentes y no se recomienda para nuevos.',
        'Un sitio SPA recibe la página como `.model.json` y la dibuja con componentes React mapeados con `MapTo`.',
        'El archetype 57 es el último que genera el proyecto React; su build funciona pero con dependencias antiguas y advertencias de deprecación.',
        'Un componente SPA necesita un Sling Model Exporter (`ComponentExporter`) y un componente React registrado con `MapTo`.',
        '`npm start` permite desarrollar contra tu AEM local, corrigiendo antes la ruta del modelo que genera el archetype.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['SPA', 'Single Page Application: aplicación que se dibuja en el navegador'],
          ['SPA Editor', 'Editor de AEM para páginas hechas con React o Angular (deprecado)'],
          ['`.model.json`', 'JSON con todo el contenido de una página'],
          ['ComponentExporter', 'Interfaz para que un Sling Model aparezca en el `.model.json`'],
          ['MapTo', 'Función que asocia un tipo de recurso de AEM a un componente React'],
          ['EditConfig', 'Configuración de edición: marcador y regla de vacío'],
          ['Universal Editor', 'Editor visual de Adobe recomendado para nuevos proyectos headless']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Deprecación del SPA Editor (Cloud Service)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/hybrid/spa-editor-deprecation' },
        { type: 'image', title: 'Deprecación del SPA Editor (AEM 6.5)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65/content/implementing/developing/spas/spa-editor-deprecation' },
        { type: 'image', title: 'Introducción al SPA Editor', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/hybrid/introduction' },
        { type: 'image', title: 'AEM Project Archetype 57 (README con variantes SPA)', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype/tree/aem-project-archetype-57' },
        { type: 'image', title: 'AEM React Component Development: Complete Guide', source: 'Medium · Naveen Rapelly', url: 'https://medium.com/@naveenrapelly8/aem-react-component-development-complete-guide-a0cc71e8c4fb' },
        { type: 'image', title: 'Replicating data-sly-resource In AEM SPA Components', source: 'Medium · Naveen Rapelly', url: 'https://medium.com/@naveenrapelly8/replicating-data-sly-resource-in-aem-spa-components-5ca6d441ac6b' }
      ]} />
    </LessonPage>
  );
}
