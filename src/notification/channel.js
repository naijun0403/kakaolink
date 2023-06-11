exports.createNotificationChannel = function () {
    if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        const channel = new android.app.NotificationChannel(
            CHANNEL_ID,
            CHANNEL_NAME,
            android.app.NotificationManager.IMPORTANCE_DEFAULT
        );
        channel.setDescription(CHANNEL_DESCRIPTION);
        channel.setShowBadge(false);
        channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
        const notificationManager = context.getSystemService(android.app.NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    }
}