document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('pk_test_51OmftCSC8mBMbdfER8mUkBDBmFqtyOI07hcKQ8zTazy0qAkLby0uPHH3v4j8hdqkpJIGFIBQj3kc42Lw96GlRvG0001aahE9RZ');
    const cart = [];
    const addToCartButtons = document.querySelectorAll('.medicine button');
    const checkoutButton = document.getElementById('checkout-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const medicine = button.parentNode;
            const name = medicine.querySelector('h2').textContent;
            const price = parseFloat(medicine.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', ''));
            const quantity = parseInt(medicine.querySelector('input[type="number"]').value);
            const newItem = {
                name: name,
                price: price,
                quantity: quantity
            };
            cart.push(newItem);
            updateCartDisplay();
        });
    });
    function updateCartDisplay() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsElement.appendChild(li);
        });
    }
    checkoutButton.addEventListener('click', async () => {
        try {
            const session = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: cart })
            }).then(res => res.json());
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            if (result.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
