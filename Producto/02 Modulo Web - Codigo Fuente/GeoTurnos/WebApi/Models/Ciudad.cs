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
    
    public partial class Ciudad
    {
        public int idCiudad { get; set; }
        public string nombre { get; set; }
        public Nullable<int> idProvincia { get; set; }
    
        public virtual Provincia Provincia { get; set; }
    }
}
