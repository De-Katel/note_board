import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAppModalData {
    type: 'addCard' | 'deleteCard'|'editSticker'| 'editCard'|'addSticker'|'deleteSticker'
    title: string
}

interface IInitialAppModalDataState {
    appModalData: IAppModalData | null

}

const initialState: IInitialAppModalDataState = {
    appModalData: null,

};

export const appModalSlice = createSlice({
    name: 'appModal',
    initialState,
    reducers: {
        setAppModalData: (state, action: PayloadAction<IAppModalData | null>) => {
            state.appModalData = action.payload
        },

    },

})

export const { setAppModalData } = appModalSlice.actions;

export default appModalSlice.reducer