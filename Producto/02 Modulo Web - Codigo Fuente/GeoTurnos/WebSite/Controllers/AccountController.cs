using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using WebSite.Models;
using WebSite.App_Start;
using Newtonsoft.Json;

namespace WebSite.Controllers
{
    [Autorizado]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            try
            {
                UsuarioLogueado usuarioLogin = BaseDatosController.Login(model.usuario1, System.Web.Helpers.Crypto.SHA256(model.Password));
                if (usuarioLogin != null)
                {
                    HttpContext.Session["usuarioLogin"] = usuarioLogin;

                    //if (model.RememberMe)
                    //{
                    //    var json = JsonConvert.SerializeObject(usuarioLogin);




                    //    var userCookie = new HttpCookie("usuariogeoturnos", Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(json)));

                    //    userCookie.Expires.AddDays(365);

                    //    HttpContext.Response.Cookies.Add(userCookie);
                    //}

                    return RedirectToLocal(returnUrl);
                }
                else
                {
                    ModelState.AddModelError("", "Usuario o Password Incorrecto");
                    return View(model);
                }
            }
            catch (Exception)
            {

                ModelState.AddModelError("", "Error al procesar la solicitud. Por favor inténtalo nuevamente");
                return View(model);
            }
            


        }
        
        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // GET: /Account/RegistrarCliente
        [AllowAnonymous]
        public ActionResult RegistrarCliente()
        {
            return View();
        }


        // POST: /Account/RegistrarCliente
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarCliente(RegistrarClienteViewModel model)
        {
            if (ModelState.IsValid)
            {
               
                Domicilio domicilio = new Domicilio() { altura = model.altura, calle = model.calle, piso = model.piso, departamento = model.departamento, torre = model.torre, idBarrio = model.idBarrio };
                Usuario usuario = new Usuario() { usuario1 = model.usuario1, contraseña = System.Web.Helpers.Crypto.SHA256(model.contraseña), preguntaSeguridad1 = model.preguntaSeguridad1, respuestaSeguridad1 = model.respuestaSeguridad1, preguntaSeguridad2 = model.preguntaSeguridad2, respuestaSeguridad2 = model.respuestaSeguridad2, idEstado = (int)EstadoUsuario.Activo };
                Cliente  cliente = new Cliente() {apellido = model.apellido, fechaNacimiento = model.fechaNacimiento,foto=model.foto,nombre=model.nombre,nroDocumento=model.nroDocumento, idTipoDocumento = model.idTipoDocumento, telefono = model.telefono, email = model.email, idEstado = (int)EstadoEmpresa.PendienteDeActivacion };

                cliente.Domicilio = domicilio;
                cliente.Usuario = usuario;

                try
                {
                    var resultado = BaseDatosController.GuardarCliente(cliente);

                    if (resultado)
                    {
                        UsuarioLogueado usuarioLogin = new UsuarioLogueado() { Usuario = model.usuario1, TipoUsuario = TipoUsuario.Prestatario, Prestatario = cliente };
                        HttpContext.Session["usuarioLogin"] = usuarioLogin;

                        return RedirectToAction("Index", "Home");
                    }
                }
                catch (Exception)
                {
                    ModelState.AddModelError("", "Error al procesar la solicitud. Por favor inténtalo nuevamente");
                    return View(model);
                }

            }

            // If we got this far, something failed, redisplay form
            return View();
        }

        // GET: /Account/RegistrarEmpresa
        [AllowAnonymous]
        public ActionResult RegistrarEmpresa()
        {
            return View();
        }

        // POST: /Account/RegistrarEmpresa
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarEmpresa(RegistarEmpresaViewModel model)
        {
            if (ModelState.IsValid)
            {
                
                    Domicilio domicilio = new Domicilio() { altura = model.altura, calle=model.calle, piso=model.piso, departamento=model.departamento, torre=model.torre, idBarrio=model.idBarrio };
                    Usuario usuario = new Usuario() { usuario1=model.usuario1, contraseña=System.Web.Helpers.Crypto.SHA256(model.contraseña), preguntaSeguridad1=model.preguntaSeguridad1, respuestaSeguridad1=model.respuestaSeguridad1, preguntaSeguridad2=model.preguntaSeguridad2, respuestaSeguridad2=model.respuestaSeguridad2, idEstado=(int)EstadoUsuario.Activo};
                    Empresa empresa = new Empresa() { cuit=model.cuit, razonSocial=model.razonSocial, nombreFantasia=model.nombreFantasia, inicioActividades=model.inicioActividades, telefono=model.telefono,  email=model.email, idEstado=(int)EstadoEmpresa.PendienteDeActivacion, idRubro=model.idRubro, logoEmpresa=model.logoEmpresa };

                    empresa.Domicilio = domicilio;
                    empresa.Usuario = usuario;

                    var resultado = BaseDatosController.GuardarEmpresa(empresa);
                
                if (resultado)
                {
                    UsuarioLogueado usuarioLogin = new UsuarioLogueado() { Usuario = model.usuario1, TipoUsuario = TipoUsuario.Entidad , Empresa=empresa};
                    HttpContext.Session["usuarioLogin"] = usuarioLogin;
                    
                    //ToDO: Mandar Email a la cuenta del administrador advirtiendo que se registro una nueva empresa y debe autorizarla

                    return RedirectToAction("Index", "Home"); 
                }
                
            }

            // If we got this far, something failed, redisplay form
            return View();
        }


        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {

                try
                {
                    if (!BaseDatosController.esUsuarioByEmail(model.Email))//Se fija si el email pertenece a algun usuario registrado
                    {
                        // Don't reveal that the user does not exist or is not confirmed
                        return View("ForgotPasswordConfirmation");
                    }

                    //ToDo: Enviar email, generar un string en base64 con su email para usar como codigo de reseteo 

                    using (EmailController email = new EmailController())
                    {
                        email.enviarMail(model.Email, "geoturnos@gmail.com", "Reset Pass", "ResetearPass");
                    }
                }
                catch (Exception)
                {

                    ModelState.AddModelError("", "Error al procesar la solicitud. Por favor inténtalo nuevamente");
                    return View(model);
                }


                return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            //ToDo: convertir el codigo y ver si pertenece a algun usuario registrado
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        
        
        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            HttpContext.Session["usuarioLogin"] = null;  //Se borran los datos de la session

            if (Request.Cookies["usuariogeoturnos"] != null) //se expira la cookie
            {
                var user = new HttpCookie("usuariogeoturnos")
                {
                    Expires = DateTime.Now.AddDays(-1),
                    Value = null
                };
                Response.Cookies.Add(user);
            }
            return RedirectToAction("Index", "Home");//se redirecciona
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}