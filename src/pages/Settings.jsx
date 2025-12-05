import { IonContent, IonPage, IonIcon, useIonToast } from '@ionic/react'
import { lockClosed, chevronForward, cog, trash, fileTrayStacked, warning, shieldOutline, earth, hammerOutline, starOutline, logoGithub } from 'ionicons/icons'
import React from 'react'
import { Browser } from '@capacitor/browser';

const Settings = () => {

    const [presentToast] = useIonToast()

    const clearHistory = () => {
        localStorage.removeItem('history')
        presentToast({ message: 'History wiped clean.', duration: 1500 })
    }

    const openPrivacyPolicy = async () => {
        await Browser.open({ url: 'https://flux.aarizish.in/privacy' });
    };

    const openFlux = async () => {
        await Browser.open({ url: 'https://flux.aarizish.in/' });
    };

    const openRepo = async () => {
        await Browser.open({ url: 'https://github.com/aarizish/flux-companion' });
    };

    const rateApp = async () => {
        await Browser.open({ url: 'https://play.google.com/store/apps/details?id=in.aarizish.fluxcompanion' });
    };

    return (
        <IonPage>
            <IonContent>
                <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root">
                    <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md" style={{ height: 107 }}>
                        <div className="flex size-12 shrink-0 items-center justify-start">
                            <IonIcon icon={cog} className="text-3xl" />
                        </div>
                        <h1 className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-tight flex-1 text-center">Settings</h1>
                        <div className="flex w-auto items-center justify-end">
                            <div className="flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1.5">
                                <IonIcon icon={lockClosed} />
                                <p className="text-green-700 dark:text-green-300 text-sm font-bold leading-normal">Private</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 space-y-8 pb-8">
                        <div className="flex flex-col">
                            <h3 className="text-[#8A8A8E] dark:text-gray-400 text-sm font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 uppercase">GENERAL</h3>
                            <div className="bg-white dark:bg-[#1C2A38] rounded-xl shadow-sm overflow-hidden">
                                <div className="flex items-center gap-4 bg-inherit px-4 justify-between" onClick={clearHistory}>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10">
                                            <IonIcon icon={trash} />
                                        </div>
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal flex-1 truncate">Clear History</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-[#8A8A8E] dark:text-gray-400 flex size-7 items-center justify-center"><IonIcon icon={chevronForward} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[#8A8A8E] dark:text-gray-400 text-sm font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 uppercase">PRIVACY &amp; SECURITY</h3>
                            <div className="bg-white dark:bg-[#1C2A38] rounded-xl shadow-sm overflow-hidden">
                                <div className="flex items-start gap-4 bg-inherit px-4 py-3 justify-between border-b border-gray-200 dark:border-gray-700">
                                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10 mt-1">
                                        <IonIcon icon={fileTrayStacked} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal">No Data Collection</p>
                                        <p className="text-[#8A8A8E] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Not even Aarizish, can read, collect, track or share any personal information or usage data.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-inherit px-4 py-3 justify-between border-b border-gray-200 dark:border-gray-700">
                                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10 mt-1">
                                        <IonIcon icon={warning} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal">APIs are Independent</p>
                                        <p className="text-[#8A8A8E] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Data sent to APIs is handled by the API itself. Flux Companion is open source.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-inherit px-4 justify-between">
                                    <div className="flex items-center gap-4" onClick={openPrivacyPolicy}>
                                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10">
                                            <IonIcon icon={shieldOutline} />
                                        </div>
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal flex-1 truncate">Privacy Policy</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-[#8A8A8E] dark:text-gray-400 flex size-7 items-center justify-center"><IonIcon icon={chevronForward} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[#8A8A8E] dark:text-gray-400 text-sm font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 uppercase">ABOUT</h3>
                            <div className="bg-white dark:bg-[#1C2A38] rounded-xl shadow-sm overflow-hidden">
                                <div className="flex items-center gap-4 bg-inherit px-4 justify-between border-b border-gray-200 dark:border-gray-700" onClick={openFlux}>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10">
                                            <IonIcon icon={earth} />
                                        </div>
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal flex-1 truncate">Flux App Inventor Extension</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-[#8A8A8E] dark:text-gray-400 flex size-7 items-center justify-center"><IonIcon icon={chevronForward} /></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-inherit px-4 justify-between border-b border-gray-200 dark:border-gray-700" onClick={openRepo}>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10">
                                            <IonIcon icon={logoGithub} />
                                        </div>
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal flex-1 truncate">Repository</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-[#8A8A8E] dark:text-gray-400 flex size-7 items-center justify-center"><IonIcon icon={chevronForward} /></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-inherit px-4 justify-between" onClick={rateApp}>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-10">
                                            <IonIcon icon={starOutline} />
                                        </div>
                                        <p className="text-[#0d141b] dark:text-white text-base font-normal leading-normal flex-1 truncate">Rate this App</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-[#8A8A8E] dark:text-gray-400 flex size-7 items-center justify-center"><IonIcon icon={chevronForward} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-xs text-[#8A8A8E] dark:text-gray-500">Flux Companion - v1.0.0</p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings