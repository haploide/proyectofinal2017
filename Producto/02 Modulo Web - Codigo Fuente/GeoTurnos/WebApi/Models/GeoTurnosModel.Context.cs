﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApi.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GeoTurnosEntities : DbContext
    {
        public GeoTurnosEntities()
            : base("name=GeoTurnosEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Barrio> Barrio { get; set; }
        public virtual DbSet<Ciudad> Ciudad { get; set; }
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<Estado> Estado { get; set; }
        public virtual DbSet<Provincia> Provincia { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<RolPorUsuario> RolPorUsuario { get; set; }
        public virtual DbSet<Rubro> Rubro { get; set; }
        public virtual DbSet<TipoDocumento> TipoDocumento { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Domicilio> Domicilio { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<DiaSemana> DiaSemana { get; set; }
        public virtual DbSet<DiaXParametroAgenda> DiaXParametroAgenda { get; set; }
        public virtual DbSet<ParametroAgenda> ParametroAgenda { get; set; }
        public virtual DbSet<DireccionComentario> DireccionComentario { get; set; }
        public virtual DbSet<Comentarios> Comentarios { get; set; }
        public virtual DbSet<VistaFiltroEmpresa> VistaFiltroEmpresa { get; set; }
        public virtual DbSet<VistaTurnosAgendaVigenteParaClientes> VistaTurnosAgendaVigenteParaClientes { get; set; }
        public virtual DbSet<VistaTurnosAgendaVigenteParaEmpresa> VistaTurnosAgendaVigenteParaEmpresa { get; set; }
        public virtual DbSet<VistaParametrosAgendaEmpresa> VistaParametrosAgendaEmpresa { get; set; }
    }
}
