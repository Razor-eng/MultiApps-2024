import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import toast from "react-hot-toast"
import { useAuthState } from "react-firebase-hooks/auth"

const Signin = () => {
    const [email, setEmail] = useState('')
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

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                toast.success('Logged in!');
                navigate('/');
            });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password);
    }

    return (
        <div className="w-screen h-screen overflow-hidden fixed left-0 top-0 bg-blue-100 z-50">
            <div className="flex items-center justify-center h-screen w-full">
                <div className="flex items-center sm:items-stretch bg-white h-2/3 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                    <div className="w-full flex flex-col gap-6 sm:gap-0 p-8 lg:w-1/2">
                        <p className="text-3xl sm:text-xl text-gray-600 text-center">Welcome back!</p>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-2 block w-full focus:outline-2 focus:outline-blue-700"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                            </div>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-2 block w-full focus:outline-2 focus:outline-blue-700"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <a
                                href="#"
                                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                            >
                                Forget Password?
                            </a>
                        </div>
                        <div>
                            <div className="mt-8">
                                <button onClick={handleSumbit} className="bg-green-600 text-white text-xl md:text-[18px] font-bold py-4 md:py-3 shadow-md px-4 w-full rounded-md hover:bg-green-500">
                                    Login
                                </button>
                            </div>
                            <a
                                href="#"
                                className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                            >
                                <div className="flex px-5 justify-center w-full py-3">
                                    <div className="min-w-[30px]">
                                        <svg className="h-6 w-6" viewBox="0 0 40 40">
                                            <path
                                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                                fill="#FFC107"
                                            />
                                            <path
                                                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                                fill="#FF3D00"
                                            />
                                            <path
                                                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                                fill="#4CAF50"
                                            />
                                            <path
                                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                                fill="#1976D2"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex w-full justify-center">
                                        <h1 className="whitespace-nowrap text-gray-600 font-bold">
                                            Sign in with Google
                                        </h1>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="mt-4 flex items-center w-full text-center">
                            <Link
                                to={'/signup'}
                                className="sm:text-xs text-sm text-gray-500 capitalize text-center w-full"
                            >
                                Don&apos;t have any account yet?
                                <span className="text-blue-700"> Sign Up</span>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                        style={{
                            backgroundImage: `url('/signin.jpg')`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Signin