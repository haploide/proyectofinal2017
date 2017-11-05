package com.example.ld.mapa;

import com.example.ld.mapa.ClasesSoporte.NombreDireccion;

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
}
