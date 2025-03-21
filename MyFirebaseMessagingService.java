package com.example.myfirstapp;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import androidx.core.app.NotificationCompat;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String CHANNEL_ID = "your_channel_id"; // Define your channel ID here

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // Check if the message contains a notification payload
        if (remoteMessage.getNotification() != null) {
            // Get the title and body from the notification
            String title = remoteMessage.getNotification().getTitle(); // Get title
            String messageBody = remoteMessage.getNotification().getBody(); // Get body

            // Send notification with dynamic title and body
            sendNotification(title, messageBody);
        }
    }

    private void sendNotification(String title, String messageBody) {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        // Create a pending intent with FLAG_IMMUTABLE
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        // Create the notification with dynamic title and message body
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher) // Make sure you have this icon
                .setContentTitle(title) // Dynamic title from FCM
                .setContentText(messageBody) // Dynamic message body from FCM
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);

        // Get the NotificationManager and send the notification
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, notificationBuilder.build());
    }

}