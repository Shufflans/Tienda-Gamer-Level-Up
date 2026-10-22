# Level-Up Gamer
<br>
<br>
**Integrantes:**
<br>
Camilo Covarrubias.
<br>
Nicolás Chauca.
<br>
Gabriel Yañez.
<br>
<br>
<br>
## Descripcion tienda:
* Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile. Lanzada hace dos años como respuesta a la creciente demanda durante la pandemia, Level-Up Gamer ofrece una amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas especializadas. Aunque no cuenta con una ubicación física, realiza despachos a todo el país.

---

## Objetivos del negocio e integración

*   **Misión:** Proporcionar productos tecnológicos de alta calidad para gamers en todo Chile, garantizando una experiencia de compra única y personalizada.
*   **Visión:** Ser el e-commerce líder del ecosistema gamer chileno, destacando por su innovación constante, soporte excepcional y un programa de fidelización gamificado.
*   **Fidelización y Gamificación:** Mecánica de niveles basada en acumulación de puntos *LevelUp* (canjeables por productos o descuentos directos) y un sistema de recompensas por referidos.
*   **Comunidad:** Espacio de integración mediante blogs/noticias locales, vinculación con redes sociales y visualización de eventos presenciales en un mapa nacional interoperable.

---

---

## Implementaciones:

1. **React + Vite:** Migración de la estructura estática anterior a un entorno de desarrollo moderno, optimizado y de alto rendimiento.
2. **Atomic Design:** Organización estricta de la interfaz en componentes modulares, escalables y altamente reutilizables.
3. **Patrón de Diseño Arquitectónico:** Separación clara de responsabilidades dividiendo la lógica de datos (`src/data`), vistas principales (`src/pages`) y elementos globales (`src/components`).
4. **Diseño Responsivo:** Interfaz adaptada a cualquier dispositivo (móvil, tablet y desktop) utilizando el framework **Bootstrap**.

---

## Estructura del proyecto:

```text
Tienda-Gamer-Level-Up-main/
├── .github/
│   └── workflows/
│       └── static.yml           # Pipeline de integracion y despliegue continuo
├── public/                                  
├── src/                        
│   ├── components/              
│   │   └── Navbar.jsx          
│   ├── data/                    
│   │   ├── carrito.js           # Control de estados, calculo de totales y descuentos del carro
│   │   ├── noticias.json        # Base de datos local para articulos del blog
│   │   └── productos.js         # Catalogo maestro de articulos, precios y stock disponible
│   ├── pages/                  
│   │   ├── Blog.jsx             # Seccion de noticias y comunidad gamer
│   │   ├── Carrito.jsx          # Panel de revision de productos seleccionados
│   │   ├── Checkout.jsx         # Formulario de pago y confirmacion de compra
│   │   ├── Contacto.jsx         # Formulario de comunicacion y enlaces de redes
│   │   ├── DetalleProducto.jsx  # Informacion especifica, especificaciones y reseñas
│   │   ├── Login.jsx            # Autenticacion de usuario con alertas de validacion
│   │   ├── Nosotros.jsx         # Historia, mision y vision de la tienda
│   │   ├── Productos.jsx        # Catalogo completo con barra de busqueda y filtros reactivos
│   │   └── Registro.jsx         # Formulario con validacion de edad, referidos y dominio Duoc
│   ├── tests/                  
│   │   ├── Carrito.test.jsx     # Pruebas unitarias de operaciones del carro de compras
│   │   ├── Checkout.test.jsx    # Pruebas unitarias de envio de datos de facturacion
│   │   ├── DetalleProducto.test.jsx # Pruebas unitarias de visualizacion y reseñas por item
│   │   ├── Login.test.jsx       # Pruebas unitarias de comportamiento del inicio de sesion
│   │   ├── Productos.test.jsx   # Pruebas unitarias de renderizado de catalogo y filtros
│   │   ├── Registro.test.jsx    # Pruebas unitarias de reglas de negocio del formulario
│   │   └── setup.js             # Configuracion global del entorno de pruebas
│   ├── App.jsx                  
│   ├── index.css                
│   └── main.jsx                
├── .gitignore                  
├── .oxlintrc.json              
├── README.md                    
├── index.html                  
├── package-lock.json            
├── package.json                
└── vite.config.js              
```

---

## Pruebas unitarias (Vitest)

El aseguramiento de calidad del frontend se ejecuta mediante **Vitest**, validando de forma aislada la manipulación del DOM, eventos interactivos (clicks/formularios) y las lógicas clave del carrito y registro.

Para ejecutar la suite de pruebas locales:
```bash
npm run test
```

---

*   **Link: https://shufflans.github.io/Tienda-Gamer-Level-Up
