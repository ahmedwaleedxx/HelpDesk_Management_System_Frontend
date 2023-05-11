import { Footer } from "flowbite-react";


const footer = () => {
    const year = new Date().getFullYear();
    return (
        <Footer container={false} className="bg-slate-400 footer-container">
            <Footer.Copyright 
            href="#"
            by="Group 8" 
            year={year}
            className="footer-text"/>
        </Footer>
    );
};

export default footer;