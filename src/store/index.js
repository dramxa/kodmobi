import { createStore } from 'vuex'

import AuthModule from './modules/Auth'
import ProjectsModule from './modules/Projects'
import NotificationModule from './modules/Notification'
import BillingModule from './modules/Billing'
import SettingModule from './modules/Setting'
import ChannelsModule from './modules/Channels'
import ProfileModule from './modules/Profile'
import BalanceModule from './modules/Balance'
import SendCodeModule from './modules/SendCode'
// import HistoryModule from './modules/History'
import LoadingModule from './modules/Loading'

export default createStore({
  strict: true,
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    AuthModule,
    ProjectsModule,
    NotificationModule,
    BillingModule,
    SettingModule,
    ChannelsModule,
    ProfileModule,
    BalanceModule,
    SendCodeModule,
    // HistoryModule,
    LoadingModule
  }
})
