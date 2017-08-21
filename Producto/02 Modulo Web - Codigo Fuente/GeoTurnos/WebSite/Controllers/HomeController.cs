using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.App_Start;

namespace WebSite.Controllers
{
    public class HomeController : Controller
    {
   
        public ActionResult Index()
        {
            return View();
        }
        [Autorizado]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [Autorizado]
        public ActionResult Contact()
        {

            ViewBag.Message = "Your contact page.";

            return View();
        }
        //[Autorizado(Roles =TipoUsuario.Prestatario)]
        public ActionResult BuscarTurnos()
        {
            return View();
        }

        //
        //GET: PrincipalBusqueda
        public PartialViewResult PrincipalBusqueda()
        {
            return PartialView("_PartialPrincipalBusqueda");
        }
        //
        //GET: BuscarPorFiltrado
        public PartialViewResult BuscarPorFiltrado()
        {
            return PartialView("_PartialBuscarPorFiltrado");
        }
        //
        //GET: BuscarPorGeoposicion
        public PartialViewResult BuscarPorGeoposicion()
        {
            return PartialView("_PartialBuscarPorGeoposicion");
        }

    }
}