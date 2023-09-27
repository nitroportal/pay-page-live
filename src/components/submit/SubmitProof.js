import React from 'react'
import { useAppContext } from '../../AppContext'
import u from '../../functions/utils'

export default function SubmitProof() {
  return (
    <form className="space-6" action="#" method="POST">
      <div>
        <a
          href="#"
          className="mt-10 block w-full rounded-md bg-blu_dark px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blu_med focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu"
        >
          Big Mama
        </a>
      </div>
    </form>
  )
}
