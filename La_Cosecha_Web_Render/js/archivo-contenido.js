// Archivo de Panem · contenido editorial propio de la Web (no lo usa el videojuego).
// Textos originales del proyecto, escritos para el Archivo a partir de la continuidad de las películas de la
// saga de Katniss (decisión de dirección del 27-11-2026). No reproducen diálogos ni pasajes de las obras.
// canon: CANON_FACT (aparece en las películas) · CANON_COMPATIBLE (detalle del proyecto que no las contradice)
//        INTERPRETATION (lectura propia del Archivo).
export const FUENTE_PELICULAS = 'Películas de la saga (2012–2015)';
export const FUENTE_PROYECTO = 'Archivo de Panem · texto del proyecto';

// Ampliación de las fichas de los distritos 1–13.
export const DISTRITOS = {
  1: { canon: 'CANON_FACT', geografia: 'Cercano al Capitolio y el más favorecido de los distritos. Sus talleres trabajan piedras y metales preciosos para el consumo del Capitolio.', vida: 'Disfruta de comodidades que los distritos pobres no conocen. Muchos jóvenes se entrenan desde niños para presentarse voluntarios, y por eso sus tributos cuentan entre los profesionales.', simbolos: 'Brillo, lujo y prestigio. Su relación con el Capitolio se parece más a la de un proveedor favorito que a la de un distrito sometido.', destacados: 'Glimmer y Marvel (74.º); Gloss y Cashmere, vencedores que vuelven en el 75.º.' },
  2: { canon: 'CANON_FACT', geografia: 'Distrito montañoso de canteras. En su interior se excava la gran fortaleza conocida como el Hueso, el centro militar más importante del Capitolio.', vida: 'Proporciona agentes de la paz y piedra para las obras de Panem. Su lealtad al Capitolio es la más firme y su entrenamiento de tributos, el más disciplinado.', simbolos: 'Fuerza, orden y obediencia. Durante la guerra es el último gran bastión del Capitolio fuera de la ciudad.', destacados: 'Cato y Clove (74.º); Brutus y Enobaria (75.º).' },
  3: { canon: 'CANON_FACT', geografia: 'Distrito de fábricas y talleres electrónicos.', vida: 'Sus habitantes destacan por el ingenio técnico más que por la fuerza. En los Juegos suelen sobrevivir con trampas y conocimiento.', simbolos: 'La inteligencia como arma. En el 75.º, su saber técnico resulta clave para romper la arena.', destacados: 'Beetee Latier y Wiress, vencedores del 75.º.' },
  4: { canon: 'CANON_FACT', geografia: 'Distrito costero dedicado a la pesca.', vida: 'Los jóvenes crecen nadando, tejiendo redes y manejando arpones y tridentes. Es uno de los distritos que suelen aportar tributos profesionales.', simbolos: 'El mar, las redes y el tridente.', destacados: 'Finnick Odair, Mags y Annie Cresta.' },
  5: { canon: 'CANON_COMPATIBLE', geografia: 'Distrito de producción de energía para Panem.', vida: 'Su trabajo mantiene encendidas las luces del Capitolio, aunque sus propias casas no siempre disfrutan de ese suministro.', simbolos: 'La energía como dependencia: el Capitolio no funciona sin el Distrito 5.', destacados: 'La tributo apodada Comadreja (74.º), que muere al comer bayas venenosas.' },
  6: { canon: 'CANON_COMPATIBLE', geografia: 'Distrito del transporte: trenes, vehículos y aerodeslizadores.', vida: 'Mueve personas y mercancías por todo Panem, desde los trenes de los tributos hasta los convoyes de suministros.', simbolos: 'Las vías que unen los distritos y que el Capitolio controla.', destacados: 'Sus vencedores aparecen en el 75.º sin papel destacado.' },
  7: { canon: 'CANON_FACT', geografia: 'Distrito boscoso dedicado a la madera y el papel.', vida: 'Sus habitantes trabajan con hachas desde jóvenes, una destreza que en la arena se convierte en arma.', simbolos: 'El hacha y el bosque.', destacados: 'Johanna Mason, vencedora del 75.º.' },
  8: { canon: 'CANON_FACT', geografia: 'Distrito industrial de fábricas textiles.', vida: 'Vida obrera, turnos largos y fuerte presencia de agentes de la paz. Es de los primeros en levantarse tras la Gira de la Victoria.', simbolos: 'Sus telas visten al Capitolio. Durante la rebelión, su hospital bombardeado se convierte en símbolo de la crueldad del Capitolio.', destacados: 'Cecelia, vencedora del 75.º.' },
  9: { canon: 'CANON_COMPATIBLE', geografia: 'Distrito de campos de cereal.', vida: 'Su cosecha de grano alimenta a Panem. Apenas se le ve en la historia de Katniss.', simbolos: 'El grano como recurso esencial.', destacados: 'Sin tributos destacados en la continuidad de Katniss.' },
  10: { canon: 'CANON_COMPATIBLE', geografia: 'Distrito ganadero.', vida: 'Cría el ganado que acaba en las mesas del Capitolio.', simbolos: 'El trabajo del campo y la distancia con la capital.', destacados: 'Sin tributos destacados en la continuidad de Katniss.' },
  11: { canon: 'CANON_FACT', geografia: 'Enorme distrito agrícola de huertos y campos, rodeado de vallas y torres de vigilancia.', vida: 'Trabajo duro, castigos frecuentes y una población numerosa. La muerte de Rue y el homenaje de Katniss provocan allí uno de los primeros estallidos.', simbolos: 'El silbido de cuatro notas de Rue, que acaba siendo una señal compartida.', destacados: 'Rue y Thresh (74.º); Chaff y Seeder, vencedores del 75.º.' },
  12: { canon: 'CANON_FACT', geografia: 'Distrito minero de carbón en las montañas, el más pobre de Panem. La Veta es su barrio más humilde.', vida: 'Hambre, minas peligrosas y una valla que separa el distrito del bosque. Katniss caza allí de forma ilegal para alimentar a su familia.', simbolos: 'El sinsajo, el pan de Peeta y el fuego del vestuario de Cinna.', destacados: 'Katniss Everdeen, Peeta Mellark y Haymitch Abernathy. Tras el 75.º, el Capitolio lo bombardea y lo arrasa.' },
  13: { canon: 'CANON_FACT', geografia: 'Distrito subterráneo, que oficialmente fue destruido en los Días Oscuros.', vida: 'Sobrevivió bajo tierra gracias a su arsenal nuclear y a un pacto de no agresión con el Capitolio. Su vida es militar, racionada y estrictamente organizada.', simbolos: 'Disciplina y supervivencia. Desde allí, la presidenta Coin dirige la rebelión.', destacados: 'Alma Coin y Boggs. No participa en las cosechas.' },
};

