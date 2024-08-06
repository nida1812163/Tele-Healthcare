package com.example.tele_healthcareapp;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.text.format.Formatter;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.ScrollView;
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

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Create_Account extends AppCompatActivity {


    EditText name, age, address, email, password;

    TextInputLayout TextInputLayout_name, TextInputLayout_age, TextInputLayout_address, TextInputLayout_email, TextInputLayout_password;

    ScrollView scrollView;

    RadioGroup radioGroup;

    Button button_signup;

    Pattern Email_Pattern = Pattern.compile("[A-Z||a-z]+[0-9]*@gmail.com$");
    Pattern Numbering_Pattern = Pattern.compile("[0-9]");
    Pattern Alpha_Pattern = Pattern.compile("[A-Za-z ]+[A-Za-z]*$");

    Matcher Email_Matcher, Numbering_Matcher, Alpha_Matcher;

    static int name_valid = 1, age_valid = 1, address_valid = 0, email_valid = 0, password_valid = 0;

    String selected_gender = null;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_account);


        scrollView = findViewById(R.id.ScrollView);

        name = findViewById(R.id.name);
        age = findViewById(R.id.age);
        address = findViewById(R.id.address);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);

        radioGroup = findViewById(R.id.radioGroup);

        button_signup = findViewById(R.id.signup);




        TextInputLayout_name = findViewById(R.id.name1);
        TextInputLayout_age = findViewById(R.id.age1);
        TextInputLayout_address = findViewById(R.id.address1);
        TextInputLayout_email = findViewById(R.id.email1);
        TextInputLayout_password = findViewById(R.id.password1);







        name.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

                int length =s.length();

                for(int j=0; j<length; j++){
                    char c = s.charAt(j);
                    String s1 = Character.toString(c);
                    Alpha_Matcher = Alpha_Pattern.matcher(s1);

                    if(!(Alpha_Matcher.find())){
                        TextInputLayout_name.setError("Invalid, Please use alphabets only while entering your name");
                        name_valid = 0;
                        break;
                    }
                    else{
                        TextInputLayout_name.setErrorEnabled(false);
                        name_valid = 1;
                    }

                }
            }
        });



        age.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

                int length = s.length();

                for(int j=0; j<length; j++){
                    char c = s.charAt(j);
                    String s1 = Character.toString(c);
                    Numbering_Matcher = Numbering_Pattern.matcher(s1);

                    if(!(Numbering_Matcher.find())){
                        TextInputLayout_age.setError("Invalid, Please use numbers only while entering your age");
                        age_valid = 0;
                        break;
                    }
                    else{
                        TextInputLayout_age.setErrorEnabled(false);
                        age_valid = 1;
                    }
                }
            }
        });
















        button_signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



//                // Name
//                if (name.getText().toString().equals("")) {
//                    name_valid = 0;
//                    TextInputLayout_name.setError("Please enter your first name");
//                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_invalid);
//                }
//                else if(name_valid == 1){
//                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_valid);
//                }
//                else{
//                    TextInputLayout_name.setBackgroundResource(R.drawable.white_background_invalid);
//                }
//
//
//
//
//                // Age
//                if (age.getText().toString().equals("")) {
//                    age_valid = 0;
//                    TextInputLayout_age.setError("Please enter your age");
//                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_invalid);
//                }
//                else if(age_valid == 1){
//                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_valid);
//                }
//                else{
//                    TextInputLayout_age.setBackgroundResource(R.drawable.white_background_invalid);
//                }
//


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





                if(name_valid == 1 && age_valid == 1 && address_valid == 1 && selected_gender != null && email_valid == 1 && password_valid ==1) {

                        StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Create_Account, response -> {

                            Log.d("Localhost", "Account Created -> " + response);


                            if (response.trim().equals("Success")) {
                                Sign_In.chosen_email_address = email.getText().toString();


                                try {
                                    JSONArray array = new JSONArray(response);

                                    for (int j = 0; j < array.length(); j++) {

                                        JSONObject jsonObject = array.getJSONObject(j);

                                        String id = jsonObject.getString("patient_id");

                                        Sign_In.patient_id = id;
                                    }


                                } catch (JSONException exception) {
                                    Log.d("Localhost", "Exception in Sign_in/Patient ID-> " + exception.toString());
                                }



                                Intent intent = new Intent(Create_Account.this, Dashboard.class);
                                startActivity(intent);
                                Create_Account.super.finish();
                            }




                            if(response.trim().equals("Email Exists")){
                                email_valid = 0;
                                TextInputLayout_email.setBackgroundResource(R.drawable.white_background_invalid);
                                TextInputLayout_email.setError("Email Address already exists, Please enter a different Email Address");
                            }
                        }, error ->{
                                Log.d("Localhost", "Account Not Created -> " + error.toString());
                }) {
                            @Override
                            protected Map<String, String> getParams() throws AuthFailureError {
                                Map<String, String> data = new HashMap<>();
                                data.put("Name", name.getText().toString());
                                data.put("Age", age.getText().toString());
                                data.put("Address", address.getText().toString());
                                data.put("Gender", selected_gender);
                                data.put("Email", email.getText().toString());
                                data.put("Password", password.getText().toString());

                                return data;
                            }
                        };


                        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                        requestQueue.add(stringRequest);

                }
                else{

                    AlertDialog.Builder builder = new AlertDialog.Builder(Create_Account.this);

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

    public void CheckGenderRadioButton(View view) {

        int radioID = view.getId();

        switch (radioID){
            case R.id.radio_Button_Female:
                selected_gender = "F";
                break;

            case R.id.radio_Button_Male:
                selected_gender = "M";
                break;

            default:
                selected_gender = null;
        }

    }








}