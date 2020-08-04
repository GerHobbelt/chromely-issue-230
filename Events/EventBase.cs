using ServiceStack;
using ServiceStack.Text;

namespace TestApp.Services.Events
{
    public abstract class EventBase<TPayload> : IEvent
    {
        private readonly TPayload payload;

        public EventType Type { get; }

        public string PayloadJson
        {
            get
            {
                using (JsConfig.With(new Config
                {
                    TextCase = TextCase.CamelCase,
                    TreatEnumAsInteger = true,
                    IncludeNullValues = true
                }))
                {
                    return payload.ToJson();
                }
            }
        }
            

        protected EventBase(EventType type, TPayload payload)
        {
            this.payload = payload;
            Type = type;
        }

        protected EventBase(EventType type)
            : this(type, default)
        {
        }
    }

    public abstract class EventBase : EventBase<object>
    {
        protected EventBase(EventType type)
            : base(type)
        {
        }
    }
}