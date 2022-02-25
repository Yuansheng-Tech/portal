import Link from 'next/link';

import CardOne from './card.one';
import CardTwo from './card.two';
import CardThree from './card.three';

export const mapWidth = [
  [2,2],
  [2,1,1],
  [1,2,1],
  [1,1,1,1]
]

export const mapSpaceForDataLength = (len) => {
  let arr = [];
  while (arr.length < len) {
    const roundNum = Math.round(Math.random() * 4) % 4;
    arr = arr.concat(mapWidth[roundNum])
  }
  return arr
}

const spaceData = mapSpaceForDataLength(30);

export const renderMap = (resuldData = []) => {
  return <>
    {resuldData.map((val, key) => {
      return <>
        {(spaceData[key % 30] === 2) && <Link key={key} href={`/p/${val.id}`}><a><CardOne data={val} /></a></Link>}
        {(spaceData[key % 30] === 1) && (() => {
            const num = Math.round(Math.random() * 2) % 2 + 2;
            return <>
              {num === 2 && <Link key={key} href={`/p/${val.id}`}><a><CardTwo data={val} /></a></Link>}
              {num === 3 && <Link key={key} href={`/p/${val.id}`}><a><CardThree data={val} /></a></Link>}
            </>
        })()}
      </>
    })}
  </>
}