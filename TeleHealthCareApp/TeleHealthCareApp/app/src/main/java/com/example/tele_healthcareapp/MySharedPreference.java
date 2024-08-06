package com.example.tele_healthcareapp;

import android.content.Context;
import android.content.SharedPreferences;

public class MySharedPreference {

    private SharedPreferences mPref;

    public MySharedPreference(Context mContext) {
        mPref = mContext.getSharedPreferences("pref", Context.MODE_PRIVATE);
    }

    public void setUser(String email, String id, String role) {
        SharedPreferences.Editor editor = mPref.edit();
        editor.putString("email", email);
        editor.putString("id", id);
        editor.putString("role", role);
        editor.apply();
    }

    public String getRole() {
        return mPref.getString("role", "");
    }

    public String getEmail() {
        return mPref.getString("email", "");
    }


    public String getId() {
        return mPref.getString("id", "");
    }

    public void clearData() {
        SharedPreferences.Editor editor = mPref.edit();
        editor.clear();
        editor.apply();
    }
}
