# 🪐 AstroFlujo - Lectura Astrológica con IA

Tu lectura astrológica al instante, impulsada por inteligencia artificial.

## 🚀 Inicio Rápido

### 1. Clonar o Descargar el Proyecto

Si estás en StackBlitz, puedes:
- **Opción A:** Conectar a GitHub directamente desde StackBlitz
- **Opción B:** Descargar como ZIP y subir a tu propio repositorio

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus API keys:

```env
ANTHROPIC_API_KEY=tu_api_key_aqui
# O
OPENAI_API_KEY=tu_api_key_aqui
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
astroflujo/
├── app/
│   ├── page.tsx              # Landing page
│   ├── read/page.tsx         # Formulario de datos
│   ├── pay/page.tsx          # Integración de pago
│   ├── result/page.tsx       # Muestra lectura + PDF
│   ├── api/
│   │   └── generate/route.ts # API de generación de lectura
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Estilos globales
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuración de Recurrente

### Paso 1: Crear Cuenta
1. Ve a [Recurrente.com](https://recurrente.com)
2. Crea tu cuenta
3. Completa la verificación

### Paso 2: Crear Link de Pago
1. En el dashboard, crea un "Link de Pago"
2. Monto: $1.99 USD
3. Descripción: "Lectura Astrológica AstroFlujo"
4. **Return URL:** `https://tu-dominio.vercel.app/result`

### Paso 3: Integrar en la App
Edita `app/pay/page.tsx` y reemplaza el contenido del div con:

```tsx
<iframe
  src="TU_LINK_DE_PAGO_RECURRENTE"
  width="100%"
  height="600"
  frameBorder="0"
/>
```

## 🤖 Configuración de IA

### Opción 1: Claude (Anthropic)

1. Obtén tu API key en [console.anthropic.com](https://console.anthropic.com)
2. Agrega a `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Descomenta el código de la API en `app/api/generate/route.ts`

### Opción 2: ChatGPT (OpenAI)

1. Obtén tu API key en [platform.openai.com](https://platform.openai.com)
2. Agrega a `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Modifica `app/api/generate/route.ts` para usar la API de OpenAI

## 🚢 Deploy en Vercel

### Método 1: Desde GitHub (Recomendado)

1. **Conectar StackBlitz a GitHub:**
   - Click en el ícono de GitHub en StackBlitz
   - "Connect repository"
   - Autoriza y crea el repo

2. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Agrega las variables de entorno
   - Click en "Deploy"

### Método 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### ⚙️ Variables de Entorno en Vercel

En el dashboard de Vercel, agrega:
- `ANTHROPIC_API_KEY` o `OPENAI_API_KEY`
- Cualquier otra variable necesaria

## 🎨 Personalización

### Colores
Edita `tailwind.config.js`:
```js
colors: {
  primary: '#5A4EFC',    // Púrpura principal
  secondary: '#FFCD4A',  // Dorado
}
```

### Contenido
- **Landing:** `app/page.tsx`
- **Formulario:** `app/read/page.tsx`
- **Lectura:** `app/api/generate/route.ts`

## 📊 Roadmap

- [x] MVP básico
- [ ] Integración real con Recurrente
- [ ] Conexión con API de IA (Claude/GPT)
- [ ] Cálculos astrológicos reales (Swiss Ephemeris)
- [ ] Versión bilingüe (EN/ES)
- [ ] Dashboard de métricas
- [ ] Email automático con PDF

## 🆘 Soporte

Si tienes problemas:
1. Verifica que todas las dependencias estén instaladas
2. Revisa que las variables de entorno estén configuradas
3. Consulta los logs en Vercel (si ya desplegaste)

## 📝 Licencia

Proyecto personal de aprendizaje. Úsalo como base para tus propios proyectos.

---

**Desarrollado con ✨ y 🪐**

## 🔒 Nota sobre seguridad: sanitización de HTML generado por la IA

La aplicación genera contenido HTML usando un modelo de lenguaje y lo devuelve al cliente.
Para reducir riesgos de XSS, el endpoint `app/api/generate/route.ts` sanitiza el HTML en el servidor
antes de enviarlo. Se utiliza la librería `sanitize-html` con una política conservadora (`SANITIZE_OPTIONS`) que:

- Permite solo etiquetas básicas (p. ej. `h2`, `p`, `ul`, `li`, `strong`, `em`, `br`, `a`).
- Restringe atributos permitidos (solo `href`, `target`, `rel` en enlaces) y esquemas seguros (`http`, `https`, `mailto`, `tel`).
- Normaliza enlaces para añadir `rel="nofollow noopener noreferrer"` y `target="_blank"`.

Recomendaciones para producción:

- Revisa y ajusta `SANITIZE_OPTIONS` según el HTML que realmente necesites permitir (si necesitas estilos inline,
   clases o más etiquetas, explícitalo y añade tests).
- Considera añadir validación adicional de contenido (longitud máxima, blacklist de frases) y rate-limiting
   para proteger la API contra abusos.
- No confíes en la sanitización como única defensa: aplica políticas de Content Security Policy (CSP) en producción
   y verifica entradas y respuestas críticas en el servidor.

