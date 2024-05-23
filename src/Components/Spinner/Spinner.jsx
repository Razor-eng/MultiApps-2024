import { Puff } from "react-loader-spinner"

const Spinner = () => {
    return (
        <div className="fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-white z-[1000]">
            <Puff
                visible={true}
                height="100"
                width="100"
                color="#428ec5"
                ariaLabel="puff-loading"
            />
        </div>
    )
}

export default Spinner