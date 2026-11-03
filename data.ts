export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
}

export interface QuizQuestion {
  id: number;
  part: number;
  partTitleEs: string;
  partTitleHy: string;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  answer: 'A' | 'B' | 'C' | 'D';
  answerTextEs: string;
  answerTextHy: string;
}

export interface FootballTheme {
  id: number;
  es: string;
  hy: string;
  iconName: string;
  summaryEs: string;
  summaryHy: string;
  phrases: Array<{
    es: string;
    hy: string;
  }>;
}

export interface WheelSector {
  id: number;
  type: 'points' | 'bankrupt' | 'prize' | 'plus' | 'x2' | 'chance';
  label: string;
  sublabel?: string;
  value: number;
  color: string;
  textColor: string;
}

// 12 temas de fútbol
export const FOOTBALL_THEMES: FootballTheme[] = [
  {
    id: 1,
    es: "Mi entrenamiento diario",
    hy: "Իմ ամենօրյա մարզումը",
    iconName: "Dumbbell",
    summaryEs: "Rutinas físicas, ejercicios con balón y preparación táctica.",
    summaryHy: "Ֆիզիկական վարժություններ, գնդակով մարզումներ և տակտիկական պատրաստվածություն։",
    phrases: [
      { es: "Empiezo con un calentamiento de quince minutos.", hy: "Սկսում եմ տասնհինգ րոպեանոց նախավարժանքով։" },
      { es: "Practicamos tiros a puerta y centros.", hy: "Մարզում ենք հարվածներ դարպասին և փոխանցումներ։" },
      { es: "La condición física es clave para los noventa minutos.", hy: "Ֆիզիկական վիճակը վճռորոշ է իննսուն րոպեների համար։" }
    ]
  },
  {
    id: 2,
    es: "Hablar con el entrenador",
    hy: "Զրուցել մարզչի հետ",
    iconName: "MessageSquare",
    summaryEs: "Estrategias de juego, correcciones individuales y rol en el campo.",
    summaryHy: "Խաղային ռազմավարություն, անհատական շտկումներ և դեր խաղադաշտում։",
    phrases: [
      { es: "El míster me pide que juegue más pegado a la banda.", hy: "Մարզիչն ինձ խնդրում է ավելի շատ եզրով խաղալ։" },
      { es: "¿Qué aspectos debo mejorar para el próximo partido?", hy: "Ի՞նչ կողմեր պետք է բարելավեմ հաջորդ խաղի համար։" },
      { es: "Tenemos que presionar la salida del rival.", hy: "Պետք է ճնշում գործադրենք մրցակցի վրա գնդակը խաղարկելիս։" }
    ]
  },
  {
    id: 3,
    es: "Antes y después del partido",
    hy: "Խաղից առաջ և հետո",
    iconName: "Timer",
    summaryEs: "Charla técnica, concentración y recuperación física.",
    summaryHy: "Տակտիկական զրույց, կենտրոնացում և ֆիզիկական վերականգնում։",
    phrases: [
      { es: "Escuchamos la charla táctica en el vestuario.", hy: "Հանդերձարանում լսում ենք տակտիկական զրույցը։" },
      { es: "Hacemos estiramientos después del pitido final.", hy: "Եզրափակիչ սուլիչից հետո կատարում ենք ձգումներ։" },
      { es: "Un buen baño de hielo acelera la recuperación.", hy: "Սառույցով լավ լոգանքն արագացնում է վերականգնումը։" }
    ]
  },
  {
    id: 4,
    es: "Viajar con el equipo",
    hy: "Ճանապարհորդել թիմի հետ",
    iconName: "Plane",
    summaryEs: "Disciplina de grupo, logística y espíritu de equipo.",
    summaryHy: "Թիմային կարգապահություն, լոգիստիկա և թիմային ոգի։",
    phrases: [
      { es: "Viajamos todos vestidos con el chándal oficial.", hy: "Բոլորս ճանապարհորդում ենք պաշտոնական մարզահագուստով։" },
      { es: "La convivencia durante el viaje une al grupo.", hy: "Ճանապարհորդության ընթացքում շփումը միավորում է խմբին։" },
      { es: "Revisamos los billetes y la documentación antes de salir.", hy: "Մեկնելուց առաջ ստուգում ենք տոմսերն ու փաստաթղթերը։" }
    ]
  },
  {
    id: 5,
    es: "En el autobús del equipo",
    hy: "Թիմի ավտոբուսում",
    iconName: "Bus",
    summaryEs: "Música, concentración mental y trayecto al estadio.",
    summaryHy: "Երաժշտություն, մտավոր կենտրոնացում և ճանապարհ դեպի մարզադաշտ։",
    phrases: [
      { es: "Muchos jugadores escuchan música para concentrarse.", hy: "Շատ խաղացողներ երաժշտություն են լսում կենտրոնանալու համար։" },
      { es: "Vemos vídeos de jugadas del rival durante el trayecto.", hy: "Ճանապարհին դիտում ենք մրցակցի խաղերի տեսագրությունները։" },
      { es: "Al llegar al estadio vemos a los aficionados animando.", hy: "Մարզադաշտ հասնելիս տեսնում ենք երկրպագուների աջակցությունը։" }
    ]
  },
  {
    id: 6,
    es: "En el aeropuerto",
    hy: "Օդանավակայանում",
    iconName: "Luggage",
    summaryEs: "Facturación de maletas, controles de seguridad y puertas de embarque.",
    summaryHy: "Ուղեբեռի հանձնում, անվտանգության ստուգում և նստեցման դարպասներ։",
    phrases: [
      { es: "Facturamos todo el material deportivo del equipo.", hy: "Հանձնում ենք թիմի ամբողջ մարզական գույքը։" },
      { es: "Pasamos el control de seguridad sin retrasos.", hy: "Անվտանգության ստուգումն անցնում ենք առանց ուշացումների։" },
      { es: "Esperamos en la puerta de embarque asignada.", hy: "Սպասում ենք հատկացված նստեցման դարպասի մոտ։" }
    ]
  },
  {
    id: 7,
    es: "En el hotel con los compañeros",
    hy: "Հյուրանոցում թիմակիցների հետ",
    iconName: "Hotel",
    summaryEs: "Comidas conjuntas, descanso en las habitaciones y preparación.",
    summaryHy: "Համատեղ ճաշեր, հանգիստ սենյակներում և նախապատրաստություն։",
    phrases: [
      { es: "Cenamos todos juntos a las ocho de la tarde.", hy: "Բոլորս միասին ընթրում ենք երեկոյան ժամը ութին։" },
      { es: "Comparto habitación con el capitán del equipo.", hy: "Սենյակը կիսում եմ թիմի ավագի հետ։" },
      { es: "Es fundamental dormir ocho horas antes de jugar.", hy: "Խաղից առաջ ութ ժամ քնելը չափազանց կարևոր է։" }
    ]
  },
  {
    id: 8,
    es: "Mis objetivos deportivos",
    hy: "Իմ մարզական նպատակները",
    iconName: "Trophy",
    summaryEs: "Superación personal, títulos y debutar en la selección.",
    summaryHy: "Անհատական աճ, տիտղոսներ և նորամուտ ազգային հավաքականում։",
    phrases: [
      { es: "Mi sueño es debutar con la selección nacional.", hy: "Իմ երազանքն է նորամուտս նշել ազգային հավաքականում։" },
      { es: "Quiero ser el máximo goleador del campeonato.", hy: "Ուզում եմ դառնալ առաջնության լավագույն ռմբարկուն։" },
      { es: "El trabajo constante supera al talento sin disciplina.", hy: "Հետևողական աշխատանքը հաղթում է առանց կարգապահության տաղանդին։" }
    ]
  },
  {
    id: 9,
    es: "Resolver problemas durante un viaje",
    hy: "Լուծել խնդիրները ճանապարհորդության ընթացքում",
    iconName: "AlertCircle",
    summaryEs: "Pérdida de equipaje, atascos o cancelaciones de transporte.",
    summaryHy: "Ուղեբեռի կորուստ, խցանումներ կամ տրանսպորտի չեղարկումներ։",
    phrases: [
      { es: "Mi maleta no llegó; fui al mostrador de reclamos.", hy: "Ճամպրուկս չհասավ. գնացի պահանջների սպասարկման բաժին։" },
      { es: "El tráfico nos obligó a cambiar la ruta al estadio.", hy: "Խցանումը ստիպեց մեզ փոխել դեպի մարզադաշտ տանող երթուղին։" },
      { es: "Mantener la calma es lo más importante ante imprevistos.", hy: "Անսպասելի դեպքերում հանգստություն պահպանելն ամենակարևորն է։" }
    ]
  },
  {
    id: 10,
    es: "Contar una experiencia inolvidable",
    hy: "Պատմել անմոռանալի փորձառության մասին",
    iconName: "Sparkles",
    summaryEs: "Remontadas históricas, goles en el último minuto y celebraciones.",
    summaryHy: "Պատմական քամբեքներ, վերջին րոպեի գոլեր և տոնակատարություններ։",
    phrases: [
      { es: "Marcamos el gol de la victoria en el minuto noventa y tres.", hy: "Հաղթական գոլը խփեցինք իննսուներեքերորդ րոպեին։" },
      { es: "El estadio entero empezó a cantar nuestro himno.", hy: "Ամբողջ մարզադաշտը սկսեց երգել մեր օրհներգը։" },
      { es: "Fue el momento más emocionante de mi carrera.", hy: "Դա իմ կարիերայի ամենահուզիչ պահն էր։" }
    ]
  },
  {
    id: 11,
    es: "Comparar dos partidos",
    hy: "Համեմատել երկու խաղ",
    iconName: "Scale",
    summaryEs: "Análisis del rendimiento, rivales y diferencias tácticas.",
    summaryHy: "Արդյունավետության, մրցակիցների և տակտիկական տարբերությունների վերլուծություն։",
    phrases: [
      { es: "En la ida fuimos defensivos, pero en la vuelta atacamos más.", hy: "Առաջին խաղում պաշտպանվողական էինք, բայց պատասխան խաղում ավելի շատ հարձակվեցինք։" },
      { es: "El segundo rival tuvo una posesión mucho mayor.", hy: "Երկրորդ մրցակիցը շատ ավելի երկար էր տիրում գնդակին։" },
      { es: "Jugamos con mayor intensidad el fin de semana pasado.", hy: "Անցյալ շաբաթ-կիրակի մենք շատ ավելի մեծ ինտենսիվությամբ խաղացինք։" }
    ]
  },
  {
    id: 12,
    es: "Organizar un viaje para un torneo",
    hy: "Կազմակերպել ճանապարհորդություն մրցաշարի համար",
    iconName: "Calendar",
    summaryEs: "Planificación de fechas, hoteles, traslados y comidas.",
    summaryHy: "Ամսաթվերի, հյուրանոցների, տեղափոխումների և սննդի պլանավորում։",
    phrases: [
      { es: "Reservamos el alojamiento cerca de las instalaciones deportivas.", hy: "Կացարանն ամրագրեցինք մարզական համալիրներին մոտ։" },
      { es: "Confirmamos los horarios de los partidos del torneo.", hy: "Հաստատեցինք մրցաշարի խաղերի ժամանակացույցը։" },
      { es: "Coordinamos los autobuses para los desplazamientos.", hy: "Համակարգեցինք ավտոբուսները տեղաշարժվելու համար։" }
    ]
  }
];

