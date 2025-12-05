import { IonContent, IonPage, IonIcon, useIonRouter, useIonViewWillEnter, useIonToast } from '@ionic/react'
import { chevronForward, lockClosed, search, timeOutline, trash } from 'ionicons/icons'
import React, { useState } from 'react'

const History = () => {

  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('')
  const router = useIonRouter()
  const [presentToast] = useIonToast()

  useIonViewWillEnter(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history') || '[]')
    setHistory(storedHistory)
  })

  const handleClick = (item) => {
    localStorage.setItem('selectedRequest', JSON.stringify(item))
    router.push('/home/builder')
  }

  const clearHistory = () => {
    localStorage.removeItem('history')
    presentToast({ message: 'History wiped clean.', duration: 1500 })
    setHistory([])
  }

  const filteredHistory = history.filter(
    (item) =>
      item.apiUrl.toLowerCase().includes(filter.toLowerCase()) ||
      item.method.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <IonPage>
      <IonContent>
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root">
          <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md" style={{ height: 107 }}>
            <div className="flex size-12 shrink-0 items-center justify-start">
              <IonIcon icon={timeOutline} className="text-3xl" />
            </div>
            <h1 className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-tight flex-1 text-center">
              History
            </h1>
            <div className="flex w-auto items-center justify-end">
              <div
                className="flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-3 py-1.5 cursor-pointer"
                onClick={clearHistory}
              >
                <IonIcon icon={trash} />
                <p className="text-red-700 dark:text-red-300 text-sm font-bold leading-normal">Clear</p>
              </div>
            </div>
          </div>

          <main className="flex flex-col flex-1 px-4 pt-4">
            <div className="mb-4">
              <div className="flex items-start gap-3 rounded-xl 
                  bg-blue-100 dark:bg-blue-900/40 
                  p-4 border border-blue-200 dark:border-blue-800">
                <IonIcon icon={lockClosed} className="text-3xl text-blue-700 dark:text-blue-300" />

                <div className="flex w-full min-w-0 grow flex-col">
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100">
                    100% Local
                  </p>
                  <p className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">
                    Your request history is stored locally on this device and is never uploaded to cloud.
                  </p>
                </div>
              </div>
            </div>


            <div className="mb-4">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                  <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-content-light dark:bg-content-dark items-center justify-center pl-4 rounded-l-xl border-y border-l border-border-light dark:border-border-dark">
                    <IonIcon icon={search} />
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-y border-r border-border-light dark:border-border-dark bg-content-light dark:bg-content-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-4 pl-2 text-base font-normal"
                    placeholder="Filter by endpoint or method"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-3 pb-4">
              {filteredHistory.length === 0 && (
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-16">
                  No requests yet.
                </p>
              )}

              {filteredHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-content-light dark:bg-content-dark px-4 py-3 justify-between rounded-xl shadow-sm border border-border-light dark:border-border-dark cursor-pointer"
                  onClick={() => handleClick(item)}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div
                      className={`flex items-center justify-center rounded-lg shrink-0 size-12 bg-${item.method.toLowerCase()}/10 dark:bg-${item.method.toLowerCase()}/20`}
                    >
                      <span className={`text-${item.method.toLowerCase()} font-bold text-sm`}>
                        {item.method}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                      <p className="text-base font-medium truncate">{item.apiUrl}</p>
                      <p className="text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <IonIcon icon={chevronForward} />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default History
