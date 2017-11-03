package com.example.ld.mapa;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.SimpleExpandableListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class MisTurnos extends ActionBarActivity {
    ListView turnos;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mis_turnos);


        Button btnTurnos = (Button) findViewById(R.id.btnVolver);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        String consulta="";
        ResultSet resulset;

        String valor = getIntent().getExtras().getString("idUsuario");//traigo el usuario para conocer sus turnos
        //Toast.makeText(this, valor, Toast.LENGTH_LONG).show();

        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();

            //consulta = "SELECT FORMAT(T1.fecha,'dd/MM/yyyy') as fecha, CONVERT(varchar(5),horaDesde,108) as horaDesde, CONVERT(varchar(5),horaHasta,108) as horaHasta, razonSocial FROM Turno T1 JOIN Agenda T2 ON T1.idAgenda=T2.idAgenda JOIN Empresa T3 ON T2.idEmpresa=T3.idEmpresa JOIN Cliente T4 ON T1.idCliente=T4.idCliente WHERE T4.idUsuario=23";
            consulta = "SELECT FORMAT(T1.fecha,'dd/MM/yyyy') as fecha, CONVERT(varchar(5),horaDesde,108) as horaDesde, CONVERT(varchar(5),horaHasta,108) as horaHasta, razonSocial FROM Turno T1 JOIN Agenda T2 ON T1.idAgenda=T2.idAgenda JOIN Empresa T3 ON T2.idEmpresa=T3.idEmpresa JOIN Cliente T4 ON T1.idCliente=T4.idCliente WHERE T4.idUsuario='"+valor.toString()+"'";

            resulset = statement.executeQuery(consulta);

            turnos=(ListView) findViewById(R.id.lstTurnos);

            ArrayList valores=new ArrayList();


            int b=0;
            for (int i=0;resulset.next();i++){
                b=1;
                //Toast.makeText(this, "Entro al FOR", Toast.LENGTH_LONG).show();
                valores.add(resulset.getString("razonSocial") + " " + resulset.getString("fecha") + " "  +resulset.getString("horaDesde") + " a " + resulset.getString("horaHasta"));

                ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_expandable_list_item_1, valores);
                turnos.setAdapter(adapter);

             }

             if(b==0){
                Toast.makeText(this, "Usted todavía no a solicitado ningun turno", Toast.LENGTH_LONG).show();

            }



        } catch ( ClassNotFoundException e){

        } catch (SQLException e){

        }

        btnTurnos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent PantallaPrincipal = new Intent(getApplicationContext(), PantallaPrincipal.class);
                String valor = getIntent().getExtras().getString("idUsuario");
                PantallaPrincipal.putExtra("idUsuario",valor);
                startActivity(PantallaPrincipal);
            }
        });
    }
}