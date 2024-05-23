/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { TbApps } from "react-icons/tb"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Apps = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/');
            }
        }
    }, [loading, user, navigate]);

    const HomeItems = [
        { title: 'Notes App', image: '/note.png', description: 'Use the Notes app to quickly capture your thoughts. You can add images and sketches, make checklists, or even scan documents.', path: '/notes' },
        { title: 'Password Manager', image: '/password.png', description: `A password manager can store all your passwords securely, so you don't have to worry about remembering them. This allows you to use unique, strong passwords for all your important accounts.`, path: '/passwords' },
        { title: 'Expense Tracker', image: '/expense.png', description: `Expense tracking gives you an easy way to record and understand all of your spendings and review it in a timely manner. Tracking your spending helps you identify any expenses that might be unnecessary or excessive.`, path: '/expenses' },
    ]

    return (
        <div className="md:pr-20">
            <h2 className="text-3xl flex items-center gap-2 text-zinc-600 font-bold">
                <TbApps />
                Apps
            </h2>
            <div className="grid md:grid-cols-3 gap-5 md:gap-8 mt-8">
                {HomeItems.map((item, id) => (
                    <Link to={item.path} key={id} className="border rounded-lg shadow-lg drop-shadow-xl py-4 w-full flex flex-col items-center justify-center hover:scale-105 transition-all ease-in duration-200 bg-violet-50 cursor-pointer">
                        <div className="bg-white mb-3 drop-shadow-md shadow-lg rounded-lg w-[90%] flex justify-center">
                            <img src={item.image} alt="" className="w-52 h-60 py-2" />
                        </div>
                        <div className="border-t-2 py-2 w-full flex flex-col gap-3 items-center justify-center px-4">
                            <h2 className="font-bold text-zinc-600 text-lg">{item.title}</h2>
                            <p className="text-sm font-semibold text-zinc-500">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Apps
