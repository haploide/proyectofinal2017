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
    public class VistaTurnosAgendaClienteController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(int id)
        {
            try
            {
                if (_db.VistaTurnosAgendaCliente == null || !_db.VistaTurnosAgendaCliente.Any())
                {
                    return NotFound();
                }
                //_db.VistaTurnosAgendaCliente.Where(p => p.idCliente == id);
                var resultado = (from e in _db.VistaTurnosAgendaCliente

                                where 1 == 1
                                
                                && (id != null ? e.idCliente == id : true)
                                orderby e.fecha ascending, e.horaDesde ascending, e.horaHasta ascending
                                select new
                                {
                                    e,
                                });
                if (resultado == null)
                {
                    return NotFound();
                }

                return Ok(resultado);
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