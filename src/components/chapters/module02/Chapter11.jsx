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

const generate = `# macOS / Linux / Git Bash (en PowerShell pon cada -D... entre comillas dobles)
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem \\
  -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=58 \\
  -DappTitle="Sitio de Practica" \\
  -DappId="practica" \\
  -DgroupId="com.practica" \\
  -DaemVersion=6.5.22 \\
  -Dlanguage=es \\
  -Dcountry=mx

cd practica
git init
git add .
git commit -m "chore: generate project from AEM archetype 58"`;

const uberJar = `<!-- pom.xml raíz del proyecto 6.5 (real) -->
<dependency>
    <groupId>com.adobe.aem</groupId>
    <artifactId>uber-jar</artifactId>
    <version>6.5.22</version>
    <scope>provided</scope>
</dependency>`;

const allTree = `jcr_root/apps/practica-packages/application/install/
    practica.core-1.0.0-SNAPSHOT.jar
    practica.ui.apps-1.0.0-SNAPSHOT.zip
    practica.ui.config-1.0.0-SNAPSHOT.zip
jcr_root/apps/practica-packages/content/install/
    practica.ui.content-1.0.0-SNAPSHOT.zip
jcr_root/apps/practica-vendor-packages/application/install/
    core.wcm.components.core-2.28.0.jar
    core.wcm.components.content-2.28.0.zip
    core.wcm.components.config-2.28.0.zip`;

const deploy = `# Compilar, probar y desplegar TODO en Author (localhost:4502)
mvn clean install -PautoInstallSinglePackage

# Desplegar TODO también en Publish (localhost:4503)
mvn clean install -PautoInstallSinglePackagePublish`;

const reactor = `[INFO] Reactor Summary:
[INFO] Sitio de Practica 1.0.0-SNAPSHOT ................... SUCCESS [  4.432 s]
[INFO] Sitio de Practica - Core 1.0.0-SNAPSHOT ............ SUCCESS [ 25.453 s]
[INFO] Sitio de Practica - UI Frontend 1.0.0-SNAPSHOT ..... SUCCESS [02:15 min]
[INFO] Sitio de Practica - Repository Structure Package ... SUCCESS [  2.592 s]
[INFO] Sitio de Practica - UI apps 1.0.0-SNAPSHOT ......... SUCCESS [ 11.155 s]
[INFO] Sitio de Practica - UI content 1.0.0-SNAPSHOT ...... SUCCESS [  4.169 s]
[INFO] Sitio de Practica - UI config 1.0.0-SNAPSHOT ....... SUCCESS [  0.809 s]
[INFO] Sitio de Practica - All 1.0.0-SNAPSHOT ............. SUCCESS [  0.595 s]
[INFO] Sitio de Practica - Integration Tests .............. SUCCESS [01:44 min]
[INFO] com.adobe.cq.cloud.testing.ui.cypress - UI Tests ... SUCCESS [02:45 min]
[INFO] BUILD SUCCESS
[INFO] Total time:  07:38 min`;

const componentFiles = `ui.apps/src/main/content/jcr_root/apps/practica/components/servicecard/
├── .content.xml             ← 1. definición del componente
├── _cq_dialog/.content.xml  ← 2. diálogo
└── servicecard.html         ← 3. HTL
core/src/main/java/com/practica/core/models/ServiceCardModel.java      ← 4. Sling Model
core/src/test/java/com/practica/core/models/ServiceCardModelTest.java  ← 5. prueba unitaria
ui.frontend/src/main/webpack/components/_servicecard.scss              ← 6. estilos`;

const compXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Tarjeta de servicio"
    jcr:description="Muestra un servicio con imagen, descripción y enlace"
    componentGroup="Sitio de Practica - Content"/>`;

const dialogXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Tarjeta de servicio"
    sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/fixedcolumns">
        <items jcr:primaryType="nt:unstructured">
            <column
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/container">
                <items jcr:primaryType="nt:unstructured">
                    <titulo
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                        fieldLabel="Título"
                        name="./titulo"
                        required="{Boolean}true"/>
                    <descripcion
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textarea"
                        fieldLabel="Descripción"
                        name="./descripcion"/>
                    <imagen
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/pathfield"
                        fieldLabel="Imagen"
                        name="./imagen"
                        rootPath="/content/dam"/>
                    <enlace
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/pathfield"
                        fieldLabel="Página de destino"
                        name="./enlace"
                        rootPath="/content"/>
                    <destacado
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/checkbox"
                        name="./destacado"
                        text="Mostrar como destacado"
                        value="true"
                        uncheckedValue="false"/>
                </items>
            </column>
        </items>
    </content>
</jcr:root>`;

