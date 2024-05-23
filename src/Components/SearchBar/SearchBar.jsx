/* eslint-disable react/prop-types */
const SearchBar = ({ placeholder, search, setSearch }) => {
    return (
        <div className="border rounded-lg border-zinc-400 w-60 focus-within:border-blue-500 focus-within:w-72 transition-all ease-in duration-100">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${placeholder}`} className="w-full px-3 py-1 rounded-lg outline-none" />
        </div>
    )
}

export default SearchBar