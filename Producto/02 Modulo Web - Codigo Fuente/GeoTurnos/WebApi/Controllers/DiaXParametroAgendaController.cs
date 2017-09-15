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
    public class DiaXParametroAgendaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.DiaXParametroAgenda == null || !_db.DiaXParametroAgenda.Any())
                {
                    return NotFound();
                }
                return Ok(_db.DiaXParametroAgenda);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Post([FromBody]DiaXParametroAgenda diaParam)
        {
            try
            {
                if (_db.DiaXParametroAgenda == null /*|| !_db.DiaXParametroAgenda.Any()*/)
                {
                    return NotFound();
                }
                if (diaParam == null)
                {
                    return BadRequest();
                }

                _db.DiaXParametroAgenda.Add(diaParam);

                _db.SaveChanges();

                return Created("api/DiaXParametroAgenda/" , diaParam);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }



        public IHttpActionResult Put(int id, [FromBody]DiaXParametroAgenda diaXparam)
        {
            try
            {
                if (diaXparam == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != diaXparam.id_param_agenda)
                {
                    return BadRequest();
                }
                if (_db.DiaXParametroAgenda.Count(e => e.id_param_agenda == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(diaXparam).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(diaXparam);


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
