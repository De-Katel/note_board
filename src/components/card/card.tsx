import { useAppDispatch } from "../../store/hooks";

import {
    ISingleCard,
    setColRowSpanNumber,
    setSelectedCard,
    swapCardPositionOnBoard
} from "../../store/slices/cardDataSlice";

import { setAppModalData } from "../../store/slices/appModalSlice";
import { useState } from "react";
import SimpleCard from "../simpleCard/simpleCard";
import StickersBoard from "../stickersBoard/stickersBoard";


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
            type: cardData.type,
            text: cardData.text,
            header: cardData.header,
            id: cardData.id,
            colSpanNumber: cardData.colSpanNumber + 1,
            rowSpanNumber: cardData.rowSpanNumber
        }))

    }

    const putColSpanNumber = () => {
        dispatch(setColRowSpanNumber({
            type: cardData.type,
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
        cardData.type==='card'
        ?
        <SimpleCard
        deleteCard={deleteCard}
        editCard={editCard}
        addColSpanNumber={addColSpanNumber}
        putColSpanNumber={putColSpanNumber}
        isDragCard={isDragCard}
        cardData={cardData}
        dragStartEndHandler={dragStartEndHandler}
        dropHandler={dropHandler}
        />
        :
        <StickersBoard 
        deleteCard={deleteCard}
        cardData={cardData}
        dragStartEndHandler={dragStartEndHandler}
        dropHandler={dropHandler}
        />
    )
}

export default Card