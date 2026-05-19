/* plan-data.js — 21 giorni del piano + helpers shopping
   Categorie spesa:
     FV = Frutta & Verdura · P = Proteine · L = Latticini
     CL = Cereali & Legumi · D = Dispensa · B = Bevande & Altro
   Ogni meal item: { t: testo da mostrare, s: [shopping entries] }
   shopping entry: { n: nome normalizzato, q?: quantità, c: categoria, brand?, gen?, note? }
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

/* helpers ricorrenti */
const FRUTTO   = { t: '1 frutto di stagione', s: [{ n: 'Frutto di stagione', q: '1', c: 'FV', gen: true }] };
const VERDAP   = { t: 'Verdura cruda in apertura', s: [{ n: 'Verdura cruda', c: 'FV', gen: true }] };
const VERDMIX  = { t: 'Verdura cruda o cotta', s: [{ n: 'Verdura cruda o cotta', c: 'FV', gen: true }] };
const TEV      = { t: 'Tè verde senza zucchero', s: [{ n: 'Tè verde', c: 'B' }] };
const TISANA   = { t: 'Tisana senza zucchero', s: [{ n: 'Tisane miste', c: 'B' }] };
const TEOT     = { t: 'Tè o tisana senza zucchero', s: [{ n: 'Tè verde', c: 'B' }, { n: 'Tisane miste', c: 'B' }] };
const GRANOLA  = { t: 'Latte di mandorla o cocco con 5 cucchiai di granola (Ambrosiae)',
                   s: [{ n: 'Latte di mandorla o cocco', q: '1L', c: 'B', note: 'livebetter.eu' },
                       { n: 'Granola', brand: 'Ambrosiae', c: 'D' }] };
const PASTO_LIBERO = { t: 'PASTO LIBERO', s: [], free: true };
const SOLO_VERDURE = { t: 'Pasto di sole verdure', s: [{ n: 'Verdura cruda o cotta', c: 'FV', gen: true }] };

