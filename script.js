document.addEventListener("DOMContentLoaded", () => {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const btnOkay = document.getElementById('btnOkay');
    const btnContainer = document.getElementById('btnContainer');
    const successMessage = document.getElementById('successMessage');
    const questionText = document.getElementById('questionText');

    let yesScale = 1;
    let noScale = 1;

    // The runaway "No" button logic
    const dodgeButton = (e) => {
        e.preventDefault(); // Stops mobile tap from registering as a click
        
        // Make the Yes button bigger and more tempting
        yesScale += 0.3;
        btnYes.style.transform = `scale(${yesScale})`;

        // Shrink the No button
        noScale -= 0.15;
        if (noScale < 0) noScale = 0; 

        // Calculate random screen position
        const maxX = window.innerWidth - btnNo.offsetWidth - 20;
        const maxY = window.innerHeight - btnNo.offsetHeight - 20;
        
        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));
        
        // Move it
        btnNo.style.position = 'fixed';
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
        btnNo.style.transform = `scale(${noScale})`;
    };

    // Works for both PC mouse hover and mobile tap
    btnNo.addEventListener('mouseover', dodgeButton);
    btnNo.addEventListener('touchstart', dodgeButton);

    // Forgiveness Logic
    const acceptApology = () => {
        btnContainer.classList.add('hidden');
        questionText.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Confetti hearts
        for(let i = 0; i < 20; i++) {
            spawnHeart();
        }
    };

    btnYes.addEventListener('click', acceptApology);
    btnOkay.addEventListener('click', acceptApology);

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '✨💖✨'; 
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 2.5s ease-out';
        heart.style.zIndex = 9999;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '-10vh';
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
});