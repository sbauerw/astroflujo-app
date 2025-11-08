# 🔗 Guía: Conectar StackBlitz → GitHub → Vercel

## 📋 Resumen del Flujo

```
StackBlitz (desarrollo) 
    ↓
GitHub (repositorio)
    ↓
Vercel (producción)
```

---

## PASO 1: Conectar StackBlitz con GitHub

### Opción A: Desde StackBlitz (Más Fácil)

1. **Abre tu proyecto en StackBlitz**
   - Ya debes tener el proyecto abierto

2. **Click en el ícono de GitHub**
   - Está en la barra superior izquierda (logo de GitHub)
   - O busca "Connect to GitHub" en el menú

3. **Autoriza StackBlitz**
   - Te pedirá permisos para acceder a GitHub
   - Click en "Authorize StackBlitz"

4. **Crea el repositorio**
   - Elige un nombre: `astroflujo`
   - Selecciona si será público o privado
   - Click en "Create repository & push"

5. **¡Listo!**
   - Ahora cada cambio que hagas en StackBlitz se sincroniza automáticamente

### Opción B: Manualmente

1. **Descarga el proyecto de StackBlitz**
   - Click en "Project" → "Download Project"
   - Se descarga como ZIP

2. **Crea un repositorio en GitHub**
   - Ve a [github.com](https://github.com)
   - Click en "New repository"
   - Nombre: `astroflujo`
   - Descripción: "Lectura astrológica con IA"
   - Público o Privado (tú decides)
   - NO marques "Initialize with README"
   - Click en "Create repository"

3. **Sube los archivos**
   - Descomprime el ZIP
   - En la terminal (o GitHub Desktop):
   
   ```bash
   cd astroflujo
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/astroflujo.git
   git push -u origin main
   ```

---

## PASO 2: Deploy en Vercel

### 2.1 Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up"
3. **Importante:** Regístrate con la misma cuenta de GitHub
4. Autoriza Vercel para acceder a tus repos

### 2.2 Importar Proyecto

1. **En el dashboard de Vercel:**
   - Click en "Add New..."
   - Selecciona "Project"

2. **Importar desde GitHub:**
   - Verás una lista de tus repositorios
   - Busca `astroflujo`
   - Click en "Import"

3. **Configurar el proyecto:**
   - **Framework Preset:** Next.js (se detecta automáticamente)
   - **Root Directory:** `./` (dejar por defecto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Variables de Entorno:**
   - Click en "Environment Variables"
   - Agrega las necesarias:
   
   ```
   ANTHROPIC_API_KEY=tu_api_key_aqui
   ```
   
   O si usas OpenAI:
   
   ```
   OPENAI_API_KEY=tu_api_key_aqui
   ```

5. **Deploy:**
   - Click en "Deploy"
   - Espera 1-2 minutos
   - ¡Tu app estará en vivo!

### 2.3 Obtener URL de Producción

Vercel te dará una URL como:
```
https://astroflujo.vercel.app
```

O puedes conectar tu propio dominio.

---

## PASO 3: Configurar Recurrente con la URL Real

1. **Entra a tu cuenta de Recurrente**

2. **Edita tu link de pago**
   - Busca la opción "Return URL" o "Redirect URL"
   - Cambia a: `https://astroflujo.vercel.app/result`

3. **Copia el link de pago**
   - Ejemplo: `https://recurrente.app/checkout/ABC123`

4. **Actualiza tu código**
   - En StackBlitz (o GitHub), edita `app/pay/page.tsx`
   - Reemplaza el placeholder con tu link real de Recurrente
   - El cambio se desplegará automáticamente en Vercel

---

## PASO 4: Flujo de Trabajo Continuo

### Hacer cambios en el proyecto:

**Opción A: Editar en StackBlitz (recomendado)**
1. Haz cambios en StackBlitz
2. Se sincronizan automáticamente con GitHub
3. Vercel detecta el cambio y redespliega solo
4. En 1-2 minutos, los cambios están en vivo

**Opción B: Editar en GitHub directamente**
1. Ve a tu repo en GitHub
2. Edita archivos desde el navegador
3. Commit → push
4. Vercel redespliega automáticamente

**Opción C: Editar localmente (avanzado)**
1. Clona el repo: `git clone https://github.com/TU_USUARIO/astroflujo.git`
2. Haz cambios
3. `git add .`
4. `git commit -m "Descripción del cambio"`
5. `git push`
6. Vercel redespliega automáticamente

---

## 🎯 Checklist Completo

- [ ] Proyecto funcionando en StackBlitz
- [ ] Conectado a GitHub (manual o automático)
- [ ] Cuenta en Vercel creada
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Primera versión desplegada
- [ ] Link de Recurrente creado
- [ ] Return URL configurado en Recurrente
- [ ] Link de pago integrado en `/pay`
- [ ] API key de Claude/GPT configurada
- [ ] Lectura de ejemplo funcionando
- [ ] PDF se puede descargar

---

## 🆘 Problemas Comunes

### "No encuentro el botón de GitHub en StackBlitz"
- Busca en el menú superior o lateral
- Algunas versiones lo tienen como "Share" → "GitHub"

### "Vercel no detecta mi proyecto como Next.js"
- Verifica que `package.json` esté en la raíz
- Asegúrate de tener `next.config.js`

### "Error en el build de Vercel"
- Revisa los logs en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no hay errores de TypeScript

### "Las variables de entorno no funcionan"
- Verifica que estén en la sección "Environment Variables" de Vercel
- Redespliega después de agregarlas
- Usa `NEXT_PUBLIC_` para variables que necesitas en el cliente

---

## 📚 Recursos Útiles

- [Documentación de StackBlitz](https://developer.stackblitz.com)
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [API de Anthropic (Claude)](https://docs.anthropic.com)
- [API de OpenAI](https://platform.openai.com/docs)
- [Documentación de Recurrente](https://docs.recurrente.com)

---

**¡Felicidades! 🎉 Tu proyecto está listo para el mundo.**
