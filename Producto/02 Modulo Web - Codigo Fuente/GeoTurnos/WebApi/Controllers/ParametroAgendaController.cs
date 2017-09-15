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
    public class ParametroAgendaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.ParametroAgenda == null || !_db.ParametroAgenda.Any())
                {
                    return NotFound();
                }
                return Ok(_db.ParametroAgenda);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Get(int id)//id de la empresa
        {
            try
            {
                if (_db.ParametroAgenda == null || !_db.ParametroAgenda.Any())
                {
                    return NotFound();
                }
                ParametroAgenda paramAg = _db.ParametroAgenda.FirstOrDefault(p => p.id_empresa == id);
                if (paramAg == null)
                {
                    return NotFound();
                }
                return Ok(paramAg);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Post([FromBody]ParametroAgenda param)
        {
            try
            {
                if (_db.ParametroAgenda == null /*|| !_db.ParametroAgenda.Any()*/)
                {
                    return NotFound();
                }
                if (param == null)
                {
                    return BadRequest();
                }

                _db.ParametroAgenda.Add(param);

                _db.SaveChanges();

                return Created("api/ParametroAgenda/" + param.id_param_agenda, param);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Put(int id, [FromBody]ParametroAgenda param)
        {
            try
            {
                if (param == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != param.id_param_agenda)
                {
                    return BadRequest();
                }
                if (_db.ParametroAgenda.Count(e => e.id_param_agenda == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(param).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(param);


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
