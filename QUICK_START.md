# ⚡ INICIO RÁPIDO - AstroFlujo

## 🎯 Acabas de descargar tu proyecto completo

### ✅ ¿Qué tienes?
- ✅ Proyecto Next.js completo
- ✅ Todas las páginas (landing, formulario, pago, resultado)
- ✅ API de generación con IA
- ✅ Estilos con Tailwind
- ✅ Configuración lista para Vercel

---

## 🚀 OPCIÓN 1: Subir a StackBlitz (Más Rápido)

1. Ve a [stackblitz.com](https://stackblitz.com)
2. Click en "New Project"
3. Arrastra la carpeta `astroflujo` (descomprimida)
4. ¡Listo! Ya puedes editar y ver en vivo

**Siguiente paso:** Lee `DEPLOYMENT_GUIDE.md` para conectar con GitHub y Vercel

---

## 🚀 OPCIÓN 2: Instalar Localmente

### Requisitos:
- Node.js 18+ instalado

### Pasos:

```bash
# 1. Descomprime el ZIP
unzip astroflujo.zip

# 2. Entra a la carpeta
cd astroflujo

# 3. Instala dependencias
npm install

# 4. Crea archivo de variables de entorno
cp .env.example .env.local

# 5. Edita .env.local y agrega tu API key
# (Abre con cualquier editor)

# 6. Ejecuta el proyecto
npm run dev

# 7. Abre http://localhost:3000
```

---

## 📁 Archivos Importantes

### 📖 Documentación:
- `README.md` → Descripción general del proyecto
- `DEPLOYMENT_GUIDE.md` → Conectar StackBlitz → GitHub → Vercel
- `AI_INTEGRATION_GUIDE.md` → Configurar Claude o ChatGPT

### 🔧 Configuración:
- `.env.example` → Variables de entorno necesarias
- `package.json` → Dependencias del proyecto
- `tailwind.config.js` → Personalizar colores

### 💻 Código Principal:
- `app/page.tsx` → Landing page
- `app/read/page.tsx` → Formulario
- `app/pay/page.tsx` → Integración de pago
- `app/result/page.tsx` → Muestra lectura
- `app/api/generate/route.ts` → Lógica de IA

---

## ⚡ Próximos Pasos (en orden)

### 1. Ejecutar el Proyecto
- [ ] Subir a StackBlitz o instalar localmente
- [ ] Verificar que todo funciona

### 2. Configurar IA
- [ ] Obtener API key de Claude o ChatGPT
- [ ] Agregar a `.env.local` o variables de Vercel
- [ ] Leer: `AI_INTEGRATION_GUIDE.md`

### 3. Configurar Pago
- [ ] Crear cuenta en Recurrente.com
- [ ] Crear link de pago de $1.99
- [ ] Integrar en `app/pay/page.tsx`

### 4. Deploy
- [ ] Conectar StackBlitz con GitHub (o subir manual)
- [ ] Importar en Vercel
- [ ] Agregar variables de entorno en Vercel
- [ ] Leer: `DEPLOYMENT_GUIDE.md`

### 5. Probar Todo
- [ ] Hacer un pago de prueba
- [ ] Verificar que se genera la lectura
- [ ] Descargar el PDF
- [ ] Verificar que todo funciona en producción

---

## 🆘 ¿Problemas?

### "npm install falla"
- Verifica tener Node.js 18+: `node --version`
- Borra `node_modules` y `package-lock.json`, intenta de nuevo

### "La app no carga en localhost"
- Verifica que el puerto 3000 esté libre
- Prueba con: `npm run dev -- -p 3001`

### "Error de API de IA"
- Verifica que tu API key esté en `.env.local`
- Revisa que el formato sea correcto (sk-ant-... o sk-...)
- Lee: `AI_INTEGRATION_GUIDE.md`

---

## 📚 Todos los Archivos de Documentación

1. **README.md** - Visión general
2. **DEPLOYMENT_GUIDE.md** - StackBlitz → GitHub → Vercel
3. **AI_INTEGRATION_GUIDE.md** - Configurar Claude/ChatGPT
4. **QUICK_START.md** - Este archivo

---

## 💡 Tips

- **Trabaja en StackBlitz** primero (más fácil, no necesitas instalar nada)
- **Conecta con GitHub** cuando quieras versionar
- **Despliega en Vercel** cuando esté listo para producción
- **Lee las guías** antes de empezar (están muy detalladas)

---

## 🎉 ¡Estás listo!

Tu proyecto incluye TODO lo necesario:
- ✅ Código completo y funcional
- ✅ Guías paso a paso
- ✅ Configuración de ejemplo
- ✅ Documentación detallada

**Tiempo estimado para tener todo funcionando:** 30-60 minutos

---

**¡Mucha suerte con tu proyecto! 🪐✨**

Si tienes dudas, revisa las guías detalladas incluidas.
