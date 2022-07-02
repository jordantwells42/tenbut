import React, { useEffect, useState } from 'react'
import { trpc } from "../utils/trpc";
import { prisma } from "../server/db/client";
import Link from 'next/link';
import Head from 'next/head';

export default function Results(props: any) {

        

    return (
        <>
        <Head>
        <title>They&apos;re a 10 but it&apos;s a Results Page</title>
        <meta name="description" content="A rating game based off the popular TikTok trend, they're a 10 but...." />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="flex pt-20 min-h-screen w-full flex-col bg-stone-800 items-center justify-center">
            <h1 className='text-pink-300 font-bold text-4xl'>Results</h1>
            {/*calculateDeltas(data).map((datapoint) => {
                return (
                    <div key={datapoint.caveat} className='text-white text-base'>
                        {datapoint.caveat}: {datapoint.delta}
                    </div>
                )
            }).reverse()*/}
            <div className='py-5'></div>
            {props.ratings.map((rating : any) => {
                if (rating.caveat === "they're feet smell"){
                    return <></>
                }
                const delta = rating._avg.delta
                let deltaColor = delta > 0 ? 'text-green-500' : 'text-red-500'
                deltaColor = delta === 0 ? 'text-white' : deltaColor
                return (
                    <div key={rating.caveat} className='border border-cyan-300 px-5 py-2 items-center text-cyan-100 w-3/4 flex justify-between flex-row text-base'>
                        <h1 className="text-left">but {rating.caveat}: &nbsp;</h1> 
                        <h1 className={deltaColor + " text-right"}>{delta.toFixed(2)}</h1>
                    </div>
                )
            })}
            <div className='py-5'></div>
            <Link href="/">
                <h1 className="font-bold text-cyan-100 underline text-2xl hover:text-slate-300 hover:cursor-pointer">Back to Judging</h1>
            </Link>
            <div className='py-10'></div>
        </div>
        </>
    )

}


export const getStaticProps = async () => {
    // @ts-ignore
    const ratings = await prisma.rating.groupBy({
        by: ["caveat"],
        _avg: {
            delta: true
        },
        orderBy:{
            _avg: {
                delta: 'desc',
            }
        }

    })

    console.log(ratings)
    return {props: {ratings: ratings}, revalidate: 120}

}
