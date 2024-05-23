import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { CiLogout, CiUser } from "react-icons/ci";

/* eslint-disable react/prop-types */
const Navbar = ({ user }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full z-30 justify-between fixed top-0 md:pl-72 flex items-center bg-transparent border-b shadow-lg bg-white h-20 px-2 md:px-10">
            <div className="flex gap-2 items-center">
                <div
                    className="flex md:hidden font-semibold items-center gap-1 text-zinc-800 bg-zinc-100 p-2 rounded-md cursor-pointer hover:opacity-80 text-2xl transition-all ease-in duration-150 justify-center"
                    onClick={() => {
                        signOut(auth);
                        toast.success('Signed Out..!');
                        navigate('/signup');
                    }}
                >
                    <CiLogout />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{user?.displayName}</h2>
                    <span className="text-xs text-zinc-400 font-semibold">{user?.email}</span>
                </div>
            </div>
            {/* <img src="/public/expense.png" alt="" className="w-12 rounded-full shadow-xl border drop-shadow-xl" /> */}
            <Link to={'/'} className="p-3 rounded-full shadow-xl border-2 drop-shadow-xl">
                <CiUser size={32} />
            </Link>
        </div>
    )
}

export default Navbar