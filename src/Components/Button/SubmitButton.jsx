/* eslint-disable react/prop-types */
const SubmitButton = ({ title, funct }) => {
    return (
        <button className="px-3 py-2 w-full bg-indigo-400 text-white font-semibold rounded-lg hover:opacity-80 transition-all ease-in duration-150"
            onClick={funct}
        >
            {title}
        </button>
    )
}

export default SubmitButton