export const CAPITOLIO = {
  canon: 'CANON_FACT',
  parrafos: [
    'El Capitolio es la capital y el centro de poder de Panem, construido en las Montañas Rocosas. Lo gobierna el presidente Snow.',
    'Sus ciudadanos viven en la abundancia y siguen modas extravagantes, mientras los distritos trabajan para abastecerlos. Para ellos, los Juegos del Hambre son un espectáculo televisado; para Panem, un recordatorio anual del castigo por la primera rebelión.',
    'En sus calles están el Centro de Entrenamiento, el escenario de las entrevistas y la avenida del desfile de los tributos, además de la mansión presidencial.',
  ],
  lugares: ['Mansión presidencial', 'Centro de Entrenamiento', 'Avenida del desfile', 'Escenario de entrevistas', 'Centro de Mando de los Vigilantes'],
};

// Personajes que no están en los datos compartidos: solo existen en el Archivo. district 0 = Capitolio.
export const PERSONAJES_EXTRA = [
  { name: 'Primrose Everdeen', district: 12, role: 'Hermana de Katniss', bio: 'La hermana pequeña de Katniss. Su nombre sale en la cosecha del 74.º y Katniss se presenta voluntaria para salvarla. Con el tiempo se forma como sanitaria.', traits: ['Compasiva', 'Sanadora', 'Valiente'] },
  { name: 'Gale Hawthorne', district: 12, role: 'Rebelde', bio: 'Amigo y compañero de caza de Katniss. Se ocupa de las familias de los dos mientras ella está en el Capitolio y después se une a la rebelión como soldado y estratega.', traits: ['Cazador', 'Combativo', 'Leal'] },
  { name: 'Effie Trinket', district: 0, role: 'Escolta del Capitolio', bio: 'Escolta del Distrito 12, encargada de la cosecha y del protocolo. Bajo su fachada del Capitolio acaba sintiendo verdadero aprecio por sus tributos.', traits: ['Protocolaria', 'Optimista', 'Leal'] },
  { name: 'Cinna', district: 0, role: 'Estilista', bio: 'El estilista de Katniss. Sus diseños de fuego la convierten en «la chica en llamas» y su vestido de sinsajo en la entrevista del 75.º le cuesta la vida.', traits: ['Creativo', 'Discreto', 'Rebelde'] },
  { name: 'Caesar Flickerman', district: 0, role: 'Presentador', bio: 'El presentador de las entrevistas de los Juegos desde hace décadas. Su simpatía ayuda a los tributos a ganarse al público.', traits: ['Carismático', 'Teatral'] },
  { name: 'Coriolanus Snow', district: 0, role: 'Presidente de Panem', bio: 'El presidente de Panem. Ve en Katniss una amenaza para su control y responde con amenazas, el Vasallaje y la guerra.', traits: ['Calculador', 'Implacable'] },
  { name: 'Seneca Crane', district: 0, role: 'Vigilante jefe', bio: 'El Vigilante jefe del 74.º. Su decisión de permitir dos vencedores le cuesta la vida.', traits: ['Ambicioso'] },
  { name: 'Plutarch Heavensbee', district: 0, role: 'Vigilante jefe · Rebelde', bio: 'El Vigilante jefe del 75.º y, en secreto, uno de los organizadores del plan rebelde para sacar a Katniss de la arena.', traits: ['Estratega', 'Doble juego'] },
  { name: 'Alma Coin', district: 13, role: 'Presidenta del Distrito 13', bio: 'La presidenta del Distrito 13 y líder de la rebelión. Quiere usar a Katniss como símbolo, pero su ambición resulta tan peligrosa como la de Snow.', traits: ['Fría', 'Ambiciosa', 'Estratega'] },
  { name: 'Mags Flanagan', district: 4, role: 'Vencedora · Mentora', bio: 'Vencedora anciana del Distrito 4 y mentora de Finnick. En el 75.º entra en la niebla para no retrasar a sus aliados.', traits: ['Sabia', 'Generosa'] },
  { name: 'Boggs', district: 13, role: 'Comandante', bio: 'El comandante del Distrito 13 que protege a Katniss durante la guerra y la ayuda a sobrevivir en el Capitolio.', traits: ['Leal', 'Protector'] },
];

