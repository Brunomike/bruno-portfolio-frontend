import React from 'react';
import  NavigationDots  from '../components/NavigationDots/NavigationDots';

const AppWrapper = (Component, idName, classNames) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames} app__section`}>
            <div className={`app__wrapper app__flex`}>
                <Component />
            </div>
            <NavigationDots active={idName} />
        </div>
    )
};

export default AppWrapper;