/* ────────── SETTIMANA 1 ────────── */
const W1 = [
  // LUN
  {
    c: [TEV, { t: 'Kefir intero 150g con lamponi, cannella e nocciole',
               s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Lamponi',c:'FV'},{n:'Cannella',c:'D'},{n:'Nocciole',c:'D'}] }],
    p: [{ t: 'Insalata con verdure miste, avocado e salmone affumicato selvaggio',
          s: [{n:'Insalata mista',c:'FV'},{n:'Avocado',c:'FV'},{n:'Salmone affumicato selvaggio',c:'P'}] }, FRUTTO],
    d: [VERDAP,
        { t: 'Caponata di ceci e verdure dolci',
          s: [{n:'Ceci',c:'CL'},{n:'Verdure miste per caponata',c:'FV'}] },
        { t: '70g di riso apollo', s: [{n:'Riso apollo',q:'70g',c:'CL'}] }, FRUTTO],
  },
  // MAR
  {
    c: [TISANA, GRANOLA],
    p: [VERDAP,
        { t: 'Caponata di ceci e verdure dolci',
          s: [{n:'Ceci',c:'CL'},{n:'Verdure miste per caponata',c:'FV'}] },
        { t: '70g di riso apollo', s: [{n:'Riso apollo',q:'70g',c:'CL'}] }, FRUTTO],
    d: [VERDMIX,
        { t: '220g di carne bianca (pollo, tacchino o coniglio)',
          s: [{n:'Carne bianca',q:'220g',c:'P',gen:true,note:'pollo/tacchino/coniglio'}] }, FRUTTO],
  },
  // MER
  {
    c: [{ t: 'Tisana alla malva senza zucchero', s:[{n:'Tisana alla malva',c:'B'}] },
        { t: 'Pane rustico a lievitazione naturale tostato con ricotta, fragole e cacao amaro',
          s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Ricotta',c:'L'},{n:'Fragole',c:'FV'},{n:'Cacao amaro',c:'D'}] }],
    p: [{ t: 'Insalata di fagioli, patata, pomodorini e 2 uova sode',
          s: [{n:'Fagioli',c:'CL'},{n:'Patata',c:'FV'},{n:'Pomodorini',c:'FV'},{n:'Uova',q:'2',c:'P'},{n:'Senape in grani',c:'D'}] }, FRUTTO],
    d: [VERDAP,
        { t: '80g di pasta di saraceno con asparagi',
          s: [{n:'Pasta di saraceno',q:'80g',c:'CL'},{n:'Asparagi',c:'FV'}] }, FRUTTO],
  },
  // GIO
  {
    c: [TEV, { t: 'Chia pudding alle fragole',
               s: [{n:'Semi di chia',c:'D'},{n:'Fragole',c:'FV'}] }],
    p: [VERDMIX, { t: '120g di carpaccio di manzo con rucola e scaglie di grana',
                   s: [{n:'Carpaccio di manzo',q:'120g',c:'P'},{n:'Rucola',c:'FV'},{n:'Grana padano',c:'L'}] }],
    d: [VERDMIX,
        { t: '250g di pesce', s: [{n:'Pesce',q:'250g',c:'P',gen:true}] },
        { t: 'Batata a pasta arancione', s: [{n:'Batata',c:'FV'}] }, FRUTTO],
  },
  // VEN
  {
    c: [TISANA, GRANOLA],
    p: [{ t: 'Insalata con verdure miste e 100g di feta',
          s: [{n:'Insalata mista',c:'FV'},{n:'Feta',q:'100g',c:'L'}] }, FRUTTO],
    d: [VERDAP, { t: '80g di riso rosso con verdure e nasello',
                  s: [{n:'Riso rosso',q:'80g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Nasello',c:'P'}] }, FRUTTO],
  },
  // SAB
  {
    c: [TEV, { t: 'Kefir intero 150g con kiwi e mandorle',
               s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Kiwi',c:'FV'},{n:'Mandorle',c:'D'}] }],
    p: [VERDMIX, { t: '250g di sgombro al vapore con sale, olio, limone, origano',
                   s: [{n:'Sgombro',q:'250g',c:'P'},{n:'Limone',c:'FV'},{n:'Origano',c:'D'}] }, FRUTTO],
    d: [VERDAP, { t: '80g di legumotti Barilla al pesto',
                  s: [{n:'Legumotti',brand:'Barilla',q:'80g',c:'CL'},{n:'Pesto',c:'D'}] }, FRUTTO],
  },
  // DOM
  {
    c: [TEOT, { t: 'Pancake con fragole',
                s: [{n:'Farina per pancake',c:'D'},{n:'Fragole',c:'FV'}] }],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

/* ────────── SETTIMANA 2 ────────── */
const W2 = [
  // LUN
  {
    c: [TEOT, { t: 'Pane rustico a lievitazione naturale con crema di mandorle e marmellata',
                s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Crema di mandorle',c:'D'},{n:'Marmellata',c:'D'}] }],
    p: [VERDMIX, { t: 'Frittata (2 uova) con agretti o altre verdure',
                   s: [{n:'Uova',q:'2',c:'P'},{n:'Agretti o spinaci',c:'FV'}] }, FRUTTO],
    d: [VERDAP, { t: 'Zuppa di fave',
                  s: [{n:'Fave fresche',c:'CL'},{n:'Cipolla',c:'FV'}] }, FRUTTO],
  },
  // MAR ← oggi (19 mag 2026)
  {
    c: [TEOT, { t: 'Yogurt greco intero 150g con miele, cannella, noci e succo di limone',
                s: [{n:'Yogurt greco intero',q:'150g',c:'L'},{n:'Miele',c:'D'},{n:'Cannella',c:'D'},{n:'Noci',c:'D'},{n:'Limone',c:'FV'}] }],
    p: [VERDAP, { t: 'Zuppa di fave', s: [{n:'Fave fresche',c:'CL'},{n:'Cipolla',c:'FV'}] }, FRUTTO],
    d: [VERDMIX, { t: '250g di pesce', s:[{n:'Pesce',q:'250g',c:'P',gen:true}] }, FRUTTO],
  },
  // MER
  {
    c: [TEV, { t: '2 uova strapazzate al burro ghee con lamponi',
               s: [{n:'Uova',q:'2',c:'P'},{n:'Burro ghee',c:'D'},{n:'Lamponi',c:'FV'}] }],
    p: [{ t: 'Insalata caprese con 150g di mozzarella di bufala',
          s: [{n:'Mozzarella di bufala',q:'150g',c:'L'},{n:'Pomodori',c:'FV'},{n:'Basilico',c:'FV'}] }, FRUTTO],
    d: [{ t: '70g di cous cous integrale con verdure, curry e piselli',
          s: [{n:'Cous cous integrale',q:'70g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Curry',c:'D'},{n:'Piselli',c:'CL'}] }, FRUTTO],
  },
  // GIO
  {
    c: [TEV, { t: 'Kefir intero 150g con fragole e 2 pezzetti di cioccolato fondente',
               s: [{n:'Kefir intero',q:'150g',c:'L'},{n:'Fragole',c:'FV'},{n:'Cioccolato fondente',c:'D'}] }],
    p: [{ t: '70g di cous cous integrale con verdure, curry e piselli',
          s: [{n:'Cous cous integrale',q:'70g',c:'CL'},{n:'Verdure miste',c:'FV'},{n:'Curry',c:'D'},{n:'Piselli',c:'CL'}] }, FRUTTO],
    d: [VERDMIX, { t: '220g di carne rossa grass fed',
                   s: [{n:'Carne rossa grass fed',q:'220g',c:'P'}] }, FRUTTO],
  },
  // VEN
  {
    c: [TISANA, GRANOLA],
    p: [{ t: 'Asparagi e 3 uova all\u2019occhio di bue al burro ghee',
          s: [{n:'Asparagi',c:'FV'},{n:'Uova',q:'3',c:'P'},{n:'Burro ghee',c:'D'}] }, FRUTTO],
    d: [VERDMIX, { t: '350g di calamari in padella con olio, limone e prezzemolo',
                   s: [{n:'Calamari',q:'350g',c:'P'},{n:'Limone',c:'FV'},{n:'Prezzemolo',c:'FV'}] }, FRUTTO],
  },
  // SAB
  {
    c: [TEV, { t: 'Pane rustico a lievitazione naturale tostato con avocado condito',
               s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Avocado',c:'FV'}] }],
    p: [VERDMIX, { t: '220g di carne bianca',
                   s: [{n:'Carne bianca',q:'220g',c:'P',gen:true,note:'pollo/tacchino/coniglio'}] },
        { t: 'Macedonia di frutta fresca con cannella',
          s: [{n:'Frutta mista',c:'FV',gen:true},{n:'Cannella',c:'D'}] }],
    d: [VERDAP, { t: '80g di pasta di legumi con zucchine',
                  s: [{n:'Pasta di legumi',q:'80g',c:'CL'},{n:'Zucchine',c:'FV'}] }],
  },
  // DOM
  {
    c: [TEV, { t: 'Banana bread o plumcake cheto',
               s: [{n:'Banana bread / plumcake cheto',c:'D',note:'fatto in casa o pasticceria cheto'}] }],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

/* ────────── SETTIMANA 3 ────────── */
const W3 = [
  // LUN
  {
    c: [TEV, { t: 'Banana bread o plumcake cheto', s:[{n:'Banana bread / plumcake cheto',c:'D'}] }],
    p: [{ t: 'Insalata con verdure miste, avocado e tonno in olio EVO 90g (Asdomar)',
          s: [{n:'Insalata mista',c:'FV'},{n:'Avocado',c:'FV'},{n:'Tonno in olio EVO',brand:'Asdomar',q:'90g',c:'P'}] }, FRUTTO],
    d: [{ t: 'Insalata di riso basmati integrale',
          s: [{n:'Riso basmati integrale',c:'CL'},{n:'Verdure miste',c:'FV'}] }, FRUTTO],
  },
  // MAR
  {
    c: [TEV, { t: 'Banana bread o plumcake cheto', s:[{n:'Banana bread / plumcake cheto',c:'D'}] }],
    p: [{ t: 'Insalata di riso basmati integrale',
          s: [{n:'Riso basmati integrale',c:'CL'},{n:'Verdure miste',c:'FV'}] }, FRUTTO],
    d: [VERDMIX, { t: 'Frittata (2 uova) con cipollotto di Tropea e patata',
                   s: [{n:'Uova',q:'2',c:'P'},{n:'Cipollotto di Tropea',c:'FV'},{n:'Patata',c:'FV'}] }, FRUTTO],
  },
  // MER
  {
    c: [TEV, { t: 'Banana bread o plumcake cheto', s:[{n:'Banana bread / plumcake cheto',c:'D'}] }],
    p: [VERDMIX, { t: '150g di ricotta di pecora condita',
                   s: [{n:'Ricotta di pecora',q:'150g',c:'L'}] }, FRUTTO],
    d: [VERDAP, { t: '80g di pasta di farro al sugo di melanzane e pesce spada',
                  s: [{n:'Pasta di farro',q:'80g',c:'CL'},{n:'Melanzane',c:'FV'},{n:'Pesce spada',c:'P'}] }, FRUTTO],
  },
  // GIO
  {
    c: [TEV, { t: 'Banana bread o plumcake cheto', s:[{n:'Banana bread / plumcake cheto',c:'D'}] }],
    p: [{ t: 'Insalata di rucola con pesca e 150g di cannellini al naturale',
          s: [{n:'Rucola',c:'FV'},{n:'Pesca',c:'FV'},{n:'Cannellini in vetro',q:'150g',c:'CL'},{n:'Aceto balsamico',c:'D'}] }],
    d: [VERDMIX, { t: '150g di hamburger grass fed',
                   s: [{n:'Hamburger grass fed',q:'150g',c:'P'}] }, FRUTTO],
  },
  // VEN
  {
    c: [TEV, { t: 'Kefir intero 150g con lamponi, cannella e nocciole',
               s:[{n:'Kefir intero',q:'150g',c:'L'},{n:'Lamponi',c:'FV'},{n:'Cannella',c:'D'},{n:'Nocciole',c:'D'}] }],
    p: [VERDMIX, { t: '100g di bresaola condita con olio e limone',
                   s: [{n:'Bresaola',q:'100g',c:'P'},{n:'Limone',c:'FV'}] }, FRUTTO],
    d: [VERDMIX, { t: '3 uova strapazzate al burro ghee',
                   s: [{n:'Uova',q:'3',c:'P'},{n:'Burro ghee',c:'D'}] },
        { t: 'Avocado', s:[{n:'Avocado',c:'FV'}] }, FRUTTO],
  },
  // SAB
  {
    c: [TISANA, GRANOLA],
    p: [VERDMIX, { t: '250g di pesce', s:[{n:'Pesce',q:'250g',c:'P',gen:true}] }],
    d: [{ t: 'Pizza', s: [{n:'Pizza',c:'D',note:'fuori o asporto'}] }],
  },
  // DOM
  {
    c: [TEV, { t: 'Kefir intero 150g con kiwi e mandorle',
               s:[{n:'Kefir intero',q:'150g',c:'L'},{n:'Kiwi',c:'FV'},{n:'Mandorle',c:'D'}] }],
    p: [PASTO_LIBERO],
    d: [SOLO_VERDURE, FRUTTO],
  },
];

const PLAN = [W1, W2, W3];

const DAY_NAMES_LONG = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
const DAY_NAMES_SHORT = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
const MONTHS = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];

/* ────────── Logica ciclica
   Ancora: martedì 19 maggio 2026  =  Sett. 2, Martedì  =  giorno 9 di 21 (indice 8)
*/
const ANCHOR = new Date(2026, 4, 19);   // mese 0-indexed
const ANCHOR_INDEX = 8;                  // 0-indexed cycle day for the anchor

function dayDiff(a, b) {
  const ma = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const mb = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ma - mb) / 86400000);
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

/* ────────── Aggregazione spesa
   range: array di indici di giorno-ciclo. Restituisce gruppi categorizzati.
*/
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

  // serializza
  return CAT_ORDER.map(cat => ({
    cat, label: CAT_LABEL[cat],
    items: Array.from(groups[cat].values()).map(e => ({
      ...e,
      qDisplay: e.qs.length
        ? (e.count > 1 ? `${e.count} × ${e.qs[0]}` : e.qs[0])
        : (e.count > 1 ? `× ${e.count}` : ''),
    })).sort((a,b) => a.n.localeCompare(b.n)),
  })).filter(g => g.items.length > 0);
}

function rangeFromToday(todayIdx, days) {
  return Array.from({length: days}, (_, i) => (todayIdx + i) % 21);
}

function rangeForWeek(weekIdx /* 0..2 */) {
  return Array.from({length: 7}, (_, i) => weekIdx * 7 + i);
}

function rangeForCurrentWeek(todayIdx) {
  return rangeForWeek(Math.floor(todayIdx / 21 ? 0 : todayIdx / 7));
}

Object.assign(window, {
  PLAN, CAT_ORDER, CAT_LABEL, DAY_NAMES_LONG, DAY_NAMES_SHORT, MONTHS,
  ANCHOR, ANCHOR_INDEX, dayDiff, cycleIndexFor, planCoordsFor, planCoordsFromIdx,
  mealsFor, formatDate,
  aggregateShopping, rangeFromToday, rangeForWeek, rangeForCurrentWeek,
});
