import Image from 'next/image';
import { rightSideDataApi } from '@/api/data';
import { useFetcher } from "@/api/fetcher";

import { Edit } from '@/components/common/edit';
import { IfallbackOptions, IPageConfigData } from '@/types/common';

export default function NavSide({
  fallback
}: IfallbackOptions) {
  const { data: resuldData = [] } = useFetcher(rightSideDataApi, {
    fallbackData: fallback[rightSideDataApi]
  })
  if (!resuldData.length) return null
  
  return (<div className="flex fixed flex-col right-0 m-0 top-32 z-40">
      <div className="relative">
        <Edit filter="right_side" />
      {resuldData.map((v: IPageConfigData, k: number) => {
        return <div key={k} className="relative hover-display flex-1">
          <div className="p-1 md:p-2 text-center bg-gray-50 hover:bg-green-300 cursor-pointer">
            <Image
              src={v.icon}
              alt="logo"
              width="28px"
              height="28px"
            />
            <div className="text-xs md:text-l">{v.name}</div>
          </div>
          <div className="hidden absolute w-40 top-0 right-14 md:right-20 bg-white shadow-2xl">
          {(() => {
            switch(v.action_type) {
              case 'qrcode':
                return <Image alt="logo" width="160px" height="160px" src={v.action} className="w-full" />;
                break;
              case 'phone':
                return <div className="w-full h-10 text-center leading-10 shadow-2xl">{v.action}</div>;
            }
          })()}
          </div>
        </div>
      })}
    </div>
  </div>)
}