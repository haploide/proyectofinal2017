package com.example.ld.mapa;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.support.v4.app.ActionBarDrawerToggle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SimpleCursorAdapter;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.webkit.WebHistoryItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;
import com.example.ld.mapa.R;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;


/**
 * Created by ld on 21/10/17.
 */

public class BusquedaEntidades extends ActionBarActivity {

    private String[] mPlanetTitles;
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    Spinner spinnerRubro, spinnerProvinvcia, spinnerCiudad;
    ArrayList<String> data;
    ArrayList<NombreDireccion> data2;
    ListView lstentidades;
    ConsultaABD bd;
    List<HashMap<String,String>> listItems;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.busqueda_entidades);
        spinnerRubro = (Spinner) findViewById(R.id.spinnerRubros);
        spinnerProvinvcia = (Spinner) findViewById(R.id.spinnerProvincia);
        spinnerCiudad = (Spinner) findViewById(R.id.spinnerCiudad);
        lstentidades = (ListView) findViewById(R.id.lstEntidades);

        //accion del boton buscar Entidad
        Button btnBuscarEntidades = (Button) findViewById(R.id.btnBuscarEntidades);
        btnBuscarEntidades.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String consulta = "SELECT e.razonSocial, CONCAT(d.calle, ' ', d.altura , ', ', p.nombre, ', ', c.nombre) as 'direccion' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia ";
                String where1 = "";
                String where2 = "";
                String where3 = "";
                String nroWhere = "0";
                //nroWhere: a cada Spinner se le asigna un número que me permita armar la consulta final en función a lo que se ha
                //seleccionado
                if (!spinnerRubro.getSelectedItem().toString().equals("<Seleccione>")) {
                    where1 = " r.nombre = '"+spinnerRubro.getSelectedItem().toString()+"'";
                    nroWhere =  nroWhere + "1";
                }

                if (!spinnerProvinvcia.getSelectedItem().toString().equals("<Seleccione>")) {
                    where2 = " p.nombre = '"+spinnerProvinvcia.getSelectedItem().toString()+"'";
                    nroWhere =  nroWhere + "2";
                    if (!spinnerCiudad.getSelectedItem().toString().equals("<Seleccione>")) {
                        where3 = " c.nombre = '"+spinnerCiudad.getSelectedItem().toString()+"'";
                        nroWhere =  nroWhere + "3";
                    }
                }


                int nro = 0;
                try {
                    nro = Integer.parseInt(nroWhere); //transformo en integer a nroWhere para saber que spinner están seleccionados
                } catch(NumberFormatException nfe) {}

                //creamos la consulta en funcion a los spinner seleccionados
                switch (nro){
                    case 1: consulta = consulta + " WHERE " + where1; break;
                    case 2: consulta = consulta + " WHERE " + where2; break;
                    //case 3: consulta = consulta + " WHERE " + where3; break;
                    case 12: consulta = consulta + " WHERE " + where1 + " AND " + where2; break;
                    //case 13: consulta = consulta + " WHERE " + where1 + " AND " + where3; break;
                    case 23: consulta = consulta + " WHERE " + where2 + " AND " + where3; break;
                    case 123: consulta = consulta + " WHERE " + where1 + " AND " + where2 + " AND " + where3; break;

                }

                LlenarListaEntidades(consulta);
            }
        });

        //accion del botón buscar en el mapa
        Button btnBuscarEnMapa = (Button) findViewById(R.id.btnBuscarEnMapa);
        btnBuscarEnMapa.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {
                Intent Buscar = new Intent(getApplicationContext(), MapaBusqueda.class);
                startActivity(Buscar);
            }
        });

        //llenar Spinner Rubro
        if (spinnerRubro.getCount() == 0) {
           LlenarSpinnerRubro();
        }

        //Llenar spinner Provincia
        if (spinnerProvinvcia.getCount() == 0)
        {
           LlenarSpinnerProvincia();
        }

        spinnerRubro.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                if (!spinnerRubro.getSelectedItem().toString().equals("<Seleccione>")) {
                    String name = spinnerRubro.getSelectedItem().toString();
                    Toast.makeText(BusquedaEntidades.this, name, Toast.LENGTH_SHORT)
                            .show();
                }

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }

        });

        spinnerProvinvcia.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                if (!spinnerProvinvcia.getSelectedItem().toString().equals("<Seleccione>")) {
                    String name = spinnerProvinvcia.getSelectedItem().toString();
                    Toast.makeText(BusquedaEntidades.this, name, Toast.LENGTH_SHORT)
                            .show();
                    LlenarSpinnerCiudad(name);
                    spinnerCiudad.setEnabled(true);
                } else {
                    spinnerCiudad.setEnabled(false);

                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }

        });
    }

    private void LlenarSpinnerRubro(){
        //definiciones para completar el spinner
        data = new ArrayList<String>();
        bd = new ConsultaABD();
        data = bd.ConsultaBD("SELECT * FROM Rubro", "nombre");
        String[] array = data.toArray(new String[0]);
        ArrayAdapter rubroAdapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, data);
        spinnerRubro.setAdapter(rubroAdapter);
    }

    private void LlenarSpinnerProvincia(){
        //definiciones para completar el spinner
        data = new ArrayList<String>();
        bd = new ConsultaABD();
        data = bd.ConsultaBD("SELECT * FROM Provincia", "nombre");
        String[] array = data.toArray(new String[0]);
        ArrayAdapter provinciaAdapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, data);
        spinnerProvinvcia.setAdapter(provinciaAdapter);

    }

    private void LlenarSpinnerCiudad(String provincia){
        //definiciones para completar el spinner
        data = new ArrayList<String>();
        bd = new ConsultaABD();
        String consulta = "SELECT * FROM Ciudad c INNER JOIN Provincia p ON c.idProvincia = p.idProvincia WHERE p.nombre = '"+ provincia + "'";
        data = bd.ConsultaBD(consulta, "nombre");
        String[] array = data.toArray(new String[0]);
        ArrayAdapter provinciaAdapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, data);
        spinnerCiudad.setAdapter(provinciaAdapter);

    }

    private void LlenarListaEntidades(String consulta) {
        listItems = new ArrayList<>();
        bd = new ConsultaABD();
        data2 = new ArrayList<NombreDireccion>();
        data2 = bd.ConsultaBDNombreDireccion(consulta);

        SimpleAdapter adapter = new SimpleAdapter(this, listItems, R.layout.list_item_listview,
                new String[]{"First Line", "Second line"},
                new int[]{R.id.texto1, R.id.texto2});

        for (int i = 0; i< data2.size(); i++){
            HashMap<String,String> resultMap = new HashMap<>();
            NombreDireccion nombreDir = new NombreDireccion();
            nombreDir = data2.get(i);
            //Map.Entry pair = (Map.Entry)it.next();
            resultMap.put("First Line", nombreDir.getNombre());
            resultMap.put("Second line", nombreDir.getDireccion());
            listItems.add(resultMap);
        }
        lstentidades.setAdapter(adapter);
    }

}