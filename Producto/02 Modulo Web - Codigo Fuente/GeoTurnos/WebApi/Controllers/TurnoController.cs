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
    public class TurnoController : ApiController
    {

        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Post([FromBody]Turno turno)
        {
            try
            {
                if (_db.Turno == null || !_db.Turno.Any())
                {
                    return NotFound();
                }
                if (turno == null)
                {
                    return BadRequest();
                }

                _db.Turno.Add(turno);

                _db.SaveChanges();

                return Created("api/Turno/" + turno.idTurno, turno);
 
             

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                var turno = _db.Turno.Find(id);

                if (turno == null)
                {
                    return NotFound();
                }
                _db.Turno.Remove(turno);

                _db.SaveChanges();

                return Ok(turno);

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
