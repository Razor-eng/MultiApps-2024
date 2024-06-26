import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading) {
            if (user) {
                navigate('/');
            }
        }
    }, [loading, user, navigate]);

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                displayName: name,
                email: email,
                phone: phone
            }).then(() => {
                updateProfile(user, {
                    displayName: name,
                    phoneNumber: phone
                })
                toast.success('Account Created...')
                navigate('/signin');
            });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerWithEmailAndPassword(name, email, password);
    }

    return (
        <div className="w-screen h-screen overflow-hidden fixed left-0 top-0 bg-blue-100 z-50">
            <div className="h-[100vh] items-center flex justify-center">
                <div className="max-w-screen-xl h-2/3 sm:h-auto bg-white border shadow sm:rounded-lg flex items-center sm:items-stretch justify-center flex-1">
                    <div className="flex-1 bg-blue-900 text-center hidden md:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('/marketing.svg')`,
                            }}
                        ></div>
                    </div>
                    <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className=" flex flex-col gap-2 items-center">
                            <div className="text-center">
                                <h1 className="text-4xl sm:text-2xl xl:text-4xl font-extrabold text-blue-900">
                                    Sign up
                                </h1>
                                <p className="text-sm mt-1 sm:text-[12px] text-gray-500">
                                    Hey enter your details to create your account
                                </p>
                            </div>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs flex flex-col gap-4">
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="tel"
                                        placeholder="Enter your phone"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        onClick={handleSubmit}
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className="mt-6 text-sm sm:text-xs text-gray-600 text-center">
                                        Already have an account?{" "}
                                        <Link to={'/signin'}>
                                            <span className="text-blue-900 font-semibold">Sign in</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup