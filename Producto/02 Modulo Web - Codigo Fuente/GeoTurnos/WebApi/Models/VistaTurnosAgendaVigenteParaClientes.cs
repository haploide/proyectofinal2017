
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
    
public partial class VistaTurnosAgendaVigenteParaClientes
{

    public int idAgenda { get; set; }

    public int mes { get; set; }

    public int año { get; set; }

    public int idEmpresa { get; set; }

    public int idEstado { get; set; }

    public Nullable<int> idTurno { get; set; }

    public Nullable<System.DateTime> fecha { get; set; }

    public Nullable<System.TimeSpan> horaDesde { get; set; }

    public Nullable<System.TimeSpan> horaHasta { get; set; }

    public Nullable<int> idCliente { get; set; }

    public string razonSocial { get; set; }

    public string nombre { get; set; }

}

}
