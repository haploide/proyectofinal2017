using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebSite.Models
{
    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Usuario")]
        [DataType(DataType.Text)]
        public string usuario1 { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "El {0} debe tener por lo menos {2} caracteres", MinimumLength = 8)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Recordarme?")]
        public bool RememberMe { get; set; }

    }
        
    public class RegistarEmpresaViewModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(50, ErrorMessage = "El {0} debe tener por lo menos {2} caracteres", MinimumLength = 6)]
        [Display(Name = "Usuario")]
        public string usuario1 { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "El {0} debe tener por lo menos {2} caracteres", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string contraseña { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar password")]
        [Compare("contraseña", ErrorMessage = "El password y la confirmación no coinciden.")]
        public string confirmarcontraseña { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Pregunta Seguridad")]
        public string preguntaSeguridad1 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Respuesta Seguridad")]
        public string respuestaSeguridad1 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Pregunta Seguridad Alt")]
        public string preguntaSeguridad2 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Respuesta Seguridad Alt")]
        public string respuestaSeguridad2 { get; set; }

        [RegularExpression(@"^\d+$")]
        [Display(Name = "Cuit")]
        public int cuit { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Razon Social")]
        public string razonSocial { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de Fantasia")]
        public string nombreFantasia { get; set; }

        [DataType(DataType.DateTime)]
        [Display(Name = "Inicio Actividades")]
        public DateTime inicioActividades { get; set; }

        [Required(ErrorMessage ="Seleccione un Rubro")]
        [Display(Name = "Rubro")]
        public int idRubro { get; set; }

        [Required]
        [RegularExpression(@"^\d+$")]
        [Display(Name = "Barrio")]
        public int idBarrio { get; set; }
        
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Telefono")]
        public string telefono { get; set; }

        public byte[] logoEmpresa { get; set; }

        [Required]
        [DataType(DataType.ImageUrl)]
        [Display(Name = "Logo Entidad")]
        public string logoEmpresaurl { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string email { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Calle")]
        public string calle { get; set; }

        [Required]
        [RegularExpression(@"^\d+$")]
        [Display(Name = "Altura")]
        public int altura { get; set; }


        [RegularExpression(@"^\d+$")]
        [Display(Name = "Piso")]
        public int piso { get; set; }

        
        [DataType(DataType.Text)]
        [Display(Name = "Departamento")]
        public string departamento { get; set; }

        
        [DataType(DataType.Text)]
        [Display(Name = "Torre")]
        public string torre { get; set; }
    }

    public class RegistrarClienteViewModel
    {
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Usuario")]
        public string usuario1 { get; set; }
    
        [Required]
        [StringLength(100, ErrorMessage = "El {0} debe tener por lo menos {2} caracteres", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string contraseña { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirmar password")]
        [Compare("contraseña", ErrorMessage = "El password y la confirmación no coinciden.")]
        public string confirmarcontraseña { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Primer Pregunta de Seguridad")]
        public string preguntaSeguridad1 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Primer Respuesta de Seguridad")]
        public string respuestaSeguridad1 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Segunda Pregunta de Seguridad")]
        public string preguntaSeguridad2 { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Segunda Respuesta de Seguridad")]
        public string respuestaSeguridad2 { get; set; }

        [Required]
        [Display(Name = "Número de Documento")]
        [RegularExpression(@"^\d +$")]
        public int nroDocumento { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre")]
        public string nombre { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Apellido")]
        public string apellido { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Número de Teléfono")]
        public string telefono { get; set; }

        public byte[] foto { get; set; }

        [Required]
        [DataType(DataType.ImageUrl)]
        [Display(Name = "Avatar")]
        public string fotourl { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correo electrónico")]
        public string email { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Fecha de Nacimiento")]
        public System.DateTime fechaNacimiento { get; set; }

        [Required]
        [Display(Name = "Barrio")]
        public int idBarrio { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Calle")]
        public string calle { get; set; }

        [Required]
        [RegularExpression(@"^\d +$")]
        [Display(Name = "Altura")]
        public int altura { get; set; }

        [Display(Name = "Piso")]
        [RegularExpression(@"^\d +$")]
        public int piso { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Departamento")]
        public string departamento { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Torre")]
        public string torre { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "El {0} debe tener {2} caracteres minimo.", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar password")]
        [Compare("Password", ErrorMessage = "El password y la confirmación no coinciden.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
