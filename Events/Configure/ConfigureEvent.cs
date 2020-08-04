namespace TestApp.Services.Events.Configure
{
    public class ConfigureEvent : EventBase<ConfigInfo>
    {
        public ConfigureEvent(ConfigInfo state)
            : base(EventType.Configure, state)
        {
        }
    }
}