/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, keyframes } from '@emotion/react';

const COLOR_BG = 'white';
const COLOR_LINE = '#2b2929ff';
const SPEED = '4s';
const CORNER_R = '8px';
const PAR_GAP = '24px';
const PAR_LEN = '45%';
const LINE_W = 1; 

const moveDotStraight = keyframes({ '0%': { top: '10%' }, '25%': { top: '65%' }, '100%': { top: '65%' } });
const moveDotStraightDeep = keyframes({ '0%': { top: '30%',left:'54%' }, '50%': { top: '82%',left:'54%' }, '100%': { top: '82%',left:'54%' } });
const moveDotStraightDeeper = keyframes({ '0%': { top: '8%',left:'50.1%' }, '60%': { top: '82%',left:'50.1%' }, '100%': { top: '82%',left:'50.1%' } });
const moveDotCorner = keyframes({ '0%': { top: '40%', left: 'calc(30% - 1px)' }, '45%': { top: '88%', left: 'calc(30% - 1px)' }, '100%': { top: '88%', left: 'calc(100% - 1px)' } });
const moveDotCornerLeft = keyframes({ '0%': { top: '40%', left: '30%' }, '45%': { top: '88%', left: '30%' }, '100%': { top: '88%', left: '100%' } });
const moveDotCornerRight = keyframes({ '0%': { top: '40%', left: '30%' }, '45%': { top: '88%', left: '30%' }, '100%': { top: '88%', left: '100%' } });
const moveDotBLZig = keyframes({ '0%': { top: '39.5%', left: 'calc(5% + 19%)' }, '30%': { top: '39.5%', left: 'calc(55% + 1px)' }, '70%': { top: '86.8%', left: 'calc(55% + 1px)' }, '100%': { top: '86.8%', left: '80%' }, });
const moveDotBRZig = keyframes({ '0%': { top: '39.5%', left: 'calc(5% + 19%)' }, '30%': { top: '39.5%', left: '55%' }, '70%': { top: '86.8%', left: '55%' }, '100%': { top: '86.8%', left: '80%' }, });

const moveDotTLZig = keyframes({
  '0%': { top: '40.5%', left: 'calc(5% + 19%)' }, // уздовж верхньої ділянки від картки
  '30%': { top: '40.5%', left: '55%' },            // до вертикалі (точка згину)
  '70%': { top: '89%', left: '55%' },            // вниз по вертикалі
  '100%': { top: '89%', left: '80%' },            // вправо до центру
});


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
    borderRadius: 8,
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

  /* TL — закруглений верх і низ */
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

  /* TR — дзеркальне до TL (лягає праворуч від картки) */
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
  // крапка йде «навпаки», тому reverse
  '& > .item.-type2.-tr > .dot::after': {
    left: 'calc(30% + 19% - 1px)', top: '40%', animation: `${moveDotTLZig} ${SPEED} linear infinite`
  },

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
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
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
    transform: 'translate(-50%, -50%)',
    borderRadius: 8
  },

  '& > .center > .circle:nth-child(1)': {
    width: 'var(--center-w, 23%)',
    height: 'var(--center-h, 38%)',
    minWidth: 'var(--center-min-w, 180px)',
    minHeight: 'var(--center-min-h, 140px)',
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
    top: '25%',
    height: '25% !important',
    width: '35% !important'
  },

  '& > .item.-bottom-main.-v-down > .line': {
    position: 'absolute',
    top: '25% !important',
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

  '& > .item.-type2.-bl': {
    '--cr': CORNER_R,
    transform: 'scaleY(-1)'
  },

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

  '& > .item.-type2.-bl > .line': {
    position: 'absolute',
    top: 'calc(40% + var(--cr))',
    left: '55%',
    width: '44%',
    height: 'calc(48% - var(--cr))',
    border: 'none'
  },

  '& > .item.-type2.-bl > .line::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: `calc(100% - var(--cr))`,
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`
  },

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

  '& > .item.-type2.-bl > .dot::after': {
    left: 'calc(30% + 19% - 1px)',
    top: '40%',
    animation: `${moveDotBLZig} ${SPEED} linear infinite`
  },

  '& > .item.-type2.-br': {
    '--cr': CORNER_R,
    transform: 'scaleX(-1) scaleY(-1)'
  },

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
    background: 'transparent',
    zIndex: 0
  },

  '& > .item.-type2.-br > .line': {
    position: 'absolute',
    top: 'calc(40% + var(--cr))',
    left: '55%',
    width: '43%',
    height: 'calc(48% - var(--cr))',
    border: 'none'
  },

  '& > .item.-type2.-br > .line::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: `calc(100% - var(--cr))`,
    borderLeft: `${LINE_W}px dashed ${COLOR_LINE}`
  },

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

  '& > .item.-type2.-br > .dot::after': {
    left: 'calc(30% + 19% - 1px)',
    top: '40%',
    animation: `${moveDotBRZig} ${SPEED} linear infinite`,
    animationDirection: 'reverse'
  },

  '& > .item.-parallel > .line': {
    position: 'absolute',
    top: '20%',  
    left: '-2%',
  }
};

export default function EmpFlowchart({ images = {} }) {
  const { topLeft, topRight, bottomLeft, bottomRight, bottomCenter, center, number1, number2, number3, number4 } = images;
  const has2 = number2 != null;
  const has3 = number3 != null;
  const has4 = number4 != null;

  return (
    <>
      <Global styles={{ body: { background: 'white', fontFamily: '"Open Sans", system-ui' } }} />
      
      <div className="animation-example" css={wrapper}>
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
      </div>
    </>
  );
}