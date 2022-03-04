import Image from 'next/image'
import dayjs from 'dayjs'
import { IPageConfigData } from '@/types/common';

export default function Card({
  data
}: { 
  data: IPageConfigData
}) {
  return (<div className="relative h-full overflow-hidden bg-gray-200">
     {!!data.banner.trim() && <Image
      src={data.banner || ''}
      layout="responsive"
      alt={''}
      width="100%"
      height="100%"
    />}
    <div className="w-full h-40 absolute bg-gray-700  bg-opacity-50 left-0 bottom-0 p-2">
      <div className="text-2xl h-28 text-white">{data.name}</div>
      <div className="text-white h-12">{dayjs(data.updated_time).format('YYYY.MM.DD')}</div>
    </div>
  </div>);
}