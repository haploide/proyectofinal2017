package com.example.ld.mapa;

import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import android.app.Activity;
import android.media.MediaPlayer;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ld on 12/11/17.
 */

public class Ayuda extends Activity {
    ListView listAyuda;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ayuda);
        listAyuda = (ListView) findViewById(R.id.listAyuda);
        ArrayList<String> list = new ArrayList<String>();
        list.add("Buscar entidad por ubicación en el  mapa");
        list.add("Buscar entidad por rubro");
        list.add("Buscar entidad por ciudad");
        final ArrayAdapter adapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, list);
        listAyuda.setAdapter(adapter);

        listAyuda.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, final View view,
                                    int position, long id) {
                final String item = (String) parent.getItemAtPosition(position);
                Intent videoAyuda = new Intent(Ayuda.this, AyudaVideos.class);
                String uriPath = "";
                if (item.equals("Buscar entidad por ubicación en el  mapa"))
                {
                    uriPath = "android.resource://com.example.ld.mapa/" + R.raw.buscar_entidad_rubro_ciudad_mapa;

                } else if (item.equals("Buscar entidad por rubro"))
                {
                    uriPath = "android.resource://com.example.ld.mapa/" + R.raw.buscar_entidad_por_rubro;
                }
                videoAyuda.putExtra("uriPath",uriPath);
                startActivity(videoAyuda);
            }

        });

    }


}
