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

const generate = `mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem \\
  -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=57 \\
  -DappTitle="Sitio Angular" \\
  -DappId="practicang" \\
  -DgroupId="com.practicang" \\
  -DaemVersion=cloud \\
  -DfrontendModule=angular \\
  -Dlanguage=es \\
  -Dcountry=mx`;

const frontendTree = `ui.frontend/
├── angular.json            ← configuraciones de build: aem-develop, production...
├── package.json            ← dependencias y scripts
├── proxy.conf.json         ← proxy de ng serve hacia AEM
├── karma.conf.js           ← pruebas en Chrome Headless (Puppeteer)
├── tslint.json             ← reglas de estilo que el build exige
├── clientlib.config.js     ← empaqueta el build como clientlib-angular
└── src/
    ├── index.html          ← declara cq:pagemodel_root_url (el modelo de la página)
    ├── main.ts             ← arranca AppModule
    ├── environments/environment.ts
    └── app/
        ├── app.module.ts                 ← módulo raíz: componentes y módulos de Core Components
        ├── app-routing.module.ts         ← rutas sincronizadas con las páginas de AEM
        └── components/
            ├── import-components.ts      ← MapTo / LazyMapTo
            ├── model-manager.service.ts  ← acceso al PageModelManager
            ├── page/  container/  responsive-grid/
            └── text/ (text.component.ts, .html, .css, .spec.ts)`;

const scripts = `"scripts": {
  "start": "ng serve --open --proxy-config ./proxy.conf.json",
  "build": "ng lint && ng build --configuration=aem-develop && clientlib",
  "build:production": "ng lint && ng build --prod && clientlib",
  "test": "ng test",
  "sync": "aemsync -d -w ../ui.apps/src/main/content"
}`;

const mappingReal = `import {LazyMapTo,MapTo} from '@adobe/aem-angular-editable-components';

MapTo('practicang/components/title')(TitleV2Component, {isEmpty: TitleV2IsEmptyFn});
MapTo('practicang/components/image')(ImageV2Component, {isEmpty: ImageV2IsEmptyFn});

const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: cqModel =>
        !cqModel || !cqModel.text || cqModel.text.trim().length < 1
};

const LazyTextModule = () => import('./text/text.component').then(
    Module => Module.TextComponent
);

LazyMapTo('practicang/components/text')(LazyTextModule, TextEditConfig);`;

const textComponent = `@Component({
  selector: 'app-text',
  styleUrls: ['./text.component.css'],
  templateUrl: './text.component.html'
})
export class TextComponent {
  @Input() richText: boolean;
  @Input() text: string;
  @Input() itemName: string;

  @HostBinding('innerHtml') get content() {
    return this.richText
      ? this.sanitizer.bypassSecurityTrustHtml(this.text)
      : this.text;
  }
  @HostBinding('attr.data-rte-editelement') editAttribute = true;

  constructor(private sanitizer: DomSanitizer) {}
}`;

const cardTs = `import { Component, Input } from '@angular/core';

export const ServiceCardEditConfig = {
  emptyLabel: 'Tarjeta de servicio',
  isEmpty: cqModel =>
    !cqModel || !cqModel.titulo || cqModel.titulo.trim().length < 1
};

@Component({
  selector: 'app-service-card',
  styleUrls: ['./service-card.component.css'],
  templateUrl: './service-card.component.html'
})
export class ServiceCardComponent {
  @Input() titulo: string;
  @Input() descripcion: string;
  @Input() imagen: string;
  @Input() enlaceUrl: string;
  @Input() destacado: boolean;

  get isEmpty(): boolean {
    return ServiceCardEditConfig.isEmpty(this);
  }
}`;

