import Navbar from "../Navigation/explore";

const Layout = (props) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="flex felx-col justify-center items-center p-10">
                {props.children}
            </main> 
        </>
    );
};

export default Layout;