
const CircleToggle = ({toggleCircle}) => {
    return (
        <div className={`absolute rounded-full w-[15px] h-[15px] ${toggleCircle} transition ease-linear duration-100 md:h-[18px] md:w-[18px]` }></div>
    )
}

export default CircleToggle