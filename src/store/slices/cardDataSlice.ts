import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISingleCard {
    id: number,
    header: string,
    text: string,
    colSpanNumber: number,
    rowSpanNumber: number

}

export interface IInitialCardDataState {
    cardList: ISingleCard[],
    selectedCard: ISingleCard | null
}

const initialState: IInitialCardDataState = {
    cardList: [],
    selectedCard: null
};

export const cardDataSlice = createSlice({
    name: 'cardData',
    initialState,
    reducers: {
        addNewCard: (state, action: PayloadAction<ISingleCard>) => {
            state.cardList.push(action.payload)
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
    },
})

export const {
    addNewCard,
    setColRowSpanNumber,
    cardDataEditing,
    setSelectedCard,
    deleteSelectedCardCard,
    swapCardPositionOnBoard
} = cardDataSlice.actions;

export default cardDataSlice.reducer