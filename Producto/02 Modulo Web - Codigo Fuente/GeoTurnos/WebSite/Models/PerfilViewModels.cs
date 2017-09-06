using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace WebSite.Models
{
    public class PerfilClienteViewModels
    {
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre")]
        public string nombre { get; set; }

    }
    public class PerfilEmpresaViewModels
    {
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Razon Social")]
        public string razonSocial { get; set; }
        

    }
}