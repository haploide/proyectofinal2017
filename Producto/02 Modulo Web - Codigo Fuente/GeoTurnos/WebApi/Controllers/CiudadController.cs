﻿using System;
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
    public class CiudadController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Ciudad == null || !_db.Ciudad.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Ciudad);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}
