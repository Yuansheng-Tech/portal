import dayjs from 'dayjs'
import { IPageConfigData } from '@/types/common'
import Image from 'next/image';

export default function Card({
  data
}: { 
  data: IPageConfigData
}) {
  return (<div className="relative h-full flex flex-col overflow-hidden bg-gray-200">
    {!!data.banner.trim() && <Image
      src={data.banner || ''}
      alt={data.name}
      layout="fill"
      width="100%"
      className="max-h-72"
    />}
    <div className="w-full bg-green-900  bg-opacity-50 left-0 bottom-0 p-2 flex-1 flex flex-col">
      <div className="text-2xl flex-auto text-white">{data.name}</div>
      <div className="text-white h-10 leading-10">{dayjs(data.updated_time).format('YYYY.MM.DD')}</div>
    </div>
  </div>);
}