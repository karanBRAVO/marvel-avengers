import Image from 'next/image'
import React from 'react'
import { Meteors } from '@/ui/aceternity/meteor-effect'
import { InfiniteMovingCards } from '@/ui/aceternity/infinite-cards'
import { getEventById } from '@/api/events/main'

const Event = async ({ id }: { id: number }) => {
    const event = await getEventById(id)
    const creators = event.creators.items.map(creator => {
        return {
            name: creator.name
        }
    })
    const characters = event.characters.items.map(character => {
        return {
            name: character.name
        }
    })
    const stories = event.stories.items.map(story => {
        return {
            name: story.name
        }
    })
    const comics = event.comics.items.map(comic => {
        return {
            name: comic.name
        }
    })

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-center gap-48'>
                <div>
                    <Image src={event.thumbnail.path + '.' + event.thumbnail.extension} height={330} width={330} alt='event' />
                </div>
                {/* Title card */}
                <div className="">
                    <div className=" w-full relative max-w-xs">
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-2 w-2 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                                    />
                                </svg>
                            </div>

                            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                                {event.title}
                            </h1>

                            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                                {
                                    event.description ?
                                        event.description :
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ipsa at consequatur, nemo totam sed culpa? Illo, officiis! Debitis tempore nobis corrupti animi recusandae cum fugiat"
                                }
                            </p>

                            <button className="border px-4 py-1 rounded-lg  border-gray-500 text-black w-full">
                                Explore
                            </button>

                            {/* Meaty part - Meteor effect */}
                            <Meteors number={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-40 w-full flex flex-col gap-4'>
                {/* <InfiniteMovingCards items={creators} direction='left' />
                <InfiniteMovingCards items={characters} direction='right' />
                <InfiniteMovingCards items={stories} direction='right' />
                <InfiniteMovingCards items={comics} direction='left' /> */}
            </div>
        </div>
    )
}

export default Event