const modelJava = `package com.practica.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ServiceCardModel {

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

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public String getEnlaceUrl() {
        return enlaceUrl;
    }

    public boolean isDestacado() {
        return destacado;
    }

    public boolean isEmpty() {
        return titulo == null || titulo.trim().isEmpty();
    }
}`;

const htl = `<div data-sly-use.card="com.practica.core.models.ServiceCardModel"
     data-sly-use.template="core/wcm/components/commons/v1/templates.html"
     data-sly-test.hasContent="\${!card.empty}"
     class="cmp-servicecard \${card.destacado ? 'cmp-servicecard--destacado' : ''}">
    <img data-sly-test="\${card.imagen}"
         class="cmp-servicecard__imagen"
         src="\${card.imagen}"
         alt="\${card.titulo}"
         loading="lazy"/>
    <h3 class="cmp-servicecard__titulo">\${card.titulo}</h3>
    <p data-sly-test="\${card.descripcion}" class="cmp-servicecard__descripcion">\${card.descripcion}</p>
    <a data-sly-test="\${card.enlaceUrl}" class="cmp-servicecard__enlace" href="\${card.enlaceUrl}">Ver más</a>
</div>
<sly data-sly-call="\${template.placeholder @ isEmpty=!hasContent, classAppend='cmp-servicecard'}"></sly>`;

const testJava = `package com.practica.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.practica.core.testcontext.AppAemContext;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ServiceCardModelTest {

    private final AemContext context = AppAemContext.newAemContext();

    @Test
    void leeLasPropiedadesDelDialogo() {
        Resource resource = context.create().resource("/content/prueba/card",
                "titulo", "Consultoría AEM",
                "descripcion", "Te ayudamos a migrar a la nube",
                "enlace", "/content/practica/mx/es",
                "destacado", true);

        ServiceCardModel card = resource.adaptTo(ServiceCardModel.class);

        assertNotNull(card);
        assertEquals("Consultoría AEM", card.getTitulo());
        assertEquals("Te ayudamos a migrar a la nube", card.getDescripcion());
        assertEquals("/content/practica/mx/es.html", card.getEnlaceUrl());
        assertTrue(card.isDestacado());
        assertFalse(card.isEmpty());
    }

    @Test
    void estaVacioSiNoHayTitulo() {
        Resource resource = context.create().resource("/content/prueba/vacia");

        ServiceCardModel card = resource.adaptTo(ServiceCardModel.class);

        assertNotNull(card);
        assertTrue(card.isEmpty());
        assertNull(card.getEnlaceUrl());
        assertFalse(card.isDestacado());
    }

    @Test
    void conservaEnlacesExternos() {
        Resource resource = context.create().resource("/content/prueba/externa",
                "titulo", "Soporte",
                "enlace", "https://www.adobe.com");

        ServiceCardModel card = resource.adaptTo(ServiceCardModel.class);

        assertNotNull(card);
        assertEquals("https://www.adobe.com", card.getEnlaceUrl());
    }
}`;

const testOutput = `[INFO] Running com.practica.core.models.HelloWorldModelTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.934 s
[INFO] Running com.practica.core.models.ServiceCardModelTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.309 s
...
[INFO] Results:
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`;

const scss = `.cmp-servicecard {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #d0d7de;
  border-radius: 12px;
  background: #ffffff;

  &--destacado {
    border-color: #2563eb;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
  }

  &__imagen {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
  }

  &__titulo {
    margin: 0;
    font-size: 1.25rem;
  }

  &__descripcion {
    margin: 0;
    color: #57606a;
  }

  &__enlace {
    align-self: flex-start;
    font-weight: 600;
  }
}`;

const fastDeploy = `# Solo el código Java (bundle core): el más rápido
mvn clean install -pl core -PautoInstallBundle

# Solo HTL, diálogos y estilos (ui.frontend genera las clientlibs que empaqueta ui.apps)
mvn clean install -pl ui.frontend,ui.apps -PautoInstallPackage

# Ejecutar solo las pruebas de core
mvn test -pl core`;

