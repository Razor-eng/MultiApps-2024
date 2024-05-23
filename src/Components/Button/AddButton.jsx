/* eslint-disable react/prop-types */
const AddButton = ({ title, setValue }) => {
    return (
        <button className="px-3 py-2 bg-emerald-400 text-white font-semibold rounded-lg hover:opacity-80 transition-all ease-in duration-150"
            onClick={() => setValue(true)}
        >
            {title}
        </button>
    )
}

export default AddButton