package com.example.tele_healthcareapp;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;
import android.util.Log;

import androidx.core.app.NotificationManagerCompat;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Notification_Response extends BroadcastReceiver {


    String Response;



    @Override
    public void onReceive(Context context, Intent intent) {



        String no = intent.getStringExtra("No");

        String yes = intent.getStringExtra("Yes");

        String Clear_Notification = intent.getStringExtra("Clear_Notification");



        String Notification_ID = intent.getStringExtra("Intent_Notification_ID");

        String medicine_reminder_id = intent.getStringExtra("medicine_reminder_id");

        String medicine_date_time = intent.getStringExtra("medicine_date_time");

        String medicine_description = intent.getStringExtra("medicine_description");


//        Log.d("Localhost", "Clear --> " + Clear_Notification);


        DateFormat DFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Calendar cal = Calendar.getInstance();



        if(yes!=null) {
            if (yes.equals("Yes")) {
                Log.d("Localhost", "Response ==> yes");

                Response = yes;

                NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(context);

                notificationManagerCompat.cancel(Integer.parseInt(Notification_ID));

            }
        }




        if(no!=null){

            if(no.equals("No")){

                Log.d("Localhost", "Response ==> No");

                Response = "No";


                try {
                    cal.setTime(DFormat.parse(medicine_date_time));
                } catch (ParseException e) {
                    e.printStackTrace();
                }


                Log.d("Localhost", "Comparison ==> " + String.valueOf(new Date(cal.getTimeInMillis() + (60000 * 30))));


                if((cal.getTimeInMillis() + (60000 * 30)) > System.currentTimeMillis()){


                    Log.d("Localhost", "ID ==> " + Notification_ID );

                    Intent intent1 = new Intent(context, Notification.class);

                    intent1.putExtra("medicine_reminder_id", medicine_reminder_id);

                    intent1.putExtra("medicine_date_time", medicine_date_time);

                    intent1.putExtra("medicine_description", medicine_description);

                    intent1.putExtra("Intent_Notification_ID", Notification_ID);




                    PendingIntent pendingIntent5 = PendingIntent.getBroadcast(context, 5, intent1, 0);

                    AlarmManager alarmManager = (AlarmManager) context.getSystemService(context.ALARM_SERVICE);

                    alarmManager.setExact(AlarmManager.RTC_WAKEUP, Calendar.getInstance().getTimeInMillis() + (60000 * 10), pendingIntent5);


                    Log.d("Localhost", "New current time ==> " + String.valueOf(Calendar.getInstance().getTime()));

                    Log.d("Localhost", "Alarm snooze ==> " + String.valueOf(new Date(Calendar.getInstance().getTimeInMillis() + (60000 * 10))));


                }

                NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(context);

                notificationManagerCompat.cancel(Integer.parseInt(Notification_ID));

            }
        }



        if(Clear_Notification != null){

            if(Clear_Notification.equals("True")){

                Log.d("Localhost", "Response ==> No");

                Response = "Have not taken";


                try {
                    cal.setTime(DFormat.parse(medicine_date_time));
                } catch (ParseException e) {
                    e.printStackTrace();
                }


                Log.d("Localhost", "Comparison ==> " + String.valueOf(new Date(cal.getTimeInMillis() + (60000 * 30))));


                if((cal.getTimeInMillis() + (60000 * 30)) > System.currentTimeMillis()){


                    Log.d("Localhost", "ID ==> " + Notification_ID );

                    Intent intent1 = new Intent(context, Notification.class);

                    intent1.putExtra("medicine_reminder_id", medicine_reminder_id);

                    intent1.putExtra("medicine_date_time", medicine_date_time);

                    intent1.putExtra("medicine_description", medicine_description);

                    intent1.putExtra("Intent_Notification_ID", Notification_ID);




                    PendingIntent pendingIntent5 = PendingIntent.getBroadcast(context, 5, intent1, 0);

                    AlarmManager alarmManager = (AlarmManager) context.getSystemService(context.ALARM_SERVICE);

                    alarmManager.setExact(AlarmManager.RTC_WAKEUP, Calendar.getInstance().getTimeInMillis() + (60000 * 10), pendingIntent5);


                    Log.d("Localhost", "New current time ==> " + String.valueOf(Calendar.getInstance().getTime()));

                    Log.d("Localhost", "Alarm snooze ==> " + String.valueOf(new Date(Calendar.getInstance().getTimeInMillis() + (60000 * 10))));


                }

                NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(context);

                notificationManagerCompat.cancel(Integer.parseInt(Notification_ID));




            }
        }




        if(yes!=null || no!=null || Clear_Notification != null){



            StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Medicine_Response, response -> {

                Log.d("Localhost", "Response Time -> " + String.valueOf(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()));

                Log.d("Localhost", "Medicine Response -> " + response);


            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.d("Localhost", "Medicine Response -> " + error.toString());
                }
            }) {
                @Override
                protected Map<String, String> getParams() throws AuthFailureError {
                    Map<String, String> data = new HashMap<>();
                    data.put("Response", Response);
                    data.put("medicine_reminder_id", medicine_reminder_id);
                    data.put("medicine_response_time", String.valueOf(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()));

                    return data;
                }
            };



            RequestQueue requestQueue = Volley.newRequestQueue(context);
            requestQueue.add(stringRequest);

        }


    }


}
