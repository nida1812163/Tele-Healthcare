package com.example.tele_healthcareapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.navigation.NavigationView;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Report extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private long backPressedTime;
    private Toast backToast;

    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;


    TextView menu_header_name, menu_head_email;



    private static RecyclerView recycler_view;

    private static ArrayList<Report_Model> report_models_array = new ArrayList<>();

    private static RecyclerView.LayoutManager layoutManager;

    private static Report_Adapter adapter;



   static String report_id;






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_report);


        drawerLayout = findViewById(R.id.drawerlayout);

        navigationView = findViewById(R.id.navigation_view);

        toolbar = findViewById(R.id.toolbar);


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

        adapter = new Report_Adapter(this, report_models_array);

        recycler_view.setAdapter(adapter);


        Report_Data(getApplicationContext());



    }



    public void Upload_Video(Context context, String ID){

        report_id = ID;

        Intent intent = new Intent(context, Upload_Video.class);
        context.startActivity(intent);

    }




    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        Integer selected_Item = item.getItemId();

        Intent intent;

        switch (selected_Item) {

            case R.id.logout:
                intent = new Intent(Report.this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.profile:
                intent = new Intent(Report.this, Profile.class);


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
                                Report.super.finish();

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
                intent = new Intent(Report.this, Report.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.appointments:
                intent = new Intent(Report.this, Appointment.class);
                startActivity(intent);
                super.finish();
                break;

        }

        return true;


    }


    @Override
    public void onBackPressed() {

        if(backPressedTime + 2000 > System.currentTimeMillis()){
            backToast.cancel();
            super.onBackPressed();
            super.onDestroy();

        }
        else{
            backToast = Toast.makeText(Report.this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }




    public void Report_Data(Context context) {


        report_models_array.clear();


        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Get_Report_Info, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {


                Log.d("Localhost", "Getting Report Info -> Achieved");

                try {
                    JSONArray array = new JSONArray(response);


                    for (int j = 0; j < array.length(); j++) {

                        JSONObject jsonObject = array.getJSONObject(j);

                        String reportID = jsonObject.getString("reportID");
                        String diagnosis = jsonObject.getString("diagnosis");
                        String weight = jsonObject.getString("weight");
                        String labTests = jsonObject.getString("labTests");
                        String labTestsDescription = jsonObject.getString("labTestsDescription");
                        String labTestsDone = jsonObject.getString("labTestsDone");
                        String uploaded_id = jsonObject.getString("uploaded_id");

                        report_models_array.add(new Report_Model(reportID, diagnosis, weight, labTests, labTestsDescription, labTestsDone, uploaded_id));

                        Collections.reverse(report_models_array);
                    }


                    adapter.notifyDataSetChanged();

                } catch (JSONException exception) {
                    Log.d("Localhost", "Exception in Report Info -> " + exception.toString());
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Localhost", "Error in Getting Report Info -> " + error.toString());
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






}