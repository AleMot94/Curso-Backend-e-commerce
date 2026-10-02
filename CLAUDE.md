# Proyecto: Backend E-commerce (curso)

API de e-commerce hecha como proyecto de un curso de backend. Node.js + Express 5 + MongoDB/Mongoose, en módulos ES (`import`/`export`, no CommonJS, por `"type": "module"` en package.json).

## Cómo correrlo
- `npm start` levanta el servidor con nodemon (`server.js`), puerto `process.env.PORT || 8080`.
- Variables de entorno en `.env` (connection string de Mongo, puerto, etc.). Nunca lo commitees ni lo muestres en texto plano en una respuesta.
- Necesita una instancia de MongoDB accesible (ver `src/config/db.js`).
- Aún no hay tests configurados (`npm test` es un placeholder).

## Arquitectura en capas — respetar este flujo al agregar algo nuevo
`src/routers` → `src/services` → `src/DAO` (managers) → `src/DAO/models`

- **Routers**: definen rutas HTTP y delegan al service correspondiente. Sin lógica de negocio acá.
- **Services**: lógica de negocio y validaciones.
- **DAO/*Manager.js**: acceso a datos, hablan con Mongoose.
- **DAO/models**: esquemas Mongoose (`Product`, `Cart`).

Si una tarea tienta a saltarse una capa (por ejemplo, llamar a Mongoose directo desde un router), señalalo en vez de hacerlo sin avisar.

## Convenciones del proyecto
- API REST bajo `/api/products` y `/api/carts`; vistas renderizadas bajo `/view/...`.
- Vistas con `express-handlebars`, templates en `src/views`, layout en `src/views/layouts/main.handlebars`.
- Subida de archivos con `multer` (`src/config/multer.js`).
- Paginación de productos con `mongoose-paginate-v2`.
- Datos de prueba con `@faker-js/faker` (`src/utils/faker.js`) — la función de seed está comentada a propósito en `server.js`; no la descomentés salvo que se pida explícitamente repoblar la base.
- Chat en tiempo real con `socket.io` (ver evento `'chat message'` en `server.js`).
- `src/utils/validations.js` existe pero está vacío — todavía no hay validaciones centralizadas de inputs.

## Cómo trabajar conmigo en este repo
- Estoy aprendiendo backend professionalmente: priorizá que entienda el "por qué" de un cambio antes de aplicarlo, sobre todo si toca la arquitectura.
- No agregues dependencias nuevas sin decírmelo y justificar por qué hacen falta.
- No toques archivos que no sean necesarios para la tarea puntual.
- Antes de un cambio importante, decime qué archivos vas a modificar y por qué.
- Usá la terminal para correr y verificar (levantar el server, probar un endpoint) en vez de asumir que el código funciona porque "se ve bien".
