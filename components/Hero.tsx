import { WavyBackground } from "./ui/wavy-background"

export default function Hero() {
    return(
        <div>

            <div className="w-screen flex justify-center my-4 relative z-10">
                <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-green-500 to-green-700">Local</p>
                <p className="text-7xl font-bold text-slate-700">Nest</p>
            </div>

            <WavyBackground backgroundFill="white" colors={["#43A047", "#AED581", "#BDBDBD"]} blur={3} waveOpacity={0.6} className="max-w-4xl mx-auto pb-40">
                <p className="text-2xl md:text-4xl lg:text-7xl text-slate-200 font-bold inter-var text-center">
                    Local & Pour vous
                </p>
                <p className="text-base md:text-lg mt-4 text-slate-200 font-normal inter-var text-center">
                    Trouvez des magasins à proximité de chez vous et qui vous conviennent
                </p>
            </WavyBackground>
        </div>
    )
}