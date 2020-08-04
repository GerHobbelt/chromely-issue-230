using System;
using Caliburn.Light;
using Chromely.Core;

namespace TestApp
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var container = new SimpleContainer();
            var config = new ChromelyConfig();

            AppBuilder
                .Create()
                .UseContainer<SimpleContainer>(container)
                .UseConfiguration<ChromelyConfig>(config)
                .UseApp<App>()
                .Build()
                .Run(args);
        }
    }
}