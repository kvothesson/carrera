# La carrera que no existía

Ya no se escribe cómo se hace algo: se dice qué se quiere y se comprueba que salió bien. Ocho materias para trabajar con agentes, cada una con una demo para tocar, unidades interactivas, un taller y un cierre.

En vivo: https://kvothesson.com/carrera/

| Año | Materia | Archivo |
|---|---|---|
| 1 | Especificación | `especificacion.html` |
| 1 | Verificación y evals | `verificacion.html` |
| 2 | Delegación y orquestación | `delegacion.html` |
| 2 | Límites y permisos | `limites.html` |
| 3 | Comportamiento de modelos | `comportamiento.html` |
| 3 | Economía del cómputo | `economia.html` |
| 4 | Criterio de producto | `criterio.html` |
| 4 | Responsabilidad | `responsabilidad.html` |

## Cómo está hecho

- HTML, CSS y JavaScript sin dependencias. `curso.css` y `curso.js` son compartidos; cada materia es una página.
- Una pantalla por parte, sin scroll en escritorio. Flechas del teclado para pasar.
- Accesible: teclado, lector de pantalla, señales que no dependen del color y respeto por «reducir movimiento». Con `?sin-animacion` en la dirección, las demos muestran el resultado al instante.
- Los números de las demos son de juguete. El temario es una opinión, no un plan de estudios oficial.

Para verlo local: `python -m http.server` en esta carpeta.

Kvothesson · Universo Austral.
