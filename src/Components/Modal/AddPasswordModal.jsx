/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr"
import SubmitButton from "../Button/SubmitButton"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const AddPasswordModal = ({ modal, setModal, user }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');

    const handleSubmit = async () => {
        if (!userName || !password || !password) {
            toast.error('All fields are required...!');
        } else {
            try {
                await addDoc(collection(db, 'passwords'), {
                    displayName: user.displayName,
                    id: user.uid,
                    website: website,
                    userName: userName,
                    password: password,
                    date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
                }).then(() => {
                    toast.success('Password Saved..!');
                    setModal(false);
                })
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className={`w-screen h-screen flex justify-center items-center top-0 left-0 z-50 bg-zinc-700 fixed ${modal ? 'bg-opacity-70' : 'bg-opacity-0 hidden'} transition-all ease-in duration-1000`}>
            <div className="bg-white rounded-md p-4 w-full md:min-w-96 min-h-96">
                <div className="flex pb-3 justify-between items-center">
                    <h2 className="font-bold">Add a Password</h2>
                    <button onClick={() => setModal(false)}>
                        <GrClose />
                    </button>
                </div>
                <div className="border-t-2 pt-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Website</h2>
                        <input
                            type="text"
                            placeholder="Enter website name"
                            className="px-2 py-1 outline-blue-500 shadow-md border w-full text-lg rounded-md"
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Username</h2>
                        <input
                            type="text"
                            placeholder="Enter username or email"
                            className="px-2 py-1 outline-blue-500 shadow-md border w-full text-lg rounded-md"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Password</h2>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            className="px-2 py-1 outline-blue-500 shadow-md border w-full text-lg rounded-md"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3"                    >
                        <SubmitButton
                            title={'Add Password'}
                            funct={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPasswordModal