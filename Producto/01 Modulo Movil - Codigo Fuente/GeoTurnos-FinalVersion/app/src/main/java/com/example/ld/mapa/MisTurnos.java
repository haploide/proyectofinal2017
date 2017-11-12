package com.example.ld.mapa;

import android.content.Intent;
import android.media.Image;
import android.os.StrictMode;
import android.provider.CalendarContract;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

import static com.example.ld.mapa.R.id.btnCalendar;

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
                    final ResultSet resulset;

                    String valor = getIntent().getExtras().getString("idUsuario");//traigo el usuario para conocer sus turnos
                    Button btnCalendar = (Button)findViewById(R.id.btnCalendar); //Agregar evento al calendario
                    btnCalendar.setEnabled(false);
                    try {
                        Class.forName("net.sourceforge.jtds.jdbc.Driver");
                        String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
                        Connection connection = DriverManager.getConnection(cn);
                        Statement statement = connection.createStatement();

                        //consulta = "SELECT FORMAT(T1.fecha,'dd/MM/yyyy') as fecha, CONVERT(varchar(5),horaDesde,108) as horaDesde, CONVERT(varchar(5),horaHasta,108) as horaHasta, razonSocial FROM Turno T1 JOIN Agenda T2 ON T1.idAgenda=T2.idAgenda JOIN Empresa T3 ON T2.idEmpresa=T3.idEmpresa JOIN Cliente T4 ON T1.idCliente=T4.idCliente WHERE T4.idUsuario=23";
                        consulta = "SELECT FORMAT(T1.fecha,'dd-MM-yyyy') as fecha, CONVERT(varchar(5),horaDesde,108) as horaDesde, CONVERT(varchar(5),horaHasta,108) as horaHasta, razonSocial FROM Turno T1 JOIN Agenda T2 ON T1.idAgenda=T2.idAgenda JOIN Empresa T3 ON T2.idEmpresa=T3.idEmpresa JOIN Cliente T4 ON T1.idCliente=T4.idCliente WHERE T4.idUsuario='"+valor.toString()+"'";

                        resulset = statement.executeQuery(consulta);

                        turnos=(ListView) findViewById(R.id.lstTurnos);

                        ArrayList valores=new ArrayList();

                        int b=0;
                        for (int i=0;resulset.next();i++){

                            btnCalendar.setEnabled(true);
                            b=1;
                            valores.add(resulset.getString("razonSocial") + " " + resulset.getString("fecha") + " "  +resulset.getString("horaDesde") + " a " + resulset.getString("horaHasta"));
                            ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_expandable_list_item_1, valores);
                            turnos.setAdapter(adapter);

                            ///////AGREGAR AL CALENDARIO
                            final Date fechaCal;
                            String someDate= resulset.getString("fecha").toString();
                            SimpleDateFormat sdf=new SimpleDateFormat("dd-MM-yyyy");

                            try {
                                fechaCal = sdf.parse(someDate);
                                final String empresa= resulset.getString("razonSocial");
                                final String horaDesdeCal=resulset.getString("horaDesde").toString();
                                final String horaHastaCal=resulset.getString("horaHasta").toString();

                                //Toast.makeText(this, fechaCal.toString(), Toast.LENGTH_LONG).show();

                                btnCalendar.setOnClickListener(new View.OnClickListener(){
                                    @Override
                                    public  void onClick (View v){

                                        Calendar cal = Calendar.getInstance();
                                        Intent intent = new Intent(Intent.ACTION_EDIT);
                                        intent.setType("vnd.android.cursor.item/event");
                                        intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, fechaCal.getTime() );
                                        intent.putExtra("allDay", true);
                                        intent.putExtra("endTime", fechaCal.getTime());
                                        intent.putExtra("title", "Tienes un turno en: " + empresa + " de " + horaDesdeCal + " a " + horaHastaCal  );
                                        startActivity(intent);
                                    }
                                });
                            }catch (java.text.ParseException e){}
                            //////////








                        }
                        if(b==0){
                            Toast.makeText(this, "Usted no a solicitado ningun turno", Toast.LENGTH_LONG).show();
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