self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    icon: '/android-chrome-192x192.png',
    body: 'Notified by Kormer Khoj',
    image: data.img,
    click_action: 'http://google.com',
  });
});

// self.addEventListener('notificationclick', function (event) {
//   const data = event.data.json();
//   let url = 'https://kormerkhoj.com/post/' + data._id;
//   event.notification.close();
//   event.waitUntil(
//     clients.matchAll({ type: 'window' }).then((windowClients) => {
//       for (var i = 0; i < windowClients.length; i++) {
//         var client = windowClients[i];
//         if (client.url === url && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(url);
//       }
//     })
//   );
// });
