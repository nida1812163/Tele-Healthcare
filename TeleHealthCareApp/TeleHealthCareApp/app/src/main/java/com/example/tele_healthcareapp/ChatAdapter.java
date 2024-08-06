package com.example.tele_healthcareapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class ChatAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {



    private Context context;
    private ArrayList<UserModel> userList = new ArrayList<>();

    public ChatAdapter(Context context, ArrayList<UserModel> list) {
        this.context = context;
        this.userList = list;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == 1) {
            View view = LayoutInflater.from(context).inflate(R.layout.row_receiver, parent, false);
            return new ReceiverViewHolder(view);
        } else {
            View view = LayoutInflater.from(context).inflate(R.layout.row_sender, parent, false);
            return new SenderViewHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        UserModel item = userList.get(position);

        if (item.getRole().equals("patient")) {
            ((SenderViewHolder) holder).tvName.setText(item.getName());
            ((SenderViewHolder) holder).tvMessage.setText(item.getMessage());
        } else {
            ((ReceiverViewHolder) holder).tvName.setText(item.getName());
            ((ReceiverViewHolder) holder).tvMessage.setText(item.getMessage());
        }
    }

    @Override
    public int getItemViewType(int position) {
        if (userList.get(position).getRole().equals("patient")) {
            return 0;
        } else {
            return 1;
        }

    }

    @Override
    public int getItemCount() {
        return userList.size();
    }

    static class SenderViewHolder extends RecyclerView.ViewHolder {

        public TextView tvName, tvMessage;

        public SenderViewHolder(@NonNull View itemView) {
            super(itemView);

            tvName = itemView.findViewById(R.id.tv_sender_name);
            tvMessage = itemView.findViewById(R.id.tv_sender_message);
        }
    }

    static class ReceiverViewHolder extends RecyclerView.ViewHolder {
        public TextView tvName, tvMessage;

        public ReceiverViewHolder(@NonNull View itemView) {
            super(itemView);

            tvName = itemView.findViewById(R.id.tv_receiver_name);
            tvMessage = itemView.findViewById(R.id.tv_receiver_message);
        }
    }
}
