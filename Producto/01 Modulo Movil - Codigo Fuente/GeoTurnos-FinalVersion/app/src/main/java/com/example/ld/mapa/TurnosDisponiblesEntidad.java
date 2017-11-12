package com.example.ld.mapa;

import android.app.DatePickerDialog;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ld.mapa.ClasesSoporte.GridAdapter;
import com.example.ld.mapa.ClasesSoporte.NombreDireccion;

import org.w3c.dom.Text;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by ld on 11/11/17.
 */

public class TurnosDisponiblesEntidad extends FragmentActivity {
    private EditText fechaDesde, fechaHasta;
    private DatePickerDialog datePickerDialog;
    private ImageView logo;
    private TextView nombreEmpresa, rubro;
    //private GridView gridTurnos;
    //private GridAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.turnos_disponibles_entidad);
        logo = (ImageView) findViewById(R.id.logo);
        nombreEmpresa = (TextView) findViewById(R.id.txtnombreEmpresa);
        rubro = (TextView) findViewById(R.id.txtRubro);
        fechaDesde = (EditText) findViewById(R.id.txtFechaDesde);
        fechaHasta = (EditText) findViewById(R.id.txtFechaHasta);
        //gridTurnos = (GridView) findViewById(R.id.gridTurnos);

        //obtenemos la fecha actual y se la asignamos a los EditText
        Calendar c = Calendar.getInstance();
        SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = df.format(c.getTime());
        fechaDesde.setText(formattedDate);
        fechaHasta.setText(formattedDate);

        //Obtenemos el nombre de la razon social enviado desde la pantalla anterior y luego consultamos
        //a la BD para obtener el rubro y logo
        String razonSocial = getIntent().getExtras().getString("razonSocial");
        String consulta = "SELECT e.razonSocial, r.nombre as 'rubro', CONCAT(d.calle, ' ', d.altura , ', ', c.nombre, ', ', p.nombre, ', Argentina') as 'direccion',d.latitud, d.longitud, e.logoEmpresa, e.telefono, e.email, 0 as 'ranking' FROM Empresa e INNER JOIN Rubro r ON e.idRubro = r.idRubro INNER JOIN Domicilio d on e.idDomicilio = d.idDomicilio INNER JOIN Barrio b on d.idBarrio = b.idBarrio INNER JOIN Ciudad c on b.idCiudad = c.idCiudad INNER JOIN Provincia p on c.idProvincia = p.idProvincia  WHERE e.razonSocial = '"+razonSocial+"'";
        ConsultaABD bd = new ConsultaABD();
        final NombreDireccion nombreDireccion = new NombreDireccion();
        ArrayList<NombreDireccion> data;
        data = bd.ConsultaBDNombreRubroDireccionLogoDireccionTelefonoRanking(consulta);
        if (data.size()!=0)
        {
            logo.setImageBitmap(data.get(0).getLogo());
            nombreEmpresa.setText(data.get(0).getNombre());
            rubro.setText(data.get(0).getRubro());
        }

