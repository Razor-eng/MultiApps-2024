/* eslint-disable react-hooks/exhaustive-deps */
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import AddButton from "../Components/Button/AddButton";
import { GiExpense } from "react-icons/gi";
import AddExpenseModal from "../Components/Modal/AddExpenseModal";
import SearchBar from "../Components/SearchBar/SearchBar";
import Loader from "../Components/Spinner/Loader";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const Expenses = ({ user }) => {
    const [modal, setModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    let val = 0

    const fetchData = async () => {
        await getDocs(collection(db, "expenses"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.filter(doc => { return doc.data().id === user?.uid }).filter((doc) => {
                    return doc.data().product.toLowerCase().includes(search.toLowerCase()) || doc.data().type.toLowerCase().includes(search.toLowerCase()) || doc.data().amount.includes(search)
                }).map((doc) => ({ ...doc.data(), uid: doc.id }));
                setExpenses(newData);
                setLoading(false);
            })
    }

    const deleteData = (expense) => {
        deleteDoc(doc(db, 'expenses', expense?.uid)).then(() => {
            fetchData();
            toast.success('Expense Deleted..!');
        });
    }

    useEffect(() => {
        val = 0;
        setLoading(true);
        fetchData();
        expenses.map(expense => {
            if (expense.type.includes('+')) {
                val = val + Number(expense.amount);
            } else {
                val = val - Number(expense.amount);
            }
            setTotal(val);
        })
    }, [modal, expenses])

    return (
        <div className="md:pr-20">
            <div className="flex justify-between">
                <h2 className="text-3xl flex items-center gap-2 text-zinc-600 font-bold">
                    <GiExpense />
                    Expenses
                </h2>
                <AddButton title={'Add Expense'} setValue={setModal} />
            </div>
            {search || expenses.length > 0 ?
                <div className="mt-8">
                    <div className="ml-4 flex justify-between flex-col md:flex-row">
                        <h2 className="text-xl font-semibold text-zinc-600">Total Balance:
                            <span className="ml-2" style={{ color: `${total < 0 ? 'red' : 'green'}` }}>{total}</span>
                        </h2>
                        <SearchBar placeholder={'Expenses'} search={search} setSearch={setSearch} />
                    </div>
                    {expenses.length > 0 ?
                        <div className="mt-4">
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Product</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Expense Type</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {expenses.map((expense, id) => (
                                                        <tr key={id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{expense.product}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{expense.amount}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold" style={{ color: `${expense.type.includes('+') ? 'green' : 'red'}` }}>{expense.type.split('(')[0]}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{expense.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-500 disabled:opacity-50 disabled:pointer-events-none"
                                                                    onClick={() => deleteData(expense)}
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
                            <p className="text-5xl text-zinc-400">No Expense found...!</p>
                            <h2 className="text-2xl text-zinc-400">Add a expense to start</h2>
                        </div>
                )
            }
            <AddExpenseModal modal={modal} setModal={setModal} user={user} />
        </div>
    )
}

export default Expenses
