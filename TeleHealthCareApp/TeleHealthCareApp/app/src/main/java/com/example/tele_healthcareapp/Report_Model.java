package com.example.tele_healthcareapp;

public class Report_Model {

    String Diagnosis, Weight, Lab_tests, Lab_tests_description, Lab_Tests_Done, report_ID, uploaded_id;



    public Report_Model(String report_ID, String Diagnosis, String Weight, String Lab_tests, String Lab_tests_description, String Lab_Tests_Done, String uploaded_id){
        this.report_ID = report_ID;
        this.Diagnosis = Diagnosis;
        this.Weight = Weight;
        this.Lab_tests = Lab_tests;
        this.Lab_tests_description = Lab_tests_description;
        this.Lab_Tests_Done = Lab_Tests_Done;
        this.uploaded_id = uploaded_id;
    }


    public String getReport_ID() {
        return report_ID;
    }

    public void setReport_ID(String report_ID) {
        this.report_ID = report_ID;
    }

    public String getDiagnosis() {
        return Diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        Diagnosis = diagnosis;
    }

    public String getWeight() {
        return Weight;
    }

    public void setWeight(String weight) {
        Weight = weight;
    }

    public String getLab_tests() {
        return Lab_tests;
    }

    public void setLab_tests(String lab_tests) {
        Lab_tests = lab_tests;
    }

    public String getLab_tests_description() {
        return Lab_tests_description;
    }

    public void setLab_tests_description(String lab_tests_description) {
        Lab_tests_description = lab_tests_description;
    }

    public String getLab_Tests_Done() {
        return Lab_Tests_Done;
    }

    public void setLab_Tests_Done(String lab_Tests_Done) {
        Lab_Tests_Done = lab_Tests_Done;
    }

    public String getUploaded_id() {
        return uploaded_id;
    }

    public void setUploaded_id(String uploaded_id) {
        this.uploaded_id = uploaded_id;
    }
}


