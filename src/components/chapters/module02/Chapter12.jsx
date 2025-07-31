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

const generate = `# En Windows usa una terminal de ADMINISTRADOR o WSL (el Dispatcher crea enlaces simbólicos)
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.3.1:generate \\
  -DarchetypeGroupId=com.adobe.aem \\
  -DarchetypeArtifactId=aem-project-archetype \\
  -DarchetypeVersion=58 \\
  -DappTitle="Sitio de Practica" \\
  -DappId="practica" \\
  -DgroupId="com.practica" \\
  -DaemVersion=cloud \\
  -Dlanguage=es \\
  -Dcountry=mx

cd practica
git init
git add .
git commit -m "chore: generate project from AEM archetype 58"`;

const sdkApi = `<!-- pom.xml raíz del proyecto Cloud (real) -->
<aem.sdk.api>2026.9.28386.20260923T071724Z-260900</aem.sdk.api>
<aemanalyser.version>1.6.6</aemanalyser.version>`;

const reactor = `[INFO] Sitio de Practica 1.0.0-SNAPSHOT ................... SUCCESS [  0.873 s]
[INFO] Sitio de Practica - Core 1.0.0-SNAPSHOT ............ SUCCESS [ 17.678 s]
[INFO] Sitio de Practica - UI Frontend 1.0.0-SNAPSHOT ..... SUCCESS [01:12 min]
[INFO] Sitio de Practica - Repository Structure Package ... SUCCESS [  1.566 s]
[INFO] Sitio de Practica - UI apps 1.0.0-SNAPSHOT ......... SUCCESS [  5.084 s]
[INFO] Sitio de Practica - UI content 1.0.0-SNAPSHOT ...... SUCCESS [  2.779 s]
[INFO] Sitio de Practica - UI config 1.0.0-SNAPSHOT ....... SUCCESS [  0.465 s]
[INFO] Sitio de Practica - All 1.0.0-SNAPSHOT ............. SUCCESS [ 32.006 s]
[INFO] Sitio de Practica - Integration Tests .............. SUCCESS [ 17.940 s]
[INFO] com.adobe.cq.cloud.testing.ui.cypress - UI Tests ... SUCCESS [01:40 min]
[INFO] BUILD SUCCESS
[INFO] Total time:  04:20 min`;

const analyserOut = `[INFO] --- aemanalyser:1.6.6:project-analyse (aem-analyser) @ practica.all ---
[INFO] - Executing Artifact rules analyser task [artifact-rules]...
[INFO] - Executing Api Regions analyser task that checks that listed packages are actually exported [api-regions]...
[INFO] - Executing Api Regions check order analyser task [api-regions-check-order]...
[INFO] - Executing Configuration API analyser task [configuration-api]...
[INFO] - Executing Region Deprecated API analyser task [region-deprecated-api]...
[WARNING] Project is configured with outdated aemanalyser plugin version : 1.6.6
[WARNING] Please update to plugin version : 1.7.6`;

const analyserFix = `<!-- pom.xml raíz: actualiza la propiedad -->
<aemanalyser.version>1.7.6</aemanalyser.version>

# Vuelve a construir el paquete all y comprueba que la advertencia desapareció
mvn install -pl all`;

const allTree = `jcr_root/apps/practica-packages/application/install/
    practica.core-1.0.0-SNAPSHOT.jar
    practica.ui.apps-1.0.0-SNAPSHOT.zip
    practica.ui.config-1.0.0-SNAPSHOT.zip
jcr_root/apps/practica-packages/content/install/
    practica.ui.content-1.0.0-SNAPSHOT.zip`;

const brokenFilter = `<!-- ui.apps/src/main/content/META-INF/vault/filter.xml (EJEMPLO INCORRECTO) -->
<filter root="/apps/sling" />
<filter root="/content/prueba"/>   <!-- contenido mutable dentro del paquete de código -->`;

const brokenOut = `[ERROR] ValidationViolation: Filter root's ancestor '/content' is not covered by any of the
        specified dependencies nor a valid root. @ META-INF\\vault\\filter.xml, validator: jackrabbit-filter
[ERROR] ValidationViolation: Package of type 'APPLICATION' is not supposed to contain content outside
        root nodes 'libs' or 'oak:index' or 'apps'! @ jcr_root\\content\\prueba, validator: jackrabbit-packagetype
[WARNING] ValidationViolation: Node 'prueba [nt:unstructured]' is not allowed as child of node with
        potential default types [nt:folder] ... validator: jackrabbit-nodetypes
[INFO] BUILD FAILURE
[ERROR] Failed to execute goal org.apache.jackrabbit:filevault-package-maven-plugin:1.3.6:validate-package
        on project practica.ui.apps: Found 3 violation(s) (with severity=ERROR).`;

