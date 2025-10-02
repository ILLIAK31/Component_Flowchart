/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, keyframes } from '@emotion/react';

const COLOR_BG = 'white';
const COLOR_LINE = '#2b2929ff';
const SPEED = '6s'; // однакова швидкість
// додай змінну (необов'язково, щоб було зручно підкручувати)
const CORNER_R = '0.8vmin';

/* Анімації рухаємо на САМОМУ кружку (::after) */
const moveDotStraight = keyframes({
  '0%': { top: '10%' },  // старт зовні
  '25%': { top: '65%' },  // вглиб до центру
  '100%': { top: '65%' }
});
const moveDotCorner = keyframes({
  /* по L: вниз по вертикалі до низу L, потім праворуч по горизонталі */
  '0%': { top: '40%', left: 'calc(30% - 1px)' },
  '45%': { top: '88%', left: 'calc(30% - 1px)' },
  '100%': { top: '88%', left: 'calc(100% - 1px)' }
});

// 1) ДОДАЙ поруч з іншими анімаціями
const moveDotStraightDeep = keyframes({
  '0%': { top: '10%' },
  '50%': { top: '82%' }, 
  '100%': { top: '82%' }
});

/* Styles */
const wrapper = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vmin',
  width: '90vmin',

  /* прямі спиці (не міняємо порядок і розміри) */
  '& > .item': {
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: '50% 100%',
    pointerEvents: 'none'
  },
  '& > .item:nth-child(2)': { transform: 'translateX(-50%) rotate(90deg)' },
  '& > .item:nth-child(3)': { transform: 'translateX(-50%) rotate(180deg)' },
  '& > .item:nth-child(4)': { transform: 'translateX(-50%) rotate(270deg)' },

  '& > .item > .line': {
    height: '100%',
    width: 'calc(50% + 1px)',
    borderRight: `2px dashed ${COLOR_LINE}`,
  },

  /* Кружок на прямій: пришитий до центру лінії */
  '& > .item > .dot': { position: 'absolute', inset: 0 },
  '& > .item > .dot::after': {
    content: "''",
    position: 'absolute',
    left: 'calc(50% + 2px)',      // центр штрихової лінії
    top: '10%',
    transform: 'translate(-50%, -50%)',
    height: '0.9vmin',
    width: '0.9vmin',
    background: '#fff',
    border: `2px solid ${COLOR_LINE}`,
    borderRadius: '50%',
    animation: `${moveDotStraight} ${SPEED} linear infinite`
  },

  /* зовнішні картки (як було) */
  '& > .item > .circle, & > .item.-type2 > .circle': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    background: COLOR_BG,
    overflow: 'hidden',
    boxShadow: '0 0 3vmin rgba(0, 0, 0, 0.15)',
    pointerEvents: 'auto',
    width: 'var(--thumb-w, 50%)',
    height: 'var(--thumb-h, 20%)',
    boxSizing: 'border-box',
    padding: 'var(--pad-y, 0) var(--pad-x, 0)'
  },
  '& > .item > .circle > img, & > .item.-type2 > .circle > img': {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  },

  /* L-елементи (кути) — теж як було */
  '& > .item.-type2': {
    top: 0, left: 0, transform: 'none', transformOrigin: '100% 100%'
  },
  '& > .item.-type2:nth-child(5)': { transform: 'scaleX(-1)' },                 // правий верхній
  '& > .item.-type2:nth-child(6)': { transform: 'scaleX(-1) scaleY(-1)' },      // правий нижній
  '& > .item.-type2:nth-child(7)': { transform: 'scaleY(-1)' },                  // лівий нижній

  '& > .item.-type2 > .line': {
    position: 'absolute',
    top: '40%',
    left: 'calc(30% - 1px)',
    width: '70%',
    height: '48%',
    borderRight: 'none',
    borderLeft: `2px dashed ${COLOR_LINE}`,
    borderBottom: `2px dashed ${COLOR_LINE}`,

    /* ⬇️ додаємо округлення для кута */
    borderBottomLeftRadius: CORNER_R
  },


  /* Кружок на L: анімований ::after, пришитий до вертикального бордера L */
  '& > .item.-type2 > .dot': { position: 'absolute', inset: 0 },
  '& > .item.-type2 > .dot::after': {
    content: "''",
    position: 'absolute',
    left: 'calc(30% - 1px)',       // центр вертикальної частини L
    top: '40%',
    transform: 'translate(-50%, -50%)',
    height: '0.9vmin',
    width: '0.9vmin',
    background: '#fff',
    border: `2px solid ${COLOR_LINE}`,
    borderRadius: '50%',
    animation: `${moveDotCorner} ${SPEED} linear infinite`
  },
  '& > .item.-type2 > .circle': {
    top: '30%', left: '30%', transform: 'translate(-50%, -50%)'
  },

  /* права сторона — з центру до карток */
  '& > .item.-type2:nth-child(5) > .dot::after, & > .item.-type2:nth-child(6) > .dot::after': {
    animationDirection: 'reverse'
  },

  /* центр */
  '& > .center': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '55%'
  },
  '& > .center > .circle': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 12
  },
  '& > .center > .circle:nth-child(1)': {
    width: 'var(--center-w, 38%)',
    height: 'var(--center-h, 38%)',
    minWidth: 'var(--center-min-w, 180px)',
    minHeight: 'var(--center-min-h, 140px)',
    background: '#fff',
    boxShadow: '0 0 3vmin rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: 'var(--pad-y, 0) var(--pad-x, 0)'
  },
  '& > .center > .circle:nth-child(1) > img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  },

  // 2) У стилях wrapper — ДОДАЙ ПРАВИЛО нижче за загальне для .dot::after
  '& > .item:nth-of-type(3) > .dot::after': {
    animation: `${moveDotStraightDeep} ${SPEED} linear infinite`
  },

  /* фазування як було */
  '& > .item:nth-of-type(1) > .dot': { animationDelay: '0s' },
  '& > .item:nth-of-type(7) > .dot': { animationDelay: '.5s' },
  '& > .item:nth-of-type(2) > .dot': { animationDelay: '1s' },
  '& > .item:nth-of-type(6) > .dot': { animationDelay: '1.5s' },
  '& > .item:nth-of-type(3) > .dot': { animationDelay: '2s' },
  '& > .item:nth-of-type(5) > .dot': { animationDelay: '2.5s' },
  '& > .item:nth-of-type(4) > .dot': { animationDelay: '3s' },
  '& > .item:nth-of-type(8) > .dot': { animationDelay: '3.5s' },

  /* фікс переворотів картинок */
  '& > .item:nth-child(3) > .circle > img': { transform: 'rotate(180deg)' },
  '& > .item.-type2:nth-child(5) > .circle > img': { transform: 'scaleX(-1)' },
  '& > .item.-type2:nth-child(6) > .circle > img': { transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2:nth-child(7) > .circle > img': { transform: 'scaleY(-1)' },
};