const cardHtml = `<div *ngIf="!isEmpty" class="cmp-servicecard" [class.cmp-servicecard--destacado]="destacado">
  <img *ngIf="imagen" class="cmp-servicecard__imagen" [src]="imagen" [alt]="titulo" loading="lazy">
  <h3 class="cmp-servicecard__titulo">{{ titulo }}</h3>
  <p *ngIf="descripcion" class="cmp-servicecard__descripcion">{{ descripcion }}</p>
  <a *ngIf="enlaceUrl" class="cmp-servicecard__enlace" [href]="enlaceUrl">Ver más</a>
</div>`;

const registration = `// src/app/components/import-components.ts
import {LazyMapTo,MapTo} from '@adobe/aem-angular-editable-components';
import {ServiceCardComponent, ServiceCardEditConfig} from './service-card/service-card.component';

MapTo('practicang/components/servicecard')(ServiceCardComponent, ServiceCardEditConfig);

// src/app/app.module.ts
import { ServiceCardComponent } from './components/service-card/service-card.component';

@NgModule({
  // ...
  declarations: [AppComponent, PageComponent, ServiceCardComponent],
  entryComponents: [PageComponent, ServiceCardComponent],
  // ...
})
export class AppModule {}`;

const cardSpec = `import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent, ServiceCardEditConfig } from './service-card.component';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('muestra título, descripción y enlace', () => {
    component.titulo = 'Consultoría AEM';
    component.descripcion = 'Te ayudamos a migrar';
    component.enlaceUrl = '/content/practicang/mx/es.html';
    component.destacado = true;
    fixture.detectChanges();

    expect(element.querySelector('.cmp-servicecard__titulo').textContent).toContain('Consultoría AEM');
    expect(element.querySelector('.cmp-servicecard__descripcion').textContent).toContain('Te ayudamos a migrar');
    expect(element.querySelector('.cmp-servicecard__enlace').getAttribute('href')).toBe('/content/practicang/mx/es.html');
    expect(element.querySelector('.cmp-servicecard').classList).toContain('cmp-servicecard--destacado');
  });

  it('no renderiza nada si no hay título', () => {
    fixture.detectChanges();

    expect(ServiceCardEditConfig.isEmpty({})).toBe(true);
    expect(element.querySelector('.cmp-servicecard')).toBeNull();
  });
});`;

const karmaOut = `[INFO] > ng test
[INFO] Karma v5.2.3 server started at http://localhost:9876/
[INFO] Chrome Headless 88.0.4298.0 (Windows 10): Executed 8 of 8 SUCCESS (0.148 secs / 0.103 secs)
[INFO] TOTAL: 8 SUCCESS
[INFO] > ng lint && ng build --configuration=aem-develop && clientlib
[INFO] Linting "angular-app"...
[INFO] All files pass linting.
...
[INFO] Running com.practicang.core.models.ServiceCardModelTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
...
[INFO] BUILD SUCCESS
[INFO] Total time:  10:31 min`;

const cmProfile = `<!-- pom.xml raíz: agregar dentro de <profiles> -->
<profile>
  <id>cloudManagerProductionBuild</id>
  <activation>
    <property>
      <name>env.CM_BUILD</name>
    </property>
  </activation>
  <properties>
    <build.environment>:production</build.environment>
  </properties>
</profile>`;

const cmTest = `# Simular en tu equipo el build de Cloud Manager
CM_BUILD=true mvn install -pl ui.frontend -DskipTests        # bash
$env:CM_BUILD="true"; mvn install -pl ui.frontend -DskipTests  # PowerShell

# Salida esperada (real)
[INFO] Running 'npm run build:production' in .../ui.frontend
[INFO] > ng lint && ng build --prod && clientlib`;

const proxyConf = `[
    {
        "auth": "admin:admin",
        "context": [
                    "/content/**/*.(jpg|jpeg|png|model.json)",
                    "/etc.clientlibs/**/*"
                ],
        "target": "http://localhost:4502"
    }
]`;

const ngServe = `cd ui.frontend
nvm install 12
nvm use 12          # la misma versión que usa el build de Maven (v12.22.7)
npm ci
npm start           # ng serve: abre http://localhost:4200`;

