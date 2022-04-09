# LEAF Librería 📖

<img src="./design/LEAF-TRANSPARENTE-LOGO.jpg" alt="Logo LEAF librería" width="150"/>

## Tabla de contenidos 🗺️:

1. **[Objetivo](#objetivo)**
1. **[Tecnologías utilizadas](#tecnologías-utilizadas)**
1. **[Instalación del proyecto](#instalación-del-proyecto)**
1. **[Instalación de la base de datos](#instalación-de-la-base-de-datos)**
1. **[Rutas](#rutas)**
1. **[Sobre nosotros](#sobre-nosotros)**
1. **[Grupo 8-equipo de trabajo](#equipo-de-trabajo)**
1. **[¿Quiénes somos?](#leaf)**
1. **[Temática del market place](#temática-del-market-place)**
1. **[Sitios de referencia](#sitios-de-referencia)**
1. **[Tipografías del proyecto](#tipografías-del-proyecto)**
1. **[Paleta de colores del proyecto](#paleta-de-colores-del-proyecto)**
1. **[Disclaimer](#disclaimer)**

***
## Objetivo:

Realizar, en equipo con la metodología SCRUM, un e-commerce desde la maquetación hasta la funcionalidad.
***
## Tecnologías utilizadas:

<p align="left">
<!-- NODE JS -->
<a href="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" target="_blank" data-bs-toggle="tooltip" title="node js"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node js"/></a>
<!-- EXPRESS -->
<a href="https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction" alt="Express Js" data-bs-toggle="tooltip" title="EXPRESS" ><img src= "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
<!-- MYSQL -->
<a href="https://www.mysql.com/" alt="MYSQL" data-bs-toggle="tooltip" title="MYSQL" ><img src= "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /></a>
<!--JAVASCRIPT-->
<a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" data-bs-toggle="tooltip" title="JavaScript"> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javaScript"/> </a>
<!-- HTML -->
<a href="https://developer.mozilla.org/es/docs/Web/HTML" alt="HTML5" data-bs-toggle="tooltip" title="HTML" ><img src= "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /></a>
<!-- CSS-->
<a href="https://www.w3schools.com/css/" target="_blank" data-bs-toggle="tooltip" title="CSS3"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css3"/> </a>
<!-- BOOTSTRAP -->
<a href="https://getbootstrap.com" target="_blank" data-bs-toggle="tooltip" title="Bootstrap"> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="bootstrap"/></a>
</p>

***
## Instalación del proyecto

### Desde la terminal:

- Clonar el proyecto:
````
git clone https://github.com/Leaf-libreria/grupo_8_LEAF.git
````

- Ingresar a la carpeta del proyecto: 
````
cd grupo_8_LEAF
cd site
````
- Para instalar las dependencias correr (desde la carpeta site): 
````
npm install
````
***
## Instalación de la base de datos:

### Desde la terminal:
**Debe estar posicionado en la carpeta site**
-  Ejecutar para crear la db:
````
 sequelize db:create
 ````
- Correr las migraciones: 
````
sequelize db:migrate
````
- Poblar la tabla con los datos: 

**Debe tener instalado un gestor de base de datos, por ejemplo: MYSQL Workbench (https://www.mysql.com/products/workbench/) o Heidi db (https://www.heidisql.com/).**

- Desde su gestor de base de datos, correr el script que se encuentra en:

   `site/scripts_db/db-data-leaf.sql`

- Levantar el servidor para la base de datos desde su gestor de base de datos.

### Levantar el servidor puerto 3000: 
````
npm start
````
***
## Rutas:

|Página|Ruta|Tipo usuario|
|--------|--------|----|
|   Home    |   http://localhost:3000/| Todos|
|    Más vendidos    |    http://localhost:3000/products/categoria/M%C3%A1s%20vendidos    |Todos|
|   Novedades    |    http://localhost:3000/products/categoria/Novedades   |Todos|
|    Recomendados   |    http://localhost:3000/products/categoria/Recomendados  |Todos|
|    ¿Quiénes somos?    |    http://localhost:3000/quienesSomos|Todos    |
|Preguntas frecuentes| http://localhost:3000/preguntasFrecuentes|Todos|
|Formato libros|http://localhost:3000/products/formato/|Todos|
|Géneros|http://localhost:3000/products/genero/|Todos|
|Autores|http://localhost:3000/products/autor/|Todos|
|Editoriales|http://localhost:3000/products/editorial/|Todos
|Detalle de producto|http://localhost:3000/products/detalle/$id|Todos|
|Login|http://localhost:3000/users/login|Todos|
|Registro de usuario|http://localhost:3000/users/register|Todos|
|Libros gratis| http://localhost:3000/products/descarga/libro|Usuario registrado|
|Carrito|http://localhost:3000/products/carrito|Usuario registrado|
|Formulario de pago|http://localhost:3000/products/pago|Usuario registrado|
|Panel de administración|http://localhost:3000/products/administrador|Administrador|
|Crud de productos|http://localhost:3000/products/administrador|Administrador|
|Crud de autores|http://localhost:3000/products/listadoAutores|Administrador|
|Crud de editoriales|http://localhost:3000/products/listadoEditorial|Administrador|
|Crud de géneros|http://localhost:3000/products/listadoGeneros|Administrador|
|Crud de Carrusel de imágenes|http://localhost:3000/products/agregarCarrusel|Administrador|
|Crud de promociones del home|http://localhost:3000/products/listadoPublicidad|Administrador|
|Crud de métodos de pago|http://localhost:3000/products/listadoMetodosPago|Administrador|
|Edición de rol de usuarios|http://localhost:3000/users/listadoUsuarios|Administrador|

***
## Sobre nosotros:
## Equipo de trabajo:

***- Eliana Andrada, 26 años.***
 - Soy estudiante de programación y de traducción en inglés. Me gusta mirar series y anime, andar en bici, escuchar música, mirar novelas y los gatitos.
 - Considero que la responsabilidad y la buena onda son pilares para el éxito en cualquier desafío.
 **Github: <a>https://github.com/Eliana995</a>**
 
***- Lorena Cohene Báez, 33 años.***
 - Técnica en industrias de procesos. Estudiante de programación web. Apasionada de la lectura y las manualidades.
 - Siempre buscando aprender y crecer como persona.
 **Github: <a>https://github.com/LorenaCoheneBaez</a>**
 
***- Antonela Espinola,  28 años.***
 - Estudiante autodidacta de programación, me gusta la tecnologia, los libros y los videojuegos.
 - Me considero una persona  responsable, que no se rinde fácilmente ante los obstáculos que puedan presentarse y que ama aprender cosas nuevas.
 **Github: https://github.com/AntonelaEspinola**

***- Fernando Alan Scuderi, 30 Años.***
 - Soy técnico químico, Chef, y estudiante de programación. Apasionado por el fútbol y amante de la naturaleza. 
 - Perseverante y dedicado. En busca de nuevos conocimientos que me permitan disponer de variadas herramientas para nuevas oportunidades.


#### Repositorio GitHub del proyecto:

https://github.com/Leaf-libreria/grupo_8_LEAF

***
## LEAF
## ***¿Quiénes somos?***

*Somos cuatro amantes de  la lectura, unidos por el  deseo de que este hobby  llegué a más personas y  convencidos de que a  través del mercado virtual podremos lograrlo. Porque hay un libro para  cada persona y para cada  momento, nuestro  objetivo es que esta  búsqueda sea placentera.*

*Nuestra marca surge de la  suma de las iniciales de  los integrantes del  proyecto (Lorena, Eliana,  Antonela, Fernando) ,  este anagrama que  además significa hoja en  inglés, nos llevó al  diseño del logo.*
*La hoja de otoño, es en  homenaje a todos esos  marcapáginas fuera de lo  común que alguna vez  usamos. Un símbolo con  el que, estamos  convencidos, todo lector  puede identificarse.*

***
## Temática del Market place:

*Nuestro market place está destinado a la venta y envío de libros físicos y electrónicos.*

*La audiencia objetivo es el público en general, de todas las edades, que se interesen por la lectura para entretenerse y aprender.* 

*Ajustamos nuestra oferta a adultos brindando comodidad y claridad para la búsqueda y la compra.* 
*A los niños y jóvenes ofreciendo una interfaz visual y sencilla.*

***

#### Sitios de referencia:

 -*Elegido por la distribución del Header, el home y el formato de sus formularios de registro y login:*
 
(https://librerianacional.com/)

 -*Estos sitios tienen una descripción de producto muy completa a simple vista, además de un fotter bien distribuido:*
 
(https://pre.tematika.com/)
(https://www.gandhi.com.mx/)

-*Por su carrito de compras:*

(https://www.libreriadonquijote.com.ar/)

-*Este sitio lo elegimos al ver que la distribución del home y el header, no era lo que buscabamos para nuestra web, por lo que decidimos usarlo como inspiracion para reubicar los elementos y que se ajuste a nuestra visión del e commerce:*

(https://www.cuspide.com/)

***

#### Tipografías del proyecto:

 -Source Sans Pro
 
 -KoHo
 
 ***

#### Paleta de colores del proyecto:

(https://paletasdecolores.com/paleta-de-colores-4254/)

***
### Disclaimer:

Si tiene alguna duda o sugerencia de mejora para el proyecto, no dude en comunicarse con nosotros.