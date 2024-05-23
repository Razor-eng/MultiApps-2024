/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr"
import CreateNote from "../CreateNote"
import SubmitButton from "../Button/SubmitButton"
import { useState } from "react"
import { db } from "../../firebase"
import { addDoc, collection } from "firebase/firestore"
import toast from "react-hot-toast"

const AddNoteModal = ({ modal, setModal, user }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('#F4F4F5');
    const [time, setTime] = useState();

    const handleSubmit = async () => {
        if (!title || !text) {
            toast.error('All fields are required...!');
        } else {
            try {
                await addDoc(collection(db, 'notes'), {
                    displayName: user.displayName,
                    id: user.uid,
                    title: title,
                    desription: text,
                    date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
                    time: time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1],
                    color: color
                }).then(() => {
                    toast.success('Note Created..!');
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
                    <h2 className="font-bold">Add a Note</h2>
                    <button onClick={() => setModal(false)}>
                        <GrClose />
                    </button>
                </div>
                <div className="border-t-2 pt-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Title</h2>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="px-2 py-1 outline-blue-500 shadow-md drop-shadow-md w-full text-lg rounded-md"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Description</h2>
                        <CreateNote
                            text={text} setText={setText}
                            color={color} setColor={setColor}
                            time={time} setTime={setTime}
                        />
                    </div>
                    <div className="mt-3"                    >
                        <SubmitButton
                            title={'Add Note'}
                            funct={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNoteModal