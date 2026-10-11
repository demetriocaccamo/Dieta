/* plan-data.js — 21 giorni del piano + helpers shopping
   Fonte: Schema Nutrizionale Personalizzato (10-2026) — Dott.ssa Laura Mazza

   Categorie spesa:
     FV = Frutta & Verdura · P = Proteine · L = Latticini
     CL = Cereali & Legumi · D = Dispensa · B = Bevande & Altro
   Ogni giorno: { c: colazione, p: pranzo, m: merenda, d: cena }
   Ogni meal item: { t: testo, s: [shopping entries], recipe?, batch?, free?, fast?, alt? }
     batch: piatto cucinato una volta e mangiato in due pasti → in spesa conta una volta sola
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
const TEV         = { t: 'Tè verde senza zucchero — o orzo, caffè, tisane, acqua', s: [{ n: 'Tè verde', c: 'B' }] };
const PASTO_LIBERO= { t: 'PASTO LIBERO', s: [], free: true };
const DIGIUNO     = { t: 'Digiuno', s: [], fast: true };
const DIGIUNO_ALT = { ...DIGIUNO, alt: 'In alternativa: pasto di sole verdure' };

/* colazioni */
const PANE_MANDORLE = { t: 'Pane rustico a lievitazione naturale tostato con crema di mandorle e marmellata',
                        s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Crema di mandorle 100%',c:'D'},{n:'Marmellata',c:'D'}] };
const YOG_NOCI      = { t: 'Yogurt greco con noci, cannella e succo di limone',
                        s: [{n:'Yogurt greco',c:'L'},{n:'Noci',c:'D'},{n:'Cannella',c:'D'},{n:'Limone',c:'FV'}] };
const YOG_FRUTTO    = { t: 'Yogurt greco con 1 frutto fresco di stagione',
                        s: [{n:'Yogurt greco',c:'L'},{n:'Frutta di stagione',q:'1',c:'FV',gen:true}] };
const MUESLI        = { t: 'Latte di mandorla con 4 cucchiai di muesli',
                        s: [{n:'Latte di mandorla',c:'B'},{n:'Muesli',c:'D'}] };
const UOVA_GHEE     = { t: '2 uova strapazzate al burro ghee',
                        s: [{n:'Uova',q:'2',c:'P'},{n:'Burro ghee',c:'D'}] };

/* merende */
const FRUTTA_SECCA  = { t: '1 pugno di frutta secca a guscio', s: [{n:'Frutta secca a guscio',c:'D'}] };
const CIOCCOLATO    = { t: '2 quadrati di cioccolato fondente min 85%', s: [{n:'Cioccolato fondente min 85%',c:'D'}] };

/* piatti cucinati una volta per due pasti */
const PASTA_CECI = { t: 'Pasta e ceci (vedi ricetta)', recipe: 'pasta-ceci', batch: 'pasta-ceci',
                     s: [{n:'Ceci lessati',q:'500g',c:'CL'},{n:'Ditalini',q:'160g',c:'CL'},
                         {n:'Cipolla',c:'FV'},{n:'Aglio',c:'FV'},{n:'Carota',c:'FV'},{n:'Sedano',c:'FV'},
                         {n:'Passata di pomodoro',q:'150ml',c:'D'},{n:'Rosmarino',c:'FV'}] };
const ZUPPA_CEREALI = { t: 'Zuppa di cereali e legumi misti (comprare i mix secchi da cuocere)', batch: 'zuppa-cereali',
                        s: [{n:'Mix secco cereali e legumi',c:'CL'}] };
const ZUPPA_LENTICCHIE = { t: 'Zuppa di lenticchie con zucca e spinaci (vedi ricetta)', recipe: 'zuppa-lenticchie', batch: 'zuppa-lenticchie',
                           s: [{n:'Lenticchie secche',q:'250g',c:'CL'},{n:'Zucca',q:'250g',c:'FV'},
                               {n:'Spinacini freschi',q:'2 confezioni',c:'FV'},{n:'Scalogno',c:'FV'}] };
const CARNE_BIANCA  = { t: '220 g di carne bianca (pollo, tacchino o coniglio)',
                        s: [{n:'Carne bianca',q:'220g',c:'P',gen:true,note:'pollo/tacchino/coniglio'}] };

/* ══════════════════ SETTIMANA 1 ══════════════════ */
const W1 = [
  /* LUN */
  {
    c: [TEV, PANE_MANDORLE],
    p: [VERDMIX,
        { t: 'Frittata (3 uova) con porro', s: [{n:'Uova',q:'3',c:'P'},{n:'Porro',c:'FV'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '250 g di merluzzo con pomodorini, capperi e olive taggiasche',
          s: [{n:'Merluzzo',q:'250g',c:'P'},{n:'Pomodorini',c:'FV'},{n:'Capperi',c:'D'},{n:'Olive taggiasche',c:'D'}] },
        { t: 'Patata al vapore', s: [{n:'Patata',c:'FV'}] },
        FRUTTO],
  },
  /* MAR */
  {
    c: [TEV, YOG_NOCI],
    p: [VERDMIX, CARNE_BIANCA, FRUTTO],
    m: [CIOCCOLATO],
    d: [VERDAP, PASTA_CECI, FRUTTO],
  },
  /* MER */
  {
    c: [TEV,
        { t: '60 g di prosciutto crudo di Parma', s: [{n:'Prosciutto crudo di Parma',q:'60g',c:'P'}] },
        FRUTTO],
    p: [VERDAP, PASTA_CECI],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '250 g di branzino al forno', s: [{n:'Branzino',q:'250g',c:'P'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV, UOVA_GHEE, FRUTTO],
    p: [{ t: 'Insalata di cavolo cappuccio con mela, noci e 70 g di parmigiano reggiano',
          s: [{n:'Cavolo cappuccio',c:'FV'},{n:'Mela',c:'FV'},{n:'Noci',c:'D'},{n:'Parmigiano reggiano',q:'70g',c:'L'}] }],
    m: [CIOCCOLATO],
    d: [VERDAP,
        { t: '80 g di riso basmati integrale con zucca e rosmarino (non va cucinato come un risotto)',
          s: [{n:'Riso basmati integrale',q:'80g',c:'CL'},{n:'Zucca',c:'FV'},{n:'Rosmarino',c:'FV'}] },
        FRUTTO],
  },
  /* VEN */
  {
    c: [TEV,
        { t: 'Pane rustico a lievitazione naturale tostato con ricotta e fichi',
          s: [{n:'Pane a lievitazione naturale',c:'D'},{n:'Ricotta',c:'L'},{n:'Fichi',c:'FV'}] }],
    p: [{ t: 'Insalata di rucola con pesca o pera e 200 g di fagioli cannellini — condire con sale, olio e aceto balsamico',
          s: [{n:'Rucola',c:'FV'},{n:'Pesca o pera',c:'FV'},{n:'Fagioli cannellini',q:'200g',c:'CL'},{n:'Aceto balsamico',c:'D'}] }],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '150 g di hamburger grass fed alla piastra', s: [{n:'Hamburger grass fed',q:'150g',c:'P'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TEV,
        { t: 'Yogurt greco con 1 frutto fresco di stagione e cannella',
          s: [{n:'Yogurt greco',c:'L'},{n:'Frutta di stagione',q:'1',c:'FV',gen:true},{n:'Cannella',c:'D'}] }],
    p: [{ t: 'Insalata, pomodorini, avocado e 100 g di sgombro in vetro al naturale (da condire)',
          s: [{n:'Insalata',c:'FV'},{n:'Pomodorini',c:'FV'},{n:'Avocado',c:'FV'},
              {n:'Sgombro in vetro al naturale',q:'100g',c:'P'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [{ t: 'Pizza marinara (no mozzarella) con alici, capperi e olive',
          s: [{n:'Pizza marinara',c:'D',note:'fuori o asporto'}] }],
  },
  /* DOM */
  {
    c: [TEV, MUESLI],
    p: [PASTO_LIBERO],
    m: [],
    d: [DIGIUNO_ALT],
  },
];

/* ══════════════════ SETTIMANA 2 ══════════════════ */
const W2 = [
  /* LUN */
  {
    c: [TEV, YOG_NOCI],
    p: [VERDMIX, CARNE_BIANCA, FRUTTO],
    m: [FRUTTA_SECCA],
    d: [VERDAP, ZUPPA_CEREALI, FRUTTO],
  },
  /* MAR */
  {
    c: [TEV, PANE_MANDORLE],
    p: [VERDAP, ZUPPA_CEREALI, FRUTTO],
    m: [{ t: '50 g di parmigiano reggiano', s: [{n:'Parmigiano reggiano',q:'50g',c:'L'}] }],
    d: [VERDMIX,
        { t: '3 uova all\'occhio di bue al burro ghee', s: [{n:'Uova',q:'3',c:'P'},{n:'Burro ghee',c:'D'}] },
        FRUTTO],
  },
  /* MER */
  {
    c: [TEV, YOG_FRUTTO],
    p: [VERDMIX,
        { t: '100 g di roastbeef affettato condito con olio e limone',
          s: [{n:'Roastbeef affettato',q:'100g',c:'P'},{n:'Limone',c:'FV'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '250 g di orata', s: [{n:'Orata',q:'250g',c:'P'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV, UOVA_GHEE, FRUTTO],
    p: [{ t: 'Insalata con verdure miste e 120 g di feta',
          s: [{n:'Insalata mista',c:'FV'},{n:'Feta',q:'120g',c:'L'}] },
        FRUTTO],
    m: [CIOCCOLATO],
    d: [VERDMIX,
        { t: '90 g di pasta di grano saraceno con broccoli, acciuga sott\'olio e olive taggiasche',
          s: [{n:'Pasta di grano saraceno',q:'90g',c:'CL'},{n:'Broccoli',c:'FV'},
              {n:'Acciughe sott\'olio',c:'P'},{n:'Olive taggiasche',c:'D'}] }],
  },
  /* VEN */
  {
    c: [TEV, PANE_MANDORLE],
    p: [{ t: 'Insalata di carote con 200 g di ceci (ok in vetro al naturale) — condire con sale, olio, succo di limone e curry',
          s: [{n:'Carote',c:'FV'},{n:'Ceci in vetro al naturale',q:'200g',c:'CL'},{n:'Limone',c:'FV'},{n:'Curry',c:'D'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '250 g di nasello al vapore condito con olio ed erbe aromatiche',
          s: [{n:'Nasello',q:'250g',c:'P'},{n:'Erbe aromatiche',c:'FV'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TEV, YOG_FRUTTO],
    p: [{ t: 'Insalata di fagiolini con 3 uova sode',
          s: [{n:'Fagiolini',c:'FV'},{n:'Uova',q:'3',c:'P'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [{ t: 'Pinzimonio di verdure', s: [{n:'Verdure per pinzimonio',c:'FV',gen:true}] },
        { t: 'Polenta taragna (ok rapida) con funghi trifolati o in umido',
          s: [{n:'Polenta taragna',c:'CL'},{n:'Funghi',c:'FV'}] }],
  },
  /* DOM */
  {
    c: [TEV, MUESLI],
    p: [PASTO_LIBERO],
    m: [],
    d: [DIGIUNO],
  },
];

/* ══════════════════ SETTIMANA 3 ══════════════════ */
const W3 = [
  /* LUN */
  {
    c: [TEV, PANE_MANDORLE],
    p: [VERDMIX,
        { t: '250 g di alici o sardine in padella con olio, aglio, limone e prezzemolo (farsele pulire in pescheria e aprire a libro)',
          s: [{n:'Alici o sardine',q:'250g',c:'P',note:'pulite e aperte a libro'},{n:'Aglio',c:'FV'},
              {n:'Limone',c:'FV'},{n:'Prezzemolo',c:'FV'}] },
        FRUTTO],
    m: [CIOCCOLATO],
    d: [VERDAP, ZUPPA_LENTICCHIE, FRUTTO],
  },
  /* MAR */
  {
    c: [TEV, YOG_NOCI],
    p: [VERDAP, ZUPPA_LENTICCHIE, FRUTTO],
    m: [{ t: 'Parmigiano reggiano', s: [{n:'Parmigiano reggiano',c:'L'}] }],
    d: [VERDMIX,
        { t: 'Frittata (3 uova) con spinaci', s: [{n:'Uova',q:'3',c:'P'},{n:'Spinaci',c:'FV'}] },
        FRUTTO],
  },
  /* MER */
  {
    c: [TEV, MUESLI],
    p: [VERDMIX,
        { t: '100 g di bresaola con olio e limone', s: [{n:'Bresaola',q:'100g',c:'P'},{n:'Limone',c:'FV'}] },
        FRUTTO],
    m: [FRUTTA_SECCA],
    d: [VERDMIX,
        { t: '90 g di pasta di farro con zucchine e gamberi',
          s: [{n:'Pasta di farro',q:'90g',c:'CL'},{n:'Zucchine',c:'FV'},{n:'Gamberi',c:'P'}] },
        FRUTTO],
  },
  /* GIO */
  {
    c: [TEV, UOVA_GHEE, FRUTTO],
    p: [{ t: 'Panino con hummus di ceci e verdure grigliate o pomodoro condito',
          s: [{n:'Pane per panino',c:'D'},{n:'Hummus di ceci',c:'CL'},{n:'Verdure da grigliare o pomodoro',c:'FV'}] }],
    m: [FRUTTA_SECCA],
    d: [VERDMIX, CARNE_BIANCA, FRUTTO],
  },
  /* VEN */
  {
    c: [TEV, PANE_MANDORLE],
    p: [VERDMIX,
        { t: '150 g di caprino condito', s: [{n:'Caprino',q:'150g',c:'L'}] },
        FRUTTO],
    m: [CIOCCOLATO],
    d: [VERDMIX,
        { t: 'Insalata di polipo con patate e olive taggiasche',
          s: [{n:'Polipo',c:'P'},{n:'Patate',c:'FV'},{n:'Olive taggiasche',c:'D'}] },
        FRUTTO],
  },
  /* SAB */
  {
    c: [TEV, YOG_FRUTTO],
    p: [VERDMIX,
        { t: '220 g di carne rossa grass fed', s: [{n:'Carne rossa grass fed',q:'220g',c:'P'}] }],
    m: [FRUTTO, FRUTTA_SECCA],
    d: [VERDAP,
        { t: '90 g di legumotti Barilla al sugo di pomodoro fresco',
          s: [{n:'Legumotti',brand:'Barilla',q:'90g',c:'CL'},{n:'Pomodori freschi',c:'FV'}] }],
  },
  /* DOM */
  {
    c: [TEV, MUESLI],
    p: [PASTO_LIBERO],
    m: [],
    d: [DIGIUNO],
  },
];

const PLAN = [W1, W2, W3];

const DAY_NAMES_LONG  = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
const DAY_NAMES_SHORT = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
const MONTHS = ['gennaio','febbraio','marzo','aprile','maggio','giugno',
                'luglio','agosto','settembre','ottobre','novembre','dicembre'];

/* ──────────────────────────────────────────────────────────
   LOGICA CICLICA

   Ancora: Lunedì 12 ottobre 2026 (inizio schema 10-2026) = Settimana 1 Lunedì = indice 0
   Il ciclo si ripete ogni 21 giorni.
────────────────────────────────────────────────────────── */
const ANCHOR       = new Date(2026, 9, 12); // 12 ottobre 2026 — Lun W1 — idx 0
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

/* Somma quantità con la stessa unità ('3' + '2' → '5', '250g' + '250g' → '500g').
   Se le unità non coincidono restituisce null. */
function sumQuantities(qs) {
  const parsed = qs.map(q => q.match(/^(\d+)\s*(g|ml)?$/));
  if (parsed.some(m => !m)) return null;
  const unit = parsed[0][2] || '';
  if (parsed.some(m => (m[2] || '') !== unit)) return null;
  return parsed.reduce((n, m) => n + Number(m[1]), 0) + unit;
}

/* ── Aggregazione lista della spesa ── */
function aggregateShopping(idxs) {
  const groups = {};
  CAT_ORDER.forEach(c => { groups[c] = new Map(); });

  const batches = new Set();
  for (const idx of idxs) {
    const meals = mealsFor(idx);
    const allItems = [...meals.c, ...meals.p, ...meals.m, ...meals.d];
    for (const item of allItems) {
      if (item.free || item.fast) continue;
      // piatto cucinato una volta per due pasti: si compra una volta sola
      if (item.batch) {
        if (batches.has(item.batch)) continue;
        batches.add(item.batch);
      }
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
        ? (sumQuantities(e.qs) || (e.count > 1 ? `${e.count} × ${e.qs[0]}` : e.qs[0]))
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
