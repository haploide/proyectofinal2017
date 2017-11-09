package com.example.ld.mapa;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MapaBusqueda extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private Button boton;
    private List<Address> address;
    Spinner spinnerRubro, spinnerProvinvcia, spinnerCiudad;
    ArrayList<String> data;
    ConsultaABD bd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.busqueda_mapa);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        /** mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
             @Override
             public boolean onMarkerClick(Marker marker) {
                 int position = (int)(marker.getTag());
                 Toast.makeText(MapaBusqueda.this, marker.getTitle(),Toast.LENGTH_LONG).show();
                 return false;
             }
         });
**/

        spinnerRubro = (Spinner) findViewById(R.id.spinnerRubros);
        spinnerProvinvcia = (Spinner) findViewById(R.id.spinnerProvincia);
        spinnerCiudad = (Spinner) findViewById(R.id.spinnerCiudad);
        boton = (Button) findViewById(R.id.button1);

        // Ocultar el teclado
        // InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        // imm.hideSoftInputFromWindow(input.getWindowToken(), 0);

        boton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String consulta = GenerarConsulta();
                //String nombre = "";
                ArrayList<NombreDireccion> data2;
                bd = new ConsultaABD();
                data2 = bd.ConsultaBDNombreDireccion(consulta);
                BuscarEnMapa(data2);
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
                    Toast.makeText(MapaBusqueda.this, name, Toast.LENGTH_SHORT)
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
                    Toast.makeText(MapaBusqueda.this, name, Toast.LENGTH_SHORT)
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


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */

    private void BuscarEnMapa(ArrayList<NombreDireccion> nombreDireccion)
    {
        mMap.clear();
        if(nombreDireccion.size()==0){
            Toast.makeText(MapaBusqueda.this, "No hay dirección para buscar", Toast.LENGTH_SHORT).show();
        }else{

            //Toast.makeText(MapaBusqueda.this, "Buscando " +direccion+ " ", Toast.LENGTH_SHORT).show();
            Geocoder coder = new Geocoder(getApplicationContext());
                double lat;
                double lon;
                LatLng ciudad = new LatLng(0, 0);
                Address location = null;
//HAY UN PROBLEMA CUANDO BUSCA DATOS DE DOS CIUDADES DIFERENTES - CUANDO CAMBIA DE UNA CIUDAD
            //A OTRA NO ENCUENTRA ESA DIRECCIÓN, PERO SI EL RESTO
                for (int i = 0; i< nombreDireccion.size(); i++){
                    try {
                        address = coder.getFromLocationName(nombreDireccion.get(i).getDireccion(),1);
                        location = address.get(0);
                        lat = location.getLatitude();
                        lon = location.getLongitude();
                        ciudad = new LatLng(lat, lon);
                        mMap.addMarker(new MarkerOptions().position(ciudad).title(nombreDireccion.get(i).getNombre()));
                    } catch (Exception ex){
                        Toast.makeText(MapaBusqueda.this, "No se ha encontrado la direccion: " + location , Toast.LENGTH_LONG).show();
                    }

                }
                mMap.moveCamera(CameraUpdateFactory.newLatLng(ciudad));
                mMap.animateCamera( CameraUpdateFactory.zoomTo( 13.0f ) );

        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Add a marker in Cordoba and move the camera
        LatLng cordoba = new LatLng(-31.420006, -64.188667);
        //mMap.addMarker(new MarkerOptions().position(cordoba).title("Córdoba"));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(cordoba));
        mMap.animateCamera( CameraUpdateFactory.zoomTo( 14.0f ) );
    }


    private String GenerarConsulta(){
        String consulta = "SELECT CONCAT(e.razonSocial, ' (',r.nombre,')') as razonSocial, CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia ";
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
        consulta = consulta + " ORDER BY c.nombre";
        return consulta;
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
        data = bd.ConsultaBDSinSeleccione("SELECT * FROM Provincia", "nombre");
        String[] array = data.toArray(new String[0]);
        ArrayAdapter provinciaAdapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, data);
        spinnerProvinvcia.setAdapter(provinciaAdapter);
        spinnerProvinvcia.setSelection((provinciaAdapter.getPosition("Córdoba")));

    }

    private void LlenarSpinnerCiudad(String provincia){
        //definiciones para completar el spinner
        data = new ArrayList<String>();
        bd = new ConsultaABD();
        String consulta = "SELECT * FROM Ciudad c INNER JOIN Provincia p ON c.idProvincia = p.idProvincia WHERE p.nombre = '"+ provincia + "'";
        data = bd.ConsultaBD(consulta, "nombre");
        String[] array = data.toArray(new String[0]);
        ArrayAdapter ciudadAdapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, data);
        spinnerCiudad.setAdapter(ciudadAdapter);
        //Si la provincia es córdoba, que por defecto seleccione Capital
        if (provincia.equals("Córdoba")){
            spinnerCiudad.setSelection((ciudadAdapter.getPosition("Capital")));

        }

    }

}
