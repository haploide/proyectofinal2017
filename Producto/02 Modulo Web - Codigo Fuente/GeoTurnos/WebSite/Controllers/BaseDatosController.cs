using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.App_Start;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class BaseDatosController : Controller
    {
        public static bool GuardarEmpresa(Empresa empresa)
        {
            bool resutl = true;
            using(GeoTurnosEntities db= new GeoTurnosEntities())
            {
               
                try
                {
                    db.Database.Connection.Open();
                    if (empresa != null&&db.Empresa!=null)
                    {
                        if (empresa.idEmpresa != 0)
                        {
                            db.Entry(empresa).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.Empresa.Add(empresa);
                        }
                        db.SaveChanges();

                    }
                    else{
                        resutl = false;
                    }


                }
                catch (Exception ex)
                {

                    throw;

                }
            }
            return resutl;
        }

        public static bool GuardarCliente(Cliente  cliente)
        {
            bool resutl = true;
            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {

                try
                {
                    db.Database.Connection.Open();
                    if (cliente != null && db.Cliente   != null)
                    {
                        if (cliente.idUsuario != 0)
                        {
                            db.Entry(cliente).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.Cliente.Add(cliente);
                        }
                        db.SaveChanges();

                    }
                    else
                    {
                        resutl = false;
                    }


                }
                catch (Exception ex)
                {

                    throw;

                }
            }
            return resutl;
        }
        public static UsuarioLogueado Login(string usuario, string password)
        {
            UsuarioLogueado usuariologuado = null;

            using(GeoTurnosEntities db= new GeoTurnosEntities())
            {
                try
                {
                    db.Database.Connection.Open();
                    if (!string.IsNullOrEmpty(usuario) && !string.IsNullOrEmpty(password) && db.Usuario != null)
                    {
                        Usuario user=db.Usuario.Where(u => u.usuario1 == usuario).First();

                        if (user.contraseña == password)
                        {
                            if (user.Empresa.Count == 1)
                            {
                                usuariologuado = new UsuarioLogueado() { Empresa=user.Empresa.First(), TipoUsuario= TipoUsuario.Entidad, Usuario=user.usuario1};
                            }
                            else if (user.Cliente.Count == 1)
                            {
                                usuariologuado = new UsuarioLogueado() { Prestatario = user.Cliente.First(), TipoUsuario = TipoUsuario.Prestatario, Usuario = user.usuario1 };
                            }
                            else
                            {
                                usuariologuado = new UsuarioLogueado() { TipoUsuario = TipoUsuario.Administrador, Usuario = user.usuario1 };
                            }
                            
                        }

                    }


                }
                catch (InvalidOperationException)
                {

                    return null;
                }
                catch (Exception ex)
                {

                    throw;
                }



            }
            
            return usuariologuado;

        }
        
    }
}