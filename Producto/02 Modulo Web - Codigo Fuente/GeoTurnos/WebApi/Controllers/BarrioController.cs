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
    public class BarrioController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Barrio == null || !_db.Barrio.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Barrio);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                if (_db.Barrio == null || !_db.Barrio.Any())
                {
                    return NotFound();
                }
                var bar = _db.Barrio.Where(p => p.idCiudad  == id);


                if (bar == null)
                {
                    return NotFound();
                }
                return Ok(bar);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}
