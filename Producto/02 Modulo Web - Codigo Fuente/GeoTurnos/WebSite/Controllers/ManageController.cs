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
        //
        //GET: PrincipalAdministracion
        public PartialViewResult PrincipalAdministracion()
        {
            return PartialView("_PartialPrincipalAdministracion");
        }
        //
        //GET: ActivacionEmpresa

        public PartialViewResult GestionRubro()
        {
            return PartialView("_PartialGestionRubro");
        }
        //
        //GET: GestionRubro

        public PartialViewResult ActivacionEmpresa()
        {
            return PartialView("_PartialActivacionEmpresa");
        }

        //
        //GET: Estadisticas

        public PartialViewResult Estadisticas()
        {
            return PartialView("_PartialEstadisticas");
        }

        //
        //GET: PrincipalEntidadPrestadora
        public PartialViewResult PrincipalEntidadPrestadora()
        {
            return PartialView("_PartialPrincipalEntidadPrestadora");
        }
        //
        //GET: GestionarGeolocalizacion
        public PartialViewResult GestionarGeolocalizacion()
        {
            return PartialView("_PartialGestionarGeolocalizacion");
        }
        //
        //GET: GestionarDatosEmpresa
        public PartialViewResult GestionarDatosEmpresa()
        {
            return PartialView("_PartialGestionarDatosEmpresa");
        }
        //
        // GET: EstadisticaAdminEmpresasRegFiltros
        public PartialViewResult EstadisticaAdminEmpresasRegFiltros()
        {
            return PartialView("_PartialEstadisticaAdminEmpresasRegFiltros");
        }
        //GET: PrincipalClientePrestatario
        public PartialViewResult PrincipalClientePrestatario()
        {
            return PartialView("_PartialPrincipalClientePrestatario");
        }
        //
        //GET: GestionarDatosCliente
        public PartialViewResult GestionarDatosCliente()
        {
            return PartialView("_PartialGestionarDatosCliente");
        }
        //
        //GET: GestionarAgendaTurnos

        public PartialViewResult GestionarMisTurnos()
        {
            return PartialView("_PartialGestionarMisTurnos");
        }
        //
        //GET: GestionarMisTurnos

        public PartialViewResult GestionarAgendaTurnos()
        {
            return PartialView("_PartialGestionarAgendaTurnos");
        }
        //
        //GET: GestionarPlantillaTurnos
        public PartialViewResult GestionarPlantillaTurnos()
        {
            return PartialView("_PartialGestionarPlantillaTurnos");
        }
        //
        //GET: VisualizarAgenda
        public PartialViewResult VisualizarAgenda()
        {
            return PartialView("_PartialVisualizarAgenda");
        }
    }
}