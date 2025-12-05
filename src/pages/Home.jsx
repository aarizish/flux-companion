import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import Builder from './Builder';
import { buildOutline, saveOutline, timeOutline, cog, bulbOutline } from 'ionicons/icons'
import History from './History';
import Settings from './Settings';
import Tips from './Tips';

const Home = () => {
  return (
    <IonTabs>

      <IonTabBar slot='bottom'>
        <IonTabButton tab='search' href='/home/builder'>
          <IonIcon icon={buildOutline} />
          <IonLabel>Builder</IonLabel>
        </IonTabButton>
        <IonTabButton tab='bookmark' href='/home/tips'>
          <IonIcon icon={bulbOutline} />
          <IonLabel>Tips</IonLabel>
        </IonTabButton>
        <IonTabButton tab='history' href='/home/history'>
          <IonIcon icon={timeOutline} />
          <IonLabel>History</IonLabel>
        </IonTabButton>
        <IonTabButton tab='settings' href='/home/settings'>
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path='/home/builder' component={Builder} />
        <Route path='/home/history' component={History} />
        <Route path='/home/settings' component={Settings} />
        <Route path='/home/tips' component={Tips} />
        <Route exact path='/home'>
          <Redirect to='/home/builder' />
        </Route>
      </IonRouterOutlet>

    </IonTabs>
  );
};

export default Home;
