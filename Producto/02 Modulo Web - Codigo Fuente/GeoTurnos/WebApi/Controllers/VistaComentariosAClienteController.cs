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
    public class VistaComentariosAClienteController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.VistaComentariosACliente == null || !_db.VistaComentariosACliente.Any())
                {
                    return NotFound();
                }
                return Ok(_db.VistaComentariosACliente);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int id)
        {
            IQueryable<VistaComentariosACliente> com = null;
            try
            {
                if (_db.VistaComentariosACliente == null || !_db.VistaComentariosACliente.Any())
                {
                    return NotFound();
                }
                
                com = _db.VistaComentariosACliente.Where(p => p.id_cliente  == id);
                
                if (com == null)
                {
                    return NotFound();
                }
                return Ok(com);

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
