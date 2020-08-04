using TestApp.Services.Events.Configure;
using TestApp.Services.Events.InstallStateChanged;

namespace TestApp.Services.Events
{
    public class EventFactory : IEventFactory
    {
        public IEvent Configure()
        {
            return new ConfigureEvent(new ConfigInfo());
        }

        public IEvent InstallStateChanged(string gameId, InstallStateType type, decimal progressPercent)
        {
            return new InstallStateChangedEvent(new InstallState
            {
                GameId = gameId,
                Type = type,
                ProgressPercent = progressPercent
            });
        }
    }
}