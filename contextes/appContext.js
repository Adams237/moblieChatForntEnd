import React, { createContext } from 'react';

const MyContext = createContext();

export default MyContext;



export const MyProvider = (props) => {
    const [globalState, setGlobalState] = React.useState({
      connecting: false, 
      connected: false, 
      step: 0,
      isDrawerScreen: true,
      initialScreen: {
        route: '', 
        component: null
      },
      vehicle: null
     });

    return (
      <MyContext.Provider value={{ globalState, setGlobalState }}>
        {props.children}
      </MyContext.Provider>
    );
  };