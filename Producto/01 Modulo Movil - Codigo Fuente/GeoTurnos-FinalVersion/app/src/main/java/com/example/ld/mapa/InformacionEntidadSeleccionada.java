package com.example.ld.mapa;

import android.content.Intent;
import android.graphics.Bitmap;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ld on 7/11/17.
 */

public class InformacionEntidadSeleccionada extends FragmentActivity implements OnMapReadyCallback {
    private ImageView logo;
    private Button btnAgenda;
    private TextView nombreEmpresa, rubro, telefono, email, direccion;
    private RatingBar ratingBar;
    private GoogleMap mMap;
    private Double lat=-31.420006;
    private Double lon = -64.188667;
    private String destino = "Cordoba";
    List<Address> address;
    private String direc = "";
    private String rubroEmpresa = "";
    private String razonSocialEmpresa = "";
    private Bitmap logoEmpresa = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.informacion_entidad_seleccionada);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        logo = (ImageView) findViewById(R.id.logo);
        btnAgenda = (Button) findViewById(R.id.btnAgenda);
        nombreEmpresa = (TextView) findViewById(R.id.txtnombreEmpresa);
        rubro = (TextView) findViewById(R.id.txtRubro);
        telefono = (TextView) findViewById(R.id.txtNroTelefono);
        email = (TextView) findViewById(R.id.txtEmail);
        direccion = (TextView) findViewById(R.id.txtDireccion);
        ratingBar = (RatingBar) findViewById(R.id.ratingBar);
        String where = getIntent().getExtras().getString("razonSocial");
        String consulta = "IF (SELECT em.razonSocial FROM empresa em INNER JOIN comentarios co ON em.idEmpresa = co.id_empresa  WHERE em.razonSocial = '" + where + "' GROUP BY em.razonSocial) <> '' (SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion', d.latitud, d.longitud, e.logoEmpresa, e.telefono, e.email, AVG (com.nro) 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia INNER JOIN Comentarios com on e.idEmpresa = com.id_empresa WHERE e.razonSocial = '" +where+ "' GROUP BY e.razonSocial, r.nombre, d.calle, d.altura, d.latitud, d.longitud,  c.nombre, p.nombre, e.logoEmpresa, e.telefono, e.email); ELSE (SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion',d.latitud, d.longitud, e.logoEmpresa, e.telefono, e.email, 0 as 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia  WHERE e.razonSocial = '" + where +"');";
        ConsultaABD bd = new ConsultaABD();
        final NombreDireccion nombreDireccion = new NombreDireccion();
        ArrayList<NombreDireccion> data = new ArrayList<NombreDireccion>();
        data = bd.ConsultaBDNombreRubroDireccionLogoDireccionTelefonoRanking(consulta);
        if (data.size()!=0)
        {
            logo.setImageBitmap(data.get(0).getLogo());
            logoEmpresa = data.get(0).getLogo();
            nombreEmpresa.setText(data.get(0).getNombre());
            razonSocialEmpresa = data.get(0).getNombre();
            destino = data.get(0).getNombre();
            rubro.setText(data.get(0).getRubro());
            rubroEmpresa = data.get(0).getRubro();
            telefono.setText(data.get(0).getTelefono());
            email.setText(data.get(0).getEmail());
            direccion.setText(data.get(0).getDireccion());
            direc=data.get(0).getDireccion();
            ratingBar.setRating(data.get(0).getRanking());
            if (data.get(0).getLatitud() != null && (data.get(0).getLongitud()!=null)) {
                lat = data.get(0).getLatitud();
                lon = data.get(0).getLongitud();
            }
        }

        btnAgenda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               // Toast.makeText(InformacionEntidadSeleccionada.this, "Abrir agenda", Toast.LENGTH_SHORT).show();
                Intent TurnosDisponibles = new Intent(getApplicationContext(), TurnosDisponiblesEntidad.class);
                TurnosDisponibles.putExtra("razonSocial",razonSocialEmpresa);
                startActivity(TurnosDisponibles);
            }
        });
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {

        mMap = googleMap;
        Geocoder coder = new Geocoder(getApplicationContext());
        try {
            address = coder.getFromLocationName(direc,1);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //lat = address.get(0).getLatitude();
        //lon = address.get(0).getLongitude();
        // Agregar marca sobre el destino seleccionado y movemos la camara
        LatLng entidad = new LatLng(lat, lon);
        mMap.addMarker(new MarkerOptions().position(entidad).title(destino));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(entidad));
        mMap.animateCamera(CameraUpdateFactory.zoomTo(16.0f));
    }
}
