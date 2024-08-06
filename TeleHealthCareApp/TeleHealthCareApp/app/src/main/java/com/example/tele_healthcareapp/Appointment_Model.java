package com.example.tele_healthcareapp;

public class Appointment_Model {

    String appointment_id, doctor_name, appointment_time, day, month, role;


    public Appointment_Model(String appointment_id, String day, String month, String doctor_name, String appointment_time, String role){
        this.appointment_id = appointment_id;
        this.day = day;
        this.month = month;
        this.doctor_name = doctor_name;
        this.appointment_time = appointment_time;
        this.role = role;
    }


    public String getAppointment_id() {
        return appointment_id;
    }


    public void setAppointment_id(String appointment_id) {
        this.appointment_id = appointment_id;
    }



    public String getDay() {
        return day;
    }



    public void setDay(String day) {
        this.day = day;
    }





    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }





    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name;
    }




    public String getAppointment_time() {
        return appointment_time;
    }

    public void setAppointment_time(String appointment_time) {
        this.appointment_time = appointment_time;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}


