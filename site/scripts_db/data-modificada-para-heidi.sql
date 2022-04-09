CREATE DATABASE  IF NOT EXISTS `leaf_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `leaf_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: leaf_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `addresses`
--


/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` (street, number, cp, provinciaId, createdAt, updatedAt) VALUES ('Colegiales',3000,'1756',2,NULL,NULL),('Oran',1548,'A440',17,NULL,NULL),('Av. Don Bosco',3976,'B5000',6,NULL,NULL),('Cervantes',663,'3500',4,NULL,NULL),('La milagrosa',5000,'3300',14,NULL,NULL),('Tacuarí',1750,'W3400',7,NULL,NULL),('Av. Belgrano',975,'Z9311',20,NULL,NULL),('Av. San Martin',360,'Q8340',15,NULL,NULL),('Tucumán',383,'T4142EOG',24,NULL,NULL),('Av. Mitre',667,'D5730',19,NULL,NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;


--
-- Dumping data for table `authors`
--


/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` (nameLastname, createdAt, updatedAt) VALUES ('John Grisham',NULL,NULL),('John Katzenbach',NULL,NULL),('Markus Zusak',NULL,NULL),('H. G. Wells',NULL,NULL),('Florencia Bonelli',NULL,NULL),('Adam Silvera',NULL,NULL),('Jojo Moyes',NULL,NULL),('Carlos Ruiz Zafón',NULL,NULL),('Kerri Maniscalco',NULL,NULL),('Ariana Godoy',NULL,NULL),('Elena Castillo Castro',NULL,NULL),('Ana Coello',NULL,NULL),('Stephen King',NULL,NULL),('Carolina Andujar',NULL,NULL),('Clifford D. Simak',NULL,NULL),('Paulo Coelho',NULL,NULL),('Oscar Wilde',NULL,NULL),('Angel David Revilla',NULL,NULL),('Leigh Bardugo',NULL,NULL),('Emily Jane Brontë',NULL,NULL),('Arthur Conan Doyle',NULL,NULL), ('Bram Stoker',NULL,NULL), ('Alexandre Dumas',NULL,NULL), ('León Tostói',NULL,NULL), ('Julio Verne',NULL,NULL),('Franz Kafka',NULL,NULL),('Rachel Hartman',NULL,NULL);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;


--
-- Dumping data for table `books`
--


