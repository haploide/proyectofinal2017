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
    public class ComentariosController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Comentarios == null || !_db.Comentarios.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Comentarios);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }



        public IHttpActionResult Get(int id, int idDir)
        {
            IQueryable<Comentarios> com = null;
            try
            {
                if (_db.Comentarios == null || !_db.Comentarios.Any())
                {
                    return NotFound();
                }
              

                if (idDir ==1)
                {
                    com = _db.Comentarios.Where(p => p.Empresa.idEmpresa  == id);
                }
                else if (idDir == 2)
                {
                    com = _db.Comentarios.Where(p => p.Cliente.idCliente  == id);
                }
                            


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



        public IHttpActionResult Post([FromBody]Comentarios coment)
        {
            try
            {
                if (_db.Comentarios == null || !_db.Comentarios.Any())
                {
                    return NotFound();
                }
                if (coment == null)
                {
                    return BadRequest();
                }

                _db.Comentarios.Add(coment);

                _db.SaveChanges();

                return Created("api/Comentarios/" + coment.Id_comentario , coment);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }



    }
}
