/* app.jsx — Dieta hi-fi mobile app */

/* ────── PALETTE & TOKENS ────── */
const D = {
  paper: '#FBF8F1',
  paperWarm: '#F4EFE2',
  surface: '#FFFFFF',
  ink: '#1A1814',
  inkSoft: '#3D3933',
  pencil: '#8D8579',
  rule: '#E5DDCB',
  ruleSoft: '#EFE9DB',
  green: '#93B186',
  greenInk: '#5B7651',
  greenTint: '#DDE6D4',
  terra: '#BD6943',
  terraInk: '#8A4A2E',
  terraTint: '#F1DACA',
  receipt: '#FFFCF1',
};

const FONT_DISPLAY = '"Newsreader", "Cormorant Garamond", Georgia, serif';
const FONT_BODY    = '"Manrope", system-ui, -apple-system, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, "SF Mono", monospace';
const FONT_RECEIPT = '"Special Elite", "Courier Prime", ui-monospace, monospace';

/* ────── ICONS ────── */
function I({ name, size = 22, color = 'currentColor', sw = 1.6 }) {
  const p = { stroke: color, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const M = {
    sun:  <g {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/></g>,
    bowl: <g {...p}><path d="M3 11h18M5 11c.5 5 3.5 7 7 7s6.5-2 7-7"/><path d="M9 7c0-1 1-2 2-2M13 6c1 0 2 .8 2 2"/></g>,
    moon: <g {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6 6 0 0 0 10.5 10.5z"/></g>,
    cart: <g {...p}><path d="M3 4h2l2.5 11h11l2-7H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></g>,
    cal:  <g {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></g>,
    today:<g {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><circle cx="12" cy="14.5" r="1.6" fill={color}/></g>,
    grid: <g {...p}><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></g>,
    cycle:<g {...p}><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/></g>,
    chev: <g {...p}><path d="M9 6l6 6-6 6"/></g>,
    chevL:<g {...p}><path d="M15 6l-6 6 6 6"/></g>,
    chevD:<g {...p}><path d="M6 9l6 6 6-6"/></g>,
    check:<g {...p}><path d="M5 12l5 5L20 6"/></g>,
    plus: <g {...p}><path d="M12 5v14M5 12h14"/></g>,
    info: <g {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></g>,
    leaf: <g {...p}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l8-8"/></g>,
    free: <g {...p}><path d="M5 19c4-10 10-14 14-14M9 8l3 3M19 5l-4 14"/></g>,
    dot:  <circle cx="12" cy="12" r="3" fill={color}/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>{M[name]}</svg>;
}

/* ────── PRIMITIVES ────── */
function Chip({ children, tone = 'ink', fill = false, size = 'sm' }) {
  const t = {
    ink:   { border: D.ink, color: D.ink, bg: D.ink },
    green: { border: D.green, color: D.greenInk, bg: D.green },
    terra: { border: D.terra, color: D.terraInk, bg: D.terra },
    soft:  { border: D.rule, color: D.pencil, bg: D.paperWarm },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '3px 9px' : '5px 12px',
      border: fill ? `1px solid ${t.bg}` : `1px solid ${t.border}`,
      background: fill ? t.bg : 'transparent',
      color: fill ? '#fff' : t.color,
      borderRadius: 999, fontFamily: FONT_MONO,
      fontSize: size === 'sm' ? 10.5 : 12,
      letterSpacing: 0.5, textTransform: 'uppercase',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>{children}</span>
  );
}

function Eyebrow({ children, color = D.pencil, style = {} }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: 1.4,
      textTransform: 'uppercase', color, ...style,
    }}>{children}</div>
  );
}

/* progress dots row */
function CycleStrip({ idx, onPick }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: 21 }, (_, i) => {
        const past = i < idx;
        const cur = i === idx;
        return (
          <button key={i} onClick={() => onPick && onPick(i)} aria-label={`Giorno ${i+1}`}
            style={{
              padding: 0, border: 0, background: 'transparent', cursor: 'pointer',
              width: cur ? 14 : 6, height: cur ? 14 : 10, borderRadius: cur ? 999 : 2,
              background: cur ? D.terra : past ? D.ink : D.rule,
              transition: 'all .25s ease',
            }}/>
        );
      })}
    </div>
  );
}

