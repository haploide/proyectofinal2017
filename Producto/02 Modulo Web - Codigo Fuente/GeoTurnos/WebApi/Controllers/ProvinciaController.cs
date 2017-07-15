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
    public class ProvinciaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Provincia == null || !_db.Provincia.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Provincia);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}
