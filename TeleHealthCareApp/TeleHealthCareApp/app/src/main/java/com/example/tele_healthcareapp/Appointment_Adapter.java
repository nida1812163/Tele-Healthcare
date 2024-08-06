package com.example.tele_healthcareapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Appointment_Adapter extends RecyclerView.Adapter<Appointment_Adapter.myViewHolder> {


    public Context context;


    static int recycler_position;

    static  String ID;

    ArrayList<Appointment_Model> appointments_array;


    AppointmentClickListener listener;

    public Appointment_Adapter(Context context, ArrayList<Appointment_Model> appointments_array, AppointmentClickListener listener) {
        this.context = context;
        this.appointments_array = appointments_array;
        this.listener = listener;
    }




    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_view_layout, parent, false);

        myViewHolder view_holder_object = new myViewHolder(view);

        return view_holder_object;

    }




    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, @SuppressLint("RecyclerView") int position) {

        TextView date, month, doctor_name, appointment_time;

        ImageButton Cancel_Button;


        date = holder.date;
        month = holder.month;
        doctor_name = holder.doctor_name;
        appointment_time = holder.appointment_time;

        holder.ivChat.setOnClickListener(view -> listener.onAppointmentChatClick(position));

        holder.ivVideoCall.setOnClickListener(view -> listener.onAppointmentCallClick(position));



        Cancel_Button = holder.Cancel_Button;



        date.setText(appointments_array.get(position).day);


        if(appointments_array.get(position).month.equals("01")){
            month.setText("JAN");
        }
        else if(appointments_array.get(position).month.equals("02")){
            month.setText("FEB");
        }
        else if(appointments_array.get(position).month.equals("03")){
            month.setText("MARCH");
        }
        else if(appointments_array.get(position).month.equals("04")){
            month.setText("APRIL");
        }
        else if(appointments_array.get(position).month.equals("05")){
            month.setText("MAY");
        }
        else if(appointments_array.get(position).month.equals("06")){
            month.setText("JUNE");
        }
        else if(appointments_array.get(position).month.equals("07")){
            month.setText("JULY");
        }
        else if(appointments_array.get(position).month.equals("08")){
            month.setText("AUG");
        }
        else if(appointments_array.get(position).month.equals("09")){
            month.setText("SEP");
        }
        else if(appointments_array.get(position).month.equals("10")){
            month.setText("OCT");
        }
        else if(appointments_array.get(position).month.equals("11")){
            month.setText("NOV");
        }
        else if(appointments_array.get(position).month.equals("12")){
            month.setText("DEC");
        }


        doctor_name.setText(appointments_array.get(position).doctor_name);
        appointment_time.setText(appointments_array.get(position).appointment_time);




        Cancel_Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Log.d("Localhost", String.valueOf(position));

                recycler_position = position;

                ID = appointments_array.get(position).appointment_id;


                Log.d("Localhost", ID);



                Appointment appointment = new Appointment();

                appointment.Cancel_Appointment(context);


            }
        });


    }




    @Override
    public int getItemCount() {
        return appointments_array.size();
    }





    public class myViewHolder extends RecyclerView.ViewHolder {

        TextView date, month, doctor_name, appointment_time;

        ImageButton Cancel_Button;

        CardView cvItem;
        ImageView ivChat, ivVideoCall;


        public myViewHolder(@NonNull View itemView) {
            super(itemView);

            date = itemView.findViewById(R.id.date);
            month = itemView.findViewById(R.id.month);
            doctor_name = itemView.findViewById(R.id.info_doctor_name);
            appointment_time = itemView.findViewById(R.id.info_appointment_time);

            Cancel_Button = itemView.findViewById(R.id.cancel_button);

            cvItem = itemView.findViewById(R.id.layout);
            ivChat = itemView.findViewById(R.id.iv_chat);
            ivVideoCall = itemView.findViewById(R.id.iv_call);
        }
    }
}
