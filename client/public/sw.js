self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    icon: '/android-chrome-192x192.png',
    body: 'Notified by Kormer Khoj',
    image: 'https://kormerkhoj.com/api/public/images/' + data.img,
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://kormerkhoj.com/post/' + event.data.json()._id)
  );
});
