using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTurnosMobile.Models
{
    class VistaFiltroEmpresa
        {
            public int idEmpresa { get; set; }
            public Nullable<decimal> cuit { get; set; }
            public string razonSocial { get; set; }
            public string telefono { get; set; }
            public byte[] logoEmpresa { get; set; }
            public string email { get; set; }
            public string nombre { get; set; }
            public Nullable<decimal> comentario { get; set; }
            public int altura { get; set; }
            public string calle { get; set; }
            public int idRubro { get; set; }
            public int idCiudad { get; set; }
            public int idProvincia { get; set; }
            public Nullable<int> id_direccion { get; set; }
            public Nullable<decimal> latitud { get; set; }
            public Nullable<decimal> longitud { get; set; }
        }

    
}
