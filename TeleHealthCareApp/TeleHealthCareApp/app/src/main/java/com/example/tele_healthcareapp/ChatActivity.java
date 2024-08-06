package com.example.tele_healthcareapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class ChatActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener{



    private long backPressedTime;
    private Toast backToast;


    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;


    TextView menu_header_name, menu_head_email;




    private EditText edtMessage;
    private ImageView ivSend;
    private RecyclerView rvChat;

    private DatabaseReference ref;
    private DatabaseReference ref2;

    private String appointmentTime, id, role, email;
    private ArrayList<UserModel> chatList = new ArrayList<>();
    private ChatAdapter chatAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);




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





        edtMessage = findViewById(R.id.edt_message);
        ivSend = findViewById(R.id.iv_send);
        rvChat = findViewById(R.id.rv_chat);

        FirebaseApp.getInstance();

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        ref = database.getReference("chat");

        appointmentTime = getIntent().getStringExtra("appointment_time");

        getDataFromCache();
        initListener();
        getMessagesFromFirebase();
    }

    private void getDataFromCache() {
        MySharedPreference pref = new MySharedPreference(getApplicationContext());
        id = pref.getId();
        role = pref.getRole();
        email = pref.getEmail();
    }

    private void getMessagesFromFirebase() {
        ref.child(appointmentTime).addValueEventListener(new ValueEventListener() {

            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                chatList.clear();

                if (dataSnapshot != null) {

                    Log.d("Localhost", "" + dataSnapshot.getValue());



                    for (DataSnapshot data : dataSnapshot.getChildren()) {
                        HashMap<String, String> item = (HashMap<String, String>) data.getValue();
                        if (item != null) {
                            String role = item.get("role");
                            String name = item.get("name");
                            String message = item.get("message");
                            String id = item.get("id");

                            UserModel model = new UserModel();
                            model.setName(name);
                            model.setRole(role);
                            model.setMessage(message);
                            model.setId(id);


                            chatList.add(model);
//                            Collections.reverse(chatList);
                        }
                    }

                    chatAdapter = new ChatAdapter(getApplicationContext(), chatList);

                    rvChat.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                    rvChat.setAdapter(chatAdapter);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.d("Localhost", databaseError.getDetails());
            }
        });
    }

    private void initListener() {
        ivSend.setOnClickListener(view -> {
            if (edtMessage.getText().toString().isEmpty()) {
                Toast.makeText(this, "Enter message", Toast.LENGTH_SHORT).show();
            } else {
                UserModel userModel = new UserModel();
//                userModel.setId(id);
                userModel.setMessage(edtMessage.getText().toString());
                userModel.setRole("patient");
                userModel.setName("You");

                long timeInMill = SystemClock.elapsedRealtime();
                String currentDate = new SimpleDateFormat("d-M-y", Locale.getDefault()).format(new Date());
                String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());

                Log.d("Localhost", currentDate + " " + currentTime);
                ref.child(appointmentTime).child(currentDate + " " + currentTime).setValue(userModel);

                edtMessage.setText("");
            }
        });
    }



    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Integer selected_Item = item.getItemId();

        Intent intent;

        switch (selected_Item) {

            case R.id.logout:
                intent = new Intent(this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.profile:
                intent = new Intent(this, Profile.class);


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
                                ChatActivity.super.finish();

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
                intent = new Intent(this, Report.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.appointments:
                intent = new Intent(this, Appointment.class);
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
            backToast = Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }


}