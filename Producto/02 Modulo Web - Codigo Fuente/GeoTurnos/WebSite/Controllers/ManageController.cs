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

namespace WebSite.Controllers
{
    
    public class ManageController : Controller
    {
        public ManageController()
        {
        }

        //
        // GET: /Manage/CuentaEmpresaPrestadora
        [Autorizado(Roles =TipoUsuario.Entidad)]
        public ActionResult CuentaEmpresaPrestadora()
        {
            return View();
        }


        //
        // GET: /Manage/CuentaEmpresaPrestadora
        [Autorizado(Roles = TipoUsuario.Prestatario)]
        public ActionResult CuentaClientePrestatario()
        {
            return View();
        }


        //
        // GET: /Manage/CuentaEmpresaPrestadora
        [Autorizado(Roles = TipoUsuario.Administrador)]
        public ActionResult CuentaAdministrador()
        {
            return View();
        }

        //
        //GET: /Manage/RedirectorDeCuenta
        [Autorizado]
        public RedirectToRouteResult RedirectorDeCuenta()
        {
            UsuarioLogueado usuario = HttpContext.Session["usuarioLogin"] as UsuarioLogueado;

            switch (usuario.TipoUsuario)
            {
                case TipoUsuario.Administrador:
                    return RedirectToAction("CuentaAdministrador");
                    
                case TipoUsuario.Entidad:
                    return RedirectToAction("CuentaEmpresaPrestadora");
                    
                case TipoUsuario.Prestatario:
                    return RedirectToAction("CuentaClientePrestatario");
                    
                
            }
            return RedirectToAction("Index", "Home");

        }


    }
}