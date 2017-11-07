package com.example.ld.mapa.ClasesSoporte;

import android.support.v4.app.FragmentActivity;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

/**
 * Created by ld on 6/11/17.
 */

public class CargaMapa extends FragmentActivity implements OnMapReadyCallback {

    public GoogleMap mMap;

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