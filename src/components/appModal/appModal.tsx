
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {
    addNewCard,
    deleteSelectedCardCard,
    setSelectedCard,
    cardDataEditing,
    addNewSticker,
    setSelectedSticker,
    deleteSelectedSticker,
    stickerDataEditing
} from '../../store/slices/cardDataSlice';
import { setAppModalData } from '../../store/slices/appModalSlice';


const renderAddCardModal = (
    nameInputValue: string,
    setNameInputValue: React.Dispatch<React.SetStateAction<string>>,
    descriptionAreaValue: string,
    setDescriptionAreaValue: React.Dispatch<React.SetStateAction<string>>,
    addCardHandler: () => void,
    buttonText: string

) => {

    return (
        <div className='flex flex-col'>

            <input
                autoFocus
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                type='text'
                placeholder='Name'
                className=' bg-yellow-100 text-xl mb-3 outline-0 border-b-2 border-yellow-300'
            />
            <textarea
                value={descriptionAreaValue}
                onChange={(e) => setDescriptionAreaValue(e.target.value)}
                placeholder='description'
                className='  bg-yellow-100 p-2 resize-none outline-0 border-2 border-yellow-300 overflow-hidden '
                name=""
                id="" cols={30}
                rows={10}
            />
            <button
                className=' bg-blue-400 text-white p-2 mt-2 mb-1 self-end'
                onClick={addCardHandler}
            > {buttonText}</button>
        </div>
    )

}

const renderDeleteCardModal = (
    closeModalHandler: () => void,
    deleteCardHandler: () => void
) => {
    return (
        <div className='flex justify-end'>
            <button
                className='p-2 bg-red-400 text-white mr-3 mt-2'
                onClick={deleteCardHandler}
            >
                delete
            </button>
            <button
                className='p-2 bg-blue-400 text-white mt-2'
                onClick={closeModalHandler}
            >
                cancel
            </button>
        </div>
    )
}

const renderDeleteSticker = (
    closeModalHandler: () => void,
    deleteHandler: () => void
) => {
    return (
        <div className='flex justify-end'>
            <button
                className='p-2 bg-red-400 text-white mr-3 mt-2'
                onClick={deleteHandler}
            >
                delete
            </button>
            <button
                className='p-2 bg-blue-400 text-white mt-2'
                onClick={closeModalHandler}
            >
                cancel
            </button>
        </div>
    )
}

const renderAddSticker = (
    nameInputValue: string,
    setNameInputValue: React.Dispatch<React.SetStateAction<string>>,
    descriptionAreaValue: string,
    setDescriptionAreaValue: React.Dispatch<React.SetStateAction<string>>,
    addStickerHandler: () => void,
    buttonText: string
) => {
    return (
        <div className='flex flex-col'>

            <input
                autoFocus
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                type='text'
                placeholder='Name'
                className=' bg-red-200 text-xl mb-3 outline-0 border-b-2 border-red-300'
            />
            <textarea
                value={descriptionAreaValue}
                onChange={(e) => setDescriptionAreaValue(e.target.value)}
                placeholder='description'
                className='  bg-red-200 p-2 resize-none outline-0 border-2 border-red-300 overflow-hidden '
                name=""
                id="" cols={30}
                rows={10}
            />
            <button
                className=' bg-blue-400 text-white p-2 mt-2 mb-1 self-end'
                onClick={addStickerHandler}
            > {buttonText}</button>
        </div>
    )
}

