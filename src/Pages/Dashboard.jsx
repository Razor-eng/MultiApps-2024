/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FaRegUser } from "react-icons/fa";

const Dashboard = ({ expenses, passwords, notes }) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/signup');
            }
        }
    }, [loading, user, navigate]);

    const DashboardItems = [
        { title: 'Notes App', image: '/note.png', total: notes, path: '/notes' },
        { title: 'Password Manager', image: '/password.png', total: passwords, path: '/passwords' },
        { title: 'Expense Tracker', image: '/expense.png', total: expenses, path: '/expenses' },
    ]

    return (
        <div className="md:pr-20">
            <h2 className="text-3xl flex items-center gap-2 text-zinc-600 font-bold">
                <FaRegUser />
                Dashboard
            </h2>
            <div className="grid md:grid-cols-3 gap-5 md:gap-8 mt-8">
                {DashboardItems.map((item, id) => (
                    <Link to={item.path} key={id} className="border rounded-lg shadow-lg drop-shadow-xl py-4 w-full flex flex-col items-center justify-center hover:scale-105 transition-all ease-in duration-200 bg-teal-50 cursor-pointer">
                        <div className="bg-white mb-3 drop-shadow-md shadow-lg rounded-lg w-[80%] flex justify-center">
                            <img src={item.image} alt="" className="w-32 h-40 py-2" />
                        </div>
                        <div className="border-t-2 py-2 w-full flex flex-col gap-3 items-center justify-center px-4">
                            <h2 className="font-bold text-zinc-600 text-lg">{item.title}</h2>
                            <p className="text-sm font-semibold text-zinc-500">
                                <span className="">Total Added: </span>
                                {item.total}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to={'/apps'} className="flex md:hidden mt-10 bg-zinc-300 py-4 rounded-lg font-semibold text-lg hover:opacity-80 transition-all ease-in duration-150 active:scale-95 justify-center">
                All Apps
            </Link>
        </div>
    )
}

export default Dashboard