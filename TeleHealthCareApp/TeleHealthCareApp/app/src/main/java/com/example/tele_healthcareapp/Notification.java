package com.example.tele_healthcareapp;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Notification extends BroadcastReceiver {



    @Override
    public void onReceive(Context context, Intent intent) {



        String Intent_Notification_ID = intent.getStringExtra("Intent_Notification_ID");

        String medicine_reminder_id = intent.getStringExtra("medicine_reminder_id");

        String medicine_description = intent.getStringExtra("medicine_description");

        String medicine_date_time = intent.getStringExtra("medicine_date_time");



        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);


        Intent intent1 = new Intent(context, Notification_Response.class);

        intent1.putExtra("Yes", "Yes");
        intent1.putExtra("medicine_reminder_id", medicine_reminder_id);
        intent1.putExtra("Intent_Notification_ID", Intent_Notification_ID);



        PendingIntent pendingIntent1 = PendingIntent.getBroadcast(context, 0, intent1, PendingIntent.FLAG_UPDATE_CURRENT);

        Intent intent2 = new Intent(context, Notification_Response.class);

        intent2.putExtra("No", "No");
        intent2.putExtra("medicine_reminder_id", medicine_reminder_id);
        intent2.putExtra("medicine_date_time", medicine_date_time);
        intent2.putExtra("medicine_description", medicine_description);
        intent2.putExtra("Intent_Notification_ID", Intent_Notification_ID);



        PendingIntent pendingIntent2 = PendingIntent.getBroadcast(context, 1, intent2, PendingIntent.FLAG_UPDATE_CURRENT);


        Intent intent4 = new Intent(context, Notification_Response.class);

        intent4.putExtra("Clear_Notification", "True");
        intent4.putExtra("medicine_reminder_id", medicine_reminder_id);
        intent4.putExtra("medicine_date_time", medicine_date_time);
        intent4.putExtra("medicine_description", medicine_description);
        intent4.putExtra("Intent_Notification_ID", Intent_Notification_ID);


        PendingIntent pendingIntent3 = PendingIntent.getBroadcast(context, 9, intent4, PendingIntent.FLAG_UPDATE_CURRENT);




        //Notification Constructor


        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "notifyLemubit")
                .setSmallIcon(R.drawable.notification_logo)
                .setColor(context.getResources().getColor(R.color.logo))
                .setContentTitle("Medicine Reminder")
                .setContentText(medicine_description)
                .setSound(soundUri)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .addAction(R.drawable.ic_launcher_foreground, "Yes", pendingIntent1)
                .addAction(R.drawable.ic_launcher_foreground, "No", pendingIntent2)
                .setAutoCancel(true)
                .setDeleteIntent(pendingIntent3);


        NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(context);

        notificationManagerCompat.notify(Integer.parseInt(Intent_Notification_ID), builder.build());



        Log.d("Localhost", "Notification built  + ID==> " + Intent_Notification_ID + " , " + String.valueOf(Calendar.getInstance().getTime()));




    }


}