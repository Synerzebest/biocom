"use client"

import { Hero, AddLocation, ShopCardsContainer, SearchCity, UserBtn, Footer } from "@/components"
import { useState } from "react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return(
    <div>      
      <Hero />

      <UserBtn />

      <div className="fixed bottom-2 right-2 z-10 shadow rounded-lg">
        <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white p-4 rounded-lg relative font-bold hover:bg-green-600">Ajouter un commerce</button>
        <AddLocation isOpen={isOpen} closeModal={() => setIsOpen(false)}/>
      </div>

      <div className="w-full flex flex-col items-center gap-[50px] relative top-[-250px]">
        <p className="text-xl font-bold text-center">Trouvez un magasin près de chez vous</p>
        <SearchCity />
      </div>

      <div>
        <ShopCardsContainer />
      </div>
      
      <Footer />
    </div>
  )
}