export default function EmpFlowchart({ images = {} }) {
  const { topLeft, topRight, bottomLeft, bottomRight, bottomCenter, center } = images;

  return (
    <>
      <Global styles={{ body: { background: 'white' } }} />
      <div className="animation-example" css={wrapper}>
        {/* приховані для ротацій — не чіпаємо */}
        <div className="item" css={{ display: 'none' }} />
        <div className="item" css={{ display: 'none' }} />

        {/* bottom-center (enova) */}
        <div className="item">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '55%', height: '20%', ['--pad-x']: '1.2vmin' }}>
            {bottomCenter && <img src={bottomCenter} alt="Bottom center" loading="lazy" decoding="async" />}
          </div>
        </div>

        <div className="item" css={{ display: 'none' }} />

        {/* кути — порядок той самий, що був стабільний раніше */}
        {/* top-left (малий) */}
        <div className="item -type2">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '55%', height: '25%', ['--pad-x']: '1.2vmin' }}>
            {topRight && <img src={topRight} alt="Top right" loading="lazy" decoding="async" />}
          </div>
        </div>

        {/* top-right (широкий) */}
        <div className="item -type2">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {bottomRight && <img src={bottomRight} alt="Bottom right" loading="lazy" decoding="async" />}
          </div>
        </div>

        {/* bottom-left (малий) */}
        <div className="item -type2">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {bottomLeft && <img src={bottomLeft} alt="Bottom left" loading="lazy" decoding="async" />}
          </div>
        </div>

        {/* bottom-right (малий) */}
        <div className="item -type2">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {topLeft && <img src={topLeft} alt="Top left" loading="lazy" decoding="async" />}
          </div>
        </div>

        {/* центр (logo) */}
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
      </div>
    </>
  );
}
