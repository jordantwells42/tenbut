import type { NextPage } from "next";
import React, {FunctionComponent} from 'react'
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import caveatsJSON from "../../public/caveats.json"
import { string } from "zod";
import Rating from 'react-rating'


const Home: NextPage = () => {
  const [initialRating, setInitialRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [caveat, setCaveat] = useState<string | undefined>("");
  const [showRating, setShowRating] = useState(false);


  const rateMutation = trpc.useMutation(["rating.cast-rating"])


  useEffect(() => {
    getRandomCaveat()
    getRandomRating()
  }, [])

  function handleRatingChange(newRating: number) {
    setShowRating(true)
    setRating(newRating);
  }

  function handleRatingHover(newRating: number) {
    setShowRating(true)
    if (newRating === undefined) {
      return
    }
    setRating(newRating);
  }

  function getRandomCaveat() {
    const randomIndex = Math.floor(Math.random() * caveatsJSON.length);
    const randcaveat = caveatsJSON[randomIndex];
    setCaveat(randcaveat);
  }

  function getRandomRating() {
    const randomRating = Math.floor(Math.random() * 10) + 1
    setInitialRating(randomRating);
    setRating(randomRating)
  }

  function handleRefresh() {
    getRandomCaveat()
    getRandomRating()
    setShowRating(false)
  }

  function handleSubmit() {
    const out = rateMutation.mutate({caveat: caveat, rating: rating, initialRating: initialRating, delta: rating - initialRating})
    console.log(out)
    handleRefresh()
  }
  
  return (
    <>
      <Head>
        <title>They&apos;re a 10 but....</title>
        <meta name="description" content="A rating game based off the popular TikTok trend, they're a 10 but...." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex pt-20 h-screen w-full flex-col bg-slate-800 items-center justify-center">
        <div className="border-4 p-8 w-3/4 rounded-[40px] items-center justify-center">
          <h1 className="text-white text-center text-4xl">They&apos;re {initialRating === 8 ? "an" : "a"} {initialRating},</h1>
          <div className="py-3"></div>
          <h1 className="text-center text-white text-center italic text-4xl">but {caveat}</h1>
        </div>
        <div className="py-10"></div>
        <h1 className="text-white text-center text-4xl">They&apos;re {rating === 8 ? "an" : "a"} {!showRating ? "..." : rating}</h1>
        <div className="py-5"></div>
        <div className="flex flex-col items-center jutify-center">
          {<Rating onClick={handleRatingChange} onHover={handleRatingHover} initialRating={rating} start={0} stop={10}/>}
        </div>

        <div className="py-5"></div>
        <div className="flex flex-row gap-5 items-center justify-center">

          <button onClick={handleRefresh} className="border rounded text-white text-2xl p-4">Refresh</button>
          <button onClick={handleSubmit} className="border rounded text-white text-2xl p-4">Submit</button>
          
        </div>

        <div className="py-5"></div>
        <Link href="/results"><h3 className="underline text-white text-2xl hover:text-slate-300 hover:cursor-pointer">Results</h3></Link>
      </div>

    </>
  );
};

export default Home;
