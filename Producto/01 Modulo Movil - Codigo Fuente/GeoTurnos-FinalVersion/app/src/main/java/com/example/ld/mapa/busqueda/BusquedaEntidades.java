package com.example.ld.mapa.busqueda;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.support.v4.app.ActionBarDrawerToggle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SimpleCursorAdapter;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.ld.mapa.Login.MapsActivity;
import com.example.ld.mapa.R;
import com.example.ld.mapa.menuLateral.DrawerItem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


/**
 * Created by ld on 21/10/17.
 */

public class BusquedaEntidades extends ActionBarActivity {

    private String[] mPlanetTitles;
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    Spinner spinnerRubro;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.busqueda_entidades);
        spinnerRubro = (Spinner) findViewById(R.id.planets_spinner);
        Button btnBuscarEnMapa = (Button) findViewById(R.id.btnBuscarEnMapa);

        btnBuscarEnMapa.setOnClickListener(new View.OnClickListener() {
        @Override public void onClick(View v) {
        Intent Buscar = new Intent(getApplicationContext(), BusquedaMapa.class);
        startActivity(Buscar);
        }
         });

            ArrayList<String> data = new ArrayList<String>();
            data = ConsultaBD("SELECT * FROM Rubro", "nombre");
            String[] array = data.toArray(new String[0]);
            ArrayAdapter NoCoreAdapter = new ArrayAdapter(this,
                    android.R.layout.simple_list_item_1, data);
            spinnerRubro.setAdapter(NoCoreAdapter);

        spinnerRubro.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                String name = spinnerRubro.getSelectedItem().toString();
                Toast.makeText(BusquedaEntidades.this, name, Toast.LENGTH_SHORT)
                        .show();
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
    }


    public ArrayList<String> ConsultaBD (String consulta, String columna) {
        ArrayList<String> data = new ArrayList<String>();
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(consulta);
            while (resultSet.next()) {
                String id = resultSet.getString(columna);
                data.add(id);
            }
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return data;
    }

}