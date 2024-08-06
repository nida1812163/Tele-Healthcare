package com.example.tele_healthcareapp;

import androidx.activity.result.ActivityResultLauncher;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NetworkError;
import com.android.volley.NoConnectionError;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.ServerError;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.navigation.NavigationView;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Appointment extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, AppointmentClickListener  {


    private long backPressedTime;
    private Toast backToast;


    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;

    private static RecyclerView recycler_view;

    private static ArrayList<Appointment_Model> appointment_models_array = new ArrayList<>();

    private static RecyclerView.LayoutManager layoutManager;

    private static Appointment_Adapter adapter;

    TextView menu_header_name, menu_head_email;






    // AlertDialog
    private Spinner time_spinner, doctor_spinner, designation_spinner;

    List<String> time_list, doctor_list, designation_list;

    ArrayAdapter Time_Array_Adapter, Doctor_Array_Adapter, Designation_Array_Adapter;

    String selected_time, selected_doctor, selected_designation, selected_doctor_id;

    static int chosen_day, chosen_month, chosen_year;

    TextView display_date;

    TextInputLayout time_spinner_layout, doctor_spinner_layout, designation_spinner_layout, display_date_layout;


    private Button Request_Button;

    DatePickerDialog datePickerDialog;


    String[][] doctor_designation_array, new_array;

    int array_length;






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appointment);


        drawerLayout = findViewById(R.id.drawerlayout);

        navigationView = findViewById(R.id.navigation_view);

        toolbar = findViewById(R.id.toolbar);

        setSupportActionBar(toolbar);
        this.setTitle("");


        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.navigation_open, R.string.navigation_close);

        drawerLayout.addDrawerListener(toggle);

        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(this);


        String Intent_data_name = getIntent().getStringExtra("name");


        menu_header_name = findViewById(R.id.name22);
        menu_head_email = findViewById(R.id.email22);


        menu_header_name.setText(Intent_data_name);
        menu_head_email.setText(Sign_In.chosen_email_address);


        recycler_view = findViewById(R.id.recycle_view);

        layoutManager = new LinearLayoutManager(this);

        recycler_view.setLayoutManager(layoutManager);

        recycler_view.setHasFixedSize(true);

        adapter = new Appointment_Adapter(this, appointment_models_array, this);

        recycler_view.setAdapter(adapter);


        Appointment_Data(getApplicationContext());


    }


    public void Appointment_Data(Context context) {


        appointment_models_array.clear();


        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Get_Appointment_Info, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {


                Log.d("Localhost", "Getting Appointment Info -> Achieved");

                try {
                    JSONArray array = new JSONArray(response);


                    for (int j = 0; j < array.length(); j++) {

                        JSONObject jsonObject = array.getJSONObject(j);

                        String appointment_id = jsonObject.getString("appointment_id");
                        String date = jsonObject.getString("appointment_date");
                        String appointment_time = jsonObject.getString("appointment_time");
                        String doctor_name = jsonObject.getString("name");
                        String role = "doctor";


                        appointment_models_array.add(new Appointment_Model(appointment_id, date.substring(8, 10), date.substring(5, 7), doctor_name, appointment_time.substring(0, 5), role));


                    }


                    adapter.notifyDataSetChanged();

                } catch (JSONException exception) {
                    Log.d("Localhost", "Exception in Appointment Info -> " + exception.toString());
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Localhost", "Error in Getting Appointment Info -> " + error.toString());
            }


        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> data = new HashMap<>();
                data.put("Email", Sign_In.chosen_email_address);
                return data;
            }
        };


        RequestQueue requestQueue = Volley.newRequestQueue(context);
        requestQueue.add(stringRequest);


    }





    public void Cancel_Appointment(Context context){


        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Appointment_Cancel, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {


                Log.d("Localhost", "Appointment Cancelled -> " + response);

                if(response.trim().equals("Cancelled")){
                    Appointment_Data(context);
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Localhost", "Error in Appointment Cancelled -> " + error.toString());
            }


        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> data = new HashMap<>();
                data.put("appointment_id", Appointment_Adapter.ID);
                return data;
            }
        };


        RequestQueue requestQueue = Volley.newRequestQueue(context);
        requestQueue.add(stringRequest);


    }






    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.toolbar_menu, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        if (item.getItemId() == R.id.Request_Appointment) {

            AlertDialog.Builder builder = new AlertDialog.Builder(Appointment.this);

            LayoutInflater layoutInflater = Appointment.this.getLayoutInflater();

            View view = layoutInflater.inflate(R.layout.request_appointment, null);

            builder.setView(view)
                    .setTitle("Request An Appointment")
                    .setPositiveButton("Request", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {




                        }
                    })
                    .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {

//                            selected_designation = null;
//                            designation_spinner_layout.setError("");
//                            designation_spinner.setBackgroundResource(R.drawable.white_background_valid);
//
//
//                            selected_doctor = null;
//                            doctor_spinner_layout.setError("");
//                            doctor_spinner.setBackgroundResource(R.drawable.white_background_valid);
//
//
//                            selected_time = null;
//                            time_spinner_layout.setError("");
//                            time_spinner.setBackgroundResource(R.drawable.white_background_valid);
//
//
//                            display_date.setText("");
//                            display_date_layout.setError("");
//                            display_date.setBackgroundResource(R.drawable.white_background_valid);

                            dialogInterface.dismiss();
                        }
                    });





            time_spinner = view.findViewById(R.id.time_spinner);
            doctor_spinner = view.findViewById(R.id.doctor_spinner);
            designation_spinner = view.findViewById(R.id.designation_spinner);


            time_spinner_layout = view.findViewById(R.id.time_spinner1);
            doctor_spinner_layout = view.findViewById(R.id.doctor_spinner1);
            designation_spinner_layout = view.findViewById(R.id.designation_spinner1);
            display_date_layout = view.findViewById(R.id.date1);



            display_date = view.findViewById(R.id.date);

            Request_Button = view.findViewById(R.id.request_button);


            Request_Button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Calendar calendar = Calendar.getInstance();

                    int year = calendar.get(Calendar.YEAR);
                    int month = calendar.get(Calendar.MONTH);
                    int day = calendar.get(Calendar.DAY_OF_MONTH);


                    DatePickerDialog.OnDateSetListener dateSetListener = new DatePickerDialog.OnDateSetListener() {
                        @Override
                        public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                            month = month + 1;

                            chosen_day = day;

                            chosen_month = month;

                            chosen_year = year;

                            display_date.setText(year + "-" + month + "-" + day);

                        }
                    };


                    datePickerDialog = new DatePickerDialog(Appointment.this, dateSetListener, year, month, day);

                    datePickerDialog.getDatePicker().setMinDate(calendar.getTimeInMillis());

                    datePickerDialog.show();

                }
            });


            StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Get_Book_Appointment_Info, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {

                    Log.d("Localhost", "Doctor's Info -> Acheived");


                    try {
                        JSONArray array = new JSONArray(response);

                        array_length = array.length();

                        doctor_designation_array = new String[array.length()][4];

                        designation_list = new ArrayList<>();

                        designation_list.add("Please select the doctor's designation");


                        for (int j = 0; j < array.length(); j++) {

                            JSONObject jsonObject = array.getJSONObject(j);

                            String designation = jsonObject.getString("designation");
                            String doctor_name = jsonObject.getString("name");
                            String doctor_id = jsonObject.getString("doctor_id");


                            designation_list.add(designation);


                            doctor_designation_array[j][0] = designation;

                            doctor_designation_array[j][1] = doctor_name;

                            doctor_designation_array[j][2] = doctor_id;


                        }


                        Designation_Array_Adapter = new ArrayAdapter(Appointment.this, R.layout.support_simple_spinner_dropdown_item, designation_list);
                        designation_spinner.setAdapter(Designation_Array_Adapter);


                    } catch (JSONException exception) {
                        Log.d("Localhost", "Exception in Doctor's Info -> " + exception.toString());
                    }


                }

            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.d("Localhost", "Doctor's Info -> " + error.toString());
                }
            });

            RequestQueue requestQueue = Volley.newRequestQueue(Appointment.this);
            requestQueue.add(stringRequest);


            doctor_list = new ArrayList<>();
            doctor_list.add("Please select a doctor");


            Doctor_Array_Adapter = new ArrayAdapter(Appointment.this, R.layout.support_simple_spinner_dropdown_item, doctor_list);
            doctor_spinner.setAdapter(Doctor_Array_Adapter);


            time_list = new ArrayList<>();
            time_list.add("Please select a time");
            time_list.add("10:15");
            time_list.add("12:00");
            time_list.add("13:30");
            time_list.add("15:15");
            time_list.add("17:00");


            Time_Array_Adapter = new ArrayAdapter(Appointment.this, R.layout.support_simple_spinner_dropdown_item, time_list);
            time_spinner.setAdapter(Time_Array_Adapter);


            designation_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long l) {


                    String string = parent.getItemAtPosition(position).toString();

                    new_array = new String[array_length][1];

                    if(position == 0){
                        selected_designation = null;
                        selected_doctor = null;
                    }
                    else{
                        selected_designation = string;
                        selected_doctor = null;
                    }


                    doctor_list.clear();

                    doctor_list.add("Please select a doctor");

                    int z = 1;

                    for (int j = 0; j < array_length; j++) {

                        if (doctor_designation_array[j][0].equals(string)){
                            doctor_list.add(doctor_designation_array[j][1]);
                            new_array[z][0] = doctor_designation_array[j][2];
                            z++;
                        }
                    }



                    Doctor_Array_Adapter = new ArrayAdapter(Appointment.this, R.layout.support_simple_spinner_dropdown_item, doctor_list);
                    doctor_spinner.setAdapter(Doctor_Array_Adapter);


                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }

            });




            doctor_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long l) {


                    if(position == 0){
                        selected_doctor = null;
                    }
                    else{
                        selected_doctor = parent.getItemAtPosition(position).toString();
                        selected_doctor_id = new_array[position][0];
                    }


                }

                @Override
                public void onNothingSelected(AdapterView<?> adapterView) {

                }
            });



            time_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long l) {

                    if(position == 0){
                        selected_time = null;
                    }
                    else{
                        selected_time = parent.getItemAtPosition(position).toString();
                    }

                }

                @Override
                public void onNothingSelected(AdapterView<?> adapterView) {

                }
            });




            AlertDialog dialog = builder.create();

            dialog.show();

            dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {


//                    Toast.makeText(Appointment.this, Boolean.toString(selected_designation == null), Toast.LENGTH_SHORT).show();
//                    Toast.makeText(Appointment.this, Boolean.toString(selected_doctor == null), Toast.LENGTH_SHORT).show();
//                    Toast.makeText(Appointment.this, Boolean.toString(selected_time == null), Toast.LENGTH_SHORT).show();
//                    Toast.makeText(Appointment.this, Boolean.toString((display_date.getText().toString().equals(""))), Toast.LENGTH_SHORT).show();


                    if(selected_designation == null){
                        designation_spinner_layout.setError("Please select the doctor's designation");
                        designation_spinner.setBackgroundResource(R.drawable.white_background_invalid);
                    }
                    else{
                        designation_spinner_layout.setError("");
                        designation_spinner.setBackgroundResource(R.drawable.white_background_valid);
                    }




                    if(selected_doctor == null){
                        doctor_spinner_layout.setError("Please select a doctor");
                        doctor_spinner.setBackgroundResource(R.drawable.white_background_invalid);
                    }
                    else{
                        doctor_spinner_layout.setError("");
                        doctor_spinner.setBackgroundResource(R.drawable.white_background_valid);
                    }




                    if(selected_time == null){
                        time_spinner_layout.setError("Please select the doctor's designation");
                        time_spinner.setBackgroundResource(R.drawable.white_background_invalid);
                    }
                    else{
                        time_spinner_layout.setError("");
                        time_spinner.setBackgroundResource(R.drawable.white_background_valid);
                    }





                    if(display_date.getText().toString().equals("")){
                        display_date_layout.setError("Please select a date");
                        display_date.setBackgroundResource(R.drawable.white_background_invalid);
                    }
                    else{
                        display_date_layout.setError("");
                        display_date.setBackgroundResource(R.drawable.white_background_valid);
                    }


                    if(selected_designation != null && selected_doctor != null && selected_time != null && !(display_date.getText().toString().equals(""))) {


                        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Request_Appointment, new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {

                                Log.d("Localhost", "Request Appointment -> " + response);

                                if (response.trim().equals("Submit")) {
                                    dialog.dismiss();
                                }

                            }

                        }, new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d("Localhost", "Request Appointment -> " + error.toString());
                            }
                        }) {
                            @Override
                            protected Map<String, String> getParams() {
                                Map<String, String> data = new HashMap<>();

                                data.put("Time", selected_time);
                                data.put("Date", display_date.getText().toString());
                                data.put("Email", Sign_In.chosen_email_address);
                                data.put("doctor_id", selected_doctor_id);

                                return data;
                            }
                        };


                        RequestQueue requestQueue = Volley.newRequestQueue(Appointment.this.getApplicationContext());
                        requestQueue.add(stringRequest);


                    }
                }
            });


        }

        return true;
    }


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        Integer selected_Item = item.getItemId();

        Intent intent;

        switch (selected_Item) {

            case R.id.logout:
                intent = new Intent(Appointment.this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.profile:
                intent = new Intent(Appointment.this, Profile.class);


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
                                Appointment.super.finish();

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




            case R.id.report:
                intent = new Intent(Appointment.this, Report.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.appointments:
                intent = new Intent(Appointment.this, Appointment.class);
                startActivity(intent);
                super.finish();
                break;

        }


        return true;
    }


    @Override
    public void onBackPressed() {

        if (backPressedTime + 2000 > System.currentTimeMillis()) {
            backToast.cancel();
            super.onBackPressed();
            super.onDestroy();

        } else {
            backToast = Toast.makeText(Appointment.this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }



    @Override
    public void onAppointmentChatClick(int position) {
        Intent intent = new Intent(this, ChatActivity.class);
        intent.putExtra("appointment_time", appointment_models_array.get(position).getAppointment_time());
        startActivity(intent);
    }

    @Override
    public void onAppointmentCallClick(int position) {
        Intent intent = new Intent(this, VideoCallActivity.class);
        startActivity(intent);
    }

}