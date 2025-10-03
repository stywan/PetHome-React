import { useState } from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import { CartOffcanvas } from '../organisms/CartOffcanvas';

export function MainTemplate({ children }) {
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <Navbar onCartToggle={() => setShowCart(true)} />
            <main>{children}</main>
            <Footer />
            <CartOffcanvas show={showCart} onHide={() => setShowCart(false)} />
        </>
    );
}