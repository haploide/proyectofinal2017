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
    
    public partial class Usuario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Usuario()
        {
            this.RolPorUsuario = new HashSet<RolPorUsuario>();
        }
    
        public int idUsuario { get; set; }
        public string usuario1 { get; set; }
        public string contraseña { get; set; }
        public string preguntaSeguridad1 { get; set; }
        public string respuestaSeguridad1 { get; set; }
        public string preguntaSeguridad2 { get; set; }
        public string respuestaSeguridad2 { get; set; }
        public Nullable<int> idEstado { get; set; }
    
        public virtual Estado Estado { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RolPorUsuario> RolPorUsuario { get; set; }
    }
}
