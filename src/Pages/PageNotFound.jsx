import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="w-screen flex flex-col items-center justify-center gap-5 h-screen fixed bg-white top-0 left-0 z-50">
            <h2 className="text-4xl text-zinc-700">Page Not Found</h2>
            <h3 className="text-xl">Something went wrong!</h3>
            <Link to={'/'} className="px-3 py-2 bg-blue-400 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition-all ease-in duration-150">
                Go Home
            </Link>
        </div>
    )
}

export default PageNotFound