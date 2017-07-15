//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebSite.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Cliente
    {
        public int idCliente { get; set; }
        public Nullable<int> idTipoDocumento { get; set; }
        public Nullable<int> nroDocumento { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string telefono { get; set; }
        public byte[] foto { get; set; }
        public string email { get; set; }
        public Nullable<System.DateTime> fechaNacimiento { get; set; }
        public Nullable<int> idDomicilio { get; set; }
        public Nullable<int> idUsuario { get; set; }
        public Nullable<int> idEstado { get; set; }
    
        public virtual Domicilio Domicilio { get; set; }
        public virtual Estado Estado { get; set; }
        public virtual TipoDocumento TipoDocumento { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
