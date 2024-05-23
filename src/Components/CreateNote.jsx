/* eslint-disable react/prop-types */
const CreateNote = ({ text, setText, color, setColor, time, setTime }) => {
    const colors = ['#F4F4F5', '#9be8b6', '#e8b7b7', '#77a7e1']

    setTimeout(() => {
        setTime(new Date().toLocaleTimeString());
    }, 1000);

    return (
        <div className="relative w-full md:w-96 max-h-fit border-2 focus-within:border-blue-500 shadow-md drop-shadow-md rounded-md">
            <textarea
                style={{ backgroundColor: `${color}` }}
                className="px-2 py-2 pb-12 block w-full border-zinc-400 rounded-t-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none font-semibold text-[16px] overflow-y-auto"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
                placeholder="Enter note details..."
            />

            <div className="p-2 border-t border-blue-300 rounded-b-md bg-white" style={{ backgroundColor: `${color}`, color: 'white' }}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex gap-3">
                            {colors.map((colorVal, id) => (
                                <div className={`w-6 h-6 rounded-full shadow-md drop-shadow-lg cursor-pointer ${color === colorVal && 'border-2 border-red-400'}`} style={{ backgroundColor: `${colorVal}` }} onClick={() => setColor(colorVal)} key={id} ></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex text-black items-center gap-x-1">
                        <p className="text-sm font-semibold">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote