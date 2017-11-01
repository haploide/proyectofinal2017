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
    public class RubroController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Rubro == null || !_db.Rubro.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Rubro);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int id)//Obtener id del Rubro
        {
            try
            {
                if (_db.Rubro == null || !_db.Rubro.Any())
                {
                    return NotFound();
                }
                Rubro rubro = _db.Rubro.FirstOrDefault(p => p.idRubro == id);
                if (rubro == null)
                {
                    return NotFound();
                }
                return Ok(rubro);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Post([FromBody]Rubro rubro)
        {
            try
            {
                if (_db.Rubro == null /*|| !_db.ParametroAgenda.Any()*/)
                {
                    return NotFound();
                }
                if (rubro == null)
                {
                    return BadRequest();
                }

                _db.Rubro.Add(rubro);

                _db.SaveChanges();

                return Created("api/Rubro/" + rubro.idRubro, rubro);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Put(int id, [FromBody]Rubro rubro)
        {
            try
            {
                if (rubro == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != rubro.idRubro)
                {
                    return BadRequest();
                }
                if (_db.Rubro.Count(e => e.idRubro == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(rubro).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(rubro);
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
                var rubr = _db.Rubro.Find(id);

                if (rubr == null)
                {
                    return NotFound();
                }
                _db.Rubro.Remove(rubr);

                _db.SaveChanges();

                return Ok(rubr);

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
