const CardBalance = (props) => {
    const { image, title, amount, link } = props

    return (
        <div className="w-full bg-white rounded-lg pt-6 px-6 flex flex-col justify-center items-center shadow-md">
            <div className="mb-8">
                <img className="object-center object-cover  h-40 w-40" src={image} alt="logo" />
            </div>
            <div className="text-center w-full">
                <p className="text-base text-gray-400 font-normal">{title}</p>
                <p className="text-4xl  text-gray-700 font-bold mb-2">$ {amount} </p>
                <p className="text-right pt-4 pb-6">
                     <a href="#" className="font-medium  text-ct-primary-600  hover:text-blue-600">Ver Detalle </a>
                    </p>

            </div>
        </div>
    )
}



export default CardBalance