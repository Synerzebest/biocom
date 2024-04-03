import { Hero, AddLocationButton, ShopCardsContainer, SearchCity, UserBtn, Footer } from "@/components"

export default function Home() {
  return(
    <div>      
      <Hero />

      <UserBtn />

      <AddLocationButton />

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