const ltsDeps = `<!-- AEM 6.5 LTS SP3: reemplaza la dependencia uber-jar del POM raíz -->
<dependency>
    <groupId>com.adobe.aem</groupId>
    <artifactId>uber-jar</artifactId>
    <version>6.6.3</version>
    <classifier>apis</classifier>
    <scope>provided</scope>
</dependency>

<!-- Solo si tu código usa APIs deprecadas -->
<dependency>
    <groupId>com.adobe.aem</groupId>
    <artifactId>uber-jar</artifactId>
    <version>6.6.3</version>
    <classifier>deprecated-apis</classifier>
    <scope>provided</scope>
</dependency>`;

export default function Chapter11({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-11"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del laboratorio</SectionTitle>
      <List items={[
        'Crear de principio a fin un proyecto para **AEM 6.5** con el archetype, eligiendo la versión correcta para tu instancia.',
        'Entender qué cambia en un proyecto 6.5 frente a uno de Cloud Service.',
        'Compilar, probar y desplegar en Author y Publish, y verificar el resultado.',
        'Construir tu **primer componente propio** completo: definición, diálogo, HTL, Sling Model, prueba unitaria y estilos.',
        'Iterar rápido desplegando solo lo que cambiaste, y adaptar el proyecto a **AEM 6.5 LTS**.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas AEM 6.5 (o 6.5 LTS) instalado con Author en 4502 y Publish en 4503 ([[ch-4]]), el JDK adecuado ([[ch-3]]) y haber leído cómo se genera ([[ch-8]]) y se organiza un proyecto ([[ch-9]], [[ch-10]]). Todo el código de este laboratorio **se compiló y sus pruebas pasaron** en un proyecto generado con el archetype 58 para 6.5.22.'}
      </Alert>

      <SectionTitle>Paso 1 · Averiguar la versión exacta de tu AEM</SectionTitle>
      <List items={[
        'Abre `http://localhost:4502/system/console/productinfo` ([[ch-7]]). Verás algo como **Adobe Experience Manager 6.5.22.0**: esa es la versión con su Service Pack.',
        'Para el archetype usa los tres primeros números: `aemVersion=6.5.22`. El archetype 58 soporta AEM 6.5.17 o superior.',
        'Comprueba también tu Java con `java -version`: Java 11 para 6.5 clásico; Java 17 o 21 para 6.5 LTS. El Service Pack manda sobre la versión de Java, no al revés ([[ch-129]]).',
        'Si tu instancia es **6.5 LTS**, sigue igual y al final aplica los ajustes de la sección dedicada a LTS.'
      ]} />

      <SectionTitle>Paso 2 · Generar el proyecto</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={generate} />
      <List items={[
        '`-DaemVersion=6.5.22` hace que el proyecto use las APIs y la estructura de 6.5 en lugar de las de Cloud.',
        'No indicamos `frontendModule`: su valor por defecto es `general`.',
        'Las tres últimas líneas crean un repositorio Git y guardan la versión generada **antes** de tocar nada, para que siempre puedas ver qué cambiaste respecto a la plantilla.'
      ]} />

      <SectionTitle>Paso 3 · Qué cambia frente a un proyecto de Cloud</SectionTitle>
      <DataTable
        headers={['Aspecto', 'Proyecto 6.5', 'Proyecto Cloud (Tema 9)']}
        rows={[
          ['API de AEM', '`uber-jar` 6.5.22 (`provided`)', '`aem-sdk-api`'],
          ['Core Components', 'Se **incrustan** en el paquete `all`, porque 6.5 no los trae de fábrica', 'Vienen con el producto'],
          ['`.cloudmanager/java-version`', 'No existe', 'Existe (`21`)'],
          ['Dispatcher', 'Variante AMS/on-premise', 'Variante Cloud (Dispatcher SDK)'],
          ['Módulos, `ui.apps`, `ui.content`, `ui.config`', 'Iguales', 'Iguales']
        ]}
      />
      <CodeBlock filename="pom.xml raíz (fragmento real del proyecto 6.5)" language="xml" code={uberJar} />
      <Paragraph>{'El `uber-jar` es un único artefacto con todas las APIs de AEM 6.5 para compilar; su versión debe coincidir con tu Service Pack. Y así queda por dentro el paquete `all` de un proyecto 6.5 (salida real de `jar -tf`):'}</Paragraph>
      <CodeBlock filename="contenido de all/target/practica.all-1.0.0-SNAPSHOT.zip" language="text" code={allTree} />
      <List items={[
        '`practica-packages` contiene tu código y tu contenido, como en Cloud.',
        '`practica-vendor-packages` contiene los **Core Components 2.28.0** (bundle, contenido y configuración) de Adobe. Por eso tus componentes proxy funcionan en 6.5 sin instalar nada más.'
      ]} />

      <SectionTitle>Paso 4 · Compilar y desplegar</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={deploy} />
      <CodeBlock filename="salida real del build completo (resumida)" language="text" code={reactor} />
      <List items={[
        'La primera vez tarda varios minutos: descarga dependencias, una copia de Node.js para `ui.frontend` y lo necesario para las pruebas. En nuestro equipo tardó 7:38 min; las siguientes compilaciones son mucho más rápidas.',
        'Con el perfil, al terminar el build Maven sube `practica.all` a Package Manager e instala.',
        '**Despliega también en Publish**: el código tiene que existir en ambas instancias, o las páginas publicadas no sabrán renderizar tus componentes.'
      ]} />
      <Paragraph>{'**Verifica el despliegue** con lo aprendido en el Módulo 1:'}</Paragraph>
      <List items={[
        '**Package Manager** (`Shift` + `P` con la AEM Chrome Extension): `practica.all` y, dentro, los paquetes del proyecto y de Core Components instalados.',
        '**Web Console** (`/system/console/bundles`): `practica.core` y `core.wcm.components.core` en estado **Active**.',
        '**Sites**: el sitio **Sitio de Practica** con su página en `/content/practica/mx/es`.'
      ]} />

      <SectionTitle>Paso 5 · Tu primer componente: Tarjeta de servicio</SectionTitle>
      <Paragraph>{'Vas a crear un componente que muestra un servicio con título, descripción, imagen, enlace y una opción para destacarlo. Tocarás todas las capas del [[ch-2]]:'}</Paragraph>
      <FlowDiagram
        caption="El recorrido de los datos en un componente AEM"
        steps={[
          { title: 'Diálogo', detail: 'El autor llena el formulario', tone: 'purple' },
          { title: 'JCR', detail: 'Se guardan propiedades en el nodo', tone: 'primary' },
          { title: 'Sling Model', detail: 'Java lee y prepara los datos', tone: 'cyan' },
          { title: 'HTL', detail: 'Genera el HTML', tone: 'success' },
          { title: 'Clientlib', detail: 'CSS/JS le dan estilo', tone: 'warning' }
        ]}
      />
      <CodeBlock filename="los 6 archivos del componente" language="text" code={componentFiles} />

      <Paragraph>{'**Archivo 1 · Definición del componente.**'}</Paragraph>
      <CodeBlock filename="servicecard/.content.xml" language="xml" code={compXml} />
      <List items={[
        '`cq:Component` declara que el nodo es un componente. El nombre de la carpeta (`servicecard`) forma su ruta: `practica/components/servicecard`, que será el `sling:resourceType` de cada tarjeta que se agregue a una página.',
        '`jcr:title` y `jcr:description` son lo que el autor ve en la lista de componentes.',
        '`componentGroup="Sitio de Practica - Content"`: la política del contenedor de la plantilla del proyecto permite `group:Sitio de Practica - Content`, así que **cualquier componente de ese grupo aparece automáticamente** en el editor, sin tocar la plantilla.'
      ]} />

      <Paragraph>{'**Archivo 2 · El diálogo.**'}</Paragraph>
      <CodeBlock filename="servicecard/_cq_dialog/.content.xml" language="xml" code={dialogXml} />
      <List items={[
        'La estructura exterior (`content` → `items` → `column` → `items`) es la misma del Hello World ([[ch-10]]): una columna con campos.',
        '`name="./titulo"` guarda el valor en la propiedad `titulo` del nodo del componente. El nombre de la propiedad es el que leerá el Sling Model.',
        '`required="{Boolean}true"` obliga al autor a llenar el título: el diálogo no se cierra sin él.',
        '`textarea` es un campo de varias líneas para la descripción.',
        '`pathfield` es un selector de rutas con navegador; `rootPath` limita desde dónde se puede elegir: `/content/dam` para imágenes, `/content` para páginas.',
        '`checkbox` guarda `value` ("true") si está marcado y `uncheckedValue` ("false") si no. Aunque se guarda como texto, el Sling Model lo convierte a `boolean`.',
        'Todos los campos de Granite UI se estudian en [[ch-21]].'
      ]} />

      <Paragraph>{'**Archivo 3 · El Sling Model** (en `core`).'}</Paragraph>
      <CodeBlock filename="core/.../models/ServiceCardModel.java" language="java" code={modelJava} />
      <List items={[
        '`@Model(adaptables = Resource.class)` declara la clase como Sling Model que se construye a partir del **recurso** (el nodo del componente).',
        '`defaultInjectionStrategy = OPTIONAL` permite que falten propiedades: si el autor no llenó la descripción, el campo queda en `null` en lugar de fallar el modelo entero.',
        '`@ValueMapValue` inyecta la propiedad **con el mismo nombre que el campo Java** (`titulo`, `descripcion`...). Por eso el `name` del diálogo y el nombre del campo coinciden.',
        '`private boolean destacado` recibe el "true"/"false" del checkbox ya convertido a booleano.',
        '`@SlingObject ResourceResolver` inyecta el objeto que resuelve rutas del repositorio.',
        '`@PostConstruct init()` se ejecuta después de inyectar todo: si el enlace es una página interna (`/content/...`), `resourceResolver.map()` aplica los mapeos de URL del sitio y se añade `.html`; si es externo (`https://...`), se deja igual.',
        '`isEmpty()` indica si falta el título; el HTL lo usa para mostrar un marcador al autor.',
        'La clase está en `com.practica.core.models`, un paquete que el bundle ya exporta (tiene `package-info.java` con `@Version`, [[ch-9]]). Todo el detalle de Sling Models está en [[ch-45]].'
      ]} />

      <Paragraph>{'**Archivo 4 · El HTL.**'}</Paragraph>
      <CodeBlock filename="servicecard/servicecard.html" language="html" code={htl} />
      <List items={[
        '`data-sly-use.card="com.practica.core.models.ServiceCardModel"` crea el Sling Model y lo deja disponible con el nombre `card`.',
        '`data-sly-use.template` carga las plantillas comunes de los Core Components, que incluyen un **marcador (placeholder)** para componentes vacíos.',
        '`data-sly-test.hasContent="${!card.empty}"` muestra el `div` solo si hay título y guarda el resultado en la variable `hasContent`.',
        '`${card.destacado ? \'cmp-servicecard--destacado\' : \'\'}` agrega la clase de destacado solo cuando corresponde.',
        'Cada elemento opcional (`img`, `p`, `a`) tiene su `data-sly-test`: si el dato no existe, el elemento no se genera.',
        '`${card.titulo}` llama a `getTitulo()`; HTL escapa el texto automáticamente para evitar inyección de código.',
        '`loading="lazy"` y `alt` son buenas prácticas de rendimiento y accesibilidad.',
        'La última línea muestra el marcador "arrastra o configura el componente" al autor cuando la tarjeta está vacía. HTL se estudia en [[ch-17]].'
      ]} />

      <Paragraph>{'**Archivo 5 · La prueba unitaria** (en `core/src/test`).'}</Paragraph>
      <CodeBlock filename="core/.../models/ServiceCardModelTest.java" language="java" code={testJava} />
      <List items={[
        '`@ExtendWith(AemContextExtension.class)` activa **AEM Mocks**: un AEM simulado en memoria, sin instancia real.',
        '`AppAemContext.newAemContext()` crea ese contexto con la configuración del proyecto (incluye el plugin de Core Components).',
        '`context.create().resource(ruta, "clave", valor, ...)` crea un nodo falso con las propiedades que habría guardado el diálogo.',
        '`resource.adaptTo(ServiceCardModel.class)` construye el modelo exactamente como lo hará AEM.',
        'Las tres pruebas cubren el caso completo, el componente vacío y un enlace externo. Las pruebas se estudian a fondo en [[ch-123]].'
      ]} />
      <CodeBlock filename="salida real de mvn test -pl core" language="text" code={testOutput} />

      <Paragraph>{'**Archivo 6 · Los estilos.**'}</Paragraph>
      <CodeBlock filename="ui.frontend/src/main/webpack/components/_servicecard.scss" language="scss" code={scss} />
      <List items={[
        'Las clases siguen la convención **BEM** de los Core Components: bloque `cmp-servicecard`, elementos `__titulo`, `__imagen`, y modificador `--destacado`.',
        '`&__titulo` es sintaxis SCSS: equivale a `.cmp-servicecard__titulo`.',
        'No hace falta importarlo en ningún lado: `site/main.scss` del proyecto importa todos los archivos de `components/` automáticamente. Al compilar, el CSS termina en la clientlib `clientlib-site` ([[ch-24]], [[ch-26]]).'
      ]} />

      <SectionTitle>Paso 6 · Desplegar e iterar rápido</SectionTitle>
      <Paragraph>{'La primera vez despliega todo con `mvn clean install -PautoInstallSinglePackage` (y en Publish). Después, despliega solo lo que cambiaste:'}</Paragraph>
      <CodeBlock filename="terminal" language="bash" code={fastDeploy} />
      <List items={[
        '`-pl` (project list) construye solo los módulos indicados.',
        '`-PautoInstallBundle` instala solo el bundle en la consola OSGi; ideal para cambios en Java.',
        '`-PautoInstallPackage` instala el paquete del módulo; para HTL, diálogos y estilos hay que incluir `ui.frontend` porque genera las clientlibs que `ui.apps` empaqueta.',
        'Para cambios pequeños de HTL o XML, lo más rápido es exportar el archivo con **VSCode AEM Sync** (clic derecho → exportar a AEM) y recargar la página ([[ch-3]]). El flujo completo se arma en [[ch-15]].'
      ]} />

      <SectionTitle>Paso 7 · Probarlo como autor</SectionTitle>
      <List items={[
        '**1.** Abre la página `/content/practica/mx/es` en el editor y busca en el panel de componentes **Tarjeta de servicio** (grupo *Sitio de Practica - Content*).',
        '**2.** Arrástrala a la página. Como está vacía, verás el **marcador** del componente.',
        '**3.** Abre su diálogo (llave inglesa), intenta cerrar sin título (no te dejará), llena todos los campos, elige una imagen del DAM y una página de destino, y marca **Destacado**.',
        '**4.** La tarjeta aparece con el borde azul del modificador destacado. Cambia a **Preview** para verla como el visitante.',
        '**5.** Revisa lo guardado en el repositorio: con la AEM Chrome Extension pulsa `c`, o abre `jcr:content.tidy.4.json` de la página ([[ch-5]]). Busca el nodo con `sling:resourceType = practica/components/servicecard` y sus propiedades `titulo`, `imagen`, `enlace` y `destacado`.',
        '**6.** Publica la página (y la imagen) y ábrela en `http://localhost:4503/content/practica/mx/es.html`.'
      ]} />

      <SectionTitle>Si tu instancia es AEM 6.5 LTS</SectionTitle>
      <Paragraph>{'AEM 6.5 LTS cambió cómo se publica la API para compilar: el `uber-jar` pasa a la línea **6.6.x** y se separa en APIs públicas y deprecadas. Para 6.5 LTS SP3 (publicado el 20-ago-2026), las release notes oficiales indican:'}</Paragraph>
      <CodeBlock filename="pom.xml raíz · dependencias para 6.5 LTS SP3" language="xml" code={ltsDeps} />
      <List items={[
        'Reemplaza la dependencia `uber-jar` 6.5.x del POM raíz por la de arriba, con la versión que indiquen las release notes de **tu** Service Pack LTS.',
        '`classifier apis` trae solo las APIs públicas; agrega `deprecated-apis` únicamente si el compilador se queja de clases deprecadas que todavía usas (y planifica quitarlas).',
        'Compila con Java 17 o 21, que son los que soporta 6.5 LTS.',
        'Ejecuta `mvn clean install` y corrige lo que falle antes de desplegar.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['La tarjeta no aparece en la lista de componentes', '`componentGroup` distinto al permitido por la política, o el paquete no se instaló', 'Revisar el grupo exacto y el despliegue en Package Manager'],
          ['Al abrir el diálogo no aparece ningún campo', 'Carpeta mal nombrada (`cq_dialog` en lugar de `_cq_dialog`) o XML inválido', 'Revisar nombre y XML; comprobar el nodo `cq:dialog` en CRXDE'],
          ['Error HTL: el identificador del modelo no se puede resolver', 'El bundle `practica.core` no está Active o el paquete del modelo no se exporta', 'Revisar el bundle en la Web Console ([[ch-7]])'],
          ['Los estilos no se aplican', 'No se recompiló `ui.frontend` o la clientlib está en caché', 'Desplegar `ui.frontend,ui.apps` y probar con `?debugClientLibs=true`'],
          ['En Publish la tarjeta no se ve', 'El código no se desplegó en Publish o la página/imagen no se publicó', 'Usar `-PautoInstallSinglePackagePublish` y publicar referencias'],
          ['El enlace sale sin `.html`', 'El autor pegó una URL externa o una ruta que no empieza por `/content/`', 'Es el comportamiento esperado del modelo']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Agrega al componente un campo **Etiqueta** (texto corto, por ejemplo "Nuevo") que se muestre como un distintivo sobre el título solo si tiene valor.',
        '**2.** Toca las 5 capas: diálogo, modelo (campo, getter), HTL, estilos y una prueba nueva que verifique el getter.',
        '**3.** Ejecuta `mvn test -pl core` y despliega solo lo necesario para verlo en el editor.'
      ]} />
      <Alert type="tip" title="Solución">
        {'Diálogo: un `textfield` con `name="./etiqueta"`. Modelo: `@ValueMapValue private String etiqueta;` y `public String getEtiqueta()`. HTL: `<span data-sly-test="${card.etiqueta}" class="cmp-servicecard__etiqueta">${card.etiqueta}</span>` antes del `h3`. SCSS: un bloque `&__etiqueta` con fondo de color. Prueba: crea el recurso con `"etiqueta", "Nuevo"` y comprueba `assertEquals("Nuevo", card.getEtiqueta())`. Despliegue: `-pl core -PautoInstallBundle` para el Java y `-pl ui.frontend,ui.apps -PautoInstallPackage` para el resto (o un único `-PautoInstallSinglePackage`).'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'La versión del proyecto (`aemVersion`) debe coincidir con el Service Pack de tu instancia, que ves en `productinfo`.',
        'Un proyecto 6.5 compila contra el `uber-jar` e incrusta los Core Components en `all`; 6.5 LTS usa el `uber-jar` 6.6.x con clasificador `apis`.',
        'Un componente completo tiene definición, diálogo, HTL, Sling Model, prueba y estilos, conectados por los nombres de las propiedades.',
        'La política de la plantilla permite los componentes de un grupo: si el componente usa ese grupo, aparece solo.',
        'Se despliega todo con `autoInstallSinglePackage` y se itera con `-pl` y VSCode AEM Sync.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['uber-jar', 'Artefacto con todas las APIs de AEM 6.5 para compilar'],
          ['Vendor packages', 'Paquetes de terceros (como Core Components) incrustados en `all`'],
          ['`@ValueMapValue`', 'Anotación que inyecta una propiedad del nodo en un campo del Sling Model'],
          ['Placeholder', 'Marcador que ve el autor cuando un componente está vacío'],
          ['BEM', 'Convención de nombres de clases CSS: bloque, `__elemento`, `--modificador`'],
          ['AEM Mocks', 'Librería que simula AEM en memoria para pruebas unitarias']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'AEM Project Archetype', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' },
        { type: 'image', title: 'Release notes de AEM 6.5 LTS (uber-jar y Java)', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-65-lts/content/release-notes/release-notes' },
        { type: 'image', title: 'Sling Models', source: 'Apache Sling', url: 'https://sling.apache.org/documentation/bundles/models.html' },
        { type: 'image', title: 'Especificación de HTL', source: 'GitHub · Adobe', url: 'https://github.com/adobe/htl-spec/blob/master/SPECIFICATION.md' },
        { type: 'image', title: 'AEM Mocks (wcm.io)', source: 'wcm.io', url: 'https://wcm.io/testing/aem-mock/' },
        { type: 'image', title: 'Mastering Sling Models in AEM', source: 'Medium · Prashant Kumar', url: 'https://medium.com/@prashantx7979/mastering-sling-models-in-aem-architecture-implementation-and-real-world-examples-c85460849fd9' }
      ]} />
    </LessonPage>
  );
}
