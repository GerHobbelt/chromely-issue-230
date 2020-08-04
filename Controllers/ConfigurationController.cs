using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using TestApp.Services.Events;
using TestApp.Services.Events.InstallStateChanged;

namespace TestApp.Controllers
{
    [ControllerProperty]
    public class ConfigurationController : ChromelyController
    {
        private readonly IChromelyConfiguration config;
        private readonly IEventFactory eventFactory;

        public ConfigurationController(IChromelyConfiguration config, IEventFactory eventFactory)
        {
            this.config = config;
            this.eventFactory = eventFactory;
        }

        [Command(Route = "/request-configuration")]
        public void RequestConfiguration(IDictionary<string, string> queryParameters)
        {
            Dispatch(e => e.Configure());

            Task.Run(() =>
            {
                decimal progress = 0;
                while (true)
                {
                    Dispatch(e => e.InstallStateChanged("test", InstallStateType.Download, progress));
                    progress += 0.1m;
                    Thread.Sleep(100);
                }
            });
        }

        private void Dispatch(Func<IEventFactory, IEvent> eventSelector)
        {
            var @event = eventSelector(eventFactory);
            ExecuteJavaScript($"window.__dispatchBackendEvent({(int)@event.Type}, {@event.PayloadJson})");
        }

        private void ExecuteJavaScript(string script)
        {
            Task.Run(() =>
            {
                var scriptExecutor = config?.JavaScriptExecutor;
                scriptExecutor?.ExecuteScript(script);
            });
        }
    }
}
