using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class BaseDatosController : Controller
    {
        public static bool GuardarEmpresa(Empresa empresa)
        {
            bool resutl = true;
            using(GeoTurnosEntities db= new GeoTurnosEntities())
            {
                try
                {
                    if (empresa != null&&db.Empresa!=null)
                    {
                        if (empresa.idEmpresa != 0)
                        {
                            db.Entry(empresa).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.Empresa.Add(empresa);
                        }
                        db.SaveChanges();

                    }
                    else{
                        resutl = false;
                    }


                }
                catch (Exception ex)
                {

                    throw;

                }
            }
            return resutl;
        }
        
    }
}