const gitRemote = `# 1. En Cloud Manager: Repositories → selecciona el repositorio → Access Repo Info
#    (copia la URL y genera la contraseña; requiere rol Deployment Manager o Business Owner)

# 2. En tu proyecto local
git remote add adobe <URL-del-repositorio-que-copiaste>
git push adobe main

# Las credenciales que pide Git son las que mostró "Access Repo Info"`;

const rdeCmds = `# Una sola vez
npm install -g @adobe/aio-cli
aio plugins:install @adobe/aio-cli-plugin-aem-rde
aio plugins:update
aio login
aio aem:rde:setup          # elige organización, programa y entorno RDE

# Cada vez que quieras probar
mvn clean install
aio aem:rde:install all/target/practica.all-1.0.0-SNAPSHOT.zip
aio aem:rde:status         # qué hay instalado
aio aem:rde:history        # historial de despliegues
aio aem:rde:reset          # volver a un RDE limpio`;

export default function Chapter12({ isCompleted, onToggleComplete, onNavigate }) {
  return (
    <LessonPage
      chapterId="ch-12"
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    >
      <SectionTitle>Objetivos del laboratorio</SectionTitle>
      <List items={[
        'Crear y compilar un proyecto para **AEM as a Cloud Service**, y desplegarlo en el AEM SDK local.',
        'Entender qué cambia frente al proyecto 6.5 del [[ch-11]] y qué reglas extra impone Cloud Service.',
        'Usar el **AEM Analyser** y los validadores de FileVault como red de seguridad antes de llegar a Cloud Manager.',
        'Llevar el mismo componente propio a Cloud y comprobar que funciona igual.',
        'Preparar el repositorio para **Cloud Manager** y conocer los **Rapid Development Environments (RDE)**.'
      ]} />
      <Alert type="info" title="Antes de empezar">
        {'Necesitas el AEM SDK corriendo en 4502 y 4503 ([[ch-4]]), Java 21 recomendado ([[ch-3]]) y el laboratorio 6.5 ([[ch-11]]), porque reutilizamos su componente. Todo lo de este tema se **compiló de verdad**: el build completo del proyecto Cloud con el componente terminó en BUILD SUCCESS, con las 8 pruebas en verde y el analyser aprobado.'}
      </Alert>

      <SectionTitle>Qué cambia al trabajar para Cloud Service</SectionTitle>
      <DataTable
        headers={['Tema', 'AEM 6.5', 'AEM as a Cloud Service']}
        rows={[
          ['Instancia local', 'Quickstart de 6.5 con licencia', 'AEM SDK, actualizado cada mes'],
          ['API para compilar', '`uber-jar`', '`aem-sdk-api` (versión del SDK)'],
          ['Core Components', 'Incrustados en `all`', 'Vienen con el producto'],
          ['Despliegue en servidores', 'Paquetes o pipeline propio', '**Solo** pipelines de Cloud Manager'],
          ['`/apps` en ejecución', 'Modificable', 'Inmutable'],
          ['Java', '11 (17/21 en LTS)', 'Runtime Java 21; compilación elegida en `.cloudmanager/java-version`'],
          ['Validación extra en el build', 'Validadores de FileVault', 'Validadores de FileVault **y** AEM Analyser con las reglas de Cloud'],
          ['Diagnóstico', 'Web Console', 'Developer Console en solo lectura ([[ch-7]])']
        ]}
      />

      <SectionTitle>Paso 1 · Alinear el proyecto con tu SDK</SectionTitle>
      <List items={[
        'Mira la versión de tu SDK en `http://localhost:4502/system/console/productinfo`.',
        'Al generar, el archetype pone en el POM la versión más reciente de la API del SDK (`aem.sdk.api`). Si tu SDK local es más viejo, actualízalo ([[ch-4]]): Adobe recomienda hacerlo cada mes, alineado con las releases de Cloud Service.',
        'Así compilas contra las mismas APIs que corre tu SDK y que corre Cloud.'
      ]} />
      <CodeBlock filename="pom.xml raíz (fragmento real)" language="xml" code={sdkApi} />

      <SectionTitle>Paso 2 · Generar el proyecto</SectionTitle>
      <CodeBlock filename="terminal" language="bash" code={generate} />
      <List items={[
        '`-DaemVersion=cloud` activa la variante Cloud: `aem-sdk-api`, `.cloudmanager/java-version` y el Dispatcher para Cloud.',
        'Para un proyecto real de Cloud **conserva el módulo `dispatcher`**: Cloud Manager lo usa para configurar el Dispatcher de tus entornos. En Windows, genera desde una terminal de administrador o WSL, porque crea enlaces simbólicos ([[ch-9]]).',
        'El primer commit guarda el proyecto tal como lo generó el archetype.'
      ]} />

      <SectionTitle>Paso 3 · Compilar y leer el AEM Analyser</SectionTitle>
      <Paragraph>{'Ejecuta `mvn clean install` (todavía sin desplegar). Esta es la salida real del build del proyecto Cloud con el componente del [[ch-11]] incluido:'}</Paragraph>
      <CodeBlock filename="salida real (resumida)" language="text" code={reactor} />
      <Paragraph>{'Mientras construye `all`, se ejecuta el **AEM Analyser**, que revisa el proyecto con las mismas reglas que aplicará Cloud Manager:'}</Paragraph>
      <CodeBlock filename="salida real del analyser" language="text" code={analyserOut} />
      <List items={[
        '**artifact-rules**: que los bundles y paquetes cumplan las reglas de artefactos de Cloud.',
        '**api-regions** y **api-regions-check-order**: que tu código solo use APIs **públicas** de AEM (no clases internas que Adobe puede cambiar en cualquier release).',
        '**configuration-api**: que tus configuraciones OSGi sean válidas para Cloud.',
        '**region-deprecated-api**: avisa si usas APIs **deprecadas** que Adobe planea retirar.',
        'Las dos advertencias finales indican que la versión del plugin que trae el archetype 58 (1.6.6) ya tiene una más nueva (1.7.6).'
      ]} />
      <CodeBlock filename="actualizar el analyser (probado)" language="text" code={analyserFix} />
      <Paragraph>{'Probamos el cambio: con la versión 1.7.6 el build de `all` termina en BUILD SUCCESS y la advertencia desaparece. Mantener el analyser al día importa porque Cloud Manager usa sus reglas más recientes: un problema que tu analyser viejo no ve puede aparecer recién en el pipeline.'}</Paragraph>

      <SectionTitle>Paso 4 · Desplegar en el AEM SDK</SectionTitle>
      <List items={[
        'Con Author y Publish del SDK corriendo, ejecuta `mvn clean install -PautoInstallSinglePackage` y luego `mvn clean install -PautoInstallSinglePackagePublish`, igual que en 6.5.',
        'Verifica en Package Manager, en la Web Console (`practica.core` Active) y en Sites, como en el [[ch-11]].',
        'Diferencia visible: en `all` ya no hay paquetes de Core Components, porque Cloud los incluye:'
      ]} />
      <CodeBlock filename="contenido real de all/target/practica.all-1.0.0-SNAPSHOT.zip (Cloud)" language="text" code={allTree} />

      <SectionTitle>Paso 5 · El mismo componente, ahora en Cloud</SectionTitle>
      <Paragraph>{'Copia los seis archivos de la **Tarjeta de servicio** del [[ch-11]] a las mismas rutas del proyecto Cloud: definición, diálogo y HTL en `ui.apps`, modelo y prueba en `core`, y el SCSS en `ui.frontend`. **No cambia ni una línea**: el Sling Model, el HTL y el diálogo usan APIs públicas que existen igual en 6.5 y en Cloud. En nuestra verificación, las mismas 3 pruebas del componente pasaron en ambos proyectos y el analyser no reportó ningún problema.'}</Paragraph>
      <Alert type="tip" title="Buena noticia para quien migra">
        {'Si escribes componentes con APIs públicas (Sling Models, HTL, Core Components), el mismo código sirve en 6.5 y en Cloud. Lo que cambia entre ambos es sobre todo la **estructura y el despliegue**, no los componentes. Por eso el analyser es tan útil: te avisa en tu equipo si algo no es compatible con Cloud.'}
      </Alert>

      <SectionTitle>Paso 6 · La red de seguridad: provocar un error a propósito</SectionTitle>
      <Paragraph>{'Para ver cómo te protege el build, provocamos un error típico: meter contenido mutable (`/content`) dentro del paquete de código `ui.apps`, algo que Cloud Service prohíbe ([[ch-10]]).'}</Paragraph>
      <CodeBlock filename="el error provocado" language="xml" code={brokenFilter} />
      <CodeBlock filename="salida real de mvn install -pl ui.apps" language="text" code={brokenOut} />
      <List items={[
        '`jackrabbit-filter`: la raíz `/content/prueba` no cuelga de ninguna raíz declarada para el proyecto (la estructura del repositorio de [[ch-9]]).',
        '`jackrabbit-packagetype`: el error clave. Un paquete de tipo **APPLICATION** solo puede tener contenido en `/apps`, `/libs` u `/oak:index`.',
        '`jackrabbit-nodetypes` (advertencia): el tipo de nodo tampoco encaja con su padre.',
        'El build falla **en tu equipo**, en segundos, en lugar de fallar después en Cloud Manager. Si ves estos errores, mueve ese contenido a `ui.content` (o a repoinit si es estructura).'
      ]} />

      <SectionTitle>Paso 7 · Preparar el repositorio para Cloud Manager</SectionTitle>
      <Paragraph>{'En Cloud Service el código solo llega a los entornos a través de **pipelines de Cloud Manager**, que toman el código de un repositorio Git. Cloud Manager admite tres tipos de repositorio:'}</Paragraph>
      <DataTable
        headers={['Tipo', 'Cómo se conecta']}
        rows={[
          ['**Repositorio de Adobe**', 'Se crea automáticamente por programa. Obtienes URL y credenciales con **Access Repo Info**'],
          ['**GitHub privado**', 'Se valida con la aplicación de GitHub de Adobe'],
          ['**Externo** (GitLab, Bitbucket, Azure DevOps, GitHub Enterprise Server)', 'Se valida con un token personal y un webhook']
        ]}
      />
      <CodeBlock filename="subir tu proyecto al repositorio de Adobe" language="bash" code={gitRemote} />
      <List items={[
        'Solo los usuarios con rol **Deployment Manager** o **Business Owner** pueden agregar repositorios.',
        '`git remote add adobe ...` registra el repositorio de Adobe con el nombre `adobe`, sin tocar tu `origin` (por ejemplo GitHub).',
        'Cada **pipeline** está ligado a un repositorio y una rama: al ejecutarlo, Cloud Manager compila con el mismo `mvn clean install`, ejecuta pruebas y revisiones de calidad, y despliega en los entornos. Pipelines y gobernanza se ven en [[ch-127]] y [[ch-128]].',
        'Cloud Manager compila con la versión de Java de `.cloudmanager/java-version` (en el proyecto generado: `21`). **Compila también en tu equipo con Java 21** para detectar diferencias antes de subir.'
      ]} />
      <Alert type="info" title="Java de compilación vs. versión de bytecode">
        {'El archetype configura el compilador con `<release>11</release>` aunque Cloud Manager compile con Java 21: el código resultante es compatible con Java 11 y corre sin problema en el runtime Java 21. Si quieres usar sintaxis de Java más nueva, sube ese valor a 17 o 21, compila con ese JDK en tu equipo y prueba antes de subirlo.'}
      </Alert>

      <SectionTitle>Paso 8 (opcional) · Probar en un RDE</SectionTitle>
      <Paragraph>{'Un **Rapid Development Environment (RDE)** es un entorno de Cloud Service donde despliegas en segundos **sin pasar por el pipeline**, para probar cambios en la nube real mientras desarrollas. Si tu programa tiene uno:'}</Paragraph>
      <CodeBlock filename="terminal · Adobe I/O CLI" language="bash" code={rdeCmds} />
      <List items={[
        '`aio` es la línea de comandos de Adobe I/O (se instala con npm); el plugin `aem-rde` agrega los comandos del RDE.',
        '`aio login` abre el navegador para autenticarte con tu Adobe ID; `aio aem:rde:setup` guarda qué programa y entorno usar.',
        '`aio aem:rde:install` sube el paquete `all` que construiste y lo instala.',
        'Límites según Adobe: por defecto **un RDE por programa**, pensado para desarrollo y pruebas funcionales (no para cargas altas ni mucho contenido), paquetes de contenido de hasta 1 GB y **sin tier Preview**.'
      ]} />

      <SectionTitle>Solución de problemas</SectionTitle>
      <DataTable
        headers={['Síntoma', 'Causa probable', 'Solución']}
        rows={[
          ['`ValidationViolation ... Package of type APPLICATION`', 'Contenido mutable en `ui.apps`', 'Moverlo a `ui.content` o a repoinit'],
          ['El analyser falla por API no pública o deprecada', 'Tu código usa clases internas o retiradas', 'Reemplazar por la API pública recomendada'],
          ['Advertencia de analyser desactualizado', 'Versión antigua en `aemanalyser.version`', 'Actualizar la propiedad (por ejemplo a 1.7.6)'],
          ['Compila en local pero falla en Cloud Manager', 'Diferente JDK o analyser desactualizado', 'Compilar con Java 21 y el analyser al día'],
          ['Error al generar el Dispatcher en Windows', 'Enlaces simbólicos sin permisos', 'Terminal de administrador o WSL'],
          ['`Connection refused` al desplegar', 'El SDK no está corriendo en 4502/4503', 'Arrancar el SDK ([[ch-4]])']
        ]}
      />

      <SectionTitle>Ejercicio práctico</SectionTitle>
      <List items={[
        '**1.** Copia el componente del [[ch-11]] al proyecto Cloud y ejecuta `mvn clean install`. Anota las tareas del analyser que aparecen.',
        '**2.** Actualiza `aemanalyser.version` a la versión que te sugiera tu build y confirma que la advertencia desaparece.',
        '**3.** Provoca el error del paso 6 en `ui.apps`, lee los mensajes y luego mueve ese nodo al lugar correcto para que el build pase.',
        '**4.** Agrega en `ui.config` un logger DEBUG solo para Author para el paquete `com.practica` (como en [[ch-7]], pero como archivo) y comprueba que el build y el analyser pasan.'
      ]} />
      <Alert type="tip" title="Solución">
        {'(3) El contenido de `/content/prueba` va en `ui.content/src/main/content/jcr_root/content/...` y su raíz en el `filter.xml` de `ui.content` (idealmente con `mode="merge_properties"`, [[ch-10]]). (4) Archivo `ui.config/src/main/content/jcr_root/apps/practica/osgiconfig/config.author/org.apache.sling.commons.log.LogManager.factory.config~practica-debug.cfg.json` con `"org.apache.sling.commons.log.level": "debug"`, `"org.apache.sling.commons.log.names": ["com.practica"]` y, en Cloud, `"org.apache.sling.commons.log.file": "logs/error.log"`.'}
      </Alert>

      <SectionTitle>Lo que aprendiste</SectionTitle>
      <List items={[
        'Un proyecto Cloud compila contra `aem-sdk-api`, que conviene alinear con tu SDK y actualizar cada mes.',
        'El AEM Analyser y los validadores de FileVault revisan en tu equipo las reglas de Cloud; mantenlos actualizados.',
        'El mismo componente con APIs públicas funciona igual en 6.5 y en Cloud.',
        'El código llega a Cloud solo por pipelines de Cloud Manager desde un repositorio Git (de Adobe, GitHub privado o externo).',
        'Cloud Manager compila con el Java de `.cloudmanager/java-version`; compila igual en tu equipo.',
        'Un RDE permite probar en la nube en segundos, sin pipeline, con límites claros.'
      ]} />

      <SectionTitle>Glosario del tema</SectionTitle>
      <DataTable
        headers={['Término', 'Significado']}
        rows={[
          ['`aem-sdk-api`', 'Dependencia con las APIs de AEM as a Cloud Service para compilar'],
          ['AEM Analyser', 'Plugin que valida el proyecto con las reglas de Cloud Service'],
          ['API region', 'Conjunto de APIs públicas que tu código puede usar'],
          ['Cloud Manager', 'Servicio de Adobe para repositorios, pipelines y entornos de Cloud Service'],
          ['Pipeline', 'Proceso automático que compila, prueba y despliega tu código'],
          ['RDE', 'Rapid Development Environment: entorno de desarrollo en la nube con despliegue inmediato'],
          ['`aio`', 'Línea de comandos de Adobe I/O']
        ]}
      />

      <ResourceLinks items={[
        { type: 'image', title: 'AEM as a Cloud Service SDK', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-as-a-cloud-service-sdk' },
        { type: 'image', title: 'Rapid Development Environments', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/rapid-development-environments' },
        { type: 'image', title: 'Gestionar repositorios en Cloud Manager', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/managing-code/managing-repositories' },
        { type: 'image', title: 'Entorno de build de Cloud Manager', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/create-application-project/build-environment-details' },
        { type: 'image', title: 'Estructura de paquetes en Cloud Service', source: 'Adobe Experience League', url: 'https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/aem-project-content-package-structure' },
        { type: 'image', title: 'AEM Project Archetype', source: 'GitHub · Adobe', url: 'https://github.com/adobe/aem-project-archetype' }
      ]} />
    </LessonPage>
  );
}
