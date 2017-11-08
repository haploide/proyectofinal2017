package com.example.ld.mapa;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v4.app.ActionBarDrawerToggle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * Created by ld on 21/10/17.
 */

public class PantallaPrincipal extends ActionBarActivity {

    private DrawerLayout drawerLayout;
    private ListView drawerList;
    private ActionBarDrawerToggle drawerToggle;
    private CharSequence activityTitle;
    private CharSequence itemTitle;
    private String[] tagTitles;
    private ImageView avatar;
    private TextView bienvenido;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pantalla_principal);

        itemTitle = activityTitle = getTitle();
        tagTitles = getResources().getStringArray(R.array.Tags);
        drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawerList = (ListView) findViewById(R.id.left_drawer);
        avatar=(ImageView) findViewById(R.id.avatar);
        bienvenido=(TextView)findViewById(R.id.lnkUsuario);

        // Setear una sombra sobre el contenido principal cuando el drawer se despliegue
        drawerLayout.setDrawerShadow(R.drawable.drawer_shadow, GravityCompat.START);

        //Crear elementos de la lista
        ArrayList<DrawerItem> items = new ArrayList<DrawerItem>();
        items.add(new DrawerItem(tagTitles[0], R.drawable.home));
        items.add(new DrawerItem(tagTitles[1], R.drawable.buscar));
        items.add(new DrawerItem(tagTitles[2], R.drawable.turno));
        items.add(new DrawerItem(tagTitles[3], R.drawable.logouts));


        // Relacionar el adaptador y la escucha de la lista del drawer
        drawerList.setAdapter(new DrawerListAdapter(this, items));
        drawerList.setOnItemClickListener(new DrawerItemClickListener());

        // Habilitar el icono de la app por si hay algún estilo que lo deshabilitó
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);

        // Crear ActionBarDrawerToggle para la apertura y cierre
        drawerToggle = new ActionBarDrawerToggle(
                this,
                drawerLayout,
                R.drawable.ic_drawer,
                R.string.drawer_open,
                R.string.drawer_close
        ) {};

        //Seteamos la escucha
        drawerLayout.setDrawerListener(drawerToggle);

        if (savedInstanceState == null) {
            selectItem(0);
        }


        Blob imagen=null;
        String valor = getIntent().getExtras().getString("idUsuario");
        String consulta="";
        ResultSet resulset;
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            String cn = "jdbc:jtds:sqlserver://geoturnos.com:49172;databaseName=GeoTurnos;user=geoturnos;password=Al1.B4b4-";
            Connection connection = DriverManager.getConnection(cn);
            Statement statement = connection.createStatement();
            consulta = "SELECT foto, usuario FROM Cliente T1 JOIN Usuario T2 ON T1.idUsuario=T2.idUsuario WHERE T1.idUsuario='"+valor.toString()+"'";
            resulset = statement.executeQuery(consulta);
            for (int i=0;resulset.next();i++){
                byte[] byteArray = resulset.getBytes("foto");
                Bitmap bm = BitmapFactory.decodeByteArray(byteArray, 0 ,byteArray.length);
                avatar.setImageBitmap(bm);
                bienvenido.setText(bienvenido.getText().toString() + resulset.getString("usuario"));

            }
        } catch ( ClassNotFoundException e){

        } catch (SQLException e){

        }
}

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        if (drawerToggle.onOptionsItemSelected(item)) {
            // Toma los eventos de selección del toggle aquí
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /* La escucha del ListView en el Drawer */
    private class DrawerItemClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            selectItem(position);
        }
    }

    private void selectItem(int position) {
        // Acciones al seleccionar un item
        //no se usa SWITCH CASE porque no permite comparar texto
        DrawerItem item = (DrawerItem) drawerList.getItemAtPosition(position);
        String nombreItem = ((DrawerItem) item).getName();
        if (nombreItem.equals("Logout")) {
                Intent PantallaLogin = new Intent(getApplicationContext(), MapsActivity.class);
                startActivity(PantallaLogin);
            } else if (nombreItem.equals("Buscar")) {
                Intent Buscar = new Intent(getApplicationContext(), BusquedaEntidades.class);
                startActivity(Buscar);
            } else if ((nombreItem.equals("Inicio") & !(itemTitle.equals("Pantalla Principal")))) {
                Intent Inicio = new Intent(getApplicationContext(), PantallaPrincipal.class);
                startActivity(Inicio);
            } else if ((nombreItem.equals("Mis Turnos"))) {
                Intent Turnos = new Intent(getApplicationContext(), MisTurnos.class);
                String valor = getIntent().getExtras().getString("idUsuario");
                Turnos.putExtra("idUsuario",valor);
                startActivity(Turnos);
            }


        drawerLayout.closeDrawer(drawerList);
    }

}