// Estado de canon de los personajes de los datos compartidos (por nombre).
export const CANON_PERSONAJES = {
  'Katniss Everdeen': 'CANON_FACT', 'Peeta Mellark': 'CANON_FACT', Rue: 'CANON_FACT', Cato: 'CANON_FACT', Thresh: 'CANON_FACT', Clove: 'CANON_FACT',
  Glimmer: 'CANON_FACT', Marvel: 'CANON_FACT', 'Finnick Odair': 'CANON_FACT', 'Johanna Mason': 'CANON_FACT', 'Haymitch Abernathy': 'CANON_FACT',
  'Annie Cresta': 'CANON_FACT', 'Beetee Latier': 'CANON_FACT', Wiress: 'CANON_FACT', Cecelia: 'CANON_FACT', Chaff: 'CANON_FACT',
};

// Ampliación de las ediciones registradas.
export const EDICIONES = {
  10: { canon: 'CANON_FACT', parrafos: ['Una de las primeras ediciones televisadas, cuando los Juegos todavía eran un castigo crudo y poco espectacular. Coriolanus Snow, entonces estudiante, es mentor de una tributo del Distrito 12.', 'El videojuego no la incluye como campaña.'] },
  50: { canon: 'CANON_FACT', parrafos: ['El segundo Vasallaje de los Veinticinco: cada distrito envía el doble de tributos. Haymitch Abernathy gana al volver contra la arena su propio campo de fuerza, y el Capitolio castiga después a su familia.', 'Su campaña está retirada del videojuego; se conserva para partidas antiguas.'] },
  74: { canon: 'CANON_FACT', parrafos: ['Katniss se presenta voluntaria por Prim y entra en la arena con Peeta Mellark. La arena es un bosque con un lago y una Cornucopia.', 'Su alianza con Rue, la muerte de esta y el cambio de reglas que permite dos vencedores de un mismo distrito llevan al final de las bayas: Katniss y Peeta prefieren morir juntos a darle un único vencedor al Capitolio.'], hitos: ['Cosecha y voluntaria', 'Desfile de la chica en llamas', 'Puntuación de 11 en la sesión privada', 'Alianza con Rue', 'Cambio de reglas', 'Las bayas'] },
  75: { canon: 'CANON_FACT', parrafos: ['El tercer Vasallaje obliga a los vencedores a volver a la arena. La arena es un reloj: una isla con doce sectores que liberan un peligro distinto cada hora.', 'Varios vencedores y Plutarch Heavensbee preparan en secreto la huida de Katniss. Beetee dirige el plan del cable y Katniss rompe el campo de fuerza con una flecha. El aerodeslizador del Distrito 13 la rescata, pero el Capitolio captura a Peeta.'], hitos: ['Cosecha de vencedores', 'Vestido de sinsajo', 'Plataformas de agua', 'La niebla y la muerte de Mags', 'El descubrimiento del reloj', 'Los charlajos', 'La ruptura de la arena'] },
};

