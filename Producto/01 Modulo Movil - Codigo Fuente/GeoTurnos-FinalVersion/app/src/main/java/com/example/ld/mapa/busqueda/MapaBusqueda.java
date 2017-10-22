package com.example.ld.mapa.busqueda;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.ld.mapa.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.List;

public class MapaBusqueda extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private Button boton;
    private EditText input;
    private String direccion;
    private List<Address> address;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.busqueda_mapa);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        input = (EditText) findViewById(R.id.editText1);
        boton = (Button) findViewById(R.id.button1);


        boton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                direccion = input.getText().toString();

                if(direccion.equals("")){
                    Toast.makeText(MapaBusqueda.this, "No hay dirección para buscar", Toast.LENGTH_SHORT).show();

                }else{
                    Toast.makeText(MapaBusqueda.this, "Buscando " +direccion+ " ", Toast.LENGTH_SHORT).show();
                    Geocoder coder = new Geocoder(getApplicationContext());
                    try {
                        address = coder.getFromLocationName(direccion, 1);
                        Address location = address.get(0);
                        double lat = location.getLatitude();
                        double lon = location.getLongitude();
                        LatLng cordoba = new LatLng(lat, lon);
                        mMap.clear(); //si no queremos ver los pinches de los resultados de busqueda anterior
                        mMap.addMarker(new MarkerOptions().position(cordoba).title("Dirección Buscada"));
                        mMap.moveCamera(CameraUpdateFactory.newLatLng(cordoba));
                        mMap.animateCamera( CameraUpdateFactory.zoomTo( 16.0f ) );

                    } catch (IOException e) {
                        Toast.makeText(MapaBusqueda.this, "No se ha encontrado la dirección: " +direccion, Toast.LENGTH_SHORT).show();
                    }
                }
                // Ocultar el teclado
                InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(input.getWindowToken(), 0);

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

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Add a marker in Cordoba and move the camera
        LatLng cordoba = new LatLng(-31.420006, -64.188667);
        mMap.addMarker(new MarkerOptions().position(cordoba).title("Córdoba"));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(cordoba));
        mMap.animateCamera( CameraUpdateFactory.zoomTo( 14.0f ) );
    }
}
