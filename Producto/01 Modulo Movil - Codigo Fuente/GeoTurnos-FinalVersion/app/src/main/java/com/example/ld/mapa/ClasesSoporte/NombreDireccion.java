package com.example.ld.mapa.ClasesSoporte;

import android.graphics.Bitmap;
import android.widget.ImageView;

/**
 * Created by ld on 5/11/17.
 */

public class NombreDireccion {
    private String nombre;
    private String direccion;
    private Bitmap logo;
    private String rubro;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Bitmap getLogo() {
        return logo;
    }

    public void setLogo(Bitmap logo) {
        this.logo = logo;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }
}
