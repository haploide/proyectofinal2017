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

    public class UsuarioController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Usuario  == null || !_db.Usuario.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Usuario);
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
                if (_db.Usuario == null || !_db.Usuario.Any())
                {
                    return NotFound();
                }
                Usuario user = _db.Usuario.FirstOrDefault(p => p.idUsuario  == id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Post([FromBody]Usuario usuario)
        {
            try
            {
                if (_db.Usuario == null || !_db.Usuario.Any())
                {
                    return NotFound();
                }
                if (usuario == null)
                {
                    return BadRequest();
                }

                _db.Usuario.Add(usuario);

                _db.SaveChanges();

                return Created("api/Usuario/" + usuario.idUsuario , usuario);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Put(int id, [FromBody]Usuario usuario)
        {
            try
            {
                if (usuario == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != usuario.idUsuario )
                {
                    return BadRequest();
                }
                if (_db.Usuario.Count(e => e.idUsuario  == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(usuario).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(usuario);


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
