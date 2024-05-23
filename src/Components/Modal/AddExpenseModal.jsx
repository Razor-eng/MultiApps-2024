/* eslint-disable react/prop-types */
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import SubmitButton from "../Button/SubmitButton";

const AddExpenseModal = ({ modal, setModal, user }) => {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState();
    const [type, setType] = useState('');

    const handleSubmit = async () => {
        if (!product || !amount || !type) {
            toast.error('All fields are neccessary..');
        } else {
            try {
                await addDoc(collection(db, 'expenses'), {
                    displayName: user.displayName,
                    id: user.uid,
                    product: product,
                    type: type,
                    amount: amount,
                    date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
                    time: new Date().getTime()
                }).then(() => {
                    toast.success('Expense Added..!');
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
                        <h2 className="font-semibold text-lg">Product</h2>
                        <input
                            type="text"
                            placeholder="Enter Product"
                            className="px-2 py-1 outline-blue-500 shadow-md drop-shadow-md w-full text-lg rounded-md"
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Amount</h2>
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            className="px-2 py-1 outline-blue-500 shadow-md drop-shadow-md w-full text-lg rounded-md"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">Expense Type</h2>
                        <select onChange={e => setType(e.target.value)} className="py-3 px-2 shadow-md drop-shadow-md outline-blue-500 font-semibold text-zinc-500 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                            <option value="">Select Expense Type</option>
                            <option>Credited (+)</option>
                            <option>Debited (-)</option>
                        </select>
                    </div>
                    <div className="mt-3"                    >
                        <SubmitButton
                            title={'Add Expense'}
                            funct={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExpenseModal