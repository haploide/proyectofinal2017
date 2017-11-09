package com.example.ld.mapa;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;

import java.util.ArrayList;

/**
 * Created by ld on 7/11/17.
 */

public class InformacionEntidadSeleccionada extends FragmentActivity {
    private ImageView logo;
    private Button btnAgenda;
    private TextView nombreEmpresa, rubro, telefono, email, direccion;
    private RatingBar ratingBar;
    //private TextView rubro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.informacion_entidad_seleccionada);
        logo = (ImageView) findViewById(R.id.logo);
        btnAgenda = (Button) findViewById(R.id.btnAgenda);
        nombreEmpresa = (TextView) findViewById(R.id.txtnombreEmpresa);
        rubro = (TextView) findViewById(R.id.txtRubro);
        telefono = (TextView) findViewById(R.id.txtNroTelefono);
        email = (TextView) findViewById(R.id.txtEmail);
        direccion = (TextView) findViewById(R.id.txtDireccion);
        ratingBar = (RatingBar) findViewById(R.id.ratingBar);
        //String consulta = "SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion', e.logoEmpresa, e.telefono, e.email, 4 as 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia ";
        String where = " WHERE e.razonSocial = '";
        String where2 = " WHERE em.razonSocial = '";
        where = where + getIntent().getExtras().getString("razonSocial");
        where2 = where2 + getIntent().getExtras().getString("razonSocial");
         where = where + "' ";
        where2 = where2 + "' ";
        //CONSULTA MONSTRUOSA QUE OBTIENE Razon Social, Rubro, Domicilio, Logo, Telefono, Email y ranking (si
        //ya tiene calificaciones, sino es 0)
        String consulta = "IF (SELECT em.razonSocial FROM empresa em INNER JOIN comentarios co ON em.idEmpresa = co.id_empresa " + where2 + "GROUP BY em.razonSocial) <> '' (SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion', e.logoEmpresa, e.telefono, e.email, AVG (com.nro) 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia INNER JOIN Comentarios com on e.idEmpresa = com.id_empresa" +where+ "GROUP BY e.razonSocial, r.nombre, d.calle, d.altura, c.nombre, p.nombre, e.logoEmpresa, e.telefono, e.email); ELSE (SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion', e.logoEmpresa, e.telefono, e.email, 0 as 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia" + where +");";
        //consulta = consulta + where;
        ConsultaABD bd = new ConsultaABD();
        NombreDireccion nombreDireccion = new NombreDireccion();
        ArrayList<NombreDireccion> data = new ArrayList<NombreDireccion>();
        data = bd.ConsultaBDNombreRubroDireccionLogoDireccionTelefonoRanking(consulta);
        if (data.size()!=0)
        {

            logo.setImageBitmap(data.get(0).getLogo());
            nombreEmpresa.setText( data.get(0).getNombre());
            rubro.setText(data.get(0).getRubro());
            telefono.setText(data.get(0).getTelefono());
            email.setText(data.get(0).getEmail());
            direccion.setText(data.get(0).getDireccion());
            ratingBar.setRating(data.get(0).getRanking());

        }

        btnAgenda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(InformacionEntidadSeleccionada.this, "Abrir agenda", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
