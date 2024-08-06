package com.example.tele_healthcareapp;

public class fileobject {


    String downloadUri, patient_id;



    public fileobject(String patient_id, String downloadUri) {
        this.patient_id = patient_id;
        this.downloadUri = downloadUri;
    }

    public String getDownloadUri() {
        return downloadUri;
    }

    public void setDownloadUri(String downloadUri) {
        this.downloadUri = downloadUri;
    }

    public String getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(String patient_id) {
        this.patient_id = patient_id;
    }
}
