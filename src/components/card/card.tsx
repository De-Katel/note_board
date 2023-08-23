import { useAppDispatch } from "../../store/hooks";

import {
    ArrowAutofitWidth,
    Plus,
    Minus
} from 'tabler-icons-react';

import {
    ISingleCard,
    setColRowSpanNumber,
    setSelectedCard,
    swapCardPositionOnBoard
} from "../../store/slices/cardDataSlice";

import { setAppModalData } from "../../store/slices/appModalSlice";
import { useState } from "react";


const Card = (
    { cardData }: { cardData: ISingleCard }) => {

    const dispatch = useAppDispatch();

    const deleteCard = () => {
        dispatch(setSelectedCard(cardData));
        dispatch(setAppModalData({ type: 'deleteCard', title: `удалить${cardData.header ? ' ' + cardData.header : ' эту карточку'}?` }))
    }

    const editCard = () => {
        dispatch(setSelectedCard(cardData));
        dispatch(setAppModalData({ type: 'editCard', title: 'редактирование' }))

    }

    const addColSpanNumber = () => {
        dispatch(setColRowSpanNumber({
            text: cardData.text,
            header: cardData.header,
            id: cardData.id,
            colSpanNumber: cardData.colSpanNumber + 1,
            rowSpanNumber: cardData.rowSpanNumber
        }))

    }

    const putColSpanNumber = () => {
        dispatch(setColRowSpanNumber({
            text: cardData.text,
            header: cardData.header,
            id: cardData.id,
            colSpanNumber: cardData.colSpanNumber - 1,
            rowSpanNumber: cardData.rowSpanNumber
        }))

    }


    const [isDragCard, setIsDragCard] = useState(false)

    const dragStartEndHandler = (card: ISingleCard | null) => {
        setIsDragCard(!!card)
        dispatch(setSelectedCard(card))

    }

    const dropHandler = (card: ISingleCard) => {
        dispatch(swapCardPositionOnBoard(card))
    }

    return (
        <div className={`
        relative
        flex
        flex-col
       ${isDragCard ? 'bg-yellow-300' : 'bg-yellow-100'} 
        col-span-${cardData.colSpanNumber} 
        row-span-${cardData.rowSpanNumber}
         pt-4
         pl-4
         pr-4
         pb-2
         shadow-lg
         shadow-black-500/50
         
         `
        }
            draggable={true}
            onDragStart={() => dragStartEndHandler(cardData)}
            onDragEnd={() => dragStartEndHandler(null)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => dropHandler(cardData)}
        >
            <div className="flex  self-start">
                <button
                    disabled={cardData.colSpanNumber < 4}
                    className=" disabled:hover:text-gray-400 disabled:text-gray-400 hover:text-blue-500"
                    onClick={putColSpanNumber}
                >
                    <Minus />
                </button>
                <ArrowAutofitWidth />
                <button
                    disabled={cardData.colSpanNumber > 11}
                    className=" disabled:hover:text-gray-400 disabled:text-gray-400 hover:text-blue-500"
                    onClick={addColSpanNumber}
                ><Plus /></button>
            </div>



            {cardData.header && <h1 className=' overflow-x-hidden cursor-context-menu mb-3 text-center text-xl'>{cardData.header}</h1>}
            <p className="cursor-context-menu mb-4 break-words">
                {cardData.text}
            </p>
            <div className="  absolute bottom-0 right-2 flex justify-end">

                <div>
                    <button
                        className=" hover:text-blue-500"
                        onClick={editCard}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <button
                        className=" hover:text-red-500"
                        onClick={deleteCard}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card