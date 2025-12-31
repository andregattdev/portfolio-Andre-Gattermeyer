const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const menuIcon = menuBtn.querySelector('i');

function toggleMenu() {
    const isOpened = mobileMenu.classList.contains('active');

    if (isOpened) {
        // Fechar
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        menuIcon.classList.replace('fa-times', 'fa-bars');
        menuIcon.style.transform = "rotate(0deg)";
    } else {
        // Abrir
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('active');
        }, 10);
        menuIcon.classList.replace('fa-bars', 'fa-times');
        menuIcon.style.transform = "rotate(90deg)";
    }
}

menuBtn.addEventListener('click', toggleMenu);

// Fecha o menu ao clicar nos links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

// Fecha se redimensionar a tela para Desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

//fotos

let currentImages = [];
let currentIndex = 0;

function openGallery(images) {
    currentImages = images;
    currentIndex = 0;
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Trava o scroll da página
    updateGalleryImage();
}

function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Destrava o scroll
}

function updateGalleryImage() {
    const imgElement = document.getElementById('gallery-img');
    imgElement.classList.remove('loaded');
    
    setTimeout(() => {
        imgElement.src = currentImages[currentIndex];
        imgElement.onload = () => imgElement.classList.add('loaded');
    }, 100);
}

function nextImg() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateGalleryImage();
}

function prevImg() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateGalleryImage();
}

// Fechar modal ao clicar na área escura
document.getElementById('gallery-modal').addEventListener('click', (e) => {
    if (e.target.id === 'gallery-modal') closeGallery();
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('gallery-modal');
    if (modal.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
});