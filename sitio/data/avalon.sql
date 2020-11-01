-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: avalon
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `id_usuario_idx` (`id_usuario`),
  KEY `id_producto_carrito_idx` (`id_producto`),
  CONSTRAINT `id_producto_carrito` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario_carrito` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (11,2,26,0);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Mouse'),(2,'Teclado'),(3,'Grafica'),(4,'Procesador'),(5,'Disco'),(6,'Fuente'),(7,'Memoria'),(8,'Motherboard'),(9,'Auricular'),(10,'Gabinete'),(11,'Monitor');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialdecompras`
--

DROP TABLE IF EXISTS `historialdecompras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialdecompras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` int(7) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_total` int(7) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario_idx` (`id_usuario`),
  KEY `id_producto_idx` (`id_producto`),
  CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialdecompras`
--

LOCK TABLES `historialdecompras` WRITE;
/*!40000 ALTER TABLE `historialdecompras` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialdecompras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` int(7) NOT NULL,
  `descuento` int(100) NOT NULL,
  `descripcion` varchar(950) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `masvendido` int(11) DEFAULT 0,
  `mejorproducto` int(11) DEFAULT 0,
  `categoria_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria_fk_idx` (`categoria_id`),
  CONSTRAINT `categorias:fk` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (20,'Mouse Corsair HARPOON',9400,0,'El mejor aliado para lo que necesites. Usá tu Corsair Harpoon RGB Gaming en la oficina, en tu casa o donde quieras y navegá en tus dispositivos sin límites.El mouse de juego te ofrecerá la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudará a que te desplaces rápido por la pantalla. Además, su sistema de detección de movimiento óptico te permitirá mover el cursor de una manera más precisa y sensible que en los sistemas tradicionales. Con sus 6 botones podrás tener mayor control e independencia para ejecutar.','imagen1602284638704.jpg',1,0,1),(21,'Mouse Razer Naga Trinity ',12600,0,'El nuevo mouse para juegos Razer Naga Trinity se postula como el más versátil del mercado, gracias al uso de tres laterales intercambiables que proporcionan diferentes botoneras y con distintas disposiciones, de manera que el usuario podrá poner y quitar la que quiera dependiendo del uso que vaya a darle cada momento. ','imagen1602284703148.jpg',0,1,1),(22,'Mouse Logitech G502',8200,20,'Obtén la máxima precisión de seguimiento de nuestro sensor óptico con mejor capacidad de respuesta (PMW3366). La exclusiva tecnología de sensor óptico Logitech G Delta Zero™ minimiza la aceleración del ratón y aumenta la fiabilidad al apuntar. Cambia sobre la marcha el valor de dpi con cinco valores a elegir: de 200 a 12.000 dpi.','imagen1602284749001.jpg',0,0,1),(23,'Teclado Razer Blackwidow Elite',22000,0,'Si deseas un teclado gaming, el Razer BlackWidow siempre ha sido una de las mejores opciones, y a partir de ahora o será más aún gracias a la llegada del nuevo Razer BlackWidow Elite, el cual quiere hacer aún más grande la leyenda de la marca californiana. Veamos todos los secretos que esconde esta nueva genialidad.','imagen1602284795774.jpg',1,0,2),(24,'Teclado Logitech G513',17200,30,'Logitech G513 es uno de los mejores teclados mecánicos que podemos encontrar en el mercado, se trata de un modelo equipado con los avanzados switches Romer-G, que se han diseñado de forma específica para los videojuegos, o los nuevos GX Blue.','imagen1602284858797.png',0,0,2),(25,'Teclado Corsair K95 RGB',28000,0,'¡Cómo nos gusta probar teclados! ¡Y más cuando son exclusivas! Hemos recibido el Corsair K95 RGB Platinum uno de los mejores teclados del mercado. Con un diseño renovado, con interruptores Cherry MX RGB Speed y una calidad de construcción impecable. ¿Quieres saber más? ¡No te pierdas nuestro análisis!','imagen1602284906656.jpg',0,1,2),(26,'ASUS CERBERUS GTX 1050TI 4GB ',23500,0,'Diseñada para ofrecer un alto rendimiento y poder jugar sin descanso. Olvídate de sobre calentamientos. Lleva incorporado un procesador gráfico GeForce GTX 1050 Ti con una frecuencia de 1366 MHz. ','imagen1602285001391.jpg',1,0,3),(27,'MSI V809-2000R NVIDIA GeForce GT 710 2GB',10000,10,'Esta MSI V809 externa de 200 gramos familia de la marca NVIDIA, ha sido especialmente pensada para revivir un equipo antiguo y darle unos años más de vida.','imagen1602285090999.jpg',0,0,3),(28,'Gigabyte GV-RX580 – GAMING-8GD',35000,0,'Esta Gigabyte GV-RX580 pertenece a la familia de los procesadores gráficos AMD. En concreto, el procesador gráfico que lleva integrado es el Radeon RX 580 de una frecuencia de 1355 MHz, pudiendo obtener una máxima resolución de 7680 x 4320 pixeles.','imagen1602285141680.jpg',0,1,3),(29,'Procesador Ryzen 9 3900x ',56800,0,'El mejor procesador del momento es el Ryzen 9 3900X, que está más orientado a prosumidores y gente que tenga el dinero para gastarse en obtener el mejor procesador para una plataforma generalista para juegos. Sus doce núcleos con multihilo son estupendos para tareas de codificación de vídeo mientras se juega, para renderizado y todo tipo de tareas profesionales. ','imagen1602285190347.jpg',0,0,4),(30,'Procesador Core i7-10700k',44400,0,'Productividad y entretenimiento, todo disponible en computadoras de escritorio. La superioridad tecnológica de Intel es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.','imagen1602285226031.jpg',0,0,4),(31,'Procesador Ryzen 7 3700x',44100,0,'Clave en el rendimiento de computadoras de escritorio, ya no tenés que pensar en cómo distribuir el tiempo y acciones: ahora todas las tareas en simultáneo son posibles. AMD cuenta con un catálogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en línea, edición a gran escala, contenido en múltiples plataformas y más.','imagen1602285259165.jpg',0,0,4),(32,'Disco Seagate Barracuda',4410,0,'Almacene más, realice procesos computacionales más rápido y trabaje con mayor confianza gracias a la fiabilidad que proporcionan las unidades de disco duro internas BarraCuda  ','imagen1602285289569.jpg',0,0,5),(33,'Disco Western Digital Blue',44100,0,'Los discos WD Blue proporcionan rendimiento, fiabilidad y capacidad, lo que los convierte en una excelente solución para los usuarios del día a día','imagen1602285327663.jpg',0,0,5),(34,'Disco Seagate FireCuda',44100,0,'Almacene videojuegos y juegue con ellos más rápidamente con una unidad SSHD interna que ofrece la capacidad de una unidad HDD y el rendimiento de una unidad SSD','imagen1602285371614.jpg',0,0,5),(35,'Fuente NOX NX 750W ',44100,0,'Una fuente que, al igual que las demás pertenecientes a la NX Series, convierte el poder más extremo en un flujo de energía estable gracias, entre otras cosas, a su PFC activo. ','imagen1602285413593.jpg',0,0,6),(36,'Fuente EVGA SuperNOVA 80 Plus Gold ',44100,0,'El poder de la EVGA SuperNOVA 750 G3, basada en la serie G2 ganadoras de premios fuentes de alimentación de EVGA, esta fuente de alimentación cuenta con 80 Plus Gold eficiencia nominal, y la energía limpia y continua de todos los componentes. ','imagen1602285449588.jpeg',0,0,6),(37,'Fuente Corsair VS650',44100,0,'La fuente de alimentación CORSAIR VS650 es una gran elección si está montando un sistema doméstico o de oficina menos exigente, pero necesita la compatibilidad y la fiabilidad que han hecho célebres a CORSAIR.','imagen1602285486598.png',0,0,6),(38,'Memoria Corsair Vengeance RGB Pro LED 16GB 3,200MHz ',44100,0,'Los kits de memoria Vengeance RGB Pro LED de Corsair son un punto medio perfecto entre su línea Platinum más visualmente impresionante y la gama LPX más discreta. Al igual que esos kits, ofrece un rendimiento fantástico y hay muchas opciones para elegir. ','imagen1602285572169.jpeg',0,0,7),(39,'Memoria G.Skill TridentZ RGB 16GB 3,200MHz ',44100,0,'G.Skill fabrica excelentes productos de memoria y su línea TridentZ cubre toda la gama, desde la hermosa gama Royal con incrustaciones de joyas hasta las series de juegos más optimizadas. ','imagen1602285585142.jpeg',0,0,7),(40,'Memoria Patriot Viper Elite 8GB 2,666MHz',44100,0,'Viper Elite te ofrece un rendimiento DDR4 de nivel básico en un kit muy asequible. Por ser solo una tarjeta deja espacio para una actualización económica a 16 GB en el futuro.','imagen1602285613764.jpeg',0,0,7),(41,'Motherboard ASRock B550 Phantom Gaming Velocita',44100,0,'Esta placa de ASRock puede ser la más polivalente que presenta el fabricante para este chipset de gama media. Nos propone una placa con un elegante diseño gaming propio de una gama alta también con características bastante similares a una X570. Será gran opción para aquellos que no puedan permitirse la serie PG con X570 pero quieran si espectacular diseño.','imagen1602285641338.jpg',0,0,8),(42,'Motherboard B550I AORUS PRO AX',44100,0,'Esta pequeña maravilla de AORUS cuenta con potencia suficiente para albergar las CPU más potentes de AMD gracias a un VRM de 8 fases a 90A con MOSFETS que equipa la AORUS Master, por ejemplo. Tampoco se ha descuidado la conectividad, ya que cuenta con doble ranura M.2, la ranura de expansión x16 con refuerzo de acero y dos buenos puertos de vídeo integrados para una posible APU Ryzen 4000G. Y nunca debe faltar conexión Wi-Fi 6 integrada, LAN 2,5G y tarjeta de sonido ALC1220 de gama alta.','imagen1602285683616.jpg',0,0,8),(43,'Motherboard MSI MPG B550 Gaming Carbon Wi-Fi',44100,0,'Una de las placas que mayor velocidad de memorias RAM soporta en esta plataforma B550 llegando hasta los 5100 MHz gracias a DDR4 BOOST. La Gaming Carbon Wi-Fi es otra placa clásica en la lista de los gamers, al unir una brutal estética, altas prestaciones sin faltarle un detalle, y un precio algo por debajo de la competencia, por ejemplo, la ROG Strix Gaming-E de Asus.','imagen1602285721340.jpg',0,0,8),(44,'Auricular Logitech G432 Gaming Surround',44100,0,'Uno de los auriculares baratos más vendidos desde hace bastante es el Logitech G430, pero el modelo se ha actualizado ligeramente tanto en diseño como en prestaciones. Todavía sigue siendo un headset de tipo alámbrico totalmente compatible con PC y consola, ya que cuenta con entrada Jack 3,5 mm y adaptador USB con DAC gestionable desde software Gaming G HUB.','imagen1602285761612.jpg',0,0,9),(45,'Auricular Giants Gear H60',44100,0,'No podía faltar la presencia de unos auriculares estéreo con drivers de 53 mm que aportan un sonido sorprendentemente bueno, claro y muy detallado. Su liviano peso y el diseño circumaural con diadema en doble puente, los hacen aptos para prácticamente cualquier usuario. Son realmente cómodos, tal y como demostraron en nuestro análisis que dejaremos más abajo.','imagen1602285802579.jpg',0,0,9),(46,'Auricular Corsair HS35',44100,0,'Este headset es uno de los más económicos del fabricante, y aunque no es un portento en lo que a diseño se refiere, tenemos una muy buena calidad de sonido y conexión Jack para ofrecer compatibilidad prácticamente con cualquier plataforma.','imagen1602285843025.jpg',0,0,9),(47,'Gabinete Nox Hummer MC',44100,0,'Este chasis solo flojea en una cosa, y es que su ventana lateral es acrílica por lo que no tenemos cristal templado, así que cuidadito con los arañazos. Cuenta con iluminación LED de 7 colores en todo su frontal y en la zona interior. En su panel I/O tenemos dos botones para el control de velocidad de los ventiladores, de los cuales tenemos dos preinstalados de 120 mm.','imagen1602285900585.jpg',0,0,10),(48,'Gabinete Thermaltake Core V1',44100,0,'Como ves es un chasis de pequeñísimas dimensiones capaz de albergar mucho en su interior. Dispone de dos cámaras para separar cableado y componentes con un diseño muy particular pero muy personalizable. Tiene dos paneles intercambiables para elegir que queremos ver.','imagen1602285935921.jpg',0,0,10),(49,'Gabinete Antec P7',44100,0,'Ya nos gustó bastante la Antec P6 hasta el punto de recomendarla, y ahora no podemos dejar atrás esta nueva iteración con un aspectos mejorado, mucho más actual, refinado y con un frontal sobrio y muy elegante. Incluye una ventana de cristal templado ahumado, frontal completamente y un panel de puertos bastante original.','imagen1602285970643.jpg',0,0,10),(50,'Monitor ViewSonic VA2719-SH',44100,0,'Otro monitor bastante interesante es este que nos propone ViewSonic con un increíble precio para tener un panel IPS con tecnología Super Clear entregando 300 nits de brillo máximo. Incluye por supuesto tecnología Flicker Free, aunque no FreeSync, que sería ya una ventaja por este bajo coste.','imagen1602285995352.jpg',0,0,11),(51,'Monitor ASUS VZ279HE-W',44100,0,'Este monitor ya lleva unas cuantas actualizaciones en su haber para estar siempre a la última en prestaciones y certificaciones de calidad pese a ser uno de los más económicos de la lista. Actualmente el mínimo que podemos pedir para un equipo que se precie es una pantalla de 27 pulgadas como esta, y además con marcos ultra delgados y un grosor de solamente 7 mm.','imagen1602286022383.jpg',0,0,11),(52,'Monitor HP 27fwa',44100,0,'El siguiente monitor que vemos también es considerado de los básicos, estando en torno a los 200 euros con un panel de tipo IPS con 27 pulgadas. Al igual que el anterior, sus marcos se han reducido lo máximo posible hasta solo tener uno inferior físico.','imagen1602286054409.jpg',0,0,11);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` int(11) NOT NULL,
  `telefono` int(20) NOT NULL,
  `rol` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT 'default.png',
  `provincia` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localidad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Emiliano','Rivarola','emi_rivarola@hotmail.com','$2b$10$wsSnoprVRHoj7/.Awr2S/us9FyrRP0E9fyJc//noYH0OcHO/Lgi1q',41072894,1231231231,'user','default.png','hola','como','estas'),(3,'admin','admin','admin@hotmail.com','$2b$10$WT.aMNULHCKxWCxjGrV4RObPZG16026xeKWDjsSe99XHyR2Li.5uW',1234567891,1234567891,'admin','avatar1602524342221.png','','',''),(6,'prueba','prueba','prueba@hotmail.com','$2b$10$.V4PUA1G0xYIp8qYalcMa.LbL7QCxDupqkwawjY1BrL9y68g80cc6',123456789,1234567891,'user','avatar1602450511589.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-12 14:46:54
