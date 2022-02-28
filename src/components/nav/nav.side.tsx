import Image from 'next/image';
import { rightSideDataApi } from '@/api/data';
import { useFetcher } from "@/api/fetcher";

import { Edit } from '@/components/common/edit';
import { IPageConfigData, IfallbackOptions } from '@/types/common';

export default function NavSide({
  fallback
}: IfallbackOptions) {
  const { data: resuldData = [], error } = useFetcher(rightSideDataApi, {
    fallbackData: fallback[rightSideDataApi]
  })
  if (!resuldData.length) return null
  
  return (<div className="hidden md:flex fixed flex-row md:flex-col top-0 left-0 right-0 md:left-auto m-0 md:mt-32 z-40">
      <div className="relative">
        <Edit filter="right_side" />
      {resuldData.map((v: IPageConfigData, k: number) => {
        return <div key={k} className="relative hover-display flex-1">
          <div className="p-2 text-center bg-gray-50 hover:bg-green-300 cursor-pointer">
            <Image
              src={v.icon}
              alt="logo"
              width="28px"
              height="28px"
            />
            <div>{v.name}</div>
          </div>
          <div className="hidden absolute w-40 top-20 md:top-0 md:right-20 bg-white">
          {(() => {
            switch(v.action_type) {
              case 'qrcode':
                return <img src={v.action} />;
                break;
              case 'phone':
                return <div>{v.action}</div>;
            }
          })()}
          </div>
        </div>
      })}
    </div>
  </div>)
}