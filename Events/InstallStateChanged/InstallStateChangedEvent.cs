namespace TestApp.Services.Events.InstallStateChanged
{
    public class InstallStateChangedEvent : EventBase<InstallState>
    {
        public InstallStateChangedEvent(InstallState state)
            : base(EventType.InstallStateChanged, state)
        {
        }
    }
}