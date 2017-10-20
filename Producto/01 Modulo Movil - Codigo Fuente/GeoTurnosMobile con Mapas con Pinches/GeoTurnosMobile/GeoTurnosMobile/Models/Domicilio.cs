using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTurnosMobile.Models
{
    public partial class Domicilio
    {
        public int idDomicilio { get; set; }
        public string calle { get; set; }
        public int altura { get; set; }
        public Nullable<int> piso { get; set; }
        public string departamento { get; set; }
        public string torre { get; set; }
        public Nullable<decimal> latitud { get; set; }
        public Nullable<decimal> longitud { get; set; }
        public Nullable<int> idBarrio { get; set; }

        //public virtual Barrio Barrio { get; set; }
    }
}
