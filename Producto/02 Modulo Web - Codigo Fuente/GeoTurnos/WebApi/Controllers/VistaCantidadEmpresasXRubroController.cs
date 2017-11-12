using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:6907", headers: "*", methods: "*")]
    public class VistaCantidadEmpresasXRubroController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.VistaCantidadEmpresasXRubro == null || !_db.VistaCantidadEmpresasXRubro.Any())
                {
                    return NotFound();
                }
                return Ok(_db.VistaCantidadEmpresasXRubro);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
