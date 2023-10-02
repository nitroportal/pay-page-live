import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAppContext } from '../../AppContext'

import u from '../../functions/utils'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* eslint-disable react/prop-types */
export default function ChannelTypeDropdown({ items, label }) {
  const { channelType, setChannelType, channels, channel } = useAppContext()

  const [selected, setSelected] = useState(
    u.isNonEmptyString(channel?.type) ? items.find((item) => item.id === channel.type) || items[0] : items[0]
  )

  useEffect(() => {
    if (u.isNonEmptyString(channel?.type)) {
      setSelected(items.find((item) => item.id === channel.type) || items[0])
    }
  }, [channel])

  useEffect(() => {
    let channelTypeToUpdate = channels.find((x) => x.type === selected.id)
    setChannelType(channelTypeToUpdate)
  }, [selected])

  // Check if there are no items
  if (!items || items.length === 0) return null

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-semibold leading-6 text-gray-900">{label}</Listbox.Label>
          <div className="relative mt-2 pb-[40px]">
            <Listbox.Button className="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 min-h-[48px] cursor-pointer">
              <span className="flex items-center">
                <selected.avatar className="h-5 w-5 text-blu_med" aria-hidden="true" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blu bg-opacity-5 text-blu_dark' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <item.avatar className="h-5 w-5 text-blu_med" aria-hidden="true" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span className={classNames('text-blu', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                            <CheckIcon className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

//