/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (title, isbn, stock, price, slogan, pages, synopsis,cover, pdf, qrCode, authorId, genreId, formatId, categoryId, editorialId, starId,language,createdAt, updatedAt) VALUES ('El manuscrito',9789506445584,100,1500,'¡Llega la esperadísima novela del maestro de los thrillers policiales y judiciales!',336,'Cuando el huracán Leo se desvía de su curso previsto para dirigirse hacia Camino Island, en la costa de Florida, la mayoría de sus habitantes decide abandonar la isla. Solo un pequeño grupo de irreductibles elige quedarse, entre ellos Bruce Cable, el propietario de la librería Bay Books. El huracán avanza destrozándolo todo y dejando casas derrumbadas, hoteles y tiendas destruidas, calles inundadas y una docena de muertos. Uno de los fallecidos es Nelson Kerr, amigo de Bruce y autor de thrillers. Pero los indicios sugieren que la tormenta no fue la causa de la muerte de Nelson: la víctima recibió numerosos golpes sospechosos en la cabeza. ¿Quién querría matar a Nelson? La policía local está sobrepasada por los efectos del huracán y no se encuentra en condiciones de ocuparse del caso. Pero Bruce comienza a preguntarse si algunos oscuros personajes de las novelas de su amigo podrían ser más reales que ficticios. Y en algún lugar del ordenador de Nelson está el manuscrito de su nueva novela. ¿Estará allí, en negro sobre blanco, la clave del caso? Bruce empieza a investigar y lo que descubre entre sus páginas es más impactante que cualquiera de los giros de las tramas de Nelson... y mucho más peligroso.','el-manuscrito.png',NULL,NULL,1,1,1,3,1,4,'Español',NULL,NULL),('El psicoanalista', 9789876278270, 150, 2100,'Novela que lanzo a la fama a John Katzenbach',
528,'Feliz aniversario, doctor. Bienvenido al primer día de su muerte. Así comienza el anónimo que recibe el psicoanalista Frederick Starks, y que le obliga a emplear toda su astucia y rapidez para, en quince días, averiguar quién es el autor de esa amenazadora misiva que promete hacerle la vida imposible. De no conseguir su objetivo, deberá elegir entre suicidarse o ser testigo de cómo, uno tras otro, sus familiares y conocidos mueren por obra de un psicópata decidido a llevar hasta el final su sed de venganza. Dando un inesperado giro a la relación entre médico y paciente, John Katzenbach nos ofrece una novela emblemática del mejor suspense psicológico.','el-psicoanalista.jpg',NULL,NULL,
2, 1, 1, 3,2,5,'Español',NULL, NULL),('La ladrona de libros',9788499088075,98,1900,'Una novela preciosa, tremendamente humana y emocionante, que describe las peripecias de una niña alemana de nueve años desde que es dada en adopción por su madre hasta el final de la II Guerra Mundial.',544,'Érase una vez un pueblo donde las noches eran largas y la muerte contaba su propia historia. En el pueblo vivía una niña que quería leer, un hombre que tocaba el acordeón y un joven judío que escribía bellos cuentos para escapar del horror de la guerra. Al cabo de un tiempo, la niña se convirtió en una ladrona que robaba libros y regalaba palabras. Con estas palabras se escribió una historia hermosa y cruel que ahora ya es una novela inolvidable.','la-ladrona-de-libros.jpg', NULL,NULL ,3,2,1,1,2,4,'Español',NULL,NULL),('La guerra de los mundos',9789563164411,47,2400,'¡Obra maestra de la Ciencia Ficción!',256,'Publicado en 1898, La guerra de los mundos es una de las piezas fundacionales de la ciencia ficción, en donde se crea el arquetipo por excelencia de este género: la visita de seres de otros mundos con intenciones hostiles, armados con pistolas de rayos y montados en estructuras biomecánicas. H. G. Wells describe en esta novela la invasión de un ejército de marcianos y los vanos esfuerzos desplegados por los humanos para impedirla. La humanidad, con toda su soberbia y falsa seguridad se ve obligada a replantearse el lugar en el universo.','la-guerra-de-los-mundos.jpg', NULL,NULL ,4,3,1,1,3,5,'Español',NULL,NULL),('La tía Cósima',9789877391480,85,2000,'¿Puede el amor regalar una segunda oportunidad?',576,'Una historia de cómo el amor vence al odio. Cósima es una mujer en la plenitud de la vida. Psicóloga de profesión y especializada en el tratamiento del autismo infantil, posee una fundación de enorme prestigio, donde se respira un ambiente cuidado y buen humor. Allí trabaja con perros especialmente adiestrados para ayudar a los niños con alguna condición del espectro autista. En su adolescencia, sin embargo, padeció la crueldad de algunos compañeros de escuela, experiencia que la marcó profundamente, al tiempo que le sirvió para convertirse en la mujer comprometida que es hoy. Si bien esa etapa de sufrimiento quedó atrás, un día irrumpe de nuevo para ofrecerle algo que quizá deseaba: un amor inesperado, una pasión que la desborda, un abismo de sorpresa e incertidumbre. ¿Podrá ese amor reparar el daño que no se olvida? ¿Podrá deshacer la vergüenza, la frustración y el enojo?','la-tia-cosima.jpg',NULL,NULL ,5,4,2,2,4,3,'Español',NULL,NULL),('Al final mueren los dos',9789874132017,185,1500,'¿Puede un solo día albergar toda una vida?',352,'En un presente alternativo, en el que es posible predecir la muerte con un plazo de veinticuatro horas, Mateo Torrez y Rufus Emeterio acaban de recibir la llamada más temida: la misma que te avisa de que ha llegado tu hora final. En circunstancias normales, es poco probable que Mateo y Rufus se hubieran conocido. Pero sus circunstancias no son normales en absoluto. Porque les quedan, a lo sumo, veinticuatro horas de vida.','al-final-mueren-los-dos.png',NULL,NULL ,6,4,2,2,6,3,'Español',NULL,NULL),('Yo antes de ti',9789870434665,65,3000,'Una historia que necesitas experimentar.',494,'Lo que Will no sabe es que Lou está a punto de irrumpir en su mundo con una explosión de color. Y ninguno de los dos sabe que va a cambiar al otro para siempre. Yo antes de ti reúne a dos personas que no podrían tener menos en común en una novela conmovedoramente romántica con una pregunta: ¿Qué decidirías cuando hacer feliz a la persona a la que amas significa también destrozarte el corazón?','yo-antes-de-ti.jpg',NULL,NULL ,7,4,1,2,4,4,'Español',NULL,NULL),('La sombra del viento',9789504956068,80,3100,'No te puedes perder esta saga, es una de las más grandes series de la novela contemporánea española',576,'El Cementerio de los Libros Olvidados, el cuarteto de novelas que arranca con La Sombra del Viento y sigue con El Juego del Ángel, se ha convertido en la gran saga novelística en curso de nuestro tiempo. Un amanecer de 1945, un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: El Cementerio de los Libros Olvidados. Allí, Daniel Sempere encuentra un libro maldito que cambia el rumbo de su vida y le arrastra a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad. La Sombra del Viento es un misterio literario ambientado en la Barcelona de la primera mitad del siglo xx, desde los últimos esplendores del Modernismo hasta las tinieblas de la posguerra.','sombra-del-viento.jpg',NULL,NULL ,8,5,2,3,5,5,'Español',NULL,NULL),('A la caza de Houdini',9789877391480,100,1800,'Un asesino termina con la vida de los pasajeros uno por uno… y no hay lugar adonde escapar',480,'Audrey Rose y Thomas Cresswell se encuentran a bordo de un lujoso transatlántico que se convierte en una horrorosa prisión flotante cuando un asesino termina con la vida de los pasajeros uno por uno… y no hay lugar adonde escapar. Al emprender un viaje de una semana por el océano Atlántico a bordo del opulento RMS Etruria, Audrey Rose Wadsworth y su compañero de investigaciones, Thomas Cresswell, se ven deslumbrados por una compañía itinerante de artistas de circo, videntes y un carismático joven escapista que entretienen por las noches a los pasajeros de la primera clase.','a-la-caza-de-houdini.png',NULL,NULL ,9,5,2,3,6,3,'Español',NULL,NULL),('A traves de mi ventana',9789877391480,64,1750,'Llega la novela fenómeno de Wattpad',416,'Ares Hidalgo, mi odioso y muy muy atractivo vecino, el chico al que acoso desde las sombras, nunca había notado mi presencia (porque básicamente lo observaba desde la sombras) hasta que una serie de eventos nos llevaron a interactuar por primera vez y... el hecho es que Ares cambió mi vida. ¿Para bien? ¿O para mal? Ya veremos. Mi nombre es Raquel, y esta es la historia que comenzó A través de mi ventana.','a-traves-de-mi-ventana.jpg',NULL,NULL ,10,6,2,3,7,3,'Español',NULL,NULL),('El teorema de júpiter',9788416327652,255,1400,'Una historia de amor, que va tomando retazos importantes de una vida compartida y a la vez hecha de diferentes perspectivas y que se nutre de cada sabiduría.',346,'Landon Frazier no solo es el popular quarterback del equipo de fútbol de Abbeville y un estudiante ejemplar, también es el hijo del médico de este pequeño pueblo descendiente de los primeros colonos Alabama. Cuando Malia, una pequeña creek de la reserva de Atmore entra en su vida, salvaje e inocente, la llena de nuevas tonalidades que descolocarán las bases de la tradicional vida sureña de su familia, descubriendo otra forma de mirar el mundo. Nacerá una amistad que crecerá con el paso de los años, a pesar de las reticencias y circunstancias de ambas familias y de sus propios miedos, revelándose unos sentimientos imparables.','el-teorema-de-jupiter.jpg',NULL,NULL ,11,4,2,2,8,4,'Español',NULL,NULL),('Luna I En la oscuridad',9789585986619,196,2000,'La primera entrega de una trilogía que promete al lector, fantasía, misterio e intriga en altas dosis...',396,'Luna I en la oscuridad Por Ana Coello ,No todas las decisiones son fáciles, menos si son resultado de la culpa y el dolor. Para Sara nada volvió a ser lo mismo desde la muerte de su madre. Y como si aquello no bastara, tuvo que mudarse a una nueva ciudad, incluso a otro país. Sara ansía escapar de todo aquello que le aflige, y cuando menos se lo espera, aparecen en su nueva escuela tres alumnos desconcertantes. Uno de ellos, Luca, le genera emociones inesperadas y contradictorias, y aunque lo eviten, ambos avanzarán hacia lo desconocido..., sin imaginar que no existe marcha atrás. Con Luna, primera entrega de la trilogía En la oscuridad, Ana Coello nos sumerge en una peligrosa novela romántica, con la que busca continuar el éxito en Wattpad, gracias a millones de lecturas de todas sus historias.','en-la-oscuridad-de-la-luna.jpg',NULL,NULL ,12,4,2,1,9,3,'Español',NULL,NULL),('Personas Desconocidas',9789588991269,200,2870,'Katzenbach nos ofrece un thriller de ritmo imparable, protagonistas convincentes y trama compleja pero fascinante al mismo tiempo.',475,'Una niña de trece años que desaparece sin dejar rastro. Cuatro jóvenes blancos asesinados. Dos policías retirados que no quieren o no pueden hablar. Un narcotraficante entre rejas con más información de la que debiera, y una pareja de policías empeñados en descubrir la verdad: una perfecta combinación para un thriller fenomenal, como solo John Katzenbach podría escribirlo.','Personas-desconocidas.jpg',NULL,NULL ,2,8,2,2,10,4,'Español',NULL,NULL),('Desesperación',9789877391480,74,3100,'Presenta muchas características habituales en la bibliografía del autor, como la lucha por la supervivencia, el enfrentamiento entre el bien y el mal, su naturaleza fantástica y un grupo de personajes variopintos protagonistas de la historia...',718,'En la interestatal 50, en el desértico y solitario tramo que atraviesa Nevada, un gato muerto ensartado en un cartel da la bienvenida al pequeño pueblo minero de Desesperación. Allí, un policía local poseído por un perverso ser se ha erigido en autoridad suprema y sanguinaria, y elige sus víctimas entre los escasos vehículos que circulan por carretera. Aquellos que mueren rápidamente son en realidad los más afortunados, ya que para los supervivientes Desesperación se convertirá en el escenario de una horrenda pesadilla.','desesperacion.jpg',NULL,NULL ,13,7,1,2,18,5,'Español',NULL,NULL),('El despertar de la sirena',9789585951099,120,1500,'El mar está lleno de peligros. Algunos son conocidos para el hombre... y otros no',134,'Han pasado trescientos años desde la última vez que Juraté, la sirena maldita, surcó las aguas del mar Báltico. Ya es hora de que regrese a la superficie en busca de un nuevo amor...','el-despertar-de-la-sirena.jpg',NULL,NULL ,14,7,2,2,11,3,'Español',NULL,NULL),('Los hijos de nuestros hijos',9789504935648,150,1900,'Dicen que vienen del futuro. Son los hijos de nuestros hijos.',186,'Un día de verano como otro cualquiera, se abre una puerta en el vacío y empiezan a salir cientos, miles, millones de personas procedentes de ninguna parte. Dicen que vienen del futuro. Son los hijos de nuestros hijos. Un peligro incontrolable acecha en el futuro, y se hace preciso cortar el puente que los ha traído a través del tiempo. Pero, como suele ocurrir en estos casos, alguien se deja, una puerta abierta... y aquí empiezan los verdaderos problemas de la novela de Clifford D. Simak.','los-hijos-de-nuestros-hijos.jpg',NULL,NULL ,15,3,1,3,14,4,'Español',NULL,NULL),('Veronica decide morir',9789504935605,140,2000,'Sueños y fantasías. Deseo y muerte. Locura y pasión',232,'Veronika es una joven completamente normal. Es guapa, no le faltan pretendientes y tiene un buen trabajo. Su vida transcurre sin mayores sobresaltos, sin grandes alegrías ni grandes tristezas. Pero no es feliz. Por eso, una mañana de noviembre, Veronika decide acabar con su vida. En el camino hacia la muerte, Veronika experimenta placeres nuevos y halla un nuevo sentido a la vida, un sentido que le había permanecido oculto hasta ahora, cuando tal vez sea demasiado tarde par echarse atrás. Veronika decide morir plantea que cada segundo de nuestra existencia optamos entre la alternativa de seguir adelante o de abandonar','veronika-decide-morir.jpg',NULL,NULL ,16,4,1,3,12,3,'Español',NULL,NULL),('El retrato de Dorian Gray',9789500755955,200,3200,'Un libro lleno de fascinación y encanto, fácil y difícil a la vez, y cuyo único protagonista y tema esencial es la belleza. Una de las pasiones que hacen vivir, dan sentido y fuerza al mundo.',256,'Basil Hallward es un artista que queda fuertemente impresionado por la belleza estética de un joven llamado Dorian Gray y comienza a admirarlo. Basil pinta un retrato del joven. Charlando en el jardín de Hallward, Dorian conoce a un amigo de Basil y empieza a cautivarse por la visión del mundo de Lord Henry. Exponiendo un nuevo tipo de hedonismo, Lord Henry indica que «lo único que vale la pena en la vida es la belleza, y la satisfacción de los sentidos». Al darse cuenta de que un día su belleza se desvanecerá, Dorian desea tener siempre la edad de cuando Basil le pintó en el cuadro. Mientras él mantiene para siempre la misma apariencia del cuadro, la figura retratada envejece por él. Su búsqueda del placer lo lleva a una serie de actos de lujuria; pero el retrato sirve como un recordatorio de los efectos de su alma, donde el retrato llevará la carga de su envejecimiento y sus pecados.','el-retrato-de-dorian-gray.jpg',NULL,NULL ,17,5,1,3,13,5,'Español',NULL,NULL),('Despues',9789506445614,100,2600,'Nació con una habilidad sobrenatural que su madre le insta a mantener en secreto y que le permite ver aquello que nadie puede y enterarse de lo que el resto del mundo ignora',248,'Jamie Conklin, el único hijo de una madre soltera, solo quiere tener una infancia normal. Sin embargo, nació con una habilidad sobrenatural que su madre le insta a mantener en secreto y que le permite ver aquello que nadie puede y enterarse de lo que el resto del mundo ignora. Cuando una inspectora del Departamento de Policía de Nueva York le obliga a evitar el último atentado de un asesino que amenaza con seguir atacando incluso desde la tumba, Jamie no tardará en descubrir que el precio que debe pagar por su poder tal vez es demasiado alto','despues.jpg',NULL,NULL ,13,8,1,3,1,5,'Español',NULL,NULL),('El libro negro',9789508701534,100,2400,'El universo se vuelve escalofriante cuando la vida se bifurca. Vuelve Dross con su primer libro de cuentos.',232,'La vida puede ser una verdadera mierda para algunas, que no la mayoría de las personas. Sin embargo, por lo menos un par de veces, a lo largo y ancho de esa vida, ésta elige un día para demostrarnos qué tanto asco puede dar. Esto les pasa a todos y cada uno de los seres humanos que habitan en este mundo, caprichosos o no, malos o buenos, simples o excéntricos: todos tienen una probada de qué tan mal pueden salir las cosas durante veinticuatro horas.Y para mí, ese día parece que va a ser hoy.”En los cuatro cuentos reunidos en este libro escabroso, David Ángel Revilla, alias Dross, nos revela detalles perturbadores de la deep web y que la vida jamás es lo que parece y que la existencia humana no es más que un recorte fugaz y lastimoso del universo.','el-libro-negro.jpg',NULL,NULL ,18,8,1,3,14,3,'Español',NULL,NULL),('Sombra y hueso',9788418002526,150,2000,'Sombra y Hueso es una aventura de fantasía, y novela de debut escrita por Leigh Bardugo.',416,'Alina Starkov no espera mucho de la vida. Se quedó huérfana después de la guerra y lo único que tiene en el mundo es a su amigo Mal. A raíz de un ataque que recibe Mal al entrar en La Sombra, una oscuridad antinatural repleta de monstruos que ha aislado el país, Alina revela un poder latente que ni ella misma sabía que tenía. Tras ese episodio, Alina es conducida a la fuerza hasta la corte real para ser entrenada como un miembro de los Grisha, un grupo de magos de élite comandado por un individuo misterioso que se hace llamar El Oscuro.','portada-1629763029228.jpg',NULL,NULL ,19,9,1,2,15,5,'Español',NULL,NULL),('Asedio y tormenta',9788415709367,140,2500,'Llega la esperada continuación de Sombra y hueso.',580,'Hay tres cosas de las que Alina jamás podrá escapar. Su pasado. Su poder. Y su destino. Alina pronto va a tener que enfrentarse a una terrible verdad. La oscuridad nunca muere.','cover-1634326634183.jpg',NULL,NULL ,19,9,1,2,15,5,'Español',NULL,NULL),('Ruina y ascenso',9788415709374,160,2700,'Al fin llega la conclusión de la trilogía Sombra y hueso.',580,'La capital ha caído. El Oscuro gobierna Ravka desde su trono de sombras.Ahora el destino de la nación está en manos de una Invocadora del Sol sin poderes, un rastreador caído en desgracia y los últimos vestigios de lo que alguna vez fue un gran ejército de magos.','portada-1629692644875.jpg',NULL,NULL ,19,9,1,2,15,5,'Español',NULL,NULL),('Cumbres borrascosas',9788491819431,194,3100,'Melancólico relato sobre el amor más allá de la muerte, la rivalidad entre hermanos y la venganza.',416,'La poderosa y hosca figura del atormentado Heathcliff domina Cumbres Borrascosas, novela apasionada y tempestuosa cuya sensibilidad se adelantó a su tiempo. Los brumosos y sombríos páramos de Yorkshire son el singular escenario donde se desarrolla con fuerza arrebatadora esta historia de venganza y odio, de pasiones desatadas y amores desesperados que van más allá de la muerte y que hacen de ella una de las obras más singulares y atractivas de todos los tiempos.','portada-1629696615473.jpg',NULL,NULL ,20,4,1,3,16,4,'Español',NULL,NULL),('El Sabueso de los Baskerville',9798542961620,190,2200,'Un caso que lleva al límite de lo racional el talento detectivesco de Sherlock Holmes y su infatigable compañero, el Doctor Watson.',190,'Un adinerado hombre de negocios es hallado muerto en las cercanías de su casa. Todo indica que su corazón se detuvo y las escasas pistas sugieren que estaba huyendo de alguien; o quizá de algo que nadie quiere nombrar: la maldición de los Baskerville, encarnada en un infernal sabueso de proporciones descomunales. Pero ya sea obra de un criminal o de una criatura fantasmal, Sherlock Holmes está dispuesto a agotar todas las hipótesis antes de admitir que el diablo ha decidido castigar a la familia Baskerville.','portada-1629776942495.jpg',NULL,NULL ,21,1,1,3,17,4,'Español',NULL,NULL), ( 'El mundo pérdido',9798725746969, 1000, 0, 'La novela fundacional del género de los dinosaurios creada en 1912 por el padre de Sherlock Holmes.', 240, 'La novela fundacional del género de los dinosaurios creada en 1912 por el padre de Sherlock Holmes. Primera novela del profesor Challenger, sobre una expedición a una meseta sudamericana en donde aún sobreviven animales prehistóricos.', 'el_mundo_perdido.jpg', 'el_mundo_perdido.pdf','qr-el-mundo-perdido.png',21,9,2,4,17,3,'Español', NULL, NULL), ( 'Drácula',9798721052927, 1000, 0, 'La leyenda del vampiro alcanzó un gran reconocimiento en este clásico de la literatura de terror.', 280, 'Antes de ser elevada por el cine y por innumerables series de novelas a uno de los puestos privilegiados del imaginario actual, la leyenda del vampiro alcanzó un gran reconocimiento en este clásico de la literatura de terror.', 'dracula.jpg', 'dracula.pdf','qr-dracula.png',22,7,2,4,19,4,'Español', NULL, NULL), ( 'La dama de las camelias',9781522718673, 1000, 0, 'Esta obra está inspirada en un hecho real de la vida de Alejandro relativo a un romance con Marie Duplessis joven cortesana de París que mantuvo distintas relaciones con grandes personajes de la vida social.', 144, 'Armand Duval, se enamora de la cortesana Marguerite Gautier, bella y trágica. No obstante, los convencionalismos sociales y la sombra de la tuberculosis acabarán por conducirles a la senda de las ilusiones perdidas.', 'la_dama_de_las_camelias.jpg', 'la_dama_de_las_camelias.pdf','qr-la-dama-de-las-camelias.png',23,4,2,4,20,4,'Español', NULL, NULL), ( 'Estudio en escarlata',9798415618875, 1000, 0, 'Primera novela de Sherlock Holmes.', 288, 'Primera novela de Sherlock Holmes. Un cadáver hallado en extrañas circunstancias en una casa deshabitada provoca que los agentes de policía de Scotland Yard se pierdan en divagaciones equivocadas.', 'estudio_en_escarlata.jpg', 'estudio_en_escarlata.pdf','qr-estudio_en_escarlata.png',21,1,2,4,17,4,'Español', NULL, NULL),( 'Guerra y paz',9781539504825, 1000, 0, 'La novela considerada obra cumbre de Tolstói.',620, 'Considerada obra cumbre de Tolstói. Guerra y paz alterna en su magnífica trama historias familiares con las vicisitudes del ejército napoleónico, la vida en la corte de Alejandro y las batallas de Austerlitz y Borodinó.', 'guerra_y_paz.jpg', 'guerra_y_paz.pdf','qr-guerra-y-paz.png',24,2,2,4,19,3,'Español', NULL, NULL),('La isla misteriosa',9798154299848, 1000, 0, 'El libro forma parte de una trilogía que además componen Veinte mil leguas de viaje submarino y Los hijos del capitán Grant.', 449, 'Cinco compañeros que no tienen nada salvo su ingenio para sobrevivir en una isla que muy pronto se mostrará llena de secretos, misterios y enigmas que jamás hubieran podido imaginar...', 'la_isla_misteriosa.jpg', 'la_isla_misteriosa.pdf','qr-la_isla_misteriosa.png',25,5,2,4,9,3,'Español', NULL, NULL),('Ana Karenina',9788427213838, 120, 1900, 'Todas las familias felices se parecen unas a otras, cada familia desdichada lo es a su manera', 582, 'El amor es una pasión que no se puede contener, y Ana Karénina será capaz de romper todo lo establecido por la sociedad que la rodea por ir tras él. Sin embargo, la desolación le impedirá abrazar la felicidad que tenía a su alcance. El realismo plasmado en esta obra dibuja con elegancia y precisión un imperio en decadencia.','anaKarenina.jpg',NULL,NULL,24,4,1,2,16,4,'Español',NULL,NULL),
('Miguel Strogoff',9786073169165, 100, 1400, '¿Podrá Miguel Strogoff superar las pruebas y peligros que le esperan?.', 582, 'Miguel Strogoff, correo del zar, es el encargado de transmitir un mensaje que puede salvar el imperio. Para ello debe viajar a través de Siberia, cruzando el territorio invadido por los feroces tártaros. ¿Podrá superar las pruebas y peligros que le esperan?.','miguelStrogoff.jpg',NULL,NULL,25,6,1,3,16,3,'Español',NULL,NULL),
('La casa del juez',9798488752481,85,1000,' Es uno de los relatos de fantasmas más impresionantes del período victoriano, una historia escalofriante y muy en la línea del género.', 80,'Un estudiante necesita un lugar solitario y tranquilo para concentrarse en sus estudios, encuentra una casa abandonada, y aunque los pueblerinos le advierten de extrañas presencias y de su anterior inquilino, un juez sin escrúpulos, su racionalidad le impide creer en la leyenda del lugar. Pero según pasan los días, la evidencia resulta innegable, la casa está maldita, hay ratas que le acosan y sobre todo una en especial que le vigila constantemente.','laCasaDelJuez.jpg',NULL,NULL,22,7,2,1,12,4,'Español',NULL,NULL),
('El collar de la reina',9781519418616,150,2100,'El asunto del collar de la reina, es tomado por el autor, que le da su toque, lleno de aventuras, intrigas y por supuesto, una historia de amor.', 600,'La situación en Francia para finales del Siglo XVIII era insostenible económicamente, el pueblo moría de hambre y frío, mientras que el clero, la nobleza y en especial la Reina María Antonieta de Austria, se daban la gran vida. El Cardenal de Rohan en un intento por comprar el favor de la Reina se ve estafado, y el pueblo francés pierde la confianza en sus políticos, que gastan millones en joyas, mientras ellos mueren de hambre.','el_collar_de_la_reina.jpg',NULL,NULL,23,2,1,3,19,4,'Español',NULL,NULL),
('La metamorfosis',9786070781247,100,2300,'Obra que continúa atrayendo a los lectores, no sólo por su bizarro argumento y la opresiva descripción del ambiente, sino por el claro reflejo de esta desesperanza que parece haberse apoderado del alma humana.',96,'La historia de Gregorio Samsa, un texto capaz de provocar múltiples interpretaciones y de anticipar la deshumanización de los tiempos modernos, ayudó a Kafka a erigirse como uno de los escritores más emblemáticos de la literatura moderna. Su intensidad y trascendencia es comparable al Ulises, de Joyce o a En Busca del tiempo perdido, de Proust.','laMetamorfosis.jpg',NULL,NULL,26,3,1,3,19,4,'Español',NULL,NULL),
('Seraphina',9780375866562,140,2000,'Para investigar un crimen, Seraphina se alía con el capitán de la guardia real. Pero todo el mundo tiene secretos, lo que oculta haría que la condenaran a muerte.',480,'En un reino mágico y sombrío en el que humanos y dragones conviven con una paz inestable, Seraphina acaba de entrar en el coro de la corte.  Poco después, una noticia atraviesa los muros de palacio: un miembro de la familia real ha sido asesinado. Inmediatamente, los cimientos de esa fachada de paz se resquebrajan.','seraphina.jpg',NULL,NULL,27,9,2,3,20,4,'Español',NULL,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;


--
-- Dumping data for table `carouselimages`
--


/*!40000 ALTER TABLE `carouselimages` DISABLE KEYS */;
INSERT INTO `carouselimages` (name,createdAt, updatedAt) VALUES ('banner1.png',NULL,NULL),('banner-redes.png',NULL,NULL),('banner-envio.png',NULL,NULL),('banner-recomenda-por-redes.png',NULL,NULL),('banner-registrate-libro-free.png',NULL,NULL);
/*!40000 ALTER TABLE `carouselimages` ENABLE KEYS */;


--
-- Dumping data for table `carts`
--


/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;


--
-- Dumping data for table `categories`
--


/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (name,createdAt, updatedAt) VALUES ('Más vendidos',NULL,NULL),('Novedades',NULL,NULL),('Recomendados',NULL,NULL),('Gratis', NULL, NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;


--
-- Dumping data for table `editorials`
--


/*!40000 ALTER TABLE `editorials` DISABLE KEYS */;
INSERT INTO `editorials` (name,createdAt, updatedAt) VALUES ('Plaza & Janés',NULL,NULL),('B de bolsillo',NULL,NULL),('Granica',NULL,NULL),('Suma',NULL,NULL),('Booket',NULL,NULL),('Puck',NULL,NULL),('Wattpad',NULL,NULL),('Ediciones Urano',NULL,NULL),('Penguin random house',NULL,NULL),('Ediciones B',NULL,NULL),('Montena',NULL,NULL),('Planeta',NULL,NULL),('Sudamericana',NULL,NULL),('Martínez Roca',NULL,NULL),('Hidra',NULL,NULL),('Alianza',NULL,NULL),('Ediciones Akal',NULL,NULL),('De Bolsillo',NULL,NULL),('Austral',NULL,NULL),('Nocturna',NULL,NULL);
/*!40000 ALTER TABLE `editorials` ENABLE KEYS */;


--
-- Dumping data for table `favourites`
--


/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;


--
-- Dumping data for table `formats`
--


/*!40000 ALTER TABLE `formats` DISABLE KEYS */;
INSERT INTO `formats` (name,createdAt, updatedAt) VALUES ('Libro',NULL,NULL),('Ebook',NULL,NULL);
/*!40000 ALTER TABLE `formats` ENABLE KEYS */;


--
-- Dumping data for table `genres`
--


/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` (name,createdAt, updatedAt) VALUES ('Policial',NULL,NULL),('Historica',NULL,NULL),('Ciencia-ficcion',NULL,NULL),('Romance',NULL,NULL),('Misterio',NULL,NULL),('Juvenil',NULL,NULL),('Terror',NULL,NULL),('Thriller',NULL,NULL),('Fantasia',NULL,NULL);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;


--
-- Dumping data for table `paymentmethods`
--


/*!40000 ALTER TABLE `paymentmethods` DISABLE KEYS */;

INSERT INTO `paymentmethods` (name,createdAt, updatedAt) VALUES ('Efectivo',NULL,NULL),('Visa',NULL,NULL),('Mastercard',NULL,NULL),('PayPal',NULL,NULL);
/*!40000 ALTER TABLE `paymentmethods` ENABLE KEYS */;


--
-- Dumping data for table `promos`
--


/*!40000 ALTER TABLE `promos` DISABLE KEYS */;
INSERT INTO `promos` (promoImage,createdAt, updatedAt) VALUES ('promo1.png',NULL,NULL),('promo2.png',NULL,NULL),('promo3.jpg',NULL,NULL),('promo4.png',NULL,NULL);
/*!40000 ALTER TABLE `promos` ENABLE KEYS */;


--
-- Dumping data for table `provincias`
--


/*!40000 ALTER TABLE `provincias` DISABLE KEYS */;
INSERT INTO `provincias` (NAME,price,createdAt, updatedAt) VALUES ('CABA',50,NULL,NULL),('Buenos Aires',100,NULL,NULL),('Catamarca',400,NULL,NULL),('Chaco',400,NULL,NULL),('Chubut',500,NULL,NULL),('Cordoba',420,NULL,NULL),('Corrientes',380,NULL,NULL),('Entre Ríos',250,NULL,NULL),('Formosa',200,NULL,NULL),('Jujuy',250,NULL,NULL),('La Pampa',290,NULL,NULL),('La Rioja',230,NULL,NULL),('Mendoza',350,NULL,NULL),('Misiones',300,NULL,NULL),('Neuquen',370,NULL,NULL),('Rio Negro',370,NULL,NULL),('Salta',370,NULL,NULL),('San Juan',200,NULL,NULL),('San Luis',220,NULL,NULL),('Santa Cruz',450,NULL,NULL),('Santa Fe',200,NULL,NULL),('Santiago del Estero',250,NULL,NULL),('Tierra del Fuego',600,NULL,NULL),('Tucumán',310,NULL,NULL);
/*!40000 ALTER TABLE `provincias` ENABLE KEYS */;


--
-- Dumping data for table `purchaseorders`
--


/*!40000 ALTER TABLE `purchaseorders` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseorders` ENABLE KEYS */;


--
-- Dumping data for table `rols`
--


/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` (name,createdAt, updatedAt) VALUES ('Usuario',NULL,NULL),('Administrador',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;


--
-- Dumping data for table `stars`
--


/*!40000 ALTER TABLE `stars` DISABLE KEYS */;
INSERT INTO `stars` (quantity,createdAt, updatedAt) VALUES ('1',NULL,NULL),('2',NULL,NULL),('3',NULL,NULL),('4',NULL,NULL),('5',NULL,NULL);
/*!40000 ALTER TABLE `stars` ENABLE KEYS */;


--
-- Dumping data for table `users`
--


/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (name, nickname, lastname, email, image, password,cardNumber, rolId,addressId,createdAt, updatedAt) VALUES ('Antonela','Anto','Espinola','antoespinola55@gmail.com','profile-users-default.png','Antonela123',NULL,2,NULL,NULL,NULL),('Eliana','Ely','Andrada','eliana.ag.95@gmail.com','image-1629944981970.png','Eliana123',NULL,2,NULL,NULL,NULL),('Lorena','Lore','Cohene Báez','loreley.cb15@gmail.com','profile-users-default.png','Lorena123',NULL,2,NULL,NULL,NULL),('Administrador','Leaf','Leaf','administrador@leaf.com','profile-users-default.png','Leaf123',NULL,2,NULL,NULL,NULL),('Fernando','FerScu','Scuderi','scuderi.f@hotmail.com','image-1630043062912.png','Fernando123',NULL,2,NULL,NULL,NULL),('Sofia','Fosi','Andrada','andradasomi@hotmail.com','image-1629942889174.png','Sofia123',NULL,1,7,NULL,NULL),('Maria','Mari','Alonzo','mama@gmail.com','image-1629943072153.png','Maria123',NULL,1,2,NULL,NULL),('Gabriel','Gabi','Carrizo','gabriel@gmail.com','profile-users-default.png','Gabriel123',NULL,1,4,NULL,NULL),('Juan',NULL,'De Giorgi','Juan-giorgi@gmail.com','profile-users-default.png','Juan123',NULL,1,3,NULL,NULL),('Gonzalo','Gonza','Gonzales','gonzalo@gmail.com','profile-users-default.png','Gonzalo123',NULL,1,5,NULL,NULL),('Enzo','En?','Aguero','enzo@gmail.com','profile-users-default.png','Enzo123',NULL,1,6,NULL,NULL),('Bernardo','Bernard','Dinarte','Bernardo@gmail.com','profile-users-default.png','Bernardo123',NULL,1,8,NULL,NULL),('Roberto','Robert','Veintemilla','roberto@gmail.com','profile-users-default.png','Roberto123',NULL,2,9,NULL,NULL),('Eric','profe','Mena','eric@gmail.com','profile-users-default.png','Eric123',NULL,2,10,NULL,NULL),('Jose','Seba','Araya','Jose@gmail.com','profile-users-default.png','Jose123',NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15 18:29:49
