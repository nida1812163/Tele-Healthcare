package com.example.tele_healthcareapp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.SurfaceView;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.video.VideoCanvas;

public class VideoCallActivity extends AppCompatActivity  {





    private long backPressedTime;
    private Toast backToast;



    int video = 1, audio = 1;





    private static final int PERMISSION_REQ_ID = 22;

    private CardView cvEndCall, cvCamera, cvMic;

    private ImageView CameraImage, MicImage;

    private static final String[] REQUESTED_PERMISSIONS = {
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.CAMERA
    };

    // Java
    // Fill the App ID of your project generated on Agora Console.
    private String appId = "86a50dba2551407d995ec8c2fbf51968"; // yahan pe app id agora k console se copy kr k add kr len
    // Fill the channel name.
    private String channelName = "test";
    // Fill the temp token generated on Agora Console.
    private String token = "00686a50dba2551407d995ec8c2fbf51968IAA373qQ7svGAhIBdU0QLFVZTRXntGR9peAJ7rAXBBBlZgx+f9gAAAAAEACOhaHHg1vmYgEAAQCEW+Zi";
    // yahan pe token bhi agora console se copy kr len channel ka name add kr k
    private RtcEngine mRtcEngine;

    private final IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        @Override
        public void onJoinChannelSuccess(String channel, int uid, int elapsed) {
            super.onJoinChannelSuccess(channel, uid, elapsed);
            Toast.makeText(VideoCallActivity.this, "channel started with id " + uid, Toast.LENGTH_SHORT).show();
            setupRemoteVideo(uid);

        }



        @Override
        // Listen for the remote user joining the channel to get the uid of the user.
        public void onUserJoined(int uid, int elapsed) {
            runOnUiThread(() -> {
                // Call setupRemoteVideo to set the remote video view after getting uid from the onUserJoined callback.
                Toast.makeText(VideoCallActivity.this, "user joined with id " + uid, Toast.LENGTH_SHORT).show();
                setupRemoteVideo(uid);
            });
        }



        @Override
        public void onUserOffline(int uid, int reason) {
            runOnUiThread(() -> {
                // Call setupRemoteVideo to set the remote video view after getting uid from the onUserJoined callback.
                Toast.makeText(VideoCallActivity.this, "user left with id " + uid, Toast.LENGTH_SHORT).show();
                setupRemoteVideo(uid);
            });
        }


        @Override
        public void onUserMuteVideo(int uid, boolean muted) {
            runOnUiThread(() -> {
                // Call setupRemoteVideo to set the remote video view after getting uid from the onUserJoined callback.
                Toast.makeText(VideoCallActivity.this, "user video video with " + uid + Boolean.toString(muted), Toast.LENGTH_SHORT).show();
                setupRemoteVideo(uid);
            });
        }



    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_call);


        cvCamera = findViewById(R.id.camera);

        cvMic = findViewById(R.id.mic);

        CameraImage = findViewById(R.id.cameraImage);

        MicImage = findViewById(R.id.micImage);

        cvEndCall = findViewById(R.id.end_call_icon);

        // If all the permissions are granted, initialize the RtcEngine object and join a channel.
        if (checkSelfPermission(REQUESTED_PERMISSIONS[0], PERMISSION_REQ_ID) &&
                checkSelfPermission(REQUESTED_PERMISSIONS[1], PERMISSION_REQ_ID)) {
            initializeAndJoinChannel();
        }


        cvCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                muteLocalVideo();
            }
        });




        cvMic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                muteLocalAudio();
            }
        });




        cvEndCall.setOnClickListener(view -> {
            mRtcEngine.leaveChannel();
            RtcEngine.destroy();

            finish();
        });
    }





    // Java
    private void initializeAndJoinChannel() {
        try {
            mRtcEngine = RtcEngine.create(getBaseContext(), appId, mRtcEventHandler);
        } catch (Exception e) {
            throw new RuntimeException("Check the error.");
        }

        // By default, video is disabled, and you need to call enableVideo to start a video stream.
        mRtcEngine.enableVideo();
        mRtcEngine.enableAudio();



        FrameLayout container = findViewById(R.id.local_video_view_container);
        // Call CreateRendererView to create a SurfaceView object and add it as a child to the FrameLayout.
        SurfaceView surfaceView = RtcEngine.CreateRendererView(getBaseContext());
        container.addView(surfaceView);
        // Pass the SurfaceView object to Agora so that it renders the local video.
        mRtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_FIT, 0));

        // Join the channel with a token.
        mRtcEngine.joinChannel(token, channelName, "", 0);
    }




    private void setupRemoteVideo(int uid) {
        FrameLayout container = findViewById(R.id.remote_video_view_container);
        SurfaceView surfaceView = RtcEngine.CreateRendererView(getBaseContext());
        surfaceView.setZOrderMediaOverlay(true);
        container.addView(surfaceView);
        mRtcEngine.setupRemoteVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_FIT, uid));
    }



    private void muteLocalVideo(){


        if(video == 0){
            CameraImage.setImageResource(R.drawable.ic_video_call);
            mRtcEngine.enableVideo();
            video = 1;
        }
        else{
            CameraImage.setImageResource(R.drawable.ic_video_off);
            mRtcEngine.disableVideo();
            video = 0;
        }


        FrameLayout container  = findViewById(R.id.local_video_view_container);

        SurfaceView surfaceView = RtcEngine.CreateRendererView(getBaseContext());

        surfaceView.setZOrderMediaOverlay(true);

        container.addView(surfaceView);

        mRtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_FIT, 0));

    }



    private void muteLocalAudio(){

        if(audio == 0){
            MicImage.setImageResource(R.drawable.ic_mic);
            mRtcEngine.enableAudio();
            audio = 1;
        }
        else{
            MicImage.setImageResource(R.drawable.ic_mic_off);
            mRtcEngine.disableAudio();
            audio = 0;
        }

    }




    private boolean checkSelfPermission(String permission, int requestCode) {
        if (ContextCompat.checkSelfPermission(this, permission) !=
                PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, REQUESTED_PERMISSIONS, requestCode);
            return false;
        }
        return true;
    }

    protected void onDestroy() {
        super.onDestroy();

        mRtcEngine.leaveChannel();
        RtcEngine.destroy();
    }




    @Override
    public void onBackPressed() {

        if(backPressedTime + 2000 > System.currentTimeMillis()){
            backToast.cancel();
            super.onBackPressed();
            mRtcEngine.leaveChannel();
            RtcEngine.destroy();
            super.onDestroy();

        }
        else{
            backToast = Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT);
            backToast.show();
        }

        backPressedTime = System.currentTimeMillis();
    }





}