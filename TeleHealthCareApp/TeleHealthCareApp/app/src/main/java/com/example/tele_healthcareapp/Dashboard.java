package com.example.tele_healthcareapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Dashboard extends AppCompatActivity implements View.OnClickListener {


    private long backPressedTime;
    private Toast backToast;


    Button Button_logout, Button_profile, Button_report, Button_appointment;

    ArrayList<PendingIntent> pendingIntentArrayList;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);


        Button_logout = findViewById(R.id.button_logout);
        Button_profile = findViewById(R.id.button_profile);

        Button_report = findViewById(R.id.button_report);
        Button_appointment = findViewById(R.id.button_appointment);


        Button_logout.setOnClickListener(this);
        Button_profile.setOnClickListener(this);

        Button_report.setOnClickListener(this);
        Button_appointment.setOnClickListener(this);


        pendingIntentArrayList = new ArrayList<PendingIntent>();


        AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);

        DateFormat DFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Calendar cal = Calendar.getInstance();

        Log.d("Localhost", "Current time ==> " + String.valueOf(Calendar.getInstance().getTime()));




        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "LemubitReminderChannel";
            String description = "Channel for Lemubit Reminder";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel("notifyLemubit", name, importance);
            channel.setDescription(description);


            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }




        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Medicine_Reminder, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {


                Log.d("Localhost", "Data For Medicine Reminder -> " + response);


                try {
                    JSONArray array = new JSONArray(response);

                    for (int j = 0; j < array.length(); j++) {

                        JSONObject jsonObject = array.getJSONObject(j);

                        String medicine_reminder_id  = jsonObject.getString("medicine_reminder_id");
                        String medicine_description = jsonObject.getString("medicine_description");
                        String medicine_date = jsonObject.getString("medicine_date");
                        String medicine_timings = jsonObject.getString("medicine_timings");


                        cal.setTime(DFormat.parse(medicine_date + " " + medicine_timings));

                        Intent intent = new Intent(Dashboard.this, Notification.class);

                        intent.putExtra("medicine_reminder_id", medicine_reminder_id);

                        intent.putExtra("medicine_description", medicine_description);

                        intent.putExtra("medicine_date_time", medicine_date + " " + medicine_timings);

                        intent.putExtra("Intent_Notification_ID", String.valueOf(j+1));

                        PendingIntent pendingIntent = PendingIntent.getBroadcast(Dashboard.this, j, intent, 0);

                        alarmManager.setExact(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + (cal.getTimeInMillis() - System.currentTimeMillis()), pendingIntent);

                        Log.d("Localhost", "Alarm set ==> " + String.valueOf( new Date(System.currentTimeMillis() + (cal.getTimeInMillis() - System.currentTimeMillis())) ));

                    }
                } catch (JSONException | ParseException exception) {
                    Log.d("Localhost", "Exception in Data For Medicine Reminder -> " + exception.toString());
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Localhost", "Error in Getting Data For Medicine Reminder -> " + error.toString());

            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> data = new HashMap<>();
                data.put("Email", Sign_In.chosen_email_address);

                return data;
            }
        };


        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        requestQueue.add(stringRequest);



    }


    @Override
    public void onClick(View v) {

        int id = v.getId();

        Intent intent;

        switch (id) {

            case R.id.button_logout:
                intent = new Intent(Dashboard.this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.button_profile:
                intent = new Intent(Dashboard.this, Profile.class);

//                Sign_In.chosen_email_address = "usman.ali@gmail.com";


                StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Get_Profile_info, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {


                        Log.d("Localhost", "Getting Profile Info -> Achieved");

                        try {
                            JSONArray array = new JSONArray(response);

                            for (int j = 0; j < array.length(); j++) {

                                JSONObject jsonObject = array.getJSONObject(j);

                                String name = jsonObject.getString("patient_name");
                                String age = jsonObject.getString("patient_age");
                                String address = jsonObject.getString("patient_address");
                                String gender = jsonObject.getString("patient_gender");
                                String password = jsonObject.getString("password");

                                intent.putExtra("name", name);
                                intent.putExtra("age", age);
                                intent.putExtra("address", address);
                                intent.putExtra("gender", gender);
                                intent.putExtra("password", password);

                                startActivity(intent);
                                Dashboard.super.finish();

                            }
                        } catch (JSONException exception) {
                            Log.d("Localhost", "Exception in Profile Info -> " + exception.toString());
                        }

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Localhost", "Error in Getting Profile Info -> " + error.toString());

                    }
                }) {
                    @Override
                    protected Map<String, String> getParams() {
                        Map<String, String> data = new HashMap<>();
                        data.put("Email", Sign_In.chosen_email_address);
                        return data;
                    }
                };


                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                requestQueue.add(stringRequest);

                break;





            case R.id.button_report:
                intent = new Intent(Dashboard.this, Report.class);
                startActivity(intent);
                super.finish();
                break;



            case R.id.button_appointment:
                intent = new Intent(Dashboard.this, Appointment.class);
                startActivity(intent);
                super.finish();
                break;

        }

    }





    @Override
    public void onBackPressed() {

        if(backPressedTime + 2000 > System.currentTimeMillis()){
            backToast.cancel();
            super.onBackPressed();
            super.onDestroy();

        }
        else{
            backToast = Toast.makeText(Dashboard.this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }


}