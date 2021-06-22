using Autofac;
using SiteMercado.Application;
using SiteMercado.Application.Interfaces;
using SiteMercado.Data.Repositories;
using SiteMercado.Domain.Core.Repositories;
using SiteMercado.Domain.Core.Services;
using SiteMercado.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteMercado.CrossCutting.IOC
{
    public class ConfigurationIOC
    {
        public static void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ApplicationServiceProduct>().As<IApplicationServiceProduct>();
            builder.RegisterType<ProductService>().As<IProductService>();
            builder.RegisterType<AuthService>().As<IAuthService>();
            builder.RegisterType<ProductRepository>().As<IProductRepository>();
        }
    }

}