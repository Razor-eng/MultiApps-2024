import { BallTriangle } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="flex justify-center mt-60 md:mt-40">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader