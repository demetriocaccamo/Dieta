/* recipes-data.js — Ricette del piano alimentare
   Dott.ssa Laura Mazza · Schema Nutrizionale Personalizzato
   Fonte: ricette.pdf (testo originale)

   Struttura ogni ricetta:
     id, title, tag, ingredients: [{q, n}], steps: [string]
*/

const RECIPES = {

  /* ── Schema 10-2026 ── */

  'pasta-ceci': {
    id: 'pasta-ceci',
    title: 'Minestra di Pasta e Ceci',
    tag: 'legumi · x4 persone · 10 + 45 min',
    ingredients: [
      { q: '500 g',        n: 'ceci lessati' },
      { q: '160 g',        n: 'ditalini' },
      { q: '½',            n: 'cipolla' },
      { q: '1 spicchio',   n: 'aglio' },
      { q: '½',            n: 'carota' },
      { q: '1 gambo',      n: 'sedano' },
      { q: '150 ml',       n: 'passata di pomodoro' },
      { q: '4 cucchiai',   n: 'olio EVO' },
      { q: 'q.b.',         n: 'acqua o brodo vegetale' },
      { q: 'q.b.',         n: 'sale, pepe, rosmarino' },
    ],
    steps: [
      'Trita molto finemente cipolla, sedano e carota.',
      'In un tegame ampio (meglio se di coccio) fai soffriggere il trito con lo spicchio d\'aglio sbucciato, a fuoco molto basso, finché la cipolla diventa trasparente.',
      'Aggiungi i ceci con un pizzico di sale ed elimina l\'aglio.',
      'Allunga subito con abbondante brodo vegetale caldo o acqua e aggiungi la passata di pomodoro.',
      'Copri lasciando un piccolo spiraglio e cuoci a fuoco dolce per 20–25 minuti, aggiungendo brodo caldo se serve.',
      'Preleva circa ⅓ dei ceci con un po\' di liquido e frullali col minipimer fino a ottenere una crema.',
      'Rimetti la crema in pentola e mescola: la minestra diventa cremosa. Cuoci altri 5 minuti a fuoco basso mescolando spesso.',
      'Aggiusta di sale, pepa e aggiungi il rosmarino tritato.',
      'Cuoci la pasta direttamente nella minestra, mescolando spesso perché non si attacchi.',
      'Quando la pasta è al dente spegni, copri e lascia riposare un paio di minuti.',
      'Servi con un filo d\'olio EVO, pepe macinato e qualche ago di rosmarino.',
    ],
    note: '💡 Basta per due pasti: si mangia a cena e il giorno dopo a pranzo.',
  },

  'zuppa-lenticchie': {
    id: 'zuppa-lenticchie',
    title: 'Zuppa di Lenticchie con Zucca e Spinaci',
    tag: 'legumi · x4 persone · 40 min',
    ingredients: [
      { q: '250 g',          n: 'lenticchie crude' },
      { q: '250 g',          n: 'zucca' },
      { q: '2 confezioni',   n: 'spinacini freschi' },
      { q: '1',              n: 'scalogno' },
      { q: '2 cucchiai',     n: 'olio EVO' },
      { q: 'q.b.',           n: 'sale, pepe' },
    ],
    steps: [
      'Pulisci la zucca e tagliala a pezzi.',
      'In una pentola scalda i 2 cucchiai d\'olio con lo scalogno tritato finemente e fai soffriggere qualche minuto.',
      'Aggiungi lenticchie e zucca.',
      'Copri con acqua e cuoci per circa 40 minuti, mescolando ogni tanto e aggiungendo acqua quando serve, così che le lenticchie restino sempre appena coperte.',
      'Quando lenticchie e zucca sono morbide, schiaccia delicatamente la zucca contro il bordo della pentola con il dorso del cucchiaio di legno per rendere la zuppa cremosa.',
      'Aggiungi gli spinaci, mescola e togli dal fuoco.',
      'Condisci con sale e pepe e servi calda.',
    ],
    note: '💡 Basta per due pasti: si mangia a cena e il giorno dopo a pranzo.',
  },

  /* ── Schema precedente (05-2026) — non più nel piano ── */

  'banana-bread': {
    id: 'banana-bread',
    title: 'Banana Bread di Castagne',
    tag: 'colazione · merenda · fatto in casa',
    ingredients: [
      { q: '3',             n: 'banane mature (2 nell\'impasto + 1 sul fondo)' },
      { q: '100 g',         n: 'latte intero da mucche al pascolo o di mandorle senza zucchero' },
      { q: '2',             n: 'uova bio' },
      { q: '60 g',          n: 'olio EVO' },
      { q: '200 g',         n: 'farina di castagne' },
      { q: '1 bustina',     n: 'lievito per dolci o lievito chimico' },
      { q: '1 cucchiaino',  n: 'cannella (facoltativo)' },
      { q: 'q.b.',          n: 'noci' },
    ],
    steps: [
      'In una ciotola schiaccia con la forchetta 2 banane mature.',
      'Unisci le uova e amalgama bene.',
      'Aggiungi i liquidi (latte e olio) e poi le polveri setacciate (farina di castagne e lievito) con la cannella e le noci.',
      'Foderate uno stampo da plumcake con carta forno bagnata e strizzata.',
      'Taglia la terza banana a metà per lungo e adagiala sul fondo dello stampo.',
      'Versa l\'impasto sopra la banana tagliata.',
      'Inforna nel forno già caldo ventilato a 180 °C per circa 40 minuti.',
    ],
  },

  'plumcake-cheto': {
    id: 'plumcake-cheto',
    title: 'Plumcake Cheto al Cioccolato',
    tag: 'cheto · senza glutine · fatto in casa',
    ingredients: [
      { q: '100 g',         n: 'farina di mandorle' },
      { q: '100 g',         n: 'burro fuso' },
      { q: '60 g',          n: 'eritritolo' },
      { q: '3',             n: 'uova (albumi e tuorli separati)' },
      { q: '½ bustina',     n: 'lievito per dolci' },
      { q: 'q.b.',          n: 'cioccolato fondente (a cubetti)' },
    ],
    steps: [
      'Monta a neve ferma i tre albumi.',
      'Lavora i tuorli con l\'eritritolo fino a che diventino spumosi.',
      'Aggiungi il burro fuso, il lievito e la farina di mandorle ai tuorli montati. Mescola bene.',
      'Unisci delicatamente gli albumi a neve senza farli smontare troppo.',
      'Riempi per metà gli stampini da plumcake (oppure usa uno stampo unico grande).',
      'Poni un cubetto di cioccolato fondente al centro di ogni stampo (o più cubetti per la lunghezza dello stampo grande).',
      'Ricopri con il restante composto.',
      'Cuoci in forno a 180 °C per circa 30 minuti.',
    ],
  },

  'caponata-ceci': {
    id: 'caponata-ceci',
    title: 'Caponata di Ceci e Verdure Dolci al Sesamo',
    tag: 'vegano · antiossidante',
    ingredients: [
      { q: '150–200 g',    n: 'ceci cotti (= 60–70 g secchi)' },
      { q: '250 g',        n: 'verdure dolci miste: carote, cipollotto, finocchi, zucchine' },
      { q: '1 cucchiaio',  n: 'tahina' },
      { q: '1',            n: 'limone — succo' },
      { q: '1 cucchiaio',  n: 'olio EVO (+ altro per condire)' },
      { q: 'q.b.',         n: 'aceto (se gradito)' },
      { q: 'q.b.',         n: 'prezzemolo fresco tritato' },
      { q: 'q.b.',         n: 'sale, pepe' },
    ],
    steps: [
      'Taglia le verdure a fette o rondelle di media dimensione e disponile in una teglia da forno.',
      'Aggiungi i ceci già cotti e mescola appena.',
      'Condisci con sale, pepe e un filo d\'olio EVO. Cuoci a 170–180 °C per circa 20 minuti (puoi aggiungere poca acqua man mano per evitare che brucino, oppure coprire con carta forno).',
      'Una volta cotti, mettili in un vassoio e aggiungi un po\' di aceto mescolando.',
      'A parte prepara l\'emulsione: in una ciotolina mescola la tahina con 1 cucchiaio di olio EVO, succo di limone, un pizzico di sale e pepe.',
      'Versa l\'emulsione sopra alla caponata e aggiungi prezzemolo fresco tritato.',
    ],
  },

  'chia-pudding': {
    id: 'chia-pudding',
    title: 'Overnight Chia Cacao e Fragole',
    tag: 'prep. serale · senza cottura',
    ingredients: [
      { q: '30 g',          n: 'semi di chia' },
      { q: '2 cucchiai',    n: 'yogurt greco 2–5% (o yogurt di soia)' },
      { q: '1 cucchiaino',  n: 'cacao amaro in polvere (scarso)' },
      { q: '150 ml',        n: 'bevanda vegetale senza zuccheri aggiunti' },
      { q: '8–10',          n: 'fragole (o 1 pera o 1 mela)' },
      { q: '1–2',           n: 'quadratini di cioccolato fondente >80%' },
    ],
    steps: [
      'La sera: mescola in un bicchiere o ciotolina i semi di chia con lo yogurt, la bevanda vegetale, il cacao e 3–4 fragole tagliate a cubetti piccoli. Amalgama bene.',
      'Lascia riposare in frigo durante la notte.',
      'Al mattino guarnisci in superficie con le restanti fragole a pezzi e il cioccolato tritato a scaglie.',
    ],
  },

  'pancake': {
    id: 'pancake',
    title: 'Pancake alle Fragole con Crema di Mandorle',
    tag: 'domenica · senza glutine',
    ingredients: [
      { q: '1',             n: 'uovo' },
      { q: '110 g',         n: 'yogurt greco bianco 2–5%' },
      { q: '30 g',          n: 'farina d\'avena' },
      { q: '½ cucchiaino',  n: 'lievito per dolci' },
      { q: '8–10',          n: 'fragole' },
      { q: '2 cucchiaini',  n: 'crema di frutta secca 100%' },
    ],
    steps: [
      'Mescola l\'uovo con lo yogurt greco.',
      'Aggiungi la farina d\'avena e il lievito. Amalgama fino a ottenere un composto omogeneo e cremoso.',
      'Taglia 3–4 fragole a cubetti e incorporale nel composto.',
      'Scalda una padella antiaderente, ungila con un filo d\'olio tamponato con carta assorbente.',
      'Versa il composto a cucchiaiate per formare i pancakes.',
      'Cuoci con coperchio a fuoco dolce: circa 3–4 minuti da un lato, poi 2 minuti dall\'altro.',
      'Guarnisci con le restanti fragole e con la crema di frutta secca.',
    ],
    note: '⁕ Variante vegana: sostituisci l\'uovo con 15 g di farina di ceci + 110 g yogurt di soia. Se l\'impasto è troppo denso aggiungi 1 cucchiaio di bevanda vegetale.',
  },

  'zuppa-fave': {
    id: 'zuppa-fave',
    title: 'Zuppa di Fave',
    tag: 'comfort food · legumi · x2–3 persone',
    ingredients: [
      { q: '1 kg',         n: 'fave fresche o surgelate Orogel (≈ 500 g scusciate)' },
      { q: '100 g',        n: 'pancetta a cubetti o speck' },
      { q: '1',            n: 'cipolla' },
      { q: '1',            n: 'carota' },
      { q: '1',            n: 'patata' },
      { q: 'q.b.',         n: 'olio EVO' },
      { q: 'q.b.',         n: 'sale, pepe, prezzemolo tritato' },
    ],
    steps: [
      'Sbuccia le fave sia dai baccelli che dalla pelle (se fresche).',
      'Taglia a dadini la pancetta. Trita cipolla, carota e patata.',
      'Metti una padella sul fuoco con un filo d\'olio e fai rosolare cipolla, carota e patata.',
      'Quando avranno preso colore, aggiungi le fave e una bella spolverata di pepe. Lascia insaporire qualche minuto.',
      'Ricopri i legumi con acqua calda e aggiungi il sale.',
      'Copri con un coperchio e cuoci a fiamma media per circa 30 minuti, finché le fave si rompono sotto un cucchiaio.',
      'Lascia tirare l\'acqua (la zuppa non deve essere brodosa, a meno che non lo si preferisca).',
      'Aggiungi prezzemolo tritato e altro pepe. Servi calda.',
    ],
  },

  'insalata-riso': {
    id: 'insalata-riso',
    title: 'Insalata di Riso Basmati Integrale',
    tag: 'estiva · vegano · x2 persone',
    ingredients: [
      { q: '200 g',        n: 'riso basmati integrale' },
      { q: '2 piccole',    n: 'melanzane (striate o normali)' },
      { q: '1 spicchio',   n: 'aglio' },
      { q: '10',           n: 'pomodorini' },
      { q: '2 cucchiai',   n: 'pinoli' },
      { q: '1 vasetto',    n: 'ceci già cotti' },
      { q: '2 cucchiai',   n: 'olive taggiasche' },
      { q: '5–10 foglie',  n: 'basilico fresco' },
      { q: 'q.b.',         n: 'sale, olio EVO' },
    ],
    steps: [
      'Cuoci il riso basmati integrale in acqua salata (seguire i tempi di cottura della confezione, in genere 35–40 min).',
      'Nel frattempo taglia le melanzane a cubetti e i pomodorini a metà.',
      'Cuoci melanzane e pomodorini al forno con olio, sale e aglio fino a doratura.',
      'Una volta pronti tutti gli ingredienti, uniscili in una ciotola capiente: riso, melanzane, pomodorini, ceci, olive e pinoli.',
      'Condisci con olio EVO, sale e abbondante basilico fresco. Mescola e servi.',
    ],
  },

  'spuntini': {
    id: 'spuntini',
    title: 'Spuntini',
    tag: '1–2 al giorno · metà mattina e metà pomeriggio',
    steps: [
      'Un frutto fresco + 2–3 noci',
      'Un frutto fresco + 1–2 quadratini di cioccolato fondente >80%',
      'Un frutto fresco a pezzi condito con 1–2 cucchiaini di crema di frutta secca 100%',
      'Uno yogurt bianco (anche greco o vegetale) con un quadratino di cioccolato fondente e/o un frutto fresco — non quotidianamente',
      'Un cappuccino di soia o mandorla (senza zucchero) con 1 cucchiaino di cacao o crema di frutta secca 100%',
      'Un frullato con yogurt bianco, un frutto fresco e un po\' di frutta secca o cacao',
      'Verdura cruda (carota, sedano, finocchio) con olio EVO e sale',
      'Verdura cruda (carota, sedano, finocchio) + 2–3 noci (o 1 cucchiaio di tahina o 40–50 g avocado)',
      'Una manciata di olive (10–12)',
      'Un uovo',
      'Jerky o biltong — livebetter.eu',
      'Chips di cocco',
      'Un pugno di frutta secca a guscio',
      '4 quadratini di cioccolato fondente',
    ],
    note: '💡 Se inserisci il frutto nello spuntino, toglilo da dopo il pasto (pranzo o cena).',
  },

};

Object.assign(window, { RECIPES });
