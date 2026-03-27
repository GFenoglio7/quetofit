# Queto-Fit — Guía del Proyecto

## ¿Qué es esto?
Sitio web vitrina para **Queto-Fit**, una tienda de suplementos y productos de bienestar. No tiene carrito de compras — el CTA principal es un botón de WhatsApp que conecta directo con el vendedor.

## Stack Técnico
- **Next.js 16** con App Router
- **TypeScript**
- **Tailwind CSS v4** (configuración en `globals.css`, no en `tailwind.config.ts`)
- **lucide-react** para íconos
- Deploy en **Vercel**

## Estructura
```
src/
  app/
    page.tsx              → Home (hero + featured products)
    products/
      page.tsx            → Catálogo con filtros por categoría
      [slug]/page.tsx     → Detalle de producto
  components/
    layout/               → Navbar, Footer
    product/              → ProductCard, ProductGrid, ProductImageGallery, ProductVariantSelector, WhatsAppButton
    home/                 → HeroSection, CategorySection, BenefitsBar
    ui/                   → Badge, Button
  data/
    products.json         → Fuente de verdad de todos los productos
  lib/
    products.ts           → Funciones de acceso a datos
    whatsapp.ts           → Generador de URLs de WhatsApp
    utils.ts              → cn(), formatPrice()
  types/
    index.ts              → Interfaces TypeScript
```

## Variables de Entorno
```
NEXT_PUBLIC_WHATSAPP_NUMBER=  # número en formato internacional sin + (ej: 5491112345678)
```
Configurar en `.env.local` localmente y en Vercel Environment Variables en producción.

## Datos de Productos
Los productos están en `src/data/products.json`. Fueron scrapeados de:
- https://www.empirepadel.com.ar/suplementos/deportivos/
- https://www.empirepadel.com.ar/suplementos/bienestar/

Las imágenes son del CDN `acdn-us.mitiendanube.com`. Si dejan de funcionar, reemplazarlas por imágenes propias en `public/products/`.

Para **agregar un producto nuevo**: editar `products.json` siguiendo la misma estructura.
Para **actualizar precios**: editar el campo `basePrice` y `variants[].price` en `products.json`.

## Categorías Disponibles
`proteinas` | `energia` | `barras` | `creatina` | `aminoacidos` | `quemadores` | `pre-entreno` | `hidratacion` | `accesorios` | `minerales` | `colageno` | `bienestar`

## Comandos
```bash
npm run dev     # desarrollo local
npm run build   # build de producción
npm run lint    # linter
```

## Deploy en Vercel
1. Push a GitHub
2. Importar repo en vercel.com
3. Next.js se detecta automáticamente
4. Agregar env var `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Deploy automático en cada push a main

## Diseño
- Tema oscuro (navy `#0F172A`) con tarjetas claras
- Verde `#16A34A` como color primario (salud, fitness)
- WhatsApp verde `#25D366` para el CTA principal
- Font: Geist Sans (viene con Next.js)
