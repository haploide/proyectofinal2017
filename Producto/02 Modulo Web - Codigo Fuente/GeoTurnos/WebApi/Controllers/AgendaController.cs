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
    public class AgendaController : ApiController
    {

        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(int id)//id de la empresa
        {
            try
            {
                if (_db.Agenda == null || !_db.Agenda.Any())
                {
                    return NotFound();
                }
                var agenda = _db.Agenda.Where(a => a.idEmpresa == id);
                if (agenda == null)
                {
                    return NotFound();
                }
                return Ok(agenda);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
        public IHttpActionResult Post([FromBody]Agenda agenda)
        {
            try
            {
                if (_db.Agenda == null /*|| !_db.ParametroAgenda.Any()*/)
                {
                    return NotFound();
                }
                if (agenda == null)
                {
                    return BadRequest();
                }

                _db.Agenda.Add(agenda);

                _db.SaveChanges();

                return Created("api/Rubro/" + agenda.idAgenda, agenda);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
        public IHttpActionResult Get(int mes, int anio)//para que devuelva el id de agenda para ese mes y año
        {
            try
            {
                if (_db.Agenda == null || !_db.Agenda.Any())
                {
                    return NotFound();
                }
                Agenda agenda = _db.Agenda.Where(a => a.año == anio && a.mes==mes).FirstOrDefault();
                if (agenda == null)
                {
                    return NotFound();
                }
                return Ok(agenda);

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
