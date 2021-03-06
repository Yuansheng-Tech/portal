import Link from 'next/link';

import { IPageConfigData } from '@/types/common';

import CardOne from './card.one';
import CardTwo from './card.two';

export const mapWidth = [
  [2,2],
  [2,1,1],
  [1,2,1],
  [1,1,1,1]
]

export const mapSpaceForDataLength = (len: number): number[] => {
  let arr: number[] = [1,2,1];
  while (arr.length < len) {
    const roundNum = Math.round(Math.random() * 4) % 4;
    arr = arr.concat(mapWidth[roundNum])
  }
  return arr
}

const spaceData = mapSpaceForDataLength(30);

export const renderMap = (resuldData = []) => {
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
    {resuldData.map((val: IPageConfigData, key: number) => {
      return <>
        {(spaceData[key % 30] === 2) && <Link key={val.id} href={`/p/${val.id}`}>
            <a className="col-span-1 my-4 md:my-0 md:col-span-2 h-96 border border-gray-50"><CardOne data={val} /></a></Link>}
        {(spaceData[key % 30] === 1) && (() => {
            const num = Math.round(Math.random() * 2) % 2 + 2;
            return <>
              {num === 2 && <Link key={val.id} href={`/p/${val.id}`}>
                <a className="col-span-1 my-4 md:my-0 h-96 border border-gray-50"><CardTwo data={val} /></a></Link>}
              {num === 3 && <Link key={val.id} href={`/p/${val.id}`}>
                <a className="col-span-1 my-4 md:my-0 h-96 border border-gray-50"><CardTwo data={val} /></a></Link>}
            </>
        })()}
      </>
    })}
  </div>
}
