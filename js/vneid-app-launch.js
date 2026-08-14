/*
 * VNeID launcher: no unverified VNeID URL scheme or deep link is used.
 * Android package com.vnid is verified from the official Google Play listing.
 */
(function () {
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vnid';
    const APP_STORE_URL = 'https://apps.apple.com/vn/app/vneid/id1582750372';
    const ANDROID_INTENT = 'intent://#Intent;package=com.vnid;end';

    function setStatus(button, message) {
        const scope = button.closest('.vneid-promo, .dvc-container') || document;
        const status = scope.querySelector('[data-vneid-launch-status]');
        if (status) status.textContent = message;
    }

    function openVneid(button) {
        const userAgent = navigator.userAgent || '';
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

        if (isIOS) {
            setStatus(button, 'Đang mở trang VNeID chính thức trên App Store.');
            window.location.assign(APP_STORE_URL);
            return;
        }

        if (!isAndroid) {
            setStatus(button, 'Vui lòng mở trang này bằng điện thoại để sử dụng VNeID.');
            return;
        }

        setStatus(button, 'Đang thử mở VNeID. Nếu ứng dụng chưa cài đặt, Google Play sẽ được mở.');
        let fallbackTimer = window.setTimeout(() => {
            window.location.assign(PLAY_STORE_URL);
        }, 1200);

        const cancelFallback = () => {
            if (document.visibilityState === 'hidden') {
                window.clearTimeout(fallbackTimer);
                fallbackTimer = null;
                document.removeEventListener('visibilitychange', cancelFallback);
            }
        };
        document.addEventListener('visibilitychange', cancelFallback);
        window.location.href = ANDROID_INTENT;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-vneid-launch]').forEach((button) => {
            button.addEventListener('click', () => openVneid(button));
        });
    });
}());
