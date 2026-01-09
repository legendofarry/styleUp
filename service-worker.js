// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "No payload";

  const options = {
    body: data,
    icon: "/icon-192x192.png", // You'll need to add this icon file
    badge: "/badge-72x72.png", // You'll need to add this badge file
    vibrate: [200, 100, 200, 100, 200],
    tag: "stylist-reminder",
    renotify: true,
    actions: [
      { action: "record", title: "📝 Record Now" },
      { action: "snooze", title: "⏰ Snooze 5 min" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Stylist Reminder", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "record") {
    // Focus on the app
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((windowClients) => {
          if (windowClients.length > 0) {
            return windowClients[0].focus();
          } else {
            return clients.openWindow("/");
          }
        })
    );
  } else if (event.action === "snooze") {
    // Handle snooze
    console.log("Snooze clicked");
  } else {
    // Notification body clicked
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((windowClients) => {
          if (windowClients.length > 0) {
            return windowClients[0].focus();
          } else {
            return clients.openWindow("/");
          }
        })
    );
  }
});