export default function Chapter14({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-14"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <Alert type="warning" title="Antes de empezar: el SPA Editor está deprecado">
        {'Igual que en el [[ch-13]]: el **SPA Editor** está deprecado desde AEM 6.5.23 y Cloud Service 2025.01. Este laboratorio sirve para **mantener proyectos Angular existentes**. Para proyectos nuevos, usa Universal Editor ([[ch-96]]) o una app headless ([[ch-95]]).'}
      </Alert>

      <SectionTitle>Objetivos del laboratorio</SectionTitle>
      <List items={[
        'Generar y compilar un proyecto Angular con el SPA Editor usando el archetype 57.',
        'Conocer qué cambia frente a la variante React: módulos, `MapTo` y `LazyMapTo`, lint obligatorio y pruebas con Karma.',
        'Crear el componente **Tarjeta de servicio** en Angular con su Sling Model Exporter y sus pruebas.',
        'Descubrir y corregir un problema real: Cloud Manager desplegaría el build **de desarrollo** sin optimizar.',
        'Trabajar en local con `ng serve` contra tu AEM.'
      ]} />
      <Alert type="info" title="Cómo se verificó este laboratorio">
        {'Generamos el proyecto con el archetype 57 (`frontendModule=angular`, Cloud Service), agregamos el componente y ejecutamos `mvn clean install`: BUILD SUCCESS en 10:31 min, con 2 pruebas Java, **8 pruebas de Karma** y `ng lint` sin errores. También probamos el perfil de producción para Cloud Manager descrito más abajo. El despliegue en AEM no se probó porque no había una instancia disponible.'}
      </Alert>

      <SectionTitle>React vs. Angular en AEM</SectionTitle>
      <Paragraph>{'La arquitectura es la misma del [[ch-13]]: AEM entrega el `.model.json` y la aplicación dibuja cada componente según su `:type`. Cambia el framework y sus herramientas:'}</Paragraph>
      <DataTable
        headers={['Aspecto', 'React (Tema 13)', 'Angular (este tema)']}
        rows={[
          ['Framework generado', 'React 16 + Create React App 4', '**Angular 9.1** + Angular CLI'],
          ['Librería de edición', '`aem-react-editable-components`', '`aem-angular-editable-components` 1.2.0'],
          ['Registro de componentes', '`MapTo`', '`MapTo` (declarando el componente en el módulo) o `LazyMapTo`'],
          ['Pruebas', 'Jest + Testing Library', '**Karma + Jasmine** en Chrome Headless (Puppeteer)'],
          ['Estilo de código', 'ESLint', '**TSLint + codelyzer**; `ng lint` se ejecuta en cada build'],
          ['Servidor local', '`npm start` (puerto 3000)', '`ng serve` (puerto 4200) con `proxy.conf.json`'],
          ['Ruta del modelo en local', 'Error del archetype (`us/en`)', 'Correcta (`cq:pagemodel_root_url` en `index.html`)'],
          ['Node en el build de Maven', 'v12.22.7', 'v12.22.7']
        ]}
      />

      <SectionTitle>Paso 1 · Generar el proyecto</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={generate} />
      <CodeBlock filename="ui.frontend (real)" language="text" code={frontendTree} />
      <CodeBlock filename="ui.frontend/package.json (scripts, real)" language="json" code={scripts} />
      <List items={[
        '`start`: `ng serve` levanta la app en local con el proxy hacia AEM.',
        '`build`: primero **`ng lint`** (si hay errores de estilo, el build de Maven falla), luego compila con la configuración `aem-develop` (sin optimizar) y genera la clientlib.',
        '`build:production`: igual pero con `ng build --prod` (minificado y optimizado).',
        '`test`: ejecuta Karma; Maven lo corre antes del build con `CI=true`.',
        '`sync`: usa **aemsync**; evítalo y usa VSCode AEM Sync ([[ch-3]]).',
        'Las dependencias usan **Angular 9.1** y TypeScript 3.8, versiones que llevan años sin soporte; npm reportó 19 vulnerabilidades en nuestro build.'
      ]} />

      <SectionTitle>Paso 2 · Recorrer el código Angular</SectionTitle>
      <Paragraph>{'**`app.module.ts`** es el módulo raíz. Importa `SpaAngularEditableComponentsModule` (la integración con el editor de AEM), el módulo de rutas y un módulo por cada Core Component en Angular (Title, Image, Button, Tabs...). En `declarations` y `entryComponents` están los componentes propios de la app.'}</Paragraph>
      <Paragraph>{'**`import-components.ts`** registra los componentes (fragmento real):'}</Paragraph>
      <CodeBlock filename="src/app/components/import-components.ts (fragmento)" language="typescript" code={mappingReal} />
      <List items={[
        '`MapTo(tipo)(Componente, config)` asocia un tipo de recurso de AEM a un componente Angular, igual que en React.',
        '`LazyMapTo` carga el componente **bajo demanda** con `import()`: reduce el JavaScript inicial. El texto se carga así.',
        'El `EditConfig` define el marcador (`emptyLabel`) y cuándo el componente está vacío (`isEmpty`), que recibe el modelo del componente (`cqModel`).'
      ]} />
      <CodeBlock filename="src/app/components/text/text.component.ts (real)" language="typescript" code={textComponent} />
      <List items={[
        'Cada `@Input()` recibe una propiedad del JSON con el mismo nombre (`text`, `richText`).',
        '`@HostBinding(\'innerHtml\')` escribe el contenido directamente en el elemento del componente, sin plantilla.',
        '`bypassSecurityTrustHtml` desactiva la limpieza de HTML de Angular para el texto enriquecido que escribe el autor: úsalo solo con contenido de confianza.',
        '`data-rte-editelement` le indica al editor de AEM dónde permitir la edición en línea del texto.'
      ]} />

      <SectionTitle>Paso 3 · Tu componente en Angular: Tarjeta de servicio</SectionTitle>
      <Paragraph>{'La **definición** (`.content.xml`, grupo `Sitio Angular - Content`), el **diálogo** y el **Sling Model Exporter** son los del [[ch-13]] cambiando `practicareact` por `practicang` en el paquete Java y en el tipo de recurso. El backend no sabe si el frontend es React o Angular: solo entrega JSON. Sus 2 pruebas Java pasaron igual.'}</Paragraph>
      <CodeBlock filename="src/app/components/service-card/service-card.component.ts" language="typescript" code={cardTs} />
      <List items={[
        '`ServiceCardEditConfig` se exporta para registrarlo y probarlo; aplica la misma regla que el Java (sin título, vacía).',
        '`selector: \'app-service-card\'` sigue la convención de prefijo `app` que exige TSLint (si usas otro prefijo, el build falla).',
        'Cada `@Input()` corresponde a una propiedad del JSON del exporter.',
        'El getter `isEmpty` reutiliza la misma función, pasando el propio componente como modelo.'
      ]} />
      <CodeBlock filename="service-card.component.html" language="html" code={cardHtml} />
      <List items={[
        '`*ngIf="!isEmpty"` solo dibuja la tarjeta si hay título; si no, el editor de AEM muestra el marcador.',
        '`[class.cmp-servicecard--destacado]="destacado"` agrega la clase del modificador cuando `destacado` es verdadero.',
        '`[src]`, `[alt]` y `[href]` son *property bindings*: Angular escapa los valores automáticamente.',
        '`{{ titulo }}` es interpolación de texto, también escapada.'
      ]} />
      <CodeBlock filename="registro: import-components.ts y app.module.ts" language="typescript" code={registration} />
      <Alert type="warning" title="¿MapTo o LazyMapTo?">
        {'El componente `Text` se registra con `LazyMapTo` sin declararse en ningún módulo porque su plantilla no usa directivas. La tarjeta usa `*ngIf`, y en Angular una plantilla solo puede usar directivas si el componente está **declarado en un módulo**. Por eso la registramos con `MapTo` y la agregamos a `declarations` y `entryComponents` de `AppModule` (en Angular 9, `entryComponents` es necesario para los componentes que se crean de forma dinámica, como hace el SPA Editor).'}
      </Alert>
      <CodeBlock filename="service-card.component.spec.ts (pruebas reales)" language="typescript" code={cardSpec} />
      <List items={[
        '`TestBed.configureTestingModule` crea un módulo de pruebas que declara el componente.',
        '`fixture.detectChanges()` ejecuta el ciclo de detección de cambios: sin él, la plantilla no refleja los inputs.',
        'Las aserciones buscan elementos por sus clases BEM y revisan texto, atributos y la clase del modificador.'
      ]} />
      <CodeBlock filename="salida real de mvn clean install" language="text" code={karmaOut} />

      <SectionTitle>Paso 4 · Un problema real: el build que llegaría a producción</SectionTitle>
      <Paragraph>{'Revisando el POM generado descubrimos algo importante: el valor `build.environment=:production` (que hace ejecutar `build:production`) solo se define dentro del perfil `autoInstallPackagePublish`. Cloud Manager **no** activa ese perfil, así que con el proyecto tal como se genera, **el pipeline construiría la versión de desarrollo sin optimizar** y esa llegaría a producción.'}</Paragraph>
      <DataTable
        caption="Tamaño del JavaScript medido en nuestro build"
        headers={['Build', 'Configuración', 'Tamaño']}
        rows={[
          ['Desarrollo (lo que se construye por defecto)', '`aem-develop`, sin optimizar', 'Solo el archivo `vendor`: 4.39 MB (ES2015) + 5.23 MB (ES5)'],
          ['Producción', '`ng build --prod`', '**~991 KB** en total, sumando las versiones ES2015 y ES5']
        ]}
      />
      <Paragraph>{'La solución es un perfil que se active **solo en Cloud Manager**. Adobe documenta que Cloud Manager define siempre la variable de entorno `CM_BUILD` en sus builds, y muestra este mismo patrón de activación:'}</Paragraph>
      <CodeBlock filename="pom.xml raíz (probado)" language="xml" code={cmProfile} />
      <CodeBlock filename="terminal" language="bash" code={cmTest} />
      <List items={[
        '`<activation><property><name>env.CM_BUILD</name>` activa el perfil cuando existe la variable de entorno `CM_BUILD`.',
        'El perfil fija `build.environment` en `:production`, así que `ui.frontend` ejecuta `npm run build:production`.',
        'En tu equipo el build sigue siendo el de desarrollo (más rápido y con source maps), salvo que definas `CM_BUILD` para simularlo.',
        'Lo probamos definiendo `CM_BUILD=true`: Maven ejecutó `ng build --prod` y el build terminó bien.'
      ]} />

      <SectionTitle>Paso 5 · Desplegar y probar</SectionTitle>
      <List items={[
        'Despliega con `mvn clean install -PautoInstallSinglePackage` (y la variante Publish).',
        'Abre `/content/practicang/mx/es/home.html` en el editor, arrastra **Tarjeta de servicio** desde el grupo *Sitio Angular - Content*, llena el diálogo y observa cómo aparece.',
        'Revisa `/content/practicang/mx/es/home.model.json`: el componente aparece con `:type` igual a `practicang/components/servicecard`.'
      ]} />

      <SectionTitle>Paso 6 · Desarrollo local con ng serve</SectionTitle>
      <CodeBlock filename="ui.frontend/proxy.conf.json (real)" language="json" code={proxyConf} />
      <List items={[
        '`target`: todas las peticiones que coinciden con `context` se reenvían a tu Author local.',
        '`context`: se reenvían las imágenes, los `.model.json` de `/content` y las clientlibs de `/etc.clientlibs`.',
        '`auth`: credenciales para AEM. Solo `admin:admin` de tu instancia local.',
        'El modelo inicial se toma de la meta `cq:pagemodel_root_url` de `src/index.html`, que el archetype genera correctamente con tu país e idioma.'
      ]} />
      <CodeBlock filename="terminal" language="bash" code={ngServe} />
      <List items={[
        'Angular 9 es anterior a las versiones modernas de Node; usa la misma versión que el build de Maven (Node 12) para evitar errores de compatibilidad.',
        '`npm ci` instala exactamente lo que dice `package-lock.json`.',
        '`ng serve` abre `http://localhost:4200` y recompila en cada cambio.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['El build falla en `ng lint`', 'El código no cumple TSLint (prefijo del selector, comillas, espacios)', 'Leer el mensaje del lint y corregir; puedes ejecutar `npx ng lint` en `ui.frontend`'],
          ['Error de plantilla: no se reconoce `ngIf`', 'El componente no está declarado en un módulo', 'Declararlo en `AppModule` y usar `MapTo`'],
          ['El componente no se crea en el editor', 'Falta en `entryComponents`', 'Agregarlo a `entryComponents`'],
          ['Karma no arranca', 'No se pudo descargar Chromium con Puppeteer (red o proxy)', 'Revisar la red o configurar el proxy de npm'],
          ['El sitio en Cloud es lento y pesado', 'Se desplegó el build de desarrollo', 'Agregar el perfil `env.CM_BUILD` del paso 4']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Agrega a la tarjeta el campo **etiqueta** de extremo a extremo: diálogo, exporter, `@Input()`, plantilla y prueba de Karma.',
        '**2.** Ejecuta `mvn clean install` y confirma que Karma reporta 9 de 9 pruebas.',
        '**3.** Agrega el perfil de Cloud Manager y simúlalo con `CM_BUILD=true`: confirma en la salida que se ejecuta `build:production`.'
      ]} />
      <Alert type="tip" title="Solución">
        {'Diálogo: `textfield` con `name="./etiqueta"`. Java: `@ValueMapValue private String etiqueta;` y `getEtiqueta()`. Angular: `@Input() etiqueta: string;` y en la plantilla `<span *ngIf="etiqueta" class="cmp-servicecard__etiqueta">{{ etiqueta }}</span>`. Prueba: asigna `component.etiqueta = \'Nuevo\'`, llama `fixture.detectChanges()` y verifica el texto de `.cmp-servicecard__etiqueta`.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'La variante Angular comparte la arquitectura del SPA Editor con React; cambian framework, pruebas y herramientas.',
        'En Angular un componente con directivas se declara en el módulo y se registra con `MapTo`; `LazyMapTo` sirve para carga diferida.',
        'El build ejecuta `ng lint` y Karma: un error de estilo o una prueba fallida detienen el despliegue.',
        'El proyecto generado construye la versión de desarrollo en Cloud Manager; un perfil activado con `env.CM_BUILD` lo corrige.',
        'El backend (exporter y diálogo) es el mismo para React y Angular.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['NgModule', 'Módulo de Angular que declara componentes y sus dependencias'],
          ['entryComponents', 'Componentes que Angular 9 crea de forma dinámica'],
          ['LazyMapTo', 'Registro de un componente que se carga bajo demanda'],
          ['Karma', 'Ejecutor de pruebas de Angular en un navegador real'],
          ['TSLint', 'Revisor de estilo de TypeScript que el build exige'],
          ['`CM_BUILD`', 'Variable de entorno que Cloud Manager define en sus builds']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'Deprecación del SPA Editor (Cloud Service)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/hybrid/spa-editor-deprecation' },
        { type: 'image', title: 'Entorno de build de Cloud Manager (variables como CM_BUILD)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/create-application-project/build-environment-details' },
        { type: 'image', title: 'AEM Project Archetype 57 (variantes SPA)', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype/tree/aem-project-archetype-57' },
        { type: 'image', title: 'AEM Angular Editable Components', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-angular-editable-components' }
      ]} />
    </LessonPage>
  );
}
