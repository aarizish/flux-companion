import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { addOutline, build, buildOutline, bulbOutline, codeOutline, lockClosed, rocketOutline, timeOutline, trophyOutline } from 'ionicons/icons'
import React from 'react'

const Tips = () => {
    return (
        <IonPage>
            <IonContent>
                <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root">
                    <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md" style={{ height: 107 }}>
                        <div className="flex size-12 shrink-0 items-center justify-start">
                            <IonIcon icon={bulbOutline} className="text-3xl" />
                        </div>
                        <h1 className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-tight flex-1 text-center">Tips</h1>
                        <div className="flex w-auto items-center justify-end">
                            <div className="flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1.5">
                                <IonIcon icon={lockClosed} />
                                <p className="text-green-700 dark:text-green-300 text-sm font-bold leading-normal">Private</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/20 text-primary-darker dark:bg-primary/30 dark:text-primary-lighter p-3 mx-4 mt-4 rounded-lg text-sm text-center">
                        <p>This app is your personal API testing suite when you're away from your computer.</p>
                    </div>

                    <div className="flex flex-col p-4 gap-4">
                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={trophyOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">Flux Companion</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        This mobile app is your personal API testing suite when away from your PC. It complements the Flux App Inventor Extension and works with APIs from services like RapidAPI.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={addOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">Building Your First Request</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        Enter the API endpoint URL, select the request method (GET, POST), and optionally add headers or a JSON body.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={buildOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">Example: Calling an API</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        For example, using the Dictionary API from API Ninjas via RapidAPI:
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">
                                        <strong>Endpoint URL:</strong> <code>https://api.api-ninjas.com/v1/dictionary</code><br />
                                        <strong>Parameters:</strong> <code>word=dictionary</code><br />
                                        <strong>Headers (JSON):</strong> <code>{`{"x-rapidapi-host": "jokes-by-api-ninjas.p.rapidapi.com"}`}</code>
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-1">
                                        In Builder, configure the fields using your values similarly as demonstrated.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={codeOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">Sending &amp; Viewing Responses</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        Tap 'Send' to execute your request. You can inspect the response code, errors, response JSON, and body.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={timeOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">Managing History</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        Recent requests are automatically saved for quick re-testing. Tap a request to load it again. Clear history anytime from Settings.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 rounded-xl bg-white dark:bg-slate-900/70 shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <IonIcon icon={rocketOutline} className="text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-normal">You're Ready to Go</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                        This app is designed to complement the Flux App Inventor Extension and services like RapidAPI. Start building and testing your APIs on-the-go with full confidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Tips
