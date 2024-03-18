import Link from "next/link"

export default function() {
    return(
        <footer className=" mt-24 bg-white rounded-lg shadow dark:bg-green-500 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">Biocom</span>
                    </p>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6 text-white">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6 text-white">Politique de confidentialité</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6 text-white">Licence</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline text-white">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-white sm:mx-auto lg:my-8" />
                <span className="block text-white text-sm sm:text-center">© 2024 Biocom</span>
            </div>
        </footer>
    )
}