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
    public class TurnoController : ApiController
    {

        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Post([FromBody]Turno turno)
        {
            try
            {
                if (_db.Turno == null || !_db.Turno.Any())
                {
                    return NotFound();
                }
                if (turno == null)
                {
                    return BadRequest();
                }

                _db.Turno.Add(turno);

                _db.SaveChanges();

                return Created("api/Turno/" + turno.idTurno, turno);
 
             

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
                var turno = _db.Turno.Find(id);

                if (turno == null)
                {
                    return NotFound();
                }
                _db.Turno.Remove(turno);

                _db.SaveChanges();

                return Ok(turno);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        //Cancelar Un Turno
        public IHttpActionResult Put(int id)
        {
            try
            {

                if (_db.Turno == null || !_db.Turno.Any())
                {
                    return NotFound();
                }

                var turno = _db.Turno.Find(id);

                if (turno == null)
                {
                    return NotFound();
                }

                turno.idEstado = 13;

                _db.Entry(turno).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(turno);


            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        //Cancelar  todos los Turno de un Dia
        public IHttpActionResult Put(DateTime fecha)
        {
            try
            {

                if (_db.Turno == null || !_db.Turno.Any())
                {
                    return NotFound();
                }
                if (fecha == null)
                {
                    return BadRequest();
                }

                var turnos = _db.Turno.Where(t => t.fecha.Equals(fecha));

                if (turnos == null)
                {
                    return NotFound();
                }

                foreach (var turno in turnos)
                {
                    turno.idEstado = 13;

                    _db.Entry(turno).State = System.Data.Entity.EntityState.Modified;

                    _db.SaveChanges(); 
                }

                return Ok();


            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        //Registrar Asistencia A Turno
        public IHttpActionResult Put(int id, bool asistio)
        {
            try
            {

                if (_db.Turno == null || !_db.Turno.Any())
                {
                    return NotFound();
                }
                
                var turno = _db.Turno.Find(id);

                if (turno == null)
                {
                    return NotFound();
                }


                if (asistio)
                {
                    turno.idEstado = 15; 
                }
                else
                {
                    turno.idEstado = 14;
                }

               _db.Entry(turno).State = System.Data.Entity.EntityState.Modified;

               _db.SaveChanges();
                

                return Ok();


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
