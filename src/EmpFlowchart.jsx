/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, keyframes } from '@emotion/react';

const COLOR_BG = 'white';
const COLOR_LINE = '#2b2929ff';
const SPEED = '3.5s';
const CORNER_R = '0.8vmin';
const PAR_GAP = '3vmin';
const PAR_LEN = '45%';

/* Animations */
const moveDotStraight = keyframes({
  '0%': { top: '10%' },
  '25%': { top: '65%' },
  '100%': { top: '65%' }
});
const moveDotStraightDeep = keyframes({
  '0%': { top: '10%' },
  '50%': { top: '82%' },
  '100%': { top: '82%' }
});
const moveDotStraightDeeper = keyframes({
  '0%': { top: '0%' },
  '60%': { top: '82%' },
  '100%': { top: '82%' }
});
const moveDotCorner = keyframes({
  '0%': { top: '40%', left: 'calc(30% - 1px)' },
  '45%': { top: '88%', left: 'calc(30% - 1px)' },
  '100%': { top: '88%', left: 'calc(100% - 1px)' }
});
const moveDotCornerLeft = keyframes({
  '0%': { top: '40%', left: '30%' },
  '45%': { top: '88%', left: '30%' },
  '100%': { top: '88%', left: '100%' }
});
const moveDotCornerRight = keyframes({
  '0%': { top: '40%', left: '30%' },
  '45%': { top: '88%', left: '30%' },
  '100%': { top: '88%', left: '100%' }
});

const wrapper = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vmin',
  width: '90vmin',

  '& > .item': {
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: '50% 100%',
    pointerEvents: 'none',
    zIndex: 1
  },
  '& > .item.-v-down': { transform: 'translateX(-50%) rotate(180deg)' },

  '& > .item > .line': {
    height: '100%',
    width: 'calc(53%)',
    borderRight: `2px dashed ${COLOR_LINE}`
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
    animation: `${moveDotStraight} ${SPEED} linear infinite`
  },

  /* bottom main */
  '& > .item.-bottom-main > .dot::after': {
    animation: `${moveDotStraightDeep} ${SPEED} linear infinite`
  },
  '& > .item.-v-down > .circle > img': { transform: 'rotate(180deg)' },

  /* bottom parallel */
  '& > .item.-parallel': {
    left: `calc(50% + ${PAR_GAP})`,
    height: PAR_LEN,
    zIndex: 0
  },
  '& > .item.-parallel > .dot::after': {
    animation: `${moveDotStraightDeeper} ${SPEED} linear infinite`,
    animationDirection: 'reverse'
  },

  /* cards */
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
    zIndex: 2
  },
  '& > .item > .circle > img, & > .item.-type2 > .circle > img': {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  },

  /* L corners */
  '& > .item.-type2': { top: 0, left: 0, transform: 'none', transformOrigin: '100% 100%' },
  '& > .item.-type2 > .line': {
    position: 'absolute',
    top: '40%',
    left: 'calc(30% - 1px)',
    width: '70%',
    height: '48%',
    borderRight: 'none',
    borderLeft: `2px dashed ${COLOR_LINE}`,
    borderBottom: `2px dashed ${COLOR_LINE}`,
    borderBottomLeftRadius: CORNER_R
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
    animation: `${moveDotCorner} ${SPEED} linear infinite`
  },
  '& > .item.-type2 > .circle': { top: '30%', left: '30%', transform: 'translate(-50%, -50%)' },

  '& > .item.-type2.-tr': { transform: 'scaleX(-1)' },
  '& > .item.-type2.-br': { transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2.-bl': { transform: 'scaleY(-1)' },

  '& > .item.-type2.-tr > .dot::after, & > .item.-type2.-br > .dot::after': {
    animationDirection: 'reverse'
  },
  '& > .item.-type2.-tr > .circle > img': { transform: 'scaleX(-1)' },
  '& > .item.-type2.-br > .circle > img': { transform: 'scaleX(-1) scaleY(-1)' },
  '& > .item.-type2.-bl > .circle > img': { transform: 'scaleY(-1)' },

  /* little centering tweaks for moving dots (you added earlier) */
  '& > .item.-type2.-tl > .dot::after, & > .item.-type2.-bl > .dot::after': {
    animation: `${moveDotCornerLeft} ${SPEED} linear infinite`
  },
  '& > .item.-type2.-tr > .dot::after, & > .item.-type2.-br > .dot::after': {
    animation: `${moveDotCornerRight} ${SPEED} linear infinite`,
    animationDirection: 'reverse'
  },

  /* ► ARROW for top-left L at the end near center */
  '& > .item.-type2.-tl > .arrow': {
    position: 'absolute',
    top: '88%',              // по тій же висоті, що горизонталь L
    left: '100%',            // кінець горизонталі (біля центру)
    transform: 'translate(-10%, -50%)', // трохи "всередину" лінії
    width: 0,
    height: 0,
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderLeft: `11px solid ${COLOR_LINE}`, // стрілка вправо
    filter: 'drop-shadow(0 0 2px rgba(0,0,0,.15))',
    pointerEvents: 'none',
    zIndex: 2
  },

  /* center logo block */
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
    borderRadius: 12
  },
  '& > .center > .circle:nth-child(1)': {
    width: 'var(--center-w, 38%)',
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
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  }
};

export default function EmpFlowchart({ images = {} }) {
  const { topLeft, topRight, bottomLeft, bottomRight, bottomCenter, center } = images;

  return (
    <>
      <Global styles={{ body: { background: 'white' } }} />
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

        {/* corners */}
        {/* TOP-LEFT with ARROW */}
        <div className="item -type2 -tl">
          <div className="line" />
          <div className="dot" />
          <div className="arrow" /> {/* ← додана стрілка */}
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {topLeft && <img src={topLeft} alt="Top left" loading="lazy" decoding="async" />}
          </div>
        </div>

        <div className="item -type2 -tr">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '55%', height: '25%', ['--pad-x']: '1.2vmin' }}>
            {topRight && <img src={topRight} alt="Top right" loading="lazy" decoding="async" />}
          </div>
        </div>

        <div className="item -type2 -bl">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {bottomLeft && <img src={bottomLeft} alt="Bottom left" loading="lazy" decoding="async" />}
          </div>
        </div>

        <div className="item -type2 -br">
          <div className="line" />
          <div className="dot" />
          <div className="circle" style={{ width: '25%', height: '25%' }}>
            {bottomRight && <img src={bottomRight} alt="Bottom right" loading="lazy" decoding="async" />}
          </div>
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