/* ────── HEADER (sticky top) ────── */
function AppHeader({ todayIdx, viewIdx, tab }) {
  const { week, day, cycleDay } = window.planCoordsFromIdx(viewIdx);
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: D.paper, paddingTop: 56,
      borderBottom: `1px solid ${D.rule}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 22px',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
            letterSpacing: -0.3, color: D.ink, fontStyle: 'italic',
          }}>Dieta</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: D.pencil }}>·  21gg</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Chip tone="soft">GG {String(cycleDay).padStart(2,'0')} / 21</Chip>
        </div>
      </div>
    </div>
  );
}

/* ────── BOTTOM TAB BAR (variante A · icon+label, verde tint attivo) ────── */
function TabBar({ active, onChange }) {
  const items = [
    { id: 'oggi', label: 'Oggi', icon: 'today' },
    { id: 'sett', label: 'Settimana', icon: 'grid' },
    { id: 'ciclo', label: 'Ciclo', icon: 'cycle' },
    { id: 'spesa', label: 'Spesa', icon: 'cart' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      borderTop: `1px solid ${D.rule}`,
      background: D.paper,
      padding: '8px 6px 26px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      zIndex: 55,
    }}>
      {items.map(it => {
        const on = it.id === active;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 14px', borderRadius: 14,
            background: on ? D.greenTint : 'transparent',
            transition: 'background .18s ease',
          }}>
            <I name={it.icon} size={22} color={on ? D.greenInk : D.pencil} sw={on ? 1.9 : 1.5}/>
            <span style={{
              fontFamily: FONT_BODY, fontSize: 10.5,
              fontWeight: on ? 700 : 500, letterSpacing: 0.2,
              color: on ? D.greenInk : D.pencil,
            }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ────── MEAL CARD (Oggi) ────── */
function MealCard({ kind, icon, time, items }) {
  const isFree = items.length === 1 && items[0].free;
  if (isFree) {
    return (
      <div style={{
        border: `1.4px dashed ${D.terra}`,
        background: D.terraTint + '66',
        borderRadius: 18, padding: '20px 22px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <I name={icon} size={18} color={D.terraInk}/>
          <Eyebrow color={D.terraInk}>{kind}</Eyebrow>
          <span style={{ marginLeft: 'auto', fontFamily: FONT_MONO, fontSize: 10, color: D.terraInk + 'aa' }}>{time}</span>
        </div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontStyle: 'italic',
          fontSize: 28, fontWeight: 500, color: D.terraInk, lineHeight: 1.1,
        }}>Pasto libero</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: D.terraInk + 'cc' }}>
          domenica, una volta a settimana
        </div>
      </div>
    );
  }
  return (
    <div style={{
      background: D.surface, border: `1px solid ${D.rule}`,
      borderRadius: 18, padding: '18px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <I name={icon} size={18} color={D.ink}/>
        <Eyebrow>{kind}</Eyebrow>
        <span style={{ marginLeft: 'auto', fontFamily: FONT_MONO, fontSize: 10, color: D.pencil, letterSpacing: 0.8 }}>{time}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, k) => {
          const text = it.t;
          const isGenericLast = /frutto di stagione|sole verdure/i.test(text);
          return (
            <li key={k} style={{
              fontFamily: text.length > 60 ? FONT_BODY : FONT_DISPLAY,
              fontSize: text.length > 60 ? 14.5 : 17,
              fontWeight: text.length > 60 ? 500 : 400,
              fontStyle: text.length > 60 ? 'normal' : 'normal',
              lineHeight: 1.4,
              color: isGenericLast && k === items.length - 1 ? D.pencil : D.ink,
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: 99,
                background: isGenericLast && k === items.length - 1 ? D.pencil : D.terra,
                marginTop: 9, flexShrink: 0,
              }}/>
              <span style={{ flex: 1 }}>{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ────── VISTA OGGI ────── */
function ViewOggi({ todayIdx, viewIdx, setViewIdx }) {
  const meals = window.mealsFor(viewIdx);
  const { week, day, cycleDay } = window.planCoordsFromIdx(viewIdx);
  const offset = ((viewIdx - todayIdx) % 21 + 21) % 21;
  const date = new Date(window.ANCHOR);
  date.setDate(date.getDate() + (viewIdx - todayIdx));
  const dayName = window.DAY_NAMES_LONG[date.getDay() === 0 ? 6 : date.getDay() - 1];
  const isToday = viewIdx === todayIdx;
  const eyebrowLabel = isToday ? 'OGGI' :
    offset === 1 ? 'DOMANI' :
    offset === 20 ? 'IERI' :
    `+${offset} GG`;

  return (
    <div style={{ padding: '20px 22px 18px' }}>
      {/* day navigation */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <button onClick={() => setViewIdx((viewIdx - 1 + 21) % 21)} style={{
          border: 0, background: 'transparent', cursor: 'pointer',
          width: 38, height: 38, borderRadius: 99, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>
          <I name="chevL" size={22} color={D.pencil}/>
        </button>
        {!isToday ? (
          <button onClick={() => setViewIdx(todayIdx)} style={{
            border: `1px solid ${D.terra}`, background: D.terraTint + '88',
            color: D.terraInk, fontFamily: FONT_BODY, fontWeight: 600,
            fontSize: 13, padding: '7px 16px', borderRadius: 99, cursor: 'pointer',
          }}>↶ Torna a oggi</button>
        ) : (
          <Eyebrow style={{ letterSpacing: 4 }}>OGGI</Eyebrow>
        )}
        <button onClick={() => setViewIdx((viewIdx + 1) % 21)} style={{
          border: 0, background: 'transparent', cursor: 'pointer',
          width: 38, height: 38, borderRadius: 99, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>
          <I name="chev" size={22} color={D.pencil}/>
        </button>
      </div>

      {/* big header */}
      <div style={{ marginBottom: 6 }}>
        <Eyebrow>
          {!isToday && (eyebrowLabel + ' · ')}Settimana {week + 1}
        </Eyebrow>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 52, fontWeight: 500,
          fontStyle: 'italic', lineHeight: 1, color: D.ink,
          marginTop: 6, letterSpacing: -1,
        }}>{dayName}</div>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 15, color: D.inkSoft,
          marginTop: 8, fontWeight: 500,
        }}>
          {window.formatDate(date)} {date.getFullYear()} · giorno {cycleDay} del ciclo
        </div>
      </div>

      {/* cycle strip */}
      <div style={{ margin: '18px 0 6px' }}>
        <CycleStrip idx={viewIdx} onPick={setViewIdx}/>
      </div>

      {/* meals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
        <MealCard kind="Colazione" icon="sun"  time="08·00" items={meals.c}/>
        <MealCard kind="Pranzo"    icon="bowl" time="13·00" items={meals.p}/>
        <MealCard kind="Cena"      icon="moon" time="20·00" items={meals.d}/>
      </div>

      {/* footer note */}
      <div style={{
        marginTop: 22, padding: '12px 14px',
        background: D.paperWarm, borderRadius: 12,
        fontFamily: FONT_BODY, fontSize: 12, color: D.inkSoft, lineHeight: 1.5,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <I name="info" size={14} color={D.pencil}/>
          <span>Bevande consentite: tè verde, tisane, caffè senza zucchero, acqua. Latte di mandorla o cocco consigliato: livebetter.eu</span>
        </div>
      </div>
    </div>
  );
}

/* ────── VISTA SETTIMANA ────── */
function ViewSettimana({ todayIdx, weekIdx, setWeekIdx, setViewIdx, setTab }) {
  const { week: todayWeek, day: todayDay } = window.planCoordsFromIdx(todayIdx);
  return (
    <div style={{ padding: '20px 22px 18px' }}>
      <Eyebrow>vista</Eyebrow>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 500,
        fontStyle: 'italic', lineHeight: 1, color: D.ink, marginTop: 4, letterSpacing: -1,
      }}>Settimana</div>

      <div style={{
        display: 'flex', gap: 6, marginTop: 18,
        background: D.paperWarm, padding: 4, borderRadius: 999,
      }}>
        {[0,1,2].map(w => (
          <button key={w} onClick={() => setWeekIdx(w)} style={{
            flex: 1, border: 0, padding: '8px 0', borderRadius: 999, cursor: 'pointer',
            background: w === weekIdx ? D.ink : 'transparent',
            color: w === weekIdx ? '#fff' : D.inkSoft,
            fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13,
          }}>Sett. {w+1}{w === todayWeek ? ' ●' : ''}</button>
        ))}
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
        {Array.from({ length: 7 }, (_, d) => {
          const dayIdx = weekIdx * 7 + d;
          const meals = window.PLAN[weekIdx][d];
          const isToday = dayIdx === todayIdx;
          return (
            <button key={d}
              onClick={() => { setViewIdx(dayIdx); setTab('oggi'); }}
              style={{
                border: 0, padding: '14px 14px', cursor: 'pointer', textAlign: 'left',
                borderTop: `1px solid ${D.rule}`,
                borderBottom: d === 6 ? `1px solid ${D.rule}` : 'none',
                background: isToday ? D.greenTint + 'aa' : 'transparent',
                display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 12,
                alignItems: 'center', position: 'relative',
              }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Eyebrow color={isToday ? D.greenInk : D.pencil}>{window.DAY_NAMES_SHORT[d]}</Eyebrow>
                <span style={{
                  fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 500,
                  fontStyle: 'italic', lineHeight: 1, color: isToday ? D.greenInk : D.ink,
                  marginTop: 2,
                }}>{String(d+1 + weekIdx*7).padStart(2,'0')}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { lbl: 'Col', m: meals.c },
                  { lbl: 'Pra', m: meals.p },
                  { lbl: 'Cen', m: meals.d },
                ].map((row, i) => {
                  const isFree = row.m[0]?.free;
                  // pick the most descriptive item — skip free, generic openers, and beverages
                  const pickMain = (items) => {
                    const nonGen = items.find(x =>
                      !x.free && x.s && x.s.length &&
                      x.s.some(s => !s.gen && s.c !== 'B'));
                    return nonGen?.t || items.find(x => !x.free)?.t || items[0].t;
                  };
                  const main = isFree ? 'PASTO LIBERO' : pickMain(row.m);
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'baseline', gap: 8,
                      fontFamily: FONT_BODY, fontSize: 12.5, color: isToday ? D.ink : D.inkSoft,
                    }}>
                      <span style={{
                        fontFamily: FONT_MONO, fontSize: 9, color: D.pencil,
                        letterSpacing: 1, width: 22, flexShrink: 0,
                      }}>{row.lbl.toUpperCase()}</span>
                      <span style={{
                        flex: 1, lineHeight: 1.3,
                        fontStyle: isFree ? 'italic' : 'normal',
                        color: isFree ? D.terraInk : 'inherit',
                        fontWeight: isFree ? 600 : 400,
                        overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                        WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                      }}>{main}</span>
                    </div>
                  );
                })}
              </div>
              <I name="chev" size={16} color={isToday ? D.greenInk : D.pencil}/>
              {isToday && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: D.green,
                }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ────── VISTA CICLO (21 giorni) ────── */
function ViewCiclo({ todayIdx, setViewIdx, setTab }) {
  return (
    <div style={{ padding: '20px 22px 18px' }}>
      <Eyebrow>vista</Eyebrow>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 500,
        fontStyle: 'italic', lineHeight: 1, color: D.ink, marginTop: 4, letterSpacing: -1,
      }}>Il ciclo</div>
      <div style={{
        fontFamily: FONT_BODY, fontSize: 13, color: D.inkSoft, marginTop: 8,
        lineHeight: 1.5,
      }}>21 giorni · dopo domenica della terza settimana, il piano ricomincia da lunedì della prima.</div>

      <div style={{ marginTop: 22 }}>
        {[0,1,2].map(w => {
          const startsAt = w * 7;
          const isCurrentWeek = todayIdx >= startsAt && todayIdx < startsAt + 7;
          const isPast = todayIdx >= startsAt + 7;
          return (
            <div key={w} style={{ marginBottom: 22 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <span style={{
                  fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
                  fontStyle: 'italic', color: isCurrentWeek ? D.terraInk : D.ink,
                }}>Settimana {w+1}</span>
                <Chip tone={isCurrentWeek ? 'terra' : 'soft'}>
                  {isCurrentWeek ? 'in corso' : isPast ? 'fatta' : 'in arrivo'}
                </Chip>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {Array.from({ length: 7 }, (_, d) => {
                  const idx = w * 7 + d;
                  const isToday = idx === todayIdx;
                  const past = idx < todayIdx;
                  const isFreeLunch = window.PLAN[w][d].p[0]?.free;
                  return (
                    <button key={d}
                      onClick={() => { setViewIdx(idx); setTab('oggi'); }}
                      style={{
                        aspectRatio: '1 / 1.15', position: 'relative',
                        border: isToday ? `1.6px solid ${D.terra}` : `1px solid ${past ? D.ruleSoft : D.rule}`,
                        background: isToday ? D.terraTint + '55' : past ? D.paperWarm : D.surface,
                        borderRadius: 8, padding: '6px 4px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontFamily: FONT_MONO, fontSize: 8, color: D.pencil, letterSpacing: 1 }}>
                          {window.DAY_NAMES_SHORT[d]}
                        </span>
                        <span style={{
                          fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600,
                          fontStyle: 'italic', lineHeight: 1, marginTop: 1,
                          color: isToday ? D.terraInk : past ? D.pencil : D.ink,
                        }}>{String(idx + 1).padStart(2,'0')}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[D.terra, D.green, D.ink].map((c, i) => {
                          const free = i === 1 && isFreeLunch;
                          return (
                            <span key={i} style={{
                              width: 3.5, height: 3.5, borderRadius: 99,
                              background: past ? D.pencil + '55' : free ? D.terra : c,
                            }}/>
                          );
                        })}
                      </div>
                      {isToday && (
                        <div style={{
                          position: 'absolute', top: -6, right: -6,
                          width: 18, height: 18, borderRadius: 99,
                          background: D.terra, color: '#fff',
                          fontFamily: FONT_MONO, fontSize: 9, fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 0 0 2px ${D.paper}`,
                        }}>{todayIdx + 1}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '12px 14px', background: D.paperWarm, borderRadius: 12,
        fontFamily: FONT_BODY, fontSize: 12, color: D.inkSoft,
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: D.terra }}/>colaz
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: D.green }}/>pranzo
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: D.ink }}/>cena
        </span>
      </div>
    </div>
  );
}

