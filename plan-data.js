/* plan-data.js — 21 giorni del piano + helpers shopping
   Fonte: Schema Nutrizionale Personalizzato — Dott.ssa Laura Mazza

   Categorie spesa:
     FV = Frutta & Verdura · P = Proteine · L = Latticini
     CL = Cereali & Legumi · D = Dispensa · B = Bevande & Altro
   Ogni meal item: { t: testo, s: [shopping entries] }
   shopping entry: { n: nome, q?: quantità, c: categoria, brand?, gen?, note? }
*/

const CAT_ORDER = ['FV', 'P', 'L', 'CL', 'D', 'B'];
const CAT_LABEL = {
  FV: 'Frutta · Verdura',
  P:  'Proteine',
  L:  'Latticini',
  CL: 'Cereali · Legumi',
  D:  'Dispensa',
  B:  'Bevande · Altro',
};

/* ─── helper ricorrenti ─── */
const FRUTTO      = { t: '1 frutto fresco di stagione', s: [{ n: 'Frutta di stagione', q: '1', c: 'FV', gen: true }] };
const VERDAP      = { t: 'Verdura cruda in apertura pasto', s: [{ n: 'Verdura cruda', c: 'FV', gen: true }] };
const VERDMIX     = { t: 'Verdura cruda o cotta', s: [{ n: 'Verdura cruda o cotta', c: 'FV', gen: true }] };
const TEV         = { t: 'Tè verde senza zucchero', s: [{ n: 'Tè verde', c: 'B' }] };
const TISANA      = { t: 'Tisana senza zucchero', s: [{ n: 'Tisane miste', c: 'B' }] };
const TEOT        = { t: 'Tè o tisana senza zucchero', s: [{ n: 'Tè verde', c: 'B' }, { n: 'Tisane miste', c: 'B' }] };
const GRANOLA     = { t: 'Latte di mandorla o cocco con 5 cucchiai di granola (Ambrosiae)',
                      s: [{ n: 'Latte di mandorla o cocco', q: '1L', c: 'B', note: 'livebetter.eu' },
                          { n: 'Granola', brand: 'Ambrosiae', c: 'D' }] };
const BANANA_BREAD= { t: 'Banana bread o plumcake cheto (vedi ricetta)',
                      s: [{ n: 'Banana bread / plumcake cheto', c: 'D', note: 'fatto in casa' }] };
const PASTO_LIBERO= { t: 'PASTO LIBERO', s: [], free: true };
const SOLO_VERDURE= { t: 'Pasto di sole verdure', s: [{ n: 'Verdura cruda o cotta', c: 'FV', gen: true }] };

