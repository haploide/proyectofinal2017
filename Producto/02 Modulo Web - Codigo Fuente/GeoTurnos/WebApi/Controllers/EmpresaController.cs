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

        // metodo GET para recuperar un recurso
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

        // metrodo POST para crear un recurso nuevo

        public IHttpActionResult Post([FromBody]Empresa empresa)
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }
                if (empresa == null)
                {
                    return BadRequest();
                }

                _db.Empresa.Add(empresa);

                _db.SaveChanges();

                return Created("api/Empresa/" + empresa.idEmpresa , empresa);

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
                var empr = _db.Empresa.Find(id);

                if (empr == null)
                {
                    return NotFound();
                }
                _db.Empresa.Remove(empr);

                _db.SaveChanges();

                return Ok(empr);

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
