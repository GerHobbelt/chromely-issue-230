using System;
using System.Collections.Generic;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Helpers;
using Chromely.Core.Infrastructure;
using Chromely.Core.Network;

namespace TestApp
{
    public class ChromelyConfig : IChromelyConfiguration
    {
        /// <summary>Gets or sets the name of the application.</summary>
        public string AppName { get; set; }

        /// <summary>Gets or sets the start URL.</summary>
        public string StartUrl { get; set; }

        /// <summary>Gets or sets the application executable location.</summary>
        public string AppExeLocation { get; set; }

        /// <summary>Gets or sets the chromely version.</summary>
        public string ChromelyVersion { get; set; }

        /// <summary>Gets or sets the platform.</summary>
        public ChromelyPlatform Platform { get; set; }

        /// <summary>Gets or sets a value indicating whether debugging is enabled or not.</summary>
        public bool DebuggingMode { get; set; }

        /// <summary>Gets or sets the dev tools URL.</summary>
        public string DevToolsUrl { get; set; }

        /// <summary>Gets or sets the command line arguments.</summary>
        public IDictionary<string, string> CommandLineArgs { get; set; }

        /// <summary>Gets or sets the command line options.</summary>
        public List<string> CommandLineOptions { get; set; }

        /// <summary>Gets or sets the controller assemblies.</summary>
        public List<ControllerAssemblyInfo> ControllerAssemblies { get; set; }

        /// <summary>Gets or sets the custom settings.</summary>
        public IDictionary<string, string> CustomSettings { get; set; }

        /// <summary>Gets or sets the event handlers.</summary>
        public List<ChromelyEventHandler<object>> EventHandlers { get; set; }

        /// <summary>Gets or sets the extension data.</summary>
        public IDictionary<string, object> ExtensionData { get; set; }

        /// <summary>Gets or sets the java script executor.</summary>
        public IChromelyJavaScriptExecutor JavaScriptExecutor { get; set; }

        /// <summary>Gets or sets the URL schemes.</summary>
        public List<UrlScheme> UrlSchemes { get; set; }

        /// <summary>Gets or sets the cef download options.</summary>
        public CefDownloadOptions CefDownloadOptions { get; set; }

        /// <summary>Gets or sets the window options.</summary>
        public IWindowOptions WindowOptions { get; set; }

        public ChromelyConfig()
        {
            AppName = "TestApp";
            Platform = ChromelyRuntime.Platform;
            AppExeLocation = AppDomain.CurrentDomain.BaseDirectory;
            StartUrl = "local://dist/index.html";
            DebuggingMode = true;

            CefDownloadOptions = new CefDownloadOptions();
            WindowOptions = new WindowOptions
            {
                Title = AppName,
                StartCentered = true,
                Size = new WindowSize(1600, 900),
                RelativePathToIconFile = "chromely.ico",
                WindowFrameless = true,
                FramelessOption = new FramelessOption
                {
                    UseWebkitAppRegions = true
                }
            };

            UrlSchemes = new List<UrlScheme>();
            UrlSchemes.AddRange(new List<UrlScheme>()
            {
                new UrlScheme(DefaultSchemeName.RESOURCE, "local", string.Empty, string.Empty, UrlSchemeType.Resource, false),
                new UrlScheme(DefaultSchemeName.CUSTOM, "http", "chromely.com", string.Empty, UrlSchemeType.Custom, false),
                new UrlScheme(DefaultSchemeName.COMMAND, "http", "command.com", string.Empty, UrlSchemeType.Command, false)
            });

            ControllerAssemblies = new List<ControllerAssemblyInfo>();
            CustomSettings = new Dictionary<string, string>()
            {
                ["cefLogFile"] = "logs\\chromely.cef.log",
                ["logSeverity"] = "info",
                ["locale"] = "en-US"
            };
        }
    }
}