package com.example.tele_healthcareapp;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.MediaController;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.core.Repo;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;


public class Upload_Video extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {


    private long backPressedTime;
    private Toast backToast;



    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;


    TextView menu_header_name, menu_head_email, uploaded_file;


    private VideoView videoView;
    private Button uploadVideoBtn, pickVideoFab;


    private static final int Video_Pick_Gallery_Code = 100;
    private static final int Video_Pick_Camera_Code = 101;
    private static final int Camera_Request_Code = 102;


    private String[] Camera_Permission;

    private Uri Video_Uri = null;


    private ProgressDialog progressDialog;



    String firebaseID;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_video);


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



        videoView = findViewById(R.id.video_view);
        uploadVideoBtn = findViewById(R.id.upload_video_button);
        pickVideoFab = findViewById(R.id.pick_video_button);


        progressDialog = new ProgressDialog(this);
        progressDialog.setTitle("Please Wait");
        progressDialog.setMessage("Uploading Video");
        progressDialog.setCanceledOnTouchOutside(false);



        Camera_Permission = new String[] {Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE};





        pickVideoFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Video_Pick_Dialog();
            }
        });







        uploadVideoBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(Video_Uri== null){
                    Toast.makeText(Upload_Video.this, "Please Select a Video First", Toast.LENGTH_SHORT).show();
                }
                else{
                    Upload_Video_To_Firebase();
                }

            }
        });


    }





    private void Upload_Video_To_Firebase(){

        progressDialog.show();

        String timestamp = ""+ System.currentTimeMillis();

        String file_Path_and_Name = "Videos/" + "video_" + timestamp;

        StorageReference storageReference = FirebaseStorage.getInstance().getReference(file_Path_and_Name);



        StorageReference ref = storageReference.child(file_Path_and_Name);

        UploadTask uploaderTask = ref.putFile(Video_Uri);

        Task<Uri> uriTask = uploaderTask.continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                    @Override
                    public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                        return ref.getDownloadUrl();
                    }
                })
                .addOnCompleteListener(new OnCompleteListener<Uri>() {
                    @Override
                    public void onComplete(@NonNull Task<Uri> task) {

                        if (task.isSuccessful()) {
                            Uri download_Uri = task.getResult();

                            fileobject obj = new fileobject(Sign_In.patient_id, download_Uri.toString());

                            FirebaseDatabase database = FirebaseDatabase.getInstance();

                            DatabaseReference databaseReference = database.getReference("Videos");

                            databaseReference.push().setValue(obj)
                                    .addOnSuccessListener(new OnSuccessListener<Void>() {
                                        @Override
                                        public void onSuccess(Void unused) {

                                            databaseReference.addValueEventListener(new ValueEventListener() {
                                                @Override
                                                public void onDataChange(@NonNull DataSnapshot snapshot) {
                                                    firebaseID = snapshot.getValue().toString();

                                                    String[] array1 = firebaseID.split("=");


                                                    firebaseID = array1[0].substring(1, array1[0].length());

                                                    Log.d("Localhost", firebaseID);


                                                    StringRequest stringRequest = new StringRequest(Request.Method.POST, Database.Server_Post_Upload_Video, new Response.Listener<String>() {
                                                        @Override
                                                        public void onResponse(String response) {
                                                            Log.d("Localhost", "Upload Video -> " + response);


                                                            if (response.trim().equals("Successfully")) {
                                                                progressDialog.dismiss();
                                                                Toast.makeText(Upload_Video.this, "Video Uploaded", Toast.LENGTH_SHORT).show();

                                                                Intent intent = new Intent(Upload_Video.this, Report.class);
                                                                startActivity(intent);
                                                                Upload_Video.super.finish();
                                                            }
                                                        }
                                                    }, new Response.ErrorListener() {
                                                        @Override
                                                        public void onErrorResponse(VolleyError error) {
                                                            Log.d("Localhost", "Upload Video -> " + error.toString());
                                                        }
                                                    }) {
                                                        @Override
                                                        protected Map<String, String> getParams() {

                                                            Map<String, String> data = new HashMap<>();
                                                            data.put("patient_id", Sign_In.patient_id);
                                                            data.put("reportID", Report.report_id);
                                                            data.put("firebase_id", firebaseID);

                                                            return data;
                                                        }
                                                    };


                                                    RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                                                    requestQueue.add(stringRequest);

                                                }

                                                @Override
                                                public void onCancelled(@NonNull DatabaseError error) {

                                                }
                                            });



                                        }
                                    })
                                    .addOnFailureListener(new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            progressDialog.dismiss();
                                            Toast.makeText(Upload_Video.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    });
                        }

                    }
                });
    }





    private void Video_Pick_Dialog(){
        String[] options = {"Camera", "Gallery"};

        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setTitle("Pick Video From")
               .setItems(options, new DialogInterface.OnClickListener() {
                   @Override
                   public void onClick(DialogInterface dialogInterface, int i) {
                       if(i == 0){
                           // Camera
                           if(!(Check_Camera_Permission())){
                               Request_Camera_Permission();
                           }
                           else{
                               Video_Pick_Camera();
                           }
                       }
                       else if(i == 1){
                           // Gallery
                           Video_Pick_Gallery();
                       }
                   }
               })
               .show();
    }




    private void Request_Camera_Permission(){
        ActivityCompat.requestPermissions(this, Camera_Permission, Camera_Request_Code);
    }



    private boolean Check_Camera_Permission(){

        boolean result1 = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;

        boolean result2 = ContextCompat.checkSelfPermission(this, Manifest.permission.WAKE_LOCK) == PackageManager.PERMISSION_GRANTED;

        return result1 && result2;
    }





    private void Video_Pick_Gallery(){

        Intent intent = new Intent();

        intent.setType("video/*");

        intent.setAction(Intent.ACTION_GET_CONTENT);

        startActivityForResult(Intent.createChooser(intent, "Selected Videos"), Video_Pick_Gallery_Code);

    }





    private void Video_Pick_Camera(){

        Intent intent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);

        startActivityForResult(intent, Video_Pick_Camera_Code);

    }




    private void Set_Video_To_Video_View(){

        MediaController mediaController = new MediaController(this);

        mediaController.setAnchorView(videoView);

        videoView.setMediaController(mediaController);


        videoView.setVideoURI(Video_Uri);

        videoView.requestFocus();

        videoView.start();

        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                videoView.pause();
            }
        });

    }






    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        switch(requestCode){

            case Camera_Request_Code:
                if(grantResults.length > 0){
                    boolean camera_accepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;

                    boolean storage_accepted = grantResults[1] == PackageManager.PERMISSION_GRANTED;

                    if(camera_accepted && storage_accepted){
                        Video_Pick_Camera();
                    }
                    else{
                        Toast.makeText(this, "Camera and Storage Permissions are required", Toast.LENGTH_SHORT).show();
                    }
                }
                break;

        }

        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if(resultCode == RESULT_OK){
            if(requestCode == Video_Pick_Gallery_Code){
                Video_Uri = data.getData();

                Set_Video_To_Video_View();
            }
            else if(requestCode == Video_Pick_Camera_Code){
                Video_Uri = data.getData();

                Set_Video_To_Video_View();
            }
        }



        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {

        if(backPressedTime + 2000 > System.currentTimeMillis()){
            backToast.cancel();
            super.onBackPressed();
            super.onDestroy();

        }
        else{
            backToast = Toast.makeText(Upload_Video.this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }



    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Integer selected_Item = item.getItemId();

        Intent intent;

        switch (selected_Item) {

            case R.id.logout:
                intent = new Intent(Upload_Video.this, Sign_In.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.profile:
                intent = new Intent(Upload_Video.this, Profile.class);


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
                                Upload_Video.super.finish();

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
                intent = new Intent(Upload_Video.this, Report.class);
                startActivity(intent);
                super.finish();
                break;

            case R.id.appointments:
                intent = new Intent(Upload_Video.this, Appointment.class);
                startActivity(intent);
                super.finish();
                break;

        }

        return true;
    }
}