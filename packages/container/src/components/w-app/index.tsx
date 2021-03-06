// We have to provide a Promise polyfill if we're targeting older browsers
// because import() returns a promise which resolves once the module is loaded
import "reflect-metadata";
import { WContainer } from "@wface/container";
import * as React from 'react';
import { getStore, AppContextActions, UserContextActions, UserContext, AppContext } from '@wface/store';
import IOC, { IAuthService, IConfiguration, AuthServiceWrapper, IHttpService, HttpServiceWrapper, ISearchProvider, IMenuTreeItem } from '@wface/ioc';
import DefaultHttpService from './default-http-service';
import WLoginPage from '../w-login-page';
import { Provider } from 'react-redux';
import IAppHooks from '@wface/ioc/src/interfaces/i-app-hooks';
import MenuSearchProvider from '../w-main-page/menu-search-provider';


class WApp extends React.Component<{ configuration: IConfiguration }, { configuration: IConfiguration }> {
  store: any;

  constructor(props) {
    super(props);

    const configuration = this.getConfig(props);
    this.store = getStore(configuration.useLocalStorage);
    this.store.dispatch(AppContextActions.setConfig(configuration));
    this.buildIOC(configuration);

    this.state = {
      configuration: configuration
    }
  }

  componentDidMount() {
    if(IOC.isBound("IAppHooks")) {
      const hooks = IOC.get<IAppHooks>("IAppHooks");
      hooks.onAppMount && hooks.onAppMount();
    }
  }

  componentWillUnmount() {
    if(IOC.isBound("IAppHooks")) {
      const hooks = IOC.get<IAppHooks>("IAppHooks");
      hooks.onAppUnmount && hooks.onAppUnmount();
    }
  }

  buildIOC = (configuration: IConfiguration) => {

    // Bind login function
    const onLogin = (username: string, displayName: string, token?: string) => this.store.dispatch(UserContextActions.login({ username, displayName, token }));
    !IOC.isBound("onLogin") &&
      IOC.bind("onLogin").toFunction(onLogin); 

    // Bind logout function
    const logout = () => this.store.dispatch(UserContextActions.logout());
    !IOC.isBound("logout") &&
      IOC.bind("logout").toFunction(logout);

    // Bind openScreen function
    const openScreen = (menuTreeItem: IMenuTreeItem) => this.store.dispatch(AppContextActions.openScreen({menuTreeItem}));
    !IOC.isBound("openScreen") &&
      IOC.bind("openScreen").toFunction(openScreen);

    // Bind contextes
    !IOC.isBound("UserContext") &&
      IOC.bind<UserContext>("UserContext").toFactory(() => this.store.getState().userContext);
    !IOC.isBound("AppContext") &&
      IOC.bind<AppContext>("AppContext").toFactory(() => this.store.getState().appContext);

    // Bind auth service
    !IOC.isBound("IAuthServiceInner") &&
      IOC.bind<IAuthService>("IAuthServiceInner").to(configuration.authService);
    !IOC.isBound("IAuthService") &&
      IOC.bind<IAuthService>("IAuthService").to(AuthServiceWrapper);

    // Bind http service
    !IOC.isBound("IHttpServiceInner") &&
      IOC.bind<IHttpService>("IHttpServiceInner").to(configuration.httpService || DefaultHttpService);
    !IOC.isBound("IHttpService") &&
      IOC.bind<IHttpService>("IHttpService").to(HttpServiceWrapper);

    // Bind hooks 
    configuration.hooks &&
    !IOC.isBound("IAppHooks") &&
      IOC.bind<IAppHooks>("IAppHooks").to(configuration.hooks);

    // Bind search provider
    if(configuration.search && !IOC.isBound("ISearchProvider")) {
      if(configuration.search === true) {

        IOC.bind<ISearchProvider>("ISearchProvider").to(MenuSearchProvider);  
      }
      else {
        IOC.bind<ISearchProvider>("ISearchProvider").to(configuration.search);  
      }
    }     
      
  }

  getConfig(props: { configuration: IConfiguration }): IConfiguration {
    let config = { ...props.configuration };
    config.loginScreen = props.configuration.loginScreen || WLoginPage;
    return config;
  }

  public render() {

    return (
      <Provider store={this.store}>
        <WContainer />
      </Provider>
    );
  }
}

export default WApp