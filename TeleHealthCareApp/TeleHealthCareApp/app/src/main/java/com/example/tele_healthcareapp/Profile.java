package com.example.tele_healthcareapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;


import com.android.volley.AuthFailureError;
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

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Profile extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {


    private long backPressedTime;
    private Toast backToast;


    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;


    EditText name, age, address, email, password;

    TextView menu_header_name, menu_head_email;

    ScrollView scrollView;

    TextInputLayout TextInputLayout_name, TextInputLayout_age, TextInputLayout_address, TextInputLayout_email, TextInputLayout_password;

    RadioGroup radioGroup;

    RadioButton radio_Button_Male, radio_Button_Female;

    Button Update_Button;

    Pattern Email_Pattern = Pattern.compile("[A-Za-z]+[0-9]*@gmail.com$");
    Pattern Numbering_Pattern = Pattern.compile("[0-9]");
    Pattern Alpha_Pattern = Pattern.compile("[A-Za-z ]+[A-Za-z]*$");


    Matcher Email_Matcher, Numbering_Matcher, Alpha_Matcher;

    static int name_valid = 1, age_valid = 1, address_valid = 0, email_valid = 0, password_valid = 0;

    String selected_gender = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);


        drawerLayout = findViewById(R.id.drawerlayout);

        navigationView = findViewById(R.id.navigation_view);

        toolbar = findViewById(R.id.toolbar);


        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.navigation_open, R.string.navigation_close);

        drawerLayout.addDrawerListener(toggle);

        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(this);


        scrollView = findViewById(R.id.ScrollView);




        name = findViewById(R.id.name);
        age = findViewById(R.id.age);
        address = findViewById(R.id.address);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);


        menu_header_name = findViewById(R.id.name22);
        menu_head_email = findViewById(R.id.email22);


        radioGroup = findViewById(R.id.radioGroup);

        radio_Button_Male = findViewById(R.id.radio_Button_Male);
        radio_Button_Female = findViewById(R.id.radio_Button_Female);

        Update_Button = findViewById(R.id.update);


        TextInputLayout_name = findViewById(R.id.name1);
        TextInputLayout_age = findViewById(R.id.age1);
        TextInputLayout_address = findViewById(R.id.address1);
        TextInputLayout_email = findViewById(R.id.email1);
        TextInputLayout_password = findViewById(R.id.password1);


        String Intent_data_name = getIntent().getStringExtra("name");
        String Intent_data_age = getIntent().getStringExtra("age");
        String Intent_data_address = getIntent().getStringExtra("address");
        String Intent_data_gender = getIntent().getStringExtra("gender");
        String Intent_data_password = getIntent().getStringExtra("password");




        name.setText(Intent_data_name);
        age.setText(Intent_data_age);
        address.setText(Intent_data_address);
        password.setText(Intent_data_password);



        email.setText(Sign_In.chosen_email_address);


        menu_header_name.setText(Intent_data_name);
        menu_head_email.setText(Sign_In.chosen_email_address);


        if (Intent_data_gender.equals("F")) {
            selected_gender = "F";
            radio_Button_Female.setChecked(true);
        } else {
            selected_gender = "M";
            radio_Button_Male.setChecked(true);
        }






