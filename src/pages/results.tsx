import React, { useEffect, useState } from 'react'
import { trpc } from "../utils/trpc";
import { prisma } from "../server/db/client";
import Link from 'next/link';
import Head from 'next/head';

export default function Results(props) {

        

    return (
        <>
        <Head>
        <title>They&apos;re a 10 but it's a Results Page</title>
        <meta name="description" content="A rating game based off the popular TikTok trend, they're a 10 but...." />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="flex pt-20 h-screen w-full flex-col bg-slate-800 items-center justify-center">
            <h1 className='text-white text-4xl'>Results</h1>
            {/*calculateDeltas(data).map((datapoint) => {
                return (
                    <div key={datapoint.caveat} className='text-white text-2xl'>
                        {datapoint.caveat}: {datapoint.delta}
                    </div>
                )
            }).reverse()*/}
            <div className='py-5'></div>
            {props.ratings.map(rating => {
                const delta = rating._avg.delta
                let deltaColor = delta > 0 ? 'text-green-500' : 'text-red-500'
                deltaColor = delta === 0 ? 'text-white' : deltaColor
                return (
                    <div key={rating.caveat} className='text-white flex flex-row text-2xl'>
                        <h1>but {rating.caveat}: &nbsp;</h1> 
                        <h1 className={deltaColor}>{delta}</h1>
                    </div>
                )
            })}
            <div className='py-5'></div>
            <Link href="/">
                <h1 className="text-white underline text-2xl hover:text-slate-300 hover:cursor-pointer">Back to Judging</h1>
            </Link>
        </div>
        </>
    )

}


export const getStaticProps = async () => {
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
    return {props: {ratings: ratings}}

}