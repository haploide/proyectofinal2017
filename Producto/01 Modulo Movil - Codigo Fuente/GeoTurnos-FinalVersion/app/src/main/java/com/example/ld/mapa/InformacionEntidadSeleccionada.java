package com.example.ld.mapa;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;

import java.util.ArrayList;

/**
 * Created by ld on 7/11/17.
 */

public class InformacionEntidadSeleccionada extends FragmentActivity {
    private ImageView logo;
    private TextView nombreEmpresa;
    private TextView rubro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.informacion_entidad_seleccionada);
        logo = (ImageView) findViewById(R.id.logo);
        nombreEmpresa = (TextView) findViewById(R.id.txtnombreEmpresa);
        rubro = (TextView) findViewById(R.id.txtRubro);
        String consulta = "SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion', e.logoEmpresa FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia ";
        String where = " WHERE e.razonSocial = '";
         where = where + getIntent().getExtras().getString("razonSocial");
         where = where + "'";
        consulta = consulta + where;
        ConsultaABD bd = new ConsultaABD();
        NombreDireccion nombreDireccion = new NombreDireccion();
        ArrayList<NombreDireccion> data = new ArrayList<NombreDireccion>();
        data = bd.ConsultaBDNombreRubroDireccionLogo(consulta);
        if (data.size()!=0)
        {

            logo.setImageBitmap(data.get(0).getLogo());
            nombreEmpresa.setText( data.get(0).getNombre());
            rubro.setText(data.get(0).getRubro());

        }
    }
}