//
//        name.addTextChangedListener(new TextWatcher() {
//            @Override
//            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
//
//            }
//
//            @Override
//            public void onTextChanged(CharSequence s, int start, int before, int count) {
//
//            }
//
//            @Override
//            public void afterTextChanged(Editable s) {
//
//                int length = s.length();
//
//                for (int j = 0; j < length; j++) {
//
//                    char c = s.charAt(j);
//                    String s1 = Character.toString(c);
//
//                    Alpha_Matcher = Alpha_Pattern.matcher(s1);
//
//                    if (!(Alpha_Matcher.find())) {
//                        TextInputLayout_name.setError("Invalid, Please use alphabets only while entering your name");
//                        name_valid = 0;
//                        break;
//
//                    } else {
//                        TextInputLayout_name.setErrorEnabled(false);
//                        name_valid = 1;
//                    }
//
//                }
//
//            }
//        });
//
//
//        age.addTextChangedListener(new TextWatcher() {
//            @Override
//            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
//
//            }
//
//            @Override
//            public void onTextChanged(CharSequence s, int start, int before, int count) {
//
//            }
//
//            @Override
//            public void afterTextChanged(Editable s) {
//
//                int length = s.length();
//
//                for (int j = 0; j < length; j++) {
//                    char c = s.charAt(j);
//                    String s1 = Character.toString(c);
//                    Numbering_Matcher = Numbering_Pattern.matcher(s1);
//
//                    if (!(Numbering_Matcher.find())) {
//                        TextInputLayout_age.setError("Invalid, Please use numbers only while entering your age");
//                        age_valid = 0;
//                        break;
//
//                    } else {
//                        TextInputLayout_age.setErrorEnabled(false);
//                        age_valid = 1;
//                    }
//                }
//            }
//        });


        Update_Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                // Name
                if (name.getText().toString().equals("")) {
                    name_valid = 0;
                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_invalid);
                    TextInputLayout_name.setError("Please enter your first name");
                }
                else if(name_valid == 1){
                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_valid);
                }
                else{
                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_invalid);
                }




                // Age
                if (age.getText().toString().equals("")) {
                    age_valid = 0;
                    TextInputLayout_age.setError("Please enter your age");
                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_invalid);
                }
                else if(age_valid == 1){
                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_valid);
                }
                else{
                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_invalid);
                }



                // Address
                if (address.getText().toString().equals("")) {
                    TextInputLayout_address.setError("Please enter your address");
                    TextInputLayout_address.setBackgroundResource(R.drawable.white_background_invalid);
                    address_valid = 0;
                } else {
                    TextInputLayout_address.setErrorEnabled(false);
                    TextInputLayout_address.setBackgroundResource(R.drawable.white_background_valid);
                    address_valid = 1;
                }


                // Gender
                if (selected_gender != null) {
                    radioGroup.setBackgroundResource(R.drawable.valid);
                } else {
                    radioGroup.setBackgroundResource(R.drawable.invalid);
                }


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





                AlertDialog.Builder builder = new AlertDialog.Builder(Profile.this);


                if (name_valid == 1 && age_valid == 1 && address_valid == 1 && selected_gender != null && email_valid == 1 && password_valid == 1) {


                    builder.setTitle("Update Confirmation");

                    builder.setMessage("Are you sure you want to update your profile").setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                            StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Editing_Profile, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {

                                    Log.d("Localhost", "Profile Info -> " + response);

                                    if (response.trim().equals("Updated")) {
                                        Sign_In.chosen_email_address = email.getText().toString();
                                        Intent intent = new Intent(Profile.this, Dashboard.class);
                                        startActivity(intent);
                                    }

                                }

                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.d("Localhost", "Profile Info -> " + error.toString());
                                }
                            }) {
                                @Override
                                protected Map<String, String> getParams() {
                                    Map<String, String> data = new HashMap<>();
                                    data.put("Name", name.getText().toString().trim());
                                    data.put("Age", age.getText().toString());
                                    data.put("Address", address.getText().toString());
                                    data.put("Gender", selected_gender);
                                    data.put("Chosen_Email", Sign_In.chosen_email_address);
                                    data.put("Email", email.getText().toString());
                                    data.put("Password", password.getText().toString());

                                    return data;
                                }
                            };


                            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                            requestQueue.add(stringRequest);


                        }
                    }).setNegativeButton("No", null);


                    AlertDialog alertDialog = builder.create();

                    alertDialog.show();

                }
                else{

                    builder.setTitle("Error");

                    builder.setMessage("Please Provide Correct Data").setPositiveButton("Ok", null);

                    AlertDialog alertDialog = builder.create();

                    alertDialog.show();


                    if(name_valid == 0){
                        scrollView.scrollTo(name.getBottom(), name.getScrollY());
                    }
                    else if(age_valid == 0){
                        scrollView.scrollTo(age.getVisibility(), age.getBottom());
                    }
                    else if(address_valid == 0){
                        scrollView.scrollTo(address.getVisibility(), address.getBottom());
                    }
                    else if(email_valid == 0){
                        scrollView.scrollTo(email.getVisibility(), email.getBottom());
                    }
                    else if(password_valid == 0){
                        scrollView.scrollTo(password.getVisibility(), password.getBottom());
                    }
                    else{
                        scrollView.scrollTo(radioGroup.getVisibility(), radioGroup.getBottom());
                    }

                }
            }
        });


    }


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        Integer selected_Item = item.getItemId();

        Intent intent;

        switch (selected_Item) {

            case R.id.logout:
                intent = new Intent(Profile.this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.profile:
                intent = new Intent(Profile.this, Profile.class);


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
                                Profile.super.finish();

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
                intent = new Intent(Profile.this, Report.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.appointments:
                intent = new Intent(Profile.this, Appointment.class);
                startActivity(intent);
                super.finish();
                break;

        }

        return true;
    }


    public void CheckGenderRadioButton(View view) {
        int radioID = view.getId();

        switch (radioID) {
            case R.id.radio_Button_Female:
                selected_gender = "Female";
                break;

            case R.id.radio_Button_Male:
                selected_gender = "Male";
                break;

            default:
                selected_gender = null;
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
            backToast = Toast.makeText(Profile.this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }


}