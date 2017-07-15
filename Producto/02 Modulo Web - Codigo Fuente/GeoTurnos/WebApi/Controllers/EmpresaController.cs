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
    public class EmpresaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Empresa);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

    }
}