export const CRONOLOGIA = [
  { cuando: 'Días Oscuros', titulo: 'La primera rebelión', texto: 'Los distritos se alzan contra el Capitolio y son derrotados. El Distrito 13 se da por destruido.', canon: 'CANON_FACT' },
  { cuando: 'Tras la derrota', titulo: 'El Tratado de la Traición', texto: 'El Capitolio impone los Juegos del Hambre: cada año, un chico y una chica de cada distrito luchan a muerte.', canon: 'CANON_FACT' },
  { cuando: 'Año 10', titulo: '10.º Juegos del Hambre', texto: 'Los Juegos empiezan a convertirse en espectáculo televisado.', canon: 'CANON_FACT', juego: 10 },
  { cuando: 'Año 50', titulo: '2.º Vasallaje de los Veinticinco', texto: 'Doble de tributos. Haymitch Abernathy vence.', canon: 'CANON_FACT', juego: 50 },
  { cuando: 'Año 74', titulo: '74.º Juegos del Hambre', texto: 'Katniss y Peeta vencen juntos tras desafiar al Capitolio con las bayas.', canon: 'CANON_FACT', juego: 74 },
  { cuando: 'Entre el 74.º y el 75.º', titulo: 'La Gira de la Victoria', texto: 'Los vencedores recorren los distritos. En el 11 estalla la protesta y Snow exige a Katniss que calme el país.', canon: 'CANON_FACT', seccion: 'gira' },
  { cuando: 'Año 75', titulo: '3.er Vasallaje de los Veinticinco', texto: 'Los vencedores vuelven a la arena. Katniss rompe la arena y es rescatada por el Distrito 13.', canon: 'CANON_FACT', juego: 75 },
  { cuando: 'Tras el 75.º', titulo: 'Destrucción del Distrito 12', texto: 'El Capitolio bombardea el distrito. Los supervivientes huyen al Distrito 13.', canon: 'CANON_FACT', seccion: 'rebelion-y-guerra' },
  { cuando: 'Segunda rebelión', titulo: 'El Sinsajo', texto: 'Katniss acepta ser el símbolo de la rebelión. Los distritos se levantan uno tras otro y Peeta es rescatado del Capitolio.', canon: 'CANON_FACT', seccion: 'rebelion-y-guerra' },
  { cuando: 'Segunda rebelión', titulo: 'La caída del Capitolio', texto: 'Los rebeldes toman la ciudad. Un bombardeo ante la mansión presidencial mata a niños del Capitolio y a sanitarios rebeldes, entre ellos Prim.', canon: 'CANON_FACT', seccion: 'rebelion-y-guerra' },
  { cuando: 'Después de la guerra', titulo: 'Un nuevo Panem', texto: 'En la ejecución de Snow, Katniss dispara contra Coin. Los Juegos terminan y Katniss vuelve al Distrito 12.', canon: 'CANON_FACT', seccion: 'rebelion-y-guerra' },
];

