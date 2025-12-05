import { IonContent, IonIcon, IonPage, useIonToast, useIonViewWillEnter } from '@ionic/react'
import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { build, lockClosed, chevronDown, send, close, shieldOutline, copyOutline, shareOutline, trash, rocketOutline, codeSlashOutline, globeOutline, buildOutline } from 'ionicons/icons'
import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Builder = () => {

    const [currentConfig, setCurrentConfig] = useState({ apiKey: "", apiUrl: "", headers: "", params: "", method: "GET" })
    const [isOpen, setIsOpen] = useState(false)
    const [openOnboard, setOpenOnboard] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [status, setStatus] = useState('')

    const [presentToast] = useIonToast()

    useIonViewWillEnter(() => {
        const selected = JSON.parse(localStorage.getItem('selectedRequest'))
        if (selected) {
            setCurrentConfig({
                apiKey: '',
                apiUrl: selected.apiUrl || '',
                headers: selected.headers || '',
                params: selected.params || '',
                method: selected.method || 'GET'
            });
            localStorage.removeItem('selectedRequest')
        }
    })

    const handleChange = (e) => {
        setCurrentConfig({ ...currentConfig, [e.target.name]: e.target.value })
    };

    const makeApiCall = async () => {
        const { apiKey, apiUrl, headers, params, method } = currentConfig

        setIsOpen(true)
        setIsLoading(true)
        setResponse('')
        setStatus('')

        if (!apiKey || !apiUrl) {
            setResponse("API Key or URL is missing.")
            setStatus("400")
            setIsLoading(false)
            return
        }

        if (!/^https?:\/\//i.test(apiUrl)) {
            setResponse("Invalid API URL. Include 'http://' or 'https://'")
            setStatus("400")
            setIsLoading(false)
            return
        }

        let headersObj = { 'x-rapidapi-key': apiKey }
        if (headers) {
            try {
                headersObj = { ...headersObj, ...JSON.parse(headers) }
            } catch (e) {
                setResponse(`Headers JSON error: ${e.message}`)
                setStatus("400")
                setIsLoading(false)
                return
            }
        }

        let finalUrl = apiUrl
        if (params) {
            const paramPairs = params.split('&').map(p => p.split('='))
            finalUrl += `?${new URLSearchParams(paramPairs).toString()}`
        }

        const options = {
            method: method.toUpperCase(),
            headers: headersObj,
        };

        if (method.toUpperCase() === 'POST') {
            options.body = JSON.stringify({})
        }

        try {
            const res = await fetch(finalUrl, options)
            const text = await res.text()
            const historyEntry = {
                apiUrl,
                headers,
                params,
                method,
                date: new Date().toISOString(),
            };
            const existingHistory = JSON.parse(localStorage.getItem('history') || '[]');
            existingHistory.unshift(historyEntry); // latest first
            if (existingHistory.length > 50) existingHistory.splice(50); // keep last 50
            localStorage.setItem('history', JSON.stringify(existingHistory));
            setResponse(text || 'Success: No response body.')
            setStatus(`${res.status} ${res.statusText}`)
        } catch (err) {
            setResponse(`${err.message}`)
            setStatus("500")
        } finally {
            setIsLoading(false)
        }
    }

    const copyResponse = () => {
        if (!response) return
        navigator.clipboard.writeText(response)
            .then(() => {
                presentToast({ message: 'Response copied to clipboard', duration: 1500 })
            })
            .catch(() => {
                presentToast({ message: 'Failed to copy response', duration: 1500 })
            })
    }

    const clearFields = () => {
        setCurrentConfig({
            apiKey: "",
            apiUrl: "",
            headers: "",
            params: "",
            method: "GET"
        })
        presentToast({ message: 'Fields cleared.', duration: 1500 })
    }

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
        if (!hasSeenOnboarding) {
            setOpenOnboard(true)
        }
    }, [])

    const handleGetStarted = () => {
        localStorage.setItem('hasSeenOnboarding', 'true')
        setOpenOnboard(false)
    }

    const showSecurityNotice = () => {
        presentToast({ message: "Data goes only between you and your API.", duration: 1500 })
    }

    return (
        <IonPage>
            <IonContent>
                <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root">
                    <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md" style={{ height: 107 }}>
                        <div className="flex size-12 shrink-0 items-center justify-start">
                            <IonIcon icon={buildOutline} className="text-3xl" />
                        </div>
                        <h1 className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-tight flex-1 text-center">API Request</h1>
                        <div className="flex w-auto items-center justify-end">
                            <div className="flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-3 py-1.5" onClick={clearFields}>
                                <IonIcon icon={trash} />
                                <p className="text-red-700 dark:text-red-300 text-sm font-bold leading-normal">Clear</p>
                            </div>
                        </div>
                    </div>
                    <main className="p-4 space-y-6">
                        <div className="flex flex-col min-w-40 flex-1">
                            <div className="flex w-full flex-1 items-stretch rounded-xl shadow-sm">
                                <div className="relative">
                                    <select className="form-select appearance-none h-14 w-32 rounded-l-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-base font-bold pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" value={currentConfig.method} name="method" onChange={handleChange}>
                                        <option>GET</option>
                                        <option>POST</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                        <IonIcon icon={chevronDown} />
                                    </div>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 border-l-0 text-base font-mono leading-normal" placeholder="https://192.168.1.10:8080/api/v1/" onChange={handleChange} name="apiUrl" value={currentConfig.apiUrl} />
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="flex border-b border-slate-200 dark:border-slate-700 gap-8">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-slate-900 dark:text-slate-50 pb-3 pt-1">
                                    <p className="text-slate-900 dark:text-slate-50 text-base font-bold leading-normal">Configure</p>
                                </a>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Key</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" value="API Key" readOnly={true} />
                                </div>
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Value</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" placeholder="a3bad165-7350-4b76-8a3d-42eaf4d92b8b" onChange={handleChange} name="apiKey" value={currentConfig.apiKey} />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Key</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" value="Headers" readOnly />
                                </div>
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Value</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" placeholder='{"my-api-host": "example.p.myapi.com"}' onChange={handleChange} name="headers" value={currentConfig.headers} />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Key</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" value="Params" readOnly />
                                </div>
                                <div className="flex flex-col min-w-40 flex-1">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Value</label>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-mono" placeholder='param1=value1&param2=value2' onChange={handleChange} name="params" value={currentConfig.params} />
                                </div>
                            </div>
                        </div>
                        <div className="pb-20"></div>
                    </main>
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900">
                        <button className="w-full h-16 bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400 flex items-center justify-center gap-3 transition-all" onClick={makeApiCall}>
                            Send <IonIcon icon={send} />
                        </button>
                    </div>

                </div>

                <IonModal isOpen={isOpen}>
                    <IonContent className="ion-padding">
                        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
                            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
                                <div className="flex w-12 items-center">
                                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-slate-900 dark:text-slate-200 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0" onClick={() => setIsOpen(false)}>
                                        <IonIcon icon={close} className="text-3xl" />
                                    </button>
                                </div>
                                <h2 className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">API Response</h2>
                                <div className="flex w-12 items-center justify-end">
                                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-slate-900 dark:text-slate-200 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0" onClick={showSecurityNotice}>
                                        <IonIcon icon={shieldOutline} className="text-3xl" />
                                    </button>
                                </div>
                            </div>
                            <main className="flex flex-col">
                                <div className="px-4 pt-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        {isLoading ? (
                                            <Skeleton width={100} height={30} />
                                        ) : (
                                            <div className="flex flex-col gap-1 items-start">
                                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Status</p>
                                                <div className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${status.startsWith('2')
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                                    }`}>
                                                    <span className={`w-2 h-2 mr-2 rounded-full ${status.startsWith('2') ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></span>
                                                    {status}
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="px-4 pt-4 pb-2">
                                    <div className="bg-white dark:bg-slate-900/70 rounded-lg p-4 h-full overflow-auto border border-slate-200 dark:border-slate-800">
                                        {isLoading ? (
                                            <Skeleton count={10} />
                                        ) : (
                                            <p>{response}</p>
                                        )}
                                    </div>
                                </div>
                            </main>
                            <footer className="sticky bottom-0 bg-background-light dark:bg-background-dark w-full pt-2 pb-4">
                                <div className="px-4">
                                    <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 p-3 mb-4">
                                        <IonIcon icon={lockClosed} />
                                        <p className="text-slate-600 dark:text-slate-400 text-xs font-normal leading-normal text-center">Flux never uploads or shares anything.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex min-w-[84px] max-w-full flex-1 items-center justify-center gap-2 rounded-lg h-12 px-5 bg-blue-600 text-white text-base font-bold tracking-tight overflow-hidden" onClick={copyResponse}>
                                            <IonIcon icon={copyOutline} />
                                            <span className="truncate">Copy Response</span>
                                        </button>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={openOnboard}>
                    <IonContent className="ion-padding">
                        <div className="relative flex min-h-screen w-full flex-col font-display overflow-x-hidden">
                            <div className="flex items-center bg-white dark:bg-gray-900 p-4 pb-2 justify-start">
                                <div className="text-gray-800 dark:text-gray-200 flex items-center justify-center text-3xl">
                                    <IonIcon icon={rocketOutline} />
                                </div>
                                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight ml-2">
                                    Flux Companion
                                </h2>
                            </div>

                            <div className="flex flex-col p-4">
                                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight text-center pb-2">
                                    Welcome to Flux Companion
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-base text-center pb-8">
                                    Private, reliable, and easy API testing from your phone.
                                </p>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 min-h-[72px] rounded-xl shadow-sm">
                                        <div className="text-blue-500 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0 w-12 h-12">
                                            <IonIcon icon={lockClosed} className="text-3xl" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-gray-900 dark:text-white text-base font-medium">No Data Collection</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Flux Companion never collects, tracks, or stores any personal information. Everything stays on your device.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 min-h-[72px] rounded-xl shadow-sm">
                                        <div className="text-blue-500 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0 w-12 h-12">
                                            <IonIcon icon={codeSlashOutline} className="text-3xl" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-gray-900 dark:text-white text-base font-medium">APIs are Independent</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Your requests go directly to the API you choose. Flux Companion doesn’t monitor them and has no servers.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 min-h-[72px] rounded-xl shadow-sm">
                                        <div className="text-blue-500 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0 w-12 h-12">
                                            <IonIcon icon={globeOutline} className="text-3xl" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-gray-900 dark:text-white text-base font-medium">Built for Flux Users</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Designed to work seamlessly alongside the Flux App Inventor Extension for faster, smarter API development.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 pt-2">
                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        onClick={handleGetStarted}
                                        className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    )
}

export default Builder