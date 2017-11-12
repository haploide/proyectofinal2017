package com.example.ld.mapa.ClasesSoporte;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.TextView;

import com.example.ld.mapa.R;

import java.util.ArrayList;

/**
 * Created by ld on 12/11/17.
 */

public class GridAdapter extends BaseAdapter {
    Context context;
    ArrayList<String> arrayList;

    public GridAdapter(Context context, ArrayList<String> arrayList){
        this.context = context;
        this.arrayList = arrayList;
    }

    @Override
    public int getCount() {
        return arrayList.size();
    }

    @Override
    public Object getItem(int position) {
        return arrayList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null){
            LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
            convertView = layoutInflater.inflate(R.layout.item_grid, parent, false);
        }
        TextView tituloTv = (TextView) convertView.findViewById(R.id.textItemGrid);
        tituloTv.setText(arrayList.get(position));
        return convertView;
    }
}
