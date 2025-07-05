import { PropsWithChildren, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import Portals from '../../components/Portals';
import { IRootState } from '../../store';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    

 

    return (
        <App>
            <div className="relative">
                <div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
                    <Sidebar />
                    <div className="main-content flex flex-col min-h-screen">
                        <Header />
                        <Suspense>
                            <div className={`${themeConfig.animation} p-6 animate__animated`}>{children}</div>
                        </Suspense>
                        <Footer />
                        <Portals />
                    </div>
                </div>
            </div>
        </App>
    );
};

export default DefaultLayout;