        //LlenarGrillaTurnos();
        try {
            LlenarTablaTurnos();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        fechaDesde.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               seleccionarFecha(fechaDesde);

                /**
                SimpleDateFormat curFormater = new SimpleDateFormat("dd/MM/yyyy");
                Date dateDesde = null;
                Date dateHasta = null;
                try {
                    dateDesde = curFormater.parse(fechaDesde.getText().toString());
                    dateHasta = curFormater.parse(fechaHasta.getText().toString());
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                if (dateHasta.before(dateDesde)) {
                    fechaHasta.setText(fechaDesde.getText());
                } */
            }
        });

        fechaHasta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                seleccionarFecha(fechaHasta);
            }
        });
       /** if (gridTurnos.getCount() != 0) {
            gridTurnos.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(TurnosDisponiblesEntidad.this, "Turno Seleccionado", Toast.LENGTH_SHORT).show();
                }

            });
        }*/
    }

    private void seleccionarFecha(final EditText date)
    {
        // calender class's instance and get current date , month and year from calender
        final Calendar c = Calendar.getInstance();
        int mYear = c.get(Calendar.YEAR); // current year
        int mMonth = c.get(Calendar.MONTH); // current month
        int mDay = c.get(Calendar.DAY_OF_MONTH); // current day
        // date picker dialog
        datePickerDialog = new DatePickerDialog(TurnosDisponiblesEntidad.this,
                new DatePickerDialog.OnDateSetListener() {

                    @Override
                    public void onDateSet(DatePicker view, int year,
                                          int monthOfYear, int dayOfMonth) {
                        // set day of month , month and year value in the edit text
                        date.setText(dayOfMonth + "/"
                                + (monthOfYear + 1) + "/" + year);

                    }
                }, mYear, mMonth, mDay);
        datePickerDialog.show();
    }

    private void LlenarTablaTurnos() throws ParseException {
        //TableRow.LayoutParams wrapWrapTableRowParams = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT, TableRow.LayoutParams.WRAP_CONTENT);

        int[] fixedColumnWidths = new int[]{18, 12, 12, 12, 12, 12, 12, 12};
        int[] scrollableColumnWidths = new int[]{15, 12, 12, 12, 12, 12, 12, 12};
        int fixedRowHeight = 60;
        int fixedHeaderHeight = 80;

        TableRow row = new TableRow(this);
        //header (fixed vertically)
        TableLayout header = (TableLayout) findViewById(R.id.table_header);
       //row.setLayoutParams(wrapWrapTableRowParams);
        row.setGravity(Gravity.CENTER);
        row.setBackgroundColor(Color.BLUE);
        row.addView(makeTableRowWithText("Hora", fixedColumnWidths[0], fixedHeaderHeight));
        row.addView(makeTableRowWithText("L", fixedColumnWidths[1], fixedHeaderHeight));
        row.addView(makeTableRowWithText("M", fixedColumnWidths[2], fixedHeaderHeight));
        row.addView(makeTableRowWithText("M", fixedColumnWidths[3], fixedHeaderHeight));
        row.addView(makeTableRowWithText("J", fixedColumnWidths[4], fixedHeaderHeight));
        row.addView(makeTableRowWithText("V", fixedColumnWidths[5], fixedHeaderHeight));
        row.addView(makeTableRowWithText("S", fixedColumnWidths[6], fixedHeaderHeight));
        row.addView(makeTableRowWithText("D", fixedColumnWidths[7], fixedHeaderHeight));
        header.addView(row);
        //header (fixed horizontally)
        TableLayout fixedColumn = (TableLayout) findViewById(R.id.fixed_column);
        //rest of the table (within a scroll view)
        TableLayout scrollablePart = (TableLayout) findViewById(R.id.scrollable_part);

        SimpleDateFormat formato = new SimpleDateFormat("HH:mm");
        String horaActual = "00:00";
        Integer hora, minuto, incremento;
        hora = 00;
        minuto = 00;
        incremento = 30;
        for(int i = 0; i < 48; i++) {
            horaActual = hora.toString()+":"+minuto.toString();
            TextView fixedView = makeTableRowWithText(horaActual, scrollableColumnWidths[0], fixedRowHeight);
            fixedView.setBackgroundColor(Color.BLUE);
            fixedColumn.addView(fixedView);
            row = new TableRow(this);
        //    row.setLayoutParams(wrapWrapTableRowParams);
            row.setGravity(Gravity.CENTER);
            row.setBackgroundColor(Color.WHITE);
            row.addView(makeTableRowWithText("N", scrollableColumnWidths[1], fixedRowHeight));
            row.addView(makeTableRowWithText("N", scrollableColumnWidths[2], fixedRowHeight));
            row.addView(makeTableRowWithText("Y", scrollableColumnWidths[3], fixedRowHeight));
            row.addView(makeTableRowWithText("N", scrollableColumnWidths[4], fixedRowHeight));
            row.addView(makeTableRowWithText("Y", scrollableColumnWidths[5], fixedRowHeight));
            row.addView(makeTableRowWithText("Y", scrollableColumnWidths[6], fixedRowHeight));
            row.addView(makeTableRowWithText("Y", scrollableColumnWidths[7], fixedRowHeight));
            scrollablePart.addView(row);

            minuto = minuto + incremento;
            if (minuto == 60){
                hora++;
                minuto = 0;
            }


        }

    }


    //util method
    private TextView recyclableTextView;

    public TextView makeTableRowWithText(String text, int widthInPercentOfScreenWidth, int fixedHeightInPixels) {
        int screenWidth = getResources().getDisplayMetrics().widthPixels;
        recyclableTextView = new TextView(this);
        recyclableTextView.setText(text);
        recyclableTextView.setTextColor(Color.BLACK);
        recyclableTextView.setTextSize(20);
        recyclableTextView.setWidth(widthInPercentOfScreenWidth * screenWidth / 100);
        recyclableTextView.setHeight(fixedHeightInPixels);
        return recyclableTextView;
    }

}