export const LUGARES = [
  { id: 'plaza-distrito-12', nombre: 'Plaza del Distrito 12', grupo: 'Distrito 12', texto: 'Escenario de la cosecha, frente al Edificio de Justicia. Allí Katniss se presenta voluntaria por Prim.', canon: 'CANON_FACT' },
  { id: 'edificio-de-justicia', nombre: 'Edificio de Justicia', grupo: 'Distrito 12', texto: 'Sede de la autoridad del distrito. En sus salas se despiden los tributos de su familia antes de partir.', canon: 'CANON_FACT' },
  { id: 'la-veta', nombre: 'La Veta', grupo: 'Distrito 12', texto: 'El barrio minero más pobre del distrito, donde crecen Katniss y Gale.', canon: 'CANON_FACT' },
  { id: 'bosque-del-12', nombre: 'El bosque más allá de la valla', grupo: 'Distrito 12', texto: 'Zona prohibida donde Katniss y Gale cazan para sobrevivir.', canon: 'CANON_FACT' },
  { id: 'aldea-de-los-vencedores', nombre: 'Aldea de los Vencedores', grupo: 'Distrito 12', texto: 'Casas que el Capitolio regala a los vencedores. Es de lo poco que queda en pie tras el bombardeo.', canon: 'CANON_FACT' },
  { id: 'tren-de-los-tributos', nombre: 'Tren de los tributos', grupo: 'Viaje', texto: 'Tren de lujo que lleva a los tributos al Capitolio: la primera muestra de la abundancia que les espera.', canon: 'CANON_FACT' },
  { id: 'centro-de-entrenamiento', nombre: 'Centro de Entrenamiento', grupo: 'Capitolio', texto: 'Edificio donde se alojan y entrenan los tributos. En él tiene lugar también la sesión privada ante los Vigilantes.', canon: 'CANON_FACT' },
  { id: 'avenida-del-desfile', nombre: 'Avenida del desfile', grupo: 'Capitolio', texto: 'Recorrido de los carros de los tributos ante el público y el presidente.', canon: 'CANON_FACT' },
  { id: 'escenario-de-entrevistas', nombre: 'Escenario de entrevistas', grupo: 'Capitolio', texto: 'Plató donde Caesar Flickerman entrevista a cada tributo la víspera de los Juegos.', canon: 'CANON_FACT' },
  { id: 'mansion-presidencial', nombre: 'Mansión presidencial', grupo: 'Capitolio', texto: 'Residencia del presidente Snow, con su jardín de rosas. Es el objetivo final de la guerra.', canon: 'CANON_FACT' },
  { id: 'arena-74', nombre: 'Arena del 74.º', grupo: 'Arenas', texto: 'Bosque con un lago y la Cornucopia en un claro. Los Vigilantes la manipulan con fuego, mutos y anuncios de reglas.', canon: 'CANON_FACT', juego: 74 },
  { id: 'arena-75', nombre: 'Arena del 75.º', grupo: 'Arenas', texto: 'Isla en un lago salado con doce sectores dispuestos como un reloj: niebla, monos, olas, sangre, charlajos y un rayo que cae en el árbol cada doce horas.', canon: 'CANON_FACT', juego: 75 },
  { id: 'distrito-13-subterraneo', nombre: 'Distrito 13', grupo: 'Rebelión', texto: 'Complejo subterráneo militar desde donde se dirige la rebelión.', canon: 'CANON_FACT' },
  { id: 'el-hueso', nombre: 'El Hueso', grupo: 'Rebelión', texto: 'Fortaleza del Capitolio excavada en la montaña del Distrito 2. Su caída abre el camino a la capital.', canon: 'CANON_FACT' },
];

export const GIRA = {
  canon: 'CANON_FACT',
  entradilla: 'Seis meses después de los Juegos, los vencedores recorren Panem. El Capitolio quiere una historia de amor; los distritos han visto otra cosa.',
  etapas: [
    { titulo: 'La visita de Snow', texto: 'Antes de partir, el presidente visita a Katniss en su casa. Le exige que la gira convenza a Panem de que las bayas fueron amor y no desafío, y amenaza a quienes ella quiere.' },
    { titulo: 'Distrito 11', texto: 'Katniss habla de Rue y de Thresh ante sus familias. Un anciano responde con el saludo de tres dedos y los agentes de la paz lo ejecutan delante de todos.' },
    { titulo: 'El recorrido', texto: 'En cada distrito, el mismo discurso, la misma multitud vigilada y señales de que algo se mueve bajo la superficie.' },
    { titulo: 'El Capitolio', texto: 'Peeta propone matrimonio a Katniss ante las cámaras. A Snow no le basta.' },
    { titulo: 'Regreso al 12', texto: 'Llegan un nuevo jefe de agentes de la paz y castigos públicos. Poco después se anuncia el 3.er Vasallaje: los tributos saldrán de los vencedores.' },
  ],
};

