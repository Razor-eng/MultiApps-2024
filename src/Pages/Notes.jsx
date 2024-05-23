/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GrNotes } from "react-icons/gr"
import { useEffect, useState } from "react"
import AddNoteModal from "../Components/Modal/AddNoteModal";
import AddButton from "../Components/Button/AddButton";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { TbTrashFilled } from "react-icons/tb";
import SearchBar from "../Components/SearchBar/SearchBar";
import toast from "react-hot-toast";
import Loader from "../Components/Spinner/Loader";

const Notes = ({ user }) => {
    const [modal, setModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await getDocs(collection(db, "notes"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.filter(doc => { return doc.data().id === user.uid }).filter((doc) => {
                    return doc.data().title.toLowerCase().includes(search.toLowerCase()) || doc.data().desription.toLowerCase().includes(search.toLowerCase())
                }).map((doc) => ({ ...doc.data(), uid: doc.id }));
                setNotes(newData);
                setLoading(false);
            })
    }

    const deleteData = (note) => {
        deleteDoc(doc(db, 'notes', note?.uid)).then(() => {
            fetchData();
            toast.success('Note Deleted..!');
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
                    <GrNotes />
                    Notes
                </h2>
                <AddButton title={'Add Note'} setValue={setModal} />
            </div>
            {search || notes.length > 0 ?
                <div className="mt-8">
                    <div className="ml-4 flex md:justify-end">
                        <SearchBar placeholder={'Notes'} setSearch={setSearch} search={search} />
                    </div>
                    {notes.length > 0 ?
                        <div className="grid md:grid-cols-3 gap-6 md:gap-12 mt-4">
                            {notes.map((note, id) => (
                                <div className="flex flex-col justify-between px-4 min-h-48 rounded-md shadow-lg drop-shadow-lg py-2" style={{ backgroundColor: `${note.color}` }} key={id}>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl text-zinc-800 font-bold">{note.title}</h2>
                                            <p className="text-xs font-semibold text-zinc-600">{note.date}</p>
                                        </div>
                                        <p className="text-lg text-zinc-800">{note.desription}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-zinc-600 text-xs">{note.time}</span>
                                        <div
                                            className="text-red-600 hover:text-red-500 hover:opacity-80 transition-all ease-in duration-150 cursor-pointer text-lg"
                                            onClick={() => deleteData(note)}
                                        >
                                            <TbTrashFilled />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                            <p className="md:text-5xl text-2xl text-zinc-400">No Notes found...!</p>
                            <h2 className="md:text-2xl text-sm text-zinc-400">Add a note to start</h2>
                        </div>
                )
            }
            <AddNoteModal modal={modal} setModal={setModal} user={user} />
        </div>
    )
}

export default Notes