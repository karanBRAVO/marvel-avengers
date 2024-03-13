import React from 'react'
import Character from '@/ui/AvengersInfo/id/Character'
import { Navbar } from '@/ui/ComponentExporters'

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <section className='w-screen h-screen bg-black overflow-x-hidden'>
      <Navbar />
      <div className='mt-20 p-40'>
        <Character id={params.id} />
      </div>
    </section>
  )
}

export default Page