export const REBELION = {
  canon: 'CANON_FACT',
  entradilla: 'Tras el 75.º, los distritos se levantan. Lo que empieza como un símbolo termina en una guerra abierta contra el Capitolio.',
  fases: [
    { titulo: 'Las cenizas del 12', texto: 'Katniss despierta en el Distrito 13 y descubre que su distrito ha sido arrasado. Peeta está en manos del Capitolio.' },
    { titulo: 'El Sinsajo', texto: 'Coin y Plutarch convierten a Katniss en el rostro de la rebelión con propaganda grabada en los distritos. Tras el bombardeo del hospital del Distrito 8, sus palabras recorren Panem.' },
    { titulo: 'La presa y el rescate', texto: 'Los rebeldes del Distrito 5 vuelan la presa hidroeléctrica que abastece al Capitolio. Un equipo rescata a Peeta, pero vuelve condicionado para odiar a Katniss.' },
    { titulo: 'El Hueso', texto: 'Los rebeldes toman la fortaleza del Distrito 2 y el distrito se une a la rebelión.' },
    { titulo: 'El asalto al Capitolio', texto: 'La unidad de Katniss avanza por calles sembradas de trampas. Mueren Finnick y Boggs entre otros, y la ciudad cae.' },
    { titulo: 'El final', texto: 'Un bombardeo ante la mansión mata a Prim. En la ejecución pública de Snow, Katniss dispara contra Coin. Después, Panem empieza de nuevo sin Juegos.' },
  ],
};

// Documentos del universo escritos para el Archivo. Son textos originales del proyecto, no citas de las obras.
export const DOCUMENTOS = [
  { id: 'bando-cosecha', tipo: 'Bando oficial', titulo: 'Convocatoria de la cosecha', fecha: 'Año 74', canon: 'INTERPRETATION', texto: ['Por orden del Capitolio, todos los habitantes del distrito de entre doce y dieciocho años se presentarán en la plaza el día de la cosecha.', 'La ausencia se castigará. Cada nombre inscrito permanecerá en la urna hasta que su titular cumpla la edad de exención.'] },
  { id: 'teselas', tipo: 'Registro', titulo: 'Sistema de teselas', fecha: 'Vigente', canon: 'CANON_FACT', texto: ['Cada candidato puede pedir una tesela: una ración anual de grano y aceite para una persona a cambio de inscribir su nombre una vez más.', 'Las familias pobres dependen de ellas, y por eso sus hijos tienen más papeletas en la urna.'] },
  { id: 'cambio-reglas-74', tipo: 'Comunicado de los Vigilantes', titulo: 'Cambio de reglas del 74.º', fecha: 'Año 74', canon: 'CANON_FACT', texto: ['Durante los Juegos se anuncia que dos tributos del mismo distrito podrán vencer juntos si son los últimos en pie.', 'Al final la norma se revoca, y la respuesta de los vencedores del Distrito 12 obliga a los Vigilantes a ceder.'] },
  { id: 'anuncio-vasallaje', tipo: 'Proclamación presidencial', titulo: 'Anuncio del 3.er Vasallaje', fecha: 'Año 75', canon: 'CANON_FACT', texto: ['Para recordar que ni los más fuertes están por encima del Capitolio, los tributos del Vasallaje se elegirán entre los vencedores vivos de cada distrito.'] },
  { id: 'parte-hueso', tipo: 'Parte militar rebelde', titulo: 'Caída del Hueso', fecha: 'Segunda rebelión', canon: 'INTERPRETATION', texto: ['La fortaleza del Distrito 2 ha caído. Se abre la ruta de suministro del Capitolio a los ejércitos rebeldes.'] },
];

export const GALERIA_NOTA = 'Todas las imágenes del Archivo son ilustraciones originales del proyecto. No se reproducen fotogramas, carteles ni imágenes de las películas.';
export const MAPA_NOTA = 'Esquema de navegación por industria. La geografía exacta de Panem no se representa: cada casilla abre su expediente.';
