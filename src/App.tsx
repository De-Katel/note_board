import './App.css'

import { ISingleCard } from './store/slices/cardDataSlice'
import { setAppModalData } from './store/slices/appModalSlice'

import Card from './components/card/card'

import { useAppSelector, useAppDispatch } from './store/hooks'
import AppModal from './components/appModal/AppModal'


const renderCardList = (
  cardList: ISingleCard[]
) => {
  if (!cardList.length) return (
    <h1 className='mt-60 col-span-12 items-center text-3xl text-center'>no notes</h1>
  )

  return cardList.map((card) => {
    return (
      <Card key={card.id} cardData={card} />
    )
  })

}

function App() {
  const dispatch = useAppDispatch()

  const cardList = useAppSelector(store => store.persistedReducer.cardData.cardList)

  return (
    <>
      <div className='
        relative
        mt-[3vh]
       bg-neutral-200
        shadow-lg 
        shadow-black-500/50
        min-h-[94vh]
        '>

        <h1 className='text-center text-3xl  text-neutral-500 pt-2'  >
          My note board
        </h1>
        <div className=' flex justify-end'>
          <button
            className='bg-blue-400/80 mr-5 p-1 text-white flex justify-center w-40  items-center  hover:bg-blue-400 '
            onClick={() => dispatch(setAppModalData({ type: 'addCard', title: 'добавить катрочку' }))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            add card
          </button>
        </div>
        <div className=' p-5 grid gap-3 auto-cols-fr grid-cols-12 grid-flow-row-dense '>
          {renderCardList(cardList)}
        </div>
      </div>
      <AppModal />
    </>
  )
}

export default App
