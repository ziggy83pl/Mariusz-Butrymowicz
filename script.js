/**
 * Wizytówka Mariusz Butrymowicz - Skrypt interakcji
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Dynamiczny rok w stopce
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Kopiowanie numeru telefonu z powiadomieniem Toast
    const copyBtns = document.querySelectorAll('.copy-phone-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const phone = this.getAttribute('data-phone') || '799012391';
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(phone).then(() => {
                    showToast('Skopiowano numer: 799 012 391');
                }).catch(() => {
                    fallbackCopy(phone);
                });
            } else {
                fallbackCopy(phone);
            }
        });
    });

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast('Skopiowano numer: 799 012 391');
        } catch (err) {
            showToast('Numer: 799 012 391');
        }
        document.body.removeChild(tempInput);
    }

    // 3. Galeria - Podgląd w powiększeniu (Lightbox Modal)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeModal = document.getElementById('closeModal');
    const backdrop = document.querySelector('.lightbox-backdrop');

    function openModal(src, alt) {
        if (!modal || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Zdjęcie realizacji';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const src = this.getAttribute('data-src') || this.querySelector('img').src;
            const alt = this.querySelector('img')?.alt || '';
            openModal(src, alt);
        });
    });

    if (closeModal) closeModal.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeLightbox();
        }
    });

    // 4. Efekt wibracji przy kliknięciu "Zadzwoń" na telefonie (haptic feedback)
    const callButtons = document.querySelectorAll('a[href^="tel:"]');
    callButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if ("vibrate" in navigator) {
                try { navigator.vibrate(40); } catch(e){}
            }
        });
    });
});
