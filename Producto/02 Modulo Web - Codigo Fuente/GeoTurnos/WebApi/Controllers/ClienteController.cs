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
   
        

    public class ClienteController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Cliente == null || !_db.Cliente.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Cliente);
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
                if (_db.Cliente == null || !_db.Cliente.Any())
                {
                    return NotFound();
                }
                Cliente cli = _db.Cliente.FirstOrDefault(p => p.idCliente  == id);
                if (cli == null)
                {
                    return NotFound();
                }
                return Ok(cli);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Post([FromBody]Cliente cliente)
        {
            try
            {
                if (_db.Cliente == null || !_db.Cliente.Any())
                {
                    return NotFound();
                }
                if (cliente == null)
                {
                    return BadRequest();
                }

                _db.Cliente.Add(cliente);

                _db.SaveChanges();

                return Created("api/Cliente/" + cliente.idCliente , cliente);

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
