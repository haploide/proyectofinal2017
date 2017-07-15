using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebSite.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
    public class RegistarEmpresaViewModel
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

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar password")]
        [Compare("contraseña", ErrorMessage = "El password y la confirmación no coinciden.")]
        public string confirmarcontraseña { get; set; }
        public string preguntaSeguridad1 { get; set; }
        public string respuestaSeguridad1 { get; set; }
        public string preguntaSeguridad2 { get; set; }
        public string respuestaSeguridad2 { get; set; }
        public Nullable<int> cuit { get; set; }
        public string razonSocial { get; set; }
        public string nombreFantasia { get; set; }
        public Nullable<System.DateTime> inicioActividades { get; set; }
        public string telefono { get; set; }
        public byte[] logoEmpresa { get; set; }
        public string email { get; set; }
        public string calle { get; set; }
        public int altura { get; set; }
        public Nullable<int> piso { get; set; }
        public string departamento { get; set; }
        public string torre { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
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
