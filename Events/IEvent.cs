namespace TestApp.Services.Events
{
    public interface IEvent
    {
        EventType Type { get; }
        string PayloadJson { get; }
    }
}