package com.example.ld.mapa;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.Button;

/**
 * Created by ld on 21/10/17.
 */

public class PantallaPrincipal extends FragmentActivity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pantalla_principal);

        Button buscarEnMapa = (Button) findViewById(R.id.btnBuscarMapa);

        buscarEnMapa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent BuscarMapa = new Intent(getApplicationContext(), MapaBusqueda.class);
                startActivity(BuscarMapa);
            }
        });
    }
}
