const publicKey =
  'BHbFY4Ta6Ju1J3AcjzSy6pbYSxInb9rogHSvXsQ3pGS4CJluYEC1sbkJhAdT3kZPx07mdQoLdDy3j5ZWgqN69kQ';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      if (!navigator.serviceWorker.controller) {
        const register = await navigator.serviceWorker.register('sw.js', {
          scope: '/',
        });

        await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });
      }
      const permission = await window.Notification.requestPermission();
      if (permission !== 'granted') {
        console.error('Permission not granted for Notification');
      }
    } catch (_) {}
  });
}
