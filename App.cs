using Chromely;
using Chromely.Core;
using Chromely.Core.Network;
using TestApp.Controllers;
using TestApp.Services.Events;

namespace TestApp
{
    public class App : ChromelyBasicApp
    {
        public override void Configure(IChromelyContainer container)
        {
            base.Configure(container);

            container.RegisterInstance(typeof(IEventFactory), nameof(IEventFactory), new EventFactory());
            container.RegisterSingleton(
                    typeof(ChromelyController),
                    nameof(ConfigurationController),
                    typeof(ConfigurationController));

        }
    }
}