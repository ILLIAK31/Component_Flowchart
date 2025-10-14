/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Global, keyframes } from '@emotion/react';

/* ====== 0) СЦЕНА (зовнішні відступи) ====== */
const PAD_X = 'clamp(32px, 6vw, 160px)';
const PAD_Y = 'clamp(24px, 4vh, 96px)';

const stage = {
  position: 'fixed',
  inset: 0,
  padding: `${PAD_Y} ${PAD_X}`,
  boxSizing: 'border-box',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
};

/* ====== 0.1) ЄДИНИЙ СКЕЙЛЕР (масштабує все як одну картинку) ====== */
const BASE_W = 1800; // базова ширина макета (px)
const BASE_H = 900;  // базова висота макета (px)

function Scaler({ children }) {
  const hostRef = useRef(null);
  const [k, setK] = useState(1);

  useLayoutEffect(() => {
    const recalc = () => {
      if (!hostRef.current) return;
      const rect = hostRef.current.getBoundingClientRect();
      setK(Math.min(rect.width / BASE_W, rect.height / BASE_H));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  return (
    <div ref={hostRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: BASE_W,
          height: BASE_H,
          transform: `translate(-50%, -50%) scale(${k})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ====== 1) КОНСТАНТИ/АНІМАЦІЇ ====== */
const COLOR_BG = 'white';
const COLOR_LINE = '#2b2929ff';
const SPEED = '4s';
const CORNER_R = '8px';
const PAR_GAP = '24px'; // було clamp(... vmin ...) — фіксуємо в px, щоб не реагувало на viewport
const PAR_LEN = '45%';
const LINE_W = 1;

const moveDotStraight = keyframes({ '0%': { top: '10%' }, '25%': { top: '65%' }, '100%': { top: '65%' } });
const moveDotStraightDeep = keyframes({ '0%': { top: '30%', left: '54%' }, '50%': { top: '82%', left: '54%' }, '100%': { top: '82%', left: '54%' } });
const moveDotStraightDeeper = keyframes({ '0%': { top: '10%', left: '50.1%' }, '60%': { top: '82%', left: '50.1%' }, '100%': { top: '82%', left: '50.1%' } });
const moveDotCorner = keyframes({ '0%': { top: '40%', left: 'calc(30% - 1px)' }, '45%': { top: '88%', left: 'calc(30% - 1px)' }, '100%': { top: '88%', left: 'calc(100% - 1px)' } });
const moveDotCornerLeft = keyframes({ '0%': { top: '40%', left: '30%' }, '45%': { top: '88%', left: '30%' }, '100%': { top: '88%', left: '100%' } });
const moveDotCornerRight = keyframes({ '0%': { top: '40%', left: '30%' }, '45%': { top: '88%', left: '30%' }, '100%': { top: '88%', left: '100%' } });
const moveDotBLZig = keyframes({ '0%': { top: '40.3%', left: 'calc(5% + 19%)' }, '30%': { top: '40.3%', left: 'calc(55% + 1px)' }, '70%': { top: '88%', left: 'calc(55% + 1px)' }, '100%': { top: '88%', left: '80%' } });
const moveDotBRZig = keyframes({ '0%': { top: '40.3%', left: 'calc(5% + 19%)' }, '30%': { top: '40.3%', left: '55%' }, '70%': { top: '88%', left: '55%' }, '100%': { top: '88%', left: '80%' } });

const moveDotTLZig = keyframes({
  '0%': { top: '41.5%', left: 'calc(5% + 19%)' },
  '30%': { top: '41.5%', left: '55%' },
  '70%': { top: '89%', left: '55%' },
  '100%': { top: '89%', left: '80%' },
});

/* ====== 2) СТИЛІ (оригінальні) ====== */
const wrapper = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vmin',
  width: '180vmin',

  '& > .item': {
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: '50% 100%',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'visible',
  },

  '& > .item.-v-down': { transform: 'translateX(-50%) rotate(180deg)' },

  '& > .item > .line': {
    height: '60%',
    width: '52%',
    borderRight: `${LINE_W}px dashed ${COLOR_LINE}`,
  },

  '& > .item > .dot': { position: 'absolute', inset: 0 },
  '& > .item > .dot::after': {
    content: "''",
    position: 'absolute',
    left: 'calc(53% + 1px)',
    top: '10%',
    transform: 'translate(-50%, -50%)',
    height: '0.9vmin',
    width: '0.9vmin',
    background: '#fc4d57',
    border: `2px solid #fc4d57`,
    borderRadius: '50%',
    animation: `${moveDotStraight} ${SPEED} linear infinite`,
  },

  '& > .item.-bottom-main > .dot::after': { animation: `${moveDotStraightDeep} ${SPEED} linear infinite` },

  '& > .item.-v-down > .circle > img': { transform: 'rotate(180deg)', width: '29%' },

  '& > .item.-parallel': {
    left: `calc(50% + ${PAR_GAP})`,
    height: PAR_LEN,
    zIndex: 0
  },

  '& > .item.-parallel > .dot::after': {
    animation: `${moveDotStraightDeeper} ${SPEED} linear infinite`,
    animationDirection: 'reverse'
  },

  /* картки */
  '& > .item > .circle, & > .item.-type2 > .circle': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLOR_BG,
    overflow: 'hidden',
    boxShadow: '0 0 3vmin rgba(0,0,0,.15)',
    pointerEvents: 'auto',
    width: 'var(--thumb-w, 50%)',
    height: 'var(--thumb-h, 20%)',
    boxSizing: 'border-box',
    padding: 'var(--pad-y, 0) var(--pad-x, 0)',
    zIndex: 2,
  },
  '& > .item > .circle > img, & > .item.-type2 > .circle > img': {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  /* L-блоки (база) */
  '& > .item.-type2': { top: 0, left: 0, transform: 'none', transformOrigin: '100% 100%' },
  '& > .item.-type2 > .line': {
    position: 'absolute',
    top: '41%',
    left: 'calc(30% - 1px)',
    width: '70%',
    height: '48%',
    borderRight: 'none',
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottom: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottomLeftRadius: CORNER_R,
  },
  '& > .item.-type2 > .dot': { position: 'absolute', inset: 0 },
  '& > .item.-type2 > .dot::after': {
    content: "''",
    position: 'absolute',
    left: 'calc(30% - 1px)',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    height: '0.9vmin',
    width: '0.9vmin',
    background: '#fc4d57',
    border: `2px solid #fc4d57`,
    borderRadius: '50%',
    animation: `${moveDotCorner} ${SPEED} linear infinite`,
  },

  '& > .item.-type2 > .circle': {
    top: '30%',
    left: '30%',
    transform: 'translate(-50%, -50%)'
  },

  '& > .item.-type2.-tr': { transform: 'scaleX(-1)' },
  '& > .item.-type2.-br': { transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2.-bl': { transform: 'scaleY(-1)' },
  '& > .item.-type2.-tr > .dot::after, & > .item.-type2.-br > .dot::after': { animationDirection: 'reverse' },
  '& > .item.-type2.-tr > .circle > img': { transform: 'scaleX(-1)' },
  '& > .item.-type2.-br > .circle > img': { transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2.-bl > .circle > img': { transform: 'scaleY(-1)' },
  '& > .item.-type2.-tl > .dot::after, & > .item.-type2.-bl > .dot::after': { animation: `${moveDotCornerLeft} ${SPEED} linear infinite` },
  '& > .item.-type2.-tr > .dot::after, & > .item.-type2.-br > .dot::after': { animation: `${moveDotCornerRight} ${SPEED} linear infinite`, animationDirection: 'reverse' },

  /* TL — закруглення + допоміжні лінії */
  '& > .item.-type2.-tl': { '--cr': CORNER_R },
  '& > .item.-type2.-tl::before': {
    content: "''",
    position: 'absolute',
    top: 'calc(43% - var(--cr))',
    left: 'calc(9% + 19%)',
    width: 'calc(76% - (30% + 19%))',
    height: 'var(--cr)',
    borderTop: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderRight: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderTopRightRadius: 'var(--cr)',
    background: 'transparent',
    zIndex: 0,
  },
  '& > .item.-type2.-tl > .line': { position: 'absolute', top: 'calc(41% + var(--cr))', left: '55%', width: '44%', height: 'calc(48% - var(--cr))', border: 'none' },
  '& > .item.-type2.-tl > .line::before': { content: "''", position: 'absolute', top: 0, left: 0, height: `calc(100% - var(--cr))`, borderLeft: `${LINE_W}px dashed ${COLOR_LINE}` },
  '& > .item.-type2.-tl > .line::after': {
    content: "''", position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'var(--cr)',
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`, borderBottom: `${LINE_W}px dashed ${COLOR_LINE}`, borderBottomLeftRadius: 'var(--cr)', background: 'transparent',
  },
  '& > .item.-type2.-tl > .dot::after': { left: 'calc(30% + 19% - 1px)', top: '40%', animation: `${moveDotTLZig} ${SPEED} linear infinite` },

  /* TR — дзеркало до TL */
  '& > .item.-type2.-tr': { '--cr': CORNER_R, transform: 'scaleX(-1)' },
  '& > .item.-type2.-tr::before': {
    content: "''",
    position: 'absolute',
    top: 'calc(43% - var(--cr))',
    left: 'calc(9% + 19%)',
    width: 'calc(76% - (30% + 19%))',
    height: 'var(--cr)',
    borderTop: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderRight: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderTopRightRadius: 'var(--cr)',
    background: 'transparent',
    zIndex: 0,
  },
  '& > .item.-type2.-tr > .line': { position: 'absolute', top: 'calc(41% + var(--cr))', left: '55%', width: '43%', height: 'calc(48% - var(--cr))', border: 'none' },
  '& > .item.-type2.-tr > .line::before': { content: "''", position: 'absolute', top: 0, left: 0, height: `calc(100% - var(--cr))`, borderLeft: `${LINE_W}px dashed ${COLOR_LINE}` },
  '& > .item.-type2.-tr > .line::after': {
    content: "''", position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'var(--cr)',
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`, borderBottom: `${LINE_W}px dashed ${COLOR_LINE}`, borderBottomLeftRadius: 'var(--cr)', background: 'transparent',
  },
  '& > .item.-type2.-tr > .dot::after': { left: 'calc(30% + 19% - 1px)', top: '40%', animation: `${moveDotTLZig} ${SPEED} linear infinite` },

  /* TL картка */
  '& > .item.-type2.-tl > .circle': {
    marginTop: '5%',
    width: '35%',
    height: '25%',
    padding: '0 2vmin',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '-20%'
  },
  '& > .item.-type2.-tl > .circle .iconBox': { height: '90%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  '& > .item.-type2.-tl > .circle .iconBox > img': { height: '100%', width: 'auto', maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', marginRight: '15%' },
  '& > .item.-type2.-tl > .circle .bigNum': { lineHeight: 1, fontWeight: 300, color: '#2b2b2b', fontSize: '5vmin', flexShrink: 0, marginLeft: '15%' },

  /* === TL STATS === */
  '& > .item.-type2.-tl > .stats': {
    position: 'absolute',
    left: '10%',
    top: 'calc(40% + 18%)',
    transform: 'translate(-50%, 0)',
    display: 'grid',
    rowGap: '1vmin',
    width: '34%',
    zIndex: 3,
    pointerEvents: 'none',
  },
  '& > .item.-type2.-tl > .stats .row': {
    display: 'grid',
    gridTemplateColumns: 'auto max-content auto',
    alignItems: 'center',
    columnGap: '0.8vmin',
    lineHeight: 1.1,
  },
  '& > .item.-type2.-tl > .stats .row.-pair': {
    display: 'flex',
    alignItems: 'center',
    gap: '2.2vmin',
  },
  '& > .item.-type2.-tl > .stats .grp': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6vmin',
  },
  '& > .item.-type2.-tl > .stats .ico': {
    height: 'clamp(16px, 2.6vmin, 28px)',
    width: 'auto',
  },
  '& > .item.-type2.-tl > .stats .val': {
    fontSize: 'clamp(14px, 2.5vmin, 26px)',
    color: '#fc4d57',
    fontWeight: 800,
    display: 'inline-block',
  },
  '& > .item.-type2.-tl > .stats .suffix': {
    fontWeight: 600,
    fontSize: 'clamp(12px, 1.9vmin, 22px)',
    color: '#9397a1',
  },

  /* === TR STATS === */
  '& > .item.-type2.-tr > .stats': {
    position: 'absolute',
    right: '90%',
    top: 'calc(40% + 18%)',
    transform: 'translate(50%, 0) scaleX(-1)',
    display: 'grid',
    rowGap: '1vmin',
    width: '34%',
    zIndex: 3,
    pointerEvents: 'none',
  },
  '& > .item.-type2.-tr > .stats .row': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6vmin',
    whiteSpace: 'nowrap',
    lineHeight: 1.1,
  },
  '& > .item.-type2.-tr > .stats .ico, & > .item.-type2.-tr > .stats .val, & > .item.-type2.-tr > .stats .suffix': {
    flex: '0 0 auto',
  },
  '& > .item.-type2.-tr > .stats .ico': {
    height: 'clamp(16px, 2.6vmin, 28px)',
    width: 'auto',
  },
  '& > .item.-type2.-tr > .stats .val': {
    fontSize: 'clamp(14px, 2.5vmin, 26px)',
    color: '#fc4d57',
    fontWeight: 800,
    display: 'inline-block',
  },
  '& > .item.-type2.-tr > .stats .suffix': {
    fontWeight: 600,
    fontSize: 'clamp(12px, 1.9vmin, 22px)',
    color: '#9397a1',
  },

  /* === BL STATS === */
  '& > .item.-type2.-bl > .stats': {
    position: 'absolute',
    left: '10%',
    top: 'calc(-10% + 18%)',
    transform: 'translate(-50%, 0) scaleY(-1)',
    display: 'grid',
    rowGap: '1vmin',
    width: '34%',
    zIndex: 3,
    pointerEvents: 'none',
  },
  '& > .item.-type2.-bl > .stats .row': {
    display: 'flex',
    gridTemplateColumns: 'auto max-content auto',
    alignItems: 'center',
    columnGap: '0.8vmin',
    lineHeight: 1.1,
  },
  '& > .item.-type2.-bl > .stats .row.-pair': {
    display: 'flex',
    alignItems: 'center',
    gap: '2.2vmin',
  },
  '& > .item.-type2.-bl > .stats .grp': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6vmin',
  },
  '& > .item.-type2.-bl > .stats .ico': {
    height: 'clamp(16px, 2.6vmin, 28px)',
    width: 'auto',
  },
  '& > .item.-type2.-bl > .stats .val': {
    fontSize: 'clamp(14px, 2.5vmin, 26px)',
    color: '#fc4d57',
    fontWeight: 800,
    display: 'inline-block',
  },
  '& > .item.-type2.-bl > .stats .suffix': {
    fontWeight: 600,
    fontSize: 'clamp(12px, 1.9vmin, 22px)',
    color: '#9397a1',
  },

  /* === BR STATS === */
  '& > .item.-type2.-br > .stats': {
    position: 'absolute',
    right: '90%',
    top: 'calc(-10% + 18%)',
    transform: 'translate(50%, 0) scaleX(-1) scaleY(-1)',
    display: 'grid',
    rowGap: '1vmin',
    width: '34%',
    zIndex: 3,
    pointerEvents: 'none',
  },
  '& > .item.-type2.-br > .stats .row': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6vmin',
    whiteSpace: 'nowrap',
    lineHeight: 1.1,
  },
  '& > .item.-type2.-br > .stats .ico, & > .item.-type2.-br > .stats .val, & > .item.-type2.-br > .stats .suffix': {
    flex: '0 0 auto',
  },
  '& > .item.-type2.-br > .stats .ico': {
    height: 'clamp(16px, 2.6vmin, 28px)',
    width: 'auto',
  },
  '& > .item.-type2.-br > .stats .val': {
    fontSize: 'clamp(14px, 2.5vmin, 26px)',
    color: '#fc4d57',
    fontWeight: 800,
    display: 'inline-block',
  },
  '& > .item.-type2.-br > .stats .suffix': {
    fontWeight: 600,
    fontSize: 'clamp(12px, 1.9vmin, 22px)',
    color: '#9397a1',
  },

  /* BL/TR/BR картки як були... */
  '& > .item.-type2.-bl > .circle.-numCard': {
    width: '35%',
    height: '25%',
    padding: '0 2vmin',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.2vmin',
    transform: 'translate(-50%, -50%) scaleY(-1)',
    marginLeft: '-20%',
    marginTop: '5%'
  },
  '& > .item.-type2.-bl > .circle.-numCard .iconBox': {
    height: '90%',
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto'
  },
  '& > .item.-type2.-bl > .circle.-numCard .iconBox > img': {
    height: '100%',
    width: 'auto',
    objectFit: 'contain',
    marginRight: '15%'
  },
  '& > .item.-type2.-bl > .circle.-numCard .bigNum': { lineHeight: 1, fontWeight: 300, color: '#2b2b2b', fontSize: '5vmin', flex: '0 0 auto', marginLeft: '15%' },

  '& > .item.-type2.-tr > .circle.-numCard': {
    width: '35%',
    height: '25%',
    padding: '0 2vmin',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.2vmin',
    whiteSpace: 'nowrap',
    transform: 'translate(-50%, -50%) scaleX(-1)',
    marginTop: '5%',
    marginLeft: '-20%'
  },
  '& > .item.-type2.-tr > .circle.-numCard .iconBox': {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 0',
    minWidth: 0
  },
  '& > .item.-type2.-tr > .circle.-numCard .iconBox > img': {
    height: '90%',
    width: 'auto',
    maxHeight: '100%',
    objectFit: 'contain',
    paddingTop: '5%',
    marginRight: '-30% !important'
  },
  '& > .item.-type2.-tr > .circle.-numCard .bigNum': {
    lineHeight: 1,
    fontWeight: 300,
    color: '#2b2b2b',
    fontSize: '5vmin',
    flex: '0 0 auto',
    marginLeft: '10%'
  },

  '& > .center': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '55%',
    zIndex: 3
  },

  '& > .center > .circle': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  '& > .center > .circle:nth-child(1)': {
    width: 'var(--center-w, 23%)',
    height: 'var(--center-h, 38%)',
    minWidth: 'var(--center-min-w, 0px)',
    minHeight: 'var(--center-min-h, 0px)',
    background: '#fff',
    boxShadow: '0 0 3vmin rgba(0,0,0,.1)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: 'var(--pad-y, 0) var(--pad-x, 0)'
  },

  '& > .center > .circle:nth-child(1) > img': {
    width: '80%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  },

  '& > .item.-bottom-main > .circle': {
    top: '28%',
    height: '25% !important',
    width: '35% !important'
  },

  '& > .item.-bottom-main.-v-down > .line': {
    position: 'absolute',
    top: '30% !important',
    bottom: '18%',
    height: 'auto !important',
    left: '2%',
  },

  '& > .item.-type2.-br > .circle.-numCard .iconBox > img': {
    height: '100%',
    width: 'auto',
    objectFit: 'contain',
    objectPosition: 'left'
  },

  '& > .item.-type2.-br > .circle.-numCard': {
    width: '35%',
    height: '25%',
    padding: '0 2vmin',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20%',
    transform: 'translate(-50%, -50%) scaleX(-1) scaleY(-1)',
    marginLeft: '-20%',
    marginTop: '5%'
  },
  '& > .item.-type2.-br > .circle.-numCard .iconBox': {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 0'
  },
  '& > .item.-type2.-br > .circle.-numCard .bigNum': {
    fontWeight: 300,
    color: '#2b2b2b',
    fontSize: '5vmin',
    flex: '0 0 auto',
    marginLeft: '15%'
  },

  /* BL допоміжні лінії */
  '& > .item.-type2.-bl': { '--cr': CORNER_R, transform: 'scaleY(-1)' },
  '& > .item.-type2.-bl::before': {
    content: "''",
    position: 'absolute',
    top: 'calc(42% - var(--cr))',
    left: 'calc(9% + 19%)',
    width: 'calc(76% - (30% + 19%))',
    height: 'var(--cr)',
    borderTop: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderRight: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderTopRightRadius: 'var(--cr)',
    background: 'transparent',
    zIndex: 0
  },
  '& > .item.-type2.-bl > .line': { position: 'absolute', top: 'calc(40% + var(--cr))', left: '55%', width: '44%', height: 'calc(48% - var(--cr))', border: 'none' },
  '& > .item.-type2.-bl > .line::before': { content: "''", position: 'absolute', top: 0, left: 0, height: `calc(100% - var(--cr))`, borderLeft: `${LINE_W}px dashed ${COLOR_LINE}` },
  '& > .item.-type2.-bl > .line::after': {
    content: "''",
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'var(--cr)',
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottom: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottomLeftRadius: 'var(--cr)',
    background: 'transparent'
  },
  '& > .item.-type2.-bl > .dot::after': { left: 'calc(30% + 19% - 1px)', top: '40%', animation: `${moveDotBLZig} ${SPEED} linear infinite` },

  '& > .item.-type2.-br': { '--cr': CORNER_R, transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2.-br::before': {
    content: "''",
    position: 'absolute',
    top: 'calc(42% - var(--cr))',
    left: 'calc(9% + 19%)',
    width: 'calc(76% - (30% + 19%))',
    height: 'var(--cr)',
    borderTop: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderRight: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderTopRightRadius: 'var(--cr)',
    background: 'transparent'
  },
  '& > .item.-type2.-br > .line': { position: 'absolute', top: 'calc(40% + var(--cr))', left: '55%', width: '43%', height: 'calc(48% - var(--cr))', border: 'none' },
  '& > .item.-type2.-br > .line::before': { content: "''", position: 'absolute', top: 0, left: 0, height: `calc(100% - var(--cr))`, borderLeft: `${LINE_W}px dashed ${COLOR_LINE}` },
  '& > .item.-type2.-br > .line::after': {
    content: "''",
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'var(--cr)',
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottom: `${LINE_W}px dashed ${COLOR_LINE}`,
    borderBottomLeftRadius: 'var(--cr)',
    background: 'transparent'
  },
  '& > .item.-type2.-br > .dot::after': { left: 'calc(30% + 19% - 1px)', top: '40%', animation: `${moveDotBRZig} ${SPEED} linear infinite`, animationDirection: 'reverse' },

  '& > .item.-parallel > .line': { position: 'absolute', top: '20%', left: '-2%' },

  /* TL перший рядок (валюта) — ще щільніше */
  '& > .item.-type2.-tl > .stats .row:first-of-type': {
    gridTemplateColumns: 'auto max-content auto',
    columnGap: '0.6vmin',
    justifyContent: 'flex-start',
  },

  '& > .arrows-layer': {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 10,
  },

  /* === TL ARROW === */
  '& > .arrows-layer > .arrow': {
    position: 'absolute',
    top: '44.5%',
    left: '39.5%',
    transform: 'translate(-40%, -50%)',
    width: '1.5%',
    height: 'auto',
  },

  '& > .arrows-layer > .arrow-bl': {
    position: 'absolute',
    top: '56.1%',
    left: '39.5%',
    transform: 'translate(-40%, -50%)',
    width: '1.5%',
    height: 'auto',
    zIndex: 4,
    pointerEvents: 'none',
  },

  '& > .arrows-layer > .arrow-tr': {
    position: 'absolute',
    top: '44.5%',
    left: '60.2%',
    transform: 'translate(-40%, -50%) rotate(180deg)',
    width: '1.5%',
    height: 'auto',
    zIndex: 4,
    pointerEvents: 'none',
  },

  '& > .item.-type2.-br > .arrow-br': {
    position: 'absolute',
    top: '39.8%',
    left: '27%',
    transform: 'translate(-40%, -50%) rotate(180deg)',
    width: '3%',
    height: 'auto',
    zIndex: 4,
    pointerEvents: 'none',
  },

  '& >  .arrows-layer > .arrow-b': {
    position: 'absolute',
    top: '60.5%',
    left: '47.8%',
    transform: 'translate(-40%, -50%) rotate(270deg)',
    width: '1.5%',
    height: 'auto',
    zIndex: 4,
    pointerEvents: 'none',
  },

  '& >  .arrows-layer > .arrow-bc': {
    position: 'absolute',
    top: '73.2%',
    left: '51.1%',
    transform: 'translate(-40%, -50%) rotate(90deg)',
    width: '1.5%',
    height: 'auto',
    zIndex: 4,
    pointerEvents: 'none',
  },

    /* === ERP STATS (під нижнім квадратом) === */
  '& > .erp-stats': {
    position: 'absolute',
    left: '61.5%',
    top: '90%',                     // було 88% — підняли трохи вище краю
    transform: 'translateX(-50%)',
    display: 'grid',
    rowGap: '8px',
    width: '40%',
    pointerEvents: 'none',
    zIndex: 10000,                  // вище за arrows-layer (10)
  },
  '& > .erp-stats .row': {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '8px',
    lineHeight: 1.1,
    whiteSpace: 'nowrap'
  },
  '& > .erp-stats .label': {
    fontWeight: 700,
    color: '#9397a1',
  },
  '& > .erp-stats .val': {
    color: '#fc4d57',
    fontWeight: 800,
  },
  '& > .erp-stats .suffix': {
    fontWeight: 600,
    color: '#9397a1',
  },

};

/* Заповнення рамки для базового полотна 1800×900 */
const fillFrame = {
  position: 'absolute',
  inset: 0,
  transform: 'none',
  width: '100%',
  height: '100%',
};

/* ====== 2.1) «Заморозка» всіх адаптивних vmin/clamp у px ====== */
const freezeSizes = {
  // рівні табличні цифри
  '& .bigNum, & .stats .val, & .erp-stats .val': {
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: '"tnum"',
  },

  // шрифти в px (масштабуються лише через transform)
  '& .bigNum': { fontSize: '48px !important', fontWeight: 300 },
  '& .stats .val': { fontSize: '28px !important', fontWeight: 800 },
  '& .stats .suffix': { fontSize: '26px !important', fontWeight: 600 },
  '& .erp-stats .label': { fontSize: '21px !important', fontWeight: 700 },
  '& .erp-stats .val': { fontSize: '28px !important', fontWeight: 800 },
  '& .erp-stats .suffix': { fontSize: '26px !important', fontWeight: 600 },

  // іконки у статистиці
  '& .stats .ico': { height: '30px !important', width: 'auto' },

  // червоні точки
  '& > .item > .dot::after, & > .item.-type2 > .dot::after': {
    height: '10px !important',
    width: '10px !important',
    borderWidth: '2px !important',
  },

  // тіні — в px
  '& > .item > .circle, & > .item.-type2 > .circle': {
    boxShadow: '0 0 24px rgba(0,0,0,.12)',
  },

  // відступи/гепи в px
  '& .stats': { rowGap: '10px' },
  '& .stats .row': { gap: '8px' },
  '& .stats .row.-pair': { gap: '14px' },
  '& .erp-stats': { rowGap: '8px' },
  '& .erp-stats .row': { gap: '8px' },

  // padding карток, де був 2vmin
  '& > .item.-type2.-tl > .circle': { padding: '0 24px' },
  '& > .item.-type2.-tr > .circle.-numCard': { padding: '0 24px' },
  '& > .item.-type2.-bl > .circle.-numCard': { padding: '0 24px' },
  '& > .item.-type2.-br > .circle.-numCard': { padding: '0 24px' },

  // змінні паддінгу, які задавались у vmin
  '& > .item.-bottom-main > .circle': { '--pad-x': '18px' },
  '& > .item.-type2.-tr > .circle:not(.-numCard)': { '--pad-x': '18px' },
  '& > .center > .circle:nth-child(1)': { '--pad-x': '20px' },
};

/* ====== 3) КОМПОНЕНТ ====== */
export default function EmpFlowchart({ images = {} }) {
  const {
    topLeft, topRight, bottomLeft, bottomRight, bottomCenter, center,
    number1, number2, number3, number4,
    icon1, icon2, icon3, stat1, stat2,
    stat3, stat2_1, stat2_2, stat3_1,
    stat3_2, stat3_3, stat4_1, stat4_2,
    stat5_1, stat5_2, arrow
  } = images;

  const has2 = number2 != null;
  const has3 = number3 != null;
  const has4 = number4 != null;

  const fmt = (n) =>
    typeof n === 'number'
      ? new Intl.NumberFormat('uk-UA').format(n).replace(/\u00A0/g, ' ')
      : n;

  return (
    <>
      <Global styles={{ body: { margin: 0, background: 'white', fontFamily: '"Open Sans", system-ui' } }} />
      <div style={stage}>
        <Scaler>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="animation-example" css={[wrapper, fillFrame, freezeSizes]}>
              <div className="item" css={{ display: 'none' }} />
              <div className="item" css={{ display: 'none' }} />

              {/* bottom main */}
              <div className="item -bottom-main -v-down">
                <div className="line" />
                <div className="dot" />
                <div className="circle" style={{ width: '55%', height: '20%', ['--pad-x']: '1.2vmin' }}>
                  {bottomCenter && <img src={bottomCenter} alt="Bottom center" loading="lazy" decoding="async" />}
                </div>
              </div>

              {/* bottom parallel */}
              <div className="item -parallel -v-down">
                <div className="line" />
                <div className="dot" />
              </div>

              <div className="item" css={{ display: 'none' }} />

              {/* TL */}
              <div className="item -type2 -tl">
                <div className="line" />
                <div className="dot" />
                <div className="circle">
                  <span className="bigNum">{number1}</span>
                  <div className="iconBox">{topLeft && <img src={topLeft} alt="Top left" loading="lazy" decoding="async" />}</div>
                </div>
                {(icon1 || icon2 || icon3) && (stat1 != null || stat2 != null || stat3 != null) && (
                  <div className="stats">
                    {stat1 != null && (
                      <div className="row">
                        {icon1 && <img className="ico" src={icon1} alt="money" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat1)}</span>
                        <span className="suffix">ZŁ</span>
                      </div>
                    )}
                    {(stat2 != null || stat3 != null) && (
                      <div className="row -pair">
                        {stat2 != null && (
                          <span className="grp">
                            {icon2 && <img className="ico" src={icon2} alt="boxes" loading="lazy" decoding="async" />}
                            <span className="val">{fmt(stat2)}</span>
                          </span>
                        )}
                        {stat3 != null && (
                          <span className="grp">
                            {icon3 && <img className="ico" src={icon3} alt="people" loading="lazy" decoding="async" />}
                            <span className="val">{fmt(stat3)}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* TR */}
              <div className="item -type2 -tr">
                <div className="line" />
                <div className="dot" />
                {has3 ? (
                  <div className="circle -numCard">
                    <span className="bigNum">{number3}</span>
                    <div className="iconBox">{topRight && <img src={topRight} alt="Top right" loading="lazy" decoding="async" />}</div>
                  </div>
                ) : (
                  <div className="circle" style={{ width: '55%', height: '25%', ['--pad-x']: '1.2vmin' }}>
                    {topRight && <img src={topRight} alt="Top right" loading="lazy" decoding="async" />}
                  </div>
                )}
                {(stat2_1 != null || stat2_2 != null) && (
                  <div className="stats">
                    {stat2_1 != null && (
                      <div className="row">
                        {icon1 && <img className="ico" src={icon1} alt="money" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat2_1)}</span>
                        <span className="suffix">ZŁ</span>
                      </div>
                    )}
                    {stat2_2 != null && (
                      <div className="row">
                        {icon2 && <img className="ico" src={icon2} alt="boxes" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat2_2)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* BL */}
              <div className="item -type2 -bl">
                <div className="line" />
                <div className="dot" />
                {has2 ? (
                  <div className="circle -numCard">
                    <span className="bigNum">{number2}</span>
                    <div className="iconBox">{bottomLeft && <img src={bottomLeft} alt="Bottom left" loading="lazy" decoding="async" />}</div>
                  </div>
                ) : (
                  <div className="circle" style={{ width: '25%', height: '25%' }}>
                    {bottomLeft && <img src={bottomLeft} alt="Bottom left" loading="lazy" decoding="async" />}
                  </div>
                )}

                {(stat3_1 != null || stat3_2 != null || stat3_3 != null) && (
                  <div className="stats">
                    {stat3_1 != null && (
                      <div className="row">
                        {icon1 && <img className="ico" src={icon1} alt="money" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat3_1)}</span>
                        <span className="suffix">ZŁ</span>
                      </div>
                    )}
                    {(stat3_2 != null || stat3_3 != null) && (
                      <div className="row -pair">
                        {stat3_2 != null && (
                          <span className="grp">
                            {icon2 && <img className="ico" src={icon2} alt="boxes" loading="lazy" decoding="async" />}
                            <span className="val">{fmt(stat3_2)}</span>
                          </span>
                        )}
                        {stat3_3 != null && (
                          <span className="grp">
                            {icon3 && <img className="ico" src={icon3} alt="people" loading="lazy" decoding="async" />}
                            <span className="val">{fmt(stat3_3)}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* BR */}
              <div className="item -type2 -br">
                <div className="line" />
                <div className="dot" />
                {has4 ? (
                  <div className="circle -numCard">
                    <span className="bigNum">{number4}</span>
                    <div className="iconBox">
                      {bottomRight && <img src={bottomRight} alt="Bottom right" loading="lazy" decoding="async" />}
                    </div>
                  </div>
                ) : (
                  <div className="circle" style={{ width: '25%', height: '25%' }}>
                    {bottomRight && <img src={bottomRight} alt="Bottom right" loading="lazy" decoding="async" />}
                  </div>
                )}
                {arrow && <img className="arrow-br" src={arrow} alt="" loading="lazy" decoding="async" />}
                {(stat4_1 != null || stat4_2 != null) && (
                  <div className="stats">
                    {stat4_1 != null && (
                      <div className="row">
                        {icon1 && <img className="ico" src={icon1} alt="money" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat4_1)}</span>
                        <span className="suffix">ZŁ</span>
                      </div>
                    )}
                    {stat4_2 != null && (
                      <div className="row">
                        {icon2 && <img className="ico" src={icon2} alt="boxes" loading="lazy" decoding="async" />}
                        <span className="val">{fmt(stat4_2)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* arrows layers */}
              <div className="arrows-layer">
                {arrow && <img className="arrow" src={arrow} alt="" loading="lazy" decoding="async" />}
              </div>
              <div className="arrows-layer">
                {arrow && <img className="arrow-bl" src={arrow} alt="" loading="lazy" decoding="async" />}
              </div>
              <div className="arrows-layer">
                {arrow && <img className="arrow-b" src={arrow} alt="" loading="lazy" decoding="async" />}
              </div>
              <div className="arrows-layer">
                {arrow && <img className="arrow-tr" src={arrow} alt="" loading="lazy" decoding="async" />}
              </div>
              <div className="arrows-layer">
                {arrow && <img className="arrow-bc" src={arrow} alt="" loading="lazy" decoding="async" />}
              </div>

              {/* center */}
              <div className="center">
                <div className="circle" style={{ ['--pad-x']: '1.4vmin', ['--center-min-w']: '0px', ['--center-min-h']: '0px' }}>
                  {center && (
                    <img
                      src={typeof center === 'string' ? center : center.src}
                      alt={typeof center === 'string' ? 'Center' : (center.alt || 'Center')}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <div className="circle" />
                <div className="circle" />
              </div>

              {/* ERP stats under bottom card */}
              {(stat5_1 != null || stat5_2 != null) && (
                <div className="erp-stats">
                  {stat5_1 != null && (
                    <div className="row">
                      <span className="label">ZAMÓWIENIA:</span>
                      <span className="val">{fmt(stat5_1)}</span>
                      <span className="suffix">ZŁ</span>
                    </div>
                  )}
                  {stat5_2 != null && (
                    <div className="row">
                      <span className="label">SPRZEDAŻ:</span>
                      <span className="val">{fmt(stat5_2)}</span>
                      <span className="suffix">ZŁ</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </Scaler>
      </div>
    </>
  );
}