// 30 Quiz travel questions across 6 parts
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // PARTE 1. En el aeropuerto — Օդանավակայանում (1-5)
  {
    id: 1,
    part: 1,
    partTitleEs: "En el aeropuerto",
    partTitleHy: "Օդանավակայանում",
    questionEs: "¿Qué documento necesitas normalmente para pasar el control de pasaportes en un viaje internacional?",
    questionHy: "Միջազգային ճանապարհորդության ժամանակ ի՞նչ փաստաթուղթ է սովորաբար անհրաժեշտ անձնագրային ստուգումն անցնելու համար։",
    options: [
      { key: 'A', es: "La tarjeta de embarque", hy: "Նստեցման կտրոն" },
      { key: 'B', es: "El pasaporte", hy: "Անձնագիր" },
      { key: 'C', es: "La reserva del hotel", hy: "Հյուրանոցի ամրագրում" },
      { key: 'D', es: "El billete de regreso", hy: "Վերադարձի տոմս" }
    ],
    answer: 'B',
    answerTextEs: "El pasaporte",
    answerTextHy: "Անձնագիր"
  },
  {
    id: 2,
    part: 1,
    partTitleEs: "En el aeropuerto",
    partTitleHy: "Օդանավակայանում",
    questionEs: "Quieres entregar tu maleta grande antes del vuelo. ¿Qué tienes que hacer?",
    questionHy: "Թռիչքից առաջ ուզում ես հանձնել մեծ ճամպրուկդ։ Ի՞նչ պետք է անես։",
    options: [
      { key: 'A', es: "Recoger el equipaje", hy: "Վերցնել ուղեբեռը" },
      { key: 'B', es: "Pasar por aduanas", hy: "Անցնել մաքսային ստուգումը" },
      { key: 'C', es: "Embarcar", hy: "Ինքնաթիռ նստել" },
      { key: 'D', es: "Facturar el equipaje", hy: "Հանձնել ուղեբեռը" }
    ],
    answer: 'D',
    answerTextEs: "Facturar el equipaje",
    answerTextHy: "Հանձնել ուղեբեռը"
  },
  {
    id: 3,
    part: 1,
    partTitleEs: "En el aeropuerto",
    partTitleHy: "Օդանավակայանում",
    questionEs: "En la pantalla aparece «Vuelo retrasado». ¿Qué significa?",
    questionHy: "Էկրանին գրված է «Vuelo retrasado»։ Ի՞նչ է նշանակում։",
    options: [
      { key: 'A', es: "El vuelo sale más tarde", hy: "Թռիչքն ուշանում է" },
      { key: 'B', es: "El vuelo está cancelado", hy: "Թռիչքը չեղարկված է" },
      { key: 'C', es: "El avión ha aterrizado", hy: "Ինքնաթիռը վայրէջք է կատարել" },
      { key: 'D', es: "El embarque ha terminado", hy: "Նստեցումն ավարտվել է" }
    ],
    answer: 'A',
    answerTextEs: "El vuelo sale más tarde",
    answerTextHy: "Թռիչքն ուշանում է"
  },
  {
    id: 4,
    part: 1,
    partTitleEs: "En el aeropuerto",
    partTitleHy: "Օդանավակայանում",
    questionEs: "Tu amigo pregunta: «¿Dónde está la puerta de embarque?». ¿Qué está buscando?",
    questionHy: "Ընկերդ հարցնում է՝ որտե՞ղ է նստեցման դարպասը։ Ի՞նչ է նա փնտրում։",
    options: [
      { key: 'A', es: "La salida del aeropuerto", hy: "Օդանավակայանի ելքը" },
      { key: 'B', es: "La recogida de maletas", hy: "Ուղեբեռի ստացման վայրը" },
      { key: 'C', es: "El acceso al avión", hy: "Դեպի ինքնաթիռ անցնելու տեղը" },
      { key: 'D', es: "La taquilla", hy: "Տոմսարկղը" }
    ],
    answer: 'C',
    answerTextEs: "El acceso al avión",
    answerTextHy: "Դեպի ինքնաթիռ անցնելու տեղը"
  },
  {
    id: 5,
    part: 1,
    partTitleEs: "En el aeropuerto",
    partTitleHy: "Օդանավակայանում",
    questionEs: "¿Qué significa «Solo llevo equipaje de mano»?",
    questionHy: "Ի՞նչ է նշանակում «Solo llevo equipaje de mano» արտահայտությունը։",
    options: [
      { key: 'A', es: "No tengo equipaje", hy: "Ուղեբեռ չունեմ" },
      { key: 'B', es: "Solo tengo equipaje de cabina", hy: "Միայն ձեռքի ուղեբեռ ունեմ" },
      { key: 'C', es: "He perdido mi maleta", hy: "Կորցրել եմ ճամպրուկս" },
      { key: 'D', es: "Tengo dos maletas facturadas", hy: "Երկու հանձնած ճամպրուկ ունեմ" }
    ],
    answer: 'B',
    answerTextEs: "Solo tengo equipaje de cabina",
    answerTextHy: "Միայն ձեռքի ուղեբեռ ունեմ"
  },

  // PARTE 2. En el hotel — Հյուրանոցում (6-10)
  {
    id: 6,
    part: 2,
    partTitleEs: "En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "Llegas al hotel y ya has reservado una habitación. ¿Qué dices?",
    questionHy: "Հասել ես հյուրանոց և արդեն սենյակ ես ամրագրել։ Ի՞նչ ես ասում։",
    options: [
      { key: 'A', es: "Tengo una reserva a nombre de Ana", hy: "Աննայի անունով ամրագրում ունեմ" },
      { key: 'B', es: "Quiero cancelar mi reserva", hy: "Ուզում եմ չեղարկել ամրագրումս" },
      { key: 'C', es: "Quiero reservar una habitación", hy: "Ուզում եմ սենյակ ամրագրել" },
      { key: 'D', es: "¿Tienen habitaciones libres?", hy: "Ազատ սենյակներ ունե՞ք" }
    ],
    answer: 'A',
    answerTextEs: "Tengo una reserva a nombre de Ana",
    answerTextHy: "Աննայի անունով ամրագրում ունեմ"
  },
  {
    id: 7,
    part: 2,
    partTitleEs: "En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "Necesitas otra toalla en el hotel. ¿Qué pides?",
    questionHy: "Հյուրանոցում քեզ ևս մեկ սրբիչ է անհրաժեշտ։ Ի՞նչ ես խնդրում։",
    options: [
      { key: 'A', es: "Otra manta", hy: "Եվս մեկ ծածկոց" },
      { key: 'B', es: "Otra almohada", hy: "Եվս մեկ բարձ" },
      { key: 'C', es: "Otra sábana", hy: "Եվս մեկ սավան" },
      { key: 'D', es: "Otra toalla", hy: "Եվս մեկ սրբիչ" }
    ],
    answer: 'D',
    answerTextEs: "Otra toalla",
    answerTextHy: "Եվս մեկ սրբիչ"
  },
  {
    id: 8,
    part: 2,
    partTitleEs: "En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "El recepcionista dice: «El check-out es antes de las once». ¿Qué debes hacer?",
    questionHy: "Ընդունարանի աշխատակիցն ասում է՝ «Check-out-ը մինչև ժամը 11-ն է»։ Ի՞նչ պետք է անես։",
    options: [
      { key: 'A', es: "Llegar al hotel antes de las once", hy: "Հյուրանոց հասնել մինչև 11-ը" },
      { key: 'B', es: "Desayunar antes de las once", hy: "Նախաճաշել մինչև 11-ը" },
      { key: 'C', es: "Dejar la habitación antes de las once", hy: "Սենյակն ազատել մինչև 11-ը" },
      { key: 'D', es: "Reservar otra habitación", hy: "Մեկ այլ սենյակ ամրագրել" }
    ],
    answer: 'C',
    answerTextEs: "Dejar la habitación antes de las once",
    answerTextHy: "Սենյակն ազատել մինչև 11-ը"
  },
  {
    id: 9,
    part: 2,
    partTitleEs: "En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "Estás en un hotel y quieres saber la contraseña del wifi. ¿Qué preguntas?",
    questionHy: "Հյուրանոցում ես և ուզում ես իմանալ Wi-Fi-ի գաղտնաբառը։ Ի՞նչ ես հարցնում։",
    options: [
      { key: 'A', es: "¿Cuál es la contraseña del wifi?", hy: "Ո՞րն է Wi-Fi-ի գաղտնաբառը" },
      { key: 'B', es: "¿Cuál es el número de habitación?", hy: "Ո՞րն է սենյակի համարը" },
      { key: 'C', es: "¿Cuál es la dirección del hotel?", hy: "Ո՞րն է հյուրանոցի հասցեն" },
      { key: 'D', es: "¿Cuál es el horario del desayuno?", hy: "Ո՞ր ժամերին է նախաճաշը" }
    ],
    answer: 'A',
    answerTextEs: "¿Cuál es la contraseña del wifi?",
    answerTextHy: "Ո՞րն է Wi-Fi-ի գաղտնաբառը"
  },
  {
    id: 10,
    part: 2,
    partTitleEs: "En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "No puedes dormir porque hay demasiado ruido. ¿Qué dices en recepción?",
    questionHy: "Չես կարողանում քնել, որովհետև շատ աղմուկ կա։ Ի՞նչ ես ասում ընդունարանում։",
    options: [
      { key: 'A', es: "¿Puede despertarme a las siete?", hy: "Կարո՞ղ եք ինձ արթնացնել ժամը յոթին" },
      { key: 'B', es: "¿Podemos cambiar a una habitación más tranquila?", hy: "Կարո՞ղ ենք տեղափոխվել ավելի հանգիստ սենյակ" },
      { key: 'C', es: "¿Podemos salir del hotel más tarde?", hy: "Կարո՞ղ ենք հյուրանոցից ավելի ուշ դուրս գալ" },
      { key: 'D', es: "¿Puede traerme otra almohada?", hy: "Կարո՞ղ եք ևս մեկ բարձ բերել" }
    ],
    answer: 'B',
    answerTextEs: "¿Podemos cambiar a una habitación más tranquila?",
    answerTextHy: "Կարո՞ղ ենք տեղափոխվել ավելի հանգիստ սենյակ"
  },

  // PARTE 3. Transportes — Տրանսպորտ (11-15)
  {
    id: 11,
    part: 3,
    partTitleEs: "Transportes",
    partTitleHy: "Տրանսպորտ",
    questionEs: "«El tren sale del andén tres». ¿Adónde tienes que ir?",
    questionHy: "«Գնացքը մեկնում է երրորդ կառամատույցից»։ Որտե՞ղ պետք է գնաս։",
    options: [
      { key: 'A', es: "Al andén tres", hy: "Երրորդ կառամատույց" },
      { key: 'B', es: "A la taquilla tres", hy: "Երրորդ տոմսարկղ" },
      { key: 'C', es: "A la salida tres", hy: "Երրորդ ելք" },
      { key: 'D', es: "A la ventanilla tres", hy: "Երրորդ պատուհան" }
    ],
    answer: 'A',
    answerTextEs: "Al andén tres",
    answerTextHy: "Երրորդ կառամատույց"
  },
  {
    id: 12,
    part: 3,
    partTitleEs: "Transportes",
    partTitleHy: "Տրանսպորտ",
    questionEs: "Quieres comprar un billete solo para ir, sin regreso. ¿Qué pides?",
    questionHy: "Ուզում ես գնել միայն մեկնելու տոմս՝ առանց վերադարձի։ Ի՞նչ ես խնդրում։",
    options: [
      { key: 'A', es: "Ida y vuelta", hy: "Երկկողմանի տոմս" },
      { key: 'B', es: "Solo ida", hy: "Միակողմանի տոմս" },
      { key: 'C', es: "Billete abierto de regreso", hy: "Վերադարձի բաց տոմս" },
      { key: 'D', es: "Billete de vuelta", hy: "Վերադարձի տոմս" }
    ],
    answer: 'B',
    answerTextEs: "Solo ida",
    answerTextHy: "Միակողմանի տոմս"
  },
  {
    id: 13,
    part: 3,
    partTitleEs: "Transportes",
    partTitleHy: "Տրանսպորտ",
    questionEs: "¿Cómo preguntas si un autobús va al centro?",
    questionHy: "Ինչպե՞ս կհարցնես՝ արդյոք ավտոբուսը գնում է կենտրոն։",
    options: [
      { key: 'A', es: "¿De dónde viene este autobús?", hy: "Որտեղի՞ց է գալիս այս ավտոբուսը" },
      { key: 'B', es: "¿Cuándo llegó este autobús?", hy: "Ե՞րբ է ժամանել այս ավտոբուսը" },
      { key: 'C', es: "¿Cuánto tarda este autobús?", hy: "Որքա՞ն ժամանակ է տևում այս ավտոբուսի ուղևորությունը" },
      { key: 'D', es: "¿Este autobús va al centro?", hy: "Այս ավտոբուսը կենտրոն գնո՞ւմ է" }
    ],
    answer: 'D',
    answerTextEs: "¿Este autobús va al centro?",
    answerTextHy: "Այս ավտոբուսը կենտրոն գնո՞ւմ է"
  },
  {
    id: 14,
    part: 3,
    partTitleEs: "Transportes",
    partTitleHy: "Տրանսպորտ",
    questionEs: "El autobús está atrapado en un atasco. ¿Qué mensaje envías a tu amigo?",
    questionHy: "Ավտոբուսը խցանման մեջ է։ Ի՞նչ հաղորդագրություն ես ուղարկում ընկերոջդ։",
    options: [
      { key: 'A', es: "Llegaré antes de tiempo", hy: "Ժամանակից շուտ կհասնեմ" },
      { key: 'B', es: "Ya estoy en casa", hy: "Արդեն տանն եմ" },
      { key: 'C', es: "Llegaré tarde por el tráfico", hy: "Երթևեկության պատճառով ուշ կհասնեմ" },
      { key: 'D', es: "He perdido el autobús", hy: "Բաց եմ թողել ավտոբուսը" }
    ],
    answer: 'C',
    answerTextEs: "Llegaré tarde por el tráfico",
    answerTextHy: "Երթևեկության պատճառով ուշ կհասնեմ"
  },
  {
    id: 15,
    part: 3,
    partTitleEs: "Transportes",
    partTitleHy: "Տրանսպորտ",
    questionEs: "¿Qué significa «¿A qué hora sale el tren?»?",
    questionHy: "Ի՞նչ է նշանակում այս հարցը։",
    options: [
      { key: 'A', es: "¿A qué hora llega el tren?", hy: "Ե՞րբ է հասնում գնացքը" },
      { key: 'B', es: "¿Cuánto dura el viaje?", hy: "Որքա՞ն է տևում ճանապարհը" },
      { key: 'C', es: "¿A qué hora sale el tren?", hy: "Ժամը քանիսի՞ն է մեկնում գնացքը" },
      { key: 'D', es: "¿Cuánto cuesta el billete de tren?", hy: "Որքա՞ն արժե գնացքի տոմսը" }
    ],
    answer: 'C',
    answerTextEs: "¿A qué hora sale el tren?",
    answerTextHy: "Ժամը քանիսի՞ն է մեկնում գնացքը"
  },

  // PARTE 4. De vacaciones — Արձակուրդում (16-20)
  {
    id: 16,
    part: 4,
    partTitleEs: "De vacaciones",
    partTitleHy: "Արձակուրդում",
    questionEs: "Estás en una ciudad desconocida y te has perdido. ¿Qué dices?",
    questionHy: "Անծանոթ քաղաքում մոլորվել ես։ Ի՞նչ ես ասում։",
    options: [
      { key: 'A', es: "Estoy perdido, ¿me puede ayudar?", hy: "Մոլորվել եմ, կարո՞ղ եք օգնել" },
      { key: 'B', es: "Estoy de vacaciones, ¿me oye?", hy: "Արձակուրդում եմ, լսո՞ւմ եք ինձ" },
      { key: 'C', es: "Estoy cansado, ¿tiene agua?", hy: "Հոգնել եմ, ջուր ունե՞ք" },
      { key: 'D', es: "Estoy ocupado, ¿puede esperar?", hy: "Զբաղված եմ, կարո՞ղ եք սպասել" }
    ],
    answer: 'A',
    answerTextEs: "Estoy perdido, ¿me puede ayudar?",
    answerTextHy: "Մոլորվել եմ, կարո՞ղ եք օգնել"
  },
  {
    id: 17,
    part: 4,
    partTitleEs: "De vacaciones",
    partTitleHy: "Արձակուրդում",
    questionEs: "Quieres visitar un museo y saber el precio. ¿Qué preguntas?",
    questionHy: "Ուզում ես այցելել թանգարան և իմանալ մուտքի գինը։ Ի՞նչ ես հարցնում։",
    options: [
      { key: 'A', es: "¿Cuándo cierra el museo?", hy: "Ե՞րբ է փակվում թանգարանը" },
      { key: 'B', es: "¿Cuánto cuesta la entrada?", hy: "Որքա՞ն արժե մուտքը" },
      { key: 'C', es: "¿Dónde está la entrada?", hy: "Որտե՞ղ է մուտքը" },
      { key: 'D', es: "¿Cuánto dura la visita?", hy: "Որքա՞ն է տևում այցելությունը" }
    ],
    answer: 'B',
    answerTextEs: "¿Cuánto cuesta la entrada?",
    answerTextHy: "Որքա՞ն արժե մուտքը"
  },
  {
    id: 18,
    part: 4,
    partTitleEs: "De vacaciones",
    partTitleHy: "Արձակուրդում",
    questionEs: "En el restaurante eres alérgico a los frutos secos. ¿Qué dices?",
    questionHy: "Ռեստորանում ընկուզեղենի նկատմամբ ալերգիա ունես։ Ի՞նչ ես ասում։",
    options: [
      { key: 'A', es: "No me gustan los frutos secos", hy: "Ես ընկուզեղեն չեմ սիրում" },
      { key: 'B', es: "Prefiero los frutos secos", hy: "Ես նախընտրում եմ ընկուզեղենը" },
      { key: 'C', es: "Soy alérgico a los frutos secos", hy: "Ես ալերգիա ունեմ ընկուզեղենի նկատմամբ" },
      { key: 'D', es: "No tengo frutos secos", hy: "Ես ընկուզեղեն չունեմ" }
    ],
    answer: 'C',
    answerTextEs: "Soy alérgico a los frutos secos",
    answerTextHy: "Ես ալերգիա ունեմ ընկուզեղենի նկատմամբ"
  },
  {
    id: 19,
    part: 4,
    partTitleEs: "De vacaciones",
    partTitleHy: "Արձակուրդում",
    questionEs: "Quieres conocer los lugares más interesantes de la ciudad. ¿A quién puedes preguntar?",
    questionHy: "Ուզում ես իմանալ քաղաքի ամենահետաքրքիր վայրերը։ Ո՞ւմ կարող ես հարցնել։",
    options: [
      { key: 'A', es: "Al piloto del avión", hy: "Ինքնաթիռի օդաչուին" },
      { key: 'B', es: "Al árbitro", hy: "Մրցավարին" },
      { key: 'C', es: "Al mecánico", hy: "Մեխանիկին" },
      { key: 'D', es: "Al empleado de la oficina de turismo", hy: "Զբոսաշրջային տեղեկատվական գրասենյակի աշխատակցին" }
    ],
    answer: 'D',
    answerTextEs: "Al empleado de la oficina de turismo",
    answerTextHy: "Զբոսաշրջային տեղեկատվական գրասենյակի աշխատակցին"
  },
  {
    id: 20,
    part: 4,
    partTitleEs: "De vacaciones",
    partTitleHy: "Արձակուրդում",
    questionEs: "Quieres comprar un recuerdo de tu viaje. ¿Qué buscas?",
    questionHy: "Ուզում ես ճանապարհորդությունից հուշանվեր գնել։ Ի՞նչ ես փնտրում։",
    options: [
      { key: 'A', es: "Una tienda de recuerdos", hy: "Հուշանվերների խանութ" },
      { key: 'B', es: "Una farmacia", hy: "Դեղատուն" },
      { key: 'C', es: "Una oficina de correos", hy: "Փոստային բաժանմունք" },
      { key: 'D', es: "Una estación de tren", hy: "Երկաթուղային կայարան" }
    ],
    answer: 'A',
    answerTextEs: "Una tienda de recuerdos",
    answerTextHy: "Հուշանվերների խանութ"
  },

  // PARTE 5. Viajar con el equipo — Ճանապարհորդել թիմի հետ (21-25)
  {
    id: 21,
    part: 5,
    partTitleEs: "Viajar con el equipo",
    partTitleHy: "Ճանապարհորդել թիմի հետ",
    questionEs: "Tu equipo viaja a otra ciudad para jugar contra el equipo local. ¿Qué tipo de partido es?",
    questionHy: "Թիմդ գնում է ուրիշ քաղաք՝ տեղի թիմի դեմ խաղալու։ Ինչպիսի՞ խաղ է դա։",
    options: [
      { key: 'A', es: "Un partido en casa", hy: "Տնային խաղ" },
      { key: 'B', es: "Un entrenamiento individual", hy: "Անհատական մարզում" },
      { key: 'C', es: "Un partido fuera de casa", hy: "Արտագնա խաղ" },
      { key: 'D', es: "Un partido entre compañeros", hy: "Խաղ թիմակիցների միջև" }
    ],
    answer: 'C',
    answerTextEs: "Un partido fuera de casa",
    answerTextHy: "Արտագնա խաղ"
  },
  {
    id: 22,
    part: 5,
    partTitleEs: "Viajar con el equipo",
    partTitleHy: "Ճանապարհորդել թիմի հետ",
    questionEs: "El entrenador dice: «Tenemos que salir con antelación». ¿Qué quiere decir?",
    questionHy: "Մարզիչն ասում է՝ «Պետք է նախապես ճանապարհ ընկնենք»։ Ի՞նչ է նշանակում։",
    options: [
      { key: 'A', es: "Tenemos que salir más tarde", hy: "Պետք է ավելի ուշ դուրս գանք" },
      { key: 'B', es: "Tenemos que salir con tiempo suficiente", hy: "Պետք է ժամանակին՝ բավական շուտ դուրս գանք" },
      { key: 'C', es: "Tenemos que cancelar el viaje", hy: "Պետք է չեղարկենք ճանապարհորդությունը" },
      { key: 'D', es: "Tenemos que volver al hotel", hy: "Պետք է վերադառնանք հյուրանոց" }
    ],
    answer: 'B',
    answerTextEs: "Tenemos que salir con tiempo suficiente",
    answerTextHy: "Պետք է ժամանակին՝ բավական շուտ դուրս գանք"
  },
  {
    id: 23,
    part: 5,
    partTitleEs: "Viajar con el equipo",
    partTitleHy: "Ճանապարհորդել թիմի հետ",
    questionEs: "Tu compañero ha olvidado sus botas de fútbol en el hotel. ¿Qué debería hacer?",
    questionHy: "Թիմակիցդ մոռացել է ֆուտբոլային խաղակոշիկները հյուրանոցում։ Ի՞նչ պետք է անի։",
    options: [
      { key: 'A', es: "Comprar otro billete de avión", hy: "Գնել ինքնաթիռի այլ տոմս" },
      { key: 'B', es: "Cancelar todo el torneo", hy: "Չեղարկել ամբողջ մրցաշարը" },
      { key: 'C', es: "Esperar hasta el día siguiente", hy: "Սպասել մինչև հաջորդ օրը" },
      { key: 'D', es: "Llamar al hotel y preguntar por sus botas", hy: "Զանգահարել հյուրանոց և հարցնել խաղակոշիկների մասին" }
    ],
    answer: 'D',
    answerTextEs: "Llamar al hotel y preguntar por sus botas",
    answerTextHy: "Զանգահարել հյուրանոց և հարցնել խաղակոշիկների մասին"
  },
  {
    id: 24,
    part: 5,
    partTitleEs: "Viajar con el equipo",
    partTitleHy: "Ճանապարհորդել թիմի հետ",
    questionEs: "Antes de salir hacia el estadio, el entrenador pregunta: «¿Estamos todos?». ¿Qué quiere comprobar?",
    questionHy: "Մարզադաշտ մեկնելուց առաջ մարզիչը հարցնում է՝ «Բոլո՞րս այստեղ ենք»։ Ի՞նչ է ուզում ստուգել։",
    options: [
      { key: 'A', es: "Si falta algún jugador", hy: "Արդյոք որևէ խաղացող բացակայում է" },
      { key: 'B', es: "Si todos tienen hambre", hy: "Արդյոք բոլորը քաղցած են" },
      { key: 'C', es: "Si el estadio está abierto", hy: "Արդյոք մարզադաշտը բաց է" },
      { key: 'D', es: "Si el autobús tiene gasolina", hy: "Արդյոք ավտոբուսում վառելիք կա" }
    ],
    answer: 'A',
    answerTextEs: "Si falta algún jugador",
    answerTextHy: "Արդյոք որևէ խաղացող բացակայում է"
  },
  {
    id: 25,
    part: 5,
    partTitleEs: "Viajar con el equipo",
    partTitleHy: "Ճանապարհորդել թիմի հետ",
    questionEs: "Después de un viaje largo, tienes un partido al día siguiente. ¿Qué es lo más recomendable?",
    questionHy: "Երկար ճանապարհորդությունից հետո հաջորդ օրը խաղ ունես։ Ի՞նչն է ամենանպատակահարմարը։",
    options: [
      { key: 'A', es: "Pasar toda la noche jugando a videojuegos", hy: "Ամբողջ գիշեր տեսախաղեր խաղալ" },
      { key: 'B', es: "Irse a dormir muy tarde", hy: "Շատ ուշ քնել" },
      { key: 'C', es: "Descansar y dormir bien", hy: "Հանգստանալ և լավ քնել" },
      { key: 'D', es: "No beber agua", hy: "Ջուր չխմել" }
    ],
    answer: 'C',
    answerTextEs: "Descansar y dormir bien",
    answerTextHy: "Հանգստանալ և լավ քնել"
  },

  // PARTE 6. Situaciones durante un viaje — Իրավիճակներ ճանապարհորդության ընթացքում (26-30)
  {
    id: 26,
    part: 6,
    partTitleEs: "Situaciones durante un viaje",
    partTitleHy: "Իրավիճակներ ճանապարհորդության ընթացքում",
    questionEs: "Llegas a Barcelona, pero tu maleta no aparece en la cinta de equipajes. ¿Qué haces primero?",
    questionHy: "Հասնում ես Բարսելոնա, բայց ճամպրուկդ ուղեբեռի ժապավենի վրա չկա։ Ի՞նչ ես անում առաջին հերթին։",
    options: [
      { key: 'A', es: "Reservar otro vuelo", hy: "Նոր թռիչք ամրագրել" },
      { key: 'B', es: "Ir al mostrador de equipajes perdidos", hy: "Գնալ կորած ուղեբեռի սպասարկման բաժին" },
      { key: 'C', es: "Comprar otra maleta inmediatamente", hy: "Անմիջապես նոր ճամպրուկ գնել" },
      { key: 'D', es: "Volver al avión por tu cuenta", hy: "Ինքնուրույն վերադառնալ ինքնաթիռ" }
    ],
    answer: 'B',
    answerTextEs: "Ir al mostrador de equipajes perdidos",
    answerTextHy: "Գնալ կորած ուղեբեռի սպասարկման բաժին"
  },
  {
    id: 27,
    part: 6,
    partTitleEs: "Situaciones durante un viaje",
    partTitleHy: "Իրավիճակներ ճանապարհորդության ընթացքում",
    questionEs: "Tu amigo dice: «Me he quedado sin batería en el móvil». ¿Qué necesita?",
    questionHy: "Ընկերդ ասում է՝ «Հեռախոսիս մարտկոցը նստել է»։ Ի՞նչ է նրան անհրաժեշտ։",
    options: [
      { key: 'A', es: "Un cargador", hy: "Լիցքավորիչ" },
      { key: 'B', es: "Un paraguas", hy: "Հովանոց" },
      { key: 'C', es: "Un mapa de papel", hy: "Թղթե քարտեզ" },
      { key: 'D', es: "Una tarjeta de embarque", hy: "Նստեցման կտրոն" }
    ],
    answer: 'A',
    answerTextEs: "Un cargador",
    answerTextHy: "Լիցքավորիչ"
  },
  {
    id: 28,
    part: 6,
    partTitleEs: "Situaciones durante un viaje",
    partTitleHy: "Իրավիճակներ ճանապարհորդության ընթացքում",
    questionEs: "Estás en Madrid y quieres saber cuánto se tarda en llegar al estadio. ¿Qué preguntas?",
    questionHy: "Մադրիդում ես և ուզում ես իմանալ՝ որքան ժամանակ է անհրաժեշտ մարզադաշտ հասնելու համար։ Ի՞նչ ես հարցնում։",
    options: [
      { key: 'A', es: "¿Cuánto cuesta el estadio?", hy: "Որքա՞ն արժե մարզադաշտը" },
      { key: 'B', es: "¿Cuándo construyeron el estadio?", hy: "Ե՞րբ են կառուցել մարզադաշտը" },
      { key: 'C', es: "¿Cuántas personas hay en el estadio?", hy: "Քանի՞ մարդ կա մարզադաշտում" },
      { key: 'D', es: "¿Cuánto se tarda en llegar al estadio?", hy: "Որքա՞ն ժամանակ է պետք մարզադաշտ հասնելու համար" }
    ],
    answer: 'D',
    answerTextEs: "¿Cuánto se tarda en llegar al estadio?",
    answerTextHy: "Որքա՞ն ժամանակ է պետք մարզադաշտ հասնելու համար"
  },
  {
    id: 29,
    part: 6,
    partTitleEs: "Situaciones durante un viaje",
    partTitleHy: "Իրավիճակներ ճանապարհորդության ընթացքում",
    questionEs: "Has viajado a España por primera vez y un amigo te pregunta: «¿Qué es lo que más te ha gustado?». ¿Qué quiere saber?",
    questionHy: "Առաջին անգամ ճանապարհորդել ես Իսպանիա։ Ընկերդ հարցնում է՝ «Ի՞նչն է քեզ ամենաշատը դուր եկել»։ Ի՞նչ է ուզում իմանալ։",
    options: [
      { key: 'A', es: "Cuánto dinero llevabas", hy: "Որքան գումար էիր վերցրել" },
      { key: 'B', es: "A qué hora saliste de casa", hy: "Ժամը քանիսին ես դուրս եկել տնից" },
      { key: 'C', es: "Qué fue lo mejor de tu viaje", hy: "Ինչն էր ամենալավը քո ճանապարհորդության ընթացքում" },
      { key: 'D', es: "Qué día vas a regresar", hy: "Որ օրը ես վերադառնալու" }
    ],
    answer: 'C',
    answerTextEs: "Qué fue lo mejor de tu viaje",
    answerTextHy: "Ինչն էր ամենալավը քո ճանապարհորդության ընթացքում"
  },
  {
    id: 30,
    part: 6,
    partTitleEs: "Situaciones durante un viaje",
    partTitleHy: "Իրավիճակներ ճանապարհորդության ընթացքում",
    questionEs: "Si pudieras viajar a cualquier país para ver un partido de fútbol, ¿qué frase usarías para expresar tu deseo?",
    questionHy: "Եթե կարողանայիր ճանապարհորդել ցանկացած երկիր՝ ֆուտբոլային խաղ դիտելու, ո՞ր արտահայտությամբ կարտահայտեիր ցանկությունդ։",
    options: [
      { key: 'A', es: "Ayer viajé para ver un partido", hy: "Երեկ ճանապարհորդեցի՝ խաղ դիտելու" },
      { key: 'B', es: "Me gustaría viajar para ver un partido", hy: "Կցանկանայի ճանապարհորդել՝ խաղ դիտելու" },
      { key: 'C', es: "Siempre viajo para ver partidos", hy: "Ես միշտ ճանապարհորդում եմ՝ խաղեր դիտելու" },
      { key: 'D', es: "Ahora estoy viajando para ver un partido", hy: "Հիմա ճանապարհորդում եմ՝ խաղ դիտելու" }
    ],
    answer: 'B',
    answerTextEs: "Me gustaría viajar para ver un partido",
    answerTextHy: "Կցանկանայի ճանապարհորդել՝ խաղ դիտելու"
  }
];

