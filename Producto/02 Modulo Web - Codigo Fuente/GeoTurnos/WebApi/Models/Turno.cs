//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Turno
    {
        public int idTurno { get; set; }
        public int idAgenda { get; set; }
        public System.DateTime fecha { get; set; }
        public System.TimeSpan horaDesde { get; set; }
        public System.TimeSpan horaHasta { get; set; }
        public int idCliente { get; set; }
    
        public virtual Agenda Agenda { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}