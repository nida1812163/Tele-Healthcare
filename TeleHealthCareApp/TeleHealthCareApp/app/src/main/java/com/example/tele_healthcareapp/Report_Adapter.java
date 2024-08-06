package com.example.tele_healthcareapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Report_Adapter extends RecyclerView.Adapter<Report_Adapter.myViewHolder> {


    public Context context;


    static int recycler_position;

    static  String ID;

    ArrayList<Report_Model> report_array;



    public Report_Adapter(Context context, ArrayList<Report_Model> report_array) {
        this.context = context;
        this.report_array = report_array;
    }




    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.report_card_view_layout, parent, false);

        myViewHolder view_holder_object = new myViewHolder(view);

        return view_holder_object;

    }




    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, @SuppressLint("RecyclerView") int position) {


        TextView diagnosis, weight, lab_test_description, video_uploaded_text;

        Button upload_video_button;



        diagnosis = holder.diagnosis;
        weight = holder.weight;
        lab_test_description = holder.lab_test_description;
        video_uploaded_text = holder.video_uploaded_text;

        upload_video_button = holder.upload_video_button;




        diagnosis.setText(report_array.get(position).Diagnosis);

        weight.setText(report_array.get(position).Weight);

        if(report_array.get(position).Lab_Tests_Done.equals("Done")){
            lab_test_description.setTextColor(Color.parseColor("#FFFFFF"));
        }
        else{
            lab_test_description.setTextColor(Color.parseColor("#FFFFFF"));
        }


        lab_test_description.setText(report_array.get(position).Lab_tests + " [" + report_array.get(position).Lab_tests_description + "]");



        if(report_array.get(position).uploaded_id.equals("null")){

            video_uploaded_text.setVisibility(View.INVISIBLE);

            upload_video_button.setVisibility(View.VISIBLE);


            upload_video_button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    Log.d("Localhost", String.valueOf(position));

                ID = report_array.get(position).report_ID;


                    Log.d("Localhost", ID);



                Report report = new Report();

                report.Upload_Video(context, ID);


                }
            });


        }
        else{
            video_uploaded_text.setTextColor(Color.parseColor("#12F364"));

            video_uploaded_text.setVisibility(View.VISIBLE);

            upload_video_button.setVisibility(View.INVISIBLE);
        }






    }




    @Override
    public int getItemCount() {
        return report_array.size();
    }





    public class myViewHolder extends RecyclerView.ViewHolder {

        TextView diagnosis, weight, lab_test_description, video_uploaded_text;

        Button upload_video_button;



        public myViewHolder(@NonNull View itemView) {
            super(itemView);

            diagnosis = itemView.findViewById(R.id.info_diagnosis);
            weight = itemView.findViewById(R.id.info_weight);
            lab_test_description = itemView.findViewById(R.id.info_lab_test_description);
            video_uploaded_text = itemView.findViewById(R.id.video_uploaded_text);

            upload_video_button = itemView.findViewById(R.id.upload_video_button);
        }
    }
}
