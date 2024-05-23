/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TbPasswordUser } from "react-icons/tb"
import AddButton from "../Components/Button/AddButton"
import { useEffect, useState } from "react"
import AddPasswordModal from "../Components/Modal/AddPasswordModal";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SearchBar from "../Components/SearchBar/SearchBar";
import Loader from "../Components/Spinner/Loader";
import toast from "react-hot-toast";

const Passwords = ({ user }) => {
    const [modal, setModal] = useState(false);
    const [passwords, setPasswords] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await getDocs(collection(db, "passwords"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.filter(doc => { return doc.data().id === user.uid }).filter(doc => {
                    return doc.data().website.toLowerCase().includes(search.toLowerCase()) || doc.data().userName.toLowerCase().includes(search.toLowerCase())
                }).map((doc) => ({ ...doc.data(), uid: doc.id }));
                setPasswords(newData);
                setLoading(false);
            })
    }

    const deleteData = (password) => {
        deleteDoc(doc(db, 'passwords', password?.uid)).then(() => {
            fetchData();
            toast.success('Expense Deleted..!');
        });
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [modal, search])

    return (
        <div className="md:pr-20">
            <div className="flex justify-between">
                <h2 className="text-3xl flex items-center gap-2 text-zinc-600 font-bold">
                    <TbPasswordUser />
                    Passwords
                </h2>
                <AddButton title={'Add Password'} setValue={setModal} />
            </div>
            {search || passwords.length > 0 ?
                <div className="mt-8">
                    <div className="ml-4 flex md:justify-end">
                        <SearchBar placeholder={'Passwords'} search={search} setSearch={setSearch} />
                    </div>
                    {passwords.length > 0 ?
                        <div className="mt-4">
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Website</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Username</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Password</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Added</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {passwords.map((password, id) => (
                                                        <tr key={id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{password.website}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{password.userName}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{password.password}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{password.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-500 disabled:opacity-50 disabled:pointer-events-none"
                                                                    onClick={() => deleteData(password)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex h-screen justify-center mt-20">
                            <h2 className="text-zinc-700 text-2xl font-semibold">
                                No results found
                            </h2>
                        </div>
                    }
                </div>
                :
                (
                    loading ?
                        <Loader />
                        :
                        <div className="flex gap-2 flex-col mt-20 justify-center items-center h-80">
                            <p className="text-5xl text-zinc-400">No Passwords found...!</p>
                            <h2 className="text-2xl text-zinc-400">Add a password to start</h2>
                        </div>
                )
            }
            <AddPasswordModal modal={modal} setModal={setModal} user={user} />
        </div>
    )
}

export default Passwords