/* ────── VISTA SPESA (scontrino) ────── */
const RANGES = [
  { id: '3', label: '3 giorni', kind: 'rel', days: 3 },
  { id: '7', label: '7 giorni', kind: 'rel', days: 7 },
  { id: 'w0', label: 'Sett. 1', kind: 'week', week: 0 },
  { id: 'w1', label: 'Sett. 2', kind: 'week', week: 1 },
  { id: 'w2', label: 'Sett. 3', kind: 'week', week: 2 },
];

function ViewSpesa({ todayIdx, range, setRange, checked, toggleCheck }) {
  const idxs = range.kind === 'rel'
    ? window.rangeFromToday(todayIdx, range.days)
    : window.rangeForWeek(range.week);
  const groups = window.aggregateShopping(idxs);
  const total = groups.reduce((n,g) => n + g.items.length, 0);
  const done  = groups.reduce((n,g) => n + g.items.filter(it => checked[it.n + (it.brand||'')]).length, 0);

  const dateNow = new Date(window.ANCHOR);
  const dateEnd = new Date(window.ANCHOR);
  dateEnd.setDate(dateEnd.getDate() + (idxs.length - 1));

  const rangeLine = range.kind === 'rel'
    ? `${window.formatDate(dateNow)} — ${window.formatDate(dateEnd)}`
    : `Settimana ${range.week + 1} · piano completo`;

  return (
    <div style={{ padding: '20px 14px 18px' }}>
      <div style={{ padding: '0 8px' }}>
        <Eyebrow>vista</Eyebrow>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 500,
          fontStyle: 'italic', lineHeight: 1, color: D.ink, marginTop: 4, letterSpacing: -1,
        }}>Spesa</div>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 13, color: D.inkSoft, marginTop: 8,
        }}>{rangeLine} · {total} voci {done > 0 && <span style={{ color: D.greenInk }}>· {done} spuntate</span>}</div>
      </div>

      {/* range chips */}
      <div style={{
        display: 'flex', gap: 6, marginTop: 16, padding: '0 8px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {RANGES.map(r => {
          const on = r.id === range.id;
          return (
            <button key={r.id} onClick={() => setRange(r)} style={{
              border: `1px solid ${on ? D.ink : D.rule}`,
              background: on ? D.ink : 'transparent',
              color: on ? '#fff' : D.inkSoft,
              padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
              fontFamily: FONT_BODY, fontWeight: on ? 700 : 500, fontSize: 12.5,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>{r.label}</button>
          );
        })}
      </div>

      {/* receipt */}
      <div style={{
        marginTop: 18, marginInline: 4, padding: '20px 18px 4px',
        background: D.receipt,
        boxShadow: `0 1px 0 ${D.rule}, 0 2px 0 ${D.paper}, 0 3px 0 ${D.rule}`,
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), 96% 100%, 92% calc(100% - 7px), 88% 100%, 84% calc(100% - 9px), 80% 100%, 76% calc(100% - 5px), 72% 100%, 68% calc(100% - 11px), 64% 100%, 60% calc(100% - 4px), 56% 100%, 52% calc(100% - 11px), 48% 100%, 44% calc(100% - 6px), 40% 100%, 36% calc(100% - 10px), 32% 100%, 28% calc(100% - 5px), 24% 100%, 20% calc(100% - 11px), 16% 100%, 12% calc(100% - 7px), 8% 100%, 4% calc(100% - 10px), 0 100%)',
      }}>
        {/* receipt header */}
        <div style={{ textAlign: 'center', fontFamily: FONT_RECEIPT, color: D.ink, lineHeight: 1.5 }}>
          <div style={{ fontSize: 15, letterSpacing: 3 }}>* * D I E T A * *</div>
          <div style={{ fontSize: 11 }}>LISTA DELLA SPESA</div>
          <div style={{ fontSize: 10, color: D.pencil, marginTop: 2 }}>
            {rangeLine.toUpperCase()}<br/>
            #{range.id.toUpperCase()}—G{String(todayIdx+1).padStart(2,'0')}/21
          </div>
        </div>
        <div style={{
          margin: '12px -2px', borderTop: `1.5px dashed ${D.ink}`,
        }}/>

        {/* groups */}
        {groups.map(g => (
          <div key={g.cat} style={{ marginBottom: 12 }}>
            <div style={{
              fontFamily: FONT_RECEIPT, fontSize: 10.5, color: D.pencil,
              letterSpacing: 2, textAlign: 'center', marginBottom: 4,
            }}>— {g.label.toUpperCase()} —</div>
            {g.items.map((it, k) => {
              const key = it.n + (it.brand || '');
              const on = !!checked[key];
              return (
                <button key={k} onClick={() => toggleCheck(key)} style={{
                  display: 'flex', alignItems: 'baseline', gap: 8,
                  padding: '3px 0', width: '100%', textAlign: 'left',
                  border: 0, background: 'transparent', cursor: 'pointer',
                  fontFamily: FONT_RECEIPT, fontSize: 12.5,
                  color: on ? D.pencil : D.ink,
                  textDecoration: on ? 'line-through' : 'none',
                  textDecorationThickness: on ? '1px' : 'auto',
                }}>
                  <span style={{
                    width: 14, height: 14, border: `1.4px solid ${on ? D.greenInk : D.ink}`,
                    borderRadius: 3, display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                  }}>
                    {on && <I name="check" size={10} color={D.greenInk} sw={2.2}/>}
                  </span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span>{it.n.toLowerCase()}</span>
                    {it.brand && <span style={{ fontSize: 10, color: D.terraInk, textDecoration: 'none' }}>· {it.brand}</span>}
                    {it.gen && <span style={{ fontSize: 9.5, color: D.pencil, textDecoration: 'none' }}>(gen.)</span>}
                  </span>
                  <span style={{ fontFamily: FONT_RECEIPT, fontSize: 11, color: D.pencil, whiteSpace: 'nowrap' }}>
                    {it.qDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        ))}

        <div style={{ margin: '6px -2px 8px', borderTop: `1.5px dashed ${D.ink}` }}/>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: FONT_RECEIPT, fontSize: 11.5, color: D.ink, padding: '2px 0',
        }}>
          <span>VOCI TOTALI</span><span>{String(total).padStart(2,'0')}</span>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: FONT_RECEIPT, fontSize: 11.5, color: D.greenInk, padding: '2px 0',
        }}>
          <span>SPUNTATE</span><span>{String(done).padStart(2,'0')}</span>
        </div>

        <div style={{
          marginTop: 12, fontFamily: FONT_RECEIPT, fontSize: 10, color: D.pencil,
          lineHeight: 1.5, padding: '8px 0',
          borderTop: `1.5px dashed ${D.ink}`,
        }}>
          * Bevande consentite: tè verde, tisane,<br/>
          &nbsp;&nbsp;caffè senza zucchero, acqua.<br/>
          * Latte mandorla/cocco: livebetter.eu
        </div>

        <div style={{ textAlign: 'center', marginTop: 6, fontFamily: FONT_DISPLAY, fontSize: 15, fontStyle: 'italic', color: D.terraInk }}>
          grazie, mangia bene
        </div>
        <div style={{ textAlign: 'center', fontFamily: FONT_RECEIPT, fontSize: 22, letterSpacing: 1, color: D.ink, marginTop: 2, marginBottom: 16 }}>
          ||| | |||| || ||| | |
        </div>
      </div>
    </div>
  );
}

