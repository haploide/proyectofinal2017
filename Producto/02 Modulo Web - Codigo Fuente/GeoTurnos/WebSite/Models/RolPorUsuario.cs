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
    
    public partial class RolPorUsuario
    {
        public int idRolXUsuario { get; set; }
        public int idUsuario { get; set; }
        public int idRol { get; set; }
    
        public virtual Rol Rol { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