/* ══════════════════ SETTIMANA 1 ══════════════════ */
const W1 = [
  /* LUN */
  {
    c: [TEV,
        { t: 'Kefir intero 150 g con lamponi, cannella e nocciole',
          s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Lamponi',c:'FV'},{n:'Cannella',c:'D'},{n:'Nocciole',c:'D'}] }],
    p: [{ t: 'Insalata con verdure miste, avocado e salmone affumicato selvaggio',
          s: [{n:'Insalata mista',c:'FV'},{n:'Avocado',c:'FV'},{n:'Salmone affumicato selvaggio',c:'P'}] },
        FRUTTO],
    d: [VERDAP,
        { t: 'Caponata di ceci e verdure dolci con dressing al sesamo (vedi ricetta)',
          s: [{n:'Ceci cotti',q:'150-200g',c:'CL'},{n:'Verdure dolci miste',q:'250g',c:'FV'},{n:'Tahina',c:'D'}] },
        { t: '70 g di riso apollo', s: [{n:'Riso apollo',q:'70g',c:'CL'}] },
        FRUTTO],
  },
  /* MAR */
  {
    c: [TISANA, GRANOLA],
    p: [VERDAP,
        { t: 'Caponata di ceci e verdure dolci con dressing al sesamo (vedi ricetta)',
          s: [{n:'Ceci cotti',q:'150-200g',c:'CL'},{n:'Verdure dolci miste',q:'250g',c:'FV'},{n:'Tahina',c:'D'}] },
        { t: '70 g di riso apollo', s: [{n:'Riso apollo',q:'70g',c:'CL'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: '220 g di carne bianca (pollo, tacchino o coniglio)',
          s: [{n:'Carne bianca',q:'220g',c:'P',gen:true,note:'pollo/tacchino/coniglio'}] },
        FRUTTO],
  },
  /* MER */
  {
    c: [{ t: 'Tisana alla malva senza zucchero', s: [{n:'Tisana alla malva',c:'B'}] },
        { t: 'Pane rustico a lievitazione naturale tostato con ricotta, fragole e cacao amaro',
          s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Ricotta',c:'L'},{n:'Fragole',c:'FV'},{n:'Cacao amaro',c:'D'}] }],
    p: [{ t: 'Insalata di fagioli, patata, pomodorini e 2 uova sode — condire con sale, olio e 1 cucchiaio di senape in grani',
          s: [{n:'Fagioli',c:'CL'},{n:'Patata',c:'FV'},{n:'Pomodorini',c:'FV'},{n:'Uova',q:'2',c:'P'},{n:'Senape in grani',c:'D'}] },
        FRUTTO],
    d: [VERDAP,
        { t: '80 g di pasta di saraceno con asparagi',
          s: [{n:'Pasta di saraceno',q:'80g',c:'CL'},{n:'Asparagi',c:'FV'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV,
        { t: 'Overnight chia pudding al cacao e fragole (vedi ricetta)',
          s: [{n:'Semi di chia',q:'30g',c:'D'},{n:'Yogurt greco',q:'2 cucchiai',c:'L'},
              {n:'Cacao amaro',c:'D'},{n:'Bevanda vegetale',q:'150ml',c:'B'},{n:'Fragole',c:'FV'}] }],
    p: [VERDMIX,
        { t: '120 g di carpaccio di manzo con rucola e scaglie di grana',
          s: [{n:'Carpaccio di manzo',q:'120g',c:'P'},{n:'Rucola',c:'FV'},{n:'Grana padano',c:'L'}] }],
    d: [VERDMIX,
        { t: '250 g di pesce', s: [{n:'Pesce',q:'250g',c:'P',gen:true}] },
        { t: 'Batata a pasta arancione', s: [{n:'Batata',c:'FV'}] },
        FRUTTO],
  },
  /* VEN */
  {
    c: [TISANA, GRANOLA],
    p: [{ t: 'Insalata con verdure miste e 100 g di feta',
          s: [{n:'Insalata mista',c:'FV'},{n:'Feta',q:'100g',c:'L'}] },
        FRUTTO],
    d: [VERDAP,
        { t: '80 g di riso rosso con verdure e nasello',
          s: [{n:'Riso rosso',q:'80g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Nasello',c:'P'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TEV,
        { t: 'Kefir intero 150 g con kiwi e mandorle',
          s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Kiwi',c:'FV'},{n:'Mandorle',c:'D'}] }],
    p: [VERDMIX,
        { t: '250 g di sgombro al vapore condito con sale, olio, limone e origano',
          s: [{n:'Sgombro',q:'250g',c:'P'},{n:'Limone',c:'FV'},{n:'Origano',c:'D'}] },
        FRUTTO],
    d: [VERDAP,
        { t: '80 g di legumotti Barilla al pesto (banco frigo, pochi ingredienti o fatto in casa)',
          s: [{n:'Legumotti',brand:'Barilla',q:'80g',c:'CL'},{n:'Pesto',c:'D'}] },
        FRUTTO],
  },
  /* DOM */
  {
    c: [TEOT,
        { t: 'Pancake con fragole e crema di mandorle (vedi ricetta)',
          s: [{n:'Uovo',q:'1',c:'P'},{n:'Yogurt greco',q:'110g',c:'L'},{n:'Farina d\'avena',q:'30g',c:'CL'},
              {n:'Fragole',c:'FV'},{n:'Crema di mandorle 100%',c:'D'}] }],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

/* ══════════════════ SETTIMANA 2 ══════════════════ */
const W2 = [
  /* LUN */
  {
    c: [TEOT,
        { t: 'Pane rustico a lievitazione naturale con crema di mandorle e marmellata',
          s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Crema di mandorle 100%',c:'D'},{n:'Marmellata',c:'D'}] }],
    p: [VERDMIX,
        { t: 'Frittata (2 uova) con agretti o altre verdure',
          s: [{n:'Uova',q:'2',c:'P'},{n:'Agretti o spinaci',c:'FV'}] },
        FRUTTO],
    d: [VERDAP,
        { t: 'Zuppa di fave (vedi ricetta)',
          s: [{n:'Fave fresche o surgelate',q:'500g scusciate',c:'CL'},
              {n:'Pancetta a cubetti o speck',q:'100g',c:'P'},
              {n:'Cipolla',c:'FV'},{n:'Carota',c:'FV'},{n:'Patata',c:'FV'}] },
        FRUTTO],
  },
  /* MAR */
  {
    c: [TEOT,
        { t: 'Yogurt greco intero 150 g con miele, cannella, noci e succo di limone',
          s: [{n:'Yogurt greco intero',q:'150g',c:'L'},{n:'Miele',c:'D'},{n:'Cannella',c:'D'},
              {n:'Noci',c:'D'},{n:'Limone',c:'FV'}] }],
    p: [VERDAP,
        { t: 'Zuppa di fave (vedi ricetta)',
          s: [{n:'Fave fresche o surgelate',q:'500g scusciate',c:'CL'},
              {n:'Pancetta a cubetti o speck',q:'100g',c:'P'},
              {n:'Cipolla',c:'FV'},{n:'Carota',c:'FV'},{n:'Patata',c:'FV'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: '250 g di pesce', s: [{n:'Pesce',q:'250g',c:'P',gen:true}] },
        FRUTTO],
  },
  /* MER */
  {
    c: [TEV,
        { t: '2 uova strapazzate al burro ghee con lamponi',
          s: [{n:'Uova',q:'2',c:'P'},{n:'Burro ghee',c:'D'},{n:'Lamponi',c:'FV'}] }],
    p: [{ t: 'Insalata caprese con 150 g di mozzarella di bufala',
          s: [{n:'Mozzarella di bufala',q:'150g',c:'L'},{n:'Pomodori',c:'FV'},{n:'Basilico',c:'FV'}] },
        FRUTTO],
    d: [{ t: '70 g di cous cous integrale con verdure, curry e piselli',
          s: [{n:'Cous cous integrale',q:'70g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Curry',c:'D'},{n:'Piselli',c:'CL'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV,
        { t: 'Kefir intero 150 g con fragole e 2 pezzetti di cioccolato fondente',
          s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Fragole',c:'FV'},{n:'Cioccolato fondente >80%',c:'D'}] }],
    p: [{ t: '70 g di cous cous integrale con verdure, curry e piselli',
          s: [{n:'Cous cous integrale',q:'70g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Curry',c:'D'},{n:'Piselli',c:'CL'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: '220 g di carne rossa grass fed', s: [{n:'Carne rossa grass fed',q:'220g',c:'P'}] },
        FRUTTO],
  },
  /* VEN */
  {
    c: [TISANA, GRANOLA],
    p: [{ t: 'Asparagi', s: [{n:'Asparagi',c:'FV'}] },
        { t: '3 uova all\'occhio di bue al burro ghee',
          s: [{n:'Uova',q:'3',c:'P'},{n:'Burro ghee',c:'D'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: '350 g di calamari in padella con olio, limone e prezzemolo',
          s: [{n:'Calamari',q:'350g',c:'P'},{n:'Limone',c:'FV'},{n:'Prezzemolo',c:'FV'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TEV,
        { t: 'Pane rustico a lievitazione naturale tostato con avocado condito',
          s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Avocado',c:'FV'}] }],
    p: [VERDMIX,
        { t: '220 g di carne bianca',
          s: [{n:'Carne bianca',q:'220g',c:'P',gen:true,note:'pollo/tacchino/coniglio'}] },
        { t: 'Macedonia di frutta fresca con cannella',
          s: [{n:'Frutta mista',c:'FV',gen:true},{n:'Cannella',c:'D'}] }],
    d: [VERDAP,
        { t: '80 g di pasta di legumi con zucchine',
          s: [{n:'Pasta di legumi',q:'80g',c:'CL'},{n:'Zucchine',c:'FV'}] }],
  },
  /* DOM */
  {
    c: [TEV, BANANA_BREAD],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

/* ══════════════════ SETTIMANA 3 ══════════════════ */
const W3 = [
  /* LUN */
  {
    c: [TEV, BANANA_BREAD],
    p: [{ t: 'Insalata con verdure miste, avocado e tonno in olio EVO 90 g (Asdomar)',
          s: [{n:'Insalata mista',c:'FV'},{n:'Avocado',c:'FV'},
              {n:'Tonno in olio EVO',brand:'Asdomar',q:'90g',c:'P'}] },
        FRUTTO],
    d: [{ t: 'Insalata di riso basmati integrale (vedi ricetta)',
          s: [{n:'Riso basmati integrale',q:'200g',c:'CL'},{n:'Melanzane',c:'FV'},
              {n:'Pomodorini',c:'FV'},{n:'Pinoli',q:'2 cucchiai',c:'D'},
              {n:'Ceci cotti',q:'1 vasetto',c:'CL'},{n:'Olive taggiasche',q:'2 cucchiai',c:'D'},
              {n:'Basilico',c:'FV'}] },
        FRUTTO],
  },
  /* MAR */
  {
    c: [TEV, BANANA_BREAD],
    p: [{ t: 'Insalata di riso basmati integrale (vedi ricetta)',
          s: [{n:'Riso basmati integrale',q:'200g',c:'CL'},{n:'Melanzane',c:'FV'},
              {n:'Pomodorini',c:'FV'},{n:'Pinoli',q:'2 cucchiai',c:'D'},
              {n:'Ceci cotti',q:'1 vasetto',c:'CL'},{n:'Olive taggiasche',q:'2 cucchiai',c:'D'},
              {n:'Basilico',c:'FV'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: 'Frittata (2 uova) con cipollotto di Tropea e patata',
          s: [{n:'Uova',q:'2',c:'P'},{n:'Cipollotto di Tropea',c:'FV'},{n:'Patata',c:'FV'}] },
        FRUTTO],
  },
  /* MER */
  {
    c: [TEV, BANANA_BREAD],
    p: [VERDMIX,
        { t: '150 g di ricotta di pecora condita',
          s: [{n:'Ricotta di pecora',q:'150g',c:'L'}] },
        FRUTTO],
    d: [VERDAP,
        { t: '80 g di pasta di farro al sugo di melanzane e pesce spada',
          s: [{n:'Pasta di farro',q:'80g',c:'CL'},{n:'Melanzane',c:'FV'},{n:'Pesce spada',c:'P'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV, BANANA_BREAD],
    p: [{ t: 'Insalata di rucola con pesca e 150 g di cannellini al naturale — condire con sale, olio e aceto balsamico',
          s: [{n:'Rucola',c:'FV'},{n:'Pesca',c:'FV'},
              {n:'Cannellini in vetro al naturale',q:'150g',c:'CL'},{n:'Aceto balsamico',c:'D'}] }],
    d: [VERDMIX,
        { t: '150 g di hamburger grass fed', s: [{n:'Hamburger grass fed',q:'150g',c:'P'}] },
        FRUTTO],
  },
  /* VEN */
  {
    c: [TEV,
        { t: 'Kefir intero 150 g con lamponi, cannella e nocciole',
          s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Lamponi',c:'FV'},{n:'Cannella',c:'D'},{n:'Nocciole',c:'D'}] }],
    p: [VERDMIX,
        { t: '100 g di bresaola condita con olio e limone',
          s: [{n:'Bresaola',q:'100g',c:'P'},{n:'Limone',c:'FV'}] },
        FRUTTO],
    d: [VERDMIX,
        { t: '3 uova strapazzate al burro ghee',
          s: [{n:'Uova',q:'3',c:'P'},{n:'Burro ghee',c:'D'}] },
        { t: 'Avocado', s: [{n:'Avocado',c:'FV'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TISANA, GRANOLA],
    p: [VERDMIX,
        { t: '250 g di pesce', s: [{n:'Pesce',q:'250g',c:'P',gen:true}] }],
    d: [{ t: 'Pizza', s: [{n:'Pizza',c:'D',note:'fuori o asporto'}] }],
  },
  /* DOM */
  {
    c: [TEV,
        { t: 'Kefir intero 150 g con kiwi e mandorle',
          s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Kiwi',c:'FV'},{n:'Mandorle',c:'D'}] }],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

const PLAN = [W1, W2, W3];

const DAY_NAMES_LONG  = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
const DAY_NAMES_SHORT = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
const MONTHS = ['gennaio','febbraio','marzo','aprile','maggio','giugno',
                'luglio','agosto','settembre','ottobre','novembre','dicembre'];

/* ──────────────────────────────────────────────────────────
   LOGICA CICLICA

   Ancora: Lunedì 11 maggio 2026 = Settimana 1 Lunedì = indice 0
   Il ciclo si ripete ogni 21 giorni.
────────────────────────────────────────────────────────── */
const ANCHOR       = new Date(2026, 4, 11); // 11 maggio 2026 — Lun W1 — idx 0
const ANCHOR_INDEX = 0;

/* Restituisce la data di OGGI nel fuso orario di Roma (CET/CEST).
   Il giorno scatta a mezzanotte italiana indipendentemente dal
   fuso orario impostato sul dispositivo. */
function getRomeToday() {
  // 'sv-SE' produce YYYY-MM-DD — facile da parsare
  const iso = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' });
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/* Differenza in giorni interi tra due Date.
   Usa i componenti locali per evitare sbalzi DST. */
function dayDiff(a, b) {
  const norm = dt => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
  return Math.round((norm(a) - norm(b)) / 86400000);
}

function cycleIndexFor(date) {
  const diff = dayDiff(date, ANCHOR);
  return (((ANCHOR_INDEX + diff) % 21) + 21) % 21;
}

function planCoordsFor(date) {
  const idx = cycleIndexFor(date);
  return { week: Math.floor(idx / 7), day: idx % 7, cycleDay: idx + 1 };
}

function planCoordsFromIdx(idx) {
  return { week: Math.floor(idx / 7), day: idx % 7, cycleDay: idx + 1 };
}

function mealsFor(idx) {
  const { week, day } = planCoordsFromIdx(idx);
  return PLAN[week][day];
}

function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/* ── Aggregazione lista della spesa ── */
function aggregateShopping(idxs) {
  const groups = {};
  CAT_ORDER.forEach(c => { groups[c] = new Map(); });

  for (const idx of idxs) {
    const meals = mealsFor(idx);
    const allItems = [...meals.c, ...meals.p, ...meals.d];
    for (const item of allItems) {
      if (item.free) continue;
      for (const s of item.s) {
        const key = s.n + (s.brand ? ' · ' + s.brand : '');
        const grp = groups[s.c];
        if (!grp.has(key)) {
          grp.set(key, { n: s.n, brand: s.brand, c: s.c, note: s.note, gen: !!s.gen, count: 0, qs: [] });
        }
        const entry = grp.get(key);
        entry.count += 1;
        if (s.q) entry.qs.push(s.q);
      }
    }
  }

  return CAT_ORDER.map(cat => ({
    cat, label: CAT_LABEL[cat],
    items: Array.from(groups[cat].values()).map(e => ({
      ...e,
      qDisplay: e.qs.length
        ? (e.count > 1 ? `${e.count} × ${e.qs[0]}` : e.qs[0])
        : (e.count > 1 ? `× ${e.count}` : ''),
    })).sort((a, b) => a.n.localeCompare(b.n)),
  })).filter(g => g.items.length > 0);
}

function rangeFromToday(todayIdx, days) {
  return Array.from({ length: days }, (_, i) => (todayIdx + i) % 21);
}

function rangeForWeek(weekIdx) {
  return Array.from({ length: 7 }, (_, i) => weekIdx * 7 + i);
}

Object.assign(window, {
  PLAN, CAT_ORDER, CAT_LABEL, DAY_NAMES_LONG, DAY_NAMES_SHORT, MONTHS,
  ANCHOR, ANCHOR_INDEX,
  getRomeToday, dayDiff, cycleIndexFor, planCoordsFor, planCoordsFromIdx,
  mealsFor, formatDate,
  aggregateShopping, rangeFromToday, rangeForWeek,
});