/* ────── APP ROOT ────── */
function DietaApp({ tweakDate }) {
  // Usa mezzanotte italiana (CEST/CET) indipendentemente dal fuso del dispositivo
  const today = tweakDate || window.getRomeToday();
  const todayIdx = window.cycleIndexFor(today);
  const [tab, setTab] = React.useState('oggi');
  const [viewIdx, setViewIdx] = React.useState(todayIdx);
  const [weekIdx, setWeekIdx] = React.useState(Math.floor(todayIdx / 7));
  const [range, setRange] = React.useState(RANGES[0]);
  const [checked, setChecked] = React.useState({});
  const toggleCheck = (key) => setChecked(s => ({ ...s, [key]: !s[key] }));

  // Ricarica la pagina a mezzanotte ora italiana così il giorno scatta correttamente
  React.useEffect(() => {
    if (tweakDate) return;
    const msUntilMidnightRome = () => {
      const romeStr = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Rome' });
      const romeNow = new Date(romeStr);
      const msSinceMidnight = (romeNow.getHours() * 3600 + romeNow.getMinutes() * 60 + romeNow.getSeconds()) * 1000 + romeNow.getMilliseconds();
      return 86400000 - msSinceMidnight + 500; // +500ms di margine
    };
    const timer = setTimeout(() => window.location.reload(), msUntilMidnightRome());
    return () => clearTimeout(timer);
  }, [tweakDate]);

  // sync week when entering settimana tab
  React.useEffect(() => {
    if (tab === 'sett') setWeekIdx(Math.floor(viewIdx / 7));
  }, [tab]);

  return (
    <div style={{
      position: 'relative', height: '100%', width: '100%',
      background: D.paper, color: D.ink, fontFamily: FONT_BODY,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        paddingBottom: 96,
      }}>
        <AppHeader todayIdx={todayIdx} viewIdx={viewIdx} tab={tab}/>
        {tab === 'oggi' && <ViewOggi todayIdx={todayIdx} viewIdx={viewIdx} setViewIdx={setViewIdx}/>}
        {tab === 'sett' && <ViewSettimana todayIdx={todayIdx} weekIdx={weekIdx} setWeekIdx={setWeekIdx} setViewIdx={setViewIdx} setTab={setTab}/>}
        {tab === 'ciclo' && <ViewCiclo todayIdx={todayIdx} setViewIdx={setViewIdx} setTab={setTab}/>}
        {tab === 'spesa' && <ViewSpesa todayIdx={todayIdx} range={range} setRange={setRange} checked={checked} toggleCheck={toggleCheck}/>}
      </div>
      <TabBar active={tab} onChange={setTab}/>
    </div>
  );
}

Object.assign(window, {
  D, FONT_DISPLAY, FONT_BODY, FONT_MONO, FONT_RECEIPT,
  I, Chip, Eyebrow, CycleStrip,
  AppHeader, TabBar, MealCard,
  ViewOggi, ViewSettimana, ViewCiclo, ViewSpesa,
  DietaApp, RANGES,
});
