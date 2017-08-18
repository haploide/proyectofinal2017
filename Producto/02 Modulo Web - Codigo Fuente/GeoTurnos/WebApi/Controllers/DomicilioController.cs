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
    public class DomicilioController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Domicilio == null || !_db.Domicilio.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Domicilio);
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
                if (_db.Domicilio == null || !_db.Domicilio.Any())
                {
                    return NotFound();
                }

                Domicilio dom = (from d in _db.Domicilio
                                join e in _db.Empresa on d.idDomicilio equals e.idDomicilio
                                where e.idEmpresa == id
                                select d).FirstOrDefault();
                if (dom == null)
                {
                    return NotFound();
                }

                return Ok(dom);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Post([FromBody]Domicilio  dom)
        {
            try
            {
                if (_db.Domicilio == null || !_db.Domicilio.Any())
                {
                    return NotFound();
                }
                if (dom == null)
                {
                    return BadRequest();
                }

                _db.Domicilio.Add(dom);

                _db.SaveChanges();

                return Created("api/Domicilio/" + dom.idDomicilio , dom);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
        public IHttpActionResult Put(int id, [FromBody]Domicilio dom)
        {
            try
            {
                if (dom == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != dom.idDomicilio)
                {
                    return BadRequest();
                }
                if (_db.Domicilio.Count(d => d.idDomicilio == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(dom).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(dom);


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
