/* eslint-disable react/prop-types */
import { GrNotes } from 'react-icons/gr'
import { TbApps, TbPasswordUser } from 'react-icons/tb'
import { GiExpense } from 'react-icons/gi'
import { FaArrowLeft, FaRegUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import toast from 'react-hot-toast'

const Sidebar = ({ notes, passwords, expenses }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const SidebarItems = [
        { title: 'Dashboard', path: '/', icon: FaRegUser, visible: true },
        { title: 'Apps', path: '/apps', icon: TbApps, visible: true },
        { title: 'Notes', path: '/notes', icon: GrNotes, visible: notes },
        { title: 'Passwords', path: '/passwords', icon: TbPasswordUser, visible: passwords },
        { title: 'Expenses', path: '/expenses', icon: GiExpense, visible: expenses },
    ]

    return (
        <div className="w-60 z-50 bg-white h-screen col-span-2 fixed border-r shadow-md hidden sm:block">
            <div className="flex flex-col justify-between items-center h-full">
                <div className="flex flex-col">
                    <div className="flex justify-center py-6">
                        <img src="/logo.png" alt="" className="w-20 rounded-md bg-sky-50 shadow-lg px-4 py-4" />
                    </div>
                    <div className="flex flex-col gap-4 px-6 mt-8">
                        {SidebarItems.map((item, id) => item.visible !== 0 && (
                            <Link to={item.path} className={`flex gap-2 items-center text-lg hover:bg-zinc-100 cursor-pointer px-4 py-2 rounded-md font-semibold ${location.pathname === item.path ? 'text-black bg-zinc-200' : 'text-zinc-500'}`} key={id}>
                                <item.icon />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className="flex font-semibold text-lg items-center gap-1 text-white bg-red-500 px-6 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all ease-in duration-150 justify-center mb-12"
                    onClick={() => {
                        signOut(auth);
                        toast.success('Signed Out..!');
                        navigate('/signup');
                    }}
                >
                    <FaArrowLeft />
                    <h2 className="">Logout</h2>
                </div>
            </div>
        </div>
    )
}

export default Sidebar