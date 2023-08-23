import { ArrowAutofitWidth, Minus, Plus } from "tabler-icons-react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAppModalData } from "../../store/slices/appModalSlice"
import { ISingleCard, ISticker, setSelectedCard, setSelectedSticker, setStickerColRowSpanNumber, swapStickerPositionOnBoard } from "../../store/slices/cardDataSlice"

interface IStickersBoardProps {
    cardData: ISingleCard
    dragStartEndHandler: (card: ISingleCard | null) => void
    dropHandler: (card: ISingleCard) => void
    deleteCard: () => void
}

const StickersBoard = ({
    cardData,
    dragStartEndHandler,
    dropHandler,
    deleteCard
}: IStickersBoardProps
) => {

    const dispatch = useAppDispatch()

    const stickers = useAppSelector(store => store.persistedReducer.cardData.stickersList).filter((sticker) => sticker.cardID === cardData.id)

    const dragStickerStartEndHandler = (card: ISticker | null) => {
        dispatch(setSelectedSticker(card))

    }

    const dropStickerHandler = (card: ISticker) => {
        dispatch(swapStickerPositionOnBoard(card))
    }

    const addColSpanNumber = (sticker: ISticker) => {
        dispatch(setStickerColRowSpanNumber({
            cardID: sticker.cardID,
            id: sticker.id,
            header: sticker.header,
            text: sticker.text,
            colSpanNumber: sticker.colSpanNumber + 1
        }))

    }

    const putColSpanNumber = (sticker: ISticker) => {
        dispatch(setStickerColRowSpanNumber({
            cardID: sticker.cardID,
            id: sticker.id,
            header: sticker.header,
            text: sticker.text,
            colSpanNumber: sticker.colSpanNumber - 1
        }))

    }

    const deleteSticker = (sticker: ISticker) => {
        dispatch(setSelectedSticker(sticker));
        dispatch(setAppModalData({ type: 'deleteSticker', title: `удалить${sticker.header ? ' ' + sticker.header : ' этот стикер'}?` }))
    }

    const editSticker = (sticker: ISticker) => {
        dispatch(setSelectedSticker(sticker));
        dispatch(setAppModalData({ type: 'editSticker', title: 'редактирование' }))

    }

    const renderStickerList = () => {
        return stickers.map((sticker) => {
            return (
                <div className={`
                 min-h-[250px]
        relative
        flex
        flex-col
        bg-red-200
        col-span-${sticker.colSpanNumber} 
        pt-4
         pl-4
         pr-4
         pb-2
         shadow-lg
         shadow-red-900
         `
                }
                    draggable={true}
                    onDragStart={() => dragStickerStartEndHandler(sticker)}
                    onDragEnd={() => dragStickerStartEndHandler(null)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => dropStickerHandler(sticker)}
                    key={sticker.id}
                >
                    <div className="flex  self-start">
                        <button
                            disabled={sticker.colSpanNumber < 4}
                            className=" disabled:hover:text-gray-400 disabled:text-gray-400 hover:text-blue-500"
                            onClick={() => putColSpanNumber(sticker)}
                        >
                            <Minus />
                        </button>
                        <ArrowAutofitWidth />
                        <button
                            disabled={sticker.colSpanNumber > 11}
                            className=" disabled:hover:text-gray-400 disabled:text-gray-400 hover:text-blue-500"
                            onClick={() => addColSpanNumber(sticker)}
                        ><Plus /></button>
                    </div>

                    {sticker.header && <h1 className=' overflow-x-hidden cursor-context-menu mb-3 text-center text-xl'>
                        {sticker.header}
                    </h1>}
                    <p className="cursor-context-menu mb-4 break-words">
                        {sticker.text}
                    </p>
                    <div className="  absolute bottom-0 right-2 flex justify-end">

                        <div>
                            <button
                                className=" hover:text-blue-500"
                                onClick={()=>editSticker(sticker)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button
                                className=" hover:text-red-500"
                                onClick={() => deleteSticker(sticker)}
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
        )
    }

    return (
        <div className={`
        relative
        flex
        flex-col
         bg-amber-700/80
        col-span-${cardData.colSpanNumber} 
        row-span-${cardData.rowSpanNumber}
         `
        }
            draggable={true}
            onDragStart={() => dragStartEndHandler(cardData)}
            onDragEnd={() => dragStartEndHandler(null)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => dropHandler(cardData)}
        >

            <div className="flex flex-col border-red-950 border-8 min-h-[300px]">
                <div className=" self-end mr-3">
                    <button
                        onClick={() => {
                            dispatch(setSelectedCard(cardData));
                            dispatch(setAppModalData({ type: 'addSticker', title: 'добавить стикер' }));
                        }}
                        className=" text-white text-xl pb-1 hover:text-yellow-300"
                    >
                        +add sticker
                    </button>
                </div>
                <div className="grid grid-cols-12 gap-3 px-3 pb-10">
                    {renderStickerList()}
                </div>
                <div className="  absolute bottom-4 right-4 flex justify-end">
                    <button
                        className=" text-white hover:text-yellow-300"
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

export default StickersBoard