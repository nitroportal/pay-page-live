/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

import { useAppContext } from '../../AppContext'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

import u from '../../functions/utils'

export default function ChannelOptions() {
  let { channelType, channel, setChannel } = useAppContext()

  useEffect(() => console.log('channelType', channelType), [channelType, channel])

  if (!u.isNonEmptyArray(channelType?.options)) return null

  // function ChannelOption({ c }) {
  //   return (
  //     <div
  //       className={`w-full rounded-md bg-white p-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-mpme focus:ring-2 focus:ring-blu sm:text-sm sm:leading-6 min-h-[64px] hover:ring-blu hover:ring-2 hover:bg-slate-50 fade-in ${
  //         c.channel_id === channel?.channel_id ? 'border-blu border-2' : ''
  //       }`}
  //     >
  //       {/* your component content here */}
  //     </div>
  //   )
  // }

  function ChannelOption({ c }) {
    return (
      <div
        className={`relative w-full rounded-md bg-white p-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blu sm:text-sm sm:leading-6 min-h-[64px] fade-in ${
          c.channel_id === channel?.channel_id ? 'border-blu border-2' : ''
        }`}
      >
        This is some text This is some text This is some text This is some text This is some text This is some text This
        is some text This is some text
        <div className="absolute inset-0 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-md bg-gradient-to-r from-transparent to-white w-full h-full flex items-center justify-end space-x-2">
            <div className="flex items-center bg-blu p-2 text-white min-h-full rounded-r-md">
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="absolute rounded-md inset-0 border-2 border-transparent hover:border-blu transition-all duration-300"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="block text-sm font-medium leading-6 text-gray-900">Select an Option</div>
      <div className={`grid gap-4 pt-[14px] ${channelType.options.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        {channelType?.options?.map((x) => (
          <ChannelOption key={x.channel_id} c={x} />
        ))}
      </div>
    </>
  )
}
