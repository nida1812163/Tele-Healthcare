package com.example.tele_healthcareapp;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.textfield.TextInputLayout;

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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Sign_In extends AppCompatActivity {


    EditText email, password;

    TextInputLayout TextInputLayout_email, TextInputLayout_password;

    Button button_login, button_signup;

    Pattern Email_Pattern = Pattern.compile("[A-Za-z]+[0-9]*@gmail.com$");

    Matcher Email_Matcher;

    static int email_valid = 0, password_valid = 0;

    static String chosen_email_address  = "usman.ali@gmail.com";

    static String patient_id = "7";




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);




        email = findViewById(R.id.email);
        password = findViewById(R.id.password);


        button_login = findViewById(R.id.login);
        button_signup = findViewById(R.id.signup);


        TextInputLayout_email = findViewById(R.id.email1);
        TextInputLayout_password = findViewById(R.id.visible_password);


        button_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                // Email
                Email_Matcher = Email_Pattern.matcher(email.getText().toString());

                if (Email_Matcher.find()) {
                    email_valid = 1;
                    TextInputLayout_email.setBackgroundResource(R.drawable.white_background_valid);
                    TextInputLayout_email.setErrorEnabled(false);
                } else if (email.getText().toString().equals("")) {
                    TextInputLayout_email.setError("Please enter your email address");
                    TextInputLayout_email.setBackgroundResource(R.drawable.white_background_invalid);
                    email_valid = 0;
                } else {
                    TextInputLayout_email.setError("Invalid, Please enter a valid email address");
                    TextInputLayout_email.setBackgroundResource(R.drawable.white_background_invalid);
                    email_valid = 0;
                }


                // Password
                if (password.getText().toString().equals("")) {
                    TextInputLayout_password.setError("Please enter your password");
                    TextInputLayout_password.setBackgroundResource(R.drawable.white_background_invalid);
                    password_valid = 0;
                } else if (password.length() >= 7) {
                    password_valid = 1;
                    TextInputLayout_password.setBackgroundResource(R.drawable.white_background_valid);
                    TextInputLayout_password.setErrorEnabled(false);
                } else {
                    TextInputLayout_password.setBackgroundResource(R.drawable.white_background_invalid);
                    TextInputLayout_password.setError("Invalid, Password should be of 7 characters or more");
                    password_valid = 0;
                }


                if (email_valid == 1 && password_valid == 1) {

                    StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_SignIn, new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            Log.d("Localhost", "Login Data-> " + response);


                            if (response.trim().contains("Found")) {
                                chosen_email_address = email.getText().toString();

                                try {
                                    JSONArray array = new JSONArray(response);

                                    for (int j = 0; j < array.length(); j++) {

                                        JSONObject jsonObject = array.getJSONObject(j);

                                        String id = jsonObject.getString("patient_id");

                                        patient_id = id;
                                    }


                                } catch (JSONException exception) {
                                    Log.d("Localhost", "Exception in Sign_in/Patient ID-> " + exception.toString());
                                }


                                Intent intent = new Intent(Sign_In.this, Dashboard.class);
                                startActivity(intent);
                                Sign_In.super.finish();
                            }


                            if (response.trim().contains("Not Found")) {
                                TextInputLayout_email.setBackgroundResource(R.drawable.white_background_invalid);
                                TextInputLayout_email.setError("Incorrect Email Address or Password");
                            }
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("Localhost", "Login Error -> " + error.toString());
                            Toast.makeText(Sign_In.this, email.getText().toString(), Toast.LENGTH_SHORT).show();
                            Toast.makeText(Sign_In.this, password.getText().toString(), Toast.LENGTH_SHORT).show();
                        }
                    }) {
                        @Override
                        protected Map<String, String> getParams() {

                            Map<String, String> data = new HashMap<>();

                            data.put("Email", email.getText().toString());

                            data.put("Password", password.getText().toString());

                            return data;
                        }
                    };


                    RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                    requestQueue.add(stringRequest);

                } else {
                    AlertDialog.Builder builder = new AlertDialog.Builder(Sign_In.this);

                    builder.setTitle("Error");

                    builder.setMessage("Please Provide Correct Data").setPositiveButton("Ok", null);

                    AlertDialog alertDialog = builder.create();

                    alertDialog.show();

                }


            }
        });


        button_signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Sign_In.this, Create_Account.class);
                startActivity(intent);


            }
        });


    }





}