const AppModal = () => {

    const dispatch = useAppDispatch();

    const { selectedCard, selectedSticker } = useAppSelector(store => store.persistedReducer.cardData)
    const appModalData = useAppSelector(store => store.persistedReducer.appModal.appModalData)

    const [nameInputValue, setNameInputValue] = useState('')
    const [descriptionAreaValue, setDescriptionAreaValue] = useState('')

    useEffect(() => {
        setNameInputValue(selectedCard?.header || selectedSticker?.header || '');
        setDescriptionAreaValue(selectedCard?.text || selectedSticker?.text || '')
    }, [selectedCard, selectedSticker])

    const addCardHandler = () => {
        dispatch(addNewCard(
            {
                type: 'card',
                id: Math.random(),
                header: nameInputValue,
                text: descriptionAreaValue,
                colSpanNumber: 4,
                rowSpanNumber: 1
            }
        ));
        setNameInputValue('');
        setDescriptionAreaValue('');
        dispatch(setAppModalData(null))
    }

    const addStickerHandler = () => {
        if (!selectedCard) return

        dispatch(addNewSticker(
            {
                cardID: selectedCard?.id,
                id: Math.random(),
                header: nameInputValue,
                text: descriptionAreaValue,
                colSpanNumber: 4
            }
        ));
        setNameInputValue('');
        setDescriptionAreaValue('');
        dispatch(setAppModalData(null))
    }

    const editCatdHandler = () => {
        selectedCard && dispatch(cardDataEditing(
            {
                type: selectedCard.type,
                id: selectedCard?.id,
                header: nameInputValue,
                text: descriptionAreaValue,
                colSpanNumber: selectedCard.colSpanNumber,
                rowSpanNumber: selectedCard.rowSpanNumber
            }
        ));
        setNameInputValue('');
        setDescriptionAreaValue('');
        dispatch(setAppModalData(null))
    }

    const editStickerHandler = () => {
        selectedSticker && dispatch(stickerDataEditing(
            {
                cardID: selectedSticker.cardID,
                id: selectedSticker?.id,
                header: nameInputValue,
                text: descriptionAreaValue,
                colSpanNumber: selectedSticker.colSpanNumber,
            }
        ));
        setNameInputValue('');
        setDescriptionAreaValue('');
        closeModalHandler();
    }

    const closeModalHandler = () => {
        dispatch(setAppModalData(null))
        dispatch(setSelectedCard(null))
        dispatch(setSelectedSticker(null))
    }

    const deleteCardHandler = () => {
        selectedCard && dispatch(deleteSelectedCardCard(selectedCard))
        closeModalHandler();
    }

    const deleteStickerHandler = () => {
        selectedSticker && dispatch(deleteSelectedSticker(selectedSticker))
        closeModalHandler();
    }

    let modalContent;

    switch (appModalData?.type) {
        case 'addCard':
            modalContent = renderAddCardModal(
                nameInputValue,
                setNameInputValue,
                descriptionAreaValue,
                setDescriptionAreaValue,
                addCardHandler,
                'add new card'
            );
            break
        case 'deleteCard': modalContent = renderDeleteCardModal(closeModalHandler, deleteCardHandler)
            break
        case 'editCard': modalContent = renderAddCardModal(
            nameInputValue,
            setNameInputValue,
            descriptionAreaValue,
            setDescriptionAreaValue,
            editCatdHandler,
            'save card'
        );
            break
        case 'addSticker': modalContent = renderAddSticker(
            nameInputValue,
            setNameInputValue,
            descriptionAreaValue,
            setDescriptionAreaValue,
            addStickerHandler,
            'add new sticker'
        )
            break
        case 'editSticker': modalContent = renderAddSticker(
            nameInputValue,
            setNameInputValue,
            descriptionAreaValue,
            setDescriptionAreaValue,
            editStickerHandler,
            'save sticker'
        );
            break
        case 'deleteSticker': modalContent = renderDeleteSticker(closeModalHandler, deleteStickerHandler)
            break


    }


    return (
        appModalData
            ?
            <>
                <div className=' fixed bg-black/50 top-0 right-0 left-0 bottom-0' />
                <div className={`rounded-md w-[500px] fixed py-2 px-3  ${appModalData.type === 'addSticker' || appModalData.type === 'deleteSticker'||appModalData.type === 'editSticker' ? 'bg-red-200' : 'bg-yellow-100'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                    <div className='flex justify-between border-b-2 pb-2 border-black/40 mb-1' >
                        <h1 className='overflow-x-hidden px-3 text-2xl text-center grow'  >{appModalData.title}</h1>
                        <button
                            onClick={closeModalHandler}
                            className=' hover:text-blue-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {modalContent}

                </div>
            </>

            :
            null
    )
}

export default AppModal