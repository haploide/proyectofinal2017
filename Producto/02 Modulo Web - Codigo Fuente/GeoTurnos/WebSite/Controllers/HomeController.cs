﻿using System;
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
        [Autorizado(Roles =TipoUsuario.Administrador)]
        public ActionResult Contact()
        {

            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}