// Target word for Pole Chudes game: AFICIONADO (10 letters)
// Requirement: "нужно угадаь главное слово но не надо подсказки этого слова и слово aficionado"
export const POLE_CHUDES_WORD = "AFICIONADO";
export const POLE_CHUDES_WORD_TRANSLATION_HY = "Ֆուտբոլասեր / Երկրպագու";
export const POLE_CHUDES_WORD_MEANING_ES = "Persona que tiene gusto o afición por el fútbol y asiste a animar a su equipo.";
export const POLE_CHUDES_WORD_MEANING_HY = "Մարդ, ով սիրում է ֆուտբոլը, հետևում է խաղերին և ջերմորեն երկրպագում է իր սիրելի թիմին։";

// Wheel Sectors for Pole Chudes
export const WHEEL_SECTORS: WheelSector[] = [
  { id: 1, type: 'points', label: '100', value: 100, color: '#15803d', textColor: '#ffffff' }, // Emerald-700
  { id: 2, type: 'points', label: '300', value: 300, color: '#0284c7', textColor: '#ffffff' }, // Sky-600
  { id: 3, type: 'bankrupt', label: 'ԲԱՆԿՐՈՏ', sublabel: 'Սնանկ', value: 0, color: '#0f172a', textColor: '#ef4444' }, // Slate-900 / Red
  { id: 4, type: 'points', label: '500', value: 500, color: '#7c3aed', textColor: '#ffffff' }, // Violet-600
  { id: 5, type: 'plus', label: '+', sublabel: 'Տառ', value: 0, color: '#0d9488', textColor: '#ffffff' }, // Teal-600
  { id: 6, type: 'points', label: '200', value: 200, color: '#d97706', textColor: '#ffffff' }, // Amber-600
  { id: 7, type: 'points', label: '750', value: 750, color: '#e11d48', textColor: '#ffffff' }, // Rose-600
  { id: 8, type: 'prize', label: 'ՄՐՑԱՆԱԿ', sublabel: 'Prize', value: 1000, color: '#f59e0b', textColor: '#0f172a' }, // Gold
  { id: 9, type: 'points', label: '400', value: 400, color: '#059669', textColor: '#ffffff' }, // Emerald-600
  { id: 10, type: 'points', label: '1000', value: 1000, color: '#9333ea', textColor: '#ffffff' }, // Purple-600
  { id: 11, type: 'x2', label: 'x2', sublabel: 'Կրկնակի', value: 0, color: '#2563eb', textColor: '#ffffff' }, // Blue-600
  { id: 12, type: 'points', label: '250', value: 250, color: '#c026d3', textColor: '#ffffff' }, // Fuchsia-600
  { id: 13, type: 'chance', label: 'ՇԱՆՍ', sublabel: 'Extra', value: 350, color: '#0891b2', textColor: '#ffffff' }, // Cyan-600
  { id: 14, type: 'points', label: '350', value: 350, color: '#ea580c', textColor: '#ffffff' }, // Orange-600
  { id: 15, type: 'points', label: '600', value: 600, color: '#16a34a', textColor: '#ffffff' }, // Green-600
  { id: 16, type: 'points', label: '450', value: 450, color: '#4f46e5', textColor: '#ffffff' }, // Indigo-600
];

// Fun football surprise prizes for "ՄՐՑԱՆԱԿ" sector
export const FOOTBALL_PRIZES = [
  { nameEs: "Camiseta oficial firmada", nameHy: "Ստորագրված պաշտոնական մարզաշապիկ", icon: "Shirt" },
  { nameEs: "Entrada VIP para El Clásico", nameHy: "VIP տոմս Էլ Կլասիկոյին (Ռեալ Մադրիդ - Բարսելոնա)", icon: "Ticket" },
  { nameEs: "Balón oficial de la final de Champions", nameHy: "Չեմպիոնների լիգայի եզրափակչի պաշտոնական գնդակ", icon: "CircleDot" },
  { nameEs: "Botas de oro personalizadas", nameHy: "Անհատական ոսկե խաղակոշիկներ", icon: "Award" },
  { nameEs: "Viaje al Santiago Bernabéu", nameHy: "Ուղևորություն դեպի Սանտիագո Բեռնաբեու", icon: "Plane" }
];
