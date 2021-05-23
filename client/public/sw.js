self.addEventListener('push', (e) => {
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    icon: '/android-chrome-192x192.png',
    body: 'Notified by Kormer Khoj',
    image: data.img,
    data: {
      _id: data._id,
    },
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(
      'https://kormerkhoj.com/post/' + event.notification.data._id
    )
  );
});
