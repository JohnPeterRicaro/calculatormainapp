
const CircleToggle = ({toggleCircle}) => {
    return (
        <div className={`absolute h-[18px] w-[18px] rounded-full ${toggleCircle} transition ease-linear duration-100`}></div>
    )
}

export default CircleToggle