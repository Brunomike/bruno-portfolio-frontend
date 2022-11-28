import NavigationDots from '../components/NavigationDots/NavigationDots';

interface Props {
    Component: JSX.Element;
    idName: string
    classNames: string
}

const AppWrapper = (Component: any, idName: string, classNames: string) => function HOC() {
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
