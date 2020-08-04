using TestApp.Services.Events.InstallStateChanged;

namespace TestApp.Services.Events
{
    public interface IEventFactory
    {
        IEvent Configure();
        IEvent InstallStateChanged(string gameId, InstallStateType type, decimal progressPercent);
    }
}