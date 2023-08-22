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
        }

    },

})

export const { addNewCard, cardDataEditing, setSelectedCard, deleteSelectedCardCard } = cardDataSlice.actions;

export default cardDataSlice.reducer