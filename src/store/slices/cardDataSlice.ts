import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISticker {
    cardID: number,
    id: number,
    header: string,
    text: string,
    colSpanNumber: number
}

export interface ISingleCard {
    type: 'stickersBoard' | 'card'
    id: number,
    header: string,
    text: string,
    colSpanNumber: number,
    rowSpanNumber: number

}

export interface IInitialCardDataState {
    cardList: ISingleCard[]
    selectedCard: ISingleCard | null
    stickersList: ISticker[]
    selectedSticker: ISticker | null
}

const initialState: IInitialCardDataState = {
    cardList: [],
    selectedCard: null,
    stickersList: [],
    selectedSticker: null
};

export const cardDataSlice = createSlice({
    name: 'cardData',
    initialState,
    reducers: {
        addNewCard: (state, action: PayloadAction<ISingleCard>) => {
            state.cardList.push(action.payload)
        },
        addNewSticker: (state, action: PayloadAction<ISticker>) => {
            state.stickersList.push(action.payload)
        },
        deleteSelectedCardCard: (state, action: PayloadAction<ISingleCard>) => {

            const index = state.cardList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.cardList.splice(index, 1)
        },
        cardDataEditing: (state, action: PayloadAction<ISingleCard>) => {

            const index = state.cardList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.cardList.splice(index, 1, action.payload)
        },
        setSelectedCard: (state, action: PayloadAction<ISingleCard | null>) => {
            state.selectedCard = action.payload
        },
        setColRowSpanNumber: (state, action: PayloadAction<ISingleCard>) => {
            const index = state.cardList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.cardList.splice(index, 1, action.payload)
        },
        swapCardPositionOnBoard: (state, action: PayloadAction<ISingleCard>) => {

            if (!state.selectedCard) {
                return
            }

            const currentPositionIndex = state.cardList.findIndex(card => card.id === state.selectedCard?.id)
            const newPositionIndex = state.cardList.findIndex(card => card.id === action.payload.id)

            if (newPositionIndex === -1) {
                return
            }

            state.cardList.splice(currentPositionIndex, 1);
            state.cardList.splice(newPositionIndex, 0, state.selectedCard)
        },
        setSelectedSticker: (state, action: PayloadAction<ISticker | null>) => {
            state.selectedSticker = action.payload
        },
        swapStickerPositionOnBoard: (state, action: PayloadAction<ISticker>) => {

            if (!state.selectedSticker) {
                return
            }

            const currentPositionIndex = state.stickersList.findIndex(card => card.id === state.selectedSticker?.id)
            const newPositionIndex = state.stickersList.findIndex(card => card.id === action.payload.id)

            if (newPositionIndex === -1) {
                return
            }

            state.stickersList.splice(currentPositionIndex, 1);
            state.stickersList.splice(newPositionIndex, 0, state.selectedSticker)
        },
        setStickerColRowSpanNumber: (state, action: PayloadAction<ISticker>) => {
            const index = state.stickersList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.stickersList.splice(index, 1, action.payload)
        },
        stickerDataEditing: (state, action: PayloadAction<ISticker>) => {

            const index = state.stickersList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.stickersList.splice(index, 1, action.payload)
        },
        deleteSelectedSticker: (state, action: PayloadAction<ISticker>) => {

            const index = state.stickersList.findIndex(card => card.id === action.payload.id)

            if (index === -1) {
                return
            }

            state.stickersList.splice(index, 1)
        },
    },
})

export const {
    addNewCard,
    setColRowSpanNumber,
    cardDataEditing,
    setSelectedCard,
    deleteSelectedCardCard,
    swapCardPositionOnBoard,
    addNewSticker,
    setSelectedSticker,
    swapStickerPositionOnBoard,
    setStickerColRowSpanNumber,
    deleteSelectedSticker,
    stickerDataEditing
} = cardDataSlice.actions;

export default cardDataSlice.reducer