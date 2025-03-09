import React from 'react'

const CustomButton = ({btnType,title, styles, handleClick}) => {
    return (
        <button
            type={btnType}        
            className={`rounded-[10px] py-2 px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white ${styles}`} onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default CustomButton