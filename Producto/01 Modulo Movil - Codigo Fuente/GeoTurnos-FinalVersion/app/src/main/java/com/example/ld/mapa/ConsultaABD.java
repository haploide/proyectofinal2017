package com.example.ld.mapa;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * Created by ld on 5/11/17.
 */

public class ConsultaABD {

    public ArrayList ConsultaBD (String consulta, String columna) {
        ArrayList<String> data = new ArrayList<String>();
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(consulta);
            while (resultSet.next()) {
                String id = resultSet.getString(columna);
                data.add(id);
            }
            data.add(0, "<Seleccione>");
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return data;
    }

    public ArrayList ConsultaBDSinSeleccione (String consulta, String columna) {
        ArrayList<String> data = new ArrayList<String>();
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(consulta);
            while (resultSet.next()) {
                String id = resultSet.getString(columna);
                data.add(id);
            }
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return data;
    }

    public ArrayList ConsultaBDNombreDireccion (String consulta) {
        ArrayList<NombreDireccion> data = new ArrayList<NombreDireccion>();
        NombreDireccion nombreDireccion;
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(consulta);
            while (resultSet.next()) {
                nombreDireccion = new NombreDireccion();
                nombreDireccion.setNombre(resultSet.getString("razonSocial"));
                nombreDireccion.setDireccion(resultSet.getString("Direccion"));
                data.add(nombreDireccion);
            }
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return data;
    }

    public ArrayList ConsultaBDNombreRubroDireccionLogoDireccionTelefonoRanking (String consulta) {
        ArrayList<NombreDireccion> data = new ArrayList<NombreDireccion>();
        NombreDireccion nombreDireccion;
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(consulta);
            while (resultSet.next()) {
                nombreDireccion = new NombreDireccion();
                nombreDireccion.setNombre(resultSet.getString("razonSocial"));
                nombreDireccion.setDireccion(resultSet.getString("Direccion"));
                nombreDireccion.setEmail(resultSet.getString("email"));
                nombreDireccion.setTelefono(resultSet.getString("telefono"));
                nombreDireccion.setRanking(resultSet.getFloat("ranking"));
                //convertimos la imagen a bitmap para asignarsela al ImageView
                Blob b =resultSet.getBlob("logoEmpresa");
                int blobLength = (int) b.length();
                byte[] blobAsBytes = b.getBytes(1, blobLength);
                Bitmap btm =BitmapFactory.decodeByteArray(blobAsBytes,0,blobAsBytes.length);
                nombreDireccion.setLogo(btm);
                nombreDireccion.setRubro(resultSet.getString("rubro"));
                data.add(nombreDireccion);

            }
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return data;
    }
}
