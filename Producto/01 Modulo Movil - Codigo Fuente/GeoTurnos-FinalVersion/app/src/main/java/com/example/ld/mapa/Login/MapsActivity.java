package com.example.ld.mapa.Login;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ld.mapa.R;
import com.example.ld.mapa.olvidoPassword.OlvidoPassword;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class MapsActivity extends FragmentActivity {

    EditText usuario,password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        usuario = (EditText) findViewById(R.id.txtUsuario);
        password = (EditText) findViewById(R.id.txtPassword);

        Button btnlogin = (Button) findViewById(R.id.btnLogin);
        TextView registrarse = (TextView) findViewById(R.id.lnkRegistrarse);
        TextView olvidoPassword = (TextView) findViewById(R.id.lnkOlvidoPassword);

        //clickea en el botón registrarse
        registrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent Registrarse = new Intent(getApplicationContext(), com.example.ld.mapa.registrarse.Registrarse.class);
                startActivity(Registrarse);
            }
        });

        //clickea en el boton Olvido contraseña
        olvidoPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent PasswordOlvidada = new Intent(getApplicationContext(), OlvidoPassword.class);
                startActivity(PasswordOlvidada);
            }
        });

        //clickea en el boton login
        btnlogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    Class.forName("net.sourceforge.jtds.jdbc.Driver");
                    String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
                    Connection connection = DriverManager.getConnection(cn);
                    Statement statement = connection.createStatement();
                    String consulta = "SELECT idUsuario FROM Usuario WHERE usuario='"+usuario.getText().toString()+"' AND contraseña='"+bin2hex(getHash(password.getText().toString()))+"'";
                    ResultSet resulset = statement.executeQuery(consulta);

                    //si hay un registro de vuelta significa que matcheó el usuario y password, y nos lleva a la pantalla principal
                    if (resulset.next()) {
                        Intent PantallaPrincipal = new Intent(getApplicationContext(), com.example.ld.mapa.pantallaPrincipal.PantallaPrincipal.class);
                        startActivity(PantallaPrincipal);
                    } else {
                        Toast.makeText(MapsActivity.this, "Usuario o contraseña incorrectos", Toast.LENGTH_SHORT).show();
                    }
                   } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                } catch (SQLException e) {
                    e.printStackTrace();
                }

            }

        });
    }

    //metodo para calcular el hash SHA-256 de la contraseña
    public byte[] getHash(String password) {
        MessageDigest digest=null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        digest.reset();
        return digest.digest(password.getBytes());
    }
    static String bin2hex(byte[] data) {
        return String.format("%0" + (data.length*2) + "X", new BigInteger